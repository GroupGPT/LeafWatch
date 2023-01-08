# LeafWatch (GroupGPT)
DO NOT MODIFY OR DELETE THE coconut.m FILE. IT WILL CAUSE THE PROGRAM TO NOT RUN

Members:<br />
Yahya Al-Shamali<br />
Devin Headrick<br />
Alex Flewwelling<br />

Dependencies:<br />
Django (pip install Django)

How to run the program:<br />
-open cmd, and go to the LeafWatch folder (.../LeafWatch/LeafWatch)<br />
-type 'python manage.py runserver'<br />
-open http://127.0.0.1:8000/sensors/ on your browser<br />
-enjoy<br />

Models:<br />
SensorGroup (parent) Contains all the sensors,groupName and location<br />
Sensors (child) Contains sensorGroup(parent), sensorName, status and location<br />

graphs not working on Django. To see graphs, follow these instructions.<br />
-download node.js<br />
-go to ChartJSRough in your cmd<br />
-type 'npm install'<br />
-type 'npm run dev'<br />
-goto http://localhost:1234 on your browser<br />
