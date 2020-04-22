from django.shortcuts import render
from .models import Assignment, Question, Choice, StudentGrade
from .serializers import AssignmentSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.response import Response


class AssignmentView(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()

    def create(self, request):
        serializedAssignment = AssignmentSerializer(data=request.data)
        if serializedAssignment.is_valid:
            assignment = serializedAssignment.create(request)
            if assignment:
                return Response(HTTP_201_CREATED)
        return Response(HTTP_400_BAD_REQUEST)
