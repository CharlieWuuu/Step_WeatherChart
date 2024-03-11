<template>
  <h1>5. 串接資料與圖表</h1>
  <p v-if="loaded">{{ Stations.Name }}</p>
  <Bar
    v-if="loaded"
    id="my-chart-id"
    :data="chartData"
    :options="chartOptions"
  />
  <p>
    串資料失敗，也許可參考<a
      href="https://vue-chartjs.org/guide/#chart-with-api-data"
      >這篇文件</a
    >
  </p>
</template>

<script>
import { Bar } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
  LineElement
);

export default {
  name: "BarChart",
  components: { Bar },
  data: () => ({
    loaded: false,
    Stations: { Name: "" },
    chartData: {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
          type: "bar",
          label: "降水量",
          backgroundColor: "#46A3FF",
          data: [40, 20, 78, 60, 128, 170, 153, 112, 80, 72, 63, 12],
          order: 2,
          yAxisID: "left",
        },
        {
          type: "line",
          label: "氣溫",
          backgroundColor: "#FF5151",
          borderColor: "#FF5151",
          data: [20, 26, 28, 30, 34, 35, 36, 34, 28, 25, 23, 21],
          order: 1,
          yAxisID: "right",
        },
      ],
    },
    chartOptions: {
      responsive: true,
      scales: {
        left: {
          position: "left",
          suggestedMin: 0,
          suggestedMax: 200,
          ticks: {
            stepSize: 20,
          },
        },
        right: {
          position: "right",
          suggestedMin: 0,
          suggestedMax: 40,
          ticks: {
            stepSize: 8,
          },
        },
      },
    },
  }),
  async mounted() {
    try {
      await this.getClimateData(0);
      this.loaded = true; // 在數據加載後設置為true
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    async getClimateData(i) {
      const response = await fetch(
        "https://opendata.cwa.gov.tw/api/v1/rest/datastore/C-B0027-001?Authorization=CWB-C67AAE13-37AA-4F9D-892F-E25483690887"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      const targetData = data.records.data.surfaceObs.location[i];

      const station = targetData.station;
      const stationObsStatistics = targetData.stationObsStatistics;

      const stationsName = station.StationName;
      const Precipitation_Arr = stationObsStatistics.Precipitation.monthly.map(
        (element) => parseFloat(element.Accumulation)
      );
      console.log(stationObsStatistics.AirTemperature.monthly);
      const AirTemperature_Arr =
        stationObsStatistics.AirTemperature.monthly.map((element) =>
          parseFloat(element.Mean)
        );

      this.chartData.datasets[0].data = Precipitation_Arr;

      this.chartData.datasets[1].data = AirTemperature_Arr;
      this.Stations.Name = stationsName;
    },
  },
};
</script>
