# LeafWatch (GroupGPT)
DO NOT MODIFY OR DELETE THE coconut.m FILE. IT WILL CAUSE THE PROGRAM TO NOT RUN

Members:
Yahya Al-Shamali
Devin Headrick
Alex Flewwelling

Dependencies:
Django (pip install Django)

How to run the program:
-open cmd, and go to the LeafWatch folder (.../LeafWatch/LeafWatch)
-type 'python manage.py runserver'
-open http://127.0.0.1:8000/sensors/ on your browser
-enjoy

Models:
SensorGroup (parent) Contains all the sensors,groupName and location
Sensors (child) Contains sensorGroup(parent), sensorName, status and location

graphs not working on Django. To see graphs, follow these instructions.
-download node.js
-go to ChartJSRough in your cmd
-type 'npm install'
-type 'npm run dev'
-goto http://localhost:1234 on your browser
