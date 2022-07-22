from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import DjangoModelPermissions, IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveAPIView

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import AccessToken

from config.permissions import GroupLeaderPermission
from users.models import CustomUser
from groups.models import Group, Member
from .serializers import GroupSerializer

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

class GroupView(ListAPIView):
    permission_classes = [IsAuthenticated]
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
    permission_classes = [IsAuthenticated]
    serializer_class = GroupSerializer
    queryset = Group.objects.all()

# class CreateGroupView(APIView):
#     queryset = Group.objects.all()
#     serializer_class = CreateGroupSerializer


    