from django.shortcuts import render
from django.http import HttpResponse
from .models import SensorGroup, Sensor
from django.template import loader


def data(request,GroupSensor_name):
    sensors = Sensor.objects.all().filter(sensorGroup = GroupSensor_name)
    template = loader.get_template("sensors/data.html")
    context = {
        'allSensors' : sensors,
    }
    return HttpResponse(template.render(context, request))
    

def allSensors(request):
    allSensors = SensorGroup.objects.all()
    template = loader.get_template("sensors/boxes.html")
    context = {
        'allSensors' : allSensors,
    }
    return HttpResponse(template.render(context, request))