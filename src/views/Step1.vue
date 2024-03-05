<template>
  <div class="WeatherTable">
    <h1>1. 取得使用者經緯度</h1>
    <p>經度：{{ lon }}、緯度：{{ lat }}</p>
    <p>地號：{{ location }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: this.location, // 初始化位置數據
    };
  },
  mounted() {
    // 在組件掛載後調用方法，獲取數據
    this.getLocation();
  },
  methods: {
    // 取得瀏覽器經緯度
    getLocation() {
      let lat = 24.9;
      let lon = 121.5;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.lat = pos.coords.latitude;
          this.lon = pos.coords.longitude;
          this.getLocation_ZH(this.lat, this.lon);
        });
      } else {
        this.getLocation_ZH(lat, lon);
      }
    },

    // 取得中文地址
    getLocation_ZH(lat, lon) {
      const xhr = new XMLHttpRequest();
      const self = this;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            // 處理 XML 數據
            self.parseXML(xhr.responseText);
          } else {
            console.error("Error fetching location data:", xhr.statusText);
          }
        }
      };

      xhr.open(
        "GET",
        `https://api.nlsc.gov.tw/other/TownVillagePointQuery/${lon}/${lat}`
      );

      xhr.send();
    },

    // 編譯 xml
    parseXML(xmlString) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");

      // 提取需要的數據
      const ctyName = xmlDoc.getElementsByTagName("ctyName")[0].textContent;
      const townName = xmlDoc.getElementsByTagName("townName")[0].textContent;
      const sectName = xmlDoc.getElementsByTagName("sectName")[0].textContent;
      const villageName =
        xmlDoc.getElementsByTagName("villageName")[0].textContent;

      // 更新位置數據
      this.location = `${ctyName} ${townName} ${sectName} ${villageName}`;
    },
  },
};
</script>
