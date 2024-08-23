from rest_framework import serializers

from apps.recipients.models import CSVFile, Recipient


class RecipientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipient
        fields = ["user", "email", "national_id", "updated_on", "created_on"]


class CSVFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVFile
        fields = ["user", "file", "updated_on", "created_on"]
