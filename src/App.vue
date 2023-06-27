<template>
  <div id="app">
    <router-view/>
    <NavBar ref="navbar" :lineItems="lineItems" v-if="showNavbar"/>
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
      lineItems: this.$store.getters.getLineItems,
      user: this.$store.getters.getUser,
      pingInterval: null,
      showNavbar: false
    }
  },
  created() {
    if (this.$route.name == "Home" || this.$route.name == "Search" || this.$route.name == "Account" || this.$route.name == "Category" || this.$route.name == "Cart") {
      this.showNavbar = true;
    } else {
      this.showNavbar = false;
    }
    this.updateLineItems();
    this.loadCategories();
  },
  mounted() {
    this.ping();
    this.pingInterval = setInterval(() => {
      this.user = this.$store.getters.getUser;
      this.token = window.localStorage.getItem("token");
      this.ping();
    }, 240000); //4 min
  },
  updated() {
    this.lineItems = this.$store.getters.getLineItems;
    if (this.$route.name == "Home" || this.$route.name == "Search" || this.$route.name == "Account" || this.$route.name == "Category" || this.$route.name == "Cart") {
      this.showNavbar = true;
    } else {
      this.showNavbar = false;
    }
    this.loadCategories();
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
    updateLineItems() {
      this.lineItems = this.$store.getters.getLineItems;
    },
    loadCategories() {
      if (this.$store.getters.getCategories.length == 0) {
        window.cordova.plugin.http.get(this.baseUrl + "/api/categories", {}, { 'Content-Type':  'application/json; charset=UTF-8' }, (response) => {
          this.$store.commit('setCategories', JSON.parse(response.data));
          console.log(response);
        }, (response) => {
          console.log(response.error);
        });
      }
    },
  }
};
</script>
