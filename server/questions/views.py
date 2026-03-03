from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.utils.timesince import timesince
from django.conf import settings
import logging
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from urllib3 import request
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import google.generativeai as genai

from .serializers import (
	ModifyQuestionDescriptionSerializer,
	ModifiedQuestionDescriptionResponseSerializer,
	QuestionSerializer,
)
from rest_framework import generics, permissions

from .models import Question , QuestionInvite


logger = logging.getLogger(__name__)


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


class ModifyQuestionDescriptionView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def post(self, request):
		serializer = ModifyQuestionDescriptionSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)

		api_key = getattr(settings, "GOOGLE_API_KEY", None)
		if not api_key:
			return Response(
				{"detail": "AI service is not configured."},
				status=503,
			)

		description = serializer.validated_data["description"]

		try:
			genai.configure(api_key=api_key)
			prompt = (
				"You are an assistant that improves technical question descriptions. "
				"Rewrite the user's draft to be clearer, concise, and structured for helpers. "
				"Preserve original meaning and technical details. "
				"Output only the improved description without markdown fences or extra commentary.\n\n"
				f"Draft description:\n{description}"
			)

			model_names = [
				"gemini-1.5-flash",
				"gemini-1.5-flash-latest",
				"gemini-2.0-flash",
				"gemini-2.0-flash-lite",
			]

			improved_text = ""
			last_error = None

			for model_name in model_names:
				try:
					model = genai.GenerativeModel(model_name)
					result = model.generate_content(prompt)
					improved_text = (getattr(result, "text", "") or "").strip()

					if improved_text:
						break
				except Exception as model_error:
					last_error = model_error
					continue

			if not improved_text:
				logger.exception(
					"Gemini response empty or all model attempts failed",
					exc_info=last_error,
				)
				debug_suffix = (
					f" Provider error: {last_error}" if settings.DEBUG and last_error else ""
				)
				return Response(
					{"detail": f"AI service returned an empty response.{debug_suffix}"},
					status=502,
				)

			response_serializer = ModifiedQuestionDescriptionResponseSerializer(
				data={"improved_description": improved_text}
			)
			response_serializer.is_valid(raise_exception=True)
			return Response(response_serializer.validated_data)

		except Exception as error:
			logger.exception("Failed to modify question description with AI")
			debug_suffix = f" Provider error: {error}" if settings.DEBUG else ""
			return Response(
				{
					"detail": (
						"Failed to improve description right now. Please try again."
						f"{debug_suffix}"
					)
				},
				status=502,
			)
