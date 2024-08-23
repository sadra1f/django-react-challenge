# ruff: noqa
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include
from django.urls import path
from django.views import defaults as default_views
from rest_framework.authtoken.views import obtain_auth_token

# from drf_spectacular.views import SpectacularAPIView
# from drf_spectacular.views import SpectacularSwaggerView

urlpatterns = [
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # API URLs
    path(
        "api/",
        include(
            [
                # User management
                path("users/", include("apps.users.urls", namespace="users")),
                # API base url
                path("", include("config.api_router")),
                # DRF auth token
                path("auth-token/", obtain_auth_token),
                # path("schema/", SpectacularAPIView.as_view(), name="api-schema"),
                # path(
                #     "docs/",
                #     SpectacularSwaggerView.as_view(url_name="api-schema"),
                #     name="api-docs",
                # ),
            ]
        ),
    ),
    # Media files
    *static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),
]

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
