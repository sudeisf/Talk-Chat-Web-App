from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Notification


@receiver(post_save, sender=Notification)
def push_notification_realtime(sender, instance: Notification, created: bool, **kwargs):
    print(f"DEBUG: Signal fired for {instance.user.username}!") 
    if not created:
        return

    channel_layer = get_channel_layer()
    if not channel_layer:
        return

    payload = {
        'id': instance.id,
        'notification_type': instance.notification_type,
        'title': instance.title,
        'message': instance.message,
        'is_read': instance.is_read,
        'created_at': instance.created_at.isoformat(),
        'question_id': str(instance.question.id) if instance.question else None,
        'message_ref_id': instance.message_ref.id if instance.message_ref else None,
    }

    async_to_sync(channel_layer.group_send)(
        f'user_{instance.user_id}',
        {
            'type': 'send_notification',
            'type_label': instance.notification_type,
            'message': payload,
        },
    )