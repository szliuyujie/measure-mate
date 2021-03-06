from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView
from rest_framework import routers

import cspreports.urls

from .views import AnnouncementViewSet, AssessmentViewSet, AttributeViewSet, MeasurementViewSet, RatingViewSet, \
    TagViewSet, TeamViewSet, TemplateViewSet, \
    export_data, healthcheck, home, robots_txt, schema_view

router = routers.DefaultRouter()
router.register(r'announcements', AnnouncementViewSet)
router.register(r'assessments', AssessmentViewSet)
router.register(r'attributes', AttributeViewSet)
router.register(r'measurements', MeasurementViewSet)
router.register(r'ratings', RatingViewSet)
router.register(r'tags', TagViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'templates', TemplateViewSet)

urlpatterns = [
    url(r'^healthcheck/?$', healthcheck, name='healthcheck'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(router.urls)),
    url(r'^api/api-auth/', include(
        'rest_framework.urls', namespace='rest_framework')),
    url(r'^docs/', schema_view, name='schema'),
    url(r'^export/', export_data, name='export'),
    url(r'^favicon\.ico', RedirectView.as_view(url=staticfiles_storage.url('assets/favicon.ico')), name='favicon'),
    url(r'^robots\.txt', robots_txt, name='robots'),
    url(r'^(?:about|assessment|team|)(?:/|$)', home, name='home'),
    url(r'^csp/', include(cspreports.urls)),
]
