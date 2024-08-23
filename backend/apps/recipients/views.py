from rest_framework.decorators import action
from rest_framework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated

from apps.recipients.models import CSVFile, Recipient
from apps.recipients.serializers import CSVFileSerializer, RecipientSerializer
from apps.recipients.tasks import load_csv_to_database
from shared.pagination import Pagination


class RecipientViewSet(
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    serializer_class = RecipientSerializer
    queryset = Recipient.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = Pagination

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)


class CSVFileViewSet(GenericViewSet):
    serializer_class = CSVFileSerializer
    queryset = CSVFile.objects.all()
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    @action(detail=False, methods=["get"], url_path="/")
    def get(self, request):
        instance = self.queryset.filter(user=self.request.user)
        if instance.exists():
            return Response({"file": instance.first().file.url})
        else:
            return Response(status=404)

    @action(detail=False, methods=["put"])
    def upload(self, request):
        file_obj = request.FILES["file"]
        csv_file = CSVFile(user=request.user, file=file_obj)
        csv_file.save()

        load_csv_to_database.delay(request.user.id, csv_file.id)

        return Response(status=204)
