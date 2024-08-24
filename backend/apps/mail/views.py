from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED

from apps.mail.models import Template
from apps.mail.serializers import TemplateSerializer


class TemplateViewSet(GenericViewSet):
    serializer_class = TemplateSerializer
    queryset = Template.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def create(self, request):
        instance, _ = Template.objects.update_or_create(
            user=self.request.user,
            defaults={
                "user": self.request.user,
                "template": self.request.data.get("template", ""),
            },
        )
        serializer = TemplateSerializer(instance)
        return Response(serializer.data, status=HTTP_201_CREATED)

    def list(self, request):
        instance = get_object_or_404(self.queryset, user=self.request.user)
        serializer = TemplateSerializer(instance)
        return Response(serializer.data)
