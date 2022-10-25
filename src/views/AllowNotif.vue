<template>
  <main>
    <div style="padding: 15px;">
      <div class="logo" style="margin: 0px auto 10px;">
        <img :src="require(`@/assets/img/notif2.png`)" style="width: 48px; height: 48px; margin-top: 30px;" />
        <span style="float: right; line-height: 50px; margin-right: 10px; font-size: 13px; color: #007bff;">PLUS TARD</span>
      </div>
      <h5 style="font-weight: 600; margin-bottom: 0px; font-size: 25px;">Soyez informé quand...</h5>
      <br />
      <div style="font-weight: 600; font-size: 16px;">Cela fonctionne mieux avec les notifications, bien mieux !</div>
      <img :src="require(`@/assets/img/notif.png`)" style="height: 350px; margin-top: 60px;"/>
      <div @click="notif()" class="btn-swipe" style="color: white; margin: 15px auto 0px; text-align: center; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); width: calc(100vw - 30px);">Autoriser les notifications</div>
    </div>
  </main>
</template>


<script>

import AuthAPI from "../services/authAPI.js";

export default {
  name: 'AllowNotif',
  data() {
    return {
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
  },
  mounted() {
  },
  methods: {
    notif() {
      this.$router.push({ name: 'Onboarding' });
    }
  }  
};
</script>