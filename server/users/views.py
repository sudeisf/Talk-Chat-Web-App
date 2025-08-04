from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serilizers import (
      RegisterUserSerilizer , LoginSerializer 
      ,EmailVerifySerilizer ,OtpVerifySerializer, reset_password_serializer
      )
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login , logout , get_user_model
import random
from .models import Otp
from .services import send_OTP_To_Email
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from drf_yasg.utils import swagger_auto_schema
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from django.conf import settings
import requests

import os
from dotenv import load_dotenv

load_dotenv()


class RegisterView(APIView):
      permission_classes = [AllowAny]
      def post(self, request):
            serilizer = RegisterUserSerilizer(data=request.data)
            if serilizer.is_valid():
                  serilizer.save()
                  return Response({
                        "message" : "user successfully registerd successfully."
                  },status=201)
            return Response(serilizer.errors,status=400)
      
@method_decorator(csrf_exempt,name='dispatch')    
class LoginView(APIView):
      permission_classes = [AllowAny]
      def post(self,request):
            serializer = LoginSerializer(data=request.data)
            if serializer.is_valid():
                  user = serializer.validated_data["user"]
                  login(request,user)
                  return Response({
                        "user" : user.id,
                        "email" : user.email,
                        "username" : user.username,
                        "firstName" : user.firstName,
                        "lastName" : user.lastName
                  },status=status.HTTP_200_OK)
            return Response(serializer.errors, status=400)

class LogoutView(APIView):
      permission_classes = [IsAuthenticated]
      def post(self,request):
            logout(request)
            return Response({"message": "Logout successful"})
      
@method_decorator(csrf_exempt,name='dispatch')    
class EmailVerificationView(APIView):
      permission_classes = [AllowAny]
      @swagger_auto_schema(
        operation_description="Send OTP to email for verification",
        request_body=EmailVerifySerilizer,
        responses={200: "OTP sent successfully"}
      )
      
      def post(self,request):
            serializer = EmailVerifySerilizer(data=request.data)
            if serializer.is_valid():
                  email = serializer.validated_data['email']
                  OTP_CODE = random.randint(100000,999999)
                  Otp.objects.create(
                        email = email,
                        code = OTP_CODE
                  )
                  send_OTP_To_Email(
                        subject="otp code for password cahange",
                        email=email,
                        message=f'your one time password is {OTP_CODE}'
                  )
                  return Response(
                        {"message" : "OTP sent successfuly."}
                        , status=status.HTTP_200_OK
                  )
            return Response(serializer.errors, status=500)
            
@method_decorator(csrf_exempt, name='dispatch')            
class OTPVerifyVIew(APIView):
      permission_classes = [AllowAny]
      def post(self,request):
            serializer = OtpVerifySerializer(data=request.data)
            if serializer.is_valid():
               result = serializer.save()
               return Response({
                  "message": "OTP verified",
            }, status=status.HTTP_201_CREATED)
          
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
@method_decorator(csrf_exempt, name='dispatch')      
class NewPasswordChangeView(APIView):
      permission_classes = [AllowAny]
      def post(self,request):
            serializer = reset_password_serializer(data=request.data)
            if serializer.is_valid():
               result = serializer.save()
               return Response(result, status=status.HTTP_200_OK)
          
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name="dispatch")
class GoogleLoginAPIView(APIView):
    permission_classes =[]
    authentication_classes =[]
    def post(self, request):
        id_token_str = request.data.get("id_token")
        if not id_token_str:
            return Response(
                {"error": "Missing id_token"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            idinfo = id_token.verify_oauth2_token(
                id_token_str,
                google_requests.Request(),
                settings.GOOGLE_CLIENT_ID 
            )

            # Validate issuer
            if idinfo.get("iss") not in ["accounts.google.com", "https://accounts.google.com"]:
                return Response(
                    {"error": "Invalid issuer"}, 
                    status=status.HTTP_403_FORBIDDEN
                )

            # Extract user data
            email = idinfo.get("email")
            if not email:
                return Response(
                    {"error": "Email not provided by Google"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            google_sub = idinfo.get("sub")
            first_name = idinfo.get("given_name", "")
            last_name = idinfo.get("family_name", "")

            User = get_user_model()
            user, created = self.get_or_create_user(
                email=email,
                google_sub=google_sub,
                first_name=first_name,
                last_name=last_name
            )


            login(request, user)

            return Response({
                "status": "success",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
                "created": created
            })

        except ValueError as e:
         
            return Response(
                {"error": "Invalid token", "details": str(e)},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            return Response(
                {"error": "Authentication failed", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get_or_create_user(self, email, google_sub, first_name, last_name):
        User = get_user_model()
        user = User.objects.filter(google_id=google_sub).first()
        if user:
            return user, False

        user = User.objects.filter(email=email).first()
        if user:
            user.google_id = google_sub
            user.is_google_account = True
            if not user.first_name:
                user.first_name = first_name
            if not user.last_name:
                user.last_name = last_name
            user.save()
            return user, False

      
        username = self.generate_unique_username(email)
        return User.objects.create_user(
            username=username,
            email=email,
            google_id=google_sub,
            is_google_account=True,
            firstName=first_name,
            lasName=last_name,
        ), True

    def generate_unique_username(self, email):
        base_username = email.split('@')[0]
        username = base_username
        User = get_user_model()
        
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1
            
        return username

@method_decorator(csrf_exempt, name='dispatch')
class GithubLoginAPIView(APIView):
     permission_classes =[]
     authentication_classes =[]
     def post(self,request):
        code = request.data.get("code")
        if not code:
            return Response({"error": "Missing GitHub code"}, status=400)
        
        token_response = requests.post(
             "https://github.com/login/oauth/access_token",
             headers={"Accept" : "application/json"},
             data={
                "client_id": os.environ["GITHUB_CLIENT_ID"],
                "client_secret": os.environ["GITHUB_CLIENT_SECRET"],
                "code": code,
             }
        )

        token_data = token_response.json()
        access_token = token_data.get("access_token")
        if not access_token:
             return Response({"error": "GitHub token exchange failed"}, status=400)
        
        user_response = requests.get(
            "https://api.github.com/user",
            headers={"Authorization": f"token {access_token}"}
        )
        user_data = user_response.json()

        email_res = requests.get(
            "https://api.github.com/user/emails",
            headers={"Authorization": f"token {access_token}"}
        )
        emails = email_res.json()
        email = next((e["email"] for e in emails if e.get("primary") and e.get("verified")), None)

        if not email:
            return Response({"error": "Could not fetch verified GitHub email"}, status=400)

        github_id = str(user_data["id"])
        username = user_data.get("login", email.split("@")[0])

        User = get_user_model()
        try:
            user = User.objects.get(email=email)
            if not user.github_id:
                user.github_id = github_id
                user.is_github_account = True
                user.save()
        except User.DoesNotExist:
            user = User.objects.create(
                email=email,
                username=username,
                github_id=github_id,
                is_github_account=True
            )
        login(request, user)

        return Response({
                        "user" : user.id,
                        "email" : user.email,
                        "username" : user.username,
                        "firstName" : user.firstName,
                        "lastName" : user.lastName
        },status=status.HTTP_200_OK)