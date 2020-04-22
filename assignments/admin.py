from django.contrib import admin
from .models import Assignment, Question, Choice, StudentGrade

admin.site.register(Assignment)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(StudentGrade)
