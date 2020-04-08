<template>
  <div>
    <fusioncharts
      class="confirmed"
      type="worldwithcountries"
      width="100%"
      height="700"
      data-format="json"
      :dataSource="source"
    />
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {
      source: {
        chart: {
          caption: "Total COVID-19 Cases Around The World",
          subcaption: "",
          includevalueinlabels: "1",
          entityFillHoverColor: "#FFF9C4",
          theme: "fusion",
          showlegend: "1"
        },
        colorrange: {
          minvalue: "0",
          code: "#FFFFFF",
          color: [
            {
              maxvalue: "100",
              color: "#fcf2d4"
            },
            {
              maxvalue: "500",
              color: "#fff0c9"
            },
            {
              maxvalue: "1000",
              color: "#fff2cf"
            },
            {
              maxvalue: "5000",
              color: "#ffda75"
            },
            {
              maxvalue: "10000",
              color: "#ffd04f"
            },
            {
              maxvalue: "50000",
              color: "#ffc938"
            },
            {
              maxvalue: "100000",
              color: "#fcbd12"
            },
            {
              maxvalue: "500000",
              color: "#c99300"
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
        this.source.data.push({
          id: item.id,
          value: item.TotalConfirmed.toString()
        });
      });
    }
  },
  mounted() {
    this.processData();
  }
};
</script>