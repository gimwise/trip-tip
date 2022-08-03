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

class CreateGroupView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def create(self, request, *args, **kwargs):
        try:
            request.data['leader'] = request.user.user_id
            member = request.data.pop('member')
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
        users =CustomUser.objects.filter(nickname__in=member).values('nickname', 'username', 'profile_img')
        users_s = UserListSerializer(users, many=True)
        return Response({
                "group_info": serializer.data,
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

class CreateMeetingView(APIView): # 이미 존재하는 날짜에 대한 예외처리는 Serializer에서 관리
    permission_classes = [IsAuthenticated, GroupMemberPermission]

    def post(self, request, *args, **kwargs): # pk == self.kwargs.get('pk') == group_id
        group_id = kwargs.pop('pk', False)
        
        data = {"group_id" : group_id, "create_dt": request.data['date']}
        serializer = CreateMeetingSerializer(data=data)  
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)

class DetailMeetingView(APIView): # 출력 format에 receipt 리스트 추가 예정!!!!!!!
    permission_classes = [IsAuthenticated, GroupMemberPermission]

    def get(self, request, pk, m_pk, *args, **kwargs):
        meeting = Meeting.objects.get(meeting_id=m_pk)
        meeting_json = ListMeetingSerializer(meeting)
        return Response(meeting_json.data)

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
    serializer_class = ParticipantSerializer

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super(CreateReceiptView, self).get_serializer(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        # 필수 데이터 수집
        group_id = kwargs.pop('pk', False)
        meeting_id = kwargs.pop('m_pk', False)
        user = request.user
        receipt_name = request.data['receipt_name']
        participants = request.data['participants']

        total = 0
        for cost in participants.values():
            total += cost
       
        # Receipt create
        data = { 'receipt_name':receipt_name,'total':total, 'paid_by': user.user_id, 'meeting_id': meeting_id, }
        serializer = ReceiptSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # 2차 데이터 수집
        receipt_id = serializer.data['receipt_id']

        group = Group.objects.get(group_id=group_id)
        member_query = group.member_set.all().values('user_id__username', 'user_id__user_id')
        member_dict = {d['user_id__username'] : d['user_id__user_id'] for d in member_query}
  
        # Participant create
        participant_list = []
        for key, value in participants.items():
            participant_list.append({
            'receipt_id': receipt_id, 
            'user_id': member_dict[key],
            'money': value
            })
        serializer2 = self.get_serializer(data=participant_list, many=True)
        serializer2.is_valid(raise_exception=True)
        serializer2.save()

        return Response({
            "message": "정상적으로 영수증이 등록되었습니다!",
            "receipt_name": receipt_name,
            "paid_by": user.username,
            "total": total,
            "payment" : participants
            },status=status.HTTP_200_OK
        )

class ListReceiptView(GenericAPIView):
    permission_classes = [IsAuthenticated, GroupMemberPermission]
    queryset = Receipt.objects.all()

    def get(self, request, *args, **kwargs):
        meeting_id = kwargs.pop('m_pk', False)
        meeting = Meeting.objects.get(meeting_id=meeting_id)
        receipts = meeting.receipt_set.all()
        
        serializer = ListReceiptSerializer(instance=receipts, many=True)
        return Response(serializer.data)

class DetailReceipt(ListAPIView):
    queryset = Receipt.objects.all()
    serializer_class = ReceiptSerializer
    name = 'receipt-detail'

# ======================================================================================== #
# Participant

class ListParticipant(ListAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    name = 'participant-list'
