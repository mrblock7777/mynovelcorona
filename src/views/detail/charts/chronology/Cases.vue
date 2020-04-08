<template>
  <div>
    <apexchart
      v-if="series.length"
      type="line"
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
      chartOptions: {
        labels: [],
        title: {
          text: "",
          align: "center"
        },
        stroke: {
          curve: "smooth"
        },
        colors: ["#fcba03", "#ff8080", "#5bc76a"],
        xaxis: {
          categories: []
        }
      }
    };
  },
  methods: {
    processDetails(cases) {
      let data = [];
      let chartTitle = this.chartOptions.title.text;
      
      for (
        let i = this.detail[cases].length - 1;
        i > this.detail[cases].length - 15;
        i -= 2
      ) {
        let detail = this.detail[cases][i];
        if (!chartTitle.length) {
          this.chartOptions.title = Object.assign(
            {},
            {
              text: "Cases Trend In " + detail.Country,
              align: "center"
            }
          );
        }

        let date = new Date(detail.Date);
        let displayDate = date.getDate() + "/" + (date.getMonth() + 1);
        this.chartOptions.xaxis.categories.unshift(displayDate);
        data.unshift(detail.Cases);
      }
      let text = cases.replace(/[A-Z]+/g, " ").split(" ");

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