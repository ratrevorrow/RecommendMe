from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status, serializers
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from users.models import User, BeersTasted
from users.serializers import UserSerializer, BeerTastedSerializer
from django.core import serializers as ss
from datetime import datetime
from django.http import HttpResponse
import json
from django.db.models import Count
from django.core.serializers.json import DjangoJSONEncoder

# Create your views here.
@api_view(['POST'])
def create_user(request):
    data = JSONParser().parse(request)
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)

@api_view(['POST'])
def add_beer_tasted(request):
    data = JSONParser().parse(request)
    user = User.objects.get(username=data['username'])
    print(data)
    print(user)
    # data['user'] = user
    try:
        BeersTasted.objects.create(beername=data['beername'], rating=data['rating'], user=user)
        return Response(data="Beer entry saved", status=201)
    except:
        return Response(data="Something went wrong", status=400)
    # serializer = BeerTastedSerializer(data=data)
    # if serializer.is_valid():
    #     serializer.save()
    #     return JsonResponse(serializer.data, status=201)
    
    # return JsonResponse(serializer.errors, status=400)

@api_view(['GET'])
def get_tasted_beers(request):
    # TODO: implement cleaner way to retrieve data and return it
    data = BeersTasted.objects.values('beername', 'rating', 'created_at')
    # print(BeersTasted.objects.values('beername').annotate(the_count=Count('beername')))

    data = json.loads(json.dumps(list(data), cls=DjangoJSONEncoder))
    # data = json.loads(ss.serialize('json', data, fields=('beername',))) #BeersTasted.objects.all()))
    
    obj = []
    for item in data:        
        obj.append({
            'beername': item['beername'],
            'rating': item['rating'],
            'date': item['created_at'].split('T')[0], # get date without time. [1] is time
        })
    return JsonResponse(obj, status=200, safe=False)