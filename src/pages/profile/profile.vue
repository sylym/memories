<template>
  <el-container class="user-profile">
    <el-container>
      <router-view class="user-profile-content"></router-view>
    </el-container>
  </el-container>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";

export default {
  name: "profile",
  components: {
    jyTabBar
  },
  data() {
    return {
      normalTitle: [
        { title: "首页", url: "/home" },
        { title: "非遗星球", url: "/nonHeritagePlanet/nonHeritagePlanet" },
        { title: "数字展馆", url: "/exhibition/exhibitionHome" },
        { title: "创作者家园", url: "/DigitalArtwork/Work" },
        { title: "我的", url: "/userProfile/userInfo" }
      ],
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  height: 100%;

  .header {
    padding: 0;
    border-bottom: 1px solid #E1E1E1;
  }

  .user-profile-content {
    margin: 0 auto;
    max-width: 1700px;
    min-width: 1400px;
    width: 100%;
  }
}
</style>