from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from apps.recipients.views import CSVFileViewSet, RecipientViewSet
from apps.users.views import UserViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)

router.register("recipients", RecipientViewSet)
router.register("csv-file", CSVFileViewSet)

app_name = "api"
urlpatterns = router.urls
