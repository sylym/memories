<template>
  <!--首页-->
  <div
    id="home"
    style="display: flex; flex-direction: column; align-items: center"
  >
    <div class="story1">
      <carouselVue></carouselVue>
    </div>

    <div class="story2">
      <div class="title2">
        <img src="../../assets/img/home/arrow_left.png" alt="" />
        <p class="title2Content">我们在做什么</p>
        <img src="../../assets/img/home/arrow_right.png" alt="" />
      </div>
      <hr
        style="
          background-color: #c9b3b4;
          border: 1.5px solid rgba(255, 255, 255, 1);
          width: 90%;
          margin: 20px auto;
        "
      />

      <div class="content2">
        <div
          v-for="(item, index) in storyContent"
          class="card"
          :key="index"
          :style="{ backgroundImage: 'url(' + item.imgUrl + ')' }"
          @mouseover="showContent(index)"
          @mouseleave="hideContent(index)"
        >
          <transition name="fade">
            <p v-if="hoverIndex === index" class="content2title">
              {{ item.content }}
            </p>
          </transition>
          <router-link
            :to="{ path: '/nonHeritagePlanet/nonHeritagePlanet' }"
            v-if="index === 2"
            style="text-decoration: none; color: inherit; cursor: pointer"
          >
            <!-- 这里是第三个 card，所以 index === 2 -->
            <p class="content2title">{{ item.title }}</p>
          </router-link>
          <p class="content2title" v-else>{{ item.title }}</p>
          <!-- 如果不是第三个 card，正常显示标题 -->
        </div>
      </div>
    </div>

    <div class="story3">
      <div class="whoWeAre">
        <div class="title3">
          <img src="../../assets/img/home/arrow_left.png" alt="" />
          <p class="teamTitle">我们是谁</p>
          <img src="../../assets/img/home/arrow_right.png" alt="" />
        </div>
        <hr
          style="
            background-color: #c9b3b4;
            border: 1.5px solid rgba(255, 255, 255, 1);
            width: 90%;
            margin: 20px auto;
          "
        />
        <p class="we1" style="margin-left: 50px">
          2021年，我们从贵州省长顺县开始了考察之路。调研小组深入挖掘当地非物质文化遗产二十余项，包括马路屯堡地戏、翁贵古法造纸、姊妹萧等已被选入贵州省非物质文化遗产名录的非遗作品；在当地体验二十余个少数民族的民俗文化和风土人情。我们看到了非遗的历史底蕴与其中的人文艺术价值，但同时我们也认识到了传统的非物质文化遗产在未来发展上的困境和壁垒。
        </p>
        <p class="we2" style="margin-left: 50px">
          因此，我们开始思考如何能利用新的技术手段，帮助非遗文化重新焕发生机。我们联合学校的区块链研究技术中心，希望通过打造非遗文化作品产业链，挖掘非遗文化中蕴含的思想观念、人文精神、审美价值、创作原则，将审美、教育、经济等价值赋予新的时代意义。
        </p>
      </div>
      <img
        src="../../assets/img/home/who_are_we.png"
        alt=""
        class="story3Img"
      />
    </div>
    <img class="story1" src="../../assets/img/home/buttom.png" alt="" />
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
import { Carousel, Slide as mySlide } from "vue-carousel";
import pagination from "./pagination.vue";
import carouselVue from "./carousel.vue";
export default {
  name: "home",
  components: {
    Carousel,
    mySlide,
    pagination,
    carouselVue,
  },
  data() {
    return {
      activeVideoIndex: 0, // 当前活动视频的索引
      videos: [
        {},
        {
          videoUrl: require("../../assets/video/1.mp4"),
        },
        {
          videoUrl: require("../../assets/video/2.mp4"),
        },
        {
          videoUrl: require("../../assets/video/3.mp4"),
        },
      ],
      hoverIndex: null,
      storyContent: [
        {
          imgUrl: require("../../assets/img/home/digital_museum.jpg"),
          title: "数字展馆",
          content:
            "用户可以欣赏海量原创非遗作品，并在数字作品商城完成选购和交易，获得对应该作品的数字凭证。",
          url: "/nonHeritagePlanet/nonHeritagePlanet",
        },
        {
          imgUrl: require("../../assets/img/home/digital_protection.jpg"),
          title: "数字版权保护",
          content:
            "我们基于区块链技术，通过上传作品-作品存证-版权注册-登记确权对非遗作品进行数字化的保护。",
        },
        {
          imgUrl: require("../../assets/img/home/nonheritage_planent.png"),
          title: "非遗星球",
          content: "非遗星球是一个致力于传承和推广中国非物质文化遗产的平台。",
        },
        {
          imgUrl: require("../../assets/img/home/promote_revitalization.png"),
          title: "助力乡村振兴",
          content:
            "收益所得全部返还给创作者，带动非遗文化继承和保护，助力乡村振兴事业的发展。",
        },
      ],
    };
  },
  methods: {
    changePage() {
      window.open("https://beian.miit.gov.cn/");
    },
    showContent(index) {
      this.hoverIndex = index;
    },
    hideContent(index) {
      this.hoverIndex = null;
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "Bimo Chunqiu";
  src: url("../../assets/css/楷体_GB2312.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

.background {
  width: 100%;
  position: absolute;
  /*background-color: #C71010;*/
}

.story1 {
  position: relative;
  width: 100%;
  background-color: #652d2f;
  /* background-image: url("../../assets/img/home/home_description.png"); */
}

.line {
  display: flex;
  align-items: center;
}

.story2 {
  display: flex;
  flex-direction: column;
  width: 100%; /* 设置story2的宽度 */
  /* height: 700px; 设置为自动高度 */
  background-color: #652d2f;
  /* margin-top: 100px; */
  position: relative;
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
  font-size: 48px;
  line-height: 106.3%;

  text-align: center;
  letter-spacing: -0.01em;

  color: #ffffff;
}

.content2 {
  display: flex;
  align-items: center;
}

.step {
  width: 35px;
  height: 35px;
  object-fit: cover;
  margin-left: 20px;
}

.card {
  width: 330px;
  height: 690px;
  background-size: cover;
  /* background: #ffffff; */
  box-shadow: 0 0 9px 2px rgba(0, 0, 0, 0.05);
  /* border-radius: 10px; */
  margin-left: 45px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  justify-content: flex-end;
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

.story3 {
  width: 100%;
  max-width: 1800px;
  min-width: 1400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #652d2f;
  /* margin-top: 10px; */
}

.title3 {
  width: 100%;
  display: flex;
  /* margin-top: 30px; */

  align-items: center;
  position: relative;
  justify-content: center;
}

.title3 img {
  margin: 0 10px; /* 调整图片之间的间距 */
  color: #fff;
}

.story3Img {
  width: 740px;
  height: 480px;
  object-fit: cover;
  margin: 50px;
  margin-left: 70px;
}

.whoWeAre {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  position: relative;
  font-family: "Bimo Chunqiu";
  margin-left: 20px; /* 你可以根据需要调整距离 */
}

.teamTitle {
  font-family: "Bimo Chunqiu", serif;
  font-style: normal;
  font-weight: 1000;
  font-size: 48px;
  line-height: 106.3%;
  text-align: center;
  letter-spacing: -0.01em;
  color: #fff;
}

.we1 {
  width: 520px;
  font-family: "Bimo Chunqiu", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 146.3%;

  letter-spacing: 0.02em;

  color: #fff;
}

.we2 {
  margin-top: 8px;
  width: 520px;
  font-family: "Bimo Chunqiu", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 146.3%;
  letter-spacing: 0.02em;
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

.bottomText {
  font-family: "Bimo Chunqiu", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.3%;
  /* or 25px */

  text-align: center;
  letter-spacing: 0.02em;

  color: #848484;
}

.tips {
  font-family: "Bimo Chunqiu", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 159.3%;
  /* identical to box height, or 32px */

  text-align: center;
  letter-spacing: 0.02em;

  color: #fff;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s; /* 过渡效果 */
}

.fade-enter,
.fade-leave-to {
  opacity: 0; /* 过渡前后透明度为0 */
}
</style>