<template>
  <div class='example'>
    <apexcharts width='1000' height='400' type='line' :options='chartOptions' :series='series'></apexcharts>
    <div>
      <input id="hoge" type="text">
      <button @click='updateChart'>Update!</button>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import axios from "axios";

export default {
  name: "LineExample",
  components: {
    apexcharts: VueApexCharts
  },
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
    updateChart() {
      const word = document.getElementById("hoge").value;
      axios.get("http://localhost:3000/trend/" + word).then(res => {
        let timelineData = JSON.parse(res["data"])["default"]["timelineData"];
        let values = [];
        for (let i = 0; i < timelineData.length; i++) {
          const data = timelineData[i];
          const date = new Date(data["formattedAxisTime"]);
          // somehow value comes in array
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
            name: word,
            data: values
          }
        ];
        this.series = series;
      });
    }
  }
};
</script>
