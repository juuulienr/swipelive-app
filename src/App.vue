<template>
  <div id="app">
    <router-view/>
    <NavBar :lineItems="lineItems" v-if="showNavbar"/>
  </div>
</template>

<style>
@import './assets/css/bootstrap.css';
@import './assets/css/main.css';
</style>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: 'app',
  components: { NavBar },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: this.$store.getters.getUser,
      pingInterval: null,
      showNavbar: false
    };
  },
  computed: {
    lineItems() {
      return this.$store.getters.getLineItems;
    }
  },
  watch: {
    $route(to) {
      this.showNavbar = ["Home", "Search", "Account", "Category", "Cart"].includes(to.name);
    }
  },
  created() {
    this.showNavbar = ["Home", "Search", "Account", "Category", "Cart"].includes(this.$route.name);
    this.loadCategories();
  },
  mounted() {
    this.ping();
    this.pingInterval = setInterval(() => {
      this.user = this.$store.getters.getUser;
      this.token = window.localStorage.getItem("token");
      this.ping();
    }, 240000); // 4 min
  },
  beforeDestroy() {
    clearInterval(this.pingInterval);
  },
  methods: {
    ping() {
      if (this.user && this.token) {
        window.cordova.plugin.http.get(this.baseUrl + "/user/api/ping", {}, { Authorization: "Bearer " + this.token }, (response) => {
          console.log(response);
        }, (response) => {
          console.log(response.error);
        });
      }
    },
    loadCategories() {
      if (this.$store.getters.getCategories.length === 0) {
        window.cordova.plugin.http.get(this.baseUrl + "/api/categories", {}, { 'Content-Type': 'application/json; charset=UTF-8' }, (response) => {
          this.$store.commit('setCategories', JSON.parse(response.data));
          console.log(response);
        }, (response) => {
          console.log(response.error);
        });
      }
    }
  }
};
</script>
