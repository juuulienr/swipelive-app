<template>
  <main class="cart">
    <div style="position: absolute; background: white; padding: 15px; width: 100%; z-index: 1000000000; text-align: center;">
      <svg @click="goBack()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823; float: left;">
        <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
      </svg>
      <h5 style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Paiement</h5>
    </div>
    <div class="checkout" style="margin-top: 50px;">
      <iframe v-if="url" :src="url" width="100%" height="100%" style="border: none; width: -webkit-fill-available; height: calc(100vh - 50px);"></iframe>
    </div>
  </main>
</template>



<script>

export default {
  name: 'Shipping',
  data() {
    return {
      url: this.$route.params.url,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      sendcloud_pk: window.localStorage.getItem("sendcloud_pk"),
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Shipping' });
    },
  }
};

</script>

