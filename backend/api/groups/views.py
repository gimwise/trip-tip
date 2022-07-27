from asyncio import QueueEmpty
from tokenize import group
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView

from rest_framework_simplejwt.tokens import AccessToken

from users.models import CustomUser
from groups.models import Group, Member
from .serializers import GroupListSerializer, GroupSerializer, MemberSerializer
from .permissions import GroupLeaderPermission

'''
def get_user_from_access_token(access_token_str):
    access_token_obj = AccessToken(access_token_str)
    user_id=access_token_obj['user_id']
    user=CustomUser.objects.get(user_id=user_id)
    content =  {
        'user_id' : user.user_id, 
        'nickname': user.nickname, 
        'username': user.username
    }
    return Response(content)
'''

# ======================================================================================== #
# Group

class GroupView(ListAPIView): # 이 부분 수정 필요. 코드 맘에 안 듦.
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        user = request.user
        member_query = Member.objects.filter(user_id=user).values('group_id__group_id')    
        data = []

        for q in member_query:
            group = Group.objects.get(group_id=q['group_id__group_id'])
            group_member_query = group.member_set.all().values('user_id__username')

            member_list, b = {}, 0
            for a in group_member_query:
                member_list[f"{b}"] = CustomUser.objects.get(username=a['user_id__username'])
                b += 1
            
            data.append({
                'leader_nick': group.leader,
                'group_id': group.group_id,
                'group_name': group.group_name,
                'code': group.code,
                'member': member_list.values()
            })
        serializer = GroupListSerializer(data, many=True)
        return Response(serializer.data)

class DetailGroupView(RetrieveAPIView):
    permission_classes = [IsAuthenticated, GroupLeaderPermission]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class CreateGroupView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    # queryset = Group.objects.all()
    # serializer_class = GroupSerializer
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

# ======================================================================================== #
# Meeting

class CompletionMeetingView(APIView):
    permission_classes = [IsAuthenticated, GroupLeaderPermission]
    def post(self, request):
        pass



# ======================================================================================== #
# Receipt




# ======================================================================================== #
# Participant



