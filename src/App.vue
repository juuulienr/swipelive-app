<template>
  <router-view />
  <NavBar v-if="showNavbar" :lineItems="lineItems" />
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { useMainStore } from '@/stores/useMainStore';

export default {
  name: 'app',
  components: { NavBar },
  data() {
    const mainStore = useMainStore();
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: mainStore.user,
      pingInterval: null,
      showNavbar: ["Home", "Search", "Account", "Category", "Cart"].includes(this.$route.name)
    };
  },
  computed: {
    lineItems() {
      const mainStore = useMainStore();
      return mainStore.lineItems;
    } 
  },
  watch: {
    $route(to) {
      this.showNavbar = ["Home", "Search", "Account", "Category", "Cart"].includes(to.name);
    }
  },
  created() {
    this.loadCategories();
    this.created();
  },
  mounted() {
    this.ping();
    this.pingInterval = setInterval(() => {
      const mainStore = useMainStore();
      this.user = mainStore.user;
      this.token = window.localStorage.getItem("token");
      this.ping();
    }, 240000); // 4 min
  },
  beforeDestroy() {
    clearInterval(this.pingInterval);
  },
  methods: {
    async ping() {
      if (this.user && this.token) {
        try {
          await this.$CapacitorHttp.request({
            method: 'GET',
            url: `${this.baseUrl}/user/api/ping`,
            headers: { Authorization: `Bearer ${this.token}` }
          });
        } catch (error) {
          console.error("Ping error:", error);
        }
      }
    },
    async loadCategories() {
      const mainStore = useMainStore();
      if (mainStore.categories.length === 0) {
        try {
          const response = await this.$CapacitorHttp.request({
            method: 'GET',
            url: `${this.baseUrl}/api/categories`,
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
          }); 
          console.log(response.data);
          mainStore.setCategories(response.data);
        } catch (error) {
          console.error("Load categories error:", error);
        }
      }
    },
    async created() {
      try {
        await this.$CapacitorHttp.request({
          method: 'GET',
          url: this.baseUrl + "/user/api/profile",
          headers: {
            Authorization: "Bearer " + this.token,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
@import './assets/css/bootstrap.css';
@import './assets/css/main.css';
</style>
