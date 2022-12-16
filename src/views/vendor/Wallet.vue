<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Mes gains</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 50px;">
      <div class="cards-main">
        <div class="current--balance" style="box-shadow: 0 0 5px rgb(0 0 0 / 20%); padding: 15px; border-radius: 11px; margin: 15px 5px;">
          <div class="bloc--title" style="font-weight: 500; line-height: 1.55556; font-size: 14px; text-align: center; display: block; flex: 1 1 auto; margin-bottom: -10px;color: #000;"> Montant disponible
          </div>
          <div>
            <h3 style="font-weight: 600; margin-bottom: 0px; text-align: center; font-size: 35px;">{{ user.vendor.available | formatPrice }}€</h3>
          </div>
          <div class="current--balance--two" style="margin-top: 12px;">
            <p style="margin-bottom: 0px;color: #999; font-weight: 400; font-size: 14px;">Montant en attente</p>
            <p style="margin-bottom: 0px;color: #999; font-weight: 400; font-size: 14px;">{{ user.vendor.pending | formatPrice }}€</p>
          </div>
          <div class="current--balance--btn" style="margin-top: 10px; margin-bottom: 5px;">
            <div @click="showWithdraw()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 40px); font-size: 14px; font-weight: 600;">
              Transférer
            </div>
          </div>
        </div>

        <div class="current--balance" style="box-shadow: 0 0 5px rgb(0 0 0 / 20%); padding: 15px; border-radius: 11px; margin: 25px 5px;">
          <div class="bloc--title" style="font-size: 1.0625rem; font-weight: 600; line-height: 1.55556; display: block; flex: 1 1 auto; margin-bottom: 0px;">Graphique</div>
          <br><br><br><br><br>
          <hr style="width: 100%">
          <div @click="showHistory()" class="current--balance--two" style="padding: 5px 0px;">
            <div style="margin-bottom: 0px; font-size: 15px; font-weight: 400;">Avril 2022<br> 
              <div style="font-size: 12px;color: #999;">15 commandes</div>
            </div>
            <div style="padding-top: 10px;margin-bottom: 0px;"> 149,50€ 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(0, 0, 0); width: 15px; height: 15px; margin-bottom: 3px; margin-left: 3px;"><path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path></svg>
            </div>
          </div>
          <div @click="showHistory()" class="current--balance--two" style="padding: 5px 0px;">
            <div style="margin-bottom: 0px; font-size: 15px; font-weight: 400;">Mars 2022<br> 
              <div style="font-size: 12px;color: #999;">9 commandes</div>
            </div>
            <div style="padding-top: 10px;margin-bottom: 0px;"> 87,50€ 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(0, 0, 0); width: 15px; height: 15px; margin-bottom: 3px; margin-left: 3px;"><path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path></svg>
            </div>
          </div>
          <div @click="showHistory()" class="current--balance--two" style="padding: 5px 0px;">
            <div style="margin-bottom: 0px; font-size: 15px; font-weight: 400;">Février 2022<br> 
              <div style="font-size: 12px;color: #999;">0 commande</div>
            </div>
            <div style="padding-top: 10px;margin-bottom: 0px;"> 0,00€ 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(0, 0, 0); width: 15px; height: 15px; margin-bottom: 3px; margin-left: 3px;"><path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path></svg>
            </div>
          </div>
          <div @click="showHistory()" class="current--balance--two" style="padding: 5px 0px;">
            <div style="margin-bottom: 0px; font-size: 15px; font-weight: 400;">Janvier 2022<br> 
              <div style="font-size: 12px;color: #999;">0 commande</div>
            </div>
            <div style="padding-top: 10px;margin-bottom: 0px;"> 0,00€ 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(0, 0, 0); width: 15px; height: 15px; margin-bottom: 3px; margin-left: 3px;"><path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path></svg>
            </div>
          </div>
        </div>

        <div class="current--balance" style="box-shadow: 0 0 5px rgb(0 0 0 / 20%); padding: 15px; border-radius: 11px; margin: 15px 5px 25px;">
          <div class="bloc--title" style="font-size: 1.0625rem; font-weight: 600; line-height: 1.55556; display: block; flex: 1 1 auto; margin-bottom: 0px;">Retrait</div>
          <div class="current--balance--two" style="padding: 5px 0px;">
            <div style="margin-bottom: 0px; font-size: 15px; font-weight: 400;">Transfert<br> 
              <div style="font-size: 12px;color: #999;">FR*****7658 - 14/12/2022</div>
            </div>
            <div style="padding-top: 10px;margin-bottom: 0px; color: red; font-weight: 500"> -149,50€</div>
          </div>
          <div class="current--balance--two" style="padding: 5px 0px;">
            <div style="margin-bottom: 0px; font-size: 15px; font-weight: 400;">Transfert<br> 
              <div style="font-size: 12px;color: #999;">FR*****7658 - 18/12/2022</div>
            </div>
            <div style="padding-top: 10px;margin-bottom: 0px; color: red; font-weight: 500"> -69,50€</div>
          </div>
        </div>
      </div>


      <!-- withdraw -->
      <div v-if="popupWithdraw" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 30px);">
        <div class="checkout__header" style="padding: 5px 5px 15px; z-index: 10000000; background: white; width: 100%;">
          <div v-if="withdraw || bank" @click="hideWithdraw()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
              <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
            </svg>
          </div>
          <div v-if="withdraw" class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Retrait</div>
          <div v-else-if="bank" class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Ajouter un compte</div>
          <div v-else class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Félicitation</div>
        </div>
        <div class="checkout__body" style="overflow: scroll; padding: 15px 0px;">
          <div v-if="withdraw">
            <div class="form--input--item" style="margin: 0px 0px 60px;">
              <fieldset style="border: none; text-align: center;">
                <input ref="amount" type="text" maxlength="6" placeholder="0€" inputmode="decimal" style="font-weight: 600; text-align: center; font-size: 45px; width: calc(100vw - 45px); margin-top: 50px; color: black;"/>
              </fieldset>
            </div>
            <div @click="saveWithdraw()" class="btn-swipe" style="color: white;text-align: center;width: calc(100vw - 45px);font-size: 14px;font-weight: 600; margin-top: 30px;margin: 30px auto 0px;">Envoyer</div>

            <div @click="showBank()" class="current--balance" style="padding: 15px; border-radius: 11px; margin: 40px 10px 10px; box-shadow: 0 0 5px rgb(0 0 0 / 20%);">
              <div class="current--balance--two" style="padding: 5px 0px;">
                <div style="margin-bottom: 0px;display: flex;font-size: 15px;font-weight: 400;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 15px; width: 32px; height: 32px; margin-top: 3px;">
                    <g opacity="0.4">
                      <path d="M12 10.75C16.7038 10.75 19.4773 10.6481 20.868 10.5744C21.5117 10.5403 22 10.0077 22 9.36306V8.19426C22 7.74456 21.8551 7.30336 21.5366 6.98586C19.6683 5.12346 15.3747 2.7232 12.465 2.08806C12.1576 2.02094 11.8424 2.02094 11.535 2.08806C8.62535 2.7232 4.33171 5.12346 2.4634 6.98586C2.1449 7.30336 2 7.74456 2 8.19426V9.36306C2 10.0077 2.48829 10.5403 3.13195 10.5744C4.52271 10.6481 7.29615 10.75 12 10.75Z" fill="#637381"/>
                      <path d="M2.1787 18.7286C2.30863 18.3514 2.68627 18.1799 3.0846 18.1573C4.11911 18.0985 6.6517 18 12 18C17.3483 18 19.8809 18.0985 20.9154 18.1573C21.3137 18.1799 21.6914 18.3514 21.8213 18.7286C21.9176 19.0081 22 19.4175 22 20C22 20.5825 21.9176 20.9918 21.8213 21.2713C21.6914 21.6485 21.3137 21.8201 20.9154 21.8427C19.8809 21.9014 17.3483 22 12 22C6.6517 22 4.11911 21.9014 3.0846 21.8427C2.68627 21.8201 2.30863 21.6485 2.1787 21.2713C2.08243 20.9918 2 20.5825 2 20C2 19.4175 2.08243 19.0081 2.1787 18.7286Z" fill="#637381"/>
                    </g>
                    <path d="M12 9C13.1046 9 14 8.10457 14 7C14 5.89543 13.1046 5 12 5C10.8954 5 10 5.89543 10 7C10 8.10457 10.8954 9 12 9Z" fill="#637381"/>
                    <path d="M13.9467 10.7438C13.3382 10.7478 12.6899 10.75 12 10.75C11.3101 10.75 10.6618 10.7478 10.0533 10.7438C10.0277 11.3951 10 12.5511 10 14.5C10 16.2195 10.0216 17.3217 10.0442 18.0047C10.65 18.0017 11.3009 18 12 18C12.6991 18 13.35 18.0017 13.9558 18.0047C13.9784 17.3217 14 16.2195 14 14.5C14 12.5511 13.9723 11.3951 13.9467 10.7438Z" fill="#637381"/>
                    <path d="M16.0542 10.7212C16.0284 11.3682 16 12.5284 16 14.5C16 16.2343 16.022 17.3407 16.0448 18.0223C17.8468 18.0443 19.1022 18.0792 19.9521 18.1123C19.976 17.4396 20 16.3128 20 14.5C20 12.4185 19.9684 11.2414 19.9415 10.6177C19.0121 10.6562 17.7369 10.6956 16.0542 10.7212Z" fill="#637381"/>
                    <path d="M4.05845 10.6177C4.98788 10.6562 6.26314 10.6956 7.94583 10.7212C7.97163 11.3682 8 12.5284 8 14.5C8 16.2343 7.97805 17.3407 7.9552 18.0223C6.15324 18.0443 4.89779 18.0792 4.04791 18.1123C4.024 17.4396 4 16.3128 4 14.5C4 12.4185 4.03165 11.2414 4.05845 10.6177Z" fill="#637381"/>
                  </svg>
                  <div>
                    Compte bancaire<br>
                    <!-- <div style="font-size: 12px; color: rgb(153, 153, 153);">FR*****7658</div> -->
                    <div style="font-size: 12px; color: #ff2773; font-weight: 600">Ajouter un compte</div>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(0, 0, 0);width: 18px;height: 18px;margin-left: 3px;margin-top: 11px;">
                  <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div v-else-if="bank">
            <div class="form--input--item" style="margin-top: 45px;">
              <fieldset>
                <legend>IBAN</legend>
                <input type="text" maxlength="27" placeholder="FRXX XXXX XXXX XXXXX XXXX XXXX XXX"/>
              </fieldset>
            </div>
            <div class="form--input--item">
              <fieldset>
                <legend>Prénom</legend>
                <input type="text"/>
              </fieldset>
            </div>
            <div class="form--input--item">
              <fieldset>
                <legend>Nom</legend>
                <input type="text" placeholder="" />
              </fieldset>
            </div>

            <div @click="saveBankAccount()" class="btn-swipe" style="color: white;text-align: center;font-size: 14px;font-weight: 600;">Enregistrer</div>
          </div>
          <div v-else>

            <div style="margin: 60px auto 0px;">
              <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" :width="200"/>
            </div>

            <p style="margin-bottom: 0px;color: black;font-weight: 500;font-size: 14px;padding: 0px 10px;margin-top: 35px;text-align: center;">
              Votre demande de retrait a bien été prise en compte, <br>
              votre argent arrivera sur votre compte sous 1 à 5 jours ouvrés.
            </p>

            <div @click="hideWithdraw()" class="btn-swipe" style="color: white;text-align: center;font-size: 14px;font-weight: 600; bottom: 40px; position: absolute; width: 100%">Fermer</div>
          </div>
        </div>
      </div>



      <!-- history -->
      <div v-if="popupHistory" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 30px);">
        <div class="checkout__header" style="padding: 5px 5px 15px; z-index: 10000000; background: white; width: 100%;">
          <div @click="hideHistory()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
              <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
            </svg>
          </div>
          <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Revenu du mois</div>
        </div>
        <div class="checkout__body" style="overflow: scroll; padding: 15px 10px">
          <div class="bloc--title" style="font-weight: 600;line-height: 1.55556;font-size: 17px;display: block;flex: 1 1 auto;margin-bottom: 30px;color: #ff2773;">Avril 2022</div>
          <div class="current--balance" style="argin: 15px 0px;">
            <div class="bloc--title" style="font-weight: 600;line-height: 1.55556;font-size: 17px;display: block;flex: 1 1 auto;margin-bottom: -10px;color: rgb(0, 0, 0);">Revenu Net</div>
            <div>
              <h3 style="font-weight: 600;margin-bottom: 0px;font-size: 50px;">0,00€</h3>
            </div>
            <div class="current--balance--two" style="margin-top: 10px;">
              <p style="margin-bottom: 0px;font-weight: 400;font-size: 14px;font-weight: 600;color: black;">15 commandes</p>
              <p style="margin-bottom: 0px;color: black;font-weight: 600;font-size: 14px;">152,54€</p>
            </div>
            <div class="current--balance--two" style="margin-top: 10px;">
              <p style="margin-bottom: 0px; color: rgb(153, 153, 153); font-weight: 400; font-size: 14px;">Commission Swipe Live</p>
              <p style="margin-bottom: 0px; color: rgb(153, 153, 153); font-weight: 400; font-size: 14px;">-15,65€</p>
            </div>
            <hr style="width: 100%;margin: 15px 0px;">
            <div class="current--balance--two">
              <p style="margin-bottom: 0px;color: rgb(153, 153, 153);font-weight: 400;font-size: 14px;font-weight: 600;color: black;">Revenu net</p>
              <p style="margin-bottom: 0px;color: rgb(153, 153, 153);font-weight: 400;font-size: 14px;font-weight: 600;color: black;">137,65€</p>
            </div>
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
    gap: 15px;
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

import Lottie from 'vue-lottie';
import * as animationData from '../../assets/img/success.json';

export default {
  name: 'Wallet',
  components: {
    'lottie': Lottie
  },
  data() {
    return {
      popupWithdraw: false,
      popupHistory: false,
      iban: null,
      errorIBAN: null,
      withdraw: true,
      bank: false,
      user: JSON.parse(window.localStorage.getItem("user")),
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      defaultOptions: {animationData: animationData},
      animationSpeed: 1,
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
    hideWithdraw() {
      this.popupWithdraw = false;
      this.withdraw = true;
      this.bank = false;
    },
    showWithdraw() {
      this.popupWithdraw = true;
      this.withdraw = true;
      this.$nextTick(() => this.$refs.amount.focus());
    },
    saveBankAccount() {
      this.withdraw = true;
      this.bank = false;

      // if (this.iban && this.iban.length == 27) {
      //   window.cordova.plugin.http.post(this.baseUrl + "/user/api/bank/add", { "iban": this.iban }, { Authorization: "Bearer " + this.token }, (response) => {
      //     this.popupBankAccount = false;
      //   }, (response) => {
      //     console.log(response.error);
      //   });
      // }
    },
    showBank() {
      this.withdraw = false;
      this.bank = true;
    },
    hideHistory() {
      this.popupHistory = false;
    },
    showHistory() {
      this.popupHistory = true;
    },
    saveWithdraw() {
      this.withdraw = false;
      this.bank = false;
      // window.cordova.plugin.http.get(this.baseUrl + "/user/api/withdraw", {}, { Authorization: "Bearer " + this.token }, (response) => {
      // }, (response) => {
      //   console.log(response.error);
      // });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
  }
};

</script>

