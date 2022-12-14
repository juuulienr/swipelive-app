<template>
  <main class="products">
    <div class="checkout">
      <div class="checkout__header" style="padding: 15px;">
        <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 8px; padding: 0.5rem 0px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: #161823;"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
        </div>
        <div class="checkout__title" style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Mon porte-monnaie</div>
        <div v-if="!user.vendor.bankAccounts.length" @click="showBankAccount()" class="checkout__right-btn" style="position: absolute; right: 15px; top: 8px; padding: 0.5rem 0px;">
          <div style="color: #ff2773; font-weight: 600;">Configurer</div>
        </div>
      </div>

      <div v-if="user" class="cards-main">
        <div class="current--balance" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 15px; border-radius: 13px; margin: 15px;">
          <div class="bloc--title" style="font-size: 1.125rem; font-weight: 600; line-height: 1.55556; font-size: 1.0625rem; text-align: center; display: block; flex: 1 1 auto; margin-bottom: 0px;"> Montant disponible
          </div>
          <div>
            <h3 style="font-weight: 600; margin-bottom: 0px; text-align: center; font-size: 25px;">162,50€</h3>
            <!-- <h3 style="font-weight: 600; margin-bottom: 0px; text-align: center; font-size: 25px;">{{ user.vendor.available | formatPrice }}€</h3> -->
          </div>
          <div class="current--balance--two" style="margin-top: 12px;">
            <p style="margin-bottom: 0px;">Montant en attente</p>
            <p style="margin-bottom: 0px;">{{ user.vendor.pending | formatPrice }}€</p>
          </div>
          <div class="current--balance--btn" style="margin-top: 10px; margin-bottom: 5px;">
            <div @click="showWithdraw()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 40px); font-size: 14px; font-weight: 600;">
              Transférer vers un compte bancaire
            </div>
          </div>
        </div>

        <div class="bloc--title" style="font-size: 1.0625rem;font-weight: 600;line-height: 1.55556; display: block;flex: 1 1 auto;margin-bottom: 0px;margin: 20px 20px 0px;">Historique</div>

        <div class="current--balance" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 15px; border-radius: 13px; margin: 10px 15px; gap: 22px;">
          <div class="bloc--title" style="font-size: 1.0625rem; font-weight: 600; line-height: 1.55556; display: block; flex: 1 1 auto; margin-bottom: 0px;">2022</div>
          <div @click="showHistory()" class="current--balance--two">
            <p style="margin-bottom: 0px; font-size: 15px;">Janvier</p>
            <p style="margin-bottom: 0px;">
              0,00€
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-bottom: 2px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </p>
          </div>
          <div @click="showHistory()" class="current--balance--two">
            <p style="margin-bottom: 0px;">Février</p>
            <p style="margin-bottom: 0px;">
              0,00€
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-bottom: 2px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </p>
          </div>
          <div @click="showHistory()" class="current--balance--two">
            <p style="margin-bottom: 0px;">Mars</p>
            <p style="margin-bottom: 0px;">
              0,00€
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-bottom: 2px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </p>
          </div>
          <div @click="showHistory()" class="current--balance--two">
            <p style="margin-bottom: 0px;">Avril</p>
            <p style="margin-bottom: 0px;">
              0,00€
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-bottom: 2px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </p>
          </div>
        </div>
    	</div>


      <!-- add bank account -->
      <div v-if="popupBankAccount" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 100%; "> 
        <div class="checkout__header" style="padding: 15px;">
          <div class="checkout__title" style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;"> Ajouter un compte</div>
          <div @click="hideBankAccount()" class="checkout__right-btn" style="padding-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);"><path d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z"/></svg>
          </div>
        </div>
        <div style="padding: 15px;">
          <div class="form--input--item" :class="{'form--input--item--error': iban }">
            <fieldset>
              <legend>IBAN</legend>
              <input type="text" v-model="iban" maxlength="27" placeholder="FRXX XXXX XXXX XXXXX XXXX XXXX XXX">
            </fieldset>
          </div>
          <div @click="saveBankAccount()" class="btn-swipe" style="color: white;text-align: center;width: calc(100vw - 30px);font-size: 14px;font-weight: 600;position: absolute;bottom: 40px;">Enregistrer</div>
        </div>
      </div>


      <!-- history -->
      <div v-if="popupHistory" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 100%; "> 
        <div class="checkout__header" style="padding: 15px;">
          <div @click="hideHistory()" class="checkout__close-btn" style="position: absolute; left: initial; top: 8px; padding: 0.5rem 0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: #161823;"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
          </div>
          <div class="checkout__title" style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Janvier 2022</div>
        </div>
        <div>
          <div class="top-author">
            <div class="top-author--container">
              <div class="top-author--item" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 10px; border-radius: 13px;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style=" background: rgb(251, 239, 239); fill: rgb(223, 104, 104); width: 40px; height: 40px; padding: 10px; border-radius: 8px; "><path d="M496 448H480v-32c0-17.67-14.33-32-32-32V224h-64v160h-96V224H224v160H128V224H64v160c-17.67 0-32 14.33-32 32v32H16C7.199 448 0 455.2 0 464v32C0 504.8 7.199 512 16 512h480c8.801 0 16-7.201 16-16v-32C512 455.2 504.8 448 496 448zM501.6 92.13l-234.4-90.07C264.3 .8958 259.2-.0039 256-.0039c-3.188 0-8.219 .8997-11.22 2.056L10.38 92.13C4.656 94.25 0 100.1 0 107.1V144C0 152.8 7.156 160 16 160H32v16C32 184.8 39.16 192 48 192h416C472.8 192 480 184.8 480 176V160h16C504.8 160 512 152.8 512 144V107.1C512 100.4 507.9 94.44 501.6 92.13zM256 144c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32s32 14.33 32 32C288 129.7 273.7 144 256 144z"></path></svg>
                <div>
                  <div><span>08 Nov 2021</span></div>
                  <span>Compte bancaire: **** 4920</span>
                </div>
                <span class="css-4ioo3c" style="color: #df6868; background-color: #fbefef;">-100,00€</span>
              </div>
              <div class="top-author--item" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 10px; border-radius: 13px;">
                <img src="https://minimal-assets-api.vercel.app/assets/images/products/product_2.jpg" style="border: 1px solid rgba(22, 24, 35, 0.12);"/>
                <div>
                  <div><span>08 Nov 2021</span></div>
                  <span>Julien REIGNIER</span>
                </div>
                <span class="css-4ioo3c">100,00€</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- withdraw -->
      <div v-if="popupWithdraw" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 100%; "> 
        <div class="checkout__header" style="padding: 15px;">
          <div class="checkout__title" style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;"> Retrait</div>
          <div @click="hideWithdraw()" class="checkout__right-btn" style="padding-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);"><path d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z"/></svg>
          </div>
        </div>
        <div style="padding: 15px;"> 
          <div>
            <!-- https://lottiefiles.com/98454-success -->
          </div>
          <div style="color: #525c66;text-align: center;">
            Le transfert vers le compte bancaire peut prendre jusqu'à 5 jours ouvrés. 
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>

.products {
  height: 100vh;
  width: 100%;
}

.products header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: 6vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 5vw;
}

.products header .h-left .h-title {
  font-size: 0.9em;
  padding-left: 4vw;
  text-transform: uppercase;
  margin-bottom: 0;
}

.products header img {
  width: 20px;
}

.products header .h-right img {
  margin-left: 3vw;
}

img {
  width:100%
}

.checkout__header {
  position: relative;
  padding: .9rem 0;
}

.checkout__body {
  height: calc(100% - 70px);
  overflow: auto
}

.checkout__close-btn {
  position: absolute;
  left: 0;
  top: 8px;
  padding: .5rem 15px;
}

.checkout__title {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700
}

.icon, .icon svg {
    vertical-align: top;
}

.icon svg {
    height: 100%;
    width: 1.5em;
}

svg {
    overflow: hidden;
    vertical-align: middle;
}

.cards-main .card_1 {
  background: #ff2773;
}

.cards-main .my_card {
  position: relative;
  padding: 3.5vh 6vw 2.5vh;
  border-radius: 20px;
  margin: 15px;
  text-align: center;
}

.cards-main .my_card .settings_logo {
  position: absolute;
  right: 4vw;
  top: 2.5vh;
}

.cards-main .my_card .settings_logo img {
  width: 25px;
}

.cards-main .my_card .name {
  color: #fff;
  text-transform: uppercase;
  font-size: 1em;
  letter-spacing: 0.5px;
  font-weight: bold;
}

.cards-main .my_card .balance {
  color: #fff;
  font-size: 2.45em;
  margin: 0vh 0 3vh;
}

.cards-main .my_card .code_card span {
  display: inline-block;
  margin-right: 3vw;
  font-size: 1.3em;
  font-weight: 500;
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

.cards-main li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 2vh 5vw;
  border-bottom: 1px solid #eee;
  font-size: 1.1em;
}

.cards-main li img {
  width: 11px;
}

.store-products-item__login-popup.store-products-item__login-popup--active {
  bottom: 0;
}

.store-products-item__login-popup {
  position: fixed;
  width: 100%;
  bottom: -80%;
  background-color: #fff;
  border-radius: 15px;
  animation-duration: 400ms !important;
  animation-iteration-count: 1 !important;
  animation-fill-mode: both !important;
  animation-name: keyframe_d37zz3 !important;
  z-index: 1000000000;
}


.current--balance {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.current--balance  > div > h3 {
    font-size: 1.875rem;
}
.current--balance--two {
    display: flex;
    justify-content: space-between;
}
.current--balance--two > p:first-of-type {
    color: #525c66;
}
.current--balance--two > p {
    line-height: 1.57143;
    font-size: 15px;
}
.current--balance--two > .total {
    font-weight: 600;
    font-size: 1rem;
}
.current--balance--btn {
    display: flex;
    flex-direction: row;
    gap: 12px;
}
.current--balance--btn > button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-weight: 700;
    line-height: 1.71429;
    font-size: 0.875rem;
    text-transform: capitalize;
    min-width: 64px;
    padding: 6px 16px;
    border-radius: 8px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: 100%;
}

.top-author--container {
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
  gap: 10px;
}
.top-author--item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top-author--item > img {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  font-size: 1.25rem;
  line-height: 1;
  border-radius: 8px;
  overflow: hidden;
  user-select: none;
  object-fit: cover;
}
.top-author--item > div:first-of-type {
  margin: 0px 0px 0px 12px;
  flex-grow: 1;
}
.top-author--item > div > span {
  font-weight: 600;
  line-height: 1.57143;
}

.top-author--item > div > div {
  line-height: 1.5;
  font-size: 14px;
  font-weight: 400;
  color: #525c66;
  display: flex;
  align-items: center;
}
.top-author--item > div > div > svg {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.css-4ioo3c {
  line-height: 0;
  border-radius: 6px;
  cursor: default;
  align-items: center;
  white-space: nowrap;
  display: inline-flex;
  justify-content: center;
  padding: 20px 20px;
  color: hsl(161deg 65% 64%);
  font-size: 14px;
  background-color: #e6fff7;
  font-weight: 700;
}
</style>

<script>

export default {
  name: 'Wallet',
  data() {
    return {
      popupBankAccount: false,
      popupWithdraw: false,
      popupHistory: false,
      iban: null,
      errorIBAN: null,
      user: JSON.parse(window.localStorage.getItem("user")),
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token")
    }
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
  },
  methods: {
    hideBankAccount() {
      this.popupBankAccount = false;
    },
    showBankAccount() {
      this.popupBankAccount = true;
    },
    hideWithdraw() {
      this.popupWithdraw = false;
    },
    showWithdraw() {
      this.popupWithdraw = true;
    },
    hideHistory() {
      this.popupHistory = false;
    },
    showHistory() {
      this.popupHistory = true;
    },
    withdraw() {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/withdraw", {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.popupWithdraw = false;
      }, (response) => {
        console.log(response.error);
      });
    },
    saveBankAccount() {
      if (this.iban && this.iban.length == 27) {
        window.cordova.plugin.http.post(this.baseUrl + "/user/api/bank/add", { "iban": this.iban }, { Authorization: "Bearer " + this.token }, (response) => {
          this.popupBankAccount = false;
        }, (response) => {
          console.log(response.error);
        });
      }
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
  }
};

</script>

