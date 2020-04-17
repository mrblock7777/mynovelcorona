<template>
  <div>
    <apexchart
      v-if="series.length"
      ref="chart"
      type="area"
      :series="series"
      height="500"
      :options="chartOptions"
    />
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
        labels: ["1", "2"],
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
      this.detail[cases].forEach(detail =>{
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
          let dataWithTime = [date.getTime(), detail.Cases]
          data.unshift(dataWithTime);
        }
      })
      // for (
      //   let i = this.detail[cases].length - 1;
      //   i > this.detail[cases].length - days + 1;
      //   i--
      // ) {
      //   let detail = this.detail[cases][i];
      //   if (detail) {
      //     if (!chartTitle.length) {
      //       this.chartOptions.title = Object.assign(
      //         {},
      //         {
      //           text: `Cases Trend In ${detail.Country}  (${days} days) `,
      //           align: "center"
      //         }
      //       );
      //     }

      //     let date = new Date(detail.Date);
      //     let displayDate = date.getDate() + "/" + (date.getMonth() + 1);
      //     let dataWithTime = [date.getTime(), detail.Cases]
      //     data.unshift(dataWithTime);
      //   }
      // }
      let text = cases.replace(/[A-Z]+/g, " ").split(" ");
      // console.log(this.chartOptions.xaxis);
      let title = text[0].charAt(0).toUpperCase() + text[0].substring(1);
      this.series.push({
        name: title,
        data: data
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