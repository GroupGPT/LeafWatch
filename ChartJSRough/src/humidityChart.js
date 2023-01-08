import Chart from 'chart.js/auto'

var timeStamps = [];
for (i = 0; i < 24*30; i++) {
    timeStamps.push(i.toString());
}

var tempData = {};

var node1TempData = [];
for (i = 0; i < 24*30; i++) {
    var temp = Math.floor(Math.random() * 80);
    node1TempData.push(temp);
}
tempData['Node 1'] = (node1TempData);

var node2TempData = [];
for (i = 0; i < 24*30; i++) {
    var temp = Math.floor(Math.random() * 80);
    node2TempData.push(temp);
}
tempData['Node 2'] = node2TempData;

const ctx = document.getElementById('humidityChart').getContext("2d");

async function makeChart() {
    var mychart = new Chart(
        ctx,
        {
            type: 'line',
            data: {
                labels: [],
                //labels: timeStamps,
                datasets: [],
                /*datasets: [
                    {
                        label: 'Node 1',
                        data: node1TempData,
                    },
                    {
                        label: 'Node 2',
                        data: node2TempData,
                    }
                ]*/
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return value + " %";
                            }
                        }
                    }
                },

            },
        }
    );
    for (key in tempData) {
        var temp = tempData[key];
        mychart.data.datasets.push({data: temp, label: key})
    }
    var [newlabels, newdatasets] = newData(mychart,24,24);
    updatechart(mychart, newlabels, newdatasets);
    return mychart
}

var mychart = makeChart();

var daybutton = document.getElementById('24h');
var weekbutton = document.getElementById('7d');
var monthbutton = document.getElementById('30d');

function updatechart(chart, newlabels, newdatasets) {
    chart.data.labels = newlabels;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = newdatasets[dataset.label];
    });
    chart.update();
}

function newData(chart, hours, xAxisLength, unit="hour") {
    var ratio = Math.floor(hours/xAxisLength)
    var dispRatio
    switch (unit) {
        case "hour":
            dispRatio = 1;
            break;
        case "12hr":
            dispRatio = 1/12;
            break;
        case "day":
            dispRatio = 1/24;
            break;
        case "minute":
            dispRatio = 60;
            break;
        default:
            dispRatio = 1;
    }
    let newlabels = [];
    let newdatasets = {};
    chart.data.datasets.forEach((dataset) => {
        newdatasets[dataset.label] = []
    });
    for (let i = 0; i < xAxisLength; i++) {
        newlabels.push(i*ratio*dispRatio);
        chart.data.datasets.forEach((dataset) => {
            let originalData = tempData[dataset.label]
            if (ratio == 1) {
                // why can't I just use negative indexing graahhhh
                newdatasets[dataset.label].push(originalData[originalData.length+(i-hours)]) 
            } else if ((i+1)*ratio < hours) {
                var range = originalData.slice((i)*ratio-hours,(i+1)*ratio-hours);
                var sum = range.reduce((partial, a) => partial + a, 0);
                var average = sum/(range.length);
                newdatasets[dataset.label].push(average);
            } else {
                newdatasets[dataset.label].push(originalData[originalData.length-1]);
            }
        }); 
    }
    return [newlabels, newdatasets]
}

daybutton.onclick = async () => {
    //alert('please tell mme youre working')
    let chart = await mychart
    var [newlabels, newdatasets] = newData(chart,24,24);
    updatechart(chart, newlabels, newdatasets);
}
weekbutton.onclick = async () => {
    let chart = await mychart
    var [newlabels, newdatasets] = newData(chart,24*7,14,"day");
    updatechart(chart, newlabels, newdatasets);
}
monthbutton.onclick = async () => {
    let chart = await mychart
    var [newlabels, newdatasets] = newData(chart,24*30,30,"day");
    updatechart(chart, newlabels, newdatasets);
}