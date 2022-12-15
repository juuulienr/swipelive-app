<template>
  <main style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Inscription vendeur</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 15px; padding-top: 15px;">
      <div style="font-weight: 500; margin-bottom: 20px; text-align: center; font-size: 16px;">Selectionner le type de vendeur :</div>
      <div style="display: flex; justify-content: space-between;">
        <div @click="goStep2('company')" style="width: 48%; text-align: center; padding: 30px 20px; border-radius: 16px; border: 2px solid #ff2773;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: -webkit-fill-available;height: 32px;margin-bottom: 15px;">
            <path d="M547.69,286.8a102.1,102.1,0,0,0,16.4-3.6V480a32,32,0,0,1-32,32H84a32,32,0,0,1-32-32V283.2a125.89,125.89,0,0,0,16.4,3.6,135.49,135.49,0,0,0,18,1.2,132.81,132.81,0,0,0,29.51-3.8V384H500V284.2a127.12,127.12,0,0,0,29.51,3.8A138.38,138.38,0,0,0,547.69,286.8Z" class="fa-secondary" style="fill: #5234ff;"></path>
            <path d="M602,118.6c33.6,53.6,3.8,128-59,136.4a102.9,102.9,0,0,1-13.7.9,99.08,99.08,0,0,1-73.81-33.1A98.83,98.83,0,0,1,316,230.88a96.26,96.26,0,0,1-8.08-8.08,98.9,98.9,0,0,1-139.62,8,97.4,97.4,0,0,1-8-8,98.75,98.75,0,0,1-73.81,33.1,104.6,104.6,0,0,1-13.7-.9C10.12,246.5-19.58,172.1,14,118.6L78.83,15A32,32,0,0,1,106,0H510a32,32,0,0,1,27.07,15Z" class="fa-primary" style="fill: #ff2773;"></path>
          </svg>
          <div style="font-size: 14px;color: rgb(82, 92, 102);font-weight: 500;">Professionnel</div>
        </div>
        <div @click="goStep2('individual')" style="width: 48%; text-align: center; padding: 30px 20px; border-radius: 16px; border: 2px solid #ff2773;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: -webkit-fill-available; height: 32px; margin-bottom: 15px;">
            <path d="M352 128A128 128 0 1 1 224 0a128 128 0 0 1 128 128z" class="fa-secondary" style="fill: #ff2773;"></path>
            <path d="M313.6 288h-16.7a174.1 174.1 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48v-41.6A134.43 134.43 0 0 0 313.6 288z" class="fa-primary" style="fill: #5234ff;"></path>
          </svg>
          <div style="font-size: 14px;color: rgb(82, 92, 102);font-weight: 500;">Particulier</div>
        </div>
      </div>
      <div class="informations" style="margin: 40px auto; width: 100%; border-radius: 10px; color: black; font-weight: 400; font-size: 14px; text-align: left; padding: 0px 15px; line-height: 27px;">
        <div style="font-weight: 500; margin-bottom: 20px; text-align: center; font-size: 15px;">Chaque  vendeur bénéficie :</div>
        <div>- Boutique intégrée</div>
        <div>- Lives et replay</div>
        <div>- Tarifs réduits sur les livraisons</div>
        <div>- Paiements intégrés et sécurisés</div>
        <div>- Messagerie instantanée</div>
        <div>- Notifications en temps réel</div>
        <div>- Diffusion sur les réseaux sociaux</div>
      </div>

      <div style="margin-top: 20px; text-align: center; margin: 15px 15px 0px;">
        <div style="font-size: 16px;"> Notre commission : 9% sur chaque vente. </div>
        <div style="color: #ff2773; font-size: 16px;"> Vous gagnez, nous gagnons ! </div><br>
        <div style="font-weight: 400; text-align: left; font-size: 13px; color: #525c66;">
          5% de frais de service qui nous permettent de payer les salaires de notre équipe et de garder les lumières allumées + 3% de frais bancaire classique.
        </div> 
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
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
  },
  methods: {
    goStep2(businessType) {
      this.$router.push({ name: 'VendorRegistrationStep2', params: { businessType: businessType } });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
  }
};
</script>