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



if (window.location.protocol === 'file:') {
  Vue.config.productionTip = true;
  Pusher.logToConsole = true;
  window.localStorage.setItem("baseUrl", "https://swipelive.fr");
  window.localStorage.setItem("sendcloud_pk", "3826686f2dbc418380898cc254fc0d28");

  Bugsnag.start({ apiKey: 'd97d0497cb27fb9f2bcf2da2ba9c8bbe', plugins: [new BugsnagPluginVue()]});
  Vue.use(Bugsnag.getPlugin('vue'));
} else {
  Vue.config.productionTip = false;
  window.localStorage.setItem("baseUrl", "http://127.0.0.1:8000");
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
  // console.log("User is offline");
});

document.addEventListener("online", () => {
  // console.log("User is online");
});


// battery
window.addEventListener("batterystatus", (event) => {
  // console.log("Level: " + event.level + " isPlugged: " + event.isPlugged);
}, false);

window.addEventListener("batterylow", (event) => {
  // console.log("Battery Level Low " + status.level + "%");
}, false);

window.addEventListener("batterycritical", (event) => {
  // console.log("Battery Level Critical " + status.level + "%\n Recharger le téléphone !");
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