from django.urls import path

from .views import ChatSessionDetailView, ChatSessionListView, ChatSessionMembersView

urlpatterns = [
    path('sessions/', ChatSessionListView.as_view(), name='chat-session-list'),
    path('sessions/<int:session_id>/', ChatSessionDetailView.as_view(), name='chat-session-detail'),
    path('sessions/<int:ticket_id>/members/', ChatSessionMembersView.as_view(), name='chat-session-members'),
]
