from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView
from groups.serializers import ShowGroupSerializer, DetailGroupSerializer, CreateGroupSerializer, JoinGroupSerializer
from groups.models import Group, Member
# from rest_framework.response import Response
# from blog.models import Post, Comment

class ShowGroupView(APIView):
    queryset = Group.objects.all()
    serializer_class = ShowGroupSerializer

class DetailGroupView(APIView):
    queryset = Group.objects.all()
    serializer_class = DetailGroupSerializer

class CreateGroupView(APIView):
    queryset = Group.objects.all()
    serializer_class = CreateGroupSerializer

class JoinGroupView(APIView):
    

# def post(self, request):
#         input = CustomUserSerializer(data=request.data)
#         if reg_serializer.is_valid():
#             new_user = reg_serializer.save() # Query Type
            
#             return Response(
#                 {
#                     "user": CustomUserSerializer(new_user).data, # JSON Type
#                     "message": "회원가입이 완료되었습니다!"
#                 },
#                 status = status.HTTP_201_CREATED,
#             )
#         return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)