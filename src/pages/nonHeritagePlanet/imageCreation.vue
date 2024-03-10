<script setup>
import RandomTagDialog from '../../components/imageGenerator/RandomTagDialog.vue'
import Album from '../../components/imageGenerator/Album.vue'
import DialogShowImage from '../../components/imageGenerator/DialogShowImage.vue'
import GenerateDialog from '../../components/imageGenerator/GenerateDialog.vue'
import GenerateBtn from '../../components/imageGenerator/Generate.vue'
import Go from './go.vue'
</script>

<template>
  <div>
    <el-header class="header">
    <div style="position: absolute; z-index: 2; top: 0; left: 0; right: 0;">
        <!-- 导航栏 -->
        <jy-tab-bar :normal-title="normalTitle" :is-back="false"></jy-tab-bar>
    </div>
    </el-header>
    <el-aside class="aside">
      <!-- 侧边栏内容 -->
      <Go />
    </el-aside>
    <el-main class="main" v-infinite-scroll="callChildloadMore" infinite-scroll-delay="500" infinite-scroll-distance="50" :infinite-scroll-disabled='disabled' :style="contentStyleObj">
      <!-- 主要内容 -->
      <el-backtop :bottom="100" target=".el-main" :visibility-height="200">
        返回顶部
      </el-backtop>
      <Album ref="child"></Album>
      <DialogShowImage />
    </el-main>
    <el-footer class="footer">
      <!-- 底部内容 -->
      <el-row :gutter="16">
        <el-col :span="7">
          <el-aside>
            <GenerateBtn />
            <GenerateDialog />
          </el-aside>
        </el-col>
        <el-col :span="17">
          <el-tooltip class="box-item" effect="dark" content="如果出现剩余图片无法加载的情况，请刷新网页" placement="top-start">
            <el-progress :percentage=processCount :stroke-width="12" striped striped-flow :duration="duration"
                       :format="processTabFormat" color="#e6a23c" />
          </el-tooltip>
        </el-col>
      </el-row>
    </el-footer>
    <RandomTagDialog />
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import * as API from '@/api'
const processTabFormat = (percentage) => (`还剩${percentage}%图片未加载`)

export default {
  name: 'imageCreation',
  components: {
    jyTabBar,
  },
  data() {
    return {
      normalTitle: [
        { title: "首页", url: "/home" },
        { title: "非遗星球", url: "/nonHeritagePlanet/nonHeritagePlanet" },
        { title: "数字展馆", url: "/exhibition/exhibitionHome" },
        { title: "创作者家园", url: "/DigitalArtwork/Work" },
        { title: "我的", url: this.$cookies.get('token') === null ? "/userProfile/login" : "/userProfile/userInfo" }
      ],
      isCollapse: false,
      processCount: 100,
      duration: 5,
      pageTotal: 100,
      pageSize: 10,
      processTabFormat: processTabFormat,
      page: 1,
      disabled:false,
      contentStyleObj: {
        height: ''
      }
    }
  },
  created() {
    this.getHight()
    window.addEventListener('resize', this.getHight);
  },
  destroyed() {
    window.removeEventListener('resize', this.getHight)
  },
  mounted: function () {
    this.setPage()
    this.$bus1.$on('setPageProgress', (data) => {
      this.processCount = Math.floor(100 - (((data.pageNum + 4) / data.totalSize) * 100))
      if (this.processCount <= 0){
        this.processCount = 0
        this.$message.warning('已经加载全部图片了!!!');
        this.disabled = true
      }
    });
  },
  methods: {
    setPage() {
      this.imageCreationRegister()
    },
    getHight(){
      this.contentStyleObj.height = window.innerHeight - 100 + 'px'
      console.log(this.contentStyleObj.height)
    },
    handleSelect(index) {
      this.$router.push(index);
    },
    callChildloadMore () {
      this.disabled = true
      this.$refs.child.loadMore() // 调用子组件的方法
      this.disabled = false
    },
    async imageCreationRegister() {
      const userInfo = await API.getUserInfo()
      this.$myFetch('/api/reg', 'POST', {
        "email": userInfo.username,
        "password": userInfo.phone
      })
        .then(data => {
          if (data.code === -1) {
            console.error(data.msg)
          }
          else {
            console.log(data.msg)
          }
        })
    }
  },
};

</script>


<style>
.container {
  position: relative;
}

/******************logo文字效果****************/
.space1 {
  padding-left: 10px
}

.logo-1 {
  color: white;
  animation: neon 3s infinite;

  height: auto;
  text-align: center;
  --shadow-color: #FF9E9E;
  --shadow-color-light: rgba(255, 255, 255, 0.415);
}

.versioninfo {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}
a {
  color: #0066cc; /* 设置超链接颜色 */
  text-decoration: none; /* 去除下划线 */
}

a:hover {
  color: #cc0000; /* 设置鼠标悬停时的颜色 */
}

@keyframes neon {
  0% {
    text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light),
    0 0 3px var(--shadow-color-light), 0 0 10px var(--shadow-color-light), 0 0 20px var(--shadow-color-light),
    0 0 30px var(--shadow-color), 0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 70px var(--shadow-color), 0 0 100px var(--shadow-color), 0 0 200px var(--shadow-color);
  }

  50% {
    text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light),
    0 0 5px var(--shadow-color-light), 0 0 15px var(--shadow-color-light), 0 0 25px var(--shadow-color-light),
    0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 60px var(--shadow-color), 0 0 80px var(--shadow-color), 0 0 110px var(--shadow-color), 0 0 210px var(--shadow-color);
  }

  100% {
    text-shadow: -1px -1px 1px var(--shadow-color-light), -1px 1px 1px var(--shadow-color-light), 1px -1px 1px var(--shadow-color-light), 1px 1px 1px var(--shadow-color-light),
    0 0 3px var(--shadow-color-light), 0 0 10px var(--shadow-color-light), 0 0 20px var(--shadow-color-light),
    0 0 30px var(--shadow-color), 0 0 40px var(--shadow-color), 0 0 50px var(--shadow-color), 0 0 70px var(--shadow-color), 0 0 100px var(--shadow-color), 0 0 200px var(--shadow-color);
  }
}

/******************logo文字效果****************/

/* 细滚动条 */
::-webkit-scrollbar {
  width: 5px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background-color: #ccc;
}

/* 滚动条滑块悬停样式 */
::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}

.el-progress {
  margin-top: 15px;
  margin-bottom: 20px;
  width: 220px;
  margin-left: auto;
  margin-right: 0;
  text-align: right;
}

.header {
  text-align: left;
  line-height: 50px;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 3;
}

.aside {
  position: fixed;
  left: 5px;
  top: 50px;
  bottom: 60px;
  /* 头部高度 */
  width: 300px;
  height: 100%;
}

.main {
  position: fixed;
  overflow-y: auto;
  margin-left: 300px;
  /* 侧边栏宽度 */
  margin-top: 50px;
  /* 头部高度 */
  margin-bottom: 50px;
}

.footer {
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
}
</style>