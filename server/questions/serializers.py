from rest_framework import serializers
from .models import Question
from users.models import Tag  # Assuming you have a Tag model

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
            
        return question


class ModifyQuestionDescriptionSerializer(serializers.Serializer):
    description = serializers.CharField(min_length=10, max_length=3000)


class ModifiedQuestionDescriptionResponseSerializer(serializers.Serializer):
    improved_description = serializers.CharField()