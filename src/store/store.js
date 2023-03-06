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
    clipsProfile: [],
    allProducts: [],
    profile: [],
    feed: [],
    feedAnchor: null,
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
      state.clipsProfile = [];
      state.allProducts = [];
      state.profile = [];
      state.feed = [];
      state.feedAnchor = null;
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
    setAllProducts(state, data) {
      state.allProducts = data;
    },
    setProfile(state, data) {
      state.profile = data;
    },
    setFeed(state, data) {
      state.feed = data;
    },
    setFeedAnchor(state, data) {
      state.feedAnchor = data;
    },
    setClipsProfile(state, data) {
      state.clipsProfile = data;
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
      return state.clipsTrending;
    },
    getClipsLatest(state) {
      return state.clipsLatest;
    },
    getClipsProfile(state) {
      return state.clipsProfile;
    },
    getProductsTrending(state) {
      return state.productsTrending;
    },
    getAllProducts(state) {
      return state.allProducts;
    },
    getProfile(state) {
      return state.profile;
    },
    getFeed(state) {
      return state.feed;
    },
    getFeedAnchor(state) {
      return state.feedAnchor;
    },
  }
});
