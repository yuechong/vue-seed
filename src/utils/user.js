/**
 * 用户管理
 * zyc
 *20210101
 */

/**
 * 用户登录
 * @param {*} param0
 * @param {*} token
 * @param {*} form
 */
function loginCallback({ $router, $store }, token, form) {
  window.localStorage.setItem('token', token);
  // 保存数据
  $store.dispatch('user/storeLoginData', form);
  // 拉取路由
  $store.dispatch('user/loadRoute').then(() => {
    $router.push('/');
  });
}

/**
 * 用户退出
 * @param {*} param0  this
 */
function logout({ $router, $store }) {
  window.localStorage.removeItem('token');
  // 清空重置vuex，跳转登录页
  $store.dispatch('clearAll').then(() => {
    $router.push({ name: 'login' });
  });
}

function changeLocale({ $store }, locale) {}

export default { logout };
