from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.CustomUserViewSet)
router.register(r'competitors', views.CompetitorViewSet)
router.register(r'competitions', views.CompetitionViewSet)
router.register(r'fights', views.FightViewSet)
router.register(r'tactical-actions', views.TacticalActionViewSet)
router.register(r'statistics', views.StatisticsViewSet, basename='statistics')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', views.TokenRefreshView.as_view(), name='token_refresh'),
]