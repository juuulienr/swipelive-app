<template>
  <main class="products" style="padding: 0px 15px 15px;">
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
            <Lottie :options="defaultOptions" :width="200"/>
          </div>
        </div>
        <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Bientôt disponible</h5>
        <div style="font-weight: 400;font-size: 15px;text-align: center;">Augmentez vos ventes avec l'aide des influenceurs.</div>
      </div>

      <div @click="toast()">show toast</div>


      <div class="toast-inactive" id="toast">
        <img v-if="user.picture" :src="cloudinary256x256 + user.picture" style="border-radius: 50%; width: 85px; height: 85px; object-fit: cover; position: absolute; z-index: 100000000; border: 4px solid white; margin-bottom: 90px;" />
        <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%; width: 85px; height: 85px; object-fit: cover; position: absolute; z-index: 100000000; border: 4px solid white; margin-bottom: 90px;" />
        {{ user.firstname }} {{ user.lastname }}
      </div>
    </div>
  </main>
</template>


<style>

.toast-inactive{
  width: 130px;
  padding: 10px;
  margin-top: -550px;
  background-color: #fff;
  color: #9137A6;
  border-radius: 10px 10px;
  font-size: 18px;
  visibility: hidden;
  opacity: 0;
}

.toast-active{
  width: 130px;
  padding: 10px;
  margin-top: -550px;
  background-color: #fff;
  color: #9137A6;
  border-radius: 10px 10px;
  font-size: 18px;
  visibility: visible;
  opacity: 0;
  animation-name: toast;
  animation-duration: 3s;
}

@keyframes toast{
  5%,95%{opacity: 1; margin-left: 100px}
  15%,85%{opacity: 1; margin-left: 50px}
}

</style>

<script>
import Lottie from 'vue-lottie';
import * as animationData from '../../assets/lottie/partner.json';

export default {
  name: 'ListPartners',
  components: {
    Lottie,
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      defaultOptions: {animationData: animationData},
      user: this.$store.getters.getUser,
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");


    this.toast();
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Account' });
    },
    toast() {
      let ts = document.getElementById("toast");
      ts.className = "toast-active";
      setTimeout(() => { 
        ts.className = ts.className.replace("toast-active", "toast-inactive"); 
      }, 4000);
    }
  }
};

</script>

