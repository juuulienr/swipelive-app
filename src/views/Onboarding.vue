<template>
  <main style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 40px 5px;">
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Comment ça marche ?</div>
    </div>
    <div v-if="step1" class="step1">
      <div class="container">
        <img :src="require(`@/assets/img/swipe-up.png`)" style="width: 300px;">
      </div>
      <h5 style="font-weight: 500; margin-bottom: 0px; font-size: 25px; text-align: center; color: #000; line-height: 40px; margin-top: 20px;">
        Glisser vers le haut <br />
        pour passer au live suivant
      </h5>
      <div @click="next()" class="btn-swipe" style="color: white; position: fixed; bottom: calc(env(safe-area-inset-bottom) + 30px); text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">Suivant</div>
    </div>

    <div v-if="step2" class="step2">
      <div class="container">
        <img :src="require(`@/assets/img/swipe-left.png`)" style="width: 300px;">
      </div>
      <h5 style="font-weight: 500; margin-bottom: 0px; font-size: 25px; text-align: center; color: #000; line-height: 40px; margin-top: 20px;">
        Glisser vers la gauche <br />
        pour voir le profil
      </h5>
      <div @click="next2()" class="btn-swipe" style="color: white; position: fixed; bottom: calc(env(safe-area-inset-bottom) + 30px); text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">Suivant</div>
    </div>

    <div v-if="step3" class="step3">
      <div class="container">
        <img :src="require(`@/assets/img/swipe-right.png`)" style="width: 300px;">
      </div>
      <h5 style="font-weight: 500; margin-bottom: 0px; font-size: 25px; text-align: center; color: #000; line-height: 40px; margin-top: 20px;">
        Glisser vers la droite <br />
        pour accéder à l'accueil
      </h5>
      <div @click="goFeed()" class="btn-swipe" style="color: white; position: fixed; bottom: calc(env(safe-area-inset-bottom) + 30px); text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">J'ai compris</div>
    </div>
  </main>
</template>

<style scoped>


 main .container {
    margin-top: 30%;
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

export default {
  name: 'Onboarding',
  data() {
    return {
      step1: true,
      step2: false,
      step3: false,
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
  },
  mounted() {
  },
  methods: {
    next() {
      this.step1 = false;
      this.step3 = false;
      this.step2 = true;
    },
    next2() {
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