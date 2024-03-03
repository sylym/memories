import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'

//噢淦
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const ArtWorkMenu = () => import("../pages/DigitalArtwork/DegitalArtWorkMenu")   //菜单
const DigitalArtWork = () => import("../pages/DigitalArtwork/DigitalArtwork.vue")   //作品上传等的总界面
const Upload = () => import("../pages/DigitalArtwork/Upload/Upload.vue")            //作品上传
const Deposit = () => import("../pages/DigitalArtwork/Deposit/Deposit.vue")         //作品存证
const RegisterRight = () => import("../components/DigitalArtwork/Register/registerRights") //登记确权  发起登记确权新界面

const Profile = () => import("../pages/DigitalArtwork/Profile/Profile.vue")  //我的
//作品上传
//版权注册
const Copyrights = () => import("../components/DigitalArtwork/Enroll/copyrights")   //版权注册

const Home = () => import("../pages/home/home")//首页
const Exhibition = () => import("../pages/exhibition/exhibition")   //数字展馆
const ExhibitionHome = () => import("../components/Exhibition/home/home")   //数字展馆的首页
const ExhiAllWorks = () => import("../pages/exhibition/allWorks/allWorks")  //作品相关路由
const ExhiWorksDisplay = () => import("../components/Exhibition/allWorks/allWorks")    //作品总览
const ExhiProviceWorks = () => import("../components/Exhibition/allWorks/provinceWorks")//贵州省界面
const ExhiFengWorks = () => import("../components/Exhibition/allWorks/fengxiangranWorks")//枫香染界面
const ExhiWdetails = () => import("../components/Exhibition/allWorks/detailsWorks")//详情页面
const ExhiWorks = () => import("../pages/exhibition/works/works")  //具体作品
const ExhiDetails = () => import("../components/Exhibition/works/details")  //已发售/未发售
const Welfare = () => import("../pages/exhibition/welfare/welfare")   //公益追溯
const WelfareInfo = () => import("../components/Exhibition/welfare/welfareInfo")  //公益追溯详情界面
const DigitalMall = () => import("../pages/exhibition/digitalMall/digitalMall")   //数字商城

const Enter = () => import("../pages/exhibition/enter/enter")   //走进纪艺
const EnterMenu = () => import("../components/Enter/enterMenu")    //走进纪艺  传承人/创作者
const Inheritor = () => import("../components/Enter/inheritor")   //我是传承人
const Campus = () => import("../components/Enter/Campus")         //我是高校
const Program = () => import("../components/Enter/knowProgram")   //了解程序
const AddWeChat = () => import("../components/Enter/addWeChat")   //添加微信页面
const Creator = () => import("../components/Enter/creator")   //我是创作者
const Creators = () => import("../components/DigitalArtwork/creators")   //作品相关表单初始
const UserProfile = () => import("../pages/profile/profile") //用户相关
const UserLogin = () => import("../pages/profile/login/login")  //登录
const UserRegister = () => import("../pages/profile/register/register")  //注册

const launchCollection = () => import("../components/collections/launch")  //发布藏品
const collection = () => import("../pages/collections/collection.vue")     //发布藏品路由
const allCollections = () => import("../components/collections/allCollections")    //所有藏品
const workDetail = () => import("../pages/statusInfo/statusInfo")  // 个人作品详情
const rights = ()=> import("../pages/statusInfo/allRights")
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: "/home",      //首页
    component: Home,
    name: "首页"
  },
  {
    path: "/exhibition",
    component: Exhibition,
    children: [
      {
        path: '',
        redirect: 'exhibitionHome'
      },
      {
        path: 'exhibitionHome',
        component: ExhibitionHome,     //数字展馆首页 即含四大类的界面
        name: "数字展馆"
      },
      {
        path: 'allWorks',
        component: ExhiAllWorks,   //作品总览
        children: [
          {
            path: '',
            redirect: 'worksDisplay'
          },
          {
            path: 'worksDisplay',
            component: ExhiWorksDisplay,   //真的总览
            name: "作品总览"
          },
          {
            path:'provinceWorks',
            component: ExhiProviceWorks,
            name:"作品总览（省份）",
          }
          ,{
            path: 'fengxiangranWorks',
            component: ExhiFengWorks, //枫香染
            name:"枫香染",
          },
          {
            path: 'detailsWorks',
            component: ExhiWdetails,
            name:"作品详情"
          },
          // {
          //   path: 'works',
          //   component: ExhiWorks,  //具体作品
          //   children: [
          //     {
          //       path: 'details',
          //       component: ExhiDetails,   //已发售未发售,
          //       name: "作品总览-详情"
          //     }
          //   ]
          // }
        ]
      },
      {
        path: 'welfare',
        component: Welfare,         //公益追溯
        name: "公益追溯"
      },
      {
        path: 'welfare/info',
        component: WelfareInfo,
        name: "公益追溯详情"
      },
      {
        path: 'digitalMall',
        component: DigitalMall,     //数字商城
        name: "数字商城",
        children: [

        ]
      },
      {
        path: 'enter',
        component: Enter,           //走进纪艺
        children: [
          {
            path: "",
            redirect: "menu"
          },
          {
            path: "menu",
            component: EnterMenu,
            name: "走进纪艺",
          },
          {
            path: 'inheritor',      //传承人
            component: Inheritor,
            name: "走进纪艺-我是传承人"
          },
          {
            path: 'campus',    //我是高校
            component: Campus,
            name: "走进纪艺-我是高校"
          },
          {
            path: 'program',   //了解程序
            component: Program,
            name: "走进纪艺-了解程序"
          },
          {
            path: 'weChat',          //添加微信
            component: AddWeChat,
            name: "走进纪艺-添加微信"
          },
          {
            path: 'creator',
            component: Creator,       //创作者
            name: "我是创作者"
          }
        ]
      },

    ]
  },
  {
    path: '/userProfile',
    component: UserProfile,
    children: [
      { path: 'login', component: UserLogin, name: '登录' },
      {
        path: 'userInfo',
        component: () => import("../pages/profile/userInfo/index.vue"),
        children: [
          { path: '', redirect: "baseInfo"},
          { path: 'baseInfo', component: () => import("../pages/profile/userInfo/base-info.vue"), name: '我的 - 基本信息' },
          { path: 'verified', component: () => import("../pages/profile/userInfo/verfied.vue"), name: '我的 - 实名认证' },
          { path: 'worksManager', component: () => import("../pages/profile/userInfo/works-manager.vue"), name: '我的 - 作品管理' },
          { path: 'userCollection', component: () => import("../pages/profile/userInfo/works-manager.vue"), name: '我的 - 版权交易' },
        ]
      },
      { path: '', redirect: "userInfo"}
    ]
  },
  {
    path: '/register',         //用户注册
    component: UserRegister,
    name: "注册"
  },
  {
    path: "/DigitalArtwork",
    component: ArtWorkMenu,   //路由
    children: [     //子路由
      {
        path: '',
        redirect: "Work"
      },
      {
        path: 'Work',
        component: DigitalArtWork,
        name: "创作者家园"
      },
      {
        path: 'creators',
        component: Creators,
        name: "创作者家园"
      },
      {
        path: 'upload',   //上传
        component: Upload,
        name: "作品上传"
      },
      {
        path: 'deposit',
        component: Deposit,
        name: "作品存证"
      },
      {
        path: 'enroll',  //注册
        component: Copyrights,
        name: "版权注册"
      },
      {
        path: "registerRight",             //登记确权  发起确权登记
        component: RegisterRight,
        name: "登记确权"
      },
      {                            //我自己？？？
        path: 'profile',
        component: Profile,
        name: "我的"
      }
    ]
  },
  {
    path: '/collection',
    component: collection,
    children: [
      {
        path: '',
        redirect: 'allCollections'
      },
      {
        path: 'allCollections',
        component: allCollections,
        name: "发布作品"
      },
      {
        path: 'launch',
        component: launchCollection,
        name: "发布作品"
      }
    ]
  },
  {
    path: "/workDetail",
    component: workDetail,
    name: "作品详情"
  },
  {
    path: "/workRights",
    component: rights,
    name: "版权通证"
  }
]

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部, 并添加动画效果
    return { offset: { top: 0 }, behavior: 'smooth' }
  },
  //scrollBehavior: () => ({ y: 0 })
  
})

router.beforeEach((to, from, next) => {
  // 如果没有token信息，则需要进行登录
  // 无需登录就可以浏览的页面名单
  const noLoginPathList = [
    '/',
    '/home',
    '/userProfile/login',
    '/register',
    '/exhibition/exhibitionHome',
    '/exhibition/allWorks/worksDisplay',
    '/exhibition/allWorks/works',
    '/exhibition/welfare',
    '/exhibition/welfare/info',
    '/exhibition/digitalMall',
    '/exhibition/enter/menu',
    '/exhibition/enter/inheritor',
    '/exhibition/enter/campus',
    '/exhibition/enter/program',
    '/exhibition/enter/weChat',
    '/exhibition/enter/creator',
    '/DigitalArtwork/Work',
    '/exhibition/allWorks/provinceWorks',
    '/exhibition/allWorks/fengxiangranWorks',
    '/exhibition/allWorks/detailsWorks'
  ]
  const isAuthenticated = VueCookies.isKey('token')
  if (!isAuthenticated && noLoginPathList.indexOf(to.path) === -1 ) {
    next({ path: '/userProfile/login' })
  } else {
    document.title = to.name
    next()
  }
})

export default router
