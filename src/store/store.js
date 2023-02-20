import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Create a new store instance.
export default new Vuex.Store({
  state: {
    categories: [],
    productsTrending: [],
    clipsTrending: [],
    clipsLatest: [],
    allProducts: [],
  },
  mutations: { 
    // synchronous, for change use commit
    setCategories(state, data) {
      state.categories = data;
    },
    setClipsTrending(state, data) {
      state.clipTrending = data;
    },
    setClipsLatest(state, data) {
      state.clipLatest = data;
    },
    setProductsTrending(state, data) {
      state.productsTrending = data;
    },
    setAllProducts(state, data) {
      state.allProducts = data;
    },
  },
  actions: { 
    // asynchronous, for change use dispatch
  }, 
  modules: {},
  getters: {
    getCategories(state) {
      return state.categories;
    },
    getClipsTrending(state) {
      return state.clipTrending;
    },
    getClipsLatest(state) {
      return state.clipLatest;
    },
    getProductsTrending(state) {
      return state.productsTrending;
    },
    getAllProducts(state) {
      return state.allProducts;
    },
  }
});
