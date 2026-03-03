from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.utils.timesince import timesince
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from urllib3 import request
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .serializers import QuestionSerializer
from rest_framework import generics, permissions

from .models import Question , QuestionInvite


class RecentActivityView(APIView):
	permission_classes = [AllowAny]

	def get(self, request):
		try:
			limit = int(request.query_params.get("limit", 10))
		except (TypeError, ValueError):
			limit = 10

		questions = (
			Question.objects.annotate(answer_count=Count("chat_session__messages"))
			.order_by("-created_at")[:limit]
		)

		now = timezone.now()
		data = []
		for question in questions:
			time_ago = timesince(question.created_at, now).split(",")[0] + " ago"
			data.append(
				{
					"id": question.id,
					"title": question.title,
					"status": question.status,
					"timeAgo": time_ago,
					"answerCount": question.answer_count,
					"upvotes": question.upvotes,
				}
			)

		return Response({"items": data})


class AcceptInvitation(APIView):
    def post(self, request , invite_id):
        invite = get_object_or_404(QuestionInvite,id=invite_id, expert= request.user)
        
        if invite.status != 'PENDING':
            return Response({"error": "Invite no longer valid"}, status=400)
        
        chat_session = invite.question.chat_session
        if chat_session.participants.count() >= chat_session.max_participants:
             return Response({"error": "Room is full!"}, status=400)
         
        invite.status = 'ACCEPTED'
        invite.save()
        
        chat_session.participants.add(request.user)
        
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f'chat_{invite.question.id}', 
            {
                'type': 'chat_message',
                'message': f"{request.user.username} joined the session.",
                'sender_id': None, 
                'is_system': True
            }
        )
        
        return Response({"status": "joined", "session_id": chat_session.id})
	
class CreateQuestionView(generics.CreateAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]
