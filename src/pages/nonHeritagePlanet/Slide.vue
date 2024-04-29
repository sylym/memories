<template>
  <div class="slide">
    <slot></slot> <!-- 使用slot插槽来允许内容的插入 -->
  </div>
</template>

<script>
  export default {
    name: 'Slide',
    props: {
      index: {
        type: Number,
        required: true
      }
    },
    mounted() {
      // 可以在这里做一些与轮播图相关的初始化工作
      this.$parent.registerSlide(this); // 假设Carousel组件有一个注册幻灯片的方法
    },
    beforeDestroy() {
      // 清理工作
      this.$parent.unregisterSlide(this); // 假设Carousel组件有一个注销幻灯片的方法
    }
  }
</script>

<style scoped>
.slide {
  /* 根据需要添加样式 */
}
</style>
