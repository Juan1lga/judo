from rest_framework import serializers
from .models import CustomUser, Competitor, Competition, Fight, TacticalAction

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'role']

class CompetitorSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Competitor
        fields = ['id', 'user', 'user_id', 'gender', 'weight_division', 'category', 'years_experience']

class CompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = ['id', 'name', 'type', 'event', 'num_athletes', 'num_fights', 'num_fights_completed', 'created_at']

class FightSerializer(serializers.ModelSerializer):
    competitor1 = CompetitorSerializer(read_only=True)
    competitor2 = CompetitorSerializer(read_only=True)
    competitor1_id = serializers.IntegerField(write_only=True)
    competitor2_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Fight
        fields = ['id', 'competition', 'competitor1', 'competitor1_id', 'competitor2', 'competitor2_id', 'start_time', 'duration', 'is_active']

class TacticalActionSerializer(serializers.ModelSerializer):
    competitor = CompetitorSerializer(read_only=True)
    competitor_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = TacticalAction
        fields = ['id', 'fight', 'competitor', 'competitor_id', 'attack_type', 'technique_group', 'is_effective', 'combined_techniques', 'penalty', 'ne_waza_type', 'timestamp']