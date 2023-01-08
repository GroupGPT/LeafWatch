import Chart from 'chart.js/auto'

var timeStamps = [];
for (i = 0; i < 24; i++) {
    timeStamps.push(i.toString());
}

var node1TempData = [];
for (i = 0; i < 24; i++) {
    var temp = Math.floor(Math.random() * 1000);
    node1TempData.push(temp);
}

var node2TempData = [];
for (i = 0; i < 24; i++) {
    var temp = Math.floor(Math.random() * 500);
    node2TempData.push(temp);
}

const ctx = document.getElementById('lightChart').getContext("2d");

(async function () {
    new Chart(
        ctx,
        {
            type: 'line',
            data: {
                labels: timeStamps,
                datasets: [
                    {
                        label: 'Node 1',
                        data: node1TempData,
                    },
                    {
                        label: 'Node 2',
                        data: node2TempData,
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, ticks) {
                                return value + " PAR";
                            }
                        }
                    }
                },

            },
        }
    );
})();

