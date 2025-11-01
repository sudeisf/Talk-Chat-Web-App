from django.db import transaction
from .models import Achievement, UserAchievement ,AchievementProgress



class AchievementService:

    @classmethod
    def check_question_achivements(cls, user):

        question_count = user.questions_asked.count()
        achievements = Achievement.objects.filter(
            trigger_event='question_asked',
            is_active=True
        )

        for achievement in achievements:
            cls._check_milestone_achievement(user, achievement, question_count)

    @classmethod
    def check_answer_achivements(cls, user):

        answer_count = user.question_answerd.count()

        achievements = Achievement.objects.filter(
            trigger_event='question_answered', 
            is_active=True
        )
        
        for achievement in achievements:
            cls._check_milestone_achievement(user, achievement, answer_count)
    
     
    @classmethod
    def check_streak_achievements(cls, user):
        """Check streak-related achievements"""
        streak_count = user.streak_count
        
        achievements = Achievement.objects.filter(
            trigger_event='streak_milestone',
            is_active=True
        )
        
        for achievement in achievements:
            cls._check_milestone_achievement(user, achievement, streak_count)
    
    @classmethod
    def _check_milestone_achievement(cls, user, achievement, current_value):
        """Helper method to check milestone-based achievements"""
        if current_value >= achievement.milestone:
            cls.unlock_achievement(user, achievement)
        else:
            # Update progress
            progress, created = AchievementProgress.objects.get_or_create(
                user=user,
                achievement=achievement
            )
            progress.progress = current_value
            progress.save()
    
    @classmethod
    def unlock_achievement(cls, user, achievement):
        """Unlock an achievement for a user"""
        with transaction.atomic():
            user_achievement, created = UserAchievement.objects.get_or_create(
                user=user,
                achievement=achievement
            )
            
            if created:
                # Award points to user
                user.reputation_score += achievement.points
                user.save()
                
                # Create notification
                from notifications.models import Notification
                Notification.objects.create(
                    user=user,
                    notification_type='achievement',
                    title='Achievement Unlocked!',
                    message=f'You unlocked: {achievement.name}',
                    achievement=achievement
                )
    
    @classmethod
    def get_user_achievements(cls, user):
        """Get all achievements with progress for a user"""
        achievements = Achievement.objects.filter(is_active=True)
        result = []
        
        for achievement in achievements:
            try:
                user_achievement = UserAchievement.objects.get(
                    user=user, 
                    achievement=achievement
                )
                unlocked = True
                unlocked_at = user_achievement.unlocked_at
                progress = 100
            except UserAchievement.DoesNotExist:
                unlocked = False
                unlocked_at = None
                progress = cls._get_achievement_progress(user, achievement)
            
            result.append({
                'achievement': achievement,
                'unlocked': unlocked,
                'unlocked_at': unlocked_at,
                'progress': progress
            })
        
        return result
    
    @classmethod
    def _get_achievement_progress(cls, user, achievement):
        """Calculate progress percentage for an achievement"""
        try:
            progress = AchievementProgress.objects.get(
                user=user,
                achievement=achievement
            )
            return min(100, (progress.progress / achievement.milestone) * 100)
        except AchievementProgress.DoesNotExist:
            return 0