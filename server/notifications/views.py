from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Notification
from .serializers import NotificationSerializer


class NotificationListView(generics.ListAPIView):
	serializer_class = NotificationSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		return Notification.objects.filter(user=self.request.user).order_by('-created_at')


class MarkNotificationReadView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def patch(self, request, notification_id):
		notification = Notification.objects.filter(
			id=notification_id,
			user=request.user,
		).first()

		if not notification:
			return Response({'detail': 'Notification not found.'}, status=status.HTTP_404_NOT_FOUND)

		notification.is_read = True
		notification.save(update_fields=['is_read'])
		return Response({'status': 'ok'})


class MarkAllNotificationsReadView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def patch(self, request):
		Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
		return Response({'status': 'ok'})


class DeleteNotificationView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def delete(self, request, notification_id):
		deleted_count, _ = Notification.objects.filter(
			id=notification_id,
			user=request.user,
		).delete()

		if deleted_count == 0:
			return Response({'detail': 'Notification not found.'}, status=status.HTTP_404_NOT_FOUND)

		return Response(status=status.HTTP_204_NO_CONTENT)


class ClearReadNotificationsView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def delete(self, request):
		Notification.objects.filter(user=request.user, is_read=True).delete()
		return Response(status=status.HTTP_204_NO_CONTENT)
