<template>
  <main style="padding: 0px 15px">
    <div class="checkout__body" style="margin-top: 30px;">
      <div v-if="notif" class="notif onboarding">
        <img src="/img/notif.png" style="width: 100%; margin-top: 30px;" />
        <h5 class="title" style="margin-top: 30px;">Soyez informé !</h5>
        <div class="subtitle">Swipe Live fonctionne mieux avec les notifications. Activez les pour profiter pleinement de l'application.</div>
        <div @click="allowNotif" class="btn-step">Activer les notifications</div>
      </div>

      <div v-if="step1" class="step1 onboarding">
        <div style="margin-top: 100px;">
          <h5 class="title">Glisser vers le haut</h5>
          <div class="subtitle">Pour passer d'un live à un autre</div>
          <div class="container" style="margin-top: 40px;">
            <Vue3Lottie :animationData="LottieJSON" style="width: 300px"/>
          </div>
        </div>
        <div @click="goFeed" class="btn-step">Commencer à regarder</div>
      </div>
    </div>
  </main>
</template>


<script>
import fcm from '../utils/fcm.js';
import LottieJSON from '../assets/lottie/swipe-up.json';

export default {
  data() {
    return {
      notif: true,
      step1: false,
      LottieData: LottieJSON
    };
  },
  methods: {
    allowNotif() {
      this.$Haptics.impact({ style: 'medium' });

      // if (window.cordova.platformId === "android" || window.cordova.platformId === "ios") {
        // fcm.onDeviceReady();
      // }
      
      this.notif = false;
      this.step1 = true;
    },
    goFeed() {
      this.$Haptics.impact({ style: 'medium' });
      this.$router.push({ name: 'Feed' });
    }
  }
};
</script>

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
  background: #ff2f80;
  padding: 16px 48px;
  font-weight: 500;
  border-radius: 10px;
  font-size: 15px;
}
</style>





