<template>
    <b-row class="total-summary">
        <b-col class="summary" v-for="(value, title) in overall" :key="title" col sm="12" md="4">
        <b-card 
            header-tag="header"
            :header="title | formatCamelCase | capitalize"
            :header-bg-variant="checkTitle(title)"
            :header-text-variant="value.color != 'warning' ? 'white' : ''"
            >
            <b-card-title>
                {{ value }}
            </b-card-title>
        </b-card>
        </b-col>
    </b-row>
</template>
<script>
export default {
   props:['overall'],
   methods:{
       checkTitle(title){
           return title == 'active' ? 'warning' : title == 'death' ? 'danger' : 'success'
       }
   },
   filters:{
    capitalize(str){
      return str.charAt(0).toUpperCase() + str.substring(1);
    },
    formatCamelCase(str){
      return str.replace(/([A-Z])/g, ' $1').trim();
    }
  },
  
}
</script>
<style lang="scss" scoped>
.total-summary{
    .summary{
        margin-bottom: 5px;
        .summary-value{
            font-size: 40px;
        }
        .summary-title{
            font-size: 20px;
        }
    }
}

</style>