from rest_framework import serializers
from .models import Question
from users.models import Tag  # Assuming you have a Tag model
from notifications.models import Notification
from celery import chain

class QuestionSerializer(serializers.ModelSerializer):
   
    tags = serializers.ListField(
        child=serializers.CharField(max_length=50), 
        write_only=True
    )

    class Meta:
        model = Question
        fields = ['id', 'title', 'description', 'tags', 'created_at']

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])
        user = self.context['request'].user
        
      
        question = Question.objects.create(asked_by=user, **validated_data)
        
        # 2. Handle Tags (Create if new, Get if exists)
        for tag_name in tags_data:
            tag, created = Tag.objects.get_or_create(name=tag_name.lower())
            question.tags.add(tag) 

        Notification.objects.create(
            user=user,
            notification_type=Notification.NotificationType.QUESTION_ANNOUNCEMENT,
            title='Question posted successfully',
            message=f'Your question "{question.title}" is now being matched with helpers.',
            question=question,
        )

        from .tasks import find_and_invite_experts, vectorize_question

        chain(
            vectorize_question.s(question.id),
            find_and_invite_experts.s(),
        ).delay()
            
        return question


class ModifyQuestionDescriptionSerializer(serializers.Serializer):
    description = serializers.CharField(min_length=10, max_length=3000)


class ModifiedQuestionDescriptionResponseSerializer(serializers.Serializer):
    improved_description = serializers.CharField()


class MyQuestionListSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = [
            'id',
            'title',
            'description',
            'tags',
            'status',
            'created_at',
            'updated_at',
            'upvotes',
            'downvotes',
        ]

    def get_tags(self, obj):
        return list(obj.tags.values_list('name', flat=True))


class DashboardMetricSerializer(serializers.Serializer):
    value = serializers.FloatField()
    change = serializers.FloatField()


class HelperDashboardStatsSerializer(serializers.Serializer):
    questions_answered = DashboardMetricSerializer()
    sessions_joined = DashboardMetricSerializer()
    average_response_time = DashboardMetricSerializer()
    feedback_rating = DashboardMetricSerializer()


class HelperMonthlySessionSerializer(serializers.Serializer):
    month = serializers.CharField()
    sessions = serializers.IntegerField()


class HelperSessionsChartSerializer(serializers.Serializer):
    period_label = serializers.CharField()
    trend_percentage = serializers.FloatField()
    sessions = HelperMonthlySessionSerializer(many=True)


class ContributionDaySerializer(serializers.Serializer):
    date = serializers.CharField()
    count = serializers.IntegerField()


class HelperContributionsSerializer(serializers.Serializer):
    items = ContributionDaySerializer(many=True)


class HelperProfileOverviewSerializer(serializers.Serializer):
    helped_learners = serializers.IntegerField()
    sessions_joined = serializers.IntegerField()
    ongoing_sessions = serializers.IntegerField()
    average_response_minutes = serializers.FloatField()