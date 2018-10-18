<template>
  <div class='line-chart'>
    <div class='chart-name'>{{ word }}</div>
    <apexcharts width='1200' height='360' type='area' :options='chartOptions' :series='series'></apexcharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import axios from "axios";

export default {
  name: "LineChart",
  components: {
    apexcharts: VueApexCharts
  },
  props: ["word"],
  data: function() {
    return {
      chartOptions: {
        xaxis: {
          type: "datetime",
          categories: [
            "07/01/2014",
            "01/01/2015",
            "07/01/2015",
            "01/01/2016",
            "07/01/2016",
            "01/01/2017",
            "07/01/2017",
            "01/01/2018",
            "07/01/2018",
            "01/01/2019"
          ]
        }
      },
      series: []
    };
  },
  methods: {
    updateChart: function(word) {
      if (!word || word == "") {
        return;
      }
      axios.get("http://localhost:3000/trend/" + word).then(res => {
        let timelineData = JSON.parse(res["data"])["default"]["timelineData"];
        let values = [];
        for (let i = 0; i < timelineData.length; i++) {
          const data = timelineData[i];
          const date = new Date(data["formattedAxisTime"]);
          values[i] = {
            x:
              date.getFullYear() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getDate(),
            y: data["value"][0]
          };
        }
        let series = [
          {
            name: this.word,
            data: values
          }
        ];
        this.series = series;
      });
    }
  },
  created() {
    this.updateChart(this.word);
    this.$watch('word', word => {
      this.updateChart(word);
    });
  }
};
</script>

<style scoped>
.chart-name {
  font-size: 1.4rem;
}
</style>
