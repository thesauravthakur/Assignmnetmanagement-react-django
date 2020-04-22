from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Student, User, Teacher
from django.contrib.auth.models import Group


class UserAdmin(BaseUserAdmin):
    #These fields are shown when adding the user
    add_fieldsets = ((None, {
        'fields': ('username', 'email', 'password1', 'password2', 'is_student',
                   'is_teacher')
    })),
    ('Permissions', {'fields': ('is_superuser', 'is_staff')})
    #These field are shown after creating the form
    fieldsets = ((None, {
        'fields': ('username', 'email', 'password', 'is_student', 'is_teacher')
    })),
    ('Permissions', {'fields': ('is_superuser', 'is_staff')}),
    #These fields are shown in the table
    list_display = ['username', 'email', 'is_student', 'is_teacher']
    search_fields = ('username', 'email')
    ordering = ('username', )


admin.site.register(User, UserAdmin)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.unregister(Group)
