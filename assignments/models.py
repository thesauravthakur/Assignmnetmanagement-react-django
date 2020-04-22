from django.db import models
from users.models import Teacher, User, Student


class Assignment(models.Model):
    title = models.CharField(max_length=150)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Question(models.Model):
    question = models.CharField(max_length=500)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)

    def __str__(self):
        return self.question


class Choice(models.Model):
    choice = models.CharField(max_length=250)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return self.choice


class StudentGrade(models.Model):
    student = models.OneToOneField(Student, on_delete=models.CASCADE)
    assignment = models.ForeignKey(Assignment,
                                   on_delete=models.SET_NULL,
                                   blank=True,
                                   null=True)
    grade = models.FloatField()

    def __str__(self):
        return self.student
