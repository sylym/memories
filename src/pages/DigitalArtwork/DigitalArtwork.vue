<template>
  <div id="artworkPage" style="position: absolute;width: 100%;min-width: 1400px">
    <div v-if="!loaded" style="display: flex; justify-content: center; align-items: center;width: 100%;height: 100vh;">
      <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 24 24"><g stroke="#3b488c"><circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="1"><animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"/><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"/></circle><animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></g></svg>
    </div>
    <div v-if="loaded" class="content">
      <div class="functions">
        <div style="display: flex;justify-content: space-between;width: 100%">
          <div class="functionCard" @mouseenter="enterShortCard(1)" @mouseleave="leaveShortCard(1)" id="uploadWork" @click="changeUrl(0)">
            <p class="tip" id="uploadWorkText1">将您的作品基本信息上传到艺链智绘上吧</p>
            <div class="CardItem">
              <img src="https://s1.ax1x.com/2022/06/25/jFIHoj.png" class="icon" alt="uploadEnter" id="uploadEnter">
              <img src="https://s1.ax1x.com/2022/06/25/jF7HTe.png" class="icon" alt="uploadLeave" style="display: none" id="uploadLeave">
              <p class="items" id="uploadWorkText2">上传作品</p>
            </div>
          </div>
          <div class="functionCard" @mouseenter="enterShortCard(2)" @mouseleave="leaveShortCard(2)" id="workDeposit" @click="changeUrl(1)">
            <p class="tip" id="workDepositText1">我们会将您的作品固定在区块链上</p>
            <div class="CardItem">
              <img src="https://s1.ax1x.com/2022/06/25/jFTAEQ.png" class="icon" alt="depositEnter" id="depositEnter">
              <img src="https://s1.ax1x.com/2022/06/25/jFb7PH.png" class="icon"  alt="depositEnter" id="depositLeave" style="display: none">
              <p class="items" id="workDepositText2">作品存证</p>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;width: 100%;margin-top: 17px">
          <div class="functionCard" @mouseenter="enterShortCard(3)" @mouseleave="leaveShortCard(3)" id="Register" @click="changeUrl(2)">
            <p class="tip" id="RegisterText1">您将获得作品的13项版权通证</p>
            <div class="CardItem">
              <img src="https://s1.ax1x.com/2022/06/25/jFTENj.png" class="icon" alt="registerEnter" id="registerEnter">
              <img src="https://s1.ax1x.com/2022/06/25/jFqmoF.png" class="icon" alt="registerLeave" id="registerLeave" style="display: none">
              <p class="items" id="RegisterText2">版权注册</p>
            </div>
          </div>
          <div class="functionCard" @mouseenter="enterShortCard(4)" @mouseleave="leaveShortCard(4)" id="enrollAuthor" @click="changeUrl(3)">
            <p class="tip" id="enrollAuthorText1">您将获得版权局发放的作品版权证书</p>
            <div class="CardItem">
              <img src="https://s1.ax1x.com/2022/06/25/jFXELt.png" class="icon" alt="enrollEnter" id="enrollEnter">
              <img src="https://s1.ax1x.com/2022/06/25/jFqWWj.png" class="icon" alt="enrollLeave" id="enrollLeave" style="display: none">
              <p class="items" id="enrollAuthorText2">登记确权</p>
            </div>
          </div>
        </div>
        <div  style="display: flex;justify-content: space-between;width: 100%;margin-top: 17px">
          <div class="cardBottom" @mouseenter="enterShortCard(5)" @mouseleave="leaveShortCard(5)" id="postWork" @click="changeUrl(4)">
            <div class="worksBottomContent">
              <img src="https://s1.ax1x.com/2022/06/25/jFos10.png" class="icon" alt="postEnter" id="postEnter">
              <img src="https://s1.ax1x.com/2022/06/25/jFX8Lq.png" class="icon" alt="postLeave" id="postLeave" style="display: none">
              <p class="items" id="postWorkText1">发布作品</p>
              <p class="bottomItem" id="postWorkText2">请发布您创作的数字作品</p>
            </div>
          </div>
        </div>
        <div  style="display: flex;justify-content: space-between;width: 100%;margin-top: 17px">
          <div class="cardBottom" @mouseenter="enterShortCard(6)" @mouseleave="leaveShortCard(6)" id="workAuthor">
            <div class="worksBottomContent">
              <img src="https://s1.ax1x.com/2022/06/25/jFTFHg.png" class="icon" alt="workEnter" id="workEnter">
              <img src="https://s1.ax1x.com/2022/06/25/jFXJe0.png" class="icon" alt="workLeave" id="workLeave" style="display: none">
              <p class="items" id="workAuthorText1">作品授权</p>
              <p class="bottomItem" id="workAuthorText2">您可以将发布的作品授权给平台</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottomWorks"></div>
    </div>
    <!--导航-->
    <!--
    <router-link to="/DigitalArtwork/upload"></router-link>
    <router-link to="/DigitalArtwork/deposit"></router-link>
    <router-link to="/DigitalArtwork/enroll"></router-link>
    <router-link to="/DigitalArtwork/register"></router-link>
    <router-link to="/DigitalArtwork/profile"></router-link>
    -->
    <!--内容展示-->
  </div>
</template>

<script>
import TabBar from "@/components/tabbar/DigitalArtwork/TabBar";
import Progress from "@/components/DigitalArtwork/Progress";
import Upload from "@/pages/DigitalArtwork/Upload/Upload";
import Register from "@/pages/DigitalArtwork/Register/Register";
import ProgressText from "@/components/DigitalArtwork/ProgressText";
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import * as API from '@/api'
import VueCookies from "vue-cookies";
import {register, userLogin} from "../../api";
export default {
  name: "DigitalArtwork",
  components: {
    TabBar,
    Upload,
    Register,
    Progress,
    ProgressText,
    jyTabBar
  },
  data() {
    return {
      normalTitle: [
        { title: "首页", url: "/home" },
        { title: "非遗星球", url: "/nonHeritagePlanet/nonHeritagePlanet" },
        {title: "数字展馆", url: "/exhibition/exhibitionHome"},
        {title: "创作者家园", url: "/DigitalArtwork/Work"},
        {title: "我的", url: "/userProfile/userInfo"}
      ],
      url: [
        "/DigitalArtwork/upload",
        "/DigitalArtwork/deposit",
        "/DigitalArtwork/enroll",
        "/DigitalArtwork/registerRight",
        "/collection"
      ],
      loaded: false
    }
  },
  created() {
    if (this.$cookies.isKey('token')) {
      this.loaded = true;
    }
    else {
      window.addEventListener('message', this.receiveMessage);
    }
  },
  methods: {
    receiveMessage(event) {
      console.log(event)
      if (typeof event.data === "string") {
        if (event.data.indexOf("|") !== -1){
          const [username, createdDatetime] = event.data.split("|");
          const info = username + ' ' + createdDatetime;
          window.removeEventListener('message', this.receiveMessage);
          const user = {
            username: info,
            password: createdDatetime};
          userLogin(user).then(res=>{
            const body = res.data
            console.log(res)
            if(body.msg === "SUCCESS") {
              this.$cookies.set('token', body.data.token.split(' ')[1], null, null, "https://release.ichbupt.cn", true, 'None');
              this.loaded = true;
            }else {
              const userRegister = {
                username: info,
                type: 1,
                password: createdDatetime,
                phone: info,
                randomCode: 1234
              };
              register(userRegister).then(res=>{
                userLogin(user).then(res=>{
                  const body = res.data
                  console.log(res)
                  if(body.msg === "SUCCESS") {
                    this.$cookies.set('token', body.data.token.split(' ')[1], null, null, "https://release.ichbupt.cn", true, 'None');
                    this.loaded = true;
                  }
                })
              })
            }
          })
        }
      }
    },
    enterShortCard(type) {
      switch (type) {   //移动鼠标更改样式
        case 1: {
          document.getElementById("uploadWork").style.backgroundColor = "#20347C"
          document.getElementById("uploadWorkText1").style.color = "#ffffff"
          document.getElementById("uploadWorkText2").style.color = "#ffffff"
          document.getElementById("uploadEnter").style.display = "none"
          document.getElementById("uploadLeave").style.display = ""
          break
        }
        case 2: {
          document.getElementById("workDeposit").style.backgroundColor = "#20347C"
          document.getElementById("workDepositText1").style.color = "#ffffff"
          document.getElementById("workDepositText2").style.color = "#ffffff"
          document.getElementById("depositEnter").style.display = "none"
          document.getElementById("depositLeave").style.display = ""
          break
        }
        case 3: {
          document.getElementById("Register").style.backgroundColor = "#20347C"
          document.getElementById("RegisterText1").style.color = "#ffffff"
          document.getElementById("RegisterText2").style.color = "#ffffff"
          document.getElementById("registerEnter").style.display = "none"
          document.getElementById("registerLeave").style.display = ""
          break
        }
        case 4: {
          document.getElementById("enrollAuthor").style.backgroundColor = "#20347C"
          document.getElementById("enrollAuthorText1").style.color = "#ffffff"
          document.getElementById("enrollAuthorText2").style.color = "#ffffff"
          document.getElementById("enrollEnter").style.display = "none"
          document.getElementById("enrollLeave").style.display = ""
          break
        }
        case 5: {
          document.getElementById("postWork").style.backgroundColor = "#20347C"
          document.getElementById("postWorkText1").style.color = "#ffffff"
          document.getElementById("postWorkText2").style.color = "#ffffff"
          document.getElementById("postEnter").style.display = "none"
          document.getElementById("postLeave").style.display = ""
          break
        }
        case 6: {
          document.getElementById("workAuthor").style.backgroundColor = "#20347C"
          document.getElementById("workAuthorText1").style.color = "#ffffff"
          document.getElementById("workAuthorText2").style.color = "#ffffff"
          document.getElementById("workEnter").style.display = "none"
          document.getElementById("workLeave").style.display = ""
          break
        }
      }
    },
    leaveShortCard(type) {
      switch (type) {   //移动鼠标更改样式
        case 1: {
          document.getElementById("uploadWork").style.backgroundColor = ""
          document.getElementById("uploadWorkText1").style.color = "#606060"
          document.getElementById("uploadWorkText2").style.color = "#143094"
          document.getElementById("uploadLeave").style.display = "none"
          document.getElementById("uploadEnter").style.display = ""
          break
        }
        case 2: {
          document.getElementById("workDeposit").style.backgroundColor = ""
          document.getElementById("workDepositText1").style.color = "#606060"
          document.getElementById("workDepositText2").style.color = "#143094"
          document.getElementById("depositEnter").style.display = ""
          document.getElementById("depositLeave").style.display = "none"
          break
        }
        case 3: {
          document.getElementById("Register").style.backgroundColor = ""
          document.getElementById("RegisterText1").style.color = "#606060"
          document.getElementById("RegisterText2").style.color = "#143094"
          document.getElementById("registerEnter").style.display = ""
          document.getElementById("registerLeave").style.display = "none"
          break
        }
        case 4: {
          document.getElementById("enrollAuthor").style.backgroundColor = ""
          document.getElementById("enrollAuthorText1").style.color = "#606060"
          document.getElementById("enrollAuthorText2").style.color = "#143094"
          document.getElementById("enrollEnter").style.display = ""
          document.getElementById("enrollLeave").style.display = "none"
          break
        }
        case 5: {
          document.getElementById("postWork").style.backgroundColor = ""
          document.getElementById("postWorkText1").style.color = "#143094"
          document.getElementById("postWorkText2").style.color = "#606060"
          document.getElementById("postEnter").style.display = ""
          document.getElementById("postLeave").style.display = "none"
          break
        }
        case 6: {
          document.getElementById("workAuthor").style.backgroundColor = ""
          document.getElementById("workAuthorText1").style.color = "#143094"
          document.getElementById("workAuthorText2").style.color = "#606060"
          document.getElementById("workEnter").style.display = ""
          document.getElementById("workLeave").style.display = "none"
          break
        }
      }
    },
    async changeUrl(type) {
      if(VueCookies.isKey('token')){   // 先检查是否已登录
        const userInfo = await API.getUserInfo()   // 然后检查是否已实名 先获取用户的信息
        this.$store.commit('storageUserInfo', userInfo)

        // 获取用户实名信息
        const realUserInfo = await API.queryUser({ username: userInfo.username })
        this.$store.commit('storageRealUserInfo', realUserInfo)
        console.log(this.$store.state.userInfo)
        this.$router.push(this.url[type]).catch()
      }else{
        this.$router.push(this.url[type]).catch()
      }
    }
  }
}
</script>

<style scoped>
@import "../../assets/css/DigitalArtwork/DigitalArtwork.css";

.content {
  background-image: url('https://s21.ax1x.com/2024/03/08/pFsNVKg.png');
  background-size: contain; /* 让背景图片充满整个容器 */
  background-position: left center; /* 让背景图片在容器中居中显示 */
  background-repeat: no-repeat; /* 禁止背景图片重复 */
  background-blend-mode: overlay; /* 设置背景图片的混合模式为 overlay */
  z-index: -1;
  height: 100vh;
}

</style>