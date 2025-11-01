from random import choice
from django.db import models
from django.contrib.auth.models import AbstractUser , Group, Permission
from cloudinary.models import CloudinaryField
from django.utils import timezone
from datetime import timedelta

class User(AbstractUser):
      class Gender(models.TextChoices):
            MALLE = 'male',
            FEMALE = "female"

      class Role(models.TextChoices):
            LEARNER = 'learner',
            HELPER = 'helper'
    
      groups = models.ManyToManyField(
            Group,
            related_name= "Customuser_groups",
            blank=True
      )
      user_permissions = models.ManyToManyField(
            Permission,
            related_name="ustomUsers_user_permissions",
            blank=True
      )

      role= models.CharField(max_length=20, choices=Role.choices)
      bio = models.TextField(max_length=500, null=True, blank=True)
      profession = models.CharField(max_length=200, null=True, blank=True)

      city = models.CharField(max_length=200, null=True, blank=True)
      country = models.CharField(max_length=200, null=True, blank=True)


      email = models.EmailField(unique=True)
      username = models.CharField(max_length=30 , unique=True)
      firstName = models.CharField(max_length=30 ,null=True , blank=True) 
      lastName = models.CharField(max_length=30 ,null=True , blank=True)
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

      USERNAME_FIELD = "email"
      REQUIRED_FIELDS = ['username', 'firstName', 'lastName']


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
            return not self.is_used and self.expires_at < timezone.now()