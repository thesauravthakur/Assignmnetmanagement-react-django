from rest_framework.routers import DefaultRouter
from .views import AssignmentView

router = DefaultRouter()
router.register(r'assignment_list',
                AssignmentView,
                base_name='assignment_list')
urlpatterns = router.urls
