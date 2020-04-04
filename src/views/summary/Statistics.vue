<template>
    <div>
        <b-row class="input">
            <b-col col lg="3" md="6" sm="8">
                <b-form-input v-model="search" placeholder="Search"/>
            </b-col>
        </b-row>
        <b-table responsive hover :fields="header" :items="summary" :filter="search" :per-page="dataPerPage" :current-page="currentPage" @filtered="onFiltered"></b-table>
        <b-pagination  v-model="currentPage  " :total-rows="totalRows" :per-page="dataPerPage"/>
         Page: {{ currentPage }} of {{ totalPage }}
    </div>
</template>
<script>
export default {
    props:['summary', 'header'],
    data(){
        return{
            filteredList: [],
            search: '',
            currentPage: 1,
            dataPerPage: 10,
        }
    },
    methods:{
        onFiltered(event){
             this.filteredList = event;
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
</style>