<template>
  <main style="padding: 15px;">
    <div class="checkout__header" style="padding: 5px 5px 40px 5px;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div v-if="step1" class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Inscription Influenceur</div>
      <div v-else class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Réseaux Sociaux</div>
    </div>
    <div style="margin-bottom: 30px;">

      <!-- step1 -->
      <div v-if="step1" class="step1">
        <div class="general--profile">
          <span>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="MuiBox-root css-v73erd iconify iconify--ic" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M3 8c0 .55.45 1 1 1s1-.45 1-1V6h2c.55 0 1-.45 1-1s-.45-1-1-1H5V2c0-.55-.45-1-1-1s-1 .45-1 1v2H1c-.55 0-1 .45-1 1s.45 1 1 1h2v2z" fill="currentColor"></path><circle cx="13" cy="14" r="3" fill="currentColor"></circle><path d="M21 6h-3.17l-1.24-1.35A1.99 1.99 0 0 0 15.12 4h-6.4c.17.3.28.63.28 1c0 1.1-.9 2-2 2H6v1c0 1.1-.9 2-2 2c-.37 0-.7-.11-1-.28V20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5z" fill="currentColor"></path></svg>
              <span style="font-weight: 400;">Photo de profil</span>
            </div>
          </span>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorFirstname }">
          <fieldset>
            <legend>Prénom</legend>
            <input type="text" v-model="firstname">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLastname }">
          <fieldset>
            <legend>Nom</legend>
            <input type="text" v-model="lastname">
          </fieldset>
        </div>

        <div class="form--input--item">
          <fieldset>
            <legend>Téléphone</legend>
            <input type="text" placeholder="+33" required>
          </fieldset>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3,1fr); gap: 24px 16px;">
          <div class="form--input--item" :class="{'form--input--item--error': errorDob }">
            <fieldset>
              <legend>Jour</legend>
              <input type="text" id="date1" v-model="dob" required inputmode="decimal">
            </fieldset>
          </div>
          <div class="form--input--item" :class="{'form--input--item--error': errorDob }">
            <fieldset>
              <legend>Mois</legend>
              <input type="text" id="date2" v-model="dob" required inputmode="decimal">
            </fieldset>
          </div>
          <div class="form--input--item" :class="{'form--input--item--error': errorDob }">
            <fieldset>
              <legend>Année</legend>
              <input type="text" id="date3" v-model="dob" required inputmode="decimal">
            </fieldset>
          </div>
        </div>
        <div v-if="errorDob" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: -10px;">18 ans et +</div>

        <div class="form--input--item" :class="{'form--input--item--error': errorEmail }">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="email" style="text-transform: lowercase;">
          </fieldset>
        </div>
        
        <div class="form--input--item" :class="{'form--input--item--error': errorPassword }">
          <fieldset>
            <legend>Mot de passe</legend>
            <input type="password" v-model="password">
          </fieldset>
        </div>

        <div @click="submitStep1()" class="btn-swipe" style="color: white; position: fixed; bottom: 35px; text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">Suivant</div>
      </div>


      <!-- step2 -->
      <div v-if="step2" class="step2">
        <div class="form--input--item">
          <fieldset>
            <legend>Facebook</legend>
            <input type="text" v-model="facebook" placeholder="@pseudo">
          </fieldset>
        </div>
        <div class="form--input--item">
          <fieldset>
            <legend>Instagram</legend>
            <input type="text" v-model="instagram" placeholder="@pseudo">
          </fieldset>
        </div>
            
        <div class="form--input--item">
          <fieldset>
            <legend>Snapchat</legend>
            <input type="text" v-model="snapchat" placeholder="@pseudo">
          </fieldset>
        </div>
        <div class="form--input--item">
          <fieldset>
            <legend>Youtube</legend>
            <input type="text" v-model="youtube" placeholder="@pseudo">
          </fieldset>
        </div>
        
        <div class="form--input--item">
          <fieldset>
            <legend>Tiktok</legend>
            <input type="text" v-model="tiktok" placeholder="@pseudo">
          </fieldset>
        </div>
        <div class="form--input--item">
          <fieldset>
            <legend>Pinterest</legend>
            <input type="text" v-model="pinterest" placeholder="@pseudo">
          </fieldset>
        </div>

        <div class="btn-swipe" style="color: white; position: fixed; bottom: 35px; text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">S'inscrire</div>
      </div>
    </div>
  </main>
</template>
<style>

.general--profile {
  padding-bottom: 45px;
}

.general--profile > span {
  width: 144px;
  height: 144px;
  margin: auto;
  border-radius: 50%;
  display: block;
  padding: 8px;
  border: 1px dashed rgba(145, 158, 171, 0.32);
  position: relative;
}

.general--profile > span > span {
  z-index: 0;
  width: 100%;
  height: 100%;
  outline: none;
  display: flex;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  align-items: center;
  justify-content: center;
}

.general--profile > span > span > span {
  line-height: 0;
  display: block;
  overflow: hidden;
  z-index: 8;
  width: 100%;
  height: 100%;
  background-size: cover !important;
}

.general--profile > span > span > span img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.general--profile > span div {
  display: flex;
  position: absolute;
  top: 8px;
  left: 8px;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: #525c66;
  background-color: rgb(244, 246, 248);
  border-radius: 50%;
  cursor: pointer;
}

.general--profile > span div span {
  line-height: 1.5;
  font-size: 0.75rem;
}

.general--profile > span div svg {
  width: 24px;
  height: 24px;
  margin-bottom: 8px;
}
</style>

<script>

import AuthAPI from "../services/authAPI.js";

export default {
  name: 'InfluencerRegistration',
  data() {
    return {
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      baseUrl: window.localStorage.getItem("baseUrl"),
      step1: true,
      step2: false,
      email: null,
      password: null,
      firstname: null,
      lastname: null,
      summary: null,
      dob: null,
      day: null,
      month: null,
      year: null,
      businessName: null,
      company: null,
      siren: null,
      address: null,
      zip: null,
      city: null,
      picture: null,
      waiting: false,
      errorFirstname: false,
      errorLastname: false,
      errorEmail: false,
      errorDob: false,
      errorBusinessType: false,
      errorBusinessName: false,
      errorCompany: false,
      errorSiren: false,
      errorAddress: false,
      errorZip: false,
      errorCity: false,
      errorSummary: false,
      errorCountry: false,
      errorPassword: false,
      errorRegistration: null,
      showAutocomplete: false,
    }
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
    goBack() {
      this.$router.push({ name: 'Welcome' });
    },
    submitStep1() {
      this.step2 = true;
      this.step1 = false;
    }
  }  
};
</script>