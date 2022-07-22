from rest_framework.permissions import SAFE_METHODS, BasePermission
from groups.models import Member

class GroupLeaderPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            user = request.user
            member = Member.objects.filter(user_id=user)
            query = member.values('group_id__group_id')
            def res(param):
                return param['group_id__group_id']
            data = list(map(res, query))
            if obj.group_id in data:
                return True
            return False
        return obj.leader == request.user