from django.urls import path
from . import views

urlpatterns = [
    path("get_everything", views.get_everything, name="get_everything"),
    path("get_styles", views.get_styles, name="get_styles"),
]
