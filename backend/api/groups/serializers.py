from dataclasses import field
from json import loads, dumps

from django.db.models import F
from django.contrib.auth import get_user_model
from django.forms import CharField
from rest_framework import serializers
from groups.models import *
from api.users.serializers import UserListSerializer

CustomUser = get_user_model()

# group
class GroupMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        exclude = ['group_id']

class ListGroupSerializer(serializers.ModelSerializer):
    leader = serializers.StringRelatedField()
    member = serializers.SerializerMethodField(source='group_in')
    class Meta:
        model = Group
        fields = ['group_name', 'code', 'leader', 'member']

    # def get_member(self, users):
    #     return users.group_in.values('user_id__username', flat=True)

    def get_member(self, users):
        return users.group_in.annotate(
            username=F('user_id__username'),
            nickname=F('user_id__nickname'),
            profile_img =F('user_id__profile_img')
            ).values('username', 'nickname', 'profile_img')

# member
class MemberSerializer(serializers.ModelSerializer):
    username = serializers.StringRelatedField(source='user_id')
    class Meta:
        model = Member
        fields = '__all__'

# meeting
class MeetingSerializer(serializers.ModelSerializer):
    create_dt = serializers.DateField(format='%Y-%m-%d')
    class Meta:
        model = Meeting
        exclude = ['meeting_id', 'group_id']

class GroupMeetingListSerializer(serializers.ModelSerializer):
    leader = serializers.StringRelatedField()
    member = serializers.SerializerMethodField(source='group_in')
    meeting = MeetingSerializer(many=True, source='meeting_set')
    class Meta:
        model = Group
        fields = ('leader', 'group_name', 'code', 'member', 'meeting')
    
    def get_member(self, users):
        return users.group_in.annotate(
            username=F('user_id__username'),
            nickname=F('user_id__nickname'),
            profile_img =F('user_id__profile_img')
            ).values('username', 'nickname', 'profile_img')

class CreateMeetingSerializer(serializers.ModelSerializer):
    create_dt = serializers.DateField(format='%Y-%m-%d')
    class Meta:
        model = Meeting
        fields = '__all__'

    def validate(self, attrs):
        now = attrs['create_dt']
        
        existing_meeting = Meeting.objects.filter(group_id=attrs['group_id'].group_id)
        if existing_meeting:
            instance = MeetingSerializer(existing_meeting, many=True)
            inst_list = loads(dumps(instance.data))
            if next((item for item in inst_list if item['create_dt'] == str(now)), None):
                raise serializers.ValidationError(f"{now} 날짜의 미팅이 이미 존재합니다.")
        return attrs

class UpdateMeetingSerializer(serializers.ModelSerializer):
    create_dt = serializers.DateField(format='%Y-%m-%d')
    class Meta:
        model = Meeting
        fields = ['group_id', 'create_dt']

    def validate(self, attrs):
        new = attrs['create_dt']

        existing_meeting = Meeting.objects.filter(group_id=attrs['group_id'].group_id)
        if existing_meeting:
            instance = MeetingSerializer(existing_meeting, many=True)
            inst_list = loads(dumps(instance.data))
            if next((item for item in inst_list if item['create_dt'] == str(new)), None):
                raise serializers.ValidationError(f"{new} 날짜의 미팅이 이미 존재합니다.")
        return attrs

# receipt
class ListReceiptSerializer(serializers.ModelSerializer):
    paid_by = serializers.StringRelatedField()
    # participant = ListParticipantSerializer(many=True, read_only=True)
    participant = serializers.SerializerMethodField()
    class Meta:
        model = Receipt
        fields = ['receipt_name', 'total', 'paid_by', 'participant']
    
    def get_participant(self, parma):
        return parma.participant.annotate(
            username=F('user_id__username'),
            nickname=F('user_id__nickname'),
            profile_img =F('user_id__profile_img')
            ).values('username', 'nickname', 'profile_img')

class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = '__all__'

# participant

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'