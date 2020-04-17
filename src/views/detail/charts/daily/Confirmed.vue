<template>
  <div>
    <apexchart type="line" ref="chart" :series="series" height="500" :options="chartOptions" />
  </div>
</template>
<script>
export default {
  props: ["detail"],
  data() {
    return {
      series: [],
      chartOptions: {
        labels: [],
        chart: {
          toolbar: {
            show: false
          }
        },
        colors: ["#a87c00"],
        dataLabels: {
          enabled: false
        },
        annotations: {
          points: []
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "Date"
          },
          categories: []
        },
        yaxis: {
          title: {
            text: "Number of Cases"
          }
        },
        title: {
          text: "Daily New Confirmed Cases",
          align: "center"
        }
      }
    };
  },
  methods: {
    processDetail() {
      let data = [];
      let compare = [];
      for (let i = this.detail.length - 1; i >= 0; i--) {
        let detail = this.detail[i];

        if (i < this.detail.length - 1) {
          let dailyCases = Math.abs(this.detail[i + 1].Cases - detail.Cases);
          let date = new Date(this.detail[i + 1].Date);
          let dataWithDate = [date.getTime(), dailyCases];
          data.unshift(dataWithDate);
          compare.push(dailyCases);
        }
      }

      this.series.push({
        name: "Cases",
        data: data
      });

      // let max = Math.max(...compare);
      // let highest = data.find(item => {
      //   return item.includes(max);
      // });

      // this.chartOptions.annotations = {
      //   points: [
      //     {
      //       x: highest[0],
      //       y: highest[1],
      //       marker: {
      //         size: 8,
      //         fillColor: "#fff",
      //         strokeColor: "red",
      //         radius: 2
      //       },
      //       label: {
      //         borderColor: "#FF4560",
      //         offsetY: 0,
      //         style: {
      //           color: "#fff",
      //           background: "#FF4560"
      //         },

      //         text: "Test"
      //       }
      //     }
      //   ]
      // };
      // console.log(this.chartOptions);
    }
  },
  mounted() {
    this.processDetail();
  }
};
</script>