<template>
  <main>
    <div style="position: absolute; background: white; padding: 15px; width: 100%; z-index: 1000000000; text-align: center;">
      <svg @click="goBack()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823; float: left;">
        <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
      </svg>
      <h5 style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Inscription Vendeur</h5>
    </div>
    <div style="padding: 15px; margin-top: 50px; margin-bottom: 30px;">
      <div style="font-weight: 600; margin-bottom: 10px; text-align: center;">Chaque vendeur bénéficie :</div>
      <div class="informations" style="margin: 0px auto; background: rgba(84, 214, 44, 0.16); padding: 15px 25px; width: 100%; border-radius: 10px; color: rgb(34, 154, 22); font-size: 600; border: 1px solid rgb(34, 154, 22); line-height: 1.6;">
        <div style="font-weight: 500;">- Lives et replay</div>
        <div>- Boutique intégrée</div>
        <div>- Tarifs réduits sur les livraisons</div>
        <div>- Paiements intégrés et sécurisés</div>
        <div>- Notifications en temps réel</div>
      </div>

      <div style="margin-top: 10px; text-align: center; margin: 15px;">
        Notre commission : 0,70€ + 8% sur chaque vente. <span style="color: rgb(34, 154, 22); font-weight: 600;"> Vous gagnez, nous gagnons ! </span>
      </div>

      <div class="account-type" style="margin-top: 25px;">
        <div class="bloc--container" style="padding: 20px; margin: 0px auto; text-align: left;">
          <h5 style="text-align: center; font-weight: 600; font-size: 15px; text-transform: uppercase;">Professionnel</h5><br/>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px; height: 20px; fill: rgb(0, 171, 85); margin-right: 10px;">
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"
              ></path>
            </svg>
            Retrait illimité
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px; height: 20px; fill: rgb(0, 171, 85); margin-right: 10px;">
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"
              ></path>
            </svg>
            Badge Vendeur PRO
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px; height: 20px; fill: rgb(0, 171, 85); margin-right: 10px;">
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"
              ></path>
            </svg>
            Kbis + Pièce d'identité obligatoire
          </div>
          <div @click="goStep2('company')" class="btn-swipe" style="color: white; text-align: center; width: fit-content; background: #fe2c55; margin: 0px auto; padding: 5px 24px; border: 1px solid #fe2c55; border-radius: 8px; font-size: 13px; font-weight: 600; margin-top: 20px;">Sélectionner</div>
        </div><br>
        <div class="bloc--container" style="padding: 20px; margin: 0px auto; text-align: left;">
          <h5 style="text-align: center; font-weight: 600; font-size: 15px; text-transform: uppercase;">Particulier</h5>
          <br />
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px; height: 20px; fill: rgb(0, 171, 85); margin-right: 10px;">
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"
              ></path>
            </svg>
            Retrait limité à 2500€
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px; height: 20px; fill: rgb(0, 171, 85); margin-right: 10px;">
              <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"
              ></path>
            </svg>
            Aucun justificatif
          </div>
          <div @click="goStep2('individual')" class="btn-swipe" style="color: white; text-align: center; width: fit-content; background: #fe2c55; margin: 0px auto; padding: 5px 24px; border: 1px solid #fe2c55; border-radius: 8px; font-size: 13px; font-weight: 600; margin-top: 20px;">Sélectionner</div>
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