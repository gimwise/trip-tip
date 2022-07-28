from django.urls import path
from .views import *

app_name = 'groups'

urlpatterns = [
    path('', GroupView.as_view(), name="group-list"),
    path('<int:pk>/', DetailGroupView.as_view(), name="group-detail"),
    path('create/', CreateGroupView.as_view(), name="group-create"),
    path('join/', JoinGroupView.as_view(), name="group-join"),
    # path('delete/', DeleteGroupView.as_view(), name="group-delete"),

    path('<int:pk>/meetings/create/', CreateMeetingView.as_view(), name="meeting-create"),
    path('<int:pk>/meetings/<int:meeting_id>/', DetailMeetingView.as_view(), name="meeting-detail"),
    path('<int:pk>/meetings/<int:meeting_id>/update/', UpdateMeetingView.as_view(), name="meeting-update"),
    # path('<int:pk>/meetings/<int:meeting_id>/delete/', DeleteMeetingView.as_view(), name="meeting-delete"),
    # path('<int:pk>/meetings/<int:meeting_id>/completion/', CompletionMeetingView.as_view(), name="group-completion"),
]