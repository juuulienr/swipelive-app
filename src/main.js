import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import Pusher from 'pusher-js';
import Vue2TouchEvents from 'vue2-touch-events';
import router from './router/index';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginVue from '@bugsnag/plugin-vue';
import VueObserveVisibility from 'vue-observe-visibility';
import * as VueGoogleMaps from "vue2-google-maps";
import store from "./store/store.js";


if (window.location.protocol === 'file:' || window.location.protocol === 'https:') {
  Pusher.logToConsole = true;
  Vue.config.productionTip = true;
  Bugsnag.start({ apiKey: 'b6f579675362830a12146a96a851e17a', plugins: [new BugsnagPluginVue()]});
  Vue.use(Bugsnag.getPlugin('vue'));

  window.localStorage.setItem("baseUrl", "https://swipelive.fr");
  window.localStorage.setItem("stripe_pk", "pk_test_aIJETJxn5e12xD24xXy0ovEg");
  // window.localStorage.setItem("stripe_pk", "pk_live_KGjyLVjmMB3WnzLBitoNtsKC");
} else {
  Vue.config.productionTip = false;
  window.localStorage.setItem("baseUrl", "http://127.0.0.1:8000");
  window.localStorage.setItem("stripe_pk", "pk_test_aIJETJxn5e12xD24xXy0ovEg");
}

Vue.use(VueObserveVisibility);
Vue.use(Vue2TouchEvents);
Vue.use(VueGoogleMaps, {
	load: {
		key: "AIzaSyBrLhSgilRrPKpGtAPbbzcaIp-5L5VgE_w",
		libraries: "places"
	}
});


const init = () => {
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
};
    

// Wait for the deviceready event to start the render
document.addEventListener("deviceready", () => {
  init();
});
 


// status of app
document.addEventListener("pause", () => {
  // console.log("User is out of the app");
});
 
document.addEventListener("resume", () => {
  // console.log("User is using the app");
});
 
document.addEventListener("backbutton", () => {
  // console.log("User click on the back button");
});

// network
document.addEventListener("offline", () => {
  window.plugins.toast.show("Pas de connexion Internet", 'long', 'top');
});

// document.addEventListener("online", () => {
  // window.plugins.toast.show("Vous êtes de nouveau connecté à internet", 'long', 'top');
// });


// battery
// window.addEventListener("batterystatus", (event) => {
  // window.plugins.toast.show("Level: " + event.level + " isPlugged: " + event.isPlugged, 'long', 'top');
// }, false);


window.addEventListener("batterycritical", (event) => {
  window.plugins.toast.show("Niveau de batterie critique : " + event.level + "%", 'long', 'top');
}, false);


// error
window.addEventListener("cordovacallbackerror", function (event) {
  console.log(event);
});


// If we are not in Cordova, manually trigger the deviceready event
const isCordovaApp = (typeof window.cordova !== "undefined");
if (!isCordovaApp){
  document.dispatchEvent(new CustomEvent("deviceready", {}));
}