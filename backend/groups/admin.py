from django.contrib import admin

from .models import Group, Member

@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('group_id', 'group_name', 'code', 'leader')

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('group_id',)