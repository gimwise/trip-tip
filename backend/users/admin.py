from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class UserAdminConfig(UserAdmin):
    ordering = ('-start_date',)
    list_display = ('user_id', 'username', 'nickname', 'is_active', 'is_staff')

    fieldsets = (
        (None, {'fields': ('nickname', 'username', 'password',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active',)}),
        ('Personal', {'fields': ('phone', 'bank', 'bank_account','profile_img',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields' : ('nickname', 'username', 'password', 'is_active', 'is_staff')}
        ),
    )

admin.site.register(CustomUser, UserAdminConfig)
