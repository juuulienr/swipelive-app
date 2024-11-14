import { createApp } from 'vue';
import App from './App.vue';
import Pusher from 'pusher-js';
import router from './router/index';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginVue from '@bugsnag/plugin-vue';
import VueObserveVisibility from 'vue3-observe-visibility';
import Vue3TouchEvents from 'vue3-touch-events';
import VueClickAway from 'vue3-click-away';
import Vue3Lottie from 'vue3-lottie';
import { createPinia } from 'pinia';

// Capacitor plugins
import { App as CapacitorApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Network } from '@capacitor/network';
import { Haptics } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

const app = createApp(App);
const pinia = createPinia();

const platform = Capacitor.getPlatform();
const isNative = platform === 'ios' || platform === 'android';
const isProd = window.location.protocol === 'https:' || (isNative && window.location.protocol === 'capacitor:');

if (isProd) {
  Pusher.logToConsole = true;
  
  Bugsnag.start({
    apiKey: 'b6f579675362830a12146a96a851e17a',
    plugins: [new BugsnagPluginVue()],
  });
  app.use(Bugsnag.getPlugin('vue'));

  window.localStorage.setItem("baseUrl", "https://swipelive.app");
  window.localStorage.setItem("stripe_pk", "pk_test_51NQoyJCOKsXVy6xIP72rXh2yvMCbdTClOBj02XCAyyX2rbo08W2KJKGZUnyfjLZAuasHCpLILPQ7i6plttHbXGF600jHHHqMK5");
} else {
  app.config.devtools = true;

  window.localStorage.setItem("baseUrl", "https://127.0.0.1:8000");
  window.localStorage.setItem("stripe_pk", "pk_test_51NQoyJCOKsXVy6xIP72rXh2yvMCbdTClOBj02XCAyyX2rbo08W2KJKGZUnyfjLZAuasHCpLILPQ7i6plttHbXGF600jHHHqMK5");
}

app.use(router);
app.use(pinia);
app.use(VueObserveVisibility);
app.use(Vue3TouchEvents);
app.use(Vue3Lottie);
app.use(VueClickAway);

app.config.globalProperties.$cloudinary = 'https://res.cloudinary.com/dxlsenc2r/image/upload/';
app.config.globalProperties.$cloudinary256x256 = 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/';
app.config.globalProperties.$amazonS3 = 'https://swipe-live-app-storage-eu-west-3.s3.eu-west-3.amazonaws.com/';
app.config.globalProperties.$googleAPIKey = 'AIzaSyBrLhSgilRrPKpGtAPbbzcaIp-5L5VgE_w';

app.config.globalProperties.$formatDate = (datetime) => {
  const today = new Date();
  const date = new Date(datetime);
  return date.toDateString() === today.toDateString()
    ? date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })
    : date.toLocaleDateString(navigator.language, { day: '2-digit', month: '2-digit' });
};

app.config.globalProperties.$formatDate2 = (datetime) => {
  const date = new Date(datetime);
  return date.toLocaleDateString(navigator.language);
};

app.config.globalProperties.$truncate = (text, length) => {
  if (text.length > length) {
    let truncatedText = text.substring(0, length);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');
    if (lastSpaceIndex !== -1) {
      truncatedText = truncatedText.substring(0, lastSpaceIndex);
    }
    return truncatedText + '...';
  }
  return text;
};

app.config.globalProperties.$formatPrice = (value) => {
  let val = (value / 1).toFixed(2).replace(".", ",");
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

app.config.globalProperties.$formatDateDiff = (date) => {
  const diffInMs = new Date() - new Date(date);
  const diffInMinutes = diffInMs / 1000 / 60;
  const diffInHours = diffInMinutes / 60;

  if (diffInMinutes < 60) {
    return Math.floor(diffInMinutes) > 1
      ? `En ligne il y a ${Math.floor(diffInMinutes)} minutes`
      : `En ligne il y a 1 minute`;
  } else if (diffInHours < 24) {
    return Math.floor(diffInHours) > 1
      ? `En ligne il y a ${Math.floor(diffInHours)} heures`
      : `En ligne il y a 1 heure`;
  }

  return "";
};

app.config.globalProperties.$formatLikes = (value) => {
  if (value < 1000) {
    return value;
  } else if (value < 1000000) {
    return (value / 1000).toFixed(2) + 'k';
  } else {
    return (value / 1000000).toFixed(2) + 'm';
  }
};

// Initialisation de l'application
const init = () => {
  app.mount('#app');
  if (isNative) {
    StatusBar.setStyle({ style: Style.Light });
    Haptics.vibrate();
  }
};

// Gestion des événements Capacitor
CapacitorApp.addListener("appStateChange", (state) => {
  if (!state.isActive) {
    console.log("App is in background");
  }
});

Network.addListener("networkStatusChange", (status) => {
  if (!status.connected) {
    console.log("Pas de connexion Internet");
  }
});

// Démarre l'application
init();
