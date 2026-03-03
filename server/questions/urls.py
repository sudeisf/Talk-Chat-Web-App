from django.urls import path

from .views import CreateQuestionView, RecentActivityView

urlpatterns = [
    path("create/", CreateQuestionView.as_view(), name="create-question"),
    path("recent-activity/", RecentActivityView.as_view(), name="recent-activity"),
]
