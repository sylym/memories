<template>
  <div id="allCollections">
    <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
    <div class="topLine"></div>
    <div class="collections">
      <div v-for="(item, index) in displayData" :key="'collection' + index" class="collection">
        <div>
          <img :src="item.imgUrl" :alt="'collection'+index" class="displayImg">
        </div>
        <div class="collectionContent">
          <p class="collentionText">作品名称：&nbsp;{{item.workName}}</p>
          <p class="collentionText" style="margin-top: 5px;">作品名称：&nbsp;{{item.workType}}</p>
          <p class="collentionText" style="margin-top: 5px;">作品作品平台编号：&nbsp;{{item.workId}}</p>
          <p class="collentionText" style="margin-top: 5px;">创作时间：&nbsp;{{item.workCreateTime}}</p>
          <div class="launchBtn" @click="launchWork(item)">发布到数字博物馆</div>
        </div>
      </div>
    </div>
    <div v-if="displayData.length===0" class="noWorks">暂时没有可发布的作品</div>
  </div>
</template>
<script>
import jyTabBar from '../tabbar/jyTabbar/jyTabBar.vue';
import { WorkTypeLabelMap } from '../../types';
import { getOwnWork, getWork, getWorkVisible, getRegisterRes, getWorkByIdNew } from '../../api';
export default{
  name: "allCollections",
  components: {
    jyTabBar
  },
  data() {
    return {
      pathTitle: [
       {name: "创作者家园", url: "/DigitalArtwork/Work"},
       {name: "发布作品", url: ""}
      ],
      testData: [
      ],
      displayData: [

      ]
    }
  },
  async created() {
    let that = this
    let tempList = []
    await getWork().then(res=>{
      if(res.data.data !== null) {
        console.log(res.data)
        for(let i = 0; i < res.data.data.length; i++) {
          // that.testData.push(res.data.data[i])
          // this.checkStatus(res.data.data[i].status)
          if((that.checkStatus(res.data.data[i].status) && res.data.data[i].content.visible === false)) {
            // that.testData.push(res.data.data[i])
            tempList.push(res.data.data[i])
          }
        }
      }
    })
    console.log(tempList)
    for(let i = 0; i < tempList.length; i++){
      await getRegisterRes(tempList[i].workId).then(res=>{   // 查询登记确权结果 更新
        // console.log(res.data)
      })
      await getWorkByIdNew(tempList[i].workId).then(res=>{
        if(res.data.code === 200){
          console.log(res.data.data)
          // &&!tempList[i].content.visible
          if(that.checkStatus(res.data.data.status)){
            that.testData.push(tempList[i])
          }
        }
      })
    }
    for(let i = 0; i < this.testData.length; i++) {
      let time = new Date(this.testData[i].content.workCreateTime)
      this.displayData.push({
        workName: this.testData[i].content.workName,
        workType: WorkTypeLabelMap[this.testData[i].content.workType],
        workId: this.testData[i].workId,
        workCreateTime: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate(),
        imgUrl: "https://fxr-1312386734.cos.ap-beijing.myqcloud.com/%E4%BD%9C%E5%93%81%E7%AE%A1%E7%90%86/logo.png"
      })
    }
    console.log(this.displayData)
  },
  methods: {
    launchWork(item) {
      this.$router.push({path: "/collection/launch", query: {item: item}})
    },
    checkStatus(str) {
      console.log(str === "作品存证成功")
      return str === "作品存证成功" || str.indexOf("版权注册")!==-1 || str.indexOf("登记确权") !== -1
    }
  }
}
</script>
<style>
#allCollections{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 1400px;
}
.topLine{
  margin-top: 60px;
  width: 490px;
  height:1px;
  background-color: #A5A5A5
}
.collections{
  margin-top: 100px;
  position: absolute;
  width: 100%;
  min-width: 1400px;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
}
.collection{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 5px;
  background-color: #FFFFFF;
  border-radius: 7px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 880px;
}
.displayImg{
  width: 300px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
}
.collectionContent{
  width: 500px;
  height: 180px;
  margin-left: 20px;
  padding: 10px 10px;
}
.collentionText{
  font-family: sans-serif;
  font-size: 15px;
}
.launchBtn{
  height: 40px;
  width: 200px;
  background-color: #326CC2;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 16px;
}
.noWorks{
  color: #A5A5A5;
  margin-top: 50px;
}
</style>