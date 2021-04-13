/**
 *功能: 全局路由拦截器
 *
 */
import { scrollTo } from '@/utils/scrollTo';
import Store from '../store';

const topbar = require('topbar');

// 设置路由白名单
const whiteList = ['login', 'reg', 'callBack'];

const beforeEach = async (to, from, next) => {
  topbar.show();
  // 路由白名单
  if (whiteList.includes(to.name)) {
    next();
    return;
  }

  // console.log('to', to);
  // console.log('from', from);
  // token
  const token = Store.getters['user/token'];
  // console.log('isLogin',!token);
  if (!token) {
    if (from.name === 'login') {
      next('/login');
      return;
    }
    next({ path: '/login' });
    return;
  }
  // console.log('用户已经登陆 token:', token);
  next();
};

const afterEach = to => {
  topbar.hide();
  if (document.body.scrollTop > 0) {
    scrollTo(0, 30);
  }
};

export { beforeEach, afterEach };
