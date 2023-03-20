import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

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
    profile: [],
    product: [],
    suggestions: [],
    following: [],
    rules: true,
  },
  mutations: { 
    // synchronous, for change use commit
    resetState(state) {
      console.log(state);
      state.user = [];
      state.lineItems = [];
      state.categories = [];
      state.productsTrending = [];
      state.clipsTrending = [];
      state.clipsLatest = [];
      state.profile = [];
      state.product = [];
      state.suggestions = [];
      state.following = [];
      state.rules = true;
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
      state.clipsTrending = data;
    },
    setClipsLatest(state, data) {
      state.clipsLatest = data;
    },
    setProductsTrending(state, data) {
      state.productsTrending = data;
    },
    setProfile(state, data) {
      state.profile = data;
    },
    setProduct(state, data) {
      state.product = data;
    },
    setSuggestions(state, data) {
      state.suggestions = data;
    },
    setFollowing(state, data) {
      state.following = data;
    },
    setRules(state, data) {
      state.rules = data;
    },
  },
  actions: { 
    // asynchronous, for change use dispatch
  }, 
  modules: {},
  plugins: [createPersistedState()],
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
      return state.clipsTrending;
    },
    getClipsLatest(state) {
      return state.clipsLatest;
    },
    getProductsTrending(state) {
      return state.productsTrending;
    },
    getProfile(state) {
      return state.profile;
    },
    getProduct(state) {
      return state.product;
    },
    getSuggestions(state) {
      return state.suggestions;
    },
    getFollowing(state) {
      return state.following;
    },
    getRules(state) {
      return state.rules;
    },
  }
});
