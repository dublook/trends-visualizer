<template>
<div class="trends-page">
  <textarea id='target-words' />
  <button @click='updateCharts'>Update!</button>
  <ul>
    <li v-for="word in words" :key="word">
      <line-chart :word="word"></line-chart>
    </li>
  </ul>
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
      words: []
    }
  },
  methods: {
    updateCharts: function() {
      const rawCsv = document.getElementById("target-words").value;
      const rows = rawCsv.split("\n");
      const words = [];
      for (let i = 1; i < rows.length && i < 50; i++ ){
          const row = rows[i];
          words[i-1] = row.split(",")[0];
      }
      this.words = words;
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
textarea {
    width: 320px;
    height: 80px;
}
</style>