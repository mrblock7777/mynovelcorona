<template>
  <div>
    <h1 class="title">Cases In {{ countryName | reformat | capitalize }}</h1>
    <div v-if="!loading">
      <Summary :overall="latestCase" />
      <strong>Recovery Rate: {{ recoveryRate }} %</strong>
      <br/>
      <strong>Death Rate: {{ deathRate }} %</strong>
      <br/>
      <strong>Total active patient: {{ totalInfected }} patients</strong>
      <Chronology :detail="detail" />
      <Daily :detail="detail" />
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
        confirmedCases: [],
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
      this.latestCase.active = this.detail.confirmedCases.slice(-1)[0].Cases;
      this.latestCase.death = this.detail.deathCases.slice(-1)[0].Cases;
      this.latestCase.recovered = this.detail.recoveredCases.slice(-1)[0].Cases;

      this.loading = false;
    },
    async getDetail() {
      this.loading = true;
      let activeData = [];
      let confirmedData = await this.requestData("confirmed");
      let deathData = await this.requestData("deaths");
      let recoveredData = await this.requestData("recovered");

      recoveredData.data.forEach(data => {
        this.detail.recoveredCases.push(data);
      });
      deathData.data.forEach(data => {
        this.detail.deathCases.push(data);
      });
      for (let i = 0; i < recoveredData.data.length; i++) {
        let recovered = recoveredData.data[i];
        let confirmed = confirmedData.data[i];
        let death = deathData.data[i];
        let infected = Math.abs(confirmed.Cases - recovered.Cases - death.Cases);
        let active = Object.assign({}, confirmed, {
          Cases: infected
        });
        activeData.push(active);
      }
      activeData.forEach(data => {
        this.detail.activeCases.push(data);
      });
      confirmedData.data.forEach(data => {
        this.detail.confirmedCases.push(data);
      });
      this.getLatestCases();
    }
  },
  computed: {
    recoveryRate() {
      let recovered = this.latestCase.recovered;
      let confirmed = this.latestCase.active;
      return parseFloat((recovered / confirmed) * 100).toFixed(2);
    },
    deathRate() {
      let death = this.latestCase.death;
      let confirmed = this.latestCase.active;
      return parseFloat((death / confirmed) * 100).toFixed(2);
    },
    totalInfected() {
      let death = this.latestCase.death;
      let confirmed = this.latestCase.active;
      let recovered = this.latestCase.recovered;

      return confirmed - recovered - death;
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