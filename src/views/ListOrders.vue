<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Commandes</div>
    </div>

    <div class="checkout__body">
      <div v-if="user.vendor">
        <div class="chat--left--head--input">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="css-1q8h0dm iconify iconify--eva">
            <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
          </svg>
          <input ref="search" type="text" placeholder="Rechercher" style="height: 1.75em"/>
        </div>
      </div>

      <div v-if="user.vendor" class="images_sec" style="padding: 20px 5px 15px; display: flex; flex-wrap: nowrap; overflow-x: auto; width: auto; padding: 10px 0;">
        <div class="images_filter" style="width: calc(100vw - 30px)">
          <ul>
            <li @click="showNumber1()" v-bind:class="{active: show1}" :style="[show1 ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]" style="font-weight: 600;">Nouvelle</li>
            <li @click="showNumber2()" v-bind:class="{active: show2}" :style="[show2 ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">En cours</li>
            <li @click="showNumber3()" v-bind:class="{active: show3}" :style="[show3 ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">Litige</li>
            <li @click="showNumber4()" v-bind:class="{active: show4}"  :style="[show4 ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">Terminée</li>
          </ul>
        </div>
      </div>


      <div class="top-author" style="margin-top: 15px;">
      	<div v-if="show1" class="top-author--container">
          <div v-if="orders && orders.length > 0">
        		<div v-for="order in orders" @click="goToOrder(order.id)" class="top-author--item" style="position: relative">
        			<img v-if="order.lineItems[0].product.uploads" :src="cloudinary256x256 + order.lineItems[0].product.uploads[0].filename"/>
              <img v-else :src="require(`@/assets/img/no-preview.png`)"/>
              <span class="counter-badge" style="top: 4px;left: 62px;">{{ nbProducts(order.lineItems) }}</span>
        			<div>
        				<div><span>#{{ order.number }}</span></div>
        				<span v-if="user.id == order.vendor.user.id">{{ order.buyer.firstname }} {{ order.buyer.lastname }}</span>
                <span v-else>{{ order.vendor.businessName }}</span>
                <div><span style="font-size: 11px; color: #999;">{{ order.createdAt | formatDate }}</span></div>
        			</div>
              <span v-if="user.id == order.vendor.user.id" class="css-4ioo3c">{{ order.total | formatPrice }}€</span>
              <span v-else class="css-4ioo3c" style="color: #272c30;background-color: transparent;font-weight: 400;">{{ order.total | formatPrice }}€</span>
              <!-- litige -->
              <!-- <span v-else class="css-4ioo3c" style="color: #ff9800; background-color: rgba(255,171,0,.16);">{{ order.total | formatPrice }}€</span> -->
        		</div>
          </div>
          <div v-else>
            <div class="container" style="margin: 120px auto 0px; text-align: center;">
              <div style="margin: 0px auto;">
                <Lottie :options="defaultOptions" :width="200"/>
              </div>
            </div>
            <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucune commande</h5>
            <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos commandes apparaîtront ici.</div>
          </div>
        </div>
        
        <div v-if="show2" class="top-author--container">
          <div>
            <div class="container" style="margin: 120px auto 0px; text-align: center;">
              <div style="margin: 0px auto;">
                <Lottie :options="defaultOptions" :width="200"/>
              </div>
            </div>
            <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucune commande en cours</h5>
            <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos commandes apparaîtront ici.</div>
          </div>
        </div>
        <div v-if="show3" class="top-author--container">
          <div>
            <div class="container" style="margin: 120px auto 0px; text-align: center;">
              <div style="margin: 0px auto;">
                <Lottie :options="defaultOptions" :width="200"/>
              </div>
            </div>
            <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun litige</h5>
            <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos commandes apparaîtront ici.</div>
          </div>
        </div>
        <div v-if="show4" class="top-author--container">
          <div>
            <div class="container" style="margin: 120px auto 0px; text-align: center;">
              <div style="margin: 0px auto;">
                <Lottie :options="defaultOptions" :width="200"/>
              </div>
            </div>
            <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucune commande terminée</h5>
            <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos commandes apparaîtront ici.</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped src="../assets/css/listorders.css"></style>

<script>

import Lottie from 'vue-lottie';
import * as animationData from '../assets/lottie/order.json';

export default {
  name: 'ListOrders',
  components: {
    Lottie
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      defaultOptions: {animationData: animationData},
      orders: [],
      show1: true,
      show2: false,
      show3: false,
      show4: false,
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");

    window.cordova.plugin.http.get(this.baseUrl + "/user/api/orders", {}, { Authorization: "Bearer " + this.token }, (response) => {
      this.orders = JSON.parse(response.data);
    }, (response) => {
      console.log(response.error);
    });
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleDateString(navigator.language) + " " + date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    }
  },
  methods: {
    nbProducts(lineItems) {
      var count = 0;
      if (lineItems.length) {
        lineItems.map(lineItem => {
          count = count + lineItem.quantity;
        });
      }
      return count;
    },
    goToOrder(id) {
      this.$router.push({ name: 'Order', params: { id: id } });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
    showNumber1() {
      this.show1 = true;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
    }, 
    showNumber2() {
      this.show1 = false;
      this.show2 = true;
      this.show3 = false;
      this.show4 = false;
    }, 
    showNumber3() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = true;
      this.show4 = false;
    }, 
    showNumber4() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = true;
    }, 
  }
};

</script>

