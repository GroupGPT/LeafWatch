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
    

def allSensors(request):
    allSensors = SensorGroup.objects.all()
    context = {
        'allSensors' : allSensors,
    }
    return render(request, "sensors/boxes.html", context)


def index(request):
    """View function for home page of site."""
    # allSensors = SensorGroup.objects.all()
    # template = loader.get_template("sensors/boxes.html")
    # context = {
    #     'allSensors': allSensors,
    # }

    # Number of visits to this view, as counted in the session variable.
    num_visits = request.session.get('num_visits', 0)
    request.session['num_visits'] = num_visits + 1

    context = {
        'num_visits': num_visits
    }

    # Render the HTML template index.html with the data in the context variable
    return render(request, 'index.html', context=context)


def chartTest(request):
    return render(request, 'sensors/chartTest.html', {})
