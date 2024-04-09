<template>
  <div id="jy-tabBar">
    <!--导航栏-->
    <p class="left">
      <a href="/home"
        ><img
          src="../../../assets/img/tabbar/logo.png"
          alt="云织非遗"
          style="width: 65%; object-fit: cover"
      /></a>
    </p>
    <div class="center" id="font">
      <div v-if="isBack" class="back" @click="back">返回</div>
      <div v-if="normalTitle.length !== 0" class="normalTitle">
        <!--普通导航栏-->
        <div
          v-for="(item, index) in normalTitle"
          id="title1"
          class="normal"
          @click="page(item)"
          :key="index"
        >
          <div style="display: flex; padding: 5px">
            <!-- 图标 -->
            <img src="../../../assets/img/icon/tabbar_icon.png" alt="图标" />
            <!-- 文字 -->
            <p>{{ item.title }}</p>
          </div>

          <!-- 底部箭头 -->
          <div
            class="tabBarBottom"
            :style="{
              backgroundImage: $route.fullPath.indexOf(item.url) !== -1 ? 'url(https://s21.ax1x.com/2024/04/07/pFLCehR.png)' : 'none',
            }"
          ></div>
        </div>
        <!--“我的”有点问题-->
      </div>
      <!-- <div style="margin-left: 50px" v-if="pathTitle.length !== 0">
        <div class="pathTitle"> -->
      <!--含路径的导航栏-->
      <!-- <div
            v-for="(item, index) in pathTitle"
            :key="index"
            class="pathTitleText"
            @click="changePath(item)"
            :style="{ cursor: item.url !== '' ? 'pointer' : 'default' }"
          >
            {{ item.name }}{{ index !== pathTitle.length - 1 ? ">" : "" }}
          </div>
        </div>
        <div
          class="tabBarBottom"
          style="background-color: #c71010; border: 2px solid #c71010"
        ></div>
      </div> -->
    </div>
    <div class="right" id="font"></div>
  </div>
</template>

<script>
export default {
  name: "jyTabBar",
  props: {
    normalTitle: {
      //普通导航栏
      type: Array,
      default: () => {
        return [];
      },
    },
    pathTitle: {
      //含路径的导航栏
      type: Array,
      default: () => {
        return [];
      },
    },
    isBack: {
      type: Boolean, //是否显示返回
      default: true,
    },
  },
  methods: {
    page(item) {
      //页面跳转
      this.$router.push(item.url);
    },
    back() {
      window.history.back();
    },
    changePath(item) {
      if (item.url !== "") {
        this.$router.push(item.url);
      }
    },
  },
};
</script>

<style scoped>
/* 导入字体 */
@font-face {
  font-family: "Bimo Chunqiu";
  src: url("../../../assets/css/楷体_GB2312.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

#jy-tabBar {
  width: 100%;
  min-width: 1400px;
  height: 60px;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 10;
  background-image: url("../../../assets/img/tabbar/background.png");
}
#font {
  margin-top: 10px;
  font-family: "Bimo Chunqiu", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #fff;
  display: flex;
  justify-content: space-between;
}
#title1 div {
  margin: 0;
}
p {
  font-family: "Bimo Chunqiu", sans-serif;
}
.left {
  margin-left: 50px;
  display: flex;
  align-items: center;
  min-width: 350px;
}
.center {
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: 0.01em;
  color: #393939;
  margin-right: 100px;
}
.right {
  width: 350px;
  margin-right: 50px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
.normalTitle {
  font-family: "Bimo Chunqiu", sans-serif;
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.tabBarBottom {
  height: 10px;
  width: 80px;
  /* background-image: url("../../../assets/img/tabbar/selected.png"); */
}
.normal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  padding: 10px;
}
.pathTitle {
  display: flex;
  align-items: center;
}
.pathTitleText {
  font-family: "Bimo Chunqiu", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #393939;
}
.back {
  cursor: pointer;
}
</style>