from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Competitor, Competition, Fight, TacticalAction

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'role', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),
    )

    def save_model(self, request, obj, form, change):
        if not change and obj.is_superuser:
            obj.role = 'trainer'
        super().save_model(request, obj, form, change)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Competitor)
admin.site.register(Competition)
admin.site.register(Fight)
admin.site.register(TacticalAction)
