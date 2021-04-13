/** 2018/12/22
 *作者: zyc
 *功能: 动态路由挂在配置
 */

 import Vue from 'vue';
 import VueRouter from 'vue-router';
 import routerMap from './router';  
 import { afterEach, beforeEach } from './intercepter';
 import Store from '../store';
 
 Vue.use(VueRouter);

 const createRouter = () =>
   new VueRouter({
     mode: 'history',
     base: process.env.BASE_URL,
     routes: [...routerMap]
   });
 
 const router = createRouter();
 
 /**
  * 路由初始化
  * 路由权限
  */
 router.onReady(() => {
   // 路由重定向
   const path = window.location.pathname;
   // console.log('onReady', path);
   const token = Store.getters['user/token']; // 判断用户已登录且已有权限
 
   if (token && path !== '/login') {
     Store.dispatch('user/storeAdminPath') // 请求动态路由
       .then(e => {
         // router.addRoutes(e.list); // 添加动态路由,这里不必用$addRoutes，因为刷新后就没有上一次的动态路由，故不必清除
       })
       .catch(() => {
         router.push('/login');
       });
   }
 });
 
 // 路由拦截
 router.beforeEach(beforeEach);
 router.afterEach(afterEach);
 
 // 重置
 export function resetRouter() {
   const newRouter = createRouter();
   router.matcher = newRouter.matcher; // the relevant part
 }
 
 export default router;
 