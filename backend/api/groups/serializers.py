from json import loads, dumps

from django.contrib.auth import get_user_model
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
    create_dt = serializers.DateField(default=timezone.now, format='%Y-%m-%d')
    class Meta:
        model = Meeting
        fields = '__all__'

    def validate(self, attrs):
        now = timezone.now().__format__('%Y-%m-%d')

        existing_meeting = Meeting.objects.filter(group_id=attrs['group_id'].group_id)
        if existing_meeting:
            instance = CreateMeetingSerializer(existing_meeting, many=True)
            if now == loads(dumps(instance.data[-1]))['create_dt']:
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
        fields = ['create_dt']

# receipt
class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = '__all__'

# participant
class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'

