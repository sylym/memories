<template>
  <div>
    <div style="position: absolute; z-index: 2; top: 0; left: 0; right: 0">
      <jy-tab-bar :normal-title="normalTitle" :is-back="false"></jy-tab-bar>
    </div>

    <div class="banner">
      <Carousel3d
        :items="slides"
        :controls-visible="true"
        :controls-prev-html="`<div style='background-color: #b7474e; margin-left: 10px; height: 300px; display: flex; align-items: center; justify-content: center; margin: -100px 10px;'><img src='${require('../../assets/img/home/arrow_left.png')}' alt='' /></div>`"
        :controls-next-html="`<div style='background-color: #b7474e; margin-left: 10px; height: 300px; display: flex; align-items: center; justify-content: center; margin: -100px 10px;'><img src='${require('../../assets/img/home/arrow_right.png')}' alt='' /></div>`"
        :space="220"
        :border-radius="10"
        :border="0"
        :height="475"
        :width="800"
      >
        <Slide v-for="(slide, index) in slides" :key="index" :index="index">
          <div class="slide1" style="display: flex">
            <img :src="slide.imgUrl" alt="" style="width: 572px" />
            <div
              class="description"
              :style="{ backgroundImage: getBackgroundGradient(slide) }"
            >
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
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  width: 20px;
                "
              >
                <img
                  src="../../assets/img/home/arrow_up.png"
                  alt=""
                  style="margin-bottom: 10px"
                />
                <p style="width: 20px">{{ slide.detail }}</p>
                <img
                  src="../../assets/img/home/arrow_down.png"
                  alt=""
                  style="margin-top: 10px"
                />
              </div>
              <div
                class="detail"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <!-- 第一个路由链接 -->
                <router-link
                  :to="{ path: '/nonHeritagePlanet/QuestionAndAnswer' }"
                  style="
                    text-decoration: none;
                    color: inherit;
                    margin-right: 20px;
                  "
                >
                  <div style="width: 20px; margin-bottom: 75px">
                    <img
                      src="../../assets/img/home/arrow_up.png"
                      alt=""
                      style="margin-bottom: 15px"
                    />
                    <p>云织非遗 ：您的AI创作工具</p>
                    <img
                      src="../../assets/img/home/arrow_down.png"
                      alt=""
                      style="margin-top: 15px"
                    />
                  </div>
                </router-link>

                <!-- 第二个路由链接 -->
                <router-link
                  :to="{ path: '/nonHeritagePlanet/ImageCreation' }"
                  style="text-decoration: none; color: inherit"
                >
                  <div style="width: 20px; margin-left: 10px">
                    <img
                      src="../../assets/img/home/arrow_up.png"
                      alt=""
                      style="margin-bottom: 15px"
                    />
                    <p>万物问答 ：您的非遗知识助手</p>
                    <img
                      src="../../assets/img/home/arrow_down.png"
                      alt=""
                      style="margin-top: 15px; margin-right: 30px"
                    />
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </Slide>
      </Carousel3d>
    </div>

    <div class="story2">
      <div class="title2Content">
        <img src="../../assets/img/home/arrow_up.png" alt="" />
        <p class="">合作非遗传承人</p>
        <img src="../../assets/img/home/arrow_down.png" alt="" />
      </div>
      <carousel
        class="carousel-container"
        :autoplay="true"
        :autoplayTimeout="1000"
        :loop="true"
        :perPageCustom="[
          [0, 1],
          [768, 2],
          [1024, 3],
          [1440, 4],
        ]"
        :autoplayHoverPause="true"
        :paginationEnabled="false"
      >
        <mySlide v-for="(item, index) in storyContent" :key="index">
          <div
            class="card"
            @mouseover="showContent(index)"
            @mouseleave="hideContent(index)"
          >
            <img
              :src="item.imgUrl"
              :data-hover-src="item.hoverImgUrl"
              alt=""
              class="card-image"
              @mouseover="changeImage($event, index)"
              @mouseleave="restoreImage($event, index)"
            />
            <div class="card-content">
              <transition name="fade">
                <p v-if="hoverIndex === index" class="content2title">
                  {{ item.detail }}
                </p>
              </transition>
              <p class="content2title">{{ item.title }}</p>
            </div>
          </div>
        </mySlide>
      </carousel>
    </div>

    <div class="bottom">
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 50%;
          margin-left: 200px;
        "
      >
        <img
          src="../../assets/img/tabbar/logo.png"
          style="width: 200px; object-fit: cover"
          alt="云织非遗"
        />
        <div class="bottomText" style="margin-left: 5px">
          <p>欢迎所有非遗爱好者与我们一同见证</p>
          <p>“非遗文化数字化的新纪元”</p>
        </div>
      </div>

      <div
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50%;
        "
      >
        <div
          style="
            display: flex;

            align-items: center;
          "
          class="tips"
        >
          <div style="width: 160px; text-align: center">关于我们</div>
          <div
            style="width: 1px; height: 32px; background-color: #d4d4d4"
          ></div>
          <div style="width: 160px; text-align: center">联系我们</div>
          <div
            style="width: 1px; height: 32px; background-color: #d4d4d4"
          ></div>
          <div style="width: 160px; text-align: center">免责声明</div>
        </div>
        <p class="team">网站建设团队：北京邮电大学云织非遗团队</p>
      </div>
    </div>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import { Carousel3d, Slide } from "vue-carousel-3d";
// import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Carousel, Slide as mySlide } from "vue-carousel";
import "swiper/swiper-bundle.css";

export default {
  name: "nonHeritagePlanet",
  components: {
    jyTabBar,
    Carousel3d,
    Slide,
    Carousel,
    mySlide,
  },
  data() {
    return {
      hoverIndex: null, // 在这里定义hoverIndex属性并初始化为null
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
          title: "枫香染",
          detail: "独特手工技艺 ，悠久历史传承",
          imgUrl: require("../../assets/img/nonheritage_planet/fxr.png"),
        },
        {
          title: "剪纸",
          detail: "独特手工技艺 ，悠久历史传承",
          imgUrl: require("../../assets/img/nonheritage_planet/jianzhi.png"),
        },
        {
          title: "皮影戏",
          detail: "独特手工技艺 ，悠久历史传承",
          imgUrl: require("../../assets/img/nonheritage_planet/piyingxi.png"),
        },
        {
          title: "傩戏",
          detail: "独特手工技艺 ，悠久历史传承",
          imgUrl: require("../../assets/img/nonheritage_planet/nuoxi.png"),
        },
        {
          title: "榫卯结构",
          detail: "独特手工技艺 ，悠久历史传承",
          imgUrl: require("../../assets/img/nonheritage_planet/sunmao.png"),
        },
      ],
      storyContent: [
        {
          imgUrl: require("../../assets/img/nonheritage_planet/ccr1.png"),
          title: "",
          content: "",
          hoverImgUrl: "",
        },
        {
          imgUrl: require("../../assets/img/nonheritage_planet/ccr2.png"),
          title: "",
          content: "",
          hoverImgUrl: "",
        },
        {
          imgUrl: require("../../assets/img/nonheritage_planet/ccr3_origin.png"),
          title: "",
          content:
            "陈慧敏\n出身陶瓷世家，祖上数辈都曾从事陶瓷烧制工作,\n师从许家有、熊忠贵两位匠人，勤学苦练建盏烧制技艺",
          hoverImgUrl: require("../../assets/img/nonheritage_planet/ccr3.png"),
        },
        {
          imgUrl: require("../../assets/img/nonheritage_planet/ccr4.png"),
          title: "",
          content: "",
          hoverImgUrl: "",
        },
        {
          imgUrl: require("../../assets/img/nonheritage_planet/ccr5.png"),
          title: "",
          content: "",
          hoverImgUrl: "",
        },
      ],
      swiperOptions: {
        loop: true, // 循环轮播
        slidesPerView: 4, // 每次显示4张图片
        spaceBetween: 30, // 图片之间的间距
        autoplay: {
          delay: 3000, // 自动播放间隔时间，单位为毫秒
          disableOnInteraction: false, // 用户操作swiper后，是否禁止autoplay。默认为true：停止。
        },
        breakpoints: {
          // 响应式断点设置，根据屏幕宽度调整每次显示的图片数量
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1.5,
            spaceBetween: 5,
          },
        },
      },
    };
  },
  methods: {
    showContent(index) {
      this.hoverIndex = index;
    },
    hideContent(index) {
      this.hoverIndex = null;
    },
    getBackgroundGradient(slide) {
      if (slide.title === "剪纸") {
        return "linear-gradient(90deg, rgba(50, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 100%)";
      } else if (slide.title === "皮影戏") {
        return "linear-gradient(90deg, rgba(128, 100, 0, 1) 0%, rgba(255, 255, 255, 0) 100%)";
      } else if (slide.title === "傩戏") {
        return "linear-gradient(90deg, rgba(20, 20, 20, 1) 0%, rgba(255, 255, 255, 0) 100%)";
      } else if (slide.title === "榫卯结构") {
        return "linear-gradient(90deg, rgba(255, 240, 225, 1) 0%, rgba(255, 255, 255, 0) 100%)";
      } else {
        // 默认的背景图片渐变样式
        return "linear-gradient(90deg, rgba(1, 7, 68, 1) 0%, rgba(255, 255, 255, 0) 100%)";
      }
    },
    changeImage(event, index) {
      if (event.target.dataset.hoverSrc) {
        event.target.src = event.target.dataset.hoverSrc;
      }
    },
    restoreImage(event, index) {
      event.target.src = this.storyContent[index].imgUrl;
    },
    showContent(index) {
      this.hoverIndex = index;
    },
    hideContent() {
      this.hoverIndex = null;
    },
  },
};
</script>

<style scoped>
.banner {
  padding-top: 80px;
  background-image: url("../../assets/img/nonheritage_planet/background.png");
}

.description {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  background-image: linear-gradient(
      90deg,
      rgba(1, 7, 68, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    url("../../assets/img/nonheritage_planet/fxr_backgrounnd.png");
  background-size: cover; /* 使背景图片铺满容器 */
  padding: 10px;
  width: 100%;
  max-height: 520px;
}

.title {
  /* padding-top: 70px; */
  font-family: "Bimo Chunqiu", sans-serif;
  margin-left: 25px;
  /* height: 29px; */
  /* line-height: 29px; */
  font-size: 36px;
  color: #fff;
  display: inline-block;
}

.name {
  font-family: "Bimo Chunqiu", sans-serif;
  margin-left: 25px;
  /* height: 55px; */
  display: inline-block;
  /* position: relative; */
  /* line-height: 55px; */
  /* padding-bottom: 9px; */
  /* padding-right: 55px; */
  /* border-bottom: 1px solid #dddddd; */
  font-size: 16px;
  color: #fff;
}

.bottom {
  width: 100%;
  height: 200px;
  background: #272727;
  border-radius: 0;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1800px;
}

.tips {
  font-family: "Bimo Chunqiu", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 159.3%;
  text-align: center;
  letter-spacing: 0.02em;
  color: #fff;
}

.bottomText {
  font-family: "Bimo Chunqiu", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.3%;
  text-align: center;
  letter-spacing: 0.02em;
  color: #848484;
}

.content {
  width: 50%;
  padding: 20px;
}

.title2 {
  font-size: 24px;
  color: #fff;
}

.detail {
  font-family: "Bimo Chunqiu", sans-serif;
  margin-left: 20px;
  width: auto;
  /* margin-top: 30px; */
  /* padding-right: 5px; */
  /* line-height: 24px; */
  color: #fff;
  font-size: 20px;
}

.story2 {
  position: relative;
  width: 100%;
  height: 500px; /* 设置一个固定的高度值 */
  background-color: #652d2f;
  background-image: url("../../assets/img/nonheritage_planet/chuanchengren.png");
  background-size: cover;
  padding-top: 100px; /* 调整顶部间距 */
  display: flex;
  align-items: center; /* 垂直居中 */
}

.swiper-slide {
  width: 25%;
  height: auto;
  margin-right: 15px; /* 设置轮播项之间的间距 */
}

.swiper-slide:last-child {
  margin-right: 0; /* 最后一个轮播项无间距 */
}

.swiper-container {
  width: 100%;
  height: auto; /* 或者设置合适的高度值 */
}

.title2 {
  width: 100%;
  min-width: 1400px;
  display: flex;
  /* flex-direction: column; */
  margin-top: 30px;
  align-items: center;
  position: relative;
  justify-content: center;
}

.title2 img {
  margin: 0 10px; /* 调整图片之间的间距 */
  color: #fff;
}

.title2Content {
  font-family: "Bimo Chunqiu", serif;
  font-style: normal;
  font-weight: 900;
  font-size: 32px;
  line-height: 1.5;
  width: 42px;
  text-align: center;
  letter-spacing: -0.01em;
  margin-left: 50px;
  margin-right: 45px;
  color: #ffffff;
}

.content2 {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.swiper {
  width: 100%; /* 设置轮播图容器宽度 */
}

.content2title {
  font-family: "Bimo Chunqiu", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 137.3%;
  letter-spacing: 0.055em;
  text-transform: uppercase;
  color: #fff;
  margin-top: 10px;
}

.content2Content {
  font-family: "Bimo Chunqiu", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 145.3%;
  letter-spacing: 0.02em;
  color: #ffffff;
  margin-top: 8px;
  z-index: 10;
}

.content2content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  opacity: 0; /* 初始时透明度为0 */
  transition: opacity 0.3s; /* 添加过渡效果 */
  /* 其他样式 */
}

.card {
  width: auto;
  height: auto;
  /* background-color: #fff; */
  box-shadow: 0 0 9px 2px rgba(0, 0, 0, 0.05);
  margin-left: 45px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  background-size: cover;
}

.card-image {
  width: 100%;
  height: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s; /* 过渡效果 */
}

.fade-enter,
.fade-leave-to {
  opacity: 0; /* 过渡前后透明度为0 */
}

.team {
  font-family: "Bimo Chunqiu", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.3%;
  /* or 25px */

  text-align: center;
  letter-spacing: 0.02em;
  margin-top: 10px;
  color: #adadad;
}
</style>
