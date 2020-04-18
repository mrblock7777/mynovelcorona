<template>
  <div>
    <b-row class="total-summary">
      <b-col class="summary" :key="title" col sm="12" md="4">
        <b-card
          header-tag="header"
          header="Active Cases"
          header-bg-variant="warning"
          header-text-variant="black"
        >
          <b-card-title>{{ activeCases.totalCase }}</b-card-title>
          <b-card-text>New: {{ activeCases.newCase }}</b-card-text>
        </b-card>
      </b-col>
      <b-col class="summary" :key="title" col sm="12" md="4">
        <b-card
          header-tag="header"
          header="Death Cases"
          header-bg-variant="danger"
          header-text-variant="white"
        >
          <b-card-title>{{ deathCases.totalCase }}</b-card-title>
          <b-card-text>
            New: {{ deathCases.newCase }}
            <br/>
            <strong> Mortality Rate: {{ mortalityRate }} %</strong>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col class="summary" :key="title" col sm="12" md="4">
        <b-card
          header-tag="header"
          header="Recovered Cases"
          header-bg-variant="success"
          header-text-variant="white"
        >
          <b-card-title>{{ recoveredCases.totalCase }}</b-card-title>
          <b-card-text>
            New: {{ recoveredCases.newCase }}
            <br/>
            <strong> Recovery Rate: {{ recoveryRate }} %  </strong>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  props: ["overall"],
  computed: {
    activeCases() {
      return this.overall.activeCases;
    },
    recoveredCases() {
      return this.overall.recoveredCases;
    },
    deathCases() {
      return this.overall.deathCases;
    },
    mortalityRate() {
      let percentage =
        (this.deathCases.totalCase / this.activeCases.totalCase) * 100;
      return parseFloat(percentage).toFixed(2);
    },
    recoveryRate() {
      let percentage =
        (this.recoveredCases.totalCase / this.activeCases.totalCase) * 100;
      return parseFloat(percentage).toFixed(2);
    }
  },
  filters: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    },
    formatCamelCase(str) {
      return str.replace(/([A-Z])/g, " $1").trim();
    }
  }
};
</script>
<style lang="scss" scoped>
.total-summary {
  .summary {
    margin-bottom: 5px;
    .summary-value {
      font-size: 40px;
    }
    .summary-title {
      font-size: 20px;
    }
  }
}
</style>