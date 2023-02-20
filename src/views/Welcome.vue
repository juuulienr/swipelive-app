<template>
  <div class="welcome">
    <!-- velcome video -->
    <div class="video-player">
      <div playsinline="true" webkit-playsinline="true">
        <video v-if="isAndroid" style="height: 100vh; object-fit: cover; position: fixed; width: 100%; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop muted="muted" autoplay :src="require(`@/assets/video/welcome.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
        <video v-else style="height: 99vh; object-fit: cover; width: 100%;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/welcome.mp4`)" preview='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>'></video>
      </div>
    </div>
    <div v-if="!popup && !popupLogin && !popupPassword && !popupUserRegistration" @click="open()" class="btn-open" :style="{'bottom': safeareaBottom }">
      Accéder
    </div>

    <!-- welcome popup -->
    <div v-if="popup" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px;"> 
      <div class="bg-welcome" style="padding: 15px;">
        <div class="checkout__title" style="margin-top: 12px; font-size: 22px; margin-bottom: 20px;">Achetez, Vendez & Swipez 🛍</div>
        <p style="text-align: center;margin: 0px 30px;font-weight: 400;margin-bottom: 30px;">Créez un compte pour commencer à acheter, vendre et profiter de plein de réductions en live !</p>

        <div class="social-container-NE2xk" style="padding: 0px;">
          <div @click="userRegistration()" class="channel-item-wrapper-2gBWB" style="background: #ff2a80; border: none; margin-bottom: 0px;">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/mail.png`)" style="width: 24px; height: 24px; margin-bottom: 7px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">Continuer par email</div>
          </div>
        </div>

        <div class="tv-signin-dialog__separator" style="margin-top: 15px; margin-bottom: 15px;">
          <div class="tv-signin-dialog__separator-text">ou</div>
        </div>

        <div class="social-container-NE2xk">
          <div class="channel-item-wrapper-2gBWB" style="background: black; border: none;">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/apple.png`)" style="width: 24px; height: 24px; margin-bottom: 3px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">Continuer avec Apple</div>
          </div>
          <div @click="facebook()" class="channel-item-wrapper-2gBWB" style="background: #1e74e4; border: none;">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/facebook.png`)" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">Continuer avec Facebook</div>
          </div>
          <div class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/google.png`)" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Google</div>
          </div>
        </div>

        <p style="text-align: center;margin: 10px 30px 15px;font-weight: 400;color: #a7a8a9;">Avez-vous déjà un compte ?</p>
        <p @click="userLogin()" style="text-align: center;color: #ff2a80;">SE CONNECTER</p>
      </div>
    </div>


    <!-- login popup -->
    <div v-if="popupLogin" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px;"> 
      <div class="checkout__header" style="padding: 13px 15px 13px;">
        <div @click="open()" class="checkout__close-btn" style="padding: 10px 0px">
           <img :src="require(`@/assets/img/arrow-left.svg`)" style="width: 28px; height: 28px;"/>
        </div>
      </div>
      <div style="padding: 15px;">
        <div class="checkout__title" style="margin-top: 40px; font-size: 22px; margin-bottom: 20px;">Se connecter</div>
        <div v-if="errorLoginEmail || errorLoginPassword" style="font-size: 13px; color: red; margin-bottom: 5px; text-align: center; font-weight: 400;">Identifiant ou mot de passe incorrect</div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLoginEmail }" style="margin-top: 15px">
          <fieldset>
            <legend>Email</legend>
            <input type="text" id="email" v-model="loginEmail" style="text-transform: lowercase;">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLoginPassword }" style="margin-bottom: 15px;">
          <fieldset>
            <legend>Mot de passe</legend>
            <input type="password" id="password" v-model="loginPassword">
          </fieldset>
        </div>

        <div style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; padding: 15px 0px 10px; ">
          <div @click="login()" class="btn-swipe" style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; width: 275px; margin: 0 auto; padding: 13px 48px; border-radius: 30px;">
            <span v-if="loading">
              <svg viewBox="25 25 50 50" class="loading">
                <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
              </svg>
            </span>
            <span v-else>Se connecter</span>
          </div>
        </div>

        <div @click="forgotPassword()" class="small-1UkQD grey-rBkrL link-2j8GS" style="color: rgb(82, 92, 102) !important; font-size: 12px; font-weight: 400; text-align: center;">
          Mot de passe oublié ?
        </div>

        <div class="tv-signin-dialog__separator" style="margin-top: 15px; margin-bottom: 15px;">
          <div class="tv-signin-dialog__separator-text">ou</div>
        </div>

        <div class="social-container-NE2xk">
          <div class="channel-item-wrapper-2gBWB" style="background: black; border: none;">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/apple.png`)" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">Continuer avec Apple</div>
          </div>
          <div @click="facebook()" class="channel-item-wrapper-2gBWB" style="background: #1e74e4; border: none;">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/facebook.png`)" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">Continuer avec Facebook</div>
          </div>
          <div class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/google.png`)" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Google</div>
          </div>
        </div>
      </div>
    </div>


    <!-- registration popup -->
    <div v-if="popupUserRegistration" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px;"> 
      <div class="checkout__header" style="padding: 13px 15px 13px;">
        <div @click="open()" class="checkout__close-btn" style="padding: 10px 0px">
           <img :src="require(`@/assets/img/arrow-left.svg`)" style="width: 28px; height: 28px;"/>
        </div>
        <div class="checkout__title">S'inscrire</div>
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
      <div class="checkout__header" style="padding: 13px 15px 13px;">
        <div @click="open()" class="checkout__close-btn" style="padding: 10px 0px">
           <img :src="require(`@/assets/img/arrow-left.svg`)" style="width: 28px; height: 28px;"/>
        </div>
        <div class="checkout__title">Mot de passe oublié</div>
      </div>
      <div class="checkout__body" style="overflow: scroll; padding: 15px;">
        <div style="margin: 0px auto;">
          <Lottie :options="defaultOptions" :width="200" v-on:animCreated="handleAnimation"/>
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
    Lottie
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      defaultOptions: {animationData: animationData},
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      popup: false,
      popupPassword: false,
      popupUserRegistration: false,
      popupLogin: false,
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
      isReset: false,
      device: null,
      connection: null,
      wifiIPAddress: null,
      carrierIPAddress: null,
      timezone: null,
      locale: null,
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
      this.device = window.device;
      console.log(this.device);
    }

    try {
      this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.locale = Intl.DateTimeFormat().resolvedOptions().locale;
    } catch (error) {
      console.error(error);
    }

    if (navigator.connection && navigator.connection.type) {
      this.connection = navigator.connection.type;
    }

    if (window.networkinterface) {
      window.networkinterface.getWiFiIPAddress((ipInformation) => {
        if (ipInformation.ip) {
          this.wifiIPAddress = ipInformation.ip;
        }
      }, (error) => {
        console.log(error);
      });

      window.networkinterface.getCarrierIPAddress((ipInformation) => {
        if (ipInformation.ip) {
          this.carrierIPAddress = ipInformation.ip;
        }
      }, (error) => {
        console.log(error);
      });
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
      this.errorEmailRecovery = false;

      // envoyer mail pour reinitialiser mdp
      if (!this.forgotEmail) {
        this.errorEmailRecovery = true;
      }

      if (!this.errorEmailRecovery && !this.isReset) {
        this.isReset = true;
      }
    },
    open() {
      window.StatusBar.overlaysWebView(false);  
      window.StatusBar.styleDefault();
      window.StatusBar.backgroundColorByHexString("#ffffff");
      
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popupUserRegistration = false;
      this.popupPassword = false;
      this.popupLogin = false;
      this.popup = true;
    },
    forgotPassword() {
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popupUserRegistration = false;
      this.popup = false;
      this.popupLogin = false;
      this.popupPassword = true;
    },
    userRegistration() {
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popup = false;
      this.popupPassword = false;
      this.popupLogin = false;
      this.popupUserRegistration = true;
    },
    userLogin() {
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popup = false;
      this.popupPassword = false;
      this.popupUserRegistration = false;
      this.popupLogin = true;
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
        var httpParams = { "email": this.email, "password": this.password, "firstname": this.firstname, "lastname": this.lastname, "picture": this.picture, "wifiIPAddress": this.wifiIPAddress, "carrierIPAddress": this.carrierIPAddress, "connection": this.connection, "device": this.device, "timezone": this.timezone, "locale": this.locale };
        var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };

        await window.cordova.plugin.http.post(this.baseUrl + "/api/user/register", httpParams, httpHeader, (response) => {
          console.log(response);
          window.localStorage.setItem("user", response.data);
          this.authenticate(true);
        }, (response) => {
          this.loading = false;
          console.log(response.error);
          window.plugins.toast.show(response.error, 'long', 'top', {}, {});
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
        window.plugins.toast.show(response.error, 'long', 'top', {}, {});
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
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetHeight: 256,
        targetWidth: 256,
        allowEdit: true,
        correctOrientation: true
      }

      this.uploadImage(options);
    },
    openCamera() {
      var options = {
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetHeight: 256,
        targetWidth: 256,
        allowEdit: true,
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
