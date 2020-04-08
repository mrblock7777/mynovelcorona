<template>
    <div>
        <Map v-if="summary.length" :summary="summary"/>
    </div>
</template>
<script>
import Map from './charts/Map';
export default {
    data(){
        return{
            summary: []
        }
    },
    components:{
        Map
    },
    methods:{
        async getSummary(){
            this.summary = [];
            let doc = await this.axios.get(this.url + 'summary');
            doc.data.Countries.forEach(data =>{
                this.summary.push(data);
            })
        }
    },
    beforeMount(){
        this.getSummary()
    }
}
</script>