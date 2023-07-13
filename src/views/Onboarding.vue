<template>
  <main style="padding: 0px 15px">
    <div class="checkout__body" style="margin-top: 30px;">
      <div v-if="notif" class="notif onboarding">
        <img :src="require(`@/assets/img/notif.png`)" style="width: 100%; margin-top: 30px;" />
        <h5 class="title" style="margin-top: 30px;">Soyez informé !</h5>
        <div class="subtitle">Swipe Live fonctionne mieux avec les notifications. Activez les pour profiter pleinement de l'application.</div>
        <div @click="allowNotif()" class="btn-step">Activer les notifications</div>
      </div>

      <div v-if="step1" class="step1 onboarding">
        <div style="margin-top: 100px;">
          <h5 class="title">Glisser vers le haut</h5>
          <div class="subtitle">Pour passer d'un live à un autre</div>
          <div class="container" style="margin-top: 40px;">
            <Lottie :options="defaultOptions" style="width: 300px"/>
          </div>
        </div>
        <div @click="goFeed()" class="btn-step">Commencer à regarder</div>
      </div>
    </div>
  </main>
</template>

<style scoped>

 main .container {
  margin-top: 10%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 0;
  border-radius: 10px;
}
 
.onboarding .title {
  font-weight: 600; 
  margin-bottom: 0px; 
  font-size: 28px; 
  text-align: center; 
  margin-top: 0px;
}

.onboarding .subtitle {
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  margin: 5px 20px;
}

.onboarding .btn-step {
  color: white; 
  position: fixed; 
  bottom: calc(env(safe-area-inset-bottom) + 30px); 
  text-align: center; 
  width: calc(100vw - 30px); 
  line-height: 1.41176; 
  letter-spacing: -0.025em;
  background: #ff2a80;
  padding: 16px 48px;
  font-weight: 500;
  border-radius: 10px;
  font-size: 15px;
}

</style>

<script>

import fcm from '../utils/fcm.js';
import Lottie from 'vue-lottie';
import * as animationData from '../assets/lottie/swipe-up.json';

export default {
  name: 'Onboarding',
  components: {
    Lottie
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      defaultOptions: {animationData: animationData},
      notif: true,
      step1: false,
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");
  },
  methods: {
    async allowNotif() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }

      if (window.cordova.platformId === "android" || window.cordova.platformId === "ios") {
        fcm.onDeviceReady();
        this.notif = false;
        this.step1 = true;
      }
    },
    goFeed() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }

      window.plugins.nativepagetransitions.slide({
        direction: 'left',
        duration: 400,
        iosdelay: 0,
        androiddelay: 0,
        winphonedelay: 0,
        slowdownfactor: 1,
      });

      this.$router.push({ name: 'Feed' });
    }
  }  
};
</script>