from django.urls import path

from .views import (
    ClearReadNotificationsView,
    DeleteNotificationView,
    MarkAllNotificationsReadView,
    MarkNotificationReadView,
    NotificationListView,
)

urlpatterns = [
    path('', NotificationListView.as_view(), name='notifications-list'),
    path('read-all/', MarkAllNotificationsReadView.as_view(), name='notifications-mark-all-read'),
    path('clear-read/', ClearReadNotificationsView.as_view(), name='notifications-clear-read'),
    path('<int:notification_id>/read/', MarkNotificationReadView.as_view(), name='notifications-mark-read'),
    path('<int:notification_id>/', DeleteNotificationView.as_view(), name='notifications-delete'),
]
