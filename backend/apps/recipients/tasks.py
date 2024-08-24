import csv
from celery import shared_task
from django.contrib.auth import get_user_model

from .models import CSVFile, Recipient


@shared_task(time_limit=530, soft_time_limit=500)
def load_csv_to_database(user_id: int, csv_file_id: int):
    user = get_user_model().objects.filter(id=user_id).first()
    csv_file_object = CSVFile.objects.filter(id=csv_file_id).first()

    if user and csv_file_object:
        with open(csv_file_object.file.path, "r") as csv_file:
            datareader = csv.reader(csv_file)

            header_row = next(datareader)
            national_id_index = header_row.index("national_id")
            email_index = header_row.index("email")

            for row in datareader:
                try:
                    new_recipient = Recipient(
                        user=user,
                        national_id=row[national_id_index],
                        email=row[email_index],
                    )
                    new_recipient.save()
                except:
                    pass

        csv_file_object.delete()
        return True

    return False
