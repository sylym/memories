<template>
  <div>
    <!-- 导航栏 -->
    <div style="position: absolute; z-index: 2; top: 0; left: 0; right: 0">
      <jy-tab-bar :normal-title="normalTitle" :is-back="false"></jy-tab-bar>
    </div>

    <div class="banner">
      <div class="swiper">
        <!-- 当前轮播图 -->
        <div class="current-swiper swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide slide1">
              <div class="title">{{ slides[0].title }}</div>
              <div class="name">{{ slides[0].name }}</div>
              <p class="detail">{{ slides[0].detail }}</p>
            </div>
            <div class="swiper-slide slide2">
              <div class="title">{{ slides[1].title }}</div>
              <div class="name">{{ slides[1].name }}</div>
              <p class="detail">{{ slides[1].detail }}</p>
            </div>
            <div class="swiper-slide slide3">
              <div class="title">{{ slides[2].title }}</div>
              <div class="name">{{ slides[2].name }}</div>
              <p class="detail">{{ slides[2].detail }}</p>
            </div>
          </div>
        </div>

        <!-- 左侧轮播图 -->
        <div class="nocurrent-swiper left-swiper swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide slide3">
              <div class="title">{{ slides[2].title }}</div>
              <div class="name">{{ slides[2].name }}</div>
              <p class="detail">{{ slides[2].detail }}</p>
            </div>
            <div class="swiper-slide slide1">
              <div class="title">{{ slides[0].title }}</div>
              <div class="name">{{ slides[0].name }}</div>
              <p class="detail">{{ slides[0].detail }}</p>
            </div>
            <div class="swiper-slide slide2">
              <div class="title">{{ slides[1].title }}</div>
              <div class="name">{{ slides[1].name }}</div>
              <p class="detail">{{ slides[1].detail }}</p>
            </div>
          </div>
        </div>

        <!-- 右侧轮播图 -->
        <div class="nocurrent-swiper right-swiper swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide slide2">
              <div class="title">{{ slides[1].title }}</div>
              <div class="name">{{ slides[1].name }}</div>
              <p class="detail">{{ slides[1].detail }}</p>
            </div>
            <div class="swiper-slide slide3">
              <div class="title">{{ slides[2].title }}</div>
              <div class="name">{{ slides[2].name }}</div>
              <p class="detail">{{ slides[2].detail }}</p>
            </div>
            <div class="swiper-slide slide1">
              <div class="title">{{ slides[0].title }}</div>
              <div class="name">{{ slides[0].name }}</div>
              <p class="detail">{{ slides[0].detail }}</p>
            </div>
          </div>
        </div>
        <div class="swiper-button-prev" @click="prevSlide"></div>
        <div class="swiper-button-next" @click="nextSlide"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "../../assets/css/swiper.min.css";
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";

export default {
  name: "nonHeritagePlanet",
  components: {
    jyTabBar,
  },
  data() {
    return {
      normalTitle: [
        { title: "首页", url: "/home" },
        { title: "非遗星球", url: "/nonHeritagePlanet/nonHeritagePlanet" },
        { title: "数字展馆", url: "/exhibition/exhibitionHome" },
        { title: "创作者家园", url: "/DigitalArtwork/Work" },
        {
          title: "我的",
          url:
            this.$cookies.get("token") === null
              ? "/userProfile/login"
              : "/userProfile/userInfo",
        },
      ],
      slides: [
        {
          title: "",
          name: "",
          detail: "2011年底成为TF家族练习生，2013年8月6日以组合形式出道。",
        },
        {
          title: "",
          name: "",
          detail:
            "2010年底成为TF家族练习生，一年后其他学员陆续退出，只有王俊凯坚持下来，TF家族因此得以存续。",
        },
        {
          title: "",
          name: "",
          detail: "2005年首登电视荧屏，开始参演各类综艺节目。",
        },
      ],
      swiper: null,
      leftSwiper: null,
      rightSwiper: null
    };
  },
  mounted() {
    // 初始化当前轮播
    this.swiper = new Swiper(".current-swiper", {
      loop: true,
    });

    // 初始化左侧轮播
    this.leftSwiper = new Swiper(".left-swiper", {
      loop: true,
      simulateTouch: false,
    });

    // 初始化右侧轮播
    this.rightSwiper = new Swiper(".right-swiper", {
      loop: true,
      simulateTouch: false,
    });

    // 控制当前轮播与左右两侧轮播的关联
    // this.swiper.controller.control = [this.leftSwiper, this.rightSwiper];
  },
  methods: {
    prevSlide() {
      this.swiper.slidePrev();
      this.leftSwiper.slidePrev();
      this.rightSwiper.slidePrev();
    },
    nextSlide() {
      this.swiper.slideNext();
      this.leftSwiper.slideNext();
      this.rightSwiper.slideNext();
    },
  },
};
</script>

<style scoped>
.banner {
  padding-top: 80px;
}
.banner .swiper {
  width: 1200px;
  margin: 0 auto;
  position: relative;
}
.current-swiper {
  width: 650px;
  height: 370px;
  border-radius: 10px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 99;
}
.left-swiper {
  position: absolute;
  left: 117px;
  top: 52px;
  z-index: 1;
}
.right-swiper {
  position: absolute;
  right: 117px;
  left: auto;
  top: 52px;
  z-index: 1;
}
.nocurrent-swiper {
  width: 479px;
  height: 273px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}
.nocurrent-swiper:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(237, 240, 240, 0.9);
  z-index: 99;
}
.slide1 {
  background: url("https://s11.ax1x.com/2024/03/02/pF00IvF.jpg") no-repeat right
    50% / auto 100% #fff;
}
.slide2 {
  background: url("https://s11.ax1x.com/2024/03/02/pF00Hb9.jpg") no-repeat right
    50% / auto 100% #e2e3e8;
}
.slide3 {
  background: url("https://s11.ax1x.com/2024/03/02/pF00Hb9.jpg") no-repeat right
    50% / auto 100% #f0faf9;
}
.title {
  padding-top: 70px;
  margin-left: 45px;
  height: 29px;
  line-height: 29px;
  font-size: 18px;
  color: #666;
}
.nocurrent-swiper .title {
  padding-top: 44px;
  margin-left: 30px;
  font-size: 16px;
  height: 25px;
  line-height: 25px;
}
.name {
  margin-left: 45px;
  height: 55px;
  display: inline-block;
  position: relative;
  line-height: 55px;
  padding-bottom: 9px;
  padding-right: 55px;
  border-bottom: 1px solid #dddddd;
  font-size: 36px;
  color: #333;
}
.nocurrent-swiper .name {
  height: 46px;
  line-height: 46px;
  font-size: 30px;
  padding-right: 46px;
  margin-left: 30px;
}
.name:before {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
  background: url("https://s21.ax1x.com/2024/03/11/pF6dhzq.png") no-repeat
    center center;
}
.nocurrent-swiper .name:before {
  width: 26px;
  height: 26px;
  background-size: 100% 100%;
}
.detail {
  margin-left: 45px;
  width: 275px;
  margin-top: 30px;
  padding-right: 5px;
  line-height: 24px;
  color: #bbb;
  font-size: 14px;
}
.nocurrent-swiper .detail {
  font-size: 12px;
  line-height: 20px;
  width: 235px;
  margin-left: 30px;
}
.swiper-button-prev {
  width: 46px;
  height: 46px;
  background: url("https://s21.ax1x.com/2024/03/11/pF6dfWn.png") no-repeat
    center center;
}
.swiper-button-next {
  width: 46px;
  height: 46px;
  background-size: auto;
  background-image: url("https://s21.ax1x.com/2024/03/11/pF6dcdg.png");
}
</style>
