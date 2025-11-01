from django.db import models
from  django.contrib.auth import get_user_model

User = get_user_model()


class Question(models.Model):

    class QuestionStatus(models.TextChoices):
        ONGOING = 'ongoing', 'Ongoing'
        ANSWERED = 'answered', 'Answered'
        CLOSED = 'closed', 'Closed'

    asked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions')
    title = models.CharField(max_length=200)
    description = models.TextField()

    status = models.CharField(max_length=20, choices=QuestionStatus.choices, default='ongoing')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    closed_at = models.DateTimeField(null=True, blank=True)


    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)

    helpers_joined = models.ManyToManyField(User, related_name='questions_joined', blank=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'created_at']),
            models.Index(fields=['asked_by', 'created_at']),
        ]

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='bookmarks')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.question.title}"

    class Meta:
        unique_together = ['user', 'question']

