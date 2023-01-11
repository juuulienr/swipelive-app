<template>
  <div>
    <div class="video-player">
      <div playsinline="true" webkit-playsinline="true">
        <video v-if="isAndroid" style="height: 100vh; object-fit: cover; position: fixed; width: 100%; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop muted="muted" autoplay :src="require(`@/assets/video/welcome.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
        <video v-else style="height: 100vh; object-fit: cover; width: 100%;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/welcome.mp4`)" preview='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>'></video>
      </div>
    </div>
    <div v-if="!popup && !popupPassword && !popupUserRegistration" @click="open()" class="btn-open" :style="{'bottom': safeareaBottom }">
      Accéder
    </div>

    <!-- welcome popup -->
    <div v-if="popup" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px;"> 
      <div class="checkout__header" style="padding: 5px 15px 15px; z-index: 10000000; background: white; width: 100%;">
        <div class="checkout__title">Connexion</div>
      </div>
      <div class="checkout__body" style="overflow: scroll; padding: 15px;">
        <div v-if="errorLoginEmail || errorLoginPassword" style="font-size: 13px; color: red; margin-bottom: 5px; text-align: center; font-weight: 400;">Identifiant ou mot de passe incorrect</div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLoginEmail }" style="margin-top: 15px">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="loginEmail" style="text-transform: lowercase;">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLoginPassword }" style="margin-bottom: 15px;">
          <fieldset>
            <legend>Mot de passe</legend>
            <input type="password" v-model="loginPassword">
          </fieldset>
        </div>

        <div style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; padding: 15px 0px 10px;">
          <div @click="login()" class="btn-swipe" style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em;">
            <span v-if="loading">
              <svg viewBox="25 25 50 50" class="loading">
                <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
              </svg>
            </span>
            <span v-else>Se connecter</span>
          </div>
        </div>

        <div @click="forgotPassword()" class="small-1UkQD grey-rBkrL link-2j8GS" style="color: rgb(82, 92, 102) !important; font-size: 13px; font-weight: 400; text-align: center; margin-bottom: 20px;">
          Mot de passe oublié ?
        </div>


        <div class="social-container-NE2xk" style="padding: 0px;">
          <div @click="facebook()" class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
                <path fill="#1877F2" d="M14 4a10 10 0 011.56 19.88v-6.99h2.33l.45-2.89h-2.78v-1.88c0-.79.39-1.56 1.63-1.56h1.26V8.1s-1.14-.2-2.24-.2c-2.28 0-3.77 1.4-3.77 3.9V14H9.9v2.9h2.54v6.98A10.01 10.01 0 0114 4z"></path>
              </svg>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Facebook</div>
          </div>
        <!--   <div @click="google()" class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
                <path fill="#4285F4" d="M23.6 14.23c0-.71-.06-1.4-.18-2.05H14v3.87h5.38a4.6 4.6 0 01-2 3.02v2.5h3.24c1.89-1.73 2.98-4.3 2.98-7.34z"></path>
                <path fill="#34A853" d="M14 24c2.7 0 4.96-.9 6.62-2.42l-3.23-2.51c-.9.6-2.04.95-3.39.95-2.6 0-4.8-1.76-5.6-4.12H5.06v2.6A10 10 0 0014 24z"></path>
                <path fill="#FBBC05" d="M8.4 15.9a6.01 6.01 0 010-3.8V9.5H5.06a10 10 0 000 9l3.34-2.6z"></path>
                <path fill="#EA4335" d="M14 7.98c1.47 0 2.79.5 3.82 1.5L20.7 6.6A10 10 0 005.06 9.5l3.34 2.6c.8-2.36 3-4.12 5.6-4.12z"></path>
              </svg>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Google</div>
          </div> -->
       <!--    <div @click="apple()" class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="none">
                <path fill="currentColor" d="M17.6066 8.58285C16.1086 8.58285 14.9127 9.45809 14.1322 9.45809C13.3139 9.45809 12.2313 8.63148 10.9347 8.63148C8.49253 8.63148 6 10.6008 6 14.2841C6 16.5937 6.91896 19.0128 8.05193 20.5809C9.03383 21.906 9.88985 23 11.1109 23C12.332 23 12.8733 22.2099 14.3839 22.2099C15.9072 22.2099 16.2596 22.9757 17.6066 22.9757C18.9284 22.9757 19.8222 21.7965 20.653 20.6296C21.5972 19.2924 21.9874 18.0038 22 17.9309C21.9245 17.9066 19.3816 16.9098 19.3816 14.0896C19.3816 11.6462 21.3832 10.5643 21.4965 10.4792C20.1747 8.63148 18.1605 8.58285 17.6066 8.58285ZM16.9017 7.02687C17.5059 6.32182 17.9465 5.34933 17.9465 4.37684C17.9465 4.24312 17.9339 4.1094 17.9087 4C16.9142 4.03647 15.7183 4.63212 15.0134 5.43442C14.4595 6.05438 13.9308 7.02687 13.9308 8.01152C13.9308 8.15739 13.9559 8.30326 13.9685 8.35189C14.0315 8.36404 14.1322 8.3762 14.2329 8.3762C15.1267 8.3762 16.247 7.80486 16.9017 7.02687Z"></path>
              </svg>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Apple</div>
          </div> -->
        </div>

        <div class="tv-signin-dialog__separator" style="margin-top: 10px; margin-bottom: 15px;">
          <div class="tv-signin-dialog__separator-text">ou</div>
        </div>

        <div class="checkout__header" style="padding: 5px 15px 20px; z-index: 10000000; background: white; width: 100%;">
          <div class="checkout__title">Inscription</div>
        </div>

        <div class="social-container-NE2xk" style="padding: 0px;">
          <div @click="userRegistration()" class="channel-item-wrapper-2gBWB" style="border: 2px solid #000;">
            <div class="channel-icon-wrapper-2eYxZ">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 6H3v16h22V6H3.5zM4 7.7V21h20V7.7l-9.65 9.65-.35.36-.35-.36L4 7.71zM23.3 7H4.7l9.3 9.3L23.3 7z"></path>
              </svg>
            </div>
            <div class="channel-name-2qzLW" style="color: black;">S'inscrire par email</div>
          </div>
        </div>
      </div>
    </div>


    <!-- user registration popup -->
    <div v-if="popupUserRegistration" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px;"> 
      <div class="checkout__header" style="padding: 5px 15px 15px; z-index: 10000000; background: white; width: 100%;">
        <div @click="open()" class="checkout__close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
        </div>
        <div class="checkout__title">Inscription</div>
      </div>
      <div class="checkout__body" style="overflow: scroll; padding: 15px;">
        <div class="general--profile">
          <span>
            <span v-if="loadingImg">
              <svg viewBox="25 25 50 50" class="loading" style="width: 24px; height: 24px; top: calc(50% - 13px); left: calc(50% - 13px);">
                <circle cx="50" cy="50" r="20" style="stroke: rgb(255, 39, 115);"></circle>
              </svg>
            </span>
            <span v-else-if="picture" @click="uploadSheet()">
              <img :src="cloudinary256x256 + picture" style="object-fit: cover; width: 142px; height: 142px;">
            </span>
            <div v-else @click="uploadSheet()">
              <svg xmlns="http://www.w3.org/2000/svg" class="MuiBox-root css-v73erd iconify iconify--ic" viewBox="0 0 24 24">
                <path d="M3 8c0 .55.45 1 1 1s1-.45 1-1V6h2c.55 0 1-.45 1-1s-.45-1-1-1H5V2c0-.55-.45-1-1-1s-1 .45-1 1v2H1c-.55 0-1 .45-1 1s.45 1 1 1h2v2z" fill="currentColor"></path>
                <circle cx="13" cy="14" r="3" fill="currentColor"></circle>
                <path d="M21 6h-3.17l-1.24-1.35A1.99 1.99 0 0 0 15.12 4h-6.4c.17.3.28.63.28 1c0 1.1-.9 2-2 2H6v1c0 1.1-.9 2-2 2c-.37 0-.7-.11-1-.28V20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5z" fill="currentColor"></path>
              </svg>
              <span style="font-weight: 400; margin: 0px 20px; text-align: center;">Ajoute une photo de profil</span>
            </div>
          </span>
        </div>
        
      	<div class="form--input--item" :class="{'form--input--item--error': errorFirstname }">
      		<fieldset>
      			<legend>Prénom</legend>
      			<input type="text" v-model="firstname" style="text-transform: capitalize;">
      		</fieldset>
      	</div>

      	<div class="form--input--item" :class="{'form--input--item--error': errorLastname }">
      		<fieldset>
      			<legend>Nom</legend>
      			<input type="text" v-model="lastname" style="text-transform: capitalize;">
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

        <div @click="register()" class="btn-swipe" style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; margin-top: 20px;">
          <span v-if="loading">
            <svg viewBox="25 25 50 50" class="loading">
              <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
            </svg>
          </span>
          <span v-else>S'inscrire</span>
        </div>
      </div>
    </div>


    <!-- forgot password popup -->
    <div v-if="popupPassword" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px;"> 
      <div class="checkout__header" style="padding: 5px 15px 15px; z-index: 10000000; background: white; width: 100%;">
        <div @click="open()" class="checkout__close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
        </div>
        <div class="checkout__title">Mot de passe oublié</div>
      </div>
      <div class="checkout__body" style="overflow: scroll; padding: 15px;">
        <div style="margin: 0px auto;">
          <lottie :options="defaultOptions" :width="200" v-on:animCreated="handleAnimation"/>
        </div>

        <p v-if="isReset" style="font-size: 13px; color: #525c66; text-align: left; margin-bottom: 30px; font-weight: 400;">Un mail a été envoyé pour réinitialiser votre mot de passe.</p>
        <p v-else style="font-size: 13px; color: #525c66; text-align: left; margin-bottom: 30px; font-weight: 400;">Entrez l'adresse email associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>

        <div class="form--input--item" :class="{'form--input--item--error': errorEmailRecovery }">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="forgotEmail">
          </fieldset>
        </div>

        <div style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; padding: 0px 0px 10px;">
          <div @click="resetPassword()" class="btn-swipe" :disabled="isReset ? disabled : ''" style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em;">Réinitialiser</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/css/welcome.css"></style>


<script>

import AuthAPI from "../utils/auth.js";
import Lottie from 'vue-lottie';
import * as animationData from '../assets/lottie/forgot-password.json';
  
export default {
  name: 'Welcome',
  components: {
    'lottie': Lottie
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      defaultOptions: {animationData: animationData},
      animationSpeed: 1,
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      popup: false,
      popupPassword: false,
      popupUserRegistration: false,
      loginEmail: null,
      loginPassword: null,
      forgotEmail: null,
      errorLoginPassword: false,
      errorLoginEmail: false,
      errorEmailRecovery: false,
      errorFirstname: false,
      errorLastname: false,
      errorEmail: false,
      errorPassword: false,
      email: null,
      firstname: null,
      lastname: null,
      password: null,
      reset: false,
      picture: null,
      safeareaBottom: '40px',
      loading: false,
      loadingImg: false,
      isAndroid: false,
      isReset: false
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

    if (window.cordova && (window.cordova.platformId === "android")) {
      this.isAndroid = true;
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
      } else {
        if (!this.checkEmail(this.loginEmail)) {
          this.errorLoginEmail = true;
        }
      }

      if (!this.loginPassword) {
        this.errorLoginPassword = true;
      } 

      if (!this.errorLoginEmail && !this.errorLoginPassword) {
        window.cordova.plugin.http.setDataSerializer('json');
        var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
        this.loading = true;

        await window.cordova.plugin.http.post(this.baseUrl + "/user/api/login_check", { "username": this.loginEmail, "password": this.loginPassword }, httpHeader, (response) => {
          var result = JSON.parse(response.data);
          window.localStorage.setItem("token", result.token);
          this.$router.push({ name: 'Feed' });
        }, (response) => {
          this.loading = false;
          this.errorLoginPassword = true;
          this.errorLoginEmail = true;
          console.log(response);
        });
      }
    },
    async facebook() {
      window.facebookConnectPlugin.login(['email', 'public_profile'], (response) => {
        console.log(response);
        window.localStorage.setItem("facebookToken", response.authResponse.accessToken);
        window.localStorage.setItem("facebookId", response.authResponse.userID);
        this.loading = true;

        window.facebookConnectPlugin.api("me/?fields=id,first_name,last_name,email,picture.type(large),birthday&access_token=" + response.authResponse.accessToken, ["email", "public_profile"], async (result) => {
            console.log(result);
            this.email = result.email;
            this.password = Math.random().toString(36).slice(-15);

            window.cordova.plugin.http.setDataSerializer('json');
            var httpParams = { "email": this.email, "password": this.password, "firstname": result.first_name, "lastname": result.last_name, "picture": result.picture.data.url, "facebookId": response.authResponse.userID };
            var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };

            await window.cordova.plugin.http.post(this.baseUrl + "/api/authentication/facebook", httpParams, httpHeader, (response) => {
              this.authenticate(response.data);
            }, (response) => {
              this.loading = false;
              console.log(response.error);
            });
          }, (error) => {
            this.loading = false;
            console.error("Failed: ", error);
          }
        );
      }, (loginError) => {
        console.log(loginError);
      });
    },
    // google() {
      // ajouter google
    // },
    // apple() {
      // ajouter apple
    // },
    resetPassword() {
      // this.errorEmailRecovery = false;

      // envoyer mail pour reinitialiser mdp
      // if (!this.forgotEmail) {
      //   this.errorEmailRecovery = true;
      // }

      // if (!this.errorEmailRecovery && !this.isReset) {
      //   this.isReset = true;
      // }
    },
    open() {
      window.StatusBar.overlaysWebView(false);  
      window.StatusBar.styleDefault();
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popupUserRegistration = false;
      this.popupPassword = false;
      this.popup = true;
    },
    forgotPassword() {
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popupUserRegistration = false;
      this.popup = false;
      this.popupPassword = true;
    },
    userRegistration() {
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popup = false;
      this.popupPassword = false;
      this.popupUserRegistration = true;
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
    async register() {
      this.errorFirstname = false;
      this.errorLastname = false;
      this.errorEmail = false;
      this.errorPassword = false;

      if (!this.email) {
        this.errorEmail = true;
      } else {
        if (!this.checkEmail(this.email)) {
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

      if (!this.errorEmail && !this.errorPassword && !this.errorFirstname && !this.errorLastname && !this.loading) {
        this.loading = true;
        window.cordova.plugin.http.setDataSerializer('json');
        var httpParams = { "email": this.email, "password": this.password, "firstname": this.firstname, "lastname": this.lastname, "picture": this.picture };
        var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };

        await window.cordova.plugin.http.post(this.baseUrl + "/api/user/register", httpParams, httpHeader, (response) => {
          console.log(response);
          window.localStorage.setItem("user", response.data);
          this.authenticate(true);
        }, (response) => {
          this.loading = false;
          console.log(response.error);
        });
      }
    },
    checkEmail(email) {
      var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },
    async authenticate(newUser) {
      var httpParams = { "username": this.email, "password": this.password };
      var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };

      await window.cordova.plugin.http.post(this.baseUrl + "/user/api/login_check", httpParams, httpHeader, (response) => {
        var result = JSON.parse(response.data);
        window.localStorage.setItem("token", result.token);
        if (newUser == true) {
          this.$router.push({ name: 'Onboarding' });
        } else {
          this.$router.push({ name: 'Feed' });
        }
      }, (response) => {
        this.loading = false;
        console.log(response.error);
      });
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    uploadSheet() {
      var options = {
        title: 'Ajouter une photo',
        buttonLabels: ['À Partir de la bibliothèque', 'Prendre une photo'],
        addCancelButtonWithLabel: 'Annuler',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };
      window.plugins.actionsheet.show(options, (index) => {
        console.log(index);
        if (index == 1) {
          this.openFilePicker();
        } else if (index == 2) {
          this.openCamera();
        }
      }, (error) => {
        console.log(error);
      });
    },
    openFilePicker() {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true
      }

      this.uploadImage(options);
    },
    openCamera() {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true,
      }

      this.uploadImage(options);
    },
    uploadImage(options) {
      navigator.camera.getPicture((imageUri) => {
        console.log(imageUri);
        this.loadingImg = true;

        window.cordova.plugin.http.setDataSerializer('json');
        if (window.cordova.platformId === "android" || window.cordova.platformId === "ios") {
          window.cordova.plugin.http.uploadFile(this.baseUrl + "/api/registration/picture", {}, { Authorization: "Bearer " }, imageUri, 'picture', (response) => {
            console.log(JSON.parse(response.data));
            this.picture = JSON.parse(response.data);
            this.loadingImg = false;
          }, function(response) {
            console.log(response.error);
          });
        } else {
          var imgData = "data:image/jpeg;base64," + imageUri;
          window.cordova.plugin.http.post(this.baseUrl + "/api/registration/picture", { "picture" : imgData }, { Authorization: "Bearer " }, (response) => {
            console.log(JSON.parse(response.data));
            this.picture = JSON.parse(response.data);
            this.loadingImg = false;
          }, function(response) {
            console.log(response.error);
          });
        }
      }, (error) => {
        console.log("Impossible de récupérer l'image : " + error);
      }, options);
    },
  }
};

</script>
