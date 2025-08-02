from django.urls import path
from .views import LoginView , RegisterView ,LogoutView , EmailVerificationView , OTPVerifyVIew , NewPasswordChangeView

urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("auth/email/", EmailVerificationView.as_view(), name="email-verify"),
    path("auth/otp-verify/", OTPVerifyVIew.as_view(), name="verify-otp"),
    path('auth/new-password/' , NewPasswordChangeView.as_view(), name="new-password")
]