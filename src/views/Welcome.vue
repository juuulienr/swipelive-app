<template>
  <div>
    <div class="logo">
      <img :src="require(`@/assets/img/logo.png`)" style="position: absolute; z-index: 15000; width: 200px; left: calc(50% - 100px); top: 60px;">
    </div>
    <div class="video-player">
      <div playsinline="true" webkit-playsinline="true">
        <video style="height: 100vh; object-fit: cover; width: 100%;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/welcome.mp4`)" preview='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>'></video>
      </div>
    </div>
    <div v-if="!popup && !popupEmail && !popupPassword && !popupUserRegistration" @click="open()" class="btn-swipe" :style="{'bottom': safeareaBottom }" style="position: fixed; z-index: 15000;color: white; left: 25px; width: calc(100vw - 50px); text-align: center;">
      Accéder
    </div>

    <!-- login popup -->
    <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popup" style="border-radius: 30px; box-shadow: rgba(0, 0, 0, 1) 0px 10px 5px 0px;"> 
      <div style="padding: 15px;">
        <div style="background: white; width: 100%; text-align: center; padding: 15px; padding-top: 0px; margin: 10px 0px;">
          <h5 style="font-weight: 600; margin-bottom: 0px; color: rgb(22, 24, 35); font-size: 18px;">Swipe Live</h5>
        </div>

        <div class="social-container-NE2xk">
          <div @click="checkEmail()" class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <div class="channel-icon-33qGs" style="background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAANlBMVEVHcEwAAAAJChIMDBkWGCIOEBcOEBcJCg8QEhwNDxQUFiAAAAAAAAAVFyMDBAYQEhsWGCMAAAD5xs1FAAAAEHRSTlMA7zAQ33+jXkIgxt/B72+Q9PCfEQAAASBJREFUSMftVMsSgyAM5CUEENT//9k2aEesQNLeOtM9EciSLCwI8cd30GDNugbrmPnwzN5hWJRprTB9mM9guD0NhFC2DIEgYP9G7WNfAkYB/4oUXQLbsGe4XMMGwnVLIHvCHuorfItJgiAJpta8q06khul6aGFIyLilfkXlIsZ+0gn3PBga6yXPsJKB07WkmUJxUAohlUGgX4+pzRo8470tZ/6iWU/O29JOssB/1grA//K35LONctvkHDJHB8xbhZn6mdQlHRGHVbLc7sgD5x19ZKXxh81HuWmcP0N95yOGwzX5ptKVJpvSfcR8dTsGZMiWCUt11Tg4nG/8Zr7bbG7vhAViWxwe1nKbjT1tz8tHFbdZ2S3QWXNRdn0zWvtFPAAmbxZPKTUEzQAAAABJRU5ErkJggg==');"></div>
            </div>
            <div class="channel-name-2qzLW">Continuer avec un email</div>
          </div>
          <div @click="facebook()" class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <div class="channel-icon-33qGs" style="background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAALVBMVEVHcEwYdfEYdvIXd/IYd+8Xd+8Xd/IXd/IQcO8Yd/IXd/EXd/IYdvMXdvIYd/JU6UsnAAAADnRSTlMAgKDGQCFa7xDfkK9/bxPrucEAAAFTSURBVCjPbdM/S8NAFADwh9Ua/Idx6lSKOEuhg+IQMjtIKWRxKNncOokIQhCcXKSfIIsgTqGrS/ETCH4Da/+EtHKfwbvkvcu75t5ydz+Ou5d3eQBFOJcfUdp5ewQjNs9EHqvQUE9gZMy3tMr9Xc03gsUd6Z4w4hP5y+Q/62baPtDrh+NOLIdFnkZMeqJSlWOqktkgvQVk0eZnhJpnckJn/ILmKY4q5iULvzx6qPD7KJ+3YJt4JPkU5/dwRdwCqNN8Bk2aHrLvXYLHWN+zsnMGkY1TEDYWyPMgkI/uBMG1wT/0UrvIsck1vHJs8oEoapWY3MfPGZhc1GIBL/k4cV1f1sR1x1jkmi3vNuzbOAQnqnImL2lWWf0oz1UeQvnGjH2VarLOE1YGxqOimzyTp9hXTyafUyESzkvdO/W45JS1Wq/kd96YvbjgtLHWxq+Sdy58XP4DJ30Z99MJep4AAAAASUVORK5CYII=');"></div>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Facebook</div>
          </div>
          <div v-if="platformiOS" @click="apple()" class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2697 2C16.409 3.18387 15.9052 4.34936 15.1683 5.20627C14.3998 6.04939 13.1691 6.69506 11.9709 6.61148C11.8148 5.47353 12.4213 4.26303 13.1009 3.52461C13.8694 2.68607 15.2029 2.04409 16.2697 2ZM20.1919 8.82358C20.0541 8.90017 17.8421 10.1304 17.8666 12.6362C17.8943 15.6652 20.7154 16.6654 20.75 16.6764C20.7332 16.7462 20.3085 18.1211 19.2505 19.5162C18.3665 20.7451 17.4399 21.9464 15.9701 21.9684C15.2711 21.9833 14.7993 21.7962 14.3076 21.6013C13.7945 21.3979 13.2598 21.1859 12.4229 21.1859C11.5362 21.1859 10.9778 21.4046 10.4393 21.6155C9.9737 21.7979 9.52296 21.9745 8.88762 21.9987C7.48694 22.0474 6.41716 20.6872 5.50148 19.4694C3.67209 16.9841 2.24671 12.4644 4.1571 9.3895C5.08266 7.88142 6.77178 6.90972 8.57548 6.884C9.37005 6.86838 10.1322 7.15321 10.8003 7.40287C11.3108 7.59363 11.7664 7.76386 12.1394 7.76386C12.4677 7.76386 12.911 7.6002 13.4276 7.40949C14.2414 7.10901 15.2371 6.74139 16.2516 6.84083C16.945 6.8592 18.9206 7.09524 20.1949 8.8219L20.1919 8.82358Z" fill="#161823"/>
              </svg>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Apple</div>
          </div>
          <hr style="border-color: #FE2C55; margin: 30px 0px;">
          <div @click="goVendor()" class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <div class="channel-icon-33qGs" :style="{'background-image': 'url(' + require('@/assets/img/store.png') + ')'}"></div>
            </div>
            <div class="channel-name-2qzLW">Inscription Vendeur</div>
          </div>
          <div @click="goInfluencer()" class="channel-item-wrapper-2gBWB" style="margin-bottom: 7px;">
            <div class="channel-icon-wrapper-2eYxZ">
              <div class="channel-icon-33qGs" :style="{'background-image': 'url(' + require('@/assets/img/star.png') + ')'}"></div>
            </div>
            <div class="channel-name-2qzLW">Inscription Influenceur</div>
          </div>
        </div>
        <div class="manage" style="margin-bottom: 20px;">
          En continuant, vous acceptez nos 
          <span @click="openUrl('https://swipelive.fr/mentions-legales')" style="color: #007bff; text-decoration: underline;"> Mentions légales</span>
        </div>
      </div>
    </div>


    <!-- email popup -->
    <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popupEmail" style="border-radius: 30px; box-shadow: rgba(0, 0, 0, 1) 0px 10px 5px 0px;"> 
      <div style="padding: 15px;">
        <div style="background: white; width: 100%; text-align: center; padding: 15px; padding-top: 0px; margin: 10px 0px;">
          <svg @click="open()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823; float: left;">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
          <h5 style="font-weight: 600; margin-bottom: 0px; color: rgb(22, 24, 35); font-size: 18px;">Connexion</h5>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLoginEmail }">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="loginEmail" style="text-transform: lowercase;">
          </fieldset>
        </div>
        <div v-if="errorEmail" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: -10px;">Email obligatoire</div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLoginPassword }">
          <fieldset>
            <legend>Mot de passe</legend>
            <input type="password" v-model="loginPassword">
          </fieldset>
        </div>
        <div v-if="errorLoginPassword" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: -10px;">Mot de passe obligatoire</div>
        <div @click="forgotPassword()" class="small-1UkQD grey-rBkrL link-2j8GS" style="color: #999 !important; font-size: 13px; font-weight: 500; margin-top: -10px;">
          Mot de passe oublié ?
        </div>
        <div @click="login()" class="btn-swipe" style="color: white; margin: 15px auto 0px; text-align: center;">
          Se connecter
        </div>

        <div class="footer-bottom-wrapper-1a-rL" style="margin-bottom: 10px;">
          <div class="toggle-2SAdO is-modal-1F8S3">
            <div>Pas encore de compte ?</div>
            <div @click="userRegistration()" class="big-2_yje red-NZrsR link-2j8GS" style="margin-left: 5px; color: #FE2C55 !important; font-weight: bold;">
              Inscription
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- user registration popup -->
    <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popupUserRegistration" style="border-radius: 30px; box-shadow: rgba(0, 0, 0, 1) 0px 10px 5px 0px;"> 
      <div style="padding: 15px;">
        <div style="background: white; width: 100%; text-align: center; padding: 15px; padding-top: 0px; margin: 10px 0px;">
          <svg @click="open()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823; float: left;">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
          <h5 style="font-weight: 600; margin-bottom: 0px; color: rgb(22, 24, 35); font-size: 18px;">Inscription</h5>
        </div>

        
        <div class="form--input"> 
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

        <div @click="register()" class="btn-swipe" style="color: white; margin: 15px auto 30px; text-align: center;">
          S'inscrire
        </div>
      </div>
    </div>


    <!-- forgot password popup -->
    <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popupPassword" style="border-radius: 30px; box-shadow: rgba(0, 0, 0, 1) 0px 10px 5px 0px;"> 
      <div style="padding: 15px;">
        <div style="background: white; width: 100%; text-align: center; padding: 15px; padding-top: 0px; margin: 10px 0px;">
          <svg @click="checkEmail()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823; float: left;">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
          <h5 style="font-weight: 600; margin-bottom: 0px; color: rgb(22, 24, 35); font-size: 18px;">Mot de passe oublié</h5>
        </div>

        <p style="font-size: 13px; color: #999; text-align: center; margin-bottom: 20px;">Entrez l'adresse email associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
        <div class="form--input--item" :class="{'form--input--item--error': errorEmailRecovery }">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="forgotEmail">
          </fieldset>
        </div>
        <div v-if="errorEmailRecovery" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: -10px;">Email obligatoire</div>
        <div v-if="reset" style="font-size: 13px; color: rgb(66, 210, 164); margin-bottom: 12px; text-align: center; font-weight: 600;">Un mail a été envoyé pour réinitialiser votre mot de passe.</div>
        <div @click="submitPassword()" class="btn-swipe" style="color: white; margin: 0px auto 30px; text-align: center;">
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
  min-height: 50px;
  border: 1px solid rgba(22,24,35,.12);
  box-sizing: border-box;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding: 0 12px 0 0;
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
  color: #161823;
  font-weight: 600;
}

.social-container-NE2xk {
  overflow-y: auto;
  width: 100%;
  padding: 0px 20px;
}

.manage {
  font-weight: 500;
  padding-bottom: 20px;
  font-size: 12px;
  margin: 0 auto;
  text-align: center;
  padding: 10px 40px;
  color: #666;
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
  color: #161823;
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
      platformiOS: false,
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
      this.platformiOS = true;
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
      // window.facebookConnectPlugin.login(['public_profile', 'email'])
      // .then(succ => {
      //   console.log(JSON.stringify(succ));
      // })
      // .catch(err => {
      //   console.log(err);
      // });
    },
    apple() {
      // window.cordova.plugins.SignInWithApple.signin({ requestedScopes: [0, 1] },
      //   function(succ){
      //     console.log(JSON.stringify(succ));
      //   },
      //   function(err){
      //     console.log(JSON.stringify(err))
      //   }
      // );
    },
    open() {
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
