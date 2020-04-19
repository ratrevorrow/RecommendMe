from rest_framework import serializers
from users.models import User, BeersTasted

class UserSerializer(serializers.Serializer):
    firstname = serializers.CharField(required=True, allow_blank=False, max_length=100)
    lastname = serializers.CharField(required=True, allow_blank=True, max_length=100)
    username = serializers.CharField(required=True, allow_blank=True, max_length=100)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        return User.objects.create(**validated_data)

class BeerTastedSerializer(serializers.ModelSerializer):
    beername = serializers.CharField(required=True, allow_blank=False, max_length=100)
    rating = serializers.CharField(required=True, allow_blank=False, max_length=100)
    user = serializers.JSONField()
    # users = serializers.RelatedField(many=True, read_only=True)
    # created_at = serializers.DateTimeField(re)
    # updated_at = serializers.DateTimeField()

    class Meta:
        model = BeersTasted
        fields = '__all__'

    def create(self, validated_data):
        return BeersTasted.objects.create(**validated_data)