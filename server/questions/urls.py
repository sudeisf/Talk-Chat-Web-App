from django.urls import path

from .views import RecentActivityView

urlpatterns = [
    path("recent-activity/", RecentActivityView.as_view(), name="recent-activity"),
]
