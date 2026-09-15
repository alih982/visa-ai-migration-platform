from django.db import models


class ImmigrationLead(models.Model):
    PROGRAM_TYPES = [
        ('study', 'study'),
        ('work', 'work'),
        ('family', 'family'),
        ('investment', 'investment'),
        ('other', 'other'),
    ]

    full_name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=30)
    email = models.EmailField(blank=True, null=True)

    destination_country = models.CharField(max_length=120, blank=True, null=True)
    program_type = models.CharField(max_length=30, choices=PROGRAM_TYPES, default='other')
    message = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Lead: {self.full_name}" 

