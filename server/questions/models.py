from django.db import models
from pgvector.django import VectorField
from  django.contrib.auth import get_user_model

User = get_user_model()


class Question(models.Model):

    STATUS_CHOICES = (
        ('searching', 'Searching for Experts'), # NEW
        ('ongoing', 'Ongoing'),
        ('answered', 'Answered'),
        ('closed', 'Closed'),
    )

    asked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions')
    title = models.CharField(max_length=200)
    description = models.TextField()

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='searching')
    
    embedding = VectorField(dimensions=1536, null=True, blank=True)
    bounty_points = models.IntegerField(default=10)
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

class QuestionInvite(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='invites')
    expert = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='question_invites')
    
    status = models.CharField(
        max_length=20, 
        choices=[('PENDING', 'Pending'), ('ACCEPTED', 'Accepted'), ('REJECTED', 'Rejected'), ('EXPIRED', 'Expired')],
        default='PENDING'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('question', 'expert')
        ordering = ['-created_at']
        
        
class SolutionSummary(models.Model):
    question = models.OneToOneField(Question, on_delete=models.CASCADE, related_name='solution_summary')
    
    # AI Generated Content
    problem_root_cause = models.TextField(help_text="AI summary of what went wrong")
    solution_steps = models.TextField(help_text="Markdown formatted steps to fix it")
    final_code_snippet = models.TextField(blank=True, null=True)
    
    generated_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Summary for {self.question.title}"