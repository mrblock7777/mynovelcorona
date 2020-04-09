<template>
  <div>
    <mapchart
      :country-data="recoveredData"
      id="map"
      low-color="#449445"
      high-color="#009602"
      show-legend
    />
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      recoveredData: {},
      source: {
        chart: {
          caption: "Recovery Rate(%) Around The World",
          subcaption: "",
          includevalueinlabels: "1",
          entityFillHoverColor: "#FFF9C4",
          theme: "fusion",
          showlegend: "1"
        },
        colorrange: {
          minvalue: "0",
          code: "#ff0000",
          color: [
            {
              maxvalue: "10",
              color: "#ff0000"
            },
            {
              maxvalue: "20",
              color: "#ff4040"
            },
            {
              maxvalue: "30",
              color: "#ff7a7a"
            },
            {
              maxvalue: "40",
              color: "#ffa8a8"
            },
            {
              maxvalue: "50",
              color: "#a8ffaf"
            },
            {
              maxvalue: "70",
              color: "#69ff75"
            },
            {
              maxvalue: "80",
              color: "#45ff54"
            },
            {
              maxvalue: "90",
              color: "#24ff35"
            },
            {
              maxvalue: "100",
              color: "#006e09"
            }
          ]
        },
        data: []
      }
    };
  },
  methods: {
    handler(event) {
      let countryDetails = this.data.find(item => {
        return item.id == event.data.id;
      });
      this.$router.push("details/" + countryDetails.Slug);
    },
    processData() {
      this.data.forEach(item => {
        let percentage = (item.TotalRecovered / item.TotalConfirmed) * 100;
        let fixed = parseFloat(percentage).toFixed(2);
        this.recoveredData = Object.assign({}, this.recoveredData, {
          [item.CountryCode]: percentage
        });
      });
    }
  },
  mounted() {
    this.processData();
  }
};
</script>
<style lang="scss" scoped>
#map {
  height: 100vh;
}
</style>