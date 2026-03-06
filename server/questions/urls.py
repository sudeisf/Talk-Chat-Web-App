from django.urls import path

from .views import (
    CreateQuestionView,
    HelperContributionsView,
    HelperDashboardStatsView,
    HelperProfileOverviewView,
    HelperSessionsChartView,
    ModifyQuestionDescriptionView,
    MyQuestionsListView,
    RecentActivityView,
    JoinQuestionView
)

urlpatterns = [
    path("create/", CreateQuestionView.as_view(), name="create-question"),
    path("my/", MyQuestionsListView.as_view(), name="my-questions"),
    path("helper-dashboard-stats/", HelperDashboardStatsView.as_view(), name="helper-dashboard-stats"),
    path("helper-profile-overview/", HelperProfileOverviewView.as_view(), name="helper-profile-overview"),
    path("helper-sessions-chart/", HelperSessionsChartView.as_view(), name="helper-sessions-chart"),
    path("helper-contributions/", HelperContributionsView.as_view(), name="helper-contributions"),
    path("modify-description/", ModifyQuestionDescriptionView.as_view(), name="modify-question-description"),
    path("recent-activity/", RecentActivityView.as_view(), name="recent-activity"),
    path('<int:question_id>/join/', JoinQuestionView.as_view(), name='join-question'),
]
