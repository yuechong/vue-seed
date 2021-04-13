import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Http from './http';
import Utils from './utils';
import Drective from './directives';
import '@/assets/css/index.less'; // global css

import Antd from 'ant-design-vue';;

Vue.use(Drective).use(Antd);

import ZPagination from '@/components/ZPagination';
Vue.component(ZPagination.name, ZPagination);

Vue.config.productionTip = false;
// Vue.prototype.$http = http;
Object.defineProperty(Vue.prototype, '$http', {
  get: () => Http
});
Object.defineProperty(Vue.prototype, '$utils', {
  get: () => Utils
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
