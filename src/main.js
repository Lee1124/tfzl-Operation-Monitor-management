import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/routers";
import store from "./store";
import './router/index';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/index.scss';//全局样式

import './utils/VueComponent';//全局注册组件
import './utils/flexible';//适配模块
import './assets/icons' // svg-icon
import "./utils/gt";//图形滑块验证


// 权限指令
import permission from './components/Permission'

Vue.config.productionTip = false;
Vue.use(Element);
Vue.use(permission);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
