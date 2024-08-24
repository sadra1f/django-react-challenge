from django.contrib import admin

from apps.mail.models import Template


@admin.register(Template)
class TemplateAdmin(admin.ModelAdmin):
    search_fields = ["template", "user"]
    list_display = ["user", "updated_on"]
