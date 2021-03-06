from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from users.models import BeerTasted

# User._meta.get_field('email')._unique = True

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

class BeerTastedSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeerTasted
        fields = '__all__'