
from django.shortcuts import render
from django.http import HttpResponse
from .models import SensorGroup, Sensor
from django.template import loader


# Not used ??????????????
def graphs(request, GroupSensor_id):
    sensors = Sensor.objects.all().filter(sensorGroup=GroupSensor_id)
    template = loader.get_template("test/src/graphs.html")
    context = {
        'allSensors': sensors,
        'sensorGroup': GroupSensor_id,
    }
    return HttpResponse(template.render(context, request))


def data(request, GroupSensor_id):
    sensors = Sensor.objects.all().filter(sensorGroup=GroupSensor_id)
    template = loader.get_template("sensors/data.html")
    context = {
        'allSensors': sensors,
    }
    return HttpResponse(template.render(context, request))


def allSensors(request):
    allSensors = SensorGroup.objects.all()
    template = loader.get_template("sensors/boxes.html")
    context = {
        'allSensors': allSensors,
    }
    return HttpResponse(template.render(context, request))


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
    template = loader.get_template("sensors/chartTest.html")
    return HttpResponse(template.render({}, request))
    # return render(request, 'chartTest.html', {})
