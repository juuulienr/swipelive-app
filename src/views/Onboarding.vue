<template>
  <main>
    <div class="checkout__header" style="padding: 5px 15px 15px; z-index: 10000000; background: white; width: 100%;">
      <div v-if="notif" class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Notifications</div>
      <div v-else class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Comment ça marche ?</div>
    </div>
    <div class="checkout__body" style="overflow: scroll; padding: 15px;">
      <div v-if="notif" class="step1">
        <h5 style="font-weight: 600; margin-bottom: 7px; font-size: 25px; text-align: center; margin-top: 30px;">Soyez informé !</h5>
        <div style="font-weight: 500;font-size: 17px; text-align: center; margin-top: 12px;">Swipe Live fonctionne mieux avec les notifications. Activez les pour profiter pleinement de l'application.</div>
        <div class="container" style="margin: 60px auto 0px;">
          <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" :width="300"/>
        </div>
        <div @click="allowNotif()" class="btn-swipe" style="color: white; position: fixed; bottom: calc(env(safe-area-inset-bottom) + 30px); text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">Activer les notifications</div>
      </div>

      <div v-if="step1" class="step1">
        <h5 style="font-weight: 600; margin-bottom: 7px; font-size: 25px; text-align: center; margin-top: 30px;">Glisser vers le haut</h5>
        <div style="font-weight: 500;font-size: 17px; text-align: center;">Pour passer d'un live à un autre</div>
        <div class="container">
          <video style="height: 300px; width: 300px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/swipe-up.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
        </div>
        <div @click="goStep2()" class="btn-swipe" style="color: white; position: fixed; bottom: calc(env(safe-area-inset-bottom) + 30px); text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">J'ai compris</div>
      </div>

      <div v-if="step2" class="step2">
        <h5 style="font-weight: 600; margin-bottom: 7px; font-size: 25px; text-align: center; margin-top: 30px;">Glisser vers la gauche</h5>
        <div style="font-weight: 500;font-size: 17px; text-align: center;">Pour voir le profil du présentateur</div>
        <div class="container">
          <video style="height: 300px; width: 300px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/swipe-left.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
        </div>
        <div @click="goStep3()" class="btn-swipe" style="color: white; position: fixed; bottom: calc(env(safe-area-inset-bottom) + 30px); text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">J'ai compris</div>
      </div>

      <div v-if="step3" class="step3">
        <h5 style="font-weight: 600; margin-bottom: 7px; font-size: 25px; text-align: center; margin-top: 30px;">Glisser vers la droite</h5>
        <div style="font-weight: 500;font-size: 17px; text-align: center;">Pour accéder à ta page d'accueil personnalisée</div>
        <div class="container">
          <video style="height: 300px; width: 300px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/swipe-right.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
        </div>
        <div @click="goFeed()" class="btn-swipe" style="color: white; position: fixed; bottom: calc(env(safe-area-inset-bottom) + 30px); text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">Tout est OK</div>
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
  height: 375px;
  padding: 0;
  border-radius: 10px;
}

main .container .arrow-swipe {
 fill: #fff;
 height: 16em;
}

main .container .pointer {
 fill: #fff;
 height: 9em;
 position: absolute;
 bottom: 3em;
 left: 50%;
 transform: translateX(-50%);
 animation: swipe-up 2s infinite ease-in-out;
}

main .container .copy {
 fill: #fff;
 height: 1.5em;
 position: absolute;
 bottom: 2.5em;
}

@keyframes swipe-up {
 40%, 100% {
   bottom: 11em;
 }
}
 
</style>

<script>

import AuthAPI from "../services/authAPI.js";
import Lottie from 'vue-lottie';
import * as animationData from '../assets/img/bell.json';

export default {
  name: 'Onboarding',
  components: {
    'lottie': Lottie
  },
  data() {
    return {
      defaultOptions: {animationData: animationData},
      animationSpeed: 1,
      notif: true,
      step1: false,
      step2: false,
      step3: false,
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
      this.anim.setSpeed(this.animationSpeed);
    },
    allowNotif() {
      this.notif = false;
      this.step1 = true;
      this.step2 = false;
      this.step3 = false;
    },
    goStep2() {
      this.notif = false;
      this.step1 = false;
      this.step3 = false;
      this.step2 = true;
    },
    goStep3() {
      this.notif = false;
      this.step1 = false;
      this.step2 = false;
      this.step3 = true;
    },
    goFeed() {
      this.$router.push({ name: 'Feed' });
    }
  }  
};
</script>