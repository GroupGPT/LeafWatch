from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404
from .models import SensorGroup, Sensor


def graphs(request,GroupSensor_id):

    group = get_object_or_404(SensorGroup, id = GroupSensor_id)

    sensors = Sensor.objects.all().filter(sensorGroup = GroupSensor_id)
    context = {
        'allSensors' : sensors,
        'sensorGroup' : GroupSensor_id,
        'group' : group,
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