<template>
  <div class="pagination">
    <span
      v-for="(slide, index) in totalSlides"
      :key="index"
      @click="changeSlide(index)"
      :class="{ active: currentPage === index }"
    ></span>
  </div>
</template>

<script>
export default {
  name: "pagination",
  props: {
    totalSlides: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changeSlide(index) {
      // 当点击分页时，触发父组件的方法来切换轮播图
      this.$emit("change-slide", index);
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination span {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #ccc;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 50%;
}

.pagination span.active {
  background-color: #333;
}
</style>
