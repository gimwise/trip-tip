from json import loads, dumps

from django.contrib.auth import get_user_model
from django.forms import CharField
from rest_framework import serializers
from groups.models import *

CustomUser = get_user_model()

# group
class GroupListSerializer(serializers.ModelSerializer):
    leader_nick = serializers.CharField(max_length=45)
    member = serializers.ListField(child=serializers.CharField())
    class Meta:
        model = Group
        fields = ('leader_nick', 'group_name', 'group_id', 'code', 'member')

class GroupMeetingListSerializer(serializers.ModelSerializer):
    leader_nick = serializers.CharField(max_length=45)
    member = serializers.ListField(child=serializers.CharField())
    meeting = serializers.ListField(child=serializers.DictField())
    class Meta:
        model = Group
        fields = ('leader_nick', 'group_name', 'group_id', 'code', 'member', 'meeting')

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

# member
class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

# meeting
class CreateMeetingSerializer(serializers.ModelSerializer):
    create_dt = serializers.DateField(format='%Y-%m-%d')
    class Meta:
        model = Meeting
        fields = '__all__'

    def validate(self, attrs):
        now = attrs['create_dt']
        
        existing_meeting = Meeting.objects.filter(group_id=attrs['group_id'].group_id)
        if existing_meeting:
            instance = ListMeetingSerializer(existing_meeting, many=True)
            inst_list = loads(dumps(instance.data))
            if next((item for item in inst_list if item['create_dt'] == str(now)), None):
                raise serializers.ValidationError(f"{now} 날짜의 미팅이 이미 존재합니다.")
        return attrs

class ListMeetingSerializer(serializers.ModelSerializer):
    create_dt = serializers.DateField(format='%Y-%m-%d')
    class Meta:
        model = Meeting
        exclude = ['group_id']

class UpdateMeetingSerializer(serializers.ModelSerializer):
    create_dt = serializers.DateField(format='%Y-%m-%d')
    class Meta:
        model = Meeting
        fields = ['group_id', 'create_dt']

    def validate(self, attrs):
        new = attrs['create_dt']

        existing_meeting = Meeting.objects.filter(group_id=attrs['group_id'].group_id)
        if existing_meeting:
            instance = ListMeetingSerializer(existing_meeting, many=True)
            inst_list = loads(dumps(instance.data))
            if next((item for item in inst_list if item['create_dt'] == str(new)), None):
                raise serializers.ValidationError(f"{new} 날짜의 미팅이 이미 존재합니다.")
        return attrs

# receipt
class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = '__all__'

class ListReceiptSerializer(serializers.ModelSerializer):
    paid_by_name = serializers.CharField()
    participants = serializers.ListField()
    class Meta:
        model = Receipt
        fields = ['receipt_name', 'total', 'paid_by_name', 'participants']

# participant
class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = ['username']

