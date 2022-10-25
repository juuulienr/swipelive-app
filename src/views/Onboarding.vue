<template>
  <main style="background: #fe2c55;">
    <h5 style="font-weight: 600; margin-bottom: 0px; font-size: 25px; text-align: center; color: white; line-height: 42px; margin-top: calc(env(safe-area-inset-bottom) + 30px);">Comment ça marche ?</h5>
    <div v-if="step1" class="step1">
      <div class="container" style="margin-top: 30%;">
        <svg viewBox="0 0 231.89 282.51" class="arrow-swipe">
          <g class="dots">
            <path d="M107.37 215.1v.64a5.94 5.94 0 0 0 11.85.64v-1.28a5.93 5.93 0 0 0-11.83-1v.32c0 .1-.03.47-.02.68z" class="dot5"></path>
            <path d="M107.37 179.42v.63a5.93 5.93 0 0 0 11.83 1v-.32-1.27a5.93 5.93 0 0 0-11.83-.95v.3z" class="dot4"></path>
            <path d="M107.37 146.4v.6a5.94 5.94 0 0 0 11.85.64v-1.27a5.93 5.93 0 0 0-11.83-1v.32c0 .11-.03.5-.02.71z" class="dot3"></path>
            <path d="M107.37 113.79v.64a5.94 5.94 0 0 0 11.85 0v-.64a5.94 5.94 0 0 0-11.85 0z" class="dot2"></path>
            <path d="M107.37 82.51v.63a5.94 5.94 0 0 0 11.85.64v-1.27a5.94 5.94 0 0 0-11.85-.64 4.56 4.56 0 0 0 0 .64z" class="dot1"></path>
            <path
            d="M108.8 16.7L90.94 34.42a6.16 6.16 0 0 0-.47 8.48 5.93 5.93 0 0 0 8.33.42l.26-.19 5.1-5.12a1.8 1.8 0 0 1 2.52-.34 1.77 1.77 0 0 1 .69 1.67v13.49a6.19 6.19 0 0 0 5.63 6.26 5.93 5.93 0 0 0 6.22-5.62 1.5 1.5 0 0 0 0-.3V39.34a1.8 1.8 0 0 1 3.22-1.34l3.93 3.93a6.17 6.17 0 0 0 8.39.45 5.93 5.93 0 0 0 .45-8.35l-.23-.24-17.09-17.1a6.52 6.52 0 0 0-9.09 0z"
            class="arrow"
            ></path>
          </g>
        </svg>
        <svg viewBox="0 0 231.89 160.848" class="pointer">
          <g class="pointer-assets">
            <circle cx="111.54" cy="37.68" r="37.68" opacity=".2" fill="#fff" style="isolation: isolate;"></circle>
            <circle cx="111.54" cy="37.68" r="23.55" opacity=".5" fill="#fff" style="isolation: isolate;"></circle>
            <path
            d="M119.84 33.91a7.52 7.52 0 0 0-10.48-1.84l-.44.3a9.55 9.55 0 0 0-2.35 13.31l7.05 10.79 15.57 23.76c.33.83 11.56 17.06 11.56 17.06-2.33-.43-5-1-7.41-1.52-5.69-1.33-13.23.38-17.44 2.67-2.21 1.2-3.59 2.58-4.07 4.09a13.19 13.19 0 0 0-.39 1.53c-.6 3.39.12 7.65 3.17 9a9.89 9.89 0 0 0 4.45.49c2.13-.07 5.33-.78 8.84.29 5.92 1.8 19.37 5.65 27.13 7.3 1.32-.07 4.64.52 5.9.35a42.52 42.52 0 0 1 8.95.26c1.11.28 6.09-.41 6.09-.41 4.27-.2 10.89-2.23 17.11-6.59s12.12-7.93 13.71-14.52l.23-.16-.09-.35a25.17 25.17 0 0 0-3.79-20l-19.95-28.5c-1-1.4-4.56-5.85-9.48-4.51a8.47 8.47 0 0 0-5 3.88l-.34.27-.11.08a7.29 7.29 0 0 0-8.26-1.23 10.1 10.1 0 0 0-5.52 5.82c-3.17-1.83-6.7-1.47-9.92 1.22a10.23 10.23 0 0 0-3.63 7.25l-21.1-30.1z"
            fill="#fafafc"
            ></path>
          </g>
        </svg>
      </div>
      <h5 style="font-weight: 600; margin-bottom: 0px; font-size: 25px; text-align: center; color: white; line-height: 40px; margin-top: 20px;">
        Glisser vers le haut <br />
        pour passer au live suivant
      </h5>
      <div @click="next()" class="btn-swipe" style="color: rgb(254, 44, 85); margin: 0px 20px; text-align: center; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); width: calc(100vw - 40px); background: white;">Suivant</div>
    </div>

    <div v-if="step2" class="step2">
      <div class="container" style="margin-top: 30%; transform: rotate(270deg);">
        <svg viewBox="0 0 231.89 282.51" class="arrow-swipe">
          <g class="dots">
            <path d="M107.37 215.1v.64a5.94 5.94 0 0 0 11.85.64v-1.28a5.93 5.93 0 0 0-11.83-1v.32c0 .1-.03.47-.02.68z" class="dot5"></path>
            <path d="M107.37 179.42v.63a5.93 5.93 0 0 0 11.83 1v-.32-1.27a5.93 5.93 0 0 0-11.83-.95v.3z" class="dot4"></path>
            <path d="M107.37 146.4v.6a5.94 5.94 0 0 0 11.85.64v-1.27a5.93 5.93 0 0 0-11.83-1v.32c0 .11-.03.5-.02.71z" class="dot3"></path>
            <path d="M107.37 113.79v.64a5.94 5.94 0 0 0 11.85 0v-.64a5.94 5.94 0 0 0-11.85 0z" class="dot2"></path>
            <path d="M107.37 82.51v.63a5.94 5.94 0 0 0 11.85.64v-1.27a5.94 5.94 0 0 0-11.85-.64 4.56 4.56 0 0 0 0 .64z" class="dot1"></path>
            <path
            d="M108.8 16.7L90.94 34.42a6.16 6.16 0 0 0-.47 8.48 5.93 5.93 0 0 0 8.33.42l.26-.19 5.1-5.12a1.8 1.8 0 0 1 2.52-.34 1.77 1.77 0 0 1 .69 1.67v13.49a6.19 6.19 0 0 0 5.63 6.26 5.93 5.93 0 0 0 6.22-5.62 1.5 1.5 0 0 0 0-.3V39.34a1.8 1.8 0 0 1 3.22-1.34l3.93 3.93a6.17 6.17 0 0 0 8.39.45 5.93 5.93 0 0 0 .45-8.35l-.23-.24-17.09-17.1a6.52 6.52 0 0 0-9.09 0z"
            class="arrow"
            ></path>
          </g>
        </svg>
        <svg viewBox="0 0 231.89 160.848" class="pointer">
          <g class="pointer-assets">
            <circle cx="111.54" cy="37.68" r="37.68" opacity=".2" fill="#fff" style="isolation: isolate;"></circle>
            <circle cx="111.54" cy="37.68" r="23.55" opacity=".5" fill="#fff" style="isolation: isolate;"></circle>
          </g>
        </svg>
      </div>
      <h5 style="font-weight: 600; margin-bottom: 0px; font-size: 25px; text-align: center; color: white; line-height: 40px; margin-top: 20px;">
        Glisser vers la gauche <br />
        pour voir le profil du live
      </h5>
      <div @click="next2()" class="btn-swipe" style="color: rgb(254, 44, 85); margin: 0px 20px; text-align: center; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); width: calc(100vw - 40px); background: white;">Suivant</div>
    </div>

    <div v-if="step3" class="step3">
      <div class="container" style="margin-top: 30%; transform: rotate(90deg);">
        <svg viewBox="0 0 231.89 282.51" class="arrow-swipe">
          <g class="dots">
            <path d="M107.37 215.1v.64a5.94 5.94 0 0 0 11.85.64v-1.28a5.93 5.93 0 0 0-11.83-1v.32c0 .1-.03.47-.02.68z" class="dot5"></path>
            <path d="M107.37 179.42v.63a5.93 5.93 0 0 0 11.83 1v-.32-1.27a5.93 5.93 0 0 0-11.83-.95v.3z" class="dot4"></path>
            <path d="M107.37 146.4v.6a5.94 5.94 0 0 0 11.85.64v-1.27a5.93 5.93 0 0 0-11.83-1v.32c0 .11-.03.5-.02.71z" class="dot3"></path>
            <path d="M107.37 113.79v.64a5.94 5.94 0 0 0 11.85 0v-.64a5.94 5.94 0 0 0-11.85 0z" class="dot2"></path>
            <path d="M107.37 82.51v.63a5.94 5.94 0 0 0 11.85.64v-1.27a5.94 5.94 0 0 0-11.85-.64 4.56 4.56 0 0 0 0 .64z" class="dot1"></path>
            <path
            d="M108.8 16.7L90.94 34.42a6.16 6.16 0 0 0-.47 8.48 5.93 5.93 0 0 0 8.33.42l.26-.19 5.1-5.12a1.8 1.8 0 0 1 2.52-.34 1.77 1.77 0 0 1 .69 1.67v13.49a6.19 6.19 0 0 0 5.63 6.26 5.93 5.93 0 0 0 6.22-5.62 1.5 1.5 0 0 0 0-.3V39.34a1.8 1.8 0 0 1 3.22-1.34l3.93 3.93a6.17 6.17 0 0 0 8.39.45 5.93 5.93 0 0 0 .45-8.35l-.23-.24-17.09-17.1a6.52 6.52 0 0 0-9.09 0z"
            class="arrow"
            ></path>
          </g>
        </svg>
        <svg viewBox="0 0 231.89 160.848" class="pointer">
          <g class="pointer-assets">
            <circle cx="111.54" cy="37.68" r="37.68" opacity=".2" fill="#fff" style="isolation: isolate;"></circle>
            <circle cx="111.54" cy="37.68" r="23.55" opacity=".5" fill="#fff" style="isolation: isolate;"></circle>
          </g>
        </svg>
      </div>
      <h5 style="font-weight: 600; margin-bottom: 0px; font-size: 25px; text-align: center; color: white; line-height: 40px; margin-top: 20px;">
        Glisser vers la droite <br />
        pour accéder à l'accueil
      </h5>
      <div @click="goFeed()" class="btn-swipe" style="color: rgb(254, 44, 85); margin: 0px 20px; text-align: center; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); width: calc(100vw - 40px); background: white;">J'ai compris</div>
    </div>
  </main>
</template>

<style scoped>


 main .container {
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   background: #fe2c55;
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
    window.StatusBar.styleLightContent();
    window.StatusBar.overlaysWebView(true);
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