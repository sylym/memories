<template>
  <div>
    <JyTabBar></JyTabBar>
    <div class="wrapper">
      <video class="container" autoplay muted loop playsinline>
        <source src="../../assets/intro.mp4" type="video/mp4">
        您的浏览器不支持视频标签。
      </video>
    </div>
  </div>
</template>

<script>
import JyTabBar from "../tabbar/jyTabbar/jyTabBar.vue";
export default {
  name: "knowProgram",
  components: {
    JyTabBar,
  },
};
</script>

<style scoped>
.wrapper {
  height: 100vh; /* 设置父级容器高度为视窗高度 */
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  padding: 50px; /* 添加内边距 */
  box-sizing: border-box; /* 让内边距计入尺寸 */
  position: relative;
}

.container {
  /* flex: 1; 让 .container 填充剩余空间 */
  display: flex; /* 将 .container 设置为 Flexbox 布局 */
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  background-size: cover;
  background-position: center;
  /* padding: 150px; 添加内边距 */
  border-radius: 10px; /* 添加圆角 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

</style>