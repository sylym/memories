<template>
  <div>
    <div class="carousel-container">
      <div class="carousel">
        <div
          v-for="(item, index) in carouselItems"
          v-if="currentIndex === index"
          :key="index"
          :class="{ active: currentIndex === index }"
          class="carousel-item"
        >
          <img
            v-if="index === 0"
            src="../../assets/img/home/home_description.png"
            class="carousel-image"
          />
          <video v-else loop muted class="video">
            <source :src="item.url" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
    <div class="pagination">
      <img
        v-for="(item, index) in carouselItems"
        :key="index"
        :src="index === currentIndex ? selected_pagination : normal_pagination"
        @click="changeSlide(index)"
        class="page"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "carousel",
  data() {
    return {
      currentIndex: 0,
      carouselItems: [
        {
          type: "image",
          url: require("../../assets/img/home/home_description.png"),
        },
        { type: "video", url: require("../../assets/video/1.mp4") },
        { type: "video", url: require("../../assets/video/2.mp4") },
        { type: "video", url: require("../../assets/video/3.mp4") },
      ],
      normal_pagination: require("../../assets/img/home/p2.png"),
      selected_pagination: require("../../assets/img/home/p1.png"),
      autoplayInterval: null,
    };
  },
  mounted() {
    this.startAutoplay();
  },
  beforeDestroy() {
    this.stopAutoplay();
  },
  methods: {
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 30000);
    },
    stopAutoplay() {
      clearInterval(this.autoplayInterval);
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
    },
    changeSlide(index) {
      // 停止当前正在播放的视频
      const currentVideo = document.querySelector(
        ".carousel-item.active video"
      );
      if (currentVideo) {
        currentVideo.pause();
        currentVideo.currentTime = 0; // 将视频播放时间重置为0，以便下次播放时从头开始
      }

      // 切换到新的轮播项
      this.currentIndex = index;
      this.stopAutoplay(); // 停止自动播放

      // 延迟一段时间后播放新的轮播项视频
      setTimeout(() => {
        const newVideo = document.querySelector(".carousel-item.active video");
        if (newVideo) {
          newVideo.play();
        }
      }, 100); // 延迟100毫秒播放视频
    },
  },
};
</script>

<style scoped>
.carousel-container {
  /* position: relative; */
  width: 100%;
  height: 890px;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video,
.carousel-image {
  width: 100%; /* 图片和视频宽度等于轮播图容器的宽度 */
}

.active {
  opacity: 1;
}

.pagination {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  margin-top: 20px; /* 修改此处的间距 */
}

.page {
  width: 20px;
  height: 20px;
  margin: 0 5px;
  cursor: pointer;
}
</style>
