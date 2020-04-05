<template>
    <div>
        <h1 class="title">Cases In {{ countryName | reformat | capitalize }}</h1>
        <Summary :overall="latestCase"/>
    </div>
</template>
<script>
import Summary from './detail/Summary';
export default {
    data(){
        return{
            activeCases:[],
            deathCases: [],
            recoveredCases: [],
            latestCase:{
                active: 0,
                death: 0,
                recovered: 0
            },
            countryName: this.$route.params.country
        }
    },
    components:{
        Summary
    },
    methods:{
        requestData(status){
            return this.axios.get(this.url + 'total/dayone/country/' + this.countryName + '/status/' + status);
        },
        getLatestCases(){
            this.latestCase.active = this.activeCases.pop().Cases;
            this.latestCase.death = this.deathCases.pop().Cases;
            this.latestCase.recovered = this.recoveredCases.pop().Cases;
        },     
        async getDetail(){
            let activeData = await this.requestData('confirmed');
            let deathData = await this.requestData('deaths');
            let recoveredData = await this.requestData('recovered');
            
            activeData.data.forEach(data =>{
                this.activeCases.push(data);
            })
            deathData.data.forEach(data =>{
                this.deathCases.push(data);
            })
            recoveredData.data.forEach(data =>{
                this.recoveredCases.push(data);
            })
            this.getLatestCases()
        }
    },
    filters:{
        reformat(str){
            return str.replace('-', ' ')
        },
        capitalize(str){
            return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
    },
    beforeMount(){
        this.getDetail()
    }
}
</script>
<style lang="scss" scoped>
.title{
    text-align: center;
}
</style>