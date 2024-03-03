<template>
  <div>
    <jy-tab-bar :is-back="false" :normal-title="normalTitle"></jy-tab-bar>
    <div class="background">
      <div class="card" v-for="(item, index) in rightUnits" :key="'units'+index" :style="{marginTop: index===0?'30px':''}">
        <div class="typeName">{{item.type}}</div>
        <div id="info">
          <div v-for="(user, pos) in item.authors" :key="'author'+index" style="display: flex;align-items: center;margin-top: 5px">
            <div style="width: 220px">持有人{{pos+1}} ：{{user.name}}</div>
            <div style="width: 180px">{{user.proportion}}</div>
            <div>权利说明 ：{{user.explain===""?"暂无":user.explain}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import {enrollRes, getUserById} from "@/api";
export default {
  name: "allRights",
  components: {jyTabBar},
  data(){
    return {
      normalTitle: [
        {title: "首页", url: "/home"},
        {title: "数字展馆", url: "/exhibition/exhibitionHome"},
        {title: "创作者家园", url: "/DigitalArtwork/Work"},
        {title: "我的", url: "/userProfile/userInfo"}
      ],
      rightUnits: [

      ],
      copyUnit: [                             //每个版权单元
        {type: 4, select: false, proportion: "", explain: "", name: "复制权", proportionFlag: false},
        {type: 5, select: false, proportion: "", explain: "", name: "发行权", proportionFlag: false},
        {type: 6, select: false, proportion: "", explain: "", name: "出租权", proportionFlag: false},
        {type: 7, select: false, proportion: "", explain: "", name: "展览权", proportionFlag: false},
        {type: 8, select: false, proportion: "", explain: "", name: "表演权", proportionFlag: false},
        {type: 9, select: false, proportion: "", explain: "", name: "放映权", proportionFlag: false},
        {type: 10, select: false, proportion: "", explain: "", name: "广播权", proportionFlag: false},
        {type: 11, select: false, proportion: "", explain: "", name: "信息网络传播权", proportionFlag: false},
        {type: 12, select: false, proportion: "", explain: "", name: "摄制权", proportionFlag: false},
        {type: 13, select: false, proportion: "", explain: "", name: "改编权", proportionFlag: false},
        {type: 14, select: false, proportion: "", explain: "", name: "翻译权", proportionFlag: false},
        {type: 15, select: false, proportion: "", explain: "", name: "汇编权", proportionFlag: false},
        {type: 16, select: false, proportion: "", explain: "", name: "其他", proportionFlag: false}
      ],
    }
  },
  async created() {
    // let unit = {
    //   type: "",
    //   authors: [
    //     {
    //       name: "",
    //       proportion: "",
    //       explain
    //     }
    //   ]
    // }
    await enrollRes(this.$route.query.workId).then(res=>{
      if(res.data.code === 200){
        for(let i = 0; i < res.data.data.content.copyrights.length; i++){
          this.rightUnits.push({
            type: this.copyUnit[res.data.data.content.copyrights[i].type-4].name,
            authors: []
          })
          for(let j = 0; j < res.data.data.content.copyrights[i].userInfos.length; j++){
            this.rightUnits[i].authors.push({
              userId: res.data.data.content.copyrights[i].userInfos[j].userId,
              name: "",
              proportion: res.data.data.content.copyrights[i].userInfos[j].proportion,
              explain: res.data.data.content.copyrights[i].userInfos[j].copyrightExplain
            })
          }
        }
      }
    })
    for(let i = 0; i < this.rightUnits.length; i++){
      for(let j = 0; j < this.rightUnits[i].authors.length; j++){
        await getUserById(this.rightUnits[i].authors[j].userId, {}).then(res=>{
          if(res.data.code === 200){
            this.rightUnits[i].authors[j].name = res.data.data.username + "（**" + res.data.data.name + "）"
          }
        })
      }
    }
    console.log(this.rightUnits)
  }
}
</script>

<style scoped>
.background{
  background-color: #F6F6F6;
  width: 100%;
  min-width: 1440px;
  top: 80px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card{
  width: 960px;
  background: #fff;
  border-radius: 10px;
  padding: 20px 80px 20px 80px;
  margin-top: 10px;
}
.typeName{
  font-family: 'PingFang HK',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #326CC2;
}
#info div{
  font-family: 'PingFang HK',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #7C7C7C;

}
</style>