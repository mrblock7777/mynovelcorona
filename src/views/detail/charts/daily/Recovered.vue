<template>
  <div>
    <apexchart type="line" :series="series" height="500" :options="chartOptions" />
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
        labels: [],
        colors: ["#5bc76a"],
        dataLabels: {
          enabled: false
        },
        stroke:{
          curve: 'smooth'
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
          text: "Daily New Recovered Cases",
          align: "center"
        }
      }
    };
  },
  methods: {
    processDetail() {
      let data = [];
      for (let i = this.detail.length - 1; i >= 0; i--) {
        let detail = this.detail[i];
        if (i < this.detail.length - 1) {
          let dailyCases = Math.abs(this.detail[i + 1].Cases - detail.Cases);
          let date = new Date(this.detail[i + 1].Date);
          let dataWithDate = [date.getTime(), dailyCases];
          
          data.unshift(dataWithDate);
        }
        
      }
      this.series.push({
        name: "Cases",
        data: data
      });
      console.log(this.series);
    }
  },
  mounted() {
    this.processDetail();
  }
};
</script>