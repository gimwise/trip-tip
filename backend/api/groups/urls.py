from django.urls import path
from .views import *

app_name = 'groups'

urlpatterns = [
    path('', GroupView.as_view(), name="group-list"),
    path('<int:pk>/', DetailGroupView.as_view(), name="group-detail"),
    path('create/', CreateGroupView.as_view(), name="group-create"),
    path('join/', JoinGroupView.as_view(), name="group-join"),
    # path('delete/', DeleteGroupView.as_view(), name="group-delete"),

    path('<int:pk>/meeting/<int:meeting_id>/', DetailMeetingView.as_view(), name="meeting-detail"),
    path('<int:pk>/create/', CreateMeetingView.as_view(), name="meeting-create"),
    # path('<int:pk>/delete/', DeleteMeetingView.as_view(), name="meeting-delete"),
    # path('<int:pk>/completion/', CompletionMeetingView.as_view(), name="group-completion"),
]