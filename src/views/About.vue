<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Support</div>
    </div>

    <div class="checkout__body">
      <div class="cards-main">
        <ul>
          <li style="border-top: none !important">
            <span style="line-height: 25px;">
              Version
            </span>
            <span style="font-weight: 500;">
              {{ version }}
            </span>
          </li>
          <li>
            <div @click="openUrl('https://swipelive.fr/mentions-legales')" style="width: 100%">
              <span style="line-height: 25px;">
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
            <div @click="openUrl('https://swipelive.fr/politique-de-confidentialite')" style="width: 100%">
              <span style="line-height: 25px;">
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

      <div @click="goToMessage()" class="btn-swipe" style="color: white; text-align: center; width: calc(100% - 30px); position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); font-weight: 600;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 22px; height: 22px; margin-right: 7px; fill: white;"><path d="M256 31.1c-141.4 0-255.1 93.13-255.1 208c0 47.62 19.91 91.25 52.91 126.3c-14.87 39.5-45.87 72.88-46.37 73.25c-6.623 7-8.374 17.25-4.624 26C5.816 474.3 14.38 480 24 480c61.49 0 109.1-25.75 139.1-46.25c28.1 9 60.16 14.25 92.9 14.25c141.4 0 255.1-93.13 255.1-207.1S397.4 31.1 256 31.1zM256 416c-28.25 0-56.24-4.25-83.24-12.75c-9.516-3.068-19.92-1.461-28.07 4.338c-22.1 16.25-58.54 35.29-102.7 39.66c11.1-15.12 29.75-40.5 40.74-69.63l.1289-.3398c4.283-11.27 1.791-23.1-6.43-32.82C47.51 313.1 32.06 277.6 32.06 240c0-97 100.5-176 223.1-176c123.5 0 223.1 79 223.1 176S379.5 416 256 416zM256 216c-13.25 0-24 10.74-24 24c0 13.25 10.75 24 24 24s24-10.75 24-24C280 226.7 269.3 216 256 216zM384 216c-13.25 0-24 10.74-24 24c0 13.25 10.75 24 24 24s24-10.75 24-24C408 226.7 397.3 216 384 216zM128 216c-13.25 0-24 10.74-24 24c0 13.25 10.75 24 24 24S152 253.3 152 240C152 226.7 141.3 216 128 216z"></path></svg> Contacter Swipe Live
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

export default {
  name: 'About',
  data() {
    return {
      version: "0",
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    
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
          })
        } else {
          window.cordova.InAppBrowser.open(url, '_system', 'location=no');
        }
      });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
    goToMessage() {
      // this.$router.push({ name: 'ListMessages' });
    },
  }
};

</script>

