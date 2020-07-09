"""Views for users module

Returns:
    Function -- api endpoints
"""
import json
from operator import itemgetter

# from django.contrib.auth import authenticate, login
from django.core.serializers.json import DjangoJSONEncoder
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.db.models import Count

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import (HTTP_200_OK, HTTP_201_CREATED,
                                   HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND)

from users.models import BeerTasted
from users.serializers import LoginSerializer, RegisterSerializer

from .util import train_data

# Create your views here.
@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def create_user(request):
    """Create a user

    Returns:
        JsonResponse -- new user data or error
    """
    # user = User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')
    data = JSONParser().parse(request)
    serializer = RegisterSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(data=f"Successfully registered {data['username']}", status=HTTP_201_CREATED)
    print(serializer.errors)
    return JsonResponse(data=serializer.errors, status=HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def auth_login(request):
    """Login a user

    Returns:
        Response -- token and user data, or error
    """
    data = JSONParser().parse(request)
    print(f"logging in: {data['username']}")
    user = LoginSerializer(data=data)
    if user.is_valid():
        token, _ = Token.objects.get_or_create(
            user=User.objects.get(username=user.data['username']))
        return Response({'token': token.key, 'user': user.data['username']}, status=HTTP_200_OK)
    else:
        return Response({'error': 'Invalid Credentials'}, status=HTTP_404_NOT_FOUND)


@csrf_exempt
@api_view(['POST'])
def add_beer_tasted(request):
    """Add a beer tasted to the users list

    Returns:
        Response -- a success message on beer tasted saved, or error
    """
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication)
    data = JSONParser().parse(request)
    try:
        BeerTasted.objects.create(beername=data['beername'], rating=data['rating'],
                                  style=data['style'], description=data['description'], user=request.user)
        # train data after adding beer to DB. TODO: run async process
        # print('training data')
        # train_data(request.user)
        # print('trained data')
        return Response({"response": "Beer entry saved"}, status=HTTP_201_CREATED)
    except:
        return Response({"error": "Unable to save beer tasted"}, status=HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET'])
def get_tasted_beers(request):
    """Get a list of the beers the user has tasted
        TODO: implement cleaner way to retrieve data and return it
    Returns:
        JsonResponse -- a list of objects that contains beers tasted
    """
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication)
    data = BeerTasted.objects.filter(user=request.user).values(
        'beername', 'rating', 'created_at', 'style', 'description', count=Count('beername')).order_by('created_at')

    data = json.loads(json.dumps(list(data), cls=DjangoJSONEncoder))

    beers_tasted = []
    preprocess = dict()

    for item in data:
        item['date'] = item['created_at'].split('T')[0]
        beers_tasted.append(item)

        if item['style'] in preprocess:
            preprocess[item['style']] += 1
        else:
            preprocess[item['style']] = 1

    graphdata = []

    for style, count in preprocess.items():
        graphdata.append({
            'name': style,
            'count': count
        })

    graphdata.sort(key=itemgetter('count'), reverse=True)

    return_object = {
        'beers': beers_tasted,
        'graphdata': graphdata
    }

    return JsonResponse({"data": return_object}, status=HTTP_200_OK, safe=False)


@api_view(['GET'])
def recommend_me(request):
    """Recommend beers to user

    Returns:
        TODO : ML on saved beers
    """
    return Response('In progress', status=HTTP_200_OK)
