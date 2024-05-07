<template>
  <main class="products" style="padding: 0px 15px">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Porte-monnaie</div>
    </div>

    <div class="checkout__body">
      <div class="cards-main">
        <div class="current--balance" style="border-radius: 11px; margin: 15px 5px;">
          <div class="bloc--title" style="font-weight: 500; line-height: 1.55556; font-size: 16px; text-align: center; display: block; flex: 1 1 auto; margin-bottom: -10px;color: #272c30;"> Montant disponible
          </div>
          <div>
            <h3 style="font-weight: 600; margin-bottom: 0px; text-align: center; font-size: 35px;">{{ user.vendor.available | formatPrice }}€</h3>
          </div>
          <div class="current--balance--two" style="margin-top: 12px;">
            <p style="margin-bottom: 0px;color: #999; font-weight: 400; font-size: 14px;">Montant en attente</p>
            <p style="margin-bottom: 0px;color: #999; font-weight: 400; font-size: 14px;">{{ user.vendor.pending | formatPrice }}€</p>
          </div>
          <div class="current--balance--btn" style="margin-top: 10px; margin-bottom: 5px;">
            <div v-if="user.vendor.available > 0" @click="showWithdraw()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 40px); font-size: 14px; font-weight: 600;">Transférer</div>
            <div v-else class="btn-swipe" style="color: rgb(170, 170, 170); background: rgb(239, 241, 246); text-align: center; width: calc(100vw - 40px); font-size: 14px; font-weight: 600;">Transférer</div>
          </div>
        </div>

<!--         <button @click="uploadFront()">Verif front document (jpg, pdf, png) et 16Mb max</button>
        <button @click="uploadBack()">Verif back document (jpg, pdf, png) et 16Mb max</button>
 -->
        <hr style="width: 100%;margin: 15px 0px;">
        <div v-if="orderedMonthData.length > 0" class="current--balance" style="border-radius: 11px; margin: 25px 5px;">
          <div class="bloc--title" style="font-size: 1.0625rem; font-weight: 600; line-height: 1.55556; display: block; flex: 1 1 auto; margin-bottom: 0px;">Historique</div>
          <div v-for="(data, index) in orderedMonthData" @click="showHistory(data)" class="current--balance--two" style="padding: 5px 0px;">
            <div style="margin-bottom: 0px; font-size: 15px; font-weight: 400;">
              <div style="text-transform: capitalize;">{{ formatMonth(data.month) }}</div>
              <div v-if="data.orders.length > 1" style="font-size: 12px;color: #999;">{{ data.orders.length }} commandes</div>
              <div v-else style="font-size: 12px;color: #999;">{{ data.orders.length }} commande</div>
            </div>
            <div style="padding-top: 10px;margin-bottom: 0px;"> {{ data.total | formatPrice }}€
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: #272c30; width: 15px; height: 15px; margin-bottom: 3px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div v-else-if="loadingOrders">
          <div class="loader2">
            <span></span>
          </div>
        </div>
        <div v-else class="current--balance" style="border-radius: 11px; margin: 25px 5px;">
          <div>
            <div class="container" style="margin: 50px auto 0px; text-align: center;">
              <div style="margin: 0px auto;">
                <Lottie :options="defaultOptions2" :width="200"/>
              </div>
            </div>
            <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun retrait</h5>
            <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos retraits apparaîtront ici.</div>
          </div>
        </div>

        <hr v-if="user.vendor.withdraws.length > 0" style="width: 100%;margin: 15px 0px;">
        <div v-if="user.vendor.withdraws.length > 0" class="current--balance" style="border-radius: 11px; margin: 15px 5px 25px;">
          <div class="bloc--title" style="font-size: 1.0625rem; font-weight: 600; line-height: 1.55556; display: block; flex: 1 1 auto; margin-bottom: 0px;">Retrait</div>
          <div v-for="withdraw in user.vendor.withdraws" class="current--balance--two" style="padding: 5px 0px;">
            <div style="margin-bottom: 0px; font-size: 15px; font-weight: 400;">Virement bancaire<br> 
              <div style="font-size: 12px;color: #999;">FR*****{{withdraw.last4}} - {{ withdraw.createdAt | formatDate }}</div>
            </div>
            <div style="padding-top: 10px;margin-bottom: 0px; color: red; font-weight: 500">-{{ withdraw.amount | formatPrice }}€</div>
          </div>
        </div>
      </div>


      <!-- withdraw -->
      <div v-if="popupWithdraw" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 30px);">
        <div class="checkout__header" style="padding: 5px 5px 15px; z-index: 10000000; background: white; width: 100%;">
          <div v-if="withdraw || bank" @click="hideWithdraw()" class="checkout__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
            </svg>
          </div>
          <div v-if="withdraw" class="checkout__title">Retrait</div>
          <div v-else-if="bank" class="checkout__title">Ajouter un compte</div>
          <div v-else class="checkout__title">Félicitation</div>
        </div>
        <div class="checkout__body" style="overflow: scroll; padding: 15px 0px;">
          <div v-if="withdraw">
            <div class="bloc--title" style="font-weight: 500; line-height: 1.55556; font-size: 16px; text-align: center; display: block; flex: 1 1 auto; color: #272c30;"> Montant disponible : <span @click="addAmount()" style="color: #1890ff; text-decoration: underline;">{{ user.vendor.available | formatPrice }}€</span>
            </div>
            <div class="form--input--item" style="margin: 0px 0px 60px;">
              <fieldset style="border: none; text-align: center;">
                <input v-model="withdrawAmount" @input="limitDecimals" ref="withdrawAmount" type="text" placeholder="0€" inputmode="decimal" style="font-weight: 600; text-align: center; font-size: 45px; width: calc(100vw - 45px); margin-top: 50px; color: black;"/>
              </fieldset>
            </div>
            <div v-if="checkAvailability" @click="saveWithdraw()" class="btn-swipe" style="color: white;text-align: center;width: calc(100vw - 45px);font-size: 14px;font-weight: 600; margin-top: 30px;margin: 30px auto 0px;">
              <span>Envoyer</span>
            </div>
            <div v-else-if="loadingWithdraw" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 40px); font-size: 14px; font-weight: 600;">
              <span>
                <svg viewBox="25 25 50 50" class="loading">
                  <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
                </svg>
              </span>
            </div>
            <div v-else class="btn-swipe" style="color: rgb(170, 170, 170); background: rgb(239, 241, 246); text-align: center;width: calc(100vw - 45px);font-size: 14px;font-weight: 600; margin-top: 30px;margin: 30px auto 0px;">
              <span>Envoyer</span>
            </div>

            <div @click="showBank()" class="current--balance" style="padding: 15px; border-radius: 11px; margin: 40px 10px 10px; border: 1px solid #ddd !important; ">
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
                    <div v-if="user.vendor.bankAccounts.length > 0" style="color: rgb(153, 153, 153);">{{ user.vendor.bankAccounts[0].country }}*****{{ user.vendor.bankAccounts[0].last4 }}</div>
                    <div v-else style="color: #ff2a80; font-weight: 600">Ajouter un compte</div>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: #272c30;width: 18px;height: 18px;margin-left: 3px;margin-top: 11px;">
                  <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div v-else-if="bank">
            <div class="images_filter" style="padding-bottom: 10px;">
              <ul>
                <li @click="showIndividual()" v-bind:class="{active: individual}" :style="[individual ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">Particulier</li>
                <li @click="showCompany()" v-bind:class="{active: company}" :style="[company ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">Entreprise</li>
              </ul>
            </div>
            <div class="form--input--item" :class="{'form--input--item--error': errorBank && !iban }" style="margin-top: 15px;">
              <fieldset>
                <legend>IBAN</legend>
                <input v-model="iban" type="text" maxlength="27" placeholder="FRXX XXXX XXXX XXXXX XXXX XXXX XXX"/>
              </fieldset>
            </div>
            <div v-if="individual" class="form--input--item" :class="{'form--input--item--error': errorBank && !holderName }">
              <fieldset>
                <legend>Prénom et nom</legend>
                <input v-model="holderName" type="text"/>
              </fieldset>
            </div>
            <div v-if="company" class="form--input--item" :class="{'form--input--item--error': errorBank && !businessName }">
              <fieldset>
                <legend>Nom de l'entreprise</legend>
                <input v-model="businessName" type="text"/>
              </fieldset>
            </div>
            <div @click="saveBankAccount()" class="btn-swipe" style="color: white;text-align: center;font-size: 14px;font-weight: 600;">
              <span v-if="loadingBank">
                <svg viewBox="25 25 50 50" class="loading">
                  <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
                </svg>
              </span>
              <span v-else>Enregistrer</span>
            </div>
          </div>
          <div v-else>
            <div style="margin: 60px auto 0px;">
              <Lottie :options="defaultOptions" v-on:animCreated="handleAnimation" :width="150"/>
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
          <div @click="hideHistory()" class="checkout__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
            </svg>
          </div>
          <div class="checkout__title">Revenu du mois</div>
        </div>
        <div style="padding: 5px;">
          <div class="bloc--title" style="font-weight: 600;line-height: 1.55556;font-size: 17px;display: block;flex: 1 1 auto;margin-bottom: 30px;color: #ff2a80; text-transform: capitalize;">{{ formatMonth(history.month) }}</div>
          <div class="current--balance" style="margin: 15px 0px;">
            <div class="bloc--title" style="font-weight: 600;line-height: 1.55556;font-size: 17px;display: block;flex: 1 1 auto;margin-bottom: -10px;color: #272c30;">Revenu Net</div>
            <div>
              <h3 style="font-weight: 600;margin-bottom: 0px;font-size: 50px;">{{ history.remaining | formatPrice }}€</h3>
            </div>
            <div class="current--balance--two" style="margin-top: 10px;">
              <p v-if="history.orders.length > 1" style="margin-bottom: 0px;font-weight: 400;font-size: 14px;font-weight: 600;color: black;">{{ history.orders.length }} commandes</p>
              <p v-else style="margin-bottom: 0px;font-weight: 400;font-size: 14px;font-weight: 600;color: black;">{{ history.orders.length }} commande</p>
              <p style="margin-bottom: 0px;color: black;font-weight: 600;font-size: 14px;">{{ history.total | formatPrice }}€</p>
            </div>
            <div class="current--balance--two" style="margin-top: 10px;">
              <p style="margin-bottom: 0px; color: rgb(153, 153, 153); font-weight: 400; font-size: 14px;">Commission Swipe Live</p>
              <p style="margin-bottom: 0px; color: rgb(153, 153, 153); font-weight: 400; font-size: 14px;">-{{ history.fees | formatPrice }}€</p>
            </div>
            <hr style="width: 100%;margin: 15px 0px;">
            <div class="current--balance--two">
              <p style="margin-bottom: 0px;color: rgb(153, 153, 153);font-weight: 400;font-size: 14px;font-weight: 600;color: black;">Revenu net</p>
              <p style="margin-bottom: 0px;color: rgb(153, 153, 153);font-weight: 400;font-size: 14px;font-weight: 600;color: black;">{{ history.remaining | formatPrice }}€</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped src="../../assets/css/wallet.css"></style>


<script>

import Lottie from 'vue-lottie';
import * as animationData from '../../assets/lottie/success.json';
import * as animationData2 from '../../assets/lottie/wallet.json';

export default {
  name: 'Wallet',
  components: {
    Lottie
  },
  data() {
    return {
      user: this.$store.getters.getUser,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      stripe_pk: window.localStorage.getItem("stripe_pk"),
      defaultOptions: {animationData: animationData},
      defaultOptions2: {animationData: animationData2},
      loadingOrders: true,
      popupWithdraw: false,
      popupHistory: false,
      iban: "FR1420041010050500013M02606",
      holderName: null,
      businessName: null,
      individual: true,
      company: false,
      errorBank: false,
      history: null,
      withdraw: true,
      withdrawAmount: null,
      loadingBank: false,
      loadingWithdraw: false,
      bank: false,
      sales: [],
    }
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleDateString(navigator.language);
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");

    this.loadOrders();
  },
  computed: {
    orderedMonthData() {
      const monthData = {};

      // Iterate over orders and group them by month
      if (this.sales.length) {
        this.sales.forEach((order) => {
          const month = order.createdAt.substr(0, 7);
          if (!monthData[month]) {
            monthData[month] = {
              month: month,
              total: "0.00",
              fees: "0.00",
              remaining: "0.00",
              orders: []
            };
          }

          monthData[month].orders.push(order);
          monthData[month].total = parseFloat(monthData[month].total) + parseFloat(order.total) - parseFloat(order.shippingPrice);
          monthData[month].total.toFixed(2);
          monthData[month].fees = parseFloat(monthData[month].fees) + parseFloat(order.fees);
          monthData[month].fees.toFixed(2);
          monthData[month].remaining = parseFloat(monthData[month].total) - parseFloat(monthData[month].fees);
          monthData[month].remaining.toFixed(2);
        });

        // Sort monthData in descending order by month
        const sortedMonthData = Object.values(monthData).sort(
          (a, b) => b.month.localeCompare(a.month)
        );

        return sortedMonthData;
      } else {
        return monthData;
      }
    },
    checkAvailability() {
      if (this.withdrawAmount && this.user.vendor.available) {
        var withdrawAmount = parseFloat(this.withdrawAmount.replace(",","."));
        var available = parseFloat(this.user.vendor.available.replace(",","."));
        withdrawAmount.toFixed(2);
        available.toFixed(2);
        if (available >= withdrawAmount) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
  },
  methods: {
    loadOrders() {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/orders", {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.sales = JSON.parse(response.data);
        this.loadingOrders = false;
      }, (response) => {
        console.log(response.error);
      });
    },
    showIndividual() {
      this.individual = true;
      this.company = false;
    }, 
    showCompany() {
      this.individual = false;
      this.company = true;
    },
    hideWithdraw() {
      this.popupWithdraw = false;
      this.withdraw = true;
      this.bank = false;
    },
    showWithdraw() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.popupWithdraw = true;
      this.withdraw = true;
      this.$nextTick(() => this.$refs.withdrawAmount.focus());
    },
    saveBankAccount() {
      this.loadingBank = true;
      this.errorBank = false;
      if (this.iban && this.iban.length == 27) {
        if ((this.company && this.businessName) || (this.individual && this.holderName)) {
          if (this.company && this.businessName) {
            this.holderName = null;
          } else {
            this.businessName = null;
          }

          const last4 = this.iban.substr(this.iban.length - 4);
          const countryCode = this.iban.substr(0, 2);
          var number = this.iban.substr(2);
          number = number.replace(/\s/g, '');

          window.cordova.plugin.http.post(this.baseUrl + "/user/api/bank/add", { "number": number, "last4": last4, "countryCode": countryCode, "holderName": this.holderName, "businessName": this.businessName }, { Authorization: "Bearer " + this.token }, (response) => {
            this.$store.commit('setUser', JSON.parse(response.data));
            this.user = this.$store.getters.getUser;
            this.loadingBank = false;
            this.popupBankAccount = false;
            this.withdraw = true;
            this.bank = false;
          }, (response) => {
            console.log(response.error);
            window.plugins.toast.show(response.error, 'long', 'top');
            this.loadingBank = false;
          });
        } else {
          this.errorBank = true;
          this.loadingBank = false;
        }
      } else {
        this.errorBank = true;
        this.loadingBank = false;
      }
    },
    showBank() {
      this.withdraw = false;
      this.bank = true;
    },
    hideHistory() {
      this.popupHistory = false;
    },
    showHistory(data) {
      this.history = data;
      this.popupHistory = true;
    },
    saveWithdraw() {
      if (this.withdrawAmount && this.user.vendor.bankAccounts.length > 0) {
        window.cordova.plugin.http.post(this.baseUrl + "/user/api/withdraw", { "withdrawAmount": this.withdrawAmount.replace(",",".") }, { Authorization: "Bearer " + this.token }, (response) => {
          this.$store.commit('setUser', JSON.parse(response.data));
          this.user = JSON.parse(response.data);
          this.withdrawAmount = null;
          this.withdraw = false;
          this.bank = false;
        }, (response) => {
          console.log(response.error);
          window.plugins.toast.show(response.error, 'long', 'top');
        });
      }
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
    formatMonth(dateString) {
      const date = new Date(dateString + '-01');
      return date.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
    },
    limitDecimals() {
      if (this.withdrawAmount) {
        const numDecimals = (this.withdrawAmount.toString().split('.')[1] || '').length;
        const numDecimalsComma = (this.withdrawAmount.toString().split(',')[1] || '').length;

        if (numDecimals > 2) {
          this.withdrawAmount = this.withdrawAmount.slice(0, this.withdrawAmount.indexOf(".") + 3);
        } else if (numDecimalsComma > 2) {
          this.withdrawAmount = this.withdrawAmount.slice(0, this.withdrawAmount.indexOf(",") + 3);
        }
      } 
    },
    addAmount() {
      this.withdrawAmount = this.user.vendor.available;
    },
    base64ToBlob(base64, mimeType='') {
      // Split into two parts: the data and the mime type
      var parts = base64.split(';base64,');
      // Decode the base64 string
      var decodedData = window.atob(parts[1]);

      // Create an array of bytes (from byte numbers)
      var bytes = new Array(decodedData.length);
      for (var i = 0; i < decodedData.length; i++) {
        bytes[i] = decodedData.charCodeAt(i);
      }

      // Convert into a blob
      var blob = new Blob([new Uint8Array(bytes)], { type: mimeType });
      return blob;
    },
    uploadFront() {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true
      }
      
      navigator.camera.getPicture((front_document) => {
        var base64String = "data:image/jpeg;base64," + front_document;
        console.log(base64String);
        this.verifFront(base64String);
      }, (error) => {
        console.log("Impossible de récupérer le document : " + error);
      }, options);
    },
    uploadBack() {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true
      }
      
      navigator.camera.getPicture((back_document) => {
        var base64String = "data:image/jpeg;base64," + back_document;
        console.log(base64String);
        this.verifBack(base64String);
      }, (error) => {
        console.log("Impossible de récupérer le document : " + error);
      }, options);
    },
    async verifFront(base64String) {
      const stripe = Stripe(this.stripe_pk);
      const data = new FormData();

      var mimeType = "image/jpeg";
      var blob = this.base64ToBlob(base64String, mimeType);

      data.append('file', blob, 'front_document.jpg');
      data.append('purpose', 'identity_document');
      const header = "Bearer " + this.stripe_pk;
      const response = await fetch('https://uploads.stripe.com/v1/files', {
        method: 'POST',
        headers: { 'Authorization': header },
        body: data
      });
      const fileData = await response.json();
      console.log(fileData);

      if (fileData && fileData.id) {
        const result = await stripe.createToken('person', {
          person: {
            verification: {
              document: {
                front: fileData.id,
              },
            },
          },
        });

        if (result && result.token.id) {
          window.cordova.plugin.http.setDataSerializer('json');
          window.cordova.plugin.http.post(this.baseUrl + "/user/api/verification/document/front", { "person_token": result.token.id }, { Authorization: "Bearer " + this.token }, (response) => {
            console.log(JSON.parse(response.data));
            window.plugins.toast.show('Le document recto a été envoyé !', 'long', 'top');
          }, (response) => {
            console.log(response.error);
            window.plugins.toast.show(response.error, 'long', 'top');
          });
        }
      }
    },
    async verifBack() {
      const stripe = Stripe(this.stripe_pk);
      const data = new FormData();

      var mimeType = "image/jpeg";
      var blob = this.base64ToBlob(base64String, mimeType);

      data.append('file', blob, 'front_document.jpg');
      data.append('purpose', 'identity_document');
      const header = "Bearer " + this.stripe_pk;
      const response = await fetch('https://uploads.stripe.com/v1/files', {
        method: 'POST',
        headers: { 'Authorization': header },
        body: data
      });
      const fileData = await response.json();
      console.log(fileData);

      if (fileData && fileData.id) {
        const result = await stripe.createToken('person', {
          person: {
            verification: {
              document: {
                back: fileData.id,
              },
            },
          },
        });

        if (result && result.token.id) {
          window.cordova.plugin.http.setDataSerializer('json');
          window.cordova.plugin.http.post(this.baseUrl + "/user/api/verification/document/back", { "person_token": result.token.id }, { Authorization: "Bearer " + this.token }, (response) => {
            console.log(JSON.parse(response.data));
            window.plugins.toast.show('Le document recto a été envoyé !', 'long', 'top');
          }, (response) => {
            console.log(response.error);
            window.plugins.toast.show(response.error, 'long', 'top');
          });
        }
      }
    },
  }
};

</script>

