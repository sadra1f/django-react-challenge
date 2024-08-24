from django.conf import settings
from django.db import models

from shared.utils import clean_html


class Template(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    template = models.TextField()

    updated_on = models.DateTimeField(auto_now=True)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-id"]

    def save(self, *args, **kwargs) -> None:
        self.template = clean_html(self.template)
        return super(Template, self).save(*args, **kwargs)
