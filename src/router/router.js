export default [
  // 重定向
  // {
  //   path: '/redirect',
  //   component: () => import(/* webpackChunkName: "home" */ '@/views/layout/index'),
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path*',
  //       component: () => import('@/views/redirect/index')
  //     }
  //   ]
  // },
  // 登录页
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Login/index')
  },
  // // 忘记密码页
  // {
  //   name: 'forget',
  //   path: '/forget',
  //   component: () => import(/* webpackChunkName: "page" */ '@/views/ForgetPage/index')
  // },
  // // 注册页
  // {
  //   name: 'reg',
  //   path: '/reg',
  //   component: () => import(/* webpackChunkName: "page" */ '@/views/RegPage/index')
  // }
  // {
  //   path: '*',
  //   redirect: '/login'
  // }

  // // 404
  // {
  //   path: '*',
  //   name: '404',
  //   component: () => import(/* webpackChunkName: "404" */ '@/views/LoginPage/404')
  // }
];
