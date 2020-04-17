<template>
  <div>
    <h2>Daily New Cases</h2>
    <b-row>
      <b-col md>
        <Confirmed :detail="detail.confirmedCases" />
      </b-col>
      <b-col md>
        <Death :detail="detail.deathCases" />
      </b-col>
    </b-row>
    <b-row>
      <b-col md>
        <Recovered :detail="detail.recoveredCases" />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Confirmed from "./charts/daily/Confirmed";
import Death from "./charts/daily/Death";
import Recovered from "./charts/daily/Recovered";

export default {
  props: ["detail"],
  components: {
    Confirmed,
    Death,
    Recovered
  }
};
</script>