<template>
  <div>
    <apexchart type="bar" ref="chart" :series="series" height="500" :options="chartOptions"/>
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
        colors: ["#a87c00"],
        dataLabels:{
            enabled: false
        },
        xaxis:{
            type: 'datetime',
            title:{
                text: 'Date'
            },
            categories: []
        },
        yaxis:{
            title:{
                text: 'Number of Cases'
            },
        },
        title:{
            text: 'Daily New Confirmed Cases for the past 30 Days',
            align: 'center'
        }
      }
    };
  },
  methods: {
    processDetail() {
      let data = [];
      for(let i = this.detail.length - 1; i > this.detail.length - 31; i--){
          let detail = this.detail[i]
          
          if (i < this.detail.length - 1) {
            let dailyCases = this.detail[i + 1].Cases -  detail.Cases;
            let date = new Date(this.detail[i + 1].Date);
            let dataWithDate = [date.getTime(), dailyCases]
            data.unshift(dataWithDate);
          }
      }
      this.series.push({
          name: 'Cases',
          data: data
      })
    }
  },
  mounted() {
    this.processDetail();
  }
};
</script>