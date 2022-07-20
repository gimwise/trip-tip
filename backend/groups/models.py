from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone

import random
import string

def get_group_code():
    n = 30
    res = ""
    for i in range(n):
        res += str(random.choice(string.ascii_uppercase))
    return res

CustomUser = settings.AUTH_USER_MODEL

class Group(models.Model): # User : Group = 1 : N
    group_id = models.BigAutoField(
        primary_key=True, 
        unique=True, 
        verbose_name="group_id"
    )
    group_name = models.CharField(max_length=45, verbose_name="group_name", default="group")
    code = models.CharField(
        max_length=45,
        unique=True,
        editable=False,
        default=get_group_code(),
        verbose_name="code",
    )
    leader = models.ForeignKey(CustomUser, related_name='leader_user', on_delete=models.CASCADE, null=True, db_column='leader')

    def __str__(self):
        return self.group_name

class Member(models.Model):
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, db_column='user_id',)
    group_id = models.ForeignKey(Group, on_delete=models.CASCADE, db_column='group_id',)

class Meeting(models.Model):
    meeting_id = models.BigAutoField(
        primary_key=True, 
        unique=True, 
        verbose_name="meeting_id"
    )
    meeting_name = models.CharField(max_length=45, verbose_name="meeting_name", default="meeting")
    create_dt = models.DateTimeField(default=timezone.now, blank=True, null=True)
    is_clear = models.BooleanField(default=False)
    group_id = models.ForeignKey(Group, on_delete=models.CASCADE, db_column='group_id')

    def __str__(self):
        return self.meeting_name

class Receipt(models.Model):
    receipt_id = models.BigAutoField(
        primary_key=True, 
        unique=True, 
        verbose_name="receipt_id"
    )
    receipt_name = models.CharField(max_length=45, verbose_name="receipt_name", default="receipt")
    total = models.IntegerField(default=0,)
    is_clear = models.BooleanField(default=False)
    meeting_id = models.ForeignKey(Meeting, on_delete=models.CASCADE, db_column='meeting_id')
    paid_by = models.ForeignKey(
        CustomUser,
        related_name='manager',
        on_delete=models.CASCADE, 
        db_column='paid_by',
    )

    def __str__(self):
        return self.receipt_name
    
class Participant(models.Model):
    participant_id = models.BigAutoField(
        primary_key=True, 
        unique=True, 
        verbose_name="participant_id"
    )
    money = models.IntegerField(default=0)
    is_clear = models.BooleanField(default=False)
    receipt_id = models.ForeignKey(Receipt, on_delete=models.CASCADE, db_column='receipt_id')
    user_id = models.ForeignKey(CustomUser, on_delete=models.CASCADE, db_column='user_id')
    

