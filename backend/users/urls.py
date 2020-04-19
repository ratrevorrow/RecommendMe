from django.urls import path
from . import views

urlpatterns = [
    path("create_user", views.create_user, name="create_user"),
    path("tasted", views.add_beer_tasted, name="add_beer_tasted"),
    path("get_tasted_beers", views.get_tasted_beers, name="add_beer_tasted"),
]
