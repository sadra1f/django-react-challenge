from rest_framework import serializers

from apps.mail.models import Template


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ["template", "updated_on", "created_on"]
