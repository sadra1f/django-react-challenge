from django.shortcuts import get_object_or_404
from django.core.cache import cache
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_201_CREATED, HTTP_204_NO_CONTENT

from apps.mail.models import Operation, Template
from apps.mail.serializers import OperationSerializer, TemplateSerializer
from apps.mail.tasks import send_emails


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
        serializer = self.serializer_class(instance)
        return Response(serializer.data)


class OperationViewSet(GenericViewSet):
    serializer_class = OperationSerializer
    queryset = Operation.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def get_cache_key(self):
        return f"mail_operation_{self.request.user.id}"

    def list(self, request):
        instance = get_object_or_404(self.queryset, user=self.request.user)
        serializer = self.serializer_class(instance)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def progress(self, request):
        data_list = cache.get(self.get_cache_key(), [None] * 5)
        print(data_list)
        return Response(data_list)

    @action(detail=False, methods=["post"])
    def start(self, request):
        data_list = cache.get(self.get_cache_key(), None)

        if not data_list or data_list[4]:
            send_emails.delay(self.request.user.id)

        return Response(status=HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["post"])
    def pause(self, request):
        data_list = cache.get(self.get_cache_key(), None)

        if data_list:
            data_list[4] = True
            cache.set(self.get_cache_key(), data_list)

        return Response(status=HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["post"])
    def stop(self, request):
        instance = get_object_or_404(self.queryset, user=self.request.user)
        data_list = cache.get(self.get_cache_key(), None)

        if data_list:
            data_list[4] = True
            cache.set(self.get_cache_key(), data_list)

        instance.delete()

        return Response(status=HTTP_204_NO_CONTENT)
