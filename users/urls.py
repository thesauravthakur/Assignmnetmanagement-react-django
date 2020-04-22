from rest_framework.routers import DefaultRouter
from .views import UserViewSets, StudentViewSets, TeacherViewSets

router = DefaultRouter()
router.register(r'users_list', UserViewSets, base_name='users')
router.register(r'students', StudentViewSets, base_name='students')
router.register(r'teachers', TeacherViewSets, base_name='teachers')
urlpatterns = router.urls
