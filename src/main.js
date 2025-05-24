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

import { App as CapacitorApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Network } from '@capacitor/network';
import { Device } from '@capacitor/device';
import { Capacitor, CapacitorHttp } from '@capacitor/core';
import { Camera } from '@capacitor/camera';
import { Haptics } from '@capacitor/haptics';
import { Toast } from '@capacitor/toast';
import { Browser } from '@capacitor/browser';
import { Dialog } from '@capacitor/dialog';
import { ActionSheet } from '@capacitor/action-sheet';
import { Share } from '@capacitor/share';

const app = createApp(App);
const pinia = createPinia();

const platform = Capacitor.getPlatform();
const isNative = platform === 'ios' || platform === 'android';
const isProd = window.location.protocol === 'https:' || (isNative && window.location.protocol === 'capacitor:');

if (isProd) {
  Pusher.logToConsole = true;
  if (import.meta.env.VITE_BUGSNAG_API_KEY) {
    Bugsnag.start({
      apiKey: import.meta.env.VITE_BUGSNAG_API_KEY,
      plugins: [new BugsnagPluginVue()],
    });
    app.use(Bugsnag.getPlugin('vue'));
  }
  window.localStorage.setItem("baseUrl", import.meta.env.VITE_APP_URL || "https://swipelive.app");
  window.localStorage.setItem("stripe_pk", import.meta.env.VITE_STRIPE_PUBLIC_KEY);
} else {
  app.config.devtools = true;
  window.localStorage.setItem("baseUrl", import.meta.env.VITE_DEV_APP_URL || "https://127.0.0.1:8000");
  window.localStorage.setItem("stripe_pk", import.meta.env.VITE_STRIPE_PUBLIC_KEY);
}

app.use(router);
app.use(pinia);
app.use(VueObserveVisibility);
app.use(Vue3TouchEvents);
app.use(Vue3Lottie);
app.use(VueClickAway);

app.config.globalProperties.$cloudinary = import.meta.env.VITE_CLOUDINARY_URL;
app.config.globalProperties.$cloudinary256x256 = import.meta.env.VITE_CLOUDINARY_THUMB_256;
app.config.globalProperties.$cloudinary750x750 = import.meta.env.VITE_CLOUDINARY_THUMB_750;
app.config.globalProperties.$amazonS3 = import.meta.env.VITE_AMAZON_S3_URL;
app.config.globalProperties.$googleAPIKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
app.config.globalProperties.$StatusBar = StatusBar;
app.config.globalProperties.$Style = Style;
app.config.globalProperties.$Network = Network;
app.config.globalProperties.$Device = Device;
app.config.globalProperties.$CapacitorHttp = CapacitorHttp;
app.config.globalProperties.$Capacitor = Capacitor;
app.config.globalProperties.$Camera = Camera;
app.config.globalProperties.$Haptics = Haptics;
app.config.globalProperties.$Toast = Toast;
app.config.globalProperties.$Browser = Browser;
app.config.globalProperties.$Dialog = Dialog;
app.config.globalProperties.$ActionSheet = ActionSheet;
app.config.globalProperties.$Share = Share;

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

app.config.globalProperties.$formatDate3 = (datetime) => {
  const date = new Date(datetime);
  const formattedDate = date.toLocaleDateString(navigator.language, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${formattedDate} ${formattedTime}`;
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

const init = () => {
  app.mount('#app');
};

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

init();
