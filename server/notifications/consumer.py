# notifications/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope.get('user')

        # Robust check for anonymous users
        if not self.user or self.user.is_anonymous:
            await self.close()
            return

        # Unique group for this specific user
        self.group_name = f"user_{self.user.id}"

        if self.channel_layer is None:
            await self.close(code=4500)
            return

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(
                self.group_name,
                self.channel_name
            )

    async def send_notification(self, event):
        # Pass the data directly from the signal to the frontend
        await self.send(text_data=json.dumps({
            'type': event['type_label'], # e.g. 'question_announcement'
            'data': event['message']     # The payload dict from signal
        }))