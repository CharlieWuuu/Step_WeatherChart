<template>
  <nav>
    <router-link to="/">首頁</router-link>
    <router-link to="/Step1">1. 取得使用者經緯度</router-link>
    <router-link to="/Step2">2. 取得氣候資料</router-link>
    <router-link to="/Step3">3. 繪製直條圖</router-link>
    <router-link to="/Step4">4. 繪製直條圖與折線圖</router-link>
    <router-link to="/Step5">5. 串接資料與圖表</router-link>
    <router-link to="/Step6">6. 氣候圖印成表格</router-link>
    <router-link to="/Step7">7. 印出氣象站清單</router-link>
    <router-link to="/Step8">8. 印出氣象站清單</router-link>
  </nav>
  <div class="page">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  box-shadow: inset 0 0 1px 0 #000;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  max-height: 100vh;
  display: flex;
  nav {
    padding: 20px;
    display: flex;
    flex-direction: column;
    a {
      font-weight: bold;
      color: #2c3e50;
      text-wrap: nowrap;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  .page {
    flex-grow: 1;
    padding: 28px;
    h1 {
      margin: 0;
    }
  }
}
</style>
