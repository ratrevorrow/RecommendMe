from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status, serializers
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from users.models import BeerTastedBeerTastedSerializer
from beerlist.models import Initiators
import datetime

initiators = Initiators()
initiators.initiate_everything()

# Create your views here.
@api_view(['GET'])
@permission_classes((AllowAny,))
def get_everything(request):
    # return Response(initiators.get_everything())
    return JsonResponse({"beers": initiators.get_everything()}, status=200)

@api_view(['GET'])
@permission_classes((AllowAny,))
def get_styles(request):
    return JsonResponse(initiators.get_styles(), status=200, safe=False)
