from django.db.models import Count
from django.utils import timezone
from django.utils.timesince import timesince
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Question


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
