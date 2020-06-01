from rest_framework import serializers
from users.models import BeerTasted
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

User._meta.get_field('email')._unique = True

# class UserSerializer(serializers.Serializer):
#     firstname = serializers.CharField(required=True, allow_blank=False, max_length=100)
#     lastname = serializers.CharField(required=True, allow_blank=True, max_length=100)
#     username = serializers.CharField(required=True, allow_blank=True, max_length=100)

#     class Meta:
#         model = User
#         fields = '__all__'

#     def create(self, validated_data):
#         return User.objects.create(**validated_data)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

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