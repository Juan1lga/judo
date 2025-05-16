from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('trainer', 'Entrenador'),
        ('competitor', 'Competidor'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='competitor')

    def __str__(self):
        return self.username

class Competitor(models.Model):
    GENDER_CHOICES = (
        ('M', 'Masculino'),
        ('F', 'Femenino'),
    )
    CATEGORY_CHOICES = (
        ('sub21', 'Sub 21'),
        ('primera', '1ra Categoría'),
    )
    MALE_WEIGHT_DIVISIONS = ['55', '60', '66', '73', '81', '90', '100', '+100']
    FEMALE_WEIGHT_DIVISIONS = ['44', '48', '52', '57', '63', '70', '78', '+78']

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    weight_division = models.CharField(max_length=4)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    years_experience = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.user.username} ({self.weight_division}kg)"

class Competition(models.Model):
    TYPE_CHOICES = (
        ('internacional', 'Internacional'),
        ('nacional', 'Nacional'),
    )
    EVENT_CHOICES = (
        ('entrenamiento', 'Entrenamiento'),
        ('combate_oficial', 'Combate Oficial'),
    )

    name = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    event = models.CharField(max_length=20, choices=EVENT_CHOICES)
    num_athletes = models.PositiveIntegerField()
    num_fights = models.PositiveIntegerField()
    num_fights_completed = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Fight(models.Model):
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, related_name='fights')
    competitor1 = models.ForeignKey(Competitor, related_name='fights_as_competitor1', on_delete=models.CASCADE)
    competitor2 = models.ForeignKey(Competitor, related_name='fights_as_competitor2', on_delete=models.CASCADE)
    start_time = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.competitor1} vs {self.competitor2}"

class TacticalAction(models.Model):
    ATTACK_TYPE_CHOICES = (
        ('wazari', 'Wazari'),
        ('yuko', 'Yuko'),
        ('ippon', 'Ippon'),
    )
    TECHNIQUE_GROUP_CHOICES = (
        ('ashi_waza', 'Ashi Waza'),
        ('koshi_waza', 'Koshi Waza'),
        ('kata_te_waza', 'Kata Te Waza'),
        ('sutemi_waza', 'Sutemi Waza'),
    )
    PENALTY_CHOICES = (
        ('shido', 'Shido'),
        ('hansokumake', 'Hansokumake'),
    )
    NE_WAZA_TYPE_CHOICES = (
        ('immobilization', 'Control por Inmovilización'),
        ('dislocation', 'Control por Luxación'),
        ('strangulation', 'Control por Estrangulación'),
    )

    fight = models.ForeignKey(Fight, on_delete=models.CASCADE, related_name='tactical_actions')
    competitor = models.ForeignKey(Competitor, on_delete=models.CASCADE)
    attack_type = models.CharField(max_length=20, choices=ATTACK_TYPE_CHOICES, null=True, blank=True)
    technique_group = models.CharField(max_length=20, choices=TECHNIQUE_GROUP_CHOICES, null=True, blank=True)
    is_effective = models.BooleanField(default=False)
    combined_techniques = models.CharField(max_length=50, null=True, blank=True)
    penalty = models.CharField(max_length=20, choices=PENALTY_CHOICES, null=True, blank=True)
    ne_waza_type = models.CharField(max_length=50, choices=NE_WAZA_TYPE_CHOICES, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.competitor} - {self.attack_type or self.ne_waza_type} ({'Efectivo' if self.is_effective else 'No Efectivo'})"