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
    suggestions: [],
    feed: [],
    feedAnchor: null,
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
      state.suggestions = [];
      state.feed = [];
      state.feedAnchor = null;
      console.log(state);
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
    setSuggestions(state, data) {
      state.suggestions = data;
    },
    setFeed(state, data) {
      state.feed = data;
    },
    setFeedAnchor(state, data) {
      state.feedAnchor = data;
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
    getSuggestions(state) {
      return state.suggestions;
    },
    getFeed(state) {
      return state.feed;
    },
    getFeedAnchor(state) {
      return state.feedAnchor;
    },
  }
});
