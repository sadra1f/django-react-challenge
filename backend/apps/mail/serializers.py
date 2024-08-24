from rest_framework import serializers

from apps.mail.models import Operation, Template


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ["template", "updated_on", "created_on"]


class OperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operation
        fields = ["from_id", "to_id", "updated_on", "created_on"]
