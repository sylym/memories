<template>
  <div>
    <div style="display: flex;flex-direction: column">
      <div style="display: flex" v-for="(item, index) in array">
        <div class="left">
          <img src="./../assets/img/function/unselected.png" class="icon" alt="状态" v-if="item.status===0">
          <img src="./../assets/img/function/selected.png" class="icon" alt="状态" v-if="item.status===1">
          <img src="./../assets/img/function/errorStep.png" class="icon" alt="状态" v-if="item.status===2">
          <div class="line" v-if="index !== array.length-1"></div>
        </div>
        <div style="min-width: 200px;margin-left: 20px;">
          <div class="tabTitle">{{item.title}}</div>
          <div class="tabTime">{{item.time}}</div>
          <div v-for="(content, pos) in item.content" :key="'content'+pos" class="contentInfo">
            {{content}}
          </div>
          <div style="height: 60px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "stepBar",
  props: {
    array: {
      type: Array,
      default: ()=>[]
    },
    maxWidth: {
      type: String,
      default: "200px"
    }
  },
  data(){
    return {
    }
  },
  created() {
    console.log(this.array)
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.icon{
  width: 35px;
  height: 35px;
  object-fit: cover;
}
.left{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.line{
  width: 1px;
  height: 100%;
  background-color: #D8D8D8;
}
.tabTitle{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
.tabTime{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #A7A7A7;
}
.contentInfo{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  margin-top: 25px;
  color: #5B5B5B;
}
</style>