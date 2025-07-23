from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serilizers import RegisterUserSerilizer , LoginSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login , logout

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

class LoginView(APIView):
      permission_classes = [AllowAny]
      def post(self,request):
            serializer = LoginSerializer(data=request.data)
            if serializer.is_valid():
                  user = serializer.validated_data["user"]
                  login(request,user)
                  return Response({"message": "Login successful"})
            return Response(serializer.errors, status=400)

class LogoutView(APIView):
      permission_classes = [IsAuthenticated]
      def post(self,request):
            logout(request)
            return Response({"message": "Logout successful"})