# Django + React Challenge

A web application that allows users to register and upload a large CSV file containing national IDs and corresponding email addresses, and then adds them to the database.

### Run for development

```sh
cp .envs/dev.example.env .env
docker compose up -d --build
```

### Create superuser

```sh
docker compose exec -it django python manage.py createsuperuser
```

### Default exposed ports

| Container | Port |
| --------- | ---- |
| Django    | 8000 |
| React     | 5173 |
| Flower    | 5555 |
