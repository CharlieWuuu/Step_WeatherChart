<template>
  <h1>4. 繪製直條圖與折線圖</h1>
  <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Line } from "vue-chartjs";
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
  components: { Line },
  data() {
    return {
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
              stepSize: 20, // 设置 x 轴刻度之间的间距为 1
            },
          },
          right: {
            position: "right",
            suggestedMin: 0,
            suggestedMax: 40,
            ticks: {
              stepSize: 8, // 设置 x 轴刻度之间的间距为 1
            },
          },
        },
      },
    };
  },
};
</script>

<style lang="scss"></style>
