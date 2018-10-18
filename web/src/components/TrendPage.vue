<template>
<div class="trend-page">
  <line-chart :word="word"></line-chart>
  <input id="target-word" type="text">
  <button @click='updateChart'>Update!</button>
</div>
</template>

<script>
import LineChart from './LineChart'
export default {
  name: 'TrendsPage',
  components: {
    LineChart
  },
  data () {
    return {
      word: ""
    }
  },
  methods: {
    updateChart: function () {
      this.word = document.getElementById("target-word").value;
    }
  }
}
</script>
