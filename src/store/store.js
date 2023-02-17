import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Create a new store instance.
export default new Vuex.Store({
  state: {
    count: 50
  },
  mutations: { 
    // synchronous
    // change use commit
    setCount(state, data) {
      state.count = data;
    }
  },
  actions: { 
    // asynchronous
    // change use dispatch
  }, 
  modules: {},
  getters: {
    getCount(state) {
      return state.count;
    }
  }
});
