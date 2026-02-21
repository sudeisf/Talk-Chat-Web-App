from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import ValidationError
from rest_framework.authentication import authenticate
from .models import Otp
from django.utils import timezone
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import User, Tag, UserTag
from cloudinary.utils import cloudinary_url

User = get_user_model()
class RegisterUserSerilizer(serializers.ModelSerializer):
      class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',  
            'password',
        ]
        extra_kwargs = {   
                  "password": {"write_only": True}
                  }
      def validate_email(self, value):
            if User.objects.filter(email=value).exists():
                  raise serializers.ValidationError("Email already in use")
            return value
      
      def create(self, validated_data):
        # Ensure normal registration is marked as email/password login
        login_method = getattr(User, "LoginMethod").EMAIL if hasattr(User, "LoginMethod") else "email"
        return User.objects.create_user(
            login_method=login_method,
            **validated_data,
        )
      
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField()

    def validate(self, data):
        # Only allow email/password accounts to log in here
        email = data.get("email")
        password = data.get("password")

        try:
            user_obj = User.objects.get(
                  email=email,
                  login_method=getattr(User, "LoginMethod").EMAIL,
            )
        except User.DoesNotExist:
            raise serializers.ValidationError("invalid credentials")

        user = authenticate(username=user_obj.username, password=password)
        if not user:
            raise serializers.ValidationError("invalid credentials")
       
        return {
             "user" : user
        }

class EmailVerifySerilizer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate(self, attrs):
        if not User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError("There is no email with this account.")
        return attrs



class OtpVerifySerializer(serializers.Serializer):

    email = serializers.EmailField(required = True)
    code  = serializers.IntegerField(required=True)


    def validate_email(self, email):
         if not Otp.objects.filter(email=email).exists():
              raise serializers.ValidationError("email does not exist.")
         return email
    

    def validate(self, data):
        r_email = data["email"]
        r_code = data['code']
        otp = Otp.objects.filter(email__iexact=r_email).order_by("-created_at").first()

        if not otp:
              raise serializers.ValidationError("OTP not Found")
        if str(r_code) != str(otp.code):
               raise serializers.ValidationError("Invalid OTP")
        
        if timezone.now() > otp.expires_at:
                otp.delete()
                raise serializers.ValidationError("OTP expired")
        return data
    
    def create(self, validated_data):
        email = validated_data['email']

        Otp.objects.filter(
                email__iexact = email,
                expires_at__lt = timezone.now()
            ).delete()
            
        try:
                user = User.objects.get(email=email)
                otp_obj = Otp.objects.filter(email=email).latest("created_at")

                otp_obj.is_used = True
                user.is_verified = True

                user.save()
                otp_obj.save()

        except User.DoesNotExist:
                raise serializers.ValidationError("User not found")
            
        except Otp.DoesNotExist:
                raise serializers.ValidationError("OTP not found")
            
            
        return {
                'message': 'OTP verified successfully',
                'email': email,
                'success': True
            }
    
class reset_password_serializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

    def validate_email(self, email):
        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email not found")
        return email
    
    def validate_new_password(self, password):
        try:
            validate_password(password)
        except exceptions.ValidationError as e:
            raise serializers.ValidationError(str(e))
        return password 
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        email = validated_data['email']
        new_password = validated_data['new_password']       

        try:
            user = User.objects.get(email=email)
            user.set_password(new_password)
            user.save()
            return {
                'message': 'Password reset successfully',
                'success': True
            }
        except User.DoesNotExist:
            raise serializers.ValidationError("User not found")
        
class SetRoleSerializer(serializers.Serializer):
    role = serializers.ChoiceField(choices=[('learner', 'Learner'), ('helper', 'Helper')])


class UserTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'description']


class ProfileSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField(read_only=True)
    profile_image_url = serializers.SerializerMethodField(read_only=True)
    cover_image_url = serializers.SerializerMethodField(read_only=True)
    profile_image_public_id = serializers.SerializerMethodField(read_only=True)
    cover_image_public_id = serializers.SerializerMethodField(read_only=True)
    tags_id = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False,
    )
    tags_name = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False,
    )
    
    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'email', 
            'first_name', 
            'last_name', 
            'profile_image',
            'cover_image',
            "profile_image_url",
            "cover_image_url",
            "profile_image_public_id",
            "cover_image_public_id",
            "phone_number",
            "gender",
            "birth_date",
            "bio",
            "profession",
            "city",
            "country",
            "tags",
            "tags_id",
            "tags_name",
            ]

    def get_tags(self, obj):
        tag_qs = Tag.objects.filter(user_tags__user=obj).distinct()
        return UserTagSerializer(tag_qs, many=True).data

    def _cloudinary_public_id(self, value):
        if not value:
            return None
        return getattr(value, "public_id", None)

    def _cloudinary_secure_url(self, value):
        public_id = self._cloudinary_public_id(value)
        if not public_id:
            return None
        secure_url, _ = cloudinary_url(public_id, secure=True)
        return secure_url

    def get_profile_image_public_id(self, obj):
        return self._cloudinary_public_id(obj.profile_image)

    def get_cover_image_public_id(self, obj):
        return self._cloudinary_public_id(obj.cover_image)

    def get_profile_image_url(self, obj):
        return self._cloudinary_secure_url(obj.profile_image)

    def get_cover_image_url(self, obj):
        return self._cloudinary_secure_url(obj.cover_image)
        
    def update(self, instance, validated_data):
        tags_ids = validated_data.pop('tags_id', None)
        tags_names = validated_data.pop('tags_name', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if tags_ids is not None or tags_names is not None:
            from .models import Tag, UserTag
            UserTag.objects.filter(user=instance).delete()

            tags = list(Tag.objects.filter(id__in=(tags_ids or [])))

            for raw_name in (tags_names or []):
                clean_name = str(raw_name).strip()
                if not clean_name:
                    continue
                tag = Tag.objects.filter(name__iexact=clean_name).first()
                if not tag:
                    tag = Tag.objects.create(name=clean_name)
                tags.append(tag)

            unique_tags = []
            seen_ids = set()
            for tag in tags:
                if tag.id in seen_ids:
                    continue
                seen_ids.add(tag.id)
                unique_tags.append(tag)

            UserTag.objects.bulk_create(
                [UserTag(user=instance, tag=tag) for tag in unique_tags]
                )
        return instance


class ProfileImageUploadSerializer(serializers.ModelSerializer):
    profile_image_url = serializers.SerializerMethodField(read_only=True)
    profile_image_public_id = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ["profile_image", "profile_image_url", "profile_image_public_id"]

    def get_profile_image_public_id(self, obj):
        if not obj.profile_image:
            return None
        return getattr(obj.profile_image, "public_id", None)

    def get_profile_image_url(self, obj):
        public_id = self.get_profile_image_public_id(obj)
        if not public_id:
            return None
        secure_url, _ = cloudinary_url(public_id, secure=True)
        return secure_url


class CoverImageUploadSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField(read_only=True)
    cover_image_public_id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["cover_image", "cover_image_url", "cover_image_public_id"]

    def get_cover_image_public_id(self, obj):
        if not obj.cover_image:
            return None
        return getattr(obj.cover_image, "public_id", None)

    def get_cover_image_url(self, obj):
        public_id = self.get_cover_image_public_id(obj)
        if not public_id:
            return None
        secure_url, _ = cloudinary_url(public_id, secure=True)
        return secure_url