from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_202_ACCEPTED
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.response import Response
from .models import Assignment, Question, Choice, StudentGrade
from .serializers import AssignmentSerializer, QuestionSerializer, StudentGradeSerializer


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

    def update(self, request, *args, **kwargs):
        id = kwargs['pk']
        serializedAssignment = AssignmentSerializer(data=request.data)
        if serializedAssignment.is_valid:
            assignment = serializedAssignment.update(request, id=id)
            if assignment:
                return Response(HTTP_202_ACCEPTED)
        return Response(HTTP_400_BAD_REQUEST)


class StudentGradeCreateView(CreateAPIView):
    serializer_class = StudentGradeSerializer
    queryset = StudentGrade.objects.all()

    def post(self, request):
        serializerdStudentGrade = StudentGradeSerializer(data=request.data)
        if serializerdStudentGrade.is_valid:
            studentgrade = serializerdStudentGrade.create(request)
            if studentgrade:
                return Response(HTTP_201_CREATED)
        return Response(HTTP_400_BAD_REQUEST)


class StudentGradedListView(ListAPIView):
    serializer_class = StudentGradeSerializer

    def get_queryset(self):
        queryset = StudentGrade.objects.all()
        username = self.request.query_params.get("username", None)
        #here query_params is getting the username from the url of the Profile
        if username is not None:
            queryset = queryset.filter(student__username=username)
            #here student__username is the users(student's) username [this is beacuse of the foraginkey
        return queryset
