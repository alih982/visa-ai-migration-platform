from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .serializers import ImmigrationLeadCreateSerializer
from .models import ImmigrationLead


class LeadViewSet(viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = ImmigrationLead.objects.all()
    serializer_class = ImmigrationLeadCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = ImmigrationLeadCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        lead = serializer.save()
        return Response({"status": "success", "id": lead.id, "detail": "Lead created"}, status=status.HTTP_201_CREATED)
