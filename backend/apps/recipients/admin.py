from django.contrib import admin

from apps.recipients.models import CSVFile, Recipient


@admin.register(Recipient)
class RecipientAdmin(admin.ModelAdmin):
    search_fields = ["email", "national_id", "user"]
    list_display = ["email", "national_id", "user", "updated_on"]


@admin.register(CSVFile)
class CSVFileAdmin(admin.ModelAdmin):
    search_fields = ["user"]
    list_display = ["user"]
