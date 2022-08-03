from rest_framework.permissions import SAFE_METHODS, BasePermission
from groups.models import Member

'''
class GroupLeaderPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            user = request.user
            member = Member.objects.filter(user_id=user)
            group_list = member.values('group_id__group_id')
            def res(param):
                return param['group_id__group_id']
            data = list(map(res, group_list))
            if obj.group_id in data:
                return True
            return False
        return obj.leader == request.user
'''

class GroupMemberPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            group_id = view.kwargs['pk']

            user = request.user
            member = user.member_set.all().values('group_id__group_id')

            data = [m['group_id__group_id'] for m in member]

            if group_id in data:
                return True
            return False
        else:
            return False