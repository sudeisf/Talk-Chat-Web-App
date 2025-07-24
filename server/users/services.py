from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()

def send_OTP_To_Email(subject, email , message)->bool:
      try:
            send_mail(
                  subject,
                  message,
                  settings.EMAIL_HOST_USER,  # from_email
                  [email],                   # recipient_list
                  fail_silently=False
            )
            return True
      except Exception as e:
            print(f'Error sending email: {e}')
            return False