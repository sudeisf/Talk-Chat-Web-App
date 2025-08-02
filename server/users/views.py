from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serilizers import (
      RegisterUserSerilizer , LoginSerializer 
      ,EmailVerifySerilizer ,OtpVerifySerializer, reset_password_serializer
      )
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login , logout
import random
from .models import Otp
from .services import send_OTP_To_Email
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from drf_yasg.utils import swagger_auto_schema


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
            return Response({"error" : "not valid"}, status=500)
            
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

