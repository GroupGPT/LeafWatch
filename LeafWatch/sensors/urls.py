from django.urls import path
from . import views

urlpatterns = [
    # path('', views.allSensors),
    path('', views.allSensors, name="index"),
    path('<str:GroupSensor_id>/', views.graphs),
    path('chartTest', views.chartTest, name="chart-test")
]
