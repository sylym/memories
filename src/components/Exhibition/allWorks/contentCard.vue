<template>
  <div class="card">
    <img :src="imageUrl" alt="Card image" />
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    imageUrl: String,
    title: String,
    description: String,
  },
};
</script>

<style scoped>
.card {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 10px;
}

.card-title {
  font-size: 18px;
  margin-bottom: 10px;
}

.card-text {
  font-size: 14px;
}
</style>
