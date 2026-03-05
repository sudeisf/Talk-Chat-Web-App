from django.urls import path

from .views import ChatSessionMembersView

urlpatterns = [
    path('sessions/<int:ticket_id>/members/', ChatSessionMembersView.as_view(), name='chat-session-members'),
]
