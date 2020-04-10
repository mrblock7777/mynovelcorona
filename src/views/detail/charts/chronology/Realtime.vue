<template>
  <div>
    <apexchart
      v-if="series.length"
      type="line"
      :series="series"
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
}

function resetData() {
  data1 = data1.slice(data1.length - 10, data1.length);
  data2 = data2.slice(data2.length - 10, data2.length);
}
// 777600000
export default {
  name: "home",
  props: ["detail"],
  data() {
    return {
      latestDate: 0,
      series: [],
      chartData: [],
      chartOptions: {
        chart: {
          id: "realtime",
          height: 350,
          type: "line",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Realtime Trend of Daily Confirmed Cases ",
          align: "center"
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: "datetime",
          // range: 777600000
        },
        legend: {
          show: false
        }
      }
    };
  },
  mounted() {
    this.initialiseData();
  },
  methods: {
    getNewSeries(currentDate, index) {
      let newDate = currentDate + 86400000;
      this.latestDate = newDate;
      this.chartData.push({
        x: newDate,
        y: this.detail[index]["Cases"]
      });
    },
    initialiseData() {
      let i = 0;
      this.chartData = [];
      let date = new Date(this.detail[0]["Date"]).getTime();
      for (; i < 10; i++) {
        let x = date;
        let y = this.detail[i]["Cases"];

        this.chartData.push({
          x: x,
          y: y
        });
        this.latestDate = date;
        date += 86400000;
      }
      this.series = [
        {
          data: this.chartData.slice()
        }
      ];
      this.interval();
    },
    interval() {
      let i = 0;
      let realTime = setInterval(_ => {
        if(i < this.detail.length){
        this.getNewSeries(this.latestDate, i);
        this.$refs.chart.updateSeries([
          {
            name: "Cases",
            data: this.chartData
          }
        ]);
        i++;
        }
        else{
          clearInterval(realTime);
          this.initialiseData();
        }
      }, 1000);
    },
    resetData() {
      this.chartData = this.chartData.slice(
        this.chartData.length - 10,
        this.chartData.length
      );
    },
    intervals1() {
      setInterval(_ => {
        getNewSeries(lastDate, {
          min: 10,
          max: 120
        });
        this.$refs.chart.updateSeries([
          {
            data: data1
          }
        ]);
      }, 1000);
      setInterval(_ => {
        resetData();
        this.$refs.chart.updateSeries(
          [
            {
              data: []
            }
          ],
          false,
          true
        );
      }, 60000);
    }
  }
};
</script>