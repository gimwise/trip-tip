from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Register
class CustomAccountManger(BaseUserManager):
    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')
        return self.create_user(username, password, **extra_fields)

    def create_user(self, username, password, **extra_fields):
        user = self.model(
            username=username, password=password, **extra_fields
        )
        user.set_password(password)
        user.save()

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=45, unique=True, verbose_name="username")
    nickname = models.CharField(max_length=45, )
    phone = models.CharField(max_length=45, )
    bank = models.CharField(max_length=45,)
    bank_account = models.CharField(max_length=45,)
    profile_img = models.ImageField(blank=True, null=True)
    start_date = models.DateTimeField(default=timezone.now)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomAccountManger()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = [] 

    def __str__(self):
        return self.username

