<script setup>
import ModelInfo from '../../components/imageGenerator/ModelInfo.vue'
import ImageSize from '../../components/imageGenerator/ImageSize.vue'
import InputPrompt from '../../components/imageGenerator/InputPrompt.vue'
import Advanced from '../../components/imageGenerator/Advanced.vue'
</script>

<template>
  <div class="demo-collapse blink" style="margin-left:10px">
    <ModelInfo />
    <el-collapse  v-model="conllapseExpand" >
      <el-collapse-item title="绘画内容描述" name="1">
        <InputPrompt />
      </el-collapse-item>
      <!-- element-plus -->
      <el-collapse-item title="高级设置" name="2">
        <Advanced />
      </el-collapse-item>
      <el-collapse-item name="3">
        <template #title>
          选择画幅（{{ widthx }}X{{ heightx }}）
        </template>
        <ImageSize />
      </el-collapse-item>
    </el-collapse>
    <div style="height:120px"></div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      widthx: 0,
      heightx: 0,
      conllapseExpand: ['1']
    }
  },
  created() {
    this.$bus1.$on('setElCollapseShowImageSize', (data) => {
      this.widthx = data.width
      this.heightx = data.height
    });
    this.$bus1.$on('setElCollapseExpand', (data) => {
      this.conllapseExpand = ['1', '2', '3'];

    });
  },
  setup(props) {
  },
  mounted: function () {
  }, methods: {

  }
}
</script>
<style scoped>
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

html.dark {
  /* custom dark bg color */
  --el-bg-color: #626aef;
}
</style>