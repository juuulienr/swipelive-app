<template>
  <main style="padding: 15px;">
    <div class="checkout__header" style="padding: 5px 5px 40px 5px;">
      <div @click="open()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Inscription vendeur</div>
    </div>
    <div style="margin-bottom: 20px;">
      <div style="font-weight: 500; margin-bottom: 20px; text-align: center; font-size: 16px;">Selectionner le type de vendeur :</div>
      <div style="display: flex; justify-content: space-between;">
        <div @click="goStep2('company')" style="width: 48%; text-align: center; padding: 20px; border: 1px solid #ccc; border-radius: 16px; border: 1px solid #e0e3eb;box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px;">
          <img :src="require('@/assets/img/store.png')" style="width: 24px; min-height: 24px; width: 32px; min-height: 32px; background-repeat: no-repeat; background-size: cover; background-position: 50%; margin-bottom: 20px;"/>
          <div style="font-size: 15px; font-size: 15px; color: #525c66; font-weight: 500;">Professionnel</div>
        </div>
        <div @click="goStep2('individual')" style="width: 48%; text-align: center; padding: 20px; border: 1px solid #ccc; border-radius: 16px; border: 1px solid #e0e3eb;box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px;">
          <img :src="require('@/assets/img/star.png')" style="width: 32px; min-height: 32px; background-repeat: no-repeat; background-size: cover; background-position: 50%; margin-bottom: 20px;"/>
          <div style="font-size: 15px; color: #525c66; font-weight: 500;">Particulier</div>
        </div>
      </div><br>

      <div style="font-weight: 500; margin-bottom: 20px; text-align: center; font-size: 16px;">Chaque  vendeur bénéficie :</div>
      <div class="informations" style="margin: 0px auto; padding: 15px 25px; width: 100%; border-radius: 10px; color: #00C566; border: 1px solid #00C566; line-height: 1.6; font-weight: 400; font-size: 14px;">
        <div>- Boutique intégrée</div>
        <div>- Lives et replay</div>
        <div>- Tarifs réduits sur les livraisons</div>
        <div>- Paiements intégrés et sécurisés</div>
        <div>- Messagerie instantanée</div>
        <div>- Notifications en temps réel</div>
        <div>- Diffusion sur les réseaux sociaux</div>
      </div>

      <div style="margin-top: 20px; text-align: center; margin: 15px;">
        Notre commission : 9% sur chaque vente. <br> <br> 

        <div style="font-weight: 400; text-align: left; font-size: 14px; color: #525c66;">
         5% de frais de service qui nous permettent de payer les salaires de notre équipe et de garder les lumières allumées.
         <br><br>
         + 3% de frais bancaire.
        </div> <br>  <br> 
        <span style="font-weight: 600; color: #ff2773; font-size: 20px;"> Vous gagnez, nous gagnons ! </span>
      </div>
    </div>
  </main>
</template>

<style scoped>
.bloc--container {
  border: 1px solid rgba(145, 158, 171, 0.32);
  background-image: none;
  overflow: hidden;
  position: relative;
  border-radius: 16px;
  z-index: 0;
  text-align: center;
}


.filter--choice > div > div {
    display: flex;
    margin: 8px 0px 0px;
    flex-flow: column wrap;
    margin-left: -11px;
    flex-direction: row;
}
.filter--choice > div > div > label {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
}
.filter--choice > div > div {
}
.filter--choice > div > div > label > span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    border-radius: 50%;
    color: #525c66;
    padding: 8px;
    line-height: 1.57143;
    font-size: 0.875rem;
    font-weight: 400;
    color: rgb(33, 43, 54);
}
.filter--choice > div > div > label > span > input {
    cursor: inherit;
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    margin: 0px;
    padding: 0px;
    z-index: 1;
}
.svg--checked {
    display: none;
    position: absolute;
}
.svg--point {
    display: none;
}
.filter--choice div label span input:checked ~ .svg--checked {
    display: block;
}
.filter--choice > div > div > label > span > svg {
    width: 20px;
    height: 20px;
    position: absolute;
    fill: #525c66;
}
.filter--choice > div > div > label > span > .svg--point {
    display: block !important;
}

.filter--choice > div > div {
    margin-left: 12px;
}
</style>


<script>

import AuthAPI from "../services/authAPI.js";

export default {
  name: 'VendorRegistrationStep1',
  data() {
    return {}
  },
  created() {
    var isAuthenticated = AuthAPI.isAuthenticated();
    if (isAuthenticated) {
      this.$router.push({ name: 'Feed' });
    }
    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
  },
  methods: {
    goStep2(businessType) {
      this.$router.push({ name: 'VendorRegistrationStep2', params: { businessType: businessType } });
    },
    goBack() {
      this.$router.push({ name: 'Welcome' });
    },
  }
};
</script>