from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.utils.timesince import timesince
from django.conf import settings
import logging
import re
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
	MyQuestionListSerializer,
	QuestionSerializer,
)
from rest_framework import generics, permissions

from .models import Question , QuestionInvite


logger = logging.getLogger(__name__)


def _is_quota_error(error: Exception | None) -> bool:
	if not error:
		return False
	message = str(error).lower()
	return (
		"resource_exhausted" in message
		or "quota" in message
		or "429" in message
		or "rate limit" in message
	)


def _fallback_improve_description(description: str) -> str:
	cleaned = re.sub(r"\s+", " ", (description or "")).strip()
	if not cleaned:
		return ""

	if cleaned and cleaned[-1] not in ".!?":
		cleaned = f"{cleaned}."

	sentences = [part.strip() for part in re.split(r"(?<=[.!?])\s+", cleaned) if part.strip()]

	if len(sentences) >= 3:
		issue = " ".join(sentences[:2]).strip()
		context = " ".join(sentences[2:]).strip()
		return (
			f"Issue: {issue}\n\n"
			f"Additional context: {context}\n\n"
			"Looking for practical optimization steps and best practices to improve performance."
		)

	return (
		f"Issue: {cleaned}\n\n"
		"I would like guidance on the most effective optimizations, including performance improvements and better project structure where relevant."
	)


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


class MyQuestionsListView(generics.ListAPIView):
	serializer_class = MyQuestionListSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		return (
			Question.objects.filter(asked_by=self.request.user)
			.prefetch_related('tags')
			.order_by('-created_at')
		)


class ModifyQuestionDescriptionView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def post(self, request):
		serializer = ModifyQuestionDescriptionSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		description = serializer.validated_data["description"]

		api_key = getattr(settings, "GOOGLE_API_KEY", None)
		if not api_key:
			fallback_text = _fallback_improve_description(description)
			response_serializer = ModifiedQuestionDescriptionResponseSerializer(
				data={"improved_description": fallback_text}
			)
			response_serializer.is_valid(raise_exception=True)
			return Response(response_serializer.validated_data)

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
				fallback_text = _fallback_improve_description(description)
				if _is_quota_error(last_error):
					logger.warning("Gemini quota exceeded. Using local description fallback.")
				else:
					logger.exception(
						"Gemini response empty or all model attempts failed; using fallback.",
						exc_info=last_error,
					)

				response_serializer = ModifiedQuestionDescriptionResponseSerializer(
					data={"improved_description": fallback_text}
				)
				response_serializer.is_valid(raise_exception=True)
				return Response(response_serializer.validated_data)

			response_serializer = ModifiedQuestionDescriptionResponseSerializer(
				data={"improved_description": improved_text}
			)
			response_serializer.is_valid(raise_exception=True)
			return Response(response_serializer.validated_data)

		except Exception as error:
			logger.exception("Failed to modify question description with AI, using fallback")
			fallback_text = _fallback_improve_description(description)
			response_serializer = ModifiedQuestionDescriptionResponseSerializer(
				data={"improved_description": fallback_text}
			)
			response_serializer.is_valid(raise_exception=True)
			return Response(response_serializer.validated_data)
