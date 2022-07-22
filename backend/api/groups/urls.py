from django.urls import path
from .views import (
    GroupView,
    DetailGroupView,
    # CreateGroupView,
    # JoinGroupView,
)

app_name = 'groups'

urlpatterns = [
    path('', GroupView.as_view(), name="group-list"),
    path('<int:pk>/', DetailGroupView.as_view(), name="group-detail"),
    # path('create/', CreateGroupView.as_view(), name="group-create"),
    # path('join/', JoinGroupView.as_view(), name="group-join"),
]