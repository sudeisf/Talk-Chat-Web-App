from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your models here.

class Achievement(models.Model):

    class AchivementCategory(models.TextChoices):
        QUESTION_ANSWERED = 'question_answered', 'Question Answered'
        Engagment = 'engagment', 'Engagment'
        Streak = 'streak', 'Streak'
        Daily = 'daily', 'Daily'
        Weekly = 'weekly', 'Weekly'
        Monthly = 'monthly', 'Monthly'
        Yearly = 'yearly', 'Yearly'
        All = 'all', 'All'

    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=AchivementCategory.choices, default='all')
    icon = models.CharField(max_length=255)

    milestone = models.IntegerField(default=0)
    points = models.IntegerField(default=0)

    trigger_type = models.CharField(max_length=20)

    requirement = models.JSONField(default=dict, blank=True)  # Flexible requirements
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['category', 'created_at']),
        ]

class UserAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_achievements')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE, related_name='user_achievements')
    unlocked_at = models.DateTimeField(auto_now_add=True)
    notified = models.BooleanField(default=False)  # Track if user has been notified
    
    class Meta:
        unique_together = ['user', 'achievement']
        ordering = ['-unlocked_at']

class AchievementProgress(models.Model):
    """Track progress for incremental achievements"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievement_progress')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE, related_name='progress_tracking')
    progress = models.IntegerField(default=0)
    completed = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'achievement']
