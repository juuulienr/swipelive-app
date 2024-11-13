<template>
  <main class="products" style="padding: 0px 15px">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Informations</div>
    </div>

    <div class="checkout__body">
      <div class="cards-main">
        <ul>
          <li style="border-top: none !important">
            <span style="line-height: 25px;font-weight: 400;">
              Version
            </span>
            <span style="font-weight: 400;">
              {{ version }}
            </span>
          </li>
          <li>
            <div @click="openUrl('https://swipelive.app/mentions-legales')" style="width: 100%">
              <span style="line-height: 25px;font-weight: 400;">
                Mentions légales
              </span>
              <span style="float: right;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-bottom: 2px; margin-left: 3px;">
                  <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
                </svg>
              </span>
            </div>
          </li>
          <li>
            <div @click="openUrl('https://swipelive.app/politique-de-confidentialite')" style="width: 100%">
              <span style="line-height: 25px;font-weight: 400;">
                Politique de Confidentialité
              </span>
              <span style="float: right;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-bottom: 2px; margin-left: 3px;">
                  <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
                </svg>
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div @click="deleteAccount()" style="border: 1px solid rgb(221, 221, 221) !important; margin: 0px; text-align: left; padding-left: 20px; display: flex; align-items: center;  padding: 14px 24px; border-radius: 16px; margin-top: 20px;">
        <span style="font-size: 16px; color: #333;">
          <img src="/img/delete.svg" style="width: 24px; height: 24px; margin-right: 16px"/>
        </span>
        <span style="font-weight: 400; color: #272c30;">Supprimer mon compte</span>
      </div>
    </div>
  </main>
</template>


<style scoped>
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  padding: 12px;
}
</style>

<script>
import { useMainStore } from '../stores/useMainStore';

export default {
  name: 'About',
  data() {
    return {
      version: "0",
    };
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");
    
    if (window.cordova) {
      window.cordova.getAppVersion.getVersionNumber((version) => {
        this.version = version;
      });
    }
  },
  methods: {
    openUrl(url) {
      window.SafariViewController.isAvailable((available) => {
        if (available) {
          window.SafariViewController.show({ url: url }, (result) => {
            console.log(result);
          }, (error) => {
            console.log("KO: " + error);
          });
        } else {
          window.cordova.InAppBrowser.open(url, '_system', 'location=no');
        }
      });
    },
    goBack() {
      window.plugins.nativepagetransitions.slide({
        direction: 'right',
        duration: 400,
        iosdelay: 0,
        androiddelay: 0,
        winphonedelay: 0,
        slowdownfactor: 1,
      });
      this.$router.push({ name: 'Account' });
    },
    deleteAccount() {
      navigator.notification.confirm('Voulez-vous vraiment supprimer ce compte ?', this.onConfirm, 'Êtes-vous sûr ?', ['Annuler','Supprimer']);
    },
    onConfirm(index) {
      if (index == 2) {
        // Utilisation de Pinia pour réinitialiser l'état
        const mainStore = useMainStore();
        
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('banned');
        mainStore.resetState();
        this.$router.push({ name: 'Welcome' });
      }
    }
  }
};
</script>