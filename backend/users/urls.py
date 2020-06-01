from django.urls import path
from . import views

urlpatterns = [
    path("createuser", views.create_user, name="createuser"),
    path("auth_login", views.auth_login, name="login"),
    path("tasted", views.add_beer_tasted, name="tasted"),
    path("get_tasted_beers", views.get_tasted_beers, name="add_beer_tasted"),
    path("recommend_me", views.recommend_me, name="recommend_me"),
]
