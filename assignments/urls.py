from rest_framework.routers import DefaultRouter
from .views import AssignmentView, StudentGradeView

router = DefaultRouter()
router.register(r'assignment_list',
                AssignmentView,
                base_name='assignment_list')
router.register(r'assignment_submit',
                StudentGradeView,
                base_name='assignment_submit')
urlpatterns = router.urls
