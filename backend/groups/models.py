from django.db import models
import uuid
from django.conf import settings

class Group(models.Model): # User : Group = 1 : N
    group_id = models.BigAutoField(
        primary_key=True, 
        unique=True, 
        verbose_name="group_id"
    )
    group_name = models.CharField(max_length=15, verbose_name="group_name", default="group")
    code = models.UUIDField(
        unique=True,
        editable=False,
        default=uuid.uuid4,
        verbose_name="code",
    )
    leader = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='leader_user', on_delete=models.CASCADE, null=False, db_column='leader')
    member = models.ManyToManyField(settings.AUTH_USER_MODEL, through="Member", related_name="member_in_group")

    def __str__(self):
        return self.group_name

class Member(models.Model): # Group : Member = 1 : N && User : Member = N : N
    user_FK = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="group_member" , on_delete=models.CASCADE, db_column='user_FK')
    group_FK = models.ForeignKey(Group, related_name="group_in", on_delete=models.CASCADE, db_column='group_FK')
