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
import sys

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
    try:
        BeersTasted.objects.create(beername=data['beername'], rating=data['rating'],
                                   style=data['style'], description=data['description'], user=user)
        return Response(data="Beer entry saved", status=201)
    except:
        return Response(data="Something unexpected happened", status=400)

    # TODO: serialize BeersTasted similar User
    # serializer = BeerTastedSerializer(data=data)
    # if serializer.is_valid():
    #     serializer.save()
    #     return JsonResponse(serializer.data, status=201)

    # return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
def get_tasted_beers(request):
    # TODO: implement cleaner way to retrieve data and return it
    data = BeersTasted.objects.values('beername', 'rating', 'created_at', 'style', 'description')
    # print(BeersTasted.objects.values('beername').annotate(the_count=Count('beername')))

    data = json.loads(json.dumps(list(data), cls=DjangoJSONEncoder))
    # data = json.loads(ss.serialize('json', data, fields=('beername',))) #BeersTasted.objects.all()))

    obj = []
    for item in data:
        obj.append({
            'beername': item['beername'],
            'rating': item['rating'],
            'style': item['style'],
            'description': item['description'],
            # get date without time. [1] is time
            'date': item['created_at'].split('T')[0],
        })
    return JsonResponse(obj, status=200, safe=False)

@api_view(['GET'])
def recommend_me(request):

    # TODO : ML on saved beers

    return JsonResponse('In progress', status=200, safe=False)