<template>
  <div>
    <div class="video-player">
      <div playsinline="true" webkit-playsinline="true">
        <video style="height: 100vh; object-fit: cover; position: absolute; width: 100%;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/welcome.mp4`)" preview='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>'></video>
      </div>
    </div>
    <div v-if="!popup && !popupEmail && !popupPassword && !popupUserRegistration" @click="open()" :style="{'bottom': safeareaBottom }" style="position: fixed; z-index: 15; left: 25px; width: calc(100vw - 50px); bottom: 40px; font-size: 15px; line-height: 1.41176; letter-spacing: -0.025em; border-radius: 16px; color: rgb(255, 255, 255); box-shadow: rgb(255 39 115 / 12%) 0px 0.7rem 1.3rem 0px, rgb(255 39 115 / 24%) 0px 1rem 2.2rem 0px; font-weight: 500; text-align: center; background: rgb(255 39 115); padding: 15px;">
      Accéder
    </div>

    <!-- welcome popup -->
    <div v-if="popup" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%;"> 
      <div class="checkout__header" style="padding: 5px 15px 15px; z-index: 10000000; background: white; width: 100%; box-shadow: 0 4px 8px 0 rgb(0 0 0 / 4%);">
        <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Connexion ou inscription</div>
      </div>
      <div class="checkout__body" style="overflow: scroll; padding: 15px;">
        <div class="form--input--item" :class="{'form--input--item--error': errorLoginEmail }" style="margin-top: 25px">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="loginEmail" style="text-transform: lowercase;">
          </fieldset>
          <div v-if="errorLoginEmail" style="font-size: 13px; color: rgb(255, 0, 0); margin-top: 5px;">Email obligatoire</div>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLoginPassword }" style="margin-bottom: 15px;">
          <fieldset>
            <legend>Mot de passe</legend>
            <input type="password" v-model="loginPassword">
          </fieldset>
          <div v-if="errorLoginPassword" style="font-size: 13px; color: rgb(255, 0, 0); margin-top: 5px;">Mot de passe obligatoire</div>
        </div>

        <div style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; padding: 15px 0px 10px;">
          <div @click="login()" class="btn-swipe" style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em;">Se connecter</div>
        </div>

        <div @click="forgotPassword()" class="small-1UkQD grey-rBkrL link-2j8GS" style="color: rgb(82, 92, 102) !important; font-size: 13px; font-weight: 400; text-align: center; margin-bottom: 20px;">
          Mot de passe oublié ?
        </div>

        <div class="tv-signin-dialog__separator">
          <div class="tv-signin-dialog__separator-text">ou</div>
        </div>

        <div class="social-container-NE2xk" style="padding: 0px;">
          <div @click="userRegistration()" class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 6H3v16h22V6H3.5zM4 7.7V21h20V7.7l-9.65 9.65-.35.36-.35-.36L4 7.71zM23.3 7H4.7l9.3 9.3L23.3 7z"></path></svg>
            </div>
            <div class="channel-name-2qzLW">S'inscrire par email</div>
          </div>
          <div @click="facebook()" class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
                <path fill="#1877F2" d="M14 4a10 10 0 011.56 19.88v-6.99h2.33l.45-2.89h-2.78v-1.88c0-.79.39-1.56 1.63-1.56h1.26V8.1s-1.14-.2-2.24-.2c-2.28 0-3.77 1.4-3.77 3.9V14H9.9v2.9h2.54v6.98A10.01 10.01 0 0114 4z"></path>
              </svg>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Facebook</div>
          </div>
          <div @click="google()" class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
                <path fill="#4285F4" d="M23.6 14.23c0-.71-.06-1.4-.18-2.05H14v3.87h5.38a4.6 4.6 0 01-2 3.02v2.5h3.24c1.89-1.73 2.98-4.3 2.98-7.34z"></path>
                <path fill="#34A853" d="M14 24c2.7 0 4.96-.9 6.62-2.42l-3.23-2.51c-.9.6-2.04.95-3.39.95-2.6 0-4.8-1.76-5.6-4.12H5.06v2.6A10 10 0 0014 24z"></path>
                <path fill="#FBBC05" d="M8.4 15.9a6.01 6.01 0 010-3.8V9.5H5.06a10 10 0 000 9l3.34-2.6z"></path>
                <path fill="#EA4335" d="M14 7.98c1.47 0 2.79.5 3.82 1.5L20.7 6.6A10 10 0 005.06 9.5l3.34 2.6c.8-2.36 3-4.12 5.6-4.12z"></path>
              </svg>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Google</div>
          </div>
          <div class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none">
                <path fill="currentColor" d="M17.6066 8.58285C16.1086 8.58285 14.9127 9.45809 14.1322 9.45809C13.3139 9.45809 12.2313 8.63148 10.9347 8.63148C8.49253 8.63148 6 10.6008 6 14.2841C6 16.5937 6.91896 19.0128 8.05193 20.5809C9.03383 21.906 9.88985 23 11.1109 23C12.332 23 12.8733 22.2099 14.3839 22.2099C15.9072 22.2099 16.2596 22.9757 17.6066 22.9757C18.9284 22.9757 19.8222 21.7965 20.653 20.6296C21.5972 19.2924 21.9874 18.0038 22 17.9309C21.9245 17.9066 19.3816 16.9098 19.3816 14.0896C19.3816 11.6462 21.3832 10.5643 21.4965 10.4792C20.1747 8.63148 18.1605 8.58285 17.6066 8.58285ZM16.9017 7.02687C17.5059 6.32182 17.9465 5.34933 17.9465 4.37684C17.9465 4.24312 17.9339 4.1094 17.9087 4C16.9142 4.03647 15.7183 4.63212 15.0134 5.43442C14.4595 6.05438 13.9308 7.02687 13.9308 8.01152C13.9308 8.15739 13.9559 8.30326 13.9685 8.35189C14.0315 8.36404 14.1322 8.3762 14.2329 8.3762C15.1267 8.3762 16.247 7.80486 16.9017 7.02687Z"></path>
              </svg>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Apple</div>
          </div>
        </div>
      </div>
    </div>


    <!-- login email popup -->
    <div v-if="popupEmail" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%;"> 
      <div class="checkout__header" style="padding: 10px 15px; position: fixed; top: 0px; z-index: 10000000; background: white; width: 100%; border-bottom: 1px solid #e0e3eb;">
        <div @click="open()" class="checkout__close-btn" style="position: absolute; left: initial; top: 6px; padding: 6px 0px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
        </div>
        <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Connexion</div>
      </div>
      <div  style="overflow: scroll; margin-top: 75px; margin-bottom: 100px; padding: 15px;">
        <div class="form--input--item" :class="{'form--input--item--error': errorLoginEmail }">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="loginEmail" style="text-transform: lowercase;">
          </fieldset>
          <div v-if="errorLoginEmail" style="font-size: 13px; color: rgb(255, 0, 0); margin-top: 5px;">Email obligatoire</div>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLoginPassword }" style="margin-bottom: 15px;">
          <fieldset>
            <legend>Mot de passe</legend>
            <input type="password" v-model="loginPassword">
          </fieldset>
          <div v-if="errorLoginPassword" style="font-size: 13px; color: rgb(255, 0, 0); margin-top: 5px;">Mot de passe obligatoire</div>
        </div>
        <div @click="forgotPassword()" class="small-1UkQD grey-rBkrL link-2j8GS" style="color: #525c66 !important; font-size: 13px; font-weight: 400;">
          Mot de passe oublié ?
        </div>
      </div>
      <div style="color: white;position: fixed; bottom: calc(env(safe-area-inset-bottom) + 0px);text-align: center;width: calc(100vw);line-height: 1.41176;letter-spacing: -0.025em;padding: 15px;background: transparent;">
        <div @click="login()" class="btn-swipe" style="color: white;text-align: center;line-height: 1.41176;letter-spacing: -0.025em;">Se connecter</div>
      </div>
    </div>


    <!-- user registration popup -->
    <div v-if="popupUserRegistration" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%"> 
      <div style="padding: 15px;">
        <div class="checkout__header" style="padding: 40px 5px 40px 5px;">
          <div @click="open()" class="checkout__close-btn" style="position: absolute; left: initial; top: 36px; padding: 6px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
              <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
            </svg>
          </div>
          <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Inscription</div>
        </div>

        <div class="general--profile">
          <span>
        <!--     <span v-if="picture">
              <span>
                <img :src="cloudinary256x256 + picture">
              </span>
            </span> -->
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

        <div @click="register()" class="btn-swipe" style="color: white; position: fixed; bottom: calc(env(safe-area-inset-bottom) + 30px); text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">
          S'inscrire
        </div>
      </div>
    </div>


    <!-- forgot password popup -->
    <div v-if="popupPassword" class="store-products-item__login-popup store-products-item__login-popup--active"> 
      <div style="padding: 15px;">
        <div class="checkout__header" style="padding: 5px 5px 40px 5px;">
          <div @click="open()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
              <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
            </svg>
          </div>
          <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Mot de passe oublié</div>
        </div>

        <p style="font-size: 13px; color: #525c66; text-align: center; margin-bottom: 30px; font-weight: 400;">Entrez l'adresse email associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
        <div class="form--input--item" :class="{'form--input--item--error': errorEmailRecovery }">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="forgotEmail">
          </fieldset>
          <div v-if="errorEmailRecovery" style="font-size: 13px; color: rgb(255, 0, 0); margin-top: 5px;">Email obligatoire</div>
          <div v-if="reset" style="font-size: 13px; color: rgb(66, 210, 164); margin-top: 5px;">Un mail a été envoyé pour réinitialiser votre mot de passe.</div>
        </div>
        <div @click="submitPassword()" class="btn-swipe" style="margin: 30px auto; font-size: 15px; line-height: 1.41176; letter-spacing: -0.025em; border-radius: 16px; color: rgb(255, 255, 255); font-weight: 500; text-align: center; background: rgb(255 39 115); padding: 15px;">
          Envoyer
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.store-products-item__login-popup.store-products-item__login-popup--active {
  bottom: 0;
}

.store-products-item__login-popup {
  position: fixed;
  width: 100%;
  bottom: -80%;
  background-color: #fff;
  border-radius: 15px;
  animation-duration: 400ms !important;
  animation-iteration-count: 1 !important;
  animation-fill-mode: both !important;
  animation-name: keyframe_d37zz3 !important;
  z-index: 1000000000;
}

svg {
  overflow: initial;
}

.social-container-NE2xk .channel-item-wrapper-2gBWB .channel-icon-wrapper-2eYxZ .channel-icon-33qGs {
  width: 24px;
  min-height: 24px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.social-container-NE2xk .channel-item-wrapper-2gBWB .channel-icon-wrapper-2eYxZ {
  width: 44px;
  height: 44px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
}

.social-container-NE2xk .channel-item-wrapper-2gBWB {
  width: 100%;
  min-height: 48px;
  border: 1px solid #e0e3eb;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding: 0px 40px;
  cursor: pointer;
  background: white;
}

.social-container-NE2xk .channel-item-wrapper-2gBWB .channel-name-2qzLW {
  word-break: break-word;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  text-align: center;
  font-size: 15px;
  color: #525c66;
  font-weight: 500;
}

.social-container-NE2xk {
  overflow-y: auto;
  width: 100%;
  padding: 0px 20px;
}

.manage {
  font-weight: 400;
  padding-bottom: 20px;
  font-size: 15px;
  margin: 0 auto;
  text-align: center;
  padding: 10px 40px;
  color: #8c8c8c;
}

.video-page__video-player--active .video-player__video {
  height: 136px;
  width: 76px;
}


.toggle-2SAdO.is-modal-1F8S3 {
  justify-content: center;
  align-items: center;
  padding: 0 24px;
}

.toggle-2SAdO {
  height: 64px;
  background: #fff;
  border-top: .5px solid rgba(22,24,35,.12);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 18px;
  color: #8c8c8c;
}

.tv-signin-dialog__separator {
    margin-bottom: 26px;
    padding-top: 6px;
    position: relative;
    text-align: center;
    -webkit-user-select: none;
    user-select: none;
}

.tv-signin-dialog__separator-text {
    background-color: #fff;
    border-radius: 50%;
    color: #6a6d78;
    display: inline-block;
    padding: 0 15px;
    position: relative;
}

.tv-signin-dialog__separator:before {
    background-color: #e0e3eb;
    content: "";
    display: block;
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
    top: 15px;
}

.form--input--item {
  margin-bottom: 25px;
}

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
.store-products-item__login-popup::-webkit-scrollbar {
  display: none;
}
.store-products-item__login-popup {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

</style>

<script>

import AuthAPI from "../services/authAPI.js";
  
export default {
  name: 'Welcome',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      popup: false,
      popupEmail: false,
      popupPassword: false,
      popupUserRegistration: false,
      loginEmail: null,
      loginPassword: null,
      forgotEmail: null,
      errorLoginPassword: false,
      errorLoginEmail: false,
      errorEmailRecovery: false,
      email: null,
      firstname: null,
      lastname: null,
      password: null,
      errorFirstname: false,
      errorLastname: false,
      errorEmail: false,
      errorPassword: false,
      reset: false,
      safeareaBottom: '40px',
    }
  },
  created() {
    window.StatusBar.overlaysWebView(true);
    window.StatusBar.styleDefault();
    
    var isAuthenticated = AuthAPI.isAuthenticated();
    if (isAuthenticated) {
      this.$router.push({ name: 'Feed' });
    }

    if (window.cordova && (window.cordova.platformId === "ios")) {
      this.safeareaBottom = 'calc(env(safe-area-inset-bottom) + 40px)';
    }

    if (window.device) {
      console.log(window.device.model);
      console.log(window.device.platform);
      console.log(window.device.uuid);
      console.log(window.device.version);
      console.log(window.device.manufacturer);
      console.log(window.device.isVirtual);
      console.log(window.device.serial);
    }

    if (navigator.connection) {
      console.log(navigator.connection.type);
    }
  },
  methods: {
    async login() {
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;

      if (!this.loginEmail) {
        this.errorLoginEmail = true;
      } 

      if (!this.loginPassword) {
        this.errorLoginPassword = true;
      } 

      if (!this.errorLoginEmail && !this.errorLoginPassword) {
        window.cordova.plugin.http.setDataSerializer('json');
        var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };

        await window.cordova.plugin.http.post(this.baseUrl + "/user/api/login_check", { "username": this.loginEmail, "password": this.loginPassword }, httpHeader, (response) => {
          var result = JSON.parse(response.data);
          window.localStorage.setItem("token", result.token);
          this.$router.push({ name: 'Feed' });
        }, (response) => {
          console.log(response);
        });
      }
    },
    facebook() {
      window.facebookConnectPlugin.login(['public_profile', 'email'])
      .then(succ => {
        console.log(JSON.stringify(succ));
      })
      .catch(err => {
        console.log(err);
      });
    },
    google() {
      // ajouter google
    },
    open() {
      window.StatusBar.overlaysWebView(false);  
      window.StatusBar.styleDefault();
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popupUserRegistration = false;
      this.popupPassword = false;
      this.popupEmail = false;
      this.popup = true;
    },
    forgotPassword() {
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popupUserRegistration = false;
      this.popupEmail = false;
      this.popup = false;
      this.popupPassword = true;
    },
    checkEmail() {
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popup = false;
      this.popupPassword = false;
      this.popupUserRegistration = false;
      this.popupEmail = true;
    },
    userRegistration() {
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popup = false;
      this.popupPassword = false;
      this.popupEmail = false;
      this.popupUserRegistration = true;
    },
    submitPassword() {
      this.errorEmailRecovery = false;

      // envoyer mail pour reinitialiser mdp
      if (!this.forgotEmail) {
        this.errorEmailRecovery = true;
      }

      if (!this.errorEmailRecovery) {
        this.reset = true;
      }
    },
    openUrl(url) {
      window.SafariViewController.isAvailable((available) => {
        if (available) {
          window.SafariViewController.show({ url: url }, (result) => {
            console.log(result);
          }, (error) => {
            console.log("KO: " + error);
          })
        } else {
          window.cordova.InAppBrowser.open(url, '_system', 'location=no');
        }
      });
    },
    goInfluencer() {
      this.$router.push({ name: 'InfluencerRegistration' });
    },
    goVendor() {
      this.$router.push({ name: 'VendorRegistrationStep1' });
    },
    async register() {
      this.errorFirstname = false;
      this.errorLastname = false;
      this.errorEmail = false;
      this.errorPassword = false;

      if (!this.email) {
        this.errorEmail = true;
      } else {
        if (!this.validEmail(this.email)) {
          this.errorEmail = true;
        }
      }

      if (!this.password) {
        this.errorPassword = true;
      }

      if (!this.firstname) {
        this.errorFirstname = true;
      }

      if (!this.lastname) {
        this.errorLastname = true;
      }

      if (!this.errorEmail && !this.errorPassword && !this.errorFirstname && !this.errorLastname) {
        window.cordova.plugin.http.setDataSerializer('json');
        var httpParams = { "email": this.email, "password": this.password, "lastname": this.lastname, "firstname": this.firstname, "businessType": null };
        var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };

        await window.cordova.plugin.http.post(this.baseUrl + "/api/user/register", httpParams, httpHeader, (response) => {
          console.log(response);
          window.localStorage.setItem("user", response.data);
          this.authenticate();
        }, (response) => {
          console.log(response.error);
        });
      }
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async authenticate() {
      var httpParams = { "username": this.email, "password": this.password };
      var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
      
      await window.cordova.plugin.http.post(this.baseUrl + "/user/api/login_check", httpParams, httpHeader, (response) => {
        console.log(response);
        var result = JSON.parse(response.data);
        window.localStorage.setItem("token", result.token);
        this.$router.push({ name: 'AllowNotif' });
      }, (response) => {
        console.log(response.error);
      });
    },
  }
};

</script>
