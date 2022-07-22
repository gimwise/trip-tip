from django.urls import path, include

app_name = 'api'

urlpatterns = [
    # path('', name=''),
    path('groups/', include('api.groups.urls', namespace='groups')),
    path('users/', include('api.users.urls', namespace='users')),
]
