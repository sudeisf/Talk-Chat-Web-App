from django.urls import re_path
from notifications.consumer import NotificationConsumer
from chat.consumer import ChatConsumer 
websocket_urlpatterns = [

    re_path(r'ws/chat/(?P<ticket_id>[\w-]+)/$', ChatConsumer.as_asgi()),
    
    re_path(r'ws/notifications/$', NotificationConsumer.as_asgi()),
]