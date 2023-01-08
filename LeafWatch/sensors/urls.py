from django.urls import path
from . import views

urlpatterns = [
    # path('', views.allSensors),
    path('', views.index, name="index"),
    path('<str:GroupSensor_name>/', views.data),
    path('chartTest', views.chartTest, name="chart-test")
]
