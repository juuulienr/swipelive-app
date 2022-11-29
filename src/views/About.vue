<template>
  <main class="products">
    <div class="checkout">
      <div class="checkout__header" style="padding: 15px;">
        <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 8px; padding: 0.5rem 0px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: #161823;"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
        </div>
        <div class="checkout__title" style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Informations</div>
      </div>
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

      <div class="btn-swipe" style="color: white;text-align: center;margin: 0px 15px;position: absolute;width: calc(100vw - 30px);bottom: calc(env(safe-area-inset-bottom) + 25px); font-weight: 600;">
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
  padding: 12px 30px;
}

.link-2j8GS.grey-rBkrL {
  color: rgba(22,24,35,.75);
}

.link-2j8GS.small-1UkQD {
  font-size: 12px;
  line-height: 15px;
}
.link-2j8GS {
  margin: 0;
  display: inline-block;
  font-size: 14px;
  line-height: 17px;
  color: #161823;
  font-weight: 600;
  cursor: pointer;
}

.login-button-31D24.highlight-1TvcX {
  color: #fff;
  background: #ff2773;
  border: none;
}

.login-button-31D24 {
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: #161823;
  border: 1px solid rgba(22,24,35,.12);
  background: none;
  border-radius: 2px;
  font-size: 16px;
  line-height: 44px;
  font-weight: 600;
  position: relative;
  margin-top: 32px;
  padding: 0;
  cursor: pointer;
}

.pc-title-1JpDs {
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  font-weight: bolder;
  color: #000;
}

.footer-bottom-wrapper-1a-rL {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.toggle-2SAdO.is-modal-1F8S3 {
  justify-content: center;
  align-items: center;
  padding: 0 24px;
}

.toggle-2SAdO {
  height: 64px;
  background: #fff;
  border-top: .5px solid rgba(22,24,35,.12);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 18px;
  color: #161823;
}

.link-2j8GS.big-2_yje {
  font-size: 14px;
  line-height: 18px;
}

.link-2j8GS {
  margin: 0;
  display: inline-block;
  font-size: 14px;
  line-height: 17px;
  color: #161823;
  font-weight: 600;
  cursor: pointer;
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
  }
};

</script>

