from django.urls import path

from .views import (
    CreateQuestionView,
    HelperDashboardStatsView,
    ModifyQuestionDescriptionView,
    MyQuestionsListView,
    RecentActivityView,
)

urlpatterns = [
    path("create/", CreateQuestionView.as_view(), name="create-question"),
    path("my/", MyQuestionsListView.as_view(), name="my-questions"),
    path("helper-dashboard-stats/", HelperDashboardStatsView.as_view(), name="helper-dashboard-stats"),
    path("modify-description/", ModifyQuestionDescriptionView.as_view(), name="modify-question-description"),
    path("recent-activity/", RecentActivityView.as_view(), name="recent-activity"),
]
