from django.db import models
from questions.models import Question
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class ChatSession(models.Model):
    question = models.OneToOneField(Question, on_delete=models.CASCADE, related_name='chat_session')
    participants = models.ManyToManyField(User, related_name='chat_sessions', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    users_online = models.ManyToManyField(User, related_name='active_chats', blank=True)
    users_typing = models.ManyToManyField(User, related_name='typing_in_chats', blank=True)

    def __str__(self):
        return f"Chat Session for {self.question.title}"

    class Meta:
        ordering = ['-created_at']
        unique_together = ['question', 'created_at']

class ChatMessage(models.Model):
    class MessageType(models.TextChoices):
        TEXT = 'text', 'Text'
        IMAGE = 'image', 'Image'
        AUDIO = 'audio', 'Audio'
        VIDEO = 'voice', 'Voice'
        CODE = 'code', 'Code snippet'
        LINK = 'link', 'Link'
        DOCUMENT = 'document', 'Document'
        OTHER = 'other', 'Other'

    chat_session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages')

    message_content = models.TextField()
    message_type = models.CharField(max_length=100, choices=MessageType.choices, default='text')
    

    code_snippet = models.CharField(max_length=800, null=True, blank=True)
    
    file = models.FileField(upload_to='chat_files/', blank=True, null=True)
    file_name = models.CharField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    reactions = models.ManyToManyField(User, through='MessageReaction', related_name='message_reactions', blank=True)

    def __str__(self):
        return f"Message from {self.sender.username} in {self.chat_session.question.title}"

    class Meta:
        ordering = ['-created_at']


class MessageReaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.ForeignKey(ChatMessage, on_delete=models.CASCADE, related_name='message_reactions')
    emoji = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'message']

    def __str__(self):
        return f"{self.user.username} reacted to {self.message.message_content}"