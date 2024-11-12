import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'; // Utilise VueUse pour une persistance similaire à vuex-persistedstate

export const useMainStore = defineStore('main', {
  // `state` correspond aux données du store
  state: () => ({
    user: useStorage('user', []),
    lineItems: useStorage('lineItems', []),
    categories: useStorage('categories', []),
    shippingProducts: useStorage('shippingProducts', []),
    productsTrending: useStorage('productsTrending', []),
    clipsTrending: useStorage('clipsTrending', []),
    profile: useStorage('profile', []),
    product: useStorage('product', []),
    following: useStorage('following', []),
    rules: useStorage('rules', true),
  }),

  // `getters` pour les propriétés calculées
  getters: {
    getUser: (state) => state.user,
    getLineItems: (state) => state.lineItems,
    getCategories: (state) => state.categories,
    getShippingProducts: (state) => state.shippingProducts,
    getClipsTrending: (state) => state.clipsTrending,
    getProductsTrending: (state) => state.productsTrending,
    getProfile: (state) => state.profile,
    getProduct: (state) => state.product,
    getFollowing: (state) => state.following,
    getRules: (state) => state.rules,
  },

  // `actions` pour des mutations et requêtes asynchrones
  actions: {
    resetState() {
      this.user = [];
      this.lineItems = [];
      this.categories = [];
      this.shippingProducts = [];
      this.productsTrending = [];
      this.clipsTrending = [];
      this.profile = [];
      this.product = [];
      this.following = [];
      this.rules = true;
    },
    setUser(data) {
      this.user = data;
    },
    setLineItems(data) {
      this.lineItems = data;
    },
    setCategories(data) {
      this.categories = data;
    },
    setShippingProducts(data) {
      this.shippingProducts = data;
    },
    setClipsTrending(data) {
      this.clipsTrending = data;
    },
    setProductsTrending(data) {
      this.productsTrending = data;
    },
    setProfile(data) {
      this.profile = data;
    },
    setProduct(data) {
      this.product = data;
    },
    setFollowing(data) {
      this.following = data;
    },
    setRules(data) {
      this.rules = data;
    },
  },
});
