import Vue from 'vue';
import Vuex from 'vuex';
// vuex持久化缓存
import createPersistedState from 'vuex-persistedstate';

/**
 * import model vuex js
 */
import user from './user';
import comm from './comm';
import session from './session';
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'aiit_jie',
      paths: ['user', 'comm']
    })
  ],
  actions: {
    clearAll({ commit }) {
      // console.log('clear all vuex');
      commit('user/reset');
      commit('comm/reset');
    }
  },
  modules: {
    user,
    comm,
    session
  }
});
