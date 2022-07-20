from rest_framework import serializers
from groups.models import Group
from users.models import CustomUser
from django.contrib.auth.models import Group

class ShowGroupSerializer(serializers.Serializer):
    class Meta:
        model = Group
        fields = ['group_name', 'member']

class DetailGroupSerializer(serializers.Serializer):
    class Meta:
        model = Group
        fields = ['group_name', 'member', 'receipt', 'mettings']

class CreateGroupSerializer(serializers.Serializer):
    user = CustomUser.objects.get(name="username")
    group = Group.objects.get(name='group_name')
    user.groups.add(group)

class JoinGroupSerializer(serializers.Serializer):

    
# paid by
def pay(self, request):
        reg_serializer = CustomUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            new_user = reg_serializer.save() # Query Type
            
            return Response(
                {
                    "user": CustomUserSerializer(new_user).data, # JSON Type
                    "message": "회원가입이 완료되었습니다!"
                },
                status = status.HTTP_201_CREATED,
            )
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)