<template>
  <div class="carousel-container">
    <div class="carousel-wrapper">
      <div
        class="carousel-slide"
        v-for="(image, index) in images"
        :key="index"
        v-show="currentIndex === index"
        @click="navigateTo(image.link)"
      >
        <img :src="image.src" :alt="image.description" class="carousel-image" />
        <div class="image-description">{{ image.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 接受来自父组件的images
  props: {
    images: Array,
    currentIndex: Number,
  },
  methods: {
    navigateTo(link) {
      if (!link) return;
      // Assuming the `link` is a valid object for Vue Router
      this.$router.push(link);
    },
  },
};
</script>


<style scoped>
.carousel-container {
  overflow: hidden;
  position: relative;
}

.carousel-slide {
  display: flex;
  flex-direction: column; /* 使内容垂直排列 */
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  min-width: 100%;
}

.carousel-image {
  /* width: 50%; */
  /* 设置图片的最大高度，根据实际需求调整 */
  max-height: 80vh;
  width: auto;
  /* height: auto; */
}

img {
  width: 100%;
  display: block;
}

.image-description {
  text-align: center; /* 如果你希望描述文字居中 */
  margin-top: 48px; /* 在图片和描述文字之间添加一些间隙 */
  font-size: 28px;
  color: white;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 100;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}
</style>
