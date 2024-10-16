import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import Pusher from 'pusher-js';
import Vue2TouchEvents from 'vue2-touch-events';
import router from './router/index';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginVue from '@bugsnag/plugin-vue';
import VueObserveVisibility from 'vue-observe-visibility';
import store from "./store/store.js";
import BugsnagPerformance from '@bugsnag/browser-performance'


if (window.location.protocol === 'file:' || window.location.protocol === 'https:') {
  Pusher.logToConsole = true;
  Vue.config.productionTip = true;
  Bugsnag.start({ apiKey: 'b6f579675362830a12146a96a851e17a', plugins: [new BugsnagPluginVue()]});
  BugsnagPerformance.start({ apiKey: 'b6f579675362830a12146a96a851e17a' })
  Vue.use(Bugsnag.getPlugin('vue'));
  window.localStorage.setItem("baseUrl", "https://swipelive.app");
  window.localStorage.setItem("stripe_pk", "pk_test_51NQoyJCOKsXVy6xIP72rXh2yvMCbdTClOBj02XCAyyX2rbo08W2KJKGZUnyfjLZAuasHCpLILPQ7i6plttHbXGF600jHHHqMK5");
} else {
  Vue.config.productionTip = false;
  window.localStorage.setItem("baseUrl", "https://127.0.0.1:8000");
  window.localStorage.setItem("stripe_pk", "pk_test_51NQoyJCOKsXVy6xIP72rXh2yvMCbdTClOBj02XCAyyX2rbo08W2KJKGZUnyfjLZAuasHCpLILPQ7i6plttHbXGF600jHHHqMK5");
}

// Initialize Vue plugins
Vue.use(VueObserveVisibility);
Vue.use(Vue2TouchEvents);

Vue.prototype.$cloudinary = 'https://res.cloudinary.com/dxlsenc2r/image/upload/';
Vue.prototype.$cloudinary256x256 = 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/';
Vue.prototype.$amazonS3 = 'https://swipe-live-app-storage-eu-west-3.s3.eu-west-3.amazonaws.com/';

const init = () => {
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
};


// Wait for the deviceready event to start the render
document.addEventListener("deviceready", () => {
  window.plugins.insomnia.keepAwake();
  init();
});
 


// status
// document.addEventListener("pause", () => {
//   // console.log("User is out of the app");
// });
 
// document.addEventListener("resume", () => {
//   // console.log("User is using the app");
// });
 
// document.addEventListener("backbutton", () => {
//   // console.log("User click on the back button");
// });


// network
document.addEventListener("offline", () => {
  window.plugins.toast.show("Pas de connexion Internet", 'long', 'top');
});

// document.addEventListener("online", () => {
//   window.plugins.toast.show("Vous êtes de nouveau connecté à internet", 'long', 'top');
// });


// window.addEventListener('keyboardDidShow', function () {
//     // Describe your logic which will be run each time keyboard is shown.
//   window.StatusBar.hide();
//   window.StatusBar.show();
// });

// window.addEventListener('keyboardDidHide', function () {
//     // Describe your logic which will be run each time keyboard is closed.
//   window.StatusBar.hide();
//   window.StatusBar.show();
// });

// window.addEventListener('keyboardWillShow', function () {
//     // Describe your logic which will be run each time when keyboard is about to be shown.
//   window.StatusBar.hide();
//   window.StatusBar.show();
// });

// window.addEventListener('keyboardWillHide', function () {
//     // Describe your logic which will be run each time when keyboard is about to be closed.
//   window.StatusBar.hide();
//   window.StatusBar.show();
// });


// battery
window.addEventListener("batterycritical", (event) => {
  window.plugins.toast.show("Niveau de batterie critique : " + event.level + "%", 'long', 'top');
}, false);

// window.addEventListener("batterystatus", (event) => {
//   window.plugins.toast.show("Level: " + event.level + " isPlugged: " + event.isPlugged, 'long', 'top');
// }, false);


// error
window.addEventListener("cordovacallbackerror", function (event) {
  console.log("Cordova callback error : " + event);
});


// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== "undefined");
if (!isCordovaApp){
  document.dispatchEvent(new CustomEvent("deviceready", {}));
}