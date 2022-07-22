from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView

from rest_framework_simplejwt.tokens import AccessToken

from users.models import CustomUser
from groups.models import Group, Member
from .serializers import GroupSerializer, MemberSerializer
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

class GroupView(ListAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = GroupSerializer

    def get(self, request):
        user = request.user
        member = Member.objects.filter(user_id=user)
        query = member.values('group_id__group_id') # Member Fk로 Group정보 가져옴
        data = []
        for i in range(len(query)):
            group = Group.objects.filter(group_id=query[i]['group_id__group_id'])
            data.append({
                'leader': group[0].leader,
                'group_id': group[0].group_id,
                'group_name': group[0].group_name,
                'code': group[0].code,
            })
        serializer = GroupSerializer(data, many=True)
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
        user_id = request.user.user_id
        code = request.data['code']
        group_id = Group.objects.filter(code=code)[0].group_id
        data = {
            "user_id": user_id,
            "group_id": group_id
        }
        serializer = MemberSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"m" : "성공적으로 가입되었습니다."},
                status=status.HTTP_200_OK
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




    