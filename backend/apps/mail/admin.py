from django.contrib import admin

from apps.mail.models import Operation, Template


@admin.register(Template)
class TemplateAdmin(admin.ModelAdmin):
    search_fields = ["template", "user"]
    list_display = ["user", "updated_on"]


@admin.register(Operation)
class OperationAdmin(admin.ModelAdmin):
    search_fields = ["user"]
    list_display = ["user", "from_id", "to_id", "updated_on", "created_on"]
