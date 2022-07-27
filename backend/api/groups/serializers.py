from dataclasses import field
from rest_framework import serializers
from groups.models import Group, Member

class GroupListSerializer(serializers.ModelSerializer):
    leader_nick = serializers.CharField(max_length=45)
    member = serializers.ListField(child=serializers.CharField())
    class Meta:
        model = Group
        fields = ('leader_nick', 'group_name', 'group_id', 'code', 'member')

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'




