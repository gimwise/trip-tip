from json import loads, dumps
from collections import OrderedDict

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, GenericAPIView

from users.models import CustomUser
from groups.models import Group, Member
from .serializers import *
from .permissions import GroupLeaderPermission, GroupMemberPermission

# ======================================================================================== #
# Group (Update, Delete 만들어야 됨)

class CreateGroupView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.user.user_id
        request.data['leader'] = user_id
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            new_group = serializer.save()

            # member tbl 등록
            data = {
                "user_id": user_id,
                "group_id": new_group.group_id
            }
            member_serializer = MemberSerializer(data=data)
            if member_serializer.is_valid():
                member_serializer.save()
            else:
                Group.objects.delete(code=new_group.code)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(
                {
                    "group_name" : new_group.group_name,
                    "code": new_group.code,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupView(ListAPIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        user = request.user
        member_query = Member.objects.filter(user_id=user).values('group_id__group_id')    
        data = []

        for q in member_query:
            group = Group.objects.get(group_id=q['group_id__group_id'])
            group_member_query = group.member_set.all().values('user_id__username')
            group_member_list = [d['user_id__username'] for d in group_member_query]
            
            data.append({
                'leader_nick': group.leader,
                'group_id': group.group_id,
                'group_name': group.group_name,
                'code': group.code,
                'member': group_member_list
            })
        serializer = GroupListSerializer(data, many=True)
        return Response(serializer.data)

class DetailGroupView(RetrieveAPIView):
    permission_classes = [IsAuthenticated, GroupLeaderPermission]
    
    def get(self, request, pk, *args, **kwargs):
        group = Group.objects.get(group_id=pk)
        member = group.member_set.all().values('user_id__username') # 이런 식으로 하면 이슈가 발생할 수도 있음...
        member_list = [d['user_id__username'] for d in member]

        meeting = group.meeting_set.all().values()
        meeting_serializer = ListMeetingSerializer(meeting, many=True)
        meeting_json = loads(dumps(meeting_serializer.data))

        data = {
            'leader_nick': group.leader,
            'group_id': group.group_id,
            'group_name': group.group_name,
            'code': group.code,
            'member': member_list,
            'meeting': meeting_json,
        }
        serializer = GroupMeetingListSerializer(data)
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

    def get(self, request, pk, meeting_id, *args, **kwargs):
        meeting = Meeting.objects.get(meeting_id=meeting_id)
        meeting_json = ListMeetingSerializer(meeting)
        return Response(meeting_json.data)

class UpdateMeetingView(UpdateAPIView):
    permission_classes = [IsAuthenticated, GroupMemberPermission]
    serializer_class = UpdateMeetingSerializer

    def update(self, request, *args, **kwargs): # PUT
        group_id = kwargs.pop('pk', False)
        meeting_id = kwargs.pop('meeting_id', False)

        instance = Meeting.objects.get(meeting_id=meeting_id)
        data = {'group_id': group_id,'create_dt': request.data['date']}

        serializer = self.get_serializer(instance, data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(data["create_dt"])

class DeleteMeetingView(APIView):
    pass

class CompletionMeetingView(APIView):
    permission_classes = [IsAuthenticated, GroupLeaderPermission]
    def post(self, request):
        pass

# ======================================================================================== #
# Receipt




# ======================================================================================== #
# Participant



