from django.contrib import admin

from .models import *

@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    ordering = ('group_id',)
    list_display = ('group_id', 'group_name', 'code', 'leader')

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    ordering = ('-group_id',)
    list_display = ('group_id', 'user_id',)

@admin.register(Meeting)
class MeetingAdmin(admin.ModelAdmin):
    ordering = ('-group_id',)
    list_display = ('meeting_id', 'meeting_name','group_id' ,'is_clear', 'create_dt')

@admin.register(Receipt)
class ReceiptAdmin(admin.ModelAdmin):
    ordering = ('-meeting_id',)
    list_display = ('receipt_name', 'paid_by', 'meeting_id', 'is_clear')

@admin.register(Participant)
class ParicipantAdmin(admin.ModelAdmin):
    ordering = ('-receipt_id',)
    list_display = ('user_id', 'receipt_id', 'is_clear')


# admin.site.register(Meeting)
# admin.site.register(Receipt)
# admin.site.register(Participant)
