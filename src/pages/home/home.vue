<template>
<!--首页-->
  <div id="homePage">
    <jy-tab-bar :is-back="false" :normal-title="normalTitle"></jy-tab-bar>
    <div>
      <home></home>
    </div>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import home from "@/components/Home/home";
export default {
  name: "homePage",
  components: {
    jyTabBar,
    home
  },
  data() {
    return {
      normalTitle: [
        {title: "首页", url: "/home"},
        {title: "数字展馆", url: "/exhibition/exhibitionHome"},
        {title: "创作者家园", url: "/DigitalArtwork/Work"},
        {title: "我的", url: "/userProfile/userInfo"}
      ]
    }
  }
}
</script>

<style scoped>
body{
  background-color: #E5E5E5;
}
#homePage{
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 1400px;
}
</style>