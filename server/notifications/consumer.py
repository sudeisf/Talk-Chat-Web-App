import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # 1. Get the User from the Scope (AuthMiddlewareStack required)
        self.user = self.scope['user']

        if self.user.is_anonymous:
            await self.close()
        else:
            # 2. Create a unique group name for this user
            # Example: "user_42"
            self.group_name = f"user_{self.user.id}"

            # 3. Add user to their own group
            await self.channel_layer.group_add(
                self.group_name,
                self.channel_name
            )
            await self.accept()

    async def disconnect(self, close_code):
        # Remove user from group on disconnect
        if not self.user.is_anonymous:
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )

    # 4. This is the handler that sends the message to the Frontend
    async def send_notification(self, event):
        message = event['message']
        notification_type = event['type_label'] # e.g., 'invite', 'message'

        # Send JSON to the WebSocket
        await self.send(text_data=json.dumps({
            'type': notification_type,
            'data': message
        }))