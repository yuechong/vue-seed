/**
 * comm data vuex
 * session Data数据模块
 */

const State = {
  // 减速机型号数据
  reducerModelInfo: {},
  reducerForm: {},
  sensorForm: {},
  bearingForm: {}
};

// getters
const Getters = {
  reducerModelInfo: state => state.reducerModelInfo,
  reducerForm: state => state.reducerForm,
  sensorForm: state => state.sensorForm,
  bearingForm: state => state.bearingForm
};

// mutations
const Mutations = {
  reset: state => {
    const s = {
      reducerModelInfo: {},
      reducerForm: {},
      sensorForm: {},
      bearingForm: {}
    };
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
  },
  SET_reducerModelInfo: (state, reducerModelInfo) => {
    state.reducerModelInfo = { ...reducerModelInfo };
  },
  SET_reducerForm: (state, reducerForm) => {
    state.reducerForm = { ...reducerForm };
  },
  SET_sensorForm: (state, sensorForm) => {
    state.sensorForm = { ...sensorForm };
  },
  SET_bearingForm: (state, bearingForm) => {
    state.bearingForm = { ...bearingForm };
  }
};
// actions
const Actions = {
  //  保存减速机型号基础数据
  storeReducerModelInfo({ commit }, reducerModelInfo) {
    commit('SET_reducerModelInfo', reducerModelInfo);
  },
  // 保存减速机form表单
  storeReducerForm({ commit }, reducerForm) {
    commit('SET_reducerForm', reducerForm);
  },
  // 保存减速机传感器form表单
  storeSensorForm({ commit }, sensorForm) {
    commit('SET_sensorForm', sensorForm);
  },
  storeBearingForm({ commit }, bearingForm) {
    commit('SET_bearingForm', bearingForm);
  },
  clearState({ commit }) {
    commit('reset');
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
