from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from beerlist.models import Initiators

initiators = Initiators()
initiators.initiate_everything()

# Create your views here.
@api_view(['GET'])
@permission_classes((AllowAny,))
def get_everything(request):
    """Get all the data

    Returns:
        JsonResponse -- beers object containing the formatted beerlist with adjectives
    """
    return JsonResponse({"beers": initiators.get_everything()}, status=200)

@api_view(['GET'])
@permission_classes((AllowAny,))
def get_styles(request):
    """Login a user

    Returns:
        Response -- token and user data, or error
    """
    return JsonResponse(initiators.get_styles(), status=200, safe=False)
