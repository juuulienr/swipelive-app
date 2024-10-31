import '@babel/polyfill';
import { createApp } from 'vue';
import App from './App.vue';
import Pusher from 'pusher-js';
import router from './router/index';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginVue from '@bugsnag/plugin-vue';
import VueObserveVisibility from 'vue3-observe-visibility';
import * as VueGoogleMaps from "vue3-google-map";
import Vue3TouchEvents from "vue3-touch-events";
import VueClickAway from "vue3-click-away";
import Vue3Lottie from 'vue3-lottie';
import store from "./store/store.js";

const app = createApp(App);

// Configurer Pusher et Bugsnag
if (window.location.protocol === 'file:' || window.location.protocol === 'https:') {
  Pusher.logToConsole = true;
  app.config.productionTip = true;
  Bugsnag.start({ apiKey: 'b6f579675362830a12146a96a851e17a', plugins: [new BugsnagPluginVue()] });
  app.use(Bugsnag.getPlugin('vue')); 
  window.localStorage.setItem("baseUrl", "https://swipelive.app");
  window.localStorage.setItem("stripe_pk", "pk_test_51NQoyJCOKsXVy6xIP72rXh2yvMCbdTClOBj02XCAyyX2rbo08W2KJKGZUnyfjLZAuasHCpLILPQ7i6plttHbXGF600jHHHqMK5");
} else {
  app.config.productionTip = false;
  window.localStorage.setItem("baseUrl", "https://127.0.0.1:8000");
  window.localStorage.setItem("stripe_pk", "pk_test_51NQoyJCOKsXVy6xIP72rXh2yvMCbdTClOBj02XCAyyX2rbo08W2KJKGZUnyfjLZAuasHCpLILPQ7i6plttHbXGF600jHHHqMK5");
}

// Initialiser les plugins avec Vue 3
app.use(router);
app.use(store);
app.use(VueObserveVisibility);
app.use(Vue3TouchEvents);
app.use(Vue3Lottie);
app.use(VueClickAway);
app.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBrLhSgilRrPKpGtAPbbzcaIp-5L5VgE_w",
    libraries: "places"
  }
});

// Définir des propriétés globales
app.config.globalProperties.$cloudinary = 'https://res.cloudinary.com/dxlsenc2r/image/upload/';
app.config.globalProperties.$cloudinary256x256 = 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/';
app.config.globalProperties.$amazonS3 = 'https://swipe-live-app-storage-eu-west-3.s3.eu-west-3.amazonaws.com/';
app.config.globalProperties.$googleAPIKey = 'AIzaSyBrLhSgilRrPKpGtAPbbzcaIp-5L5VgE_w';

const init = () => {
  app.mount('#app');
};

// Événements Cordova
document.addEventListener("deviceready", () => {
  if (window.plugins && window.plugins.insomnia) {
    window.plugins.insomnia.keepAwake();
  } else {
    console.warn("Insomnia plugin is not available");
  }

  init();
});

// Événements de statut réseau et de batterie
document.addEventListener("offline", () => {
  window.plugins.toast.show("Pas de connexion Internet", 'long', 'top');
});

window.addEventListener("batterycritical", (event) => {
  window.plugins.toast.show("Niveau de batterie critique : " + event.level + "%", 'long', 'top');
}, false);

// Si Cordova n'est pas détecté, déclenche manuellement l'événement "deviceready"
const isCordovaApp = (typeof window.cordova !== "undefined");
if (!isCordovaApp) {
  document.dispatchEvent(new CustomEvent("deviceready", {}));
}
