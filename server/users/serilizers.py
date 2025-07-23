from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import ValidationError
from rest_framework.authentication import authenticate

User = get_user_model()
class RegisterUserSerilizer(serializers.ModelSerializer):
      class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'firstName',   # camelCase, matches your model
            'lastName',    # camelCase, matches your model
            'birth_date',
            'password',
            'gender',
            'phone_number',
            'profile_image',
            'created_at',
            'updated_at',
        ]
        extra_kwargs = {   
                  "password": {"write_only": True}
                  }
      def validate_email(self, value):
            if User.objects.filter(email=value).exists():
                  raise serializers.ValidationError("Email already in use")
            return value
      
      def create(self, validated_data):
            return User.objects.create_user(**validated_data)
      
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(
            username=data.get("email"),  
            password=data.get("password")
        )
        if not user:
            raise serializers.ValidationError("invalid credentials")
        data["user"] = user
        return data