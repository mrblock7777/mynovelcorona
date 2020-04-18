<template>
  <div>
    <apexchart ref="chart" type="area" :series="series" height="500" :options="chartOptions" />
  </div>
</template>
<script>
export default {
  props: ["detail"],
  data() {
    return {
      series: [],
      newCases: {},
      chartOptions: {
        labels: [],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "",
          align: "center"
        },
        annotations: {},
        colors: ["#fcba03", "#ff8080", "#5bc76a"],
        xaxis: {
          type: "datetime",
          categories: [],
          title: {
            text: "Date"
          },
          labels: {
            type: "datetime",
            hideOverlappingLabels: true
          }
        },
        yaxis: {
          title: {
            text: "Number of Cases"
          }
        }
      }
    };
  },
  methods: {
    processDetails(cases) {
      let data = [];
      let dailyCases = [];
      let chartTitle = this.chartOptions.title.text;
      this.chartOptions.xaxis = Object.assign(this.chartOptions.xaxis, {
        categories: []
      });
      let days = 60;
      this.detail[cases].forEach(detail => {
        if (detail) {
          if (!chartTitle.length) {
            this.chartOptions.title = Object.assign(
              {},
              {
                text: `Cases Trend In ${detail.Country} `,
                align: "center"
              }
            );
          }

          let date = new Date(detail.Date);
          let displayDate = date.getDate() + "/" + (date.getMonth() + 1);
          let dataWithTime = [date.getTime(), detail.Cases];
          data.unshift(dataWithTime);
        }
      });
      let text = cases.replace(/[A-Z]+/g, " ").split(" ");
      // console.log(this.chartOptions.xaxis);
      let title = text[0].charAt(0).toUpperCase() + text[0].substring(1);
      this.series.push({
        name: title,
        data: data
      });

      if (this.series.length > 2 && this.$route.params.country == "malaysia") {
        this.addAnnotations();
      }
    },
    addAnnotations() {
      this.$refs.chart.updateOptions({
        annotations: {
          xaxis: [
            {
              x: new Date("18 Mar 2020").getTime(),
              strokeDashArray: 0,
              borderColor: "#775DD0",
              label: {
                borderColor: "#b89228",
                style: {
                  color: "#fff",
                  background: "#b89228"
                },
                text: "1st Phase of MCO"
              }
            },
            {
              x: new Date("31 March 2020").getTime(),
              strokeDashArray: 0,
              label: {
                borderColor: "#b32525",
                style: {
                  color: "#fff",
                  background: "#b32525"
                },
                text: "2nd Phase of MCO"
              }
            },
            {
              x: new Date("14 April 2020").getTime(),
              strokeDashArray: 0,
              label: {
                borderColor: "#38b325",
                style: {
                  color: "#fff",
                  background: "#38b325"
                },
                text: "3rd Phase of MCO"
              }
            }
          ]
        }
      });
    }
  },
  mounted() {
    this.processDetails("activeCases");
    this.processDetails("deathCases");
    this.processDetails("recoveredCases");
  }
};
</script>