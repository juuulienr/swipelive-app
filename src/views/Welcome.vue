<template>
  <div class="welcome">
    <!-- velcome video -->
    <div class="video-player">
      <div playsinline="true" webkit-playsinline="true">
        <video v-if="isAndroid" ref="welcomeVideo" style="height: 100vh; object-fit: cover; position: fixed; width: 100%; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop muted="muted" autoplay src="/video/welcome.mp4" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" @loadeddata="onVideoLoaded"></video>
        <video v-else ref="welcomeVideo" style="height: 99vh; object-fit: cover; width: 100%;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" src="/video/welcome.mp4" preview='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>' @loadeddata="onVideoLoaded"></video>
      </div>
    </div>
    <div v-if="!popup && !popupLogin && !popupPassword && !popupUserRegistration" class="btn-open" :style="{'bottom': safeareaBottom }" @click="open()">
      Accéder
    </div>

    <!-- welcome popup -->
    <div v-if="popup" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; animation: none;"> 
      <div class="bg-welcome" style="padding: 15px;">
        <div class="checkout__title" style="margin-top: 12px; font-size: 22px; margin-bottom: 20px;">Achetez, Vendez & Swipez 🛍</div>
        <p style="text-align: center;margin: 0px 30px;font-weight: 400;margin-bottom: 30px;">Créez un compte pour commencer à acheter, vendre et profiter de plein de réductions en live !</p>

        <div class="social-container-NE2xk" style="padding: 0px;">
          <div class="channel-item-wrapper-2gBWB" style="background: #ff2f80; border: none; margin-bottom: 0px;" @click="userRegistration()">
            <div class="channel-icon-wrapper-2eYxZ">
              <img src="/img/mail.png" style="width: 24px; height: 24px; margin-bottom: 7px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">S'inscrire par email</div>
          </div>
        </div>

        <div class="tv-signin-dialog__separator" style="margin-top: 15px; margin-bottom: 15px;">
          <div class="tv-signin-dialog__separator-text">ou</div>
        </div>

        <div class="social-container-NE2xk">
          <div v-if="!isAndroid" class="channel-item-wrapper-2gBWB" style="background: black; border: none;" @click="signInWithApple()">
            <div class="channel-icon-wrapper-2eYxZ">
              <img src="/img/apple.png" style="width: 24px; height: 24px; margin-bottom: 3px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">Continuer avec Apple</div>
          </div>
          <div class="channel-item-wrapper-2gBWB" style="background: #1e74e4; border: none;" @click="signInWithFacebook()">
            <div class="channel-icon-wrapper-2eYxZ">
              <img src="/img/facebook.png" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">Continuer avec Facebook</div>
          </div>
          <div class="channel-item-wrapper-2gBWB" @click="signInWithGoogle()">
            <div class="channel-icon-wrapper-2eYxZ">
              <img src="/img/google.png" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Google</div>
          </div>
        </div>

        <p style="text-align: center;margin: 10px 30px 15px;font-weight: 400;color: #a7a8a9;">Avez-vous déjà un compte ?</p>
        <p style="text-align: center;color: #ff2f80;" @click="userLogin()">SE CONNECTER</p>
      </div>
    </div>


    <!-- login popup -->
    <div v-if="popupLogin" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; animation: none;"> 
      <div class="checkout__header" style="padding: 13px 15px 13px;">
        <div class="checkout__close-btn" style="padding: 10px 0px" @click="open()">
           <img src="/img/arrow-left.svg" style="width: 28px; height: 28px;"/>
        </div>
      </div>
      <div style="padding: 15px;">
        <div class="checkout__title" style="margin-top: 40px; font-size: 22px; margin-bottom: 20px;">Se connecter</div>
        <div v-if="errorLoginEmail || errorLoginPassword" style="font-size: 13px; color: red; margin-bottom: 5px; text-align: center; font-weight: 400;">Identifiant ou mot de passe incorrect</div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLoginEmail }" style="margin-top: 15px">
          <fieldset>
            <legend>Email</legend>
            <input id="email" v-model="loginEmail" type="text" style="text-transform: lowercase;">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLoginPassword }" style="margin-bottom: 15px;">
          <fieldset>
            <legend>Mot de passe</legend>
            <input id="password" v-model="loginPassword" type="password">
          </fieldset>
        </div>

        <div style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; padding: 15px 0px 10px; ">
          <div class="btn-swipe" style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; width: 275px; margin: 0 auto; padding: 13px 48px; border-radius: 30px;" @click="login()">
            <span v-if="loading">
              <svg viewBox="25 25 50 50" class="loading">
                <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
              </svg>
            </span>
            <span v-else>Se connecter</span>
          </div>
        </div>

        <div class="small-1UkQD grey-rBkrL link-2j8GS" style="color: rgb(82, 92, 102) !important; font-size: 12px; font-weight: 400; text-align: center;" @click="forgotPassword()"> Mot de passe oublié ?</div>

        <div class="tv-signin-dialog__separator" style="margin-top: 15px; margin-bottom: 15px;">
          <div class="tv-signin-dialog__separator-text">ou</div>
        </div>

        <div class="social-container-NE2xk">
          <div v-if="!isAndroid" class="channel-item-wrapper-2gBWB" style="background: black; border: none;" @click="signInWithApple()">
            <div class="channel-icon-wrapper-2eYxZ">
              <img src="/img/apple.png" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">Continuer avec Apple</div>
          </div>
          <div class="channel-item-wrapper-2gBWB" style="background: #1e74e4; border: none;" @click="signInWithFacebook()">
            <div class="channel-icon-wrapper-2eYxZ">
              <img src="/img/facebook.png" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">Continuer avec Facebook</div>
          </div>
          <div class="channel-item-wrapper-2gBWB" @click="signInWithGoogle()">
            <div class="channel-icon-wrapper-2eYxZ">
              <img src="/img/google.png" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Google</div>
          </div>
        </div>
      </div>
    </div>


    <!-- registration popup -->
    <div v-if="popupUserRegistration" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; animation: none;"> 
      <div class="checkout__header" style="padding: 13px 15px 13px;">
        <div class="checkout__close-btn" style="padding: 10px 0px" @click="open()">
           <img src="/img/arrow-left.svg" style="width: 28px; height: 28px;"/>
        </div>
        <div class="checkout__title">S'inscrire</div>
      </div>
      <div class="checkout__body" style="overflow: scroll; padding: 15px;">
        <div class="general--profile">
          <span>
            <span v-if="loadingImg">
              <svg viewBox="25 25 50 50" class="loading" style="width: 24px; height: 24px; top: calc(50% - 13px); left: calc(50% - 13px);">
                <circle cx="50" cy="50" r="20" style="stroke: #ff2f80;"></circle>
              </svg>
            </span>
            <span v-else-if="picture" @click="uploadSheet()">
              <img :src="$cloudinary256x256 + picture" style="object-fit: cover; width: 142px; height: 142px;">
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
      			<input v-model="firstname" type="text" style="text-transform: capitalize;">
      		</fieldset>
      	</div>

      	<div class="form--input--item" :class="{'form--input--item--error': errorLastname }">
      		<fieldset>
      			<legend>Nom</legend>
      			<input v-model="lastname" type="text" style="text-transform: capitalize;">
      		</fieldset>
      	</div>

        <div class="form--input--item" :class="{'form--input--item--error': errorEmail }">
          <fieldset>
            <legend>Email</legend>
            <input v-model="email" type="text" style="text-transform: lowercase;">
          </fieldset>
        </div>
        
        <div class="form--input--item" :class="{'form--input--item--error': errorPassword }">
          <fieldset>
            <legend>Mot de passe</legend>
            <input v-model="password" type="password">
          </fieldset>
        </div>

        <div class="btn-swipe" style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; margin-top: 20px;" @click="register()">
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
    <div v-if="popupPassword" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; animation: none;"> 
      <div class="checkout__header" style="padding: 13px 15px 13px;">
        <div class="checkout__close-btn" style="padding: 10px 0px" @click="open()">
           <img src="/img/arrow-left.svg" style="width: 28px; height: 28px;"/>
        </div>
        <div class="checkout__title">Mot de passe oublié</div>
      </div>
      <div class="checkout__body" style="overflow: scroll; padding: 15px;">
        <div style="margin: 0px auto;">
          <Vue3Lottie :animationData="LottieJSON" :width="200" v-on:animCreated="handleAnimation"/>
        </div>

        <p v-if="isReset" style="font-size: 13px; color: #525c66; text-align: left; margin-bottom: 30px; font-weight: 400;">Un mail a été envoyé pour réinitialiser votre mot de passe.</p>
        <p v-else style="font-size: 13px; color: #525c66; text-align: left; margin-bottom: 30px; font-weight: 400;">Entrez l'adresse email associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>

        <div class="form--input--item" :class="{'form--input--item--error': errorEmailRecovery }">
          <fieldset>
            <legend>Email</legend>
            <input v-model="forgotEmail" type="text">
          </fieldset>
        </div>

        <div style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; padding: 0px 0px 10px;">
          <div class="btn-swipe" :disabled="isReset ? disabled : ''" style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em;" @click="resetPassword()">Réinitialiser</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthAPI from "../utils/auth.js";
import LottieJSON from '../assets/lottie/forgot-password.json';
import { useMainStore } from '../stores/useMainStore';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { initializeApp } from 'firebase/app';
import { toRaw } from 'vue';
import { Camera } from '@capacitor/camera';

export default {
  name: 'Welcome',
  setup() {
    const mainStore = useMainStore();
    return { mainStore };
  },
  data() {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      appId: this.$Capacitor.getPlatform() === 'ios' ? import.meta.env.VITE_FIREBASE_IOS_APP_ID : import.meta.env.VITE_FIREBASE_ANDROID_APP_ID
    };

    initializeApp(firebaseConfig);

    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      LottieJSON: LottieJSON,
      popup: false,
      popupPassword: false,
      popupUserRegistration: false,
      popupLogin: false,
      loginEmail: '',
      loginPassword: '',
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
  async created() {
    if (this.$Capacitor.getPlatform() === "ios") {
      await this.$StatusBar.setStyle({ style: this.$Style.Default });
      await this.$StatusBar.setOverlaysWebView({ overlay: false });
      await this.$StatusBar.setBackgroundColor({ color: '#ffffff' });
    }

    if (this.$Capacitor.getPlatform() === "android") {
      await this.$StatusBar.setStyle({ style: this.$Style.Light });
      await this.$StatusBar.setOverlaysWebView({ overlay: false });
      await this.$StatusBar.setBackgroundColor({ color: '#ffffff' });
    }

    const isAuthenticated = AuthAPI.isAuthenticated();
    if (isAuthenticated) {
      this.$router.push({ name: 'Feed' });
    }

    if (this.$Capacitor.getPlatform() === "ios") {
      this.safeareaBottom = 'calc(env(safe-area-inset-bottom) + 40px)';
    }

    if (this.$Capacitor.getPlatform() === "android") {
      this.isAndroid = true;
    }

    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.locale = Intl.DateTimeFormat().resolvedOptions().locale;

    this.$Network.getStatus().then(status => {
      this.connection = status.connectionType;
    });
    this.$Network.addListener("networkStatusChange", status => {
      this.connection = status.connected ? status.connectionType : 'none';
    });

    this.getDeviceInfo();
  },
  mounted() {
    this.$refs.welcomeVideo.addEventListener('loadeddata', this.onVideoLoaded);
  },  
  beforeDestroy() {
    this.$refs.welcomeVideo.removeEventListener('loadeddata', this.onVideoLoaded);
  },
  methods: {
    async getDeviceInfo() {
      try {
        this.device = await this.$Device.getInfo();
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'appareil :", error);
      }
    },
    async signInWithFacebook() {
      this.$Haptics.impact({ style: 'medium' });
      try {
        const result = await FirebaseAuthentication.signInWithFacebook();
        console.log('Facebook sign-in success:', result);
      } catch (error) {
        console.error('Error with Facebook sign-in:', error);
      }
    },
    async facebook() {
      this.$Haptics.impact({ style: 'medium' });

      window.facebookConnectPlugin.login(
        ['email', 'public_profile'],
        async (response) => {
          this.loading = true;

          window.facebookConnectPlugin.api(
            `me/?fields=id,first_name,last_name,email,picture.type(large),birthday&access_token=${response.authResponse.accessToken}`,
            ["email", "public_profile"],
            async (result) => {
              this.email = result.email;
              this.password = Math.random().toString(36).slice(-15);

              const httpParams = {
                email: this.email.toLowerCase(),
                password: this.password,
                firstname: result.first_name,
                lastname: result.last_name,
                picture: result.picture.data.url,
                facebookId: response.authResponse.userID,
                wifiIPAddress: this.wifiIPAddress,
                carrierIPAddress: this.carrierIPAddress,
                connection: this.connection,
                device: toRaw(this.device),
                timezone: this.timezone,
                locale: this.locale,
              };

              try {
                const apiResponse = await this.$CapacitorHttp.request({
                  method: 'POST',
                  url: `${this.baseUrl}/api/authentication/facebook`,
                  headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                  data: httpParams,
                });

                this.authenticate(apiResponse.data);
              } catch (error) {
                this.loading = false;
                console.log(error);

                await this.$Toast.show({
                  text: 'Oups ! Une erreur est survenue.',
                  duration: 'long',
                  position: 'top',
                });
              }
            },
            (error) => {
              this.loading = false;
              console.log("Failed: ", error);
            }
          );
        },
        (loginError) => {
          console.log(loginError);
        }
      );
    },
    async signInWithGoogle() {
      this.$Haptics.impact({ style: 'medium' });

      try {
        const result = await FirebaseAuthentication.signInWithGoogle();
        console.log('Google sign-in success:', result);

        const user = result.user;
        const credential = result.credential;
        const additionalUserInfo = result.additionalUserInfo;
        const displayName = user.displayName || null;
        const photoUrl = user.photoUrl || null;
        const idToken = credential?.idToken || null;
        const givenName = additionalUserInfo?.profile?.given_name || displayName?.split(' ')[0] || null;
        const familyName = additionalUserInfo?.profile?.family_name || displayName?.split(' ')[1] || null;
        const googleId = additionalUserInfo?.profile?.id || user.uid;

        this.loading = true;
        this.email = user.email || null;
        this.password = Math.random().toString(36).slice(-15);

        const httpParams = {
          email: this.email.toLowerCase(),
          password: this.password,
          googleId: googleId,
          firstname: givenName,
          lastname: familyName,
          picture: photoUrl,
          idToken: idToken,
          wifiIPAddress: this.wifiIPAddress,
          carrierIPAddress: this.carrierIPAddress,
          connection: this.connection,
          device: toRaw(this.device),
          timezone: this.timezone,
          locale: this.locale,
        };

        try {
          const response = await this.$CapacitorHttp.request({
            method: 'POST',
            url: `${this.baseUrl}/api/authentication/google`,
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            data: httpParams,
          });

          console.log(response);
          this.authenticate(true);
        } catch (error) {
          this.loading = false;
          console.error('Error sending request:', error);

          await this.$Toast.show({
            text: 'Oups ! Une erreur est survenue.',
            duration: 'long',
            position: 'top',
          });
        }
      } catch (error) {
        console.error('Error with Google sign-in:', error);

        await this.$Toast.show({
          text: 'Erreur lors de la connexion avec Google.',
          duration: 'long',
          position: 'top',
        });
      }
    },
    async signInWithApple() {
      this.$Haptics.impact({ style: 'medium' });

      try {
        const result = await FirebaseAuthentication.signInWithApple();
        const uid = result.user.uid || null;
        const displayName = result.user.displayName || null;

        this.email = result.user.email || this.generateRandomEmail();
        this.password = Math.random().toString(36).slice(-15);
        this.loading = true;

        const httpParams = {
          email: this.email.toLowerCase(),
          password: this.password,
          firstname: displayName?.givenName || null,
          lastname: displayName?.familyName || null,
          appleId: uid || null,
          wifiIPAddress: this.wifiIPAddress,
          carrierIPAddress: this.carrierIPAddress,
          connection: this.connection,
          device: toRaw(this.device),
          timezone: this.timezone,
          locale: this.locale,
        };

        console.log(httpParams);

        try {
          const response = await this.$CapacitorHttp.request({
            method: 'POST',
            url: `${this.baseUrl}/api/authentication/apple`,
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            data: httpParams,
          });

          console.log(response);
          this.authenticate(response.data);
        } catch (error) {
          this.loading = false;
          console.error('Error sending request:', error);

          await this.$Toast.show({
            text: 'Oups ! Une erreur est survenue.',
            duration: 'long',
            position: 'top',
          });
        }
      } catch (error) {
        console.error('Error with Apple sign-in:', error);

        await this.$Toast.show({
          text: 'Erreur lors de la connexion avec Apple.',
          duration: 'long',
          position: 'top',
        });
      }
    },
    generateRandomEmail() {
      return `user_${Math.random().toString(36).substr(2, 9)}@example.com`;
    },
    resetPassword() {
      this.$Haptics.impact({ style: 'medium' });
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
      this.$Haptics.impact({ style: 'medium' });
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popupUserRegistration = false;
      this.popupPassword = false;
      this.popupLogin = false;
      this.popup = true;
    },
    forgotPassword() {
      this.$Haptics.impact({ style: 'medium' });
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popupUserRegistration = false;
      this.popup = false;
      this.popupLogin = false;
      this.popupPassword = true;
    },
    userRegistration() {
      this.$Haptics.impact({ style: 'medium' });
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popup = false;
      this.popupPassword = false;
      this.popupLogin = false;
      this.popupUserRegistration = true;
    },
    userLogin() {
      this.$Haptics.impact({ style: 'medium' });
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popup = false;
      this.popupPassword = false;
      this.popupUserRegistration = false;
      this.popupLogin = true;
    },
    async openUrl(url) {
      try {
        this.$Haptics.impact({ style: 'medium' });
        await this.$Browser.open({ url });
      } catch (error) {
        console.error('Erreur lors de l\'ouverture de l\'URL :', error);
      }
    },
    async login() {
      this.$Haptics.impact({ style: 'medium' });
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;

      if (!this.loginEmail) {
        this.errorLoginEmail = true;
      } else if (!this.checkEmail(this.loginEmail)) {
        this.errorLoginEmail = true;
      }

      if (!this.loginPassword) {
        this.errorLoginPassword = true;
      }

      if (!this.errorLoginEmail && !this.errorLoginPassword) {
        this.loading = true;

        try {
          const loginUrl = encodeURI(`${this.baseUrl}/user/api/login_check`);
          const loginResponse = await this.$CapacitorHttp.request({
            method: 'POST',
            url: loginUrl,
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            data: { username: this.loginEmail, password: this.loginPassword }
          });

          if (!loginResponse.data || !loginResponse.data.token) {
            throw new Error("Aucun jeton reçu dans la réponse de connexion");
          }

          const result = loginResponse.data;
          window.localStorage.setItem("token", result.token);
          const profileUrl = encodeURI(`${this.baseUrl}/user/api/profile`);

          const profileResponse = await this.$CapacitorHttp.request({
            method: 'GET',
            url: profileUrl,
            headers: { Authorization: `Bearer ${result.token}` }
          });

          if (!profileResponse.data) {
            throw new Error("Données de profil utilisateur non reçues");
          }

          const profileData = profileResponse.data;
          this.mainStore.setUser(profileData);
          
          this.$router.push({ name: 'Feed' });
        } catch (error) {
          console.error("Erreur lors de la procédure de connexion :", error);
          this.errorLoginPassword = true;
          this.errorLoginEmail = true;
        } finally {
          this.loading = false;
        }
      }
    },
    async register() {
      // Impact haptique
      this.$Haptics.impact({ style: 'medium' });
      this.errorFirstname = false;
      this.errorLastname = false;
      this.errorEmail = false;
      this.errorPassword = false;

      // Vérification des champs
      if (!this.email || !this.checkEmail(this.email)) {
        this.errorEmail = true;
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

        // Données de l'utilisateur pour la requête d'inscription
        const httpParams = {
          email: this.email.toLowerCase(),
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          picture: this.picture,
          wifiIPAddress: this.wifiIPAddress,
          carrierIPAddress: this.carrierIPAddress,
          connection: this.connection,
          device: toRaw(this.device),
          timezone: this.timezone,
          locale: this.locale,
        };

        try {
          // Requête POST pour l'inscription
          const response = await this.$CapacitorHttp.request({
            method: 'POST',
            url: `${this.baseUrl}/api/user/register`,
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            data: httpParams
          });

          // Traitement de la réponse en cas de succès
          this.mainStore.setUser(response.data);
          this.authenticate(true);

        } catch (error) {
          console.error("Erreur lors de l'inscription :", error);
          await this.$Toast.show({ text: 'Oups ! Une erreur est survenue.', duration: 'long' });
        } finally {
          this.loading = false;
        }
      }
    },
    checkEmail(email) {
      var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },
    async authenticate(newUser) {
      this.loading = true;

      const httpParams = {
        username: this.email,
        password: this.password
      };

      try {
        // Requête POST pour l'authentification
        const response = await this.$CapacitorHttp.request({
          method: 'POST',
          url: `${this.baseUrl}/user/api/login_check`,
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          data: httpParams
        });

        const result = response.data;
        window.localStorage.setItem("token", result.token);

        // Redirection en fonction du statut de l'utilisateur
        if (newUser) {
          this.$router.push({ name: 'Onboarding' });
        } else {
          this.$router.push({ name: 'Feed' });
        }

      } catch (error) {
        console.error("Erreur d'authentification :", error);
        await this.$Toast.show({ text: 'Oups ! Une erreur est survenue.', duration: 'long' });
      } finally {
        this.loading = false;
      }
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    async uploadSheet() {
      try {
        this.$Haptics.impact({ style: 'medium' });

        const result = await this.$ActionSheet.showActions({
          title: 'Ajouter une photo',
          options: [
            { title: 'À Partir de la bibliothèque', style: 'default' },
            { title: 'Prendre une photo', style: 'default' },
            { title: 'Annuler', style: 'cancel' },
          ],
        });

        console.log(result.index);

        if (result.index === 0) {
          this.openFilePicker();
        } else if (result.index === 1) {
          this.openCamera();
        }
      } catch (error) {
        console.log(error);
      }
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
    async uploadImage(options) {
      navigator.camera.getPicture(
        async (imageUri) => {
          this.loadingImg = true;

          try {
            if (this.$Capacitor.getPlatform() === "android" || this.$Capacitor.getPlatform() === "ios") {
              const formData = new FormData();
              formData.append("picture", imageUri);

              const response = await this.$CapacitorHttp.request({
                method: 'POST',
                url: `${this.baseUrl}/api/registration/picture`,
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: formData,
              });

              console.log(response.data);
              this.picture = response.data;
              this.loadingImg = false;
            } else {
              const imgData = `data:image/jpeg;base64,${imageUri}`;
              const response = await this.$CapacitorHttp.request({
                method: 'POST',
                url: `${this.baseUrl}/api/registration/picture`,
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                data: { picture: imgData },
              });

              console.log(response.data);
              this.picture = response.data;
              this.loadingImg = false;
            }
          } catch (error) {
            console.log(error);

            await this.$Toast.show({
              text: 'Oups ! Une erreur est survenue.',
              duration: 'long',
              position: 'top',
            });

            this.loadingImg = false;
          }
        },
        (error) => {
          console.log("Impossible de récupérer l'image : " + error);
        },
        options
      );
    },
  }
};

</script>


<style scoped src="../assets/css/welcome.css"></style>