import Chart from 'chart.js/auto'

var daybutton = document.getElementById('24h');
var weekbutton = document.getElementById('7d');
var monthbutton = document.getElementById('30d');

daybutton.onclick() = update(24);
weekbutton.onclick() = update(24*7);
monthbutton.onclick() = update(24*30);

// should update the graphs to have the correct x-axis length
function update(xAxisLength) {
    

}