<template>
  <div>
    <b-row>
      <b-col>
        <Cases :detail="detail" />
      </b-col>
      <b-col>
        <Realtime :detail="detail.activeCases" />
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Cases from "./charts/chronology/Cases";
import Realtime from "./charts/chronology/Realtime";
export default {
  props: ["detail"],
  components: {
    Cases,
    Realtime
  }
};
</script>