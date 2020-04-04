<template>
    <b-row class="total-summary">
        <b-col class="summary" v-for="(value, title) in overall" :key="title" col sm="12" md="4">
        <b-card>
            <b-card-header
            header-tag="header"
            :header-bg-variant="value.color"
            :header-text-variant="value.color != 'warning' ? 'white' : ''"
            >
            <p class="summary-title">{{ title | formatCamelCase | capitalize }}</p>
            </b-card-header>
            <b-card-text>
            <p class="summary-value">
                {{ value.totalCase }}<br/>
                New Cases: {{ value.newCase }}
            </p>
            </b-card-text>
        </b-card>
        </b-col>
    </b-row>
</template>
<script>
export default {
   props:['overall'],
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