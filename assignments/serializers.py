from rest_framework import serializers
from users.models import Teacher
from users.serializers import TeacherSerializer
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from .models import Assignment, Question, Choice, StudentGrade


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class AssignmentSerializer(serializers.ModelSerializer):
    teacher = StringSerializer(many=False)

    class Meta:
        model = Assignment
        fields = ("id", "title", "teacher")

    def create(self, request):
        data = request.data
        questionIndex = []
        choiceIndex = []
        questionData = []
        choiceData = []
        answerIndex = []
        answerData = []
        formatedData = []
        for d in data['assignment']:
            for i in range(len(data['assignment'])):
                if f'question{i}' in d:
                    questionIndex.append(d)
        for d in data['assignment']:
            for i in range(len(data['assignment'])):
                for j in range(len(data['assignment'])):
                    if f'choice{i}{j}' in d:
                        choiceIndex.append(d)
        for d in data['assignment']:
            for i in range(len(data['assignment'])):
                if f'answer{i}' in d:
                    answerIndex.append(d)
        for i in range(len(questionIndex)):
            for d in data['assignment']:
                if questionIndex[i] == d:
                    questionData.append(data['assignment'][d])
        for i in range(len(choiceIndex)):
            for d in data['assignment']:
                if choiceIndex[i] == d:
                    choiceData.append(data['assignment'][d])
        for i in range(len(answerIndex)):
            for d in data['assignment']:
                if answerIndex[i] == d:
                    answerData.append(data['assignment'][d])
        for i in range(len(questionIndex)):
            for j in range(len(answerIndex)):
                choices = []
                for k in range(len(choiceIndex)):
                    if f'choice{i}' in choiceIndex[k]:
                        choices.append(choiceData[k])
                if i == j:
                    somedata = {
                        'question': f'{questionData[i]}',
                        'answer': f'{answerData[j]}',
                        'choices': choices,
                    }
                    formatedData.append(somedata)
        print(formatedData)
        assignment = Assignment()
        teacher = Teacher.objects.get(id=data['userId'])
        assignment.title = data['assignment']['title']
        assignment.teacher = teacher
        assignment.save()
        for item in formatedData:
            question = Question()
            question.question = item['question']
            question.assignment = assignment
            question.save()
            print(item)
            for choice in item['choices']:
                newChoice = Choice()
                newChoice.choice = choice
                newChoice.question = question
                newChoice.save()
        print('success')
        return assignment
