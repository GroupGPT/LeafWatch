from django.urls import path
from . import views

urlpatterns = [
    path('', views.allSensors),
    path('<str:GroupSensor_id>/', views.graphs),
]
