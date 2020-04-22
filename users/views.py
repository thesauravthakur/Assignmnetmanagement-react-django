from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Student, Teacher

from .serializers import UserSerializer, StudentSerializer, TeacherSerializer


class UserViewSets(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class StudentViewSets(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()


class TeacherViewSets(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()
