<template>
  <el-container style="max-width: 1440px">
    <el-main :style="{ padding: '0px' }">
      <div v-if="!loaded" style="display: flex; justify-content: center; align-items: center;width: 100%;height: 100vh;">
        <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 24 24"><g stroke="#3b488c"><circle cx="12" cy="12" r="9.5" fill="none" stroke-linecap="round" stroke-width="1"><animate attributeName="stroke-dasharray" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0 150;42 150;42 150;42 150"/><animate attributeName="stroke-dashoffset" calcMode="spline" dur="1.5s" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1" keyTimes="0;0.475;0.95;1" repeatCount="indefinite" values="0;-16;-59;-59"/></circle><animateTransform attributeName="transform" dur="2s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></g></svg>
      </div>
      <router-view v-if="loaded"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import {register, userLogin} from "../../../api";

export default {
  name: "userInfo",
  provide() {
    return {
      reload: (asideActiveKey) => {
        this.asideActiveKey = asideActiveKey
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const result = to.path.match(/(?<=userInfo\/)\w+/g)
      const asideActiveKey = result && result[0] || vm.asideActiveKey
      if (asideActiveKey !== vm.asideActiveKey) {
        vm.asideActiveKey = asideActiveKey
      }
    })
  },
  data() {
    return {
      loaded: false,
      asideActiveKey: '',
      asideButtonList: [
        {
          text: '基本信息',
          routePath: 'baseInfo',
          key: 'baseInfo'
        },
        {
          text: '实名认证',
          routePath: 'verified',
          key: 'verified'
        },
        {
          text: '作品管理',
          routePath: 'worksManager',
          key: 'worksManager'
        },
        {
          text: '版权交易',
          routePath: 'userCollection',
          key: 'userCollection'
        },
      ]
    }
  },
  watch: {
    asideActiveKey:{
      handler(newValue, oldValue) {
        this.$router.push(`/userProfile/userInfo/${newValue}`)
      }
    }
  },
  created() {
    if (this.$cookies.isKey('token')) {
      this.loaded = true;
    }
    else {
      window.addEventListener('message', this.receiveMessage);
    }
    console.log(this.$router)
    console.log(this.$route)
    const route = this.$route
    const path = route.path
    this.asideButtonList.some(item => {
      if (path.indexOf(item.key) === 0) {
        this.asideActiveKey = ''
        return true
      } else if (path.indexOf(item.key) !== -1) {
        this.asideActiveKey = item.key
        return true
      }
    })
  },
  methods: {
    receiveMessage(event) {
      if (typeof event.data === "string") {
        if (event.data.indexOf("|") !== -1){
          const [username, createdDatetime] = event.data.split("|");
          const info = username + ' ' + createdDatetime;
          window.removeEventListener('message', this.receiveMessage);
          const user = {
            username: info,
            password: createdDatetime};
          userLogin(user).then(res=>{
            const body = res.data;
            if(body.msg === "SUCCESS") {
              this.$cookies.set('token', body.data.token.split(' ')[1], 0, null,'.ichbupt.cn');
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
                  if(body.msg === "SUCCESS") {
                    this.$cookies.set('token', body.data.token.split(' ')[1], 0, null,'.ichbupt.cn');
                    this.loaded = true;
                  }
                })
              })
            }
          })
        }
      }
    },
    // 点击侧边栏选项，切换到不同的页面
    clickAsideButtonHandle({ key, routePath }) {
      this.asideActiveKey = key
    },
    // 退出登录
    exitProfile() {
      this.$cookies.remove('token')
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
  ul,li {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }

  .aside-wrapper {
    background: #FFFFFF;
    border-right: 1px solid #E1E1E1;

    .aside-text {
      padding-left: 40px;
      text-align: left;
    }

    .aside-title {
      display: block;
      margin: 50px 0;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      color: #121212;
    }

    .aside-list {
      .aside-item {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #7E7E7E;
        height: 40px;

        &:hover {
          color: #326CC2;
          background: #f3f3f3;
          cursor: pointer;
        }

        & div {
          line-height: 40px;
        }

        &.active {
          background: #EAEAEA;
          color: #326CC2;
        }
      }
    }


    .exit-profile {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #EA5757;
      width: 100px;
      text-align: center;
      display: block;
      padding: 10px 0;
      margin: 0 auto;
      margin-top: 400px;

      &:hover {
          color: #e72d2d;
          background: #f3f3f3;
          cursor: pointer;
        }
    }
  }
</style>