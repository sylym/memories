import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {regionData} from "element-china-area-data/dist/app";
import echarts from 'echarts'
import 'echarts/map/js/china.js';
import VueCookies from 'vue-cookies'
import myFetch from './utils/myFetch'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.use(VueCookies)
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    // bus 总线
    // $ 为了迎合 vue 的命名习惯
    // 安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$bus1 = this
  }
}).$mount('#app')

Vue.prototype.$myFetch = myFetch
