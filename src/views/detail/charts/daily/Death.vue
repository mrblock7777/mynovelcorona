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
        colors: ["#c72e2e"],
        dataLabels: {
          enabled: false
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
          text: "Daily New Death Cases",
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

      let max = Math.max(...compare);
      let highest = data.find(item => {
        return item.includes(max);
      });

      this.$refs.chart.updateOptions({
        annotations: {
          points: [
            {
              x: highest[0],
              y: highest[1],
              marker: {
                size: 8,
                fillColor: "#fff",
                strokeColor: "#7083ff",
                radius: 2
              },
              label: {
                borderColor: "#7083ff",
                offsetY: 0,
                style: {
                  color: "#fff",
                  background: "#7083ff"
                },

                text: 'Highest Daily Cases: ' + highest[1]
              }
            }
          ]
        }
      });
    }
  },
  mounted() {
    this.processDetail();
  }
};
</script>