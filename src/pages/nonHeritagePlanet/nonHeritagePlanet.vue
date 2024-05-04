<template>
  <div>
    <!-- 导航栏 -->
    <div style="position: absolute; z-index: 2; top: 0; left: 0; right: 0">
      <jy-tab-bar :normal-title="normalTitle" :is-back="false"></jy-tab-bar>
    </div>

    <div class="carousel-container">
      <!-- 轮播图 -->
      <transition name="fade">
        <div class="carousel-row">
          <Carousel
            v-for="n in 5"
            :key="n"
            :images="carouselImages"
            :current-index="(currentIndex + n - 1) % 5"
            :style="{ transform: `scale(${computeScale(n - 1)})` }"
          ></Carousel>
        </div>
      </transition>

      <button class="prev-button" @click="prevSlide">⟨</button>
      <button class="next-button" @click="nextSlide">⟩</button>
    </div>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import Carousel from "./Carousel.vue";

export default {
  name: "nonHeritagePlanet",
  components: {
    jyTabBar,
    Carousel,
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
      carouselImages: [
        {
          src: "https://s21.ax1x.com/2024/03/14/pFcvCcQ.png",
          link: "/nonHeritagePlanet/imageCreation",
          description: "剪纸",
        },
        {
          src: "https://s21.ax1x.com/2024/03/14/pFcv91g.png",
          link: "/nonHeritagePlanet/imageCreation",
          description: "皮影戏",
        },
        {
          src: "https://s21.ax1x.com/2024/03/14/pFcjxtf.png",
          link: "/nonHeritagePlanet/imageCreation",
          description: "枫香染",
        },
        {
          src: "https://s21.ax1x.com/2024/03/14/pFcjzh8.png",
          link: "/nonHeritagePlanet/QuestionAndAnswer",
          description: "傩戏",
        },
        {
          src: "https://s21.ax1x.com/2024/03/14/pFcvp9S.png",
          link: "/nonHeritagePlanet/QuestionAndAnswer",
          description: "榫卯",
        },
        // 添加更多轮播图项
      ],
      currentIndex: 0,
    };
  },
  methods: {
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.carouselImages.length) %
        this.carouselImages.length;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    },
    computeScale(index) {
      const totalCarousels = 5; // 假设总共有5个Carousel组件
      const middleIndex = Math.floor(totalCarousels / 2);
      const distanceFromMiddle = Math.abs(
        index - (middleIndex % totalCarousels)
      );

      if (distanceFromMiddle === 0) {
        return 1; // 中间的Carousel最大
      } else if (distanceFromMiddle === 1) {
        return 0.8; // 紧邻中间的稍小一些
      } else {
        return 0.6; // 更远的则更小
      }
    },
  },
};
</script>

<style scoped>

.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #581526;
  /* 添加背景颜色，根据实际需求调整 */
  margin-top: 75px;
  /* 与顶部的距离，根据实际需求调整 */
  text-align: center;
  display: flex;
  align-items: center;
  /* 垂直居中图片 */
  justify-content: center;
  /* 水平居中图片 */
}

.carousel-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
  max-height: 80vh;
  width: auto;
}

.carousel-slide {
  flex: 0 0 100%;
}

.carousel-row {
  display: flex;
  justify-content: space-between;
}

.prev-button,
.next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 32px;
  /* 调整箭头的大小 */
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  /* 调整箭头的颜色 */
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}

.image-description {
  color: #fff;
  /* 调整说明文字颜色 */
  font-size: 28px;
  /* 调整说明文字大小 */
  /* margin-top: 20px; */
  /* 调整说明文字与图片的距离 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
