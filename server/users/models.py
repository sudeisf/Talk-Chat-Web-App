from django.db import models
from django.contrib.auth.models import AbstractUser , Group, Permission
from cloudinary.models import CloudinaryField

class User(AbstractUser):
      class Gender(models.TextChoices):
            MALLE = 'male',
            FEMALE = "female"
    
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

      email = models.EmailField(unique=True)
      username = models.CharField(max_length=30 , unique=True)
      firstName = models.CharField(max_length=30 ,null=True , blank=True) 
      lastName = models.CharField(max_length=30 ,null=True , blank=True)
      birth_date = models.DateField(null=True,blank=True)
      gender = models.CharField(max_length=200, choices=Gender.choices,blank=True , null=True)
      phone_number = models.CharField(max_length=20,null=True,blank=True)
      profile_image =  CloudinaryField('image', null=True, blank=True)
      created_at = models.DateTimeField(auto_now_add=True)
      updated_at = models.DateTimeField(auto_now=True)

      USERNAME_FIELD = "email"
      REQUIRED_FIELDS = ['username', 'firstName', 'lastName']


      def __str__(self) -> str:
            return self.username