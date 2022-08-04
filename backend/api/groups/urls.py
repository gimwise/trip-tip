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
    path('<int:pk>/meetings/<int:m_pk>/', DetailMeetingView.as_view(), name="meeting-detail"),
    path('<int:pk>/meetings/<int:m_pk>/update/', UpdateMeetingView.as_view(), name="meeting-update"),
    # path('<int:pk>/meetings/<int:m_pk>/delete/', DeleteMeetingView.as_view(), name="meeting-delete"),
    # path('<int:pk>/meetings/<int:m_pk>/completion/', CompletionMeetingView.as_view(), name="group-completion"),

    path('<int:pk>/meetings/<int:m_pk>/receipts/create/', CreateReceiptView.as_view(), name="receipt-create"),
    # path('<int:pk>/meetings/<int:m_pk>/receipts/<int:r_pk>/', DetailReceiptView.as_view(), name="receipt-detail"),   
]