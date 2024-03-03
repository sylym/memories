<template>
  <div class="details">
    <div class="up">
      <div>
        <img :src="workInfo.imgUrl[0]" alt="作品图片" class="titleImg">
      </div>
      <div style="width: 600px;margin-left: 100px">
        <p class="workName">{{workInfo.workName}}</p>
        <p style="margin-top: 10px;font-family: 'Hind Vadodara',sans-serif;font-style: normal;font-weight: 500;font-size: 20px;line-height: 30px;letter-spacing: 0.195em;">作者：{{workInfo.author}}</p>
        <p style="margin-top: 10px;font-family: 'Hind Vadodara',sans-serif;font-style: normal;font-weight: 500;font-size: 20px;line-height: 30px;letter-spacing: 0.195em;">创作时间：{{workInfo.createTime}}</p>
      </div>
    </div>
    <p class="title">作者介绍</p>
    <div class="line"></div>
    <div style="margin-top: 25px;width: 800px;font-family: 'Hind Vadodara',sans-serif;font-style: normal;font-weight: 500;font-size: 20px;line-height: 30px;text-align: center;letter-spacing: 0.195em;">{{workInfo.paraList[0]}}</div>
    <p class="title">作品介绍</p>
    <div class="line"></div>
    <div style="margin-top: 25px;width: 800px;font-family: 'Hind Vadodara',sans-serif;font-style: normal;font-weight: 500;font-size: 20px;line-height: 30px;text-align: center;letter-spacing: 0.195em;">
      <div style="display: flex">
        <p>{{workInfo.paraList[1]}}</p>
        <img :src="workInfo.imgUrl[1]" alt="作品图片" v-if="workInfo.imgUrl.length > 1 && workInfo.imgUrl[1]!==''" class="centerImg">
      </div>
    </div>
    <p class="title">创作过程</p>
    <div class="line"></div>
    <div style="margin-top: 25px;width: 800px;font-family: 'Hind Vadodara',sans-serif;font-style: normal;font-weight: 500;font-size: 20px;line-height: 30px;text-align: center;letter-spacing: 0.195em;">{{workInfo.paraList[2]}}</div>
    <img :src="workInfo.imgUrl.length>2&&workInfo.imgUrl[2]!==''?workInfo.imgUrl[2]:workInfo.imgUrl[0]" alt="作品图片" class="bottomImg">
    <div style="height: 80px"></div>
  </div>
</template>



<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import {getWorkByIdNew} from "@/api";

export default {
  name: "detailsWorks",
  components: {
    jyTabBar,
  },
  data() {
    return {
      pathTitle: [
        { name: "数字展馆", url: "/exhibition/exhibitionHome" },
        { name: "作品总览", url: "/exhibition/allWorks/allworks" },
        { name: "枫香染", url: "/exhibition/allWorks/fengxiangranWorks" },
        { name: "作品详情", url: "" },
      ],
      result: "",
      searchResult: [],
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSYWluc29uMDEiLCJpYXQiOjE2NjQxMzgxODMsImV4cCI6MTY2NDU3MDE4M30.ZI3i7GYqiEeXoMDTdOHh98ZFG2JVFZRLneNFik-eQV8",
      },
      picList: [],
      textList: [],
      url: "",
      name:"",
      workInfo: {
        author: "",
        imgUrl: [],
        paraList: [],
        workName: "",
        workType: "",
        createTime: "",
        workId: 0
      },
      workTypes: [          //作品类型
        {label: "文字", value: 1},
        {label: "口述", value: 2},
        {label: "音乐", value: 3},
        {label: "戏剧", value: 4},
        {label: "曲艺", value: 5},
        {label: "舞蹈", value: 6},
        {label: "杂技", value: 7},
        {label: "美术", value: 8},
        {label: "建筑", value: 9},
        {label: "摄影", value: 10},
        {label: "电影", value: 11},
        {label: "类似摄制电影方法创作作品", value: 12},
        {label: "工程设计图，产品设计图", value: 13},
        {label: "地图，示意图", value: 15},
        {label: "模型", value: 17},
        {label: "录音作品", value: 19},
        {label: "录像作品", value: 20},
        {label: "其他作品", value: 181}
      ],
    };
  },
  async created() {
    this.workInfo.workId = this.$route.query.workId
    let data = {}
    await getWorkByIdNew(this.workInfo.workId).then(res=>{
      if(res.data.code === 200){
        console.log(res)
        data = res.data
      }
    })
    let content = data.data.basic.content
    // console.log(imgStr)
    this.workInfo.workName = content.workName
    for(let i = 0; i < this.workTypes.length; i++){
      if(content.workType === this.workTypes[i].value){
        this.workInfo.workType = this.workTypes[i].label
        break
      }
    }
    let name = ""
    for(let i = 0; i < data.data.deposit.content.depositAuthorVOS.length; i++){
      name += (data.data.deposit.content.depositAuthorVOS[i].signName + " ")
    }
    this.workInfo.author = name  // 姓名

    let date = new Date(content.createDate)
    this.workInfo.createTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()  // 时间

    let temp1 = content.collectionTextList.substring(1, content.collectionTextList.length - 1)
    temp1 = temp1.split(',')  // 文字段落
    this.workInfo.paraList = temp1

    let temp2 = content.collectionPicList.substring(1, content.collectionPicList.length - 1)
    temp2 = temp2.split(',')  // 文字段落
    this.workInfo.imgUrl = temp2
  },
};
</script>



<style scoped>
.details{
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.up{
  display: flex;
  justify-content: space-around;
}
.titleImg{
  width: 536px;
  height: 365px;
  object-fit: cover;
  border-radius: 10px;
}
.workName{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 42px;
  /* identical to box height */

  letter-spacing: 0.195em;
}
.line{
  width: 472px;
  border: 1px solid #A5A5A5;
  height: 0;
  margin-top: 15px;
}
.title{
  font-family: 'Hind Vadodara',sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  /* identical to box height */

  letter-spacing: 0.195em;
  margin-top: 30px;
}
.bottomImg{
  width: 800px;
  height: 450px;
  object-fit: cover;
  margin-top: 30px;
  border-radius: 10px;
}
.centerImg{
  width: 40%;
  height: 40%;
  object-fit: cover;
  max-width: 500px;
  margin-left: 30px;
  border-radius: 10px;
}
</style>
