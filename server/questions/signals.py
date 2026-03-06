from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Question, QuestionVote

@receiver(post_save, sender=QuestionVote)
@receiver(post_delete, sender=QuestionVote)
def update_vote_counts(sender, instance, **kwargs):
    question = instance.question
    
    # Recalculate counts from the Vote Table
    question.upvotes = question.votes.filter(vote_type='UP').count()
    question.downvotes = question.votes.filter(vote_type='DOWN').count()
    
    # Save only the updated fields for speed
    question.save(update_fields=['upvotes', 'downvotes'])