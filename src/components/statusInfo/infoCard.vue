<template>
  <div :style="{width: width+'px',marginLeft: marginLeft+'px',marginTop: marginTop+'px'}" class="normal">
    <div class="cardTitle"><slot name="cardTitle"></slot></div>
    <div v-if="cardId<=number&&cardId!==1" :id="btnId" @click="judgeSpread" style="width: 35px;height: 35px;cursor: pointer;position: absolute;margin-top: -20px" :style="{marginLeft: (width-80)+'px'}">
      <img src="../../assets/img/function/spread.png" alt="展开" class="spreadImg">
    </div>
    <div :class="{'line':type!=='basic'}"></div>
    <div style="margin-left: 60px;margin-top: 15px" v-if="type==='basic'&&cardId>number"><slot name="tip"></slot></div>
    <div style="margin-left: 60px;margin-top: 15px" v-if="type==='basic'&&cardId<=number&&!isSpread"><slot name="status"></slot></div>
    <div style="margin-left: 60px;margin-top: 15px;overflow: hidden;" v-if="type==='basic'&&cardId<=number" class="infoText" :id="id" :style="{height: cardId!==1?'0':''}"><slot name="basic"></slot></div>
  </div>
</template>

<script>

export default {
  name: "infoCard",
  props: {
    width: {
      type: Number,
      default: 970
    },
    marginLeft: {
      type: Number,
      default: 120
    },
    marginTop: {
      type: Number,
      default: 10
    },
    type: {  // 是否展示的是基本信息
      type: String,
      default: "card"
    },
    cardId: {
      type: Number,
      default: 0
    },
    number: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: "card"
    },
    btnId: {
      type: String,
      default: "button"
    }
  },
  data() {
    return {
      normalTitle: [
        {title: "首页", url: "/home"},
        {title: "数字展馆", url: "/exhibition/exhibitionHome"},
        {title: "创作者家园", url: "/DigitalArtwork/Work"},
        {title: "我的", url: "/userProfile/userInfo"}
      ],
      isSpread: false
    }
  },
  methods: {
    judgeSpread () {     //判断帖子是否展开
      console.log("111")
      let btn = document.getElementById(this.btnId)
      let elem = document.getElementById(this.id)
      let height = elem.scrollHeight
      let width = elem.scrollWidth
      let time = 240     //时间
      let interval = 10  //间隔
      let speed = height / (time / interval)
      let theta = 180/(time/interval)
      if (!this.isSpread) {
        let speeds = 0  // 展开
        let rotates = 0
        let timer = setInterval(function () {
          speeds += speed
          rotates += theta
          btn.style.rotate = rotates + "deg"
          elem.style.height = speeds + 'px'
          if (parseInt(elem.style.height) >= height && rotates >= 180) {
            clearTimeout(timer)
          }
        },interval)
        this.isSpread = !this.isSpread
        return false
      }else{
        let speeds = height
        let rotates = 180
        let timer = setInterval(function () {
          speeds -= speed
          rotates -= theta
          elem.style.height = speeds + 'px'
          btn.style.rotate = rotates + "deg"
          if (speeds <= 0 && rotates <= 0) {
            clearTimeout(timer)
          }
        },interval)
        this.isSpread = !this.isSpread
        return true
      }
    }
  }
}
</script>

<style scoped>
.normal{
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 0 20px 0;
}
.cardTitle{
  font-family: 'Inter',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #326CC2;
  margin-left: 60px;
}
.line{
  width: 300px;
  height: 1px;
  background-color: #D4D4D4;
  margin-top: 10px;
  margin-left: 60px;
}
.infoText div p{
  font-family: 'Inter',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  margin-top: 10px;
}
.spreadImg{
  width: 35px;
  height: 35px;
  object-fit: cover;
  cursor: pointer;
  rotate: 180deg;
}
</style>