<template>
<!--首页-->
  <div id="home" style="display: flex;flex-direction: column;align-items: center">
    <div class="background">
      <div style="display: flex;flex-direction: row-reverse;width: 100%;min-width: 1400px;max-width:1800px">
        <img :src="$store.state.imgBaseUrl+'/%E9%A6%96%E9%A1%B5-03.png'" class="storyImg" alt="storyImg">
      </div>
    </div>
    <div class="story1">
      <img :src="$store.state.imgBaseUrl+'/home_new1.png'" class="story1Img" alt="story1Img">
      <p class="projectName" style="margin-top: 20px;">非遗数字作品创益馆</p>
      <div class="line">
        <div class="line1"></div>
        <div class="line2"></div>
      </div>
      <div class="content1">
        “博文链”是对非物质文化遗产的记录更是对民族记忆的保护。“创益”不仅代表平台上多种多样的创益数字艺术品，更代表着平台对非遗传承的公益服务以及为我们为非遗传承创造丰厚价值的信心。
      </div>
    </div>
    <div class="story2">
      <img :src="$store.state.imgBaseUrl+'/%E9%A6%96%E9%A1%B5%E8%83%8C%E6%99%AF.png'" class="story2Img" alt="story2Img">
      <div style="display: flex;flex-direction: column;width: 1300px;position: absolute">
        <div class="title2">
          <p class="title2Content">我们在做什么？</p>
          <div style="width: 159px;height: 0;border: 7px solid #C71010;background-color: #C71010;margin-left: -55px;margin-top: 25px"></div>
        </div>
        <div class="content2">
          <div style="display: flex">
            <img :src="$store.state.imgBaseUrl+'/%E4%B8%8D%E5%8F%AF%E5%90%8E%E9%80%80.png'" alt="back" class="step">
            <img :src="$store.state.imgBaseUrl+'/%E4%B8%8D%E5%8F%AF%E5%89%8D%E8%BF%9B.png'" alt="enter" class="step">
          </div>
          <div v-for="(item, index) in storyContent" class="card">
            <div  class="weDoIcon" :style="{backgroundColor: index%2===0 ? '#C71010' : '#143094'}">
              <img :src="item.imgUrl" style="width: 30px;height: 30px;object-fit: cover" :alt="index + 'content2'">
            </div>
            <p class="content2title">{{item.title}}</p>
            <p class="content2Content">{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="story3">
      <img :src="$store.state.imgBaseUrl+'/ji4bse.png'" class="story3Img" alt="story3Img">
      <div class="whoWeAre">
        <p class="teamTitle">我们是谁?</p>
        <div style="width: 126px;height: 0;border: 7px solid #143094;background-color: #143094;margin-top: 25px"></div>
        <p class="we1" style="margin-top: 50px">2021年，我们从贵州省长顺县开始了考察之路。调研小组深入挖掘当地非物质文化遗产二十余项，包括马路屯堡地戏、翁贵古法造纸、姊妹萧等已被选入贵州省非物质文化遗产名录的非遗作品；在当地体验二十余个少数民族的民俗文化和风土人情。我们看到了非遗的历史底蕴与其中的人文艺术价值，但同时我们也认识到了传统的非物质文化遗产在未来发展上的困境和壁垒。</p>
        <p class="we2">因此，我们开始思考如何能利用新的技术手段，帮助非遗文化重新焕发生机。我们联合学校的区块链研究技术中心，希望通过打造非遗文化作品产业链，挖掘非遗文化中蕴含的思想观念、人文精神、审美价值、创作原则，将审美、教育、经济等价值赋予新的时代意义。</p>
      </div>
    </div>
    <div class="bottom">
      <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 50%">
        <img :src="$store.state.imgBaseUrl+'/home_new1.png'" style="width: 220px;object-fit: cover" alt="博文链">
        <div class="bottomText" style="margin-top: 15px">欢迎所有非遗爱好者与我们一同见证</div>
        <div class="bottomText">“非遗文化数字化的新纪元”</div>
      </div>
      <div style="width: 1px;height: 150px;background-color: #D4D4D4"></div>
      <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 50%">
        <div style="display: flex;justify-content: space-around;align-items: center" class="tips">
          <div style="width: 160px;text-align: center">关于我们</div>
          <div style="width: 1px;height: 32px;background-color: #D4D4D4"></div>
          <div style="width: 160px;text-align: center">联系我们</div>
          <div style="width: 1px;height: 32px;background-color: #D4D4D4"></div>
          <div style="width: 160px;text-align: center">免责声明</div>
        </div>
        <p class="team">网站建设团队：北京邮电大学博文链团队</p>
        <p class="webId" @click="changePage()">备案号：京ICP备2022022795号-1</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      storyContent: [
        {imgUrl: this.$store.state.imgBaseUrl+"/%E6%95%B0%E5%AD%97%E7%89%88%E6%9D%83%E4%BF%9D%E6%8A%A4.png", title: "数字版权保护", content: "我们基于区块链技术，通过上传作品-作品存证-版权注册-登记确权对非遗作品进行数字化的保护。"},
        {imgUrl: this.$store.state.imgBaseUrl+"/%E6%95%B0%E5%AD%97%E5%B1%95%E9%A6%86.png", title: "数字展馆", content: "用户可以欣赏海量原创非遗作品，并在数字作品商城完成选购和交易，获得对应该作品的数字凭证。"},
        {imgUrl: this.$store.state.imgBaseUrl+"/%E5%85%AC%E7%9B%8A%E4%BA%8B%E4%B8%9A%E5%8A%A9%E5%8A%9B%E4%B9%A1%E6%9D%91%E6%8C%AF%E5%85%B4.png", title: "公益事业助力乡村振兴", content: "收益所得全部返还给创作者，带动非遗文化继承和保护，助力乡村振兴事业的发展。"}
      ]
    }
  },
  methods: {
    changePage() {
      window.open("https://beian.miit.gov.cn/")
    }
  }
}
</script>

<style scoped>
.background{
  min-width: 1400px;
  width: 100%;
  max-width: 1800px;
  position: absolute;
  /*background-color: #C71010;*/
}
.storyImg{
  width: 1050px;
  object-fit: cover;
  margin-right: 10px;
}
.story1{
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1330px;
  /*width: 100%;*/
  /*max-width: 1800px;*/
  width: 95%;
  height: 520px;
  margin-left: 40px;
  margin-top: 160px;
  max-width: 1800px;
}
.story1Img{
  width: 720px;
  /*height: 330px;*/
  object-fit: cover;
  /*background-color: #C71010;*/
}
.projectName{
  font-family: 'Songti SC',serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 45px;

  letter-spacing: 0.01em;
  color: #000000;
  margin-left: 30px;
}
.line{
  display: flex;
  align-items: center;
}
.line1{
  width: 280px;
  height: 0;
  margin-left: 30px;
  background-color: #C71010;
  border: 6px solid #C71010;
}
.line2{
  width: 81px;
  height: 0;
  margin-left: 10px;
  background-color: #143094;
  border: 6px solid #143094;
}
.content1{
  margin-top: 35px;
  margin-left: 30px;
  width: 515px;
  height: 82px;

  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 146.3%;

  letter-spacing: 0.02em;

  color: rgba(51, 27, 59, 0.66);
}
.story2Img{
  min-width: 1400px;
  width: 100%;
  object-fit: cover;
  position: absolute;
  margin-top: 850px;
  max-width: 1800px;

}
.story2{
  display: flex;
  flex-direction: column;
  max-width: 1800px;
  width: 100%;
}
.title2{
  width: 100%;
  min-width: 1400px;
  display: flex;
  flex-direction: column;

  align-items: center;
  position: relative;
  margin-top: 990px;
}
.title2Content{
  font-family: 'Songti SC',serif;
  font-style: normal;
  font-weight: 900;
  font-size: 48px;
  line-height: 106.3%;

  text-align: center;
  letter-spacing: -0.01em;

  color: #331B3B;
}
.content2{
  display: flex;
  align-items: flex-end;
  margin-top: 160px;
  margin-left: 90px;
}
.step{
  width: 35px;
  height: 35px;
  object-fit: cover;
  margin-left: 20px;
}
.card{
  width: 310px;
  height: 165px;

  background: #FFFFFF;
  box-shadow: 0 0 9px 2px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin-left: 45px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
}
.weDoIcon{
  width: 52px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content2title{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 137.3%;

  letter-spacing: 0.055em;
  text-transform: uppercase;

  color: #331B3B;
  margin-top: 10px;
}
.content2Content{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  line-height: 145.3%;

  letter-spacing: 0.02em;

  color: rgba(0, 0, 0, 0.66);
  margin-top: 8px;
}
.story3{
  width: 100%;
  max-width: 1800px;
  min-width: 1400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  margin-top: 1665px;
}
.story3Img{
  width: 740px;
  height: 700px;
  object-fit: cover;

  margin-left: 70px;
}
.whoWeAre{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 120px;
}
.teamTitle{
  font-family: 'Songti SC',serif;
  font-style: normal;
  font-weight: 1000;
  font-size: 48px;
  line-height: 106.3%;
  text-align: center;
  letter-spacing: -0.01em;
  color: #331B3B;
}
.we1{
  width: 520px;
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 146.3%;

  letter-spacing: 0.02em;

  color: rgba(51, 27, 59, 0.66);
}
.we2{
  margin-top: 8px;
  width: 520px;
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 146.3%;
  letter-spacing: 0.02em;
  color: rgba(51, 27, 59, 0.66);
}
.bottom{
  width: 100%;
  min-width: 1400px;
  height: 277px;
  background: #F5F5F5;
  border-radius: 0;
  position: absolute;
  margin-top: 2450px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1800px;
  /*bottom: 0;*/
  /*margin-bottom: 0;*/
}
.bottomContent{
  margin-left: 80px;
}
.bottomTitle{
  margin-top: 30px;
  font-family: 'Playfair Display',serif;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: 0.01em;

  color: #000000;
}
.sentence{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.3%;

  letter-spacing: 0.02em;

  color: #000000;
}
.chatUs{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 159.3%;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #000000;
  margin-top: 10px;
}
.chatContent{
  width: 263px;
  height: 52px;
  border: 1px solid #000000;
  font-size: 20px;
}
.chatButton{
  width: 143px;
  height: 57px;
  background: #000000;
  border: 1px solid #000000;

  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.3%;

  letter-spacing: 0.02em;
  text-transform: uppercase;

  color: #FFFFFF;

}
.webId{
  font-size: 12px;
  margin-top: 8px;
  color: #868686;
  cursor: pointer;
}
.webId:hover{
  text-decoration: underline;
}
.bottomText{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.3%;
  /* or 25px */

  text-align: center;
  letter-spacing: 0.02em;

  color: #848484;
}
.tips{
  font-family: 'PingFang SC',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 159.3%;
  /* identical to box height, or 32px */

  text-align: center;
  letter-spacing: 0.02em;

  color: #7B7B7B;
}
.team{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 159.3%;
  /* or 25px */

  text-align: center;
  letter-spacing: 0.02em;
  margin-top: 10px;
  color: #ADADAD;

}
</style>