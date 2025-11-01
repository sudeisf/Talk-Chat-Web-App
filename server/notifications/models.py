from django.db import models
from django.contrib.auth import get_user_model
from questions.models import Question
from chat.models import ChatMessage
User = get_user_model()

# Create your models here.

class Notification(models.Model):
    class NotificationType(models.TextChoices):
        SYSTEM_UPDATE = 'system_update', 'System Update'
        QUESTION_ANSWERED = 'question_answered', 'Question Answered'
        HELPER_JOINED = 'helper_joined', 'Helper Joined'
        HELPER_LEFT = 'helper_left', 'Helper Left'
        HELPER_REMOVED = 'helper_removed', 'Helper Removed'
        MESSAGE_REPLIED = 'message_replied', 'Message Replied'
        STREAK_ANNOUNCEMENT = 'streak_announcement', 'Streak Announcement'
        QUESTION_ANNOUNCEMENT = 'question_announcement', 'Question Announcement'
        HELPER_ANNOUNCEMENT = 'helper_announcement', 'Helper Announcement'
        MESSAGE_ANNOUNCEMENT = 'message_announcement', 'Message Announcement'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=NotificationType.choices, default='system_update')
    title = models.CharField(max_length=255)
    message = models.TextField()

    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='notifications', null=True, blank=True)
    message_ref = models.ForeignKey(ChatMessage, on_delete=models.CASCADE, related_name='notifications', null=True, blank=True)

    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.title}"