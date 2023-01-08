from django.shortcuts import render
from django.http import HttpResponse, Http404
from .models import SensorGroup, Sensor


def graphs(request,GroupSensor_id):

    try:
        SensorGroup.objects.get(id = GroupSensor_id)
    except:
        raise Http404("Sensor group does not exist")


    sensors = Sensor.objects.all().filter(sensorGroup = GroupSensor_id)
    context = {
        'allSensors' : sensors,
        'sensorGroup' : GroupSensor_id,
    }
    return render(request, "test/src/graphs.html", context)


def data(request,GroupSensor_id):
    sensors = Sensor.objects.all().filter(sensorGroup = GroupSensor_id)
    context = {
        'allSensors' : sensors,
    }
    return render(request, "sensors/data.html", context)
    
#sensor group
def allSensors(request):
    allSensors = SensorGroup.objects.all()
    context = {
        'allSensors' : allSensors,
    }
    return render(request, "sensors/boxes.html", context)