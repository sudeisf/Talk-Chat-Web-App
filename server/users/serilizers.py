from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import ValidationError
from rest_framework.authentication import authenticate
from .models import Otp
from django.utils import timezone
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions

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
        return User.objects.create_user(
            login_method=getattr(User, "LoginMethod").EMAIL,
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
    user_id = serializers.IntegerField(required=True)
    role = serializers.ChoiceField(choices=[('learner', 'Learner'), ('helper', 'Helper')], required=True)

    def validate_user_id(self, user_id):
        try:
            user = User.objects.get(id=user_id)
            return user
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this ID does not exist.")

    def validate_role(self, role):
        valid_roles = ['learner', 'helper']
        if role not in valid_roles:
            raise serializers.ValidationError(f"Role must be one of {valid_roles}.")
        return role

    def update(self, instance, validated_data):
        role = validated_data.get('role')
        instance.role = role
        instance.save()
        return instance