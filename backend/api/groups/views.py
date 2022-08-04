from ast import dump
from json import loads, dumps
from collections import OrderedDict
from urllib import response
from django.db import transaction
from django.db.models import Q
from django.forms.models import model_to_dict

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, GenericAPIView, 
)

from users.models import CustomUser
from groups.models import Group, Member
from .serializers import *
from api.users.serializers import UserListSerializer
from config.permissions import GroupMemberPermission

# ======================================================================================== #
# Group (Update, Delete 만들어야 됨)

class CreateGroupView(CreateAPIView): # Total 추가할 것
    permission_classes = [IsAuthenticated]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def create(self, request, *args, **kwargs):
        try:
            request.data['leader'] = request.user.user_id
            member = request.data.pop('member')
            member.append(request.user.nickname)
        except KeyError:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            instance = serializer.save()
            id_list = CustomUser.objects.filter(nickname__in=member).values_list('user_id', flat=True)
            for id in id_list:
                s = GroupMemberSerializer(data={"user_id": id, "group_id": instance.group_id})
                s.is_valid(raise_exception=True)
                s.save()

        headers = self.get_success_headers(serializer.data)
        users = CustomUser.objects.filter(nickname__in=member).values('nickname', 'username', 'profile_img')
        users_s = UserListSerializer(users, many=True)
        return Response({
                "group_info": {
                    "group_name": instance.group_name,
                    "code": instance.code,
                    "leader": request.user.username,
                },
                "member_info": users_s.data, 
            },status=status.HTTP_201_CREATED, headers=headers)

class GroupView(ListAPIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        user = request.user
        member = Member.objects.filter(user_id=user)
        groups = Group.objects.filter(group_id__in=member.values_list('group_id'))
        serializer = ListGroupSerializer(groups, many=True)
        return Response(serializer.data)

class DetailGroupView(RetrieveAPIView):
    permission_classes = [IsAuthenticated, GroupMemberPermission]
    
    def get(self, request, *args, **kwargs):
        group_id = kwargs.pop('pk', False)
        group = Group.objects.get(group_id=group_id)
        serializer = GroupMeetingListSerializer(group)
        return Response(serializer.data)

class JoinGroupView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user = request.user
        code = request.data['code']
        group = Group.objects.filter(code=code)

        if not group.exists():
            return Response(
                    {"message": "존재하지 않는 그룹입니다."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

        group_id = group[0].group_id  
        data = {
            "user_id": user.user_id,
            "group_id": group_id
        }
        serializer = MemberSerializer(data=data)

        if serializer.is_valid():
            if user.member_set.filter(group_id=data['group_id']).exists():
                return Response(
                    {"message": "이미 가입된 그룹입니다."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            serializer.save()
            return Response(
                {"message" : "성공적으로 가입되었습니다."},
                status=status.HTTP_200_OK
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteGroupView(): # 정산이 완료된 멤버에 한해서 탈퇴 가능. 현재 구현 불가능 (필요 데이터 부족)
    pass

# ======================================================================================== #
# Meeting

class CreateMeetingView(APIView):
    permission_classes = [IsAuthenticated, GroupMemberPermission]

    def post(self, request, *args, **kwargs):
        group_id = kwargs.pop('pk', False)
        
        data = {"group_id" : group_id, "create_dt": request.data['date']}
        serializer = CreateMeetingSerializer(data=data)  
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class DetailMeetingView(APIView): # 출력 format에 receipt 리스트 추가 예정!!!!!!!
    permission_classes = [IsAuthenticated, GroupMemberPermission]

    def get(self, request, *args, **kwargs):
        meeting_id = kwargs.pop('m_pk', False)
        meeting = Meeting.objects.get(meeting_id=meeting_id)
        serializer_meeting = MeetingSerializer(meeting)

        receipts = meeting.receipt_set.all()
        serializer_receipt = ListReceiptSerializer(instance=receipts, many=True)

        return Response({
            "meeting_info": serializer_meeting.data,
            "receipts_info": serializer_receipt.data
        })

class UpdateMeetingView(UpdateAPIView):
    permission_classes = [IsAuthenticated, GroupMemberPermission]
    serializer_class = UpdateMeetingSerializer

    def update(self, request, *args, **kwargs): # PUT
        group_id = kwargs.pop('pk', False)
        meeting_id = kwargs.pop('m_pk', False)

        instance = Meeting.objects.get(meeting_id=meeting_id)
        data = {'group_id': group_id,'create_dt': request.data['date']}

        serializer = self.get_serializer(instance, data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(data["create_dt"])

class DeleteMeetingView(APIView):
    pass

class CompletionMeetingView(APIView):
    permission_classes = [IsAuthenticated, GroupMemberPermission]
    def post(self, request):
        pass

# ======================================================================================== #
# Receipt

class CreateReceiptView(CreateAPIView): 
    permission_classes = [IsAuthenticated, GroupMemberPermission]
    serializer_class = ReceiptSerializer

    # 지우지 마시오.
    # def get_serializer(self, *args, **kwargs):
    #     if isinstance(kwargs.get('data', {}), list):
    #         kwargs['many'] = True
    #     return super(CreateReceiptView, self).get_serializer(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        try:
            request.data['paid_by'] = request.user.user_id
            request.data['meeting_id'] = kwargs.pop('m_pk', False)

            participants = request.data.pop('participants')
            total = 0
            for v in participants.values():
                total += v
            request.data['total'] = total
        except KeyError:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            instance = serializer.save()
            users = CustomUser.objects.filter(nickname__in=participants)
            id_list = users.values_list('user_id', flat=True)
            for id in id_list:
                s = ParticipantSerializer(data={"user_id": id, "receipt_id": instance.receipt_id})
                s.is_valid(raise_exception=True)
                s.save()

        headers = self.get_success_headers(serializer.data)
        return Response({
                "receipt_info": {
                    "receipt_name": instance.receipt_name, "total": total,
                    "paid_by": {
                        "username": request.user.username, "nickname": request.user.nickname,
                        "profile_img": request.user.profile_img or None
                    }, "is_clear": instance.is_clear
                },
                "payment": users.values('username', 'nickname', 'profile_img'), 
            },status=status.HTTP_201_CREATED, headers=headers)

class DetailReceipt(ListAPIView):
    pass

# ======================================================================================== #
# Participant

class ListParticipant(ListAPIView):
    pass
