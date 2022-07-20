from django.urls import path
from .views import (
    ShowGroupView,
    DetailGroupView,
    CreateGroupView,
    JoinGroupView
)

app_name = 'groups'

urlpatterns = [
    path('group/', ShowGroupView.as_view(), name="group-show"),
    path('group/<int::pk>', DetailGroupView.as_view(), name="group-detail"),
    path('create/', CreateGroupView.as_view(), name="group-create"),
    path('join/', JoinGroupView.as_view(), name="group-join"),
]