import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import Pusher from 'pusher-js';
import Vue2TouchEvents from 'vue2-touch-events';
import router from './router/index';
import VueObserveVisibility from 'vue-observe-visibility';
import * as VueGoogleMaps from "vue2-google-maps";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import store from "./store/store.js";



if (window.location.protocol === 'file:' || window.location.protocol === 'https:') {
  Pusher.logToConsole = true;
  Vue.config.productionTip = true;
  window.localStorage.setItem("baseUrl", "https://swipelive.fr");
  window.localStorage.setItem("sendcloud_pk", "3826686f2dbc418380898cc254fc0d28");

  Sentry.init({
    Vue,
    dsn: "https://a5c845548724498ab2df9bd84636ae30@o4504616296972288.ingest.sentry.io/4504616299200512",
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracePropagationTargets: ["swipelive.fr", /^\//],
      }),
    ],
    tracesSampleRate: 1.0,
  });

} else {
  Vue.config.productionTip = false;
  window.localStorage.setItem("baseUrl", "http://127.0.0.1:8000");
  window.localStorage.setItem("sendcloud_pk", "3826686f2dbc418380898cc254fc0d28");
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