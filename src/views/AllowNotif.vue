<template>
  <main>
    <div class="checkout__header" style="padding: 5px 15px 15px; z-index: 10000000; background: white; width: 100%;">
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Notifications</div>
    </div>
    <div class="checkout__body" style="overflow: scroll; padding: 15px;">
      <h5 style="font-weight: 600; margin-bottom: 0px; font-size: 25px; text-align: center; margin-top: 30px;">Soyez informé !</h5>
      <br />
      <div style="font-weight: 500;font-size: 15px; text-align: left;">Swipe Live fonctionne mieux avec les notifications. Activez les pour profiter pleinement de l'application.
      </div>

      <div style="margin: 60px auto 0px;">
        <lottie :options="defaultOptions" v-on:animCreated="handleAnimation"/>
      </div>

      <div style="color: white;position: fixed; bottom: calc(env(safe-area-inset-bottom) + 30px); text-align: center; width: calc(100vw - 30px);line-height: 1.41176;letter-spacing: -0.025em;padding: 15px 15px 0px; background: transparent;">
        <div @click="notif()" class="btn-swipe" style="color: white;text-align: center;line-height: 1.41176;letter-spacing: -0.025em;">Activer les notifications</div>
      </div>
      <!-- <div style="color: #929dad; margin: 10px; color: rgb(146, 157, 173); position: fixed; bottom: 35px; font-weight: 400; left: calc(50vw - 30px);">Passer pour l'instant</div> -->
    </div>
  </main>
</template>

<style>

.checkout__body::-webkit-scrollbar {
  display: none;
}
.checkout__body {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

</style>

<script>

import AuthAPI from "../services/authAPI.js";
import Lottie from 'vue-lottie';
import * as animationData from '../assets/img/bell.json';

export default {
  name: 'AllowNotif',
  components: {
    'lottie': Lottie
  },
  data() {
    return {
      defaultOptions: {animationData: animationData},
      animationSpeed: 1,
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
    },
    handleAnimation: function (anim) {
      this.anim = anim;
      this.anim.setSpeed(this.animationSpeed);
    },
  }  
};
</script>