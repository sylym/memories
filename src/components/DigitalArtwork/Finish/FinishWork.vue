<template>
  <div id="uploadWork" :style="{marginTop: marginTop}">
    <div class="completeInfo">
      <p class="completeMes"><slot></slot></p>
      <p class="backHome" @click="backHome">返回主页</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FinishWork",
  props: {
    content: {
      type: String,
      default: "作品管理"
    },
    manageUrl: {
      type: String,
      default: "/userProfile/userInfo/worksManager"
    },
    marginTop: {
      type: String,
      default: "181px"
    },
    backUrl: {
      type: String,
      default: "/DigitalArtwork/Work"
    }
  },
  methods: {
    workManage() {         // 作品管理
      if(this.manageUrl !== "") {
        this.$router.replace(this.manageUrl)
      }
    },
    backHome() {           // 返回主页
      window.history.back()
    }
  }
}
</script>

<style scoped>
#uploadWork{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  background: #F1F1F1;
}
.completeInfo{
  width: 1017px;
  height: 499px;
  margin-top: 23px;
  background: #FFFFFF;
  border-radius: 13px;
  margin-bottom: 197px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.completeMes{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  line-height: 34px;
  /* identical to box height */
  margin-top: 190px;

  color: #000000;
}
.check{
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.checkFont{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #9E9E9E;
}
.myWork{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #326CC2;
  cursor: pointer;
}
.backHome{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #326CC2;

  margin-top: 200px;
  cursor: pointer;
}
</style>