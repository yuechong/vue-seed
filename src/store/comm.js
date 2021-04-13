/**
 * comm data vuex
 * 通用数据模块
 */
import $http from '@/http';

const State = {
  //网关类型
  networkTypes: ['JCIG164130W'],
  // 减速机大类
  reducerMainTyps: ['JRT', 'JRH', 'JRP', 'JD', 'JRST', 'WP'],
  //减速机类型
  reducerTyps: [],
  // 传动类型
  bearingType: ['行星齿轮', '平行齿轮', '蜗轮蜗杆', '锥齿轮'],
  //行业分类
  industryTypes: [],
  // 客户列表
  customers: [],
  // 场景列表
  sceneList: [],
  // bearingList 轴承的全部列表
  bearingList: []
};

// getters
const Getters = {
  networkTypes: state => state.networkTypes,
  reducerMainTyps: state => state.reducerMainTyps,
  reducerTyps: state => state.reducerTyps,
  bearingType: state => state.bearingType,
  industryTypes: state => state.industryTypes,
  customers: state => state.customers,
  sceneList: state => state.sceneList,
  bearingList: state => state.bearingList
};

// mutations
const Mutations = {
  reset: state => {
    const s = {
      //网关类型
      networkTypes: ['JCIG164130W'],
      // 减速机大类
      reducerMainTyps: ['JRT', 'JRH', 'JRP', 'JD', 'JRST', 'WP'],
      //减速机类型
      reducerTyps: [],
      // 传动类型
      bearingType: ['行星齿轮', '平行齿轮', '蜗轮蜗杆', '锥齿轮'],
      //行业分类
      industryTypes: [],
      // 客户列表
      customers: [],
      // 场景列表
      sceneList: [],
      // bearingList 轴承的全部列表
      bearingList: []
    };
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
  },
  SET_Industry: (state, industryTypes) => {
    state.industryTypes = [...industryTypes];
  },
  SET_NetworkTypes: (state, networkTypes) => {
    state.networkTypes = [...networkTypes];
  },
  SET_Customers: (state, customers) => {
    state.customers = [...customers];
  },
  SET_SceneList: (state, sceneList) => {
    state.sceneList = [...sceneList];
  },
  SET_reducerTyps: (state, reducerTyps) => {
    state.reducerTyps = [...reducerTyps];
  },
  SET_BearingList: (state, bearingList) => {
    state.bearingList = [...bearingList];
  }
};
// actions
const Actions = {
  // 网关
  storeNetworkTypes({ commit }) {
    commit('SET_NetworkTypes', ['JCIG164130W']);
  },
  //  行业
  storeIndustry({ commit }) {
    $http
      .get('/business/list', { offset: 0, limit: 1000 })
      .then(({ data }) => {
        // if (data['success']) {
        commit('SET_Industry', data['data']);
        // }
      })
      .catch(err => {});
  },
  // 减速机类型
  storeReducerTyps({ commit }) {
    $http
      .get('/reducer/category/list', { offset: 0, limit: 4000 })
      .then(({ data }) => {
        // if (data['success']) {
        commit('SET_reducerTyps', data['data']);
        // }
      })
      .catch(err => {});
  },
  // 客户
  storeCustomers({ commit }) {
    $http
      .get('/customer/list', { offset: 0, limit: 4000 })
      .then(({ data }) => {
        // if (data['success']) {
        commit('SET_Customers', data['data']);
        // }
      })
      .catch(err => {});
  },
  // 场景
  storeSceneList({ commit }) {
    $http
      .get('/scene/list', { offset: 0, limit: 1000 })
      .then(({ data }) => {
        // if (data['success']) {
        commit('SET_SceneList', data['data']);
        // }
      })
      .catch(err => {});
  },
  // 轴承列表
  storeBearingList({ commit }) {
    $http
      .get('/bearing/list', { offset: 0, limit: 10000 })
      .then(({ data }) => {
        // if (data['success']) {
        commit('SET_BearingList', data['data']);
        // }
      })
      .catch(err => {});
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
