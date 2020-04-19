from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status, serializers
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.models import User, BeersTasted
from users.serializers import UserSerializer, BeerTastedSerializer
from beerlist.models import Initiators
import datetime

initiators = Initiators()
initiators.initiate_everything()

# Create your views here.
@api_view(['GET'])
def get_everything(request):
    # return Response(initiators.get_everything())
    return JsonResponse(initiators.get_everything(), status=200)
