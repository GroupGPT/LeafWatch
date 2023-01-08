from django.shortcuts import render
from django.http import HttpResponse
from .models import SensorGroup, Sensor
from django.template import loader


def graphs(request,GroupSensor_id):
    sensors = Sensor.objects.all().filter(sensorGroup = GroupSensor_id)
    template = loader.get_template("test/src/graphs.html")
    context = {
        'allSensors' : sensors,
        'sensorGroup' : GroupSensor_id,
    }
    return HttpResponse(template.render(context, request))


def data(request,GroupSensor_id):
    sensors = Sensor.objects.all().filter(sensorGroup = GroupSensor_id)
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