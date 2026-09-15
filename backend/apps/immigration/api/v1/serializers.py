from rest_framework import serializers

from ...models import ImmigrationLead


class ImmigrationLeadCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImmigrationLead
        fields = [
            'id',
            'full_name',
            'phone_number',
            'email',
            'destination_country',
            'program_type',
            'message',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def validate_phone_number(self, value: str) -> str:
        if not value:
            raise serializers.ValidationError('Phone number is required')
        return value

