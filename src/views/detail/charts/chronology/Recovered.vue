<template>
  <div>
    <apexchart
      v-if="series.length"
      type="line"
      :series="series"
      height="400"
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
          text: "Recovered Cases Trend In " + this.detail[0].Country,
          align: "center"
        },
        stroke: {
          curve: "smooth"
        },
        colors: ["#5bc76a"],
        xaxis: {
          categories: []
        }
      }
    };
  },
  methods: {
    processDetails() {
      let data = [];
      for (
        let i = this.detail.length - 1;
        i > this.detail.length - 15;
        i -= 2
      ) {
        let detail = this.detail[i];
        let date = new Date(detail.Date);
        let displayDate = date.getDate() + "/" + (date.getMonth() + 1);
        console.log(displayDate);
        this.chartOptions.xaxis.categories.unshift(displayDate);
        data.unshift(detail.Cases);
      }
      this.series.push({
        name: "Cases",
        data: data
      });
    }
  },
  mounted() {
    this.processDetails();
  }
};
</script>