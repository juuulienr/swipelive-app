<template>
  <div id="app">
    <router-view/>
    <NavBar v-if="showNavbar"/>
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
      user: JSON.parse(window.localStorage.getItem("user")),
      pingInterval: null,
      showNavbar: false
    }
  },
  created() {
    if (this.$route.name == "Home" || this.$route.name == "ListMessages" || this.$route.name == "Account" || this.$route.name == "Category") {
      this.showNavbar = true;
    } else {
      this.showNavbar = false;
    }
  },
  mounted() {
    this.ping();
    this.pingInterval = setInterval(() => {
      this.user = JSON.parse(window.localStorage.getItem("user"));
      this.token = window.localStorage.getItem("token");
      this.ping();
    }, 240000); //4 min
  },
  updated() {
    if (this.$route.name == "Home" || this.$route.name == "ListMessages" || this.$route.name == "Account" || this.$route.name == "Category") {
      this.showNavbar = true;
    } else {
      this.showNavbar = false;
    }
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
    }
  }
};
</script>
