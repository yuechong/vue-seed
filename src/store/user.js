import $http from '@/http';
import generateRoutes from '../router/generateRoutes';

const State = {
  collapsed: false,
  loginData: {},
  user: {}, // 登录用户信息
  pathIds: [], // 权限id
  token: undefined,
  userRoutes: {},
  locale: 'zh-cn' //lang
};

// getters
const Getters = {
  collapsed: state => state.collapsed,
  token: state => state.token,
  user: state => state.user,
  loginData: state => state.loginData,
  pathIds: state => state.pathIds,
  userRoutes: state => state.userRoutes,
  locale: state => state.locale
};

// mutations
const Mutations = {
  reset: state => {
    const s = {
      collapsed: false,
      user: {}, // 登录用户信息
      pathIds: [], // 权限id
      token: undefined,
      userRoutes: {},
      locale: 'zh-cn'
    };
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
  },
  SET_collapsed: (state, collapsed) => {
    state.collapsed = collapsed;
  },
  SET_Token: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, user) => {
    state.user = { ...user };
  },
  // 保存权限id
  SET_PATHIDS: (state, list) => {
    let ids = list.map(item => item.id);
    state.pathIds = [...ids];
  },
  // 保存用户登录信息
  SET_LOGINDATA: (state, loginData) => {
    state.loginData = { ...loginData };
  },
  /**
   * 用户路由generate 逻辑
   */
  SET_UserRoutes: state => {
    generateRoutes(state.pathIds).then(routes => {
      let navData = {};
      try {
        navData = JSON.parse(JSON.stringify(routes));
        // eslint-disable-next-line no-empty
      } catch (error) {}
      state.userRoutes = { ...navData };
    });
  },
  /**
   * 中英文切换
   */
  SET_Locale: (state, locale) => {
    state.locale = locale;
  }
};
// actions
const Actions = {
  /**
   * 菜单menu 缩放
   * @param {*} param0
   * @param {*} collapsed
   */
  storeCollapsed({ commit }, collapsed) {
    commit('SET_collapsed', collapsed);
  },

  /**
   * 保存user token
   * @param {*} param0
   * @param {*} token
   */
  storeToken({ commit }, token) {
    commit('SET_Token', token);
  },
  // 保存登录信息
  storeLoginData({ commit }, loginData) {
    commit('SET_LOGINDATA', loginData);
  },
  /**
   * 设置语言
   * @param {*} param0
   * @param {*} locale
   */
  storeLocale({ commit }, locale) {
    commit('SET_Locale', locale);
  },
  /**
   * 保存用户信息
   * @param {*} param0
   * @param {*} user
   */
  storeUser({ commit }) {
    return new Promise((resolve, reject) => {
      $http
        .get('/auth/personal')
        .then(({ data }) => {
          commit('SET_USER', data);
          resolve(data);
          // } else {
          //   reject(data);
          // }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // 配置权限路径
  storeAdminPath({ commit }) {
    return new Promise((resolve, reject) => {
      $http
        .get('/auth/permission')
        .then(({ data }) => {
          // console.log('storeAdminPath', data);
          // if (data['success']) {
          commit('SET_PATHIDS', data['data']);
          commit('SET_UserRoutes');
          resolve(data);
          // } else {
          //   reject(data);
          // }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   * 路由loading
   * @param {*} param0
   */
  loadRoute({ commit }) {
    commit('SET_UserRoutes');
  }
};

export default {
  namespaced: true,
  strict: true,
  state: State,
  getters: Getters,
  actions: Actions,
  mutations: Mutations
};
