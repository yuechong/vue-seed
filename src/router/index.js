/** 2018/12/22
 *作者: zyc
 *功能: 路由挂在配置
 */

 import Vue from 'vue';
 import VueRouter from 'vue-router';
 import routerMap from './router';  
 import routerApp from './router-app';
 import { afterEach, beforeEach } from './intercepter';
 
 Vue.use(VueRouter);
 const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   routes: [...routerMap,routerApp()]
 });
 
 // 路由拦截
 router.beforeEach(beforeEach);
 router.afterEach(afterEach);
 
 export default router;
 