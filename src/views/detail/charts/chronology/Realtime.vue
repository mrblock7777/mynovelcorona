<template>
  <div>
    <apexchart
      v-if="series1.length"
      type="line"
      :series="series1"
      height="500"
      :options="chartOptions"
      ref="chart"
    />
  </div>
</template>
<script>
var lastDate = 0;
var data1 = [];
var data2 = [];

function getDayWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  while (i < count) {
    var x = baseval;
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    data1.push({
      x,
      y
    });
    data2.push({
      x,
      y
    });
    lastDate = baseval;
    baseval += 86400000;
    i++;
  }
}

getDayWiseTimeSeries(new Date("11 Feb 2017 GMT").getTime(), 10, {
  min: 10,
  max: 90
});

function getNewSeries(baseval, yrange) {
  var newDate = baseval + 86400000;
  lastDate = newDate;
  data1.push({
    x: newDate,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
  });
  data2.push({
    x: newDate,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
  });
}

function resetData() {
  data1 = data1.slice(data1.length - 10, data1.length);
  data2 = data2.slice(data2.length - 10, data2.length);
}

export default {
  name: "home",
  data() {
    return {
      series1: [
        {
          data: data1.slice()
        }
      ],
      chartOptions: {
        chart: {
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000
            }
          },
          foreColor: "#fff"
        },
        stroke: {
          curve: "smooth"
        },

        title: {
          text: "Dynamic Updating Chart",
          align: "left"
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: "datetime",
          range: 777600000,
          labels: {
            show: true
          }
        },
        yaxis: {},
        legend: {
          show: false
        }
      }
    };
  },
  mounted() {
    this.intervals1();
  },
  methods: {
    intervals1() {
      setInterval(_ => {
        getNewSeries(lastDate, {
          min: 10,
          max: 90
        });
        this.$refs.chart.updateSeries([
          {
            data: data1
          }
        ]);
        
      }, 1000);

      // every 60 seconds, we reset the data to prevent memory leaks
      setInterval(_=> {
        resetData();
        this.$refs.realtimeChart1.updateSeries(
          [
            {
              data: []
            }
          ],
          false,
          true
        );
      }, 60000);
    },
    
  }
};
</script>