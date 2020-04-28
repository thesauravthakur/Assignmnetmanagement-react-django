from django.urls import path, include
from assignments.views import StudentGradeCreateView, StudentGradedListView
urlpatterns = [
    path('', StudentGradeCreateView.as_view(), name='graded-assignment-list'),
    path('create/',
         StudentGradedListView.as_view(),
         name='graded-assignment-create'),
]
