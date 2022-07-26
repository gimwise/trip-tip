from django.urls import path
from .views import (
    GroupView,
    DetailGroupView,
    CompletionGroupView,
    CreateGroupView,
    JoinGroupView,
)

app_name = 'groups'

urlpatterns = [
    path('', GroupView.as_view(), name="group-list"),
    path('<int:pk>/', DetailGroupView.as_view(), name="group-detail"),
    path('<int:pk>/completion/', CompletionGroupView.as_view(), name="group-completion"),
    path('create/', CreateGroupView.as_view(), name="group-create"),
    path('join/', JoinGroupView.as_view(), name="group-join"),
]