<template>
  <div>
    <h1 class="title">Corona Tracker</h1>
    <Overall :overall="overall"/>
    <Statistics :summary="summary" :header="header"/>
  </div>
</template>

<script>
import Overall from './summary/Overall';
import Statistics from './summary/Statistics';
export default {
  data(){
    return{
      summary: [],
      overall:{
        activeCases: {
          newCase: 0,
          totalCase: 0,
          color: 'warning'
        },
        deathCases: {
          newCase: 0,
          totalCase: 0,
          color: 'danger'
        },
        recoveredCases: {
          newCase: 0,
          totalCase: 0,
          color: 'success'
        }
      },
      header: [
        {
          key: 'Country',
          sortable: true
        },
        {
          key: 'NewConfirmed',
          sortable: true
        },
        {
          key: 'TotalConfirmed',
          sortable: true
        },
        {
          key: 'NewDeaths',
          sortable: true
        },
        {
          key: 'TotalDeaths',
          sortable: true
        },
        {
          key: 'NewRecovered',
          sortable: true
        },
        {
          key: 'TotalRecovered',
          sortable: true
        },
      ],
      
    }
  },
  components:{
    Overall,
    Statistics
  },
  methods:{
    async getSummary(){
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
          totalCase: 0,
        },
        deathCases: {
          newCase: 0,
          totalCase: 0,
        },
        recoveredCases: {
          newCase: 0,
          totalCase: 0,
        },
      }
      let doc = await this.axios.get(this.url + 'summary');
      let lists = doc.data.Countries;
      lists.forEach((list, index) =>{
        delete list.Slug;
        if(index > 1){
          if(list.NewConfirmed < 1){
            list._cellVariants = {
              NewConfirmed: 'success'
            }
          }
          else{
            // list.NewConfirmed = '+' + list.NewConfirmed;
          }
          if(list.NewDeaths > 0){
            list._cellVariants = {
              NewDeaths: 'danger'
            }
          }
          if(list.TotalConfirmed == list.TotalRecovered){
            list._rowVariant = 'success'
          }
          overallSummary.activeCases.totalCase += list.TotalConfirmed;
          overallSummary.deathCases.totalCase += list.TotalDeaths;
          overallSummary.recoveredCases.totalCase += list.TotalRecovered;

          overallSummary.activeCases.newCase += list.NewConfirmed;
          overallSummary.deathCases.newCase += list.NewDeaths;
          overallSummary.recoveredCases.newCase += list.NewRecovered;
          this.summary.push(list);
        }
      })
      this.totalCasesCounter(overallSummary);
      this.newCasesCounter(overallSummary);
      this.filteredList = this.summary;
    },
    totalCasesCounter(data){
      let incrementSpeed = 200
      console.log(data);
      let totalCasesCount = setInterval(_ =>{
        let increment = parseInt(data.activeCases.totalCase/incrementSpeed);
        if(this.overall.activeCases.totalCase <= data.activeCases.totalCase){
          this.overall.activeCases.totalCase += increment;
        }
        else{
          let difference = this.overall.activeCases.totalCase - data.activeCases.totalCase;
          this.overall.activeCases.totalCase -= difference;
          clearInterval(totalCasesCount);
        }

      }, 1000/data.activeCases.totalCase)

      let totalDeathsCount = setInterval(_ =>{
        let increment = parseInt(data.deathCases.totalCase/incrementSpeed);
        if(this.overall.deathCases.totalCase <= data.deathCases.totalCase){
          this.overall.deathCases.totalCase += increment;
        }
        else{
          let difference = this.overall.deathCases.totalCase - data.deathCases.totalCase;
          this.overall.deathCases.totalCase -= difference;
          clearInterval(totalDeathsCount);
        }

      }, 1000/data.deathCases.totalCase)

      let totalRecoveredCount = setInterval(_ =>{
        let increment = parseInt(data.recoveredCases.totalCase/incrementSpeed);
        if(this.overall.recoveredCases.totalCase <= data.recoveredCases.totalCase){
          this.overall.recoveredCases.totalCase += increment;
        }
        else{
          let difference = this.overall.recoveredCases.totalCase - data.recoveredCases.totalCase;
          this.overall.recoveredCases.totalCase -= difference;
          clearInterval(totalRecoveredCount);
        }

      }, 1000/data.recoveredCases.totalCase)

      
    },
    newCasesCounter(data){
      let incrementSpeed = 200
      
      let totalCasesCount = setInterval(_ =>{
        let increment = parseInt(data.activeCases.newCase / incrementSpeed);
        if(this.overall.activeCases.newCase <= data.activeCases.newCase){
          this.overall.activeCases.newCase += increment;
        }
        else{
          let difference = this.overall.activeCases.newCase - data.activeCases.newCase;
          this.overall.activeCases.newCase -= difference;
          clearInterval(totalCasesCount);
        }

      }, 1000/data.activeCases.newCase)
      
      let totalDeathsCount = setInterval(_ =>{
        let increment = parseInt(data.deathCases.newCase/incrementSpeed);
        if(this.overall.deathCases.newCase <= data.deathCases.newCase){
          this.overall.deathCases.newCase += increment;
        }
        else{
          let difference = this.overall.deathCases.newCase - data.deathCases.newCase;
          this.overall.deathCases.newCase -= difference;
          clearInterval(totalDeathsCount);
        }

      }, 1000/data.deathCases.newCase)

      let totalRecoveredCount = setInterval(_ =>{
        let increment = parseInt(data.recoveredCases.newCase/incrementSpeed);
        if(this.overall.recoveredCases.newCase <= data.recoveredCases.newCase){
          this.overall.recoveredCases.newCase += increment;
        }
        else{
          let difference = this.overall.recoveredCases.newCase - data.recoveredCases.newCase;
          this.overall.recoveredCases.newCase -= difference;
          clearInterval(totalRecoveredCount);
        }

      }, 1000/data.recoveredCases.newCase)

    },
  },
  beforeMount(){
    this.getSummary();
  }
}
</script>
<style lang="scss" scoped>
  .title{
    text-align: center;
  }
</style>
