import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useMainStore = defineStore('main', {
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
  actions: {
    resetState() {
      this.$patch({
        user: [],
        lineItems: [],
        categories: [],
        shippingProducts: [],
        productsTrending: [],
        clipsTrending: [],
        profile: [],
        product: [],
        following: [],
        rules: true,
      });
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
