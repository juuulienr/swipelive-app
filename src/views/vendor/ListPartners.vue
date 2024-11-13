<template>
  <main class="products" style="padding: 0px 15px">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Partenariats</div>
    </div>

    <div class="checkout__body">
      <div>
        <div class="container" style="margin: 120px auto 0px; text-align: center;">
          <div style="margin: 0px auto;">
            <Vue3Lottie :animationData="LottieJSON" :width="200"/>
          </div>
        </div>
        <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Bientôt disponible</h5>
        <div style="font-weight: 400;font-size: 15px;text-align: center;">Augmentez vos ventes avec l'aide des influenceurs.</div>
      </div>
    </div>
  </main>
</template>


<script>
import { useMainStore } from '../../stores/useMainStore.js';
import LottieJSON from '../../assets/lottie/partner.json';

export default {
  name: 'ListPartners',
  data() {
    const mainStore = useMainStore();

    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      LottieJSON: LottieJSON,
      user: mainStore.getUser,
    };
  },
  created() {    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");
  },
  methods: {
    goBack() {
      window.plugins.nativepagetransitions.slide({
        direction: 'right',
        duration: 400,
        iosdelay: 0,
        androiddelay: 0,
        winphonedelay: 0,
        slowdownfactor: 1,
      });
      this.$router.push({ name: 'Account' });
    },
  }
};
</script>
