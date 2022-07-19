from django.urls import path, include

app_name = 'api'

urlpatterns = [
    # path('', name=''),
    # path('group/', include('groups.urls', namespace='groups')),
    path('users/', include('api.users.urls', namespace='users')),
]
