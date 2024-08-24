from time import sleep
from celery import shared_task
from django.contrib.auth import get_user_model
from django.core.cache import cache

from apps.mail.models import Operation
from apps.recipients.models import Recipient


@shared_task(time_limit=1030, soft_time_limit=1000)
def send_emails(user_id: int):
    user = get_user_model().objects.filter(id=user_id).first()

    if user:
        recipients = Recipient.objects.filter(user=user).order_by("id")

        data_list = [
            recipients.first().id,  # from_id
            recipients.last().id,  # to_id
            0,  # operation_count
            recipients.count(),  # recipients_count
            False,  # is_paused
        ]

        operation, _ = Operation.objects.get_or_create(
            user=user,
            defaults={
                "from_id": data_list[0],
                "to_id": data_list[1],
            },
        )
        data_list[0] = operation.from_id
        data_list[1] = operation.to_id

        recipients = recipients.filter(id__gte=data_list[0], id__lte=data_list[1])
        data_list[3] = recipients.count()

        cache_key = f"mail_operation_{user_id}"
        cache.set(cache_key, data_list)

        for recipient in recipients:
            # Send Email
            sleep(1)
            data_list[2] += 1
            cached_data_list = cache.get(cache_key, data_list)

            if cached_data_list[4]:
                operation.from_id = recipient.id + 1
                operation.save()
                cache.delete(cache_key)

                return False

            cache.set(cache_key, data_list)

        operation.delete()
        return True

    return False
