import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Create a new store instance.
export default new Vuex.Store({
  state: {
    user: [],
    lineItems: [],
    categories: [],
    productsTrending: [],
    clipsTrending: [],
    clipsLatest: [],
    allProducts: [],
  },
  mutations: { 
    // synchronous, for change use commit
    resetState(state) {
      state.user = [];
      state.lineItems = [];
      state.categories = [];
      state.productsTrending = [];
      state.clipsTrending = [];
      state.clipsLatest = [];
      state.allProducts = [];
    },
    setUser(state, data) {
      state.user = data;
    },
    setLineItems(state, data) {
      state.lineItems = data;
    },
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
    getUser(state) {
      return state.user;
    },
    getLineItems(state) {
      return state.lineItems;
    },
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
