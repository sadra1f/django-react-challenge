# define an alias for the specific python version used in this file.
FROM docker.io/python:3.11.9-slim-bookworm AS python

# Python build stage
FROM python AS python-build-stage

ARG BUILD_ENVIRONMENT=production

# Install apt packages
RUN apt-get update && apt-get install --no-install-recommends -y \
  # dependencies for building Python packages
  build-essential \
  # psycopg dependencies
  libpq-dev

# Requirements are installed here to ensure they will be cached.
RUN pip install pipenv --user --no-cache-dir
COPY Pipfile* pyproject.toml ./
RUN python -m pipenv requirements > requirements.txt

# Create Python Dependency and Sub-Dependency Wheels.
RUN pip wheel --wheel-dir /usr/src/app/wheels  \
  -r requirements.txt


# Python 'run' stage
FROM python AS python-run-stage

ARG BUILD_ENVIRONMENT=production
ARG APP_HOME=/app

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV BUILD_ENV=${BUILD_ENVIRONMENT}

WORKDIR ${APP_HOME}

RUN addgroup --system django \
  && adduser --system --ingroup django django


# Install required system dependencies
RUN apt-get update && apt-get install --no-install-recommends -y \
  # psycopg dependencies
  libpq-dev \
  # Translations dependencies
  gettext \
  # cleaning up unused files
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

# All absolute dir copies ignore workdir instruction. All relative dir copies are wrt to the workdir instruction
# copy python dependency wheels from python-build-stage
COPY --from=python-build-stage /usr/src/app/wheels  /wheels/

# use wheels to install python dependencies
RUN pip install --no-cache-dir --no-index --find-links=/wheels/ /wheels/* \
  && rm -rf /wheels/


COPY --chown=django:django ./docker/production/django/entrypoint.sh /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint


COPY --chown=django:django ./docker/production/django/start.sh /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start


COPY --chown=django:django \
  ./docker/production/django/celery/start-celeryworker.sh \
  /start-celeryworker
RUN sed -i 's/\r$//g' /start-celeryworker
RUN chmod +x /start-celeryworker


COPY --chown=django:django \
  ./docker/production/django/celery/start-celerybeat.sh \
  /start-celerybeat
RUN sed -i 's/\r$//g' /start-celerybeat
RUN chmod +x /start-celerybeat


COPY --chown=django:django \
  ./docker/production/django/celery/start-flower.sh \
  /start-flower
RUN sed -i 's/\r$//g' /start-flower
RUN chmod +x /start-flower


# copy application code to WORKDIR
COPY --chown=django:django . ${APP_HOME}

# make django owner of the WORKDIR directory as well.
RUN chown -R django:django ${APP_HOME}

USER django

# RUN DATABASE_URL="" \
#   CELERY_BROKER_URL="" \
#   DJANGO_SETTINGS_MODULE="config.settings.test" \
#   python manage.py compilemessages

ENTRYPOINT ["/entrypoint"]
