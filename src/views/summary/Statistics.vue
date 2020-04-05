<template>
    <div>
        <b-row class="input">
            <b-col col lg="3" md="6" sm="8">
                <b-form-input v-model="search" placeholder="Search"/>
            </b-col>
        </b-row>
        <b-table responsive hover :fields="header" :items="summary" :filter="search" :per-page="dataPerPage" :current-page="currentPage" @filtered="onFiltered">
            <template v-slot:cell(actions)="row">
                <b-button @click="getDetails(row.item)">
                    {{ row.item.actions.text }}
                </b-button>
            </template>
        </b-table>
        <div  v-for="legend in legends" :key="legend.description" class="legend">
            <div>
                <div class="boxes" :class="'bg-' + legend.color"></div>  {{ legend.description }}
            </div>
        </div>
        <b-pagination  v-model="currentPage  " :total-rows="totalRows" :per-page="dataPerPage"/>
         Page: {{ currentPage }} of {{ totalPage }}
    </div>
</template>
<script>
export default {
    props:['summary', 'header'],
    data(){
        return{
            legends:[
                {
                    description: 'Indicates that there are no new cases and all active cases have recovered',
                    color: 'success'
                },
                {
                    description: 'Indicates that there are new active cases',
                    color: 'warning'
                },
                {
                    description: 'Indicates that there are new deaths cases',
                    color: 'danger'
                },
                {
                    description: 'Indicates that there are new recovered cases',
                    color: 'info'
                },
            ],
            filteredList: [],
            search: '',
            currentPage: 1,
            dataPerPage: 10,
        }
    },
    methods:{
        onFiltered(event){
             this.filteredList = event;
        },
        getDetails(item){
            this.$router.push('/details/' + item.Slug); 
        }
    },
    computed:{
    totalRows(){
      return this.filteredList.length ? this.filteredList.length : this.summary.length;
    },
    totalPage(){
      return Math.ceil(this.totalRows / this.dataPerPage);
    }
  },
}
</script>
<style lang="scss" scoped>
.input{
    margin-bottom: 10px;
}
.legend{
    display: inline-block;
    margin-right: 20px;
}
.boxes{
    border: 1px solid black;
    width: 30px;
    height: 30px;
  }
</style>