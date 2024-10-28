import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// Crée une nouvelle instance de store
export default createStore({
  state: () => ({
    user: [],
    lineItems: [],
    categories: [],
    shippingProducts: [],
    productsTrending: [],
    clipsTrending: [],
    clipsLatest: [],
    profile: [],
    product: [],
    suggestions: [],
    following: [],
    rules: true,
  }),
  mutations: {
    resetState(state) {
      state.user = [];
      state.lineItems = [];
      state.categories = [];
      state.shippingProducts = [];
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
    setShippingProducts(state, data) {
      state.shippingProducts = data;
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
    // asynchrone, pour des changements via dispatch
  },
  getters: {
    getUser: (state) => state.user,
    getLineItems: (state) => state.lineItems,
    getCategories: (state) => state.categories,
    getShippingProducts: (state) => state.shippingProducts,
    getClipsTrending: (state) => state.clipsTrending,
    getClipsLatest: (state) => state.clipsLatest,
    getProductsTrending: (state) => state.productsTrending,
    getProfile: (state) => state.profile,
    getProduct: (state) => state.product,
    getSuggestions: (state) => state.suggestions,
    getFollowing: (state) => state.following,
    getRules: (state) => state.rules,
  },
  plugins: [createPersistedState()],
});
