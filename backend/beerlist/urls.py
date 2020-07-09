from django.urls import path
from . import views

urlpatterns = [
    path("get_everything", views.get_everything, name="get_everything"),
    path("get_styles", views.get_styles, name="get_styles"),
    path("get_three_random_beers", views.get_three_random_beers,
         name="get_three_random_beers"),
    path("get_three_tailored_beers", views.get_three_tailored_beers,
         name="get_three_tailored_beers")
]
