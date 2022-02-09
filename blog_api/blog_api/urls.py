from django.contrib import admin
from django.urls import path,include
from posts import views
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

...

schema_view = get_schema_view(
   openapi.Info(
      title="Blog API",
      default_version='v1',
      description="A simple API for Blog posts",
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)




router=DefaultRouter()


router.register(r'posts',views.PostView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include(router.urls)),
    path('swagger(<format>.json|\.yaml)', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
