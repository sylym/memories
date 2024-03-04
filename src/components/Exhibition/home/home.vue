<template>
<!--数字展馆首页-->
  <div style="position: absolute;display: flex;flex-direction: column;align-items: center;width: 100%;min-width: 1440px">
    <jy-tab-bar :normal-title="normalTitle" :is-back="false"></jy-tab-bar>
    <div id="exhibitionHome">
      <div style="display: flex;width: 100%;justify-content: space-between">
        <img :src="path1[0].imgUrl" alt="作品总览" class="image">
        <div style="background-color: #000;display: flex;align-items: center;justify-content: center;width: 40%;cursor: pointer" class="pageTitle" @click="changePage(path1[0])">
          作 品 总 览
        </div>
      </div>
      <div style="display: flex;top: 0;width: 100%;justify-content: space-between">
        <div style="background-color: #000;display: flex;align-items: center;justify-content: center;width: 40%;cursor: pointer" class="pageTitle" @click="changePage(path2[1])">
          走 进 云 织 非 遗
        </div>
        <img :src="path2[1].imgUrl" alt="走进云织非遗" class="image">
      </div>
      <div style="height: 85px;width: 100%;min-width: 1400px;display: flex;justify-content: center;align-items: center">
        <div style="width: 490px;height:1px;background-color: #A5A5A5"></div>
      </div>
    </div>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
export default {
  name: "home",
  components: {jyTabBar},
  data() {
    return {
      path1: [
        {imgUrl: this.$store.state.imgBaseUrl+"/%E6%95%B0%E5%AD%97%E5%8D%9A%E7%89%A9%E9%A6%86%E9%A6%96%E9%A1%B5-01.png", title: "作品总览", url: "/allWorks"},
        {imgUrl: this.$store.state.imgBaseUrl+"/%E6%95%B0%E5%AD%97%E5%8D%9A%E7%89%A9%E9%A6%86%E9%A6%96%E9%A1%B5-02.png", title: "数字商城", url: "/digitalMall"}
      ],
      path2: [
        {imgUrl: this.$store.state.imgBaseUrl+"/%E6%95%B0%E5%AD%97%E5%8D%9A%E7%89%A9%E9%A6%86%E9%A6%96%E9%A1%B5-03.png", title: "公益追溯", url: "/welfare"},
        {imgUrl: this.$store.state.imgBaseUrl+"/%E6%95%B0%E5%AD%97%E5%8D%9A%E7%89%A9%E9%A6%86%E9%A6%96%E9%A1%B5-04.png", title: "走进云织非遗", url: "/enter"}
      ],
      normalTitle: [
        { title: "首页", url: "/home" },
        { title: "非遗星球", url: "/nonHeritagePlanet/nonHeritagePlanet" },
        {title: "数字展馆", url: "/exhibition/exhibitionHome"},
        {title: "创作者家园", url: "/DigitalArtwork"},
        {title: "我的", url: "/userProfile/userInfo"}
      ]
    }
  },
  methods: {
    changePage(item) {
      let url = "/exhibition" + item.url
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
div{
  margin: 0;
  padding: 0;
  font-size: 0;
}
#exhibitionHome{
  margin-top: 60px;
  width: 100%;
  min-width: 1440px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title{
  position: absolute;
  font-family: 'Songti SC',serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 45px;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  z-index: 1;
}
.image{
  width: 60%;
  height: 500px;
  object-fit: cover;
}
.pageTitle{
  font-family: 'Songti SC',sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 45px;

  letter-spacing: 0.01em;

  color: #FFFFFF;

}
</style>