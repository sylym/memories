<template>
  <div>
    <div
      class="swiper-slide slide1"
      style="display: flex"
      v-for="(slide, index) in slides"
      :key="index"
    >
      <img :src="slide.imgUrl" alt="" style="height: 100%" />
      <div class="description">
        <div class="title" style="display: flex; flex-direction: column">
          <img
            src="../../assets/img/home/arrow_up.png"
            alt=""
            style="margin-bottom: 30px"
          />
          <p style="width: 10px">{{ slide.title }}</p>
          <img
            src="../../assets/img/home/arrow_down.png"
            alt=""
            style="margin-top: 30px"
          />
        </div>
        <div
          class="name"
          style="display: flex; flex-direction: column; align-items: center"
        >
          <img
            src="../../assets/img/home/arrow_up.png"
            alt=""
            style="margin-bottom: 30px"
          />
          <p style="width: 20px">{{ slide.detail }}</p>
          <img
            src="../../assets/img/home/arrow_down.png"
            alt=""
            style="margin-top: 30px; margin-right: 30px"
          />
        </div>
        <div
          class="detail"
          style="display: flex; align-items: center; justify-content: center"
        >
          <!-- 第一个路由链接 -->
          <router-link
            :to="{ path: '/nonHeritagePlanet/QuestionAndAnswer' }"
            style="text-decoration: none; color: inherit; margin-right: 100px"
          >
            <div style="width: 20px">
              <img
                src="../../assets/img/home/arrow_up.png"
                alt=""
                style="margin-bottom: 30px"
              />
              <p>云织非遗：您的AI创作工具</p>
              <img
                src="../../assets/img/home/arrow_down.png"
                alt=""
                style="margin-top: 30px"
              />
            </div>
          </router-link>

          <!-- 第二个路由链接 -->
          <router-link
            :to="{ path: '/nonHeritagePlanet/ImageCreation' }"
            style="text-decoration: none; color: inherit"
          >
            <div style="width: 20px">
              <img
                src="../../assets/img/home/arrow_up.png"
                alt=""
                style="margin-bottom: 30px"
              />
              <p>万物问答：您的非遗知识助手</p>
              <img
                src="../../assets/img/home/arrow_down.png"
                alt=""
                style="margin-top: 30px; margin-right: 30px"
              />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "../../assets/css/swiper.min.css";

export default {
  name: "monoImage",
  data() {
    return {
      slides: [
        {
          title: "枫香染",
          detail: "独特手工技艺，悠久历史传承",
          imgUrl: require("../../assets/img/nonheritage_planet/fxr.png"),
        },
        {
          title: "剪纸",
          detail: "独特手工技艺，悠久历史传承",
          imgUrl: require("../../assets/img/nonheritage_planet/jianzhi.png"),
        },
        {
          title: "皮影戏",
          detail: "独特手工技艺，悠久历史传承",
          imgUrl: require("../../assets/img/nonheritage_planet/piyingxi.png"),
        },
        {
          title: "傩戏",
          detail: "独特手工技艺，悠久历史传承",
          imgUrl: require("../../assets/img/nonheritage_planet/nuoxi.png"),
        },
        {
          title: "榫卯结构",
          detail: "独特手工技艺，悠久历史传承",
          imgUrl: require("../../assets/img/nonheritage_planet/sunmao.png"),
        },
      ],
      swiper: null,
    };
  },
  mounted() {
    // 在mounted生命周期钩子中初始化Swiper实例
    this.initSwiper();
  },
  methods: {
    initSwiper() {
      // 初始化Swiper实例
      this.swiper = new Swiper(".swiper-container", {
        // 其他Swiper配置项...
      });
    },
    getSwiperInstance() {
      return this.swiper; // 返回Swiper实例
    }
  }
};
</script>

<style>
.slide1 {
  background: no-repeat right 50% / auto 100% #fff;
  /* background-size: cover; */
}

.description {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url("../../assets/img/nonheritage_planet/fxr_backgrounnd.png");
  background-size: cover; /* 使背景图片铺满容器 */
  padding: 10px;
  width: 100%;
}

.title {
  /* padding-top: 70px; */
  font-family: "Bimo Chunqiu", sans-serif;
  margin-left: 45px;
  /* height: 29px; */
  /* line-height: 29px; */
  font-size: 36px;
  color: #fff;
  display: inline-block;
}

.name {
  font-family: "Bimo Chunqiu", sans-serif;
  margin-left: 45px;
  /* height: 55px; */
  display: inline-block;
  position: relative;
  /* line-height: 55px; */
  /* padding-bottom: 9px; */
  /* padding-right: 55px; */
  /* border-bottom: 1px solid #dddddd; */
  font-size: 16px;
  color: #fff;
}

.detail {
  font-family: "Bimo Chunqiu", sans-serif;
  margin-left: 45px;
  /* width: 275px; */
  /* margin-top: 30px; */
  padding-right: 5px;
  /* line-height: 24px; */
  color: #fff;
  font-size: 24px;
}
</style>
