import Chart from 'chart.js/auto'

function generateFakeData() {
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
    
    return [timeStamps, tempData];
}

var [ts1, td1] = generateFakeData();
var [ts2, td2] = generateFakeData();
var [ts3, td3] = generateFakeData();

const ctx1 = document.getElementById('humidityChart').getContext("2d")
const ctx2 = document.getElementById('temperatureChart').getContext("2d");
const ctx3 = document.getElementById('lightChart').getContext("2d")

async function makeChart(ctx,timeStamps,tempdataset,yaxisunit) {
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
                                //return value + " °C";
                                return value + " " + yaxisunit
                            }
                        }
                    }
                },

            },
        }
    );
    for (key in tempdataset) {
        var temp = tempdataset[key];
        mychart.data.datasets.push({data: temp, label: key})
    }
    var [newlabels, newdatasets] = newData(mychart,24,24,"hour",tempdataset);
    updatechart(mychart, newlabels, newdatasets);
    return mychart
}

var chart1 = makeChart(ctx1,ts1,td1,"%");
var chart2 = makeChart(ctx2,ts2,td2,"°C");
var chart3 = makeChart(ctx3,ts3,td3,"PAR");

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

function newData(chart, hours, xAxisLength, unit="hour", originalDataset) {
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
            let originalData = originalDataset[dataset.label]
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

daybutton.addEventListener('click', async () => {
    //alert('please tell mme youre working')
    let newchart1 = await chart1;
    let newchart2 = await chart2;
    let newchart3 = await chart3;
    var [newlabels1, newdatasets1] = newData(newchart1,24,24,"hour",td1);
    var [newlabels2, newdatasets2] = newData(newchart2,24,24,"hour",td2);
    var [newlabels3, newdatasets3] = newData(newchart3,24,24,"hour",td3);
    updatechart(newchart1, newlabels1, newdatasets1);
    updatechart(newchart2, newlabels2, newdatasets2);
    updatechart(newchart3, newlabels3, newdatasets3);
});
weekbutton.addEventListener('click', async () => {
    let newchart1 = await chart1
    let newchart2 = await chart2
    let newchart3 = await chart3
    var [newlabels1, newdatasets1] = newData(newchart1,24*7,14,"day",td1);
    var [newlabels2, newdatasets2] = newData(newchart2,24*7,14,"day",td2);
    var [newlabels3, newdatasets3] = newData(newchart3,24*7,14,"day",td3);
    updatechart(newchart1, newlabels1, newdatasets1);
    updatechart(newchart2, newlabels2, newdatasets2);
    updatechart(newchart3, newlabels3, newdatasets3);
});
monthbutton.addEventListener('click', async () => {
    let newchart1 = await chart1
    let newchart2 = await chart2
    let newchart3 = await chart3
    var [newlabels1, newdatasets1] = newData(newchart1,24*30,30,"day",td1);
    var [newlabels2, newdatasets2] = newData(newchart2,24*30,30,"day",td2);
    var [newlabels3, newdatasets3] = newData(newchart3,24*30,30,"day",td3);
    updatechart(newchart1, newlabels1, newdatasets1);
    updatechart(newchart2, newlabels2, newdatasets2);
    updatechart(newchart3, newlabels3, newdatasets3);
});