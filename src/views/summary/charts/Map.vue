<template>
  <div>
    <Confirmed v-if="filteredData.length" :data="filteredData" />
    <Recovered v-if="filteredData.length" :data="filteredData"/>
  </div>
</template>
<script>
import Confirmed from "./map/Confirmed";
import Recovered from './map/Recovered';
import countryList from "../../../countrylist.json";
export default {
  props: ["summary"],
  data() {
    return {
      filteredData: []
    };
  },
  components: {
    Confirmed,
    Recovered
  },
  methods: {
    processData() {
      let processedData = this.summary.map(item => {
        countryList.forEach(country => {
          if (item.CountryCode == country.short_label) {
            let formattedId =
              country.id < 10 ? "0" + country.id : country.id.toString();

            item.id = formattedId;
          }
        });
        return item;
      });

      this.filteredData = processedData.filter(item =>
        item.hasOwnProperty("id")
      );
    }
  },
  mounted() {
    this.processData();
  }
};
</script>