from rest_framework import serializers
from users.models import Teacher
from users.serializers import TeacherSerializer
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from .models import Assignment, Question, Choice, StudentGrade
from users.models import Student, User


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class QuestionSerializer(serializers.ModelSerializer):
    choice = Choice.objects.all()
    choice = StringSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'question', 'assignment', 'choice')


class AssignmentSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    teacher = StringSerializer(many=False)

    class Meta:
        model = Assignment
        fields = ("id", "title", "teacher", "questions")

    def get_questions(self, obj):
        questions = QuestionSerializer(obj.question.all(), many=True).data
        return questions

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
        assignment = Assignment()
        teacher = Teacher.objects.get(id=data['userId'])
        assignment.title = data['assignment']['title']
        assignment.teacher = teacher
        assignment.save()
        for item in formatedData:
            question = Question()
            question.question = item['question']
            question.answer = item['answer']
            question.assignment = assignment
            question.save()
            for choice in item['choices']:
                newChoice = Choice()
                newChoice.choice = choice
                newChoice.question = question
                newChoice.save()
        print('success')
        return assignment


class StudentGradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentGrade
        fields = ("student", "assignment", "grade")

    def create(self, request):
        data = request.data
        student = User.objects.get(username=data['studentName'])
        assignment = Assignment.objects.get(id=data['assignmentId'])
        studentGrade = StudentGrade()
        dataList = []
        questionList = []
        questionIdList = []
        answerList = []
        userAnswer = data['userAnswer']
        for ans in userAnswer:
            ansList = ans.split(':')
            dataList.append(ansList)
        for ans in dataList:
            questionList.append(ans[0])
            questionIdList.append(ans[1])
            answerList.append(ans[2])
        correct_ans = 0
        for i in range(len(questionIdList)):
            oldQuestion = Question.objects.get(id=questionIdList[i])
            if oldQuestion.answer == answerList[i]:
                correct_ans += 1
        grade = (correct_ans / data['questionLength']) * 100
        grade = '%.2f' % grade
        studentGrade.student = student
        studentGrade.assignment = assignment
        studentGrade.grade = grade
        studentGrade.save()
        return studentGrade
