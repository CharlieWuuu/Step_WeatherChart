<template>
  <h1>5. 串接資料與圖表</h1>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  <p>串資料失敗，也許可參考<a href="https://vue-chartjs.org/guide/#chart-with-api-data">這篇文件</a></p>
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
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
import { ref } from "vue"; // 引入 ref

export default {
  name: "BarChart",
  components: { Bar },
  setup() {
    const chartData = ref({
      labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      datasets: [
        {
          label: "降水量",
          backgroundColor: "#46A3FF",
          data: Array.from({ length: 12 }, () => 0),
        },
      ],
    });
    const chartOptions = {
      responsive: true,
    };

    const getClimateData = () => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://opendata.cwa.gov.tw/api/v1/rest/datastore/C-B0027-001?Authorization=CWB-C67AAE13-37AA-4F9D-892F-E25483690887`
      );
      xhr.responseType = "json";

      xhr.onload = function () {
        if (xhr.status === 200) {
          let banqiao = xhr.response.records.data.surfaceObs.location[0];

          let Precipitation_Arr = [];
          banqiao.stationObsStatistics.Precipitation.monthly.forEach(
            (element) =>
              Precipitation_Arr.push(parseFloat(element.Accumulation))
          );

          chartData.value.datasets[0].data = Precipitation_Arr; // 更新資料
          console.log(chartData);
        } else {
          console.error("Request failed with status:", xhr.status);
        }
      };
      xhr.onerror = function () {
        console.error("Request failed");
      };
      xhr.send();
    };

    getClimateData(); // 取得資料

    return {
      chartData,
      chartOptions,
    };
  },
};
</script>

<style lang="scss"></style>
