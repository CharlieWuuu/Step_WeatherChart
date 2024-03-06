<template>
  <div class="Map">
    <h1>2. 取得氣候資料</h1>
    <h2>板橋</h2>
    <table>
      <thead>
        <tr>
          <th>月份</th>
          <th v-for="i in 12">{{ i }} 月</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>平均溫度</td>
          <td v-for="(temperature, index) in Temperatures" :key="index">
            {{ temperature.Mean }}
          </td>
        </tr>
        <tr>
          <td>平均降水</td>
          <td v-for="(Precipitation, index) in Precipitations" :key="index">
            {{ Precipitation.Accumulation }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Temperatures: [],
    };
  },
  mounted() {
    this.getClimate();
  },
  methods: {
    getClimate() {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `https://opendata.cwa.gov.tw/api/v1/rest/datastore/C-B0027-001?Authorization=CWB-C67AAE13-37AA-4F9D-892F-E25483690887`
      );
      xhr.responseType = "json";
      const vm = this;
      xhr.onload = function () {
        if (xhr.status === 200) {
          let banqiao = xhr.response.records.data.surfaceObs.location[0];
          console.log(banqiao);
          vm.Temperatures = banqiao.stationObsStatistics.AirTemperature.monthly;
          vm.Precipitations =
            banqiao.stationObsStatistics.Precipitation.monthly;
        } else {
          console.error("Request failed with status:", xhr.status);
        }
      };
      xhr.onerror = function () {
        console.error("Request failed");
      };
      xhr.send();
    },
  },
};
</script>
