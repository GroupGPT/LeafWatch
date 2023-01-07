from django.db import models

# Create your models here.

class SensorGroup(models.Model):
    groupName = models.CharField(max_length=20)
    location = models.CharField(max_length=100)

class Sensor(models.Model):
    sensorGroup = models.ForeignKey(SensorGroup, on_delete=models.CASCADE)
    sensorName = models.CharField(max_length=20)
    status = models.CharField(max_length=20)
    location = models.CharField(max_length=100)
