<template>
  <div>
    <JyTabBar></JyTabBar>
    <div class="wrapper">
      <div class="container">
        <div v-for="(str, index) in strs" class="description" :key="index">
          {{ str }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JyTabBar from "../tabbar/jyTabbar/jyTabBar.vue";
export default {
  name: "knowProgram",
  data() {
    return {
      strs: [
        " “纪艺”团队致力于解决非物质文化遗产（非遗）保护与传承的挑战，开发出一款集AIGC工具创作和区块链确权登记于一体的数字平台。该平台旨在通过与各地政府合作，深入非遗传承人家乡，采集到数十种IP故事和非遗技艺，构建了一个特殊的非遗IP知识库，以数字化的方式助力非遗文化的传播与传承。团队还创新性地利用AIGC技术，根据用户提供的文字描述，精准构建出具有非遗特色的，符合用户想象的数字文化藏品，进而利用区块链技术为这些作品确权，确保其原创性和所有权。合作的政府机构将联系相关非遗传承人，将这些数字化藏品转化为实际的文创商品，如花切牌、礼品袋和书签等，文创产品的销售所得利润将以公益的形式全额反哺给非遗传承人和政府，既保护了非遗，也促进了当地文化的发展。",
        ' 纪艺平台作为创作者和非遗传承人之间的桥梁，提供作品展览宣传、版权辅助交易和实物定制渠道等服务，鼓励全民参与到智能化的非遗数字作品创作中来，从而激发数字化传承非遗的新浪潮。"纪艺，激发您的创意火花；科技，让文化传承触手可及"。纪艺平台通过创新的方式，不仅加深了公众对非遗文化的认知与参与，还为非遗的持续发展注入了新的活力，展现了现代科学技术与传统文化传承相结合的巨大潜力。',
      ],
      normalTitle: [
        { title: "首页", url: "/home" },
        { title: "非遗星球", url: "/nonHeritagePlanet/nonHeritagePlanet" },
        { title: "数字展馆", url: "/exhibition/exhibitionHome" },
        { title: "创作者家园", url: "/DigitalArtwork/Work" },
        { title: "我的", url: "/userProfile/userInfo" },
      ],
    };
  },
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
}

.container {
  flex: 1; /* 让 .container 填充剩余空间 */
  display: flex; /* 将 .container 设置为 Flexbox 布局 */
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  background-image: url("https://img2.baidu.com/it/u=1639383325,2675348140&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=753");
  background-size: cover;
  background-position: center;
  padding: 150px; /* 添加内边距 */
  border-radius: 10px; /* 添加圆角 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.description {
  color: white;
  font-size: 20px;
  line-height: 1.5; /* 设置行高 */
  text-align: justify; /* 文字两端对齐 */
  margin-bottom: 20px; /* 添加底部外边距 */
  text-indent: 2em;
}
</style>