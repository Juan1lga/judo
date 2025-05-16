from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser, Competitor, Competition, Fight, TacticalAction
from .serializers import CustomUserSerializer, CompetitorSerializer, CompetitionSerializer, FightSerializer, TacticalActionSerializer
from .permissions import IsTrainer
from django.db.models import Count, Sum
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils import timezone

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated, IsTrainer]

class CompetitorViewSet(viewsets.ModelViewSet):
    queryset = Competitor.objects.all()
    serializer_class = CompetitorSerializer
    permission_classes = [IsAuthenticated, IsTrainer]

class CompetitionViewSet(viewsets.ModelViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer
    permission_classes = [IsAuthenticated, IsTrainer]

class FightViewSet(viewsets.ModelViewSet):
    queryset = Fight.objects.all()
    serializer_class = FightSerializer
    permission_classes = [IsAuthenticated, IsTrainer]

    @action(detail=True, methods=['post'])
    def start_fight(self, request, pk=None):
        fight = self.get_object()
        fight.start_time = timezone.now()
        fight.save()
        return Response({'status': 'fight started'})

    @action(detail=True, methods=['post'])
    def end_fight(self, request, pk=None):
        fight = self.get_object()
        fight.end_time = timezone.now()
        fight.save()
        return Response({'status': 'fight ended'})

class TacticalActionViewSet(viewsets.ModelViewSet):
    queryset = TacticalAction.objects.all()
    serializer_class = TacticalActionSerializer
    permission_classes = [IsAuthenticated, IsTrainer]

class StatisticsViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, IsTrainer]

    @action(detail=False, methods=['get'])
    def competitor_stats(self, request):
        competitor_id = request.query_params.get('competitor_id')
        if not competitor_id:
            return Response({'error': 'competitor_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        competitor = Competitor.objects.get(id=competitor_id)
        stats = TacticalAction.objects.filter(competitor=competitor).aggregate(
            total_attacks=Count('id'),
            effective_attacks=Sum('is_effective')
        )
        stats['competitor'] = CompetitorSerializer(competitor).data
        stats['effectiveness'] = stats['effective_attacks'] / stats['total_attacks'] if stats['total_attacks'] > 0 else 0
        return Response(stats)

    @action(detail=False, methods=['get'])
    def compare_competitors(self, request):
        competitor1_id = request.query_params.get('competitor1_id')
        competitor2_id = request.query_params.get('competitor2_id')
        if not competitor1_id or not competitor2_id:
            return Response({'error': 'competitor1_id and competitor2_id are required'}, status=status.HTTP_400_BAD_REQUEST)

        competitor1 = Competitor.objects.get(id=competitor1_id)
        competitor2 = Competitor.objects.get(id=competitor2_id)

        stats1 = TacticalAction.objects.filter(competitor=competitor1).aggregate(
            total_attacks=Count('id'),
            effective_attacks=Sum('is_effective')
        )
        stats1['data'] = CompetitorSerializer(competitor1).data
        stats1['effectiveness'] = stats1['effective_attacks'] / stats1['total_attacks'] if stats1['total_attacks'] > 0 else 0

        stats2 = TacticalAction.objects.filter(competitor=competitor2).aggregate(
            total_attacks=Count('id'),
            effective_attacks=Sum('is_effective')
        )
        stats2['data'] = CompetitorSerializer(competitor2).data
        stats2['effectiveness'] = stats2['effective_attacks'] / stats2['total_attacks'] if stats2['total_attacks'] > 0 else 0

        return Response({'competitor1': stats1, 'competitor2': stats2})