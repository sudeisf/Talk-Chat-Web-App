from random import choice
from django.db import models
from django.contrib.auth.models import AbstractUser , Group, Permission
from cloudinary.models import CloudinaryField
from django.utils import timezone
from datetime import timedelta
from django.db.models import Q

class User(AbstractUser):
      class Gender(models.TextChoices):
            MALE = 'male', 'Male'
            FEMALE = 'female', 'Female'

      class Role(models.TextChoices):
            LEARNER = 'learner', 'Learner'
            HELPER = 'helper', 'Helper'

            
      class LoginMethod(models.TextChoices):
            EMAIL = 'email', 'Email'
            GOOGLE = 'google', 'Google'
            GITHUB = 'github', 'Github'
    
      groups = models.ManyToManyField(
            Group,
            related_name= "Customuser_groups",
            blank=True
      )
      user_permissions = models.ManyToManyField(
            Permission,
            related_name="CustomUsers_user_permissions",
            blank=True
      )
      
      login_method = models.CharField(max_length=20, choices=LoginMethod.choices, default=LoginMethod.EMAIL)

      role= models.CharField(max_length=20, choices=Role.choices , default=Role.LEARNER)
      bio = models.TextField(max_length=500, null=True, blank=True)
      profession = models.CharField(max_length=200, null=True, blank=True)

      city = models.CharField(max_length=200, null=True, blank=True)
      country = models.CharField(max_length=200, null=True, blank=True)


      email = models.EmailField()
      username = models.CharField(max_length=30 , unique=True)
      birth_date = models.DateField(null=True,blank=True)
      gender = models.CharField(max_length=200, choices=Gender.choices,blank=True , null=True)
      phone_number = models.CharField(max_length=20,null=True,blank=True)

      cover_image =  CloudinaryField('image', null=True, blank=True)
      profile_image =  CloudinaryField('image', null=True, blank=True)

      google_id = models.CharField(max_length=255, null=True, blank=True)
      github_id = models.CharField(max_length=255, null=True, blank=True)
      is_google_account = models.BooleanField(default=False)
      is_github_account = models.BooleanField(default=False)
      
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)

      REQUIRED_FIELDS = ["first_name", "last_name"]
      
      class Meta:
            constraints =[
                  models.UniqueConstraint(
                        fields = ["email"],
                        condition=Q(login_method='email'),
                        name="unique_email_for_email_login"
                  ),
                  models.UniqueConstraint(
                        fields = ["google_id"],
                        condition=Q(login_method='google'),
                        name="unique_google_id_for_google_login"
                  ),
                  models.UniqueConstraint(
                        fields = ["github_id"],
                        condition=Q(login_method='github'),
                        name="unique_github_id_for_github_login"
                  ),
            ]



      def __str__(self) -> str:
            return self.username

class Tag(models.Model):
      name = models.CharField(max_length=50, unique=True)
      description = models.TextField(blank=True)

      def __str__(self):
            return self.name

class UserTag(models.Model):
      user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_tags')
      tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name='user_tags')
      
      class Meta:
        unique_together = ('user', 'tag')

      def __str__(self):
            return f"{self.user.username} - {self.tag.name}"
      
      
class Otp(models.Model):
      email = models.EmailField()
      code = models.PositiveBigIntegerField()
      created_at = models.DateTimeField(auto_now_add=True)
      is_expired = models.BooleanField(default=False)
      expires_at = models.DateTimeField()
      is_used = models.BooleanField(default=False)

      def __str__(self):
            return f"{self.email} - {self.code}"
      
      def save(self,*args,**kwargs):
            if not self.expires_at:
                  self.expires_at = timezone.now() + timedelta(minutes=15)
            super().save(*args,**kwargs)

      @property
      def is_valid(self):
            return not self.is_used and self.expires_at > timezone.now()