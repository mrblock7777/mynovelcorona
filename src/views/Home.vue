<template>
  <div>
    <h1 class="title">Corona Tracker</h1>
    <h2>Summary</h2>
    <Overall v-if="!loading" :overall="overall" />
    <Statistics v-if="!loading" :summary="summary" :header="header" />
    <p v-else>Loading data...</p>
    <Analysis />
  </div>
</template>

<script>
import Overall from "./summary/Overall";
import Statistics from "./summary/Statistics";
import Analysis from "./summary/Analysis";
import Chronology from './summary/Chronology';
export default {
  data() {
    return {
      loading: false,
      summary: [],
      overall: {
        activeCases: {
          newCase: 0,
          totalCase: 0,
          color: "warning"
        },
        deathCases: {
          newCase: 0,
          totalCase: 0,
          color: "danger"
        },
        recoveredCases: {
          newCase: 0,
          totalCase: 0,
          color: "success"
        }
      },
      header: [
        {
          key: "Country",
          sortable: true
        },
        {
          key: "NewConfirmed",
          sortable: true
        },
        {
          key: "TotalConfirmed",
          sortable: true
        },
        {
          key: "NewDeaths",
          sortable: true
        },
        {
          key: "TotalDeaths",
          sortable: true
        },
        {
          key: "NewRecovered",
          sortable: true
        },
        {
          key: "TotalRecovered",
          sortable: true
        },
        {
          key: "RecoveryRate",
          label: "Recovery Rate (%)",
          sortable: true
        },
        {
          key: "actions",
          label: "Action"
        }
      ]
    };
  },
  components: {
    Overall,
    Statistics,
    Analysis
  },
  methods: {
    async getSummary() {
      this.loading = true;
      this.summary = [];
      this.overall.activeCases.totalCase = 0;
      this.overall.deathCases.totalCase = 0;
      this.overall.recoveredCases.totalCase = 0;

      this.overall.activeCases.newCase = 0;
      this.overall.deathCases.newCase = 0;
      this.overall.recoveredCases.newCase = 0;

      let overallSummary = {
        activeCases: {
          newCase: 0,
          totalCase: 0
        },
        deathCases: {
          newCase: 0,
          totalCase: 0
        },
        recoveredCases: {
          newCase: 0,
          totalCase: 0
        }
      };
      let doc = await this.axios.get(this.url + "summary");
      let lists = doc.data.Countries;
      lists.forEach((list, index) => {
        list._cellVariants = {};

        if (list.NewConfirmed > 0) {
          list._cellVariants.NewConfirmed = "warning";
        }
        if (list.NewDeaths > 0) {
          list._cellVariants.NewDeaths = "danger";
        }
        if (list.NewRecovered > 0) {
          list._cellVariants.NewRecovered = "info";
        }
        if (list.TotalConfirmed == list.TotalRecovered) {
          list._rowVariant = "success";
        }
        let recoveredPercentage =
          (list.TotalRecovered / list.TotalConfirmed) * 100;
        list.RecoveryRate =
          recoveredPercentage || recoveredPercentage == 0
            ? parseFloat(recoveredPercentage).toFixed(2)
            : "N/A";

        let buttons = {
          text: "Details"
        };
        list.actions = buttons;
        overallSummary.activeCases.totalCase += list.TotalConfirmed;
        overallSummary.deathCases.totalCase += list.TotalDeaths;
        overallSummary.recoveredCases.totalCase += list.TotalRecovered;

        overallSummary.activeCases.newCase += list.NewConfirmed;
        overallSummary.deathCases.newCase += list.NewDeaths;
        overallSummary.recoveredCases.newCase += list.NewRecovered;
        this.summary.push(list);
      });
      this.totalCasesCounter(doc.data.Global);
      this.newCasesCounter(doc.data.Global);
      this.loading = false
    },
    totalCasesCounter(data) {
      let incrementSpeed = 200;
      let totalCasesCount = setInterval(_ => {
        let increment = parseInt(data.TotalConfirmed / incrementSpeed);
        if (this.overall.activeCases.totalCase <= data.TotalConfirmed) {
          this.overall.activeCases.totalCase += increment;
        } else {
          let difference =
            this.overall.activeCases.totalCase - data.TotalConfirmed;
          this.overall.activeCases.totalCase -= difference;
          clearInterval(totalCasesCount);
        }
      }, 1000 / data.TotalConfirmed);

      let totalDeathsCount = setInterval(_ => {
        let increment = parseInt(data.TotalDeaths / incrementSpeed);
        if (this.overall.deathCases.totalCase <= data.TotalDeaths) {
          this.overall.deathCases.totalCase += increment;
        } else {
          let difference = this.overall.deathCases.totalCase - data.TotalDeaths;
          this.overall.deathCases.totalCase -= difference;
          clearInterval(totalDeathsCount);
        }
      }, 1000 / data.TotalDeaths);

      let totalRecoveredCount = setInterval(_ => {
        let increment = parseInt(data.TotalRecovered / incrementSpeed);
        if (this.overall.recoveredCases.totalCase <= data.TotalRecovered) {
          this.overall.recoveredCases.totalCase += increment;
        } else {
          let difference =
            this.overall.recoveredCases.totalCase - data.TotalRecovered;
          this.overall.recoveredCases.totalCase -= difference;
          clearInterval(totalRecoveredCount);
        }
      }, 1000 / data.TotalRecovered);
    },
    newCasesCounter(data) {
      let incrementSpeed = 200;

      let totalCasesCount = setInterval(_ => {
        let increment = parseInt(data.NewConfirmed / incrementSpeed);
        if (this.overall.activeCases.newCase <= data.NewConfirmed) {
          this.overall.activeCases.newCase += increment;
        } else {
          let difference = this.overall.activeCases.newCase - data.NewConfirmed;
          this.overall.activeCases.newCase -= difference;
          clearInterval(totalCasesCount);
        }
      }, 1000 / data.NewConfirmed);

      let totalDeathsCount = setInterval(_ => {
        let increment = parseInt(data.NewDeaths / incrementSpeed);
        if (this.overall.deathCases.newCase <= data.NewDeaths) {
          this.overall.deathCases.newCase += increment;
        } else {
          let difference = this.overall.deathCases.newCase - data.NewDeaths;
          this.overall.deathCases.newCase -= difference;
          clearInterval(totalDeathsCount);
        }
      }, 1000 / data.NewDeaths);

      let totalRecoveredCount = setInterval(_ => {
        let increment = parseInt(data.NewDeaths / incrementSpeed);
        if (this.overall.recoveredCases.newCase <= data.NewDeaths) {
          this.overall.recoveredCases.newCase += increment;
        } else {
          let difference = this.overall.recoveredCases.newCase - data.NewDeaths;
          this.overall.recoveredCases.newCase -= difference;
          clearInterval(totalRecoveredCount);
        }
      }, 1000 / data.NewDeaths);
    }
  },
  beforeMount() {
    this.getSummary();
  }
};
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
}
</style>
