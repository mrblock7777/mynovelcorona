<template>
  <div>
    <h1 class="title">Cases In {{ countryName | reformat | capitalize }}</h1>
    <div v-if="!loading">
      <Summary :overall="latestCase" />
      <Chronology :detail="detail" />
      <Daily :detail="detail"/>
    </div>
    <p v-else>Loading Summary...</p>
  </div>
</template>
<script>
import Summary from "./detail/Summary";
import Chronology from "./detail/Chronology";
import Daily from "./detail/Daily";
export default {
  data() {
    return {
      loading: true,
      detail: {
        activeCases: [],
        deathCases: [],
        recoveredCases: []
      },

      latestCase: {
        active: 0,
        death: 0,
        recovered: 0
      },
      countryName: this.$route.params.country
    };
  },
  components: {
    Summary,
    Chronology,
    Daily
  },
  methods: {
    requestData(status) {
      return this.axios.get(
        this.url +
          "total/dayone/country/" +
          this.countryName +
          "/status/" +
          status
      );
    },
    getLatestCases() {
      this.latestCase.active = this.detail.activeCases.slice(-1)[0].Cases;
      this.latestCase.death = this.detail.deathCases.slice(-1)[0].Cases;
      this.latestCase.recovered = this.detail.recoveredCases.slice(-1)[0].Cases;

      this.loading = false;
    },
    async getDetail() {
      this.loading = true;
      let activeData = await this.requestData("confirmed");
      let deathData = await this.requestData("deaths");
      let recoveredData = await this.requestData("recovered");

      activeData.data.forEach(data => {
        this.detail.activeCases.push(data);
      });
      deathData.data.forEach(data => {
        this.detail.deathCases.push(data);
      });
      recoveredData.data.forEach(data => {
        this.detail.recoveredCases.push(data);
      });

      this.getLatestCases();
    }
  },
  filters: {
    reformat(str) {
      return str.replace("-", " ");
    },
    capitalize(str) {
      return str
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  },
  beforeMount() {
    this.getDetail();
  }
};
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
}
</style>