from rest_framework import serializers
from groups.models import Group

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


# class CreateGroupSerializer(serializers.Serializer):
#     user = CustomUser.objects.get(name="username")
#     group = Group.objects.get(name='group_name')
#     user.groups.add(group)

# class JoinGroupSerializer(serializers.Serializer):
#     pass

