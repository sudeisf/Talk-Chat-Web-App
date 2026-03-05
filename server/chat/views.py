from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ChatSession


class ChatSessionMembersView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, ticket_id):
		chat_session = (
			ChatSession.objects
			.select_related('question')
			.prefetch_related('participants', 'users_online')
			.filter(question_id=ticket_id, is_active=True)
			.first()
		)

		if not chat_session:
			return Response(
				{"error": "Chat session not found."},
				status=status.HTTP_404_NOT_FOUND,
			)

		has_access = (
			chat_session.question.asked_by_id == request.user.id
			or chat_session.participants.filter(id=request.user.id).exists()
		)
		if not has_access:
			return Response(
				{"error": "You do not have access to this chat session."},
				status=status.HTTP_403_FORBIDDEN,
			)

		participants = [
			{
				"id": user.id,
				"username": user.username,
				"first_name": user.first_name,
				"last_name": user.last_name,
				"role": user.role,
			}
			for user in chat_session.participants.all()
		]

		asked_by = chat_session.question.asked_by
		if asked_by and not any(member["id"] == asked_by.id for member in participants):
			participants.insert(
				0,
				{
					"id": asked_by.id,
					"username": asked_by.username,
					"first_name": asked_by.first_name,
					"last_name": asked_by.last_name,
					"role": asked_by.role,
				},
			)

		online_user_ids = list(chat_session.users_online.values_list('id', flat=True))

		return Response(
			{
				"chat_session_id": chat_session.id,
				"question_id": chat_session.question_id,
				"participants": participants,
				"online_user_ids": online_user_ids,
			},
			status=status.HTTP_200_OK,
		)
