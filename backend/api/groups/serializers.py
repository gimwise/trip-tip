from dataclasses import field
from rest_framework import serializers
from groups.models import *

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

class MeetingSerializer(serializers.ModelSerializer):
    create_dt = serializers.DateTimeField(default=timezone.now, format='%Y-%m-%d')
    class Meta:
        model = Meeting
        fields = '__all__'
class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = '__all__'


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'

