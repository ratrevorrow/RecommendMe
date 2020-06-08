import random
import json
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_200_OK
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from beerlist.models import Initiators
from users.models import BeerTasted

initiators = Initiators()
initiators.initiate_everything()

# Create your views here.
@api_view(['GET'])
@permission_classes((AllowAny,))
def get_everything(request):
    """Get all the data

    Returns:
        Response -- beers object containing the formatted beerlist with adjectives
    """
    return Response({"beers": initiators.get_everything()})


@api_view(['GET'])
@permission_classes((AllowAny,))
def get_styles(request):
    """Get the list of styles of beers

    Returns:
        Response -- the list of styles to choose from
    """
    return Response(initiators.get_styles(), status=HTTP_200_OK)


@api_view(['POST'])
@permission_classes((AllowAny,))
def get_three_random_beers(request):
    """Get three random beers from the beerlist

    Returns:
        Response -- 3 random beers
    """
    data = JSONParser().parse(request)
    beerlist = initiators.get_beerlist()
    if not request.user.is_anonymous:
        beers_tasted = json.loads(json.dumps(list(BeerTasted.objects.filter(user=request.user).values('beername')), cls=DjangoJSONEncoder))
        beerlist = [beer for beer in beerlist if beer['name'] not in [beer['beername'] for beer in beers_tasted]]

    include_only = data['includeOnly']
    # if the length is 4, then it's the entire beerlist; no point searching
    if len(include_only) > 0 and len(include_only) != 4:
        beerlist = [beer for beer in beerlist if beer['container'] in include_only]
    if data['isNC']:
        beerlist = [beer for beer in beerlist if beer['isNC']]
    return Response(random.sample(beerlist, 3), status=HTTP_200_OK)
