from django.conf import settings
from django.db import models
from django.core.exceptions import ValidationError


class Recipient(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    email = models.EmailField(unique=True)
    national_id = models.CharField(max_length=10, unique=True)

    updated_on = models.DateTimeField(auto_now=True)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-id"]

    def clean(self, *args, **kwargs):
        super(Recipient, self).clean(*args, **kwargs)

        if not self.national_id.isdigit():
            raise ValidationError(
                {"national_id": ["National ID is not numeric"]},
            )


class CSVFile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    file = models.FileField(editable=False)

    updated_on = models.DateTimeField(auto_now=True)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-id"]
