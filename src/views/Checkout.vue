<template>
  <main class="cart">
    <div style="position: absolute; background: white; padding: 15px; width: 100%; z-index: 1000000000; text-align: center;">
      <svg v-if="shippingTab" @click="goBack()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823; float: left;">
        <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
      </svg>
      <svg v-else @click="goShipping()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823; float: left;">
        <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
      </svg>
      <h5 v-if="shippingTab" style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Livraison</h5>
      <h5 v-else style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Paiement</h5>
    </div>
    <div class="checkout" style="margin-top: 50px;">
      <div v-if="shippingTab" class="checkout__body">
        <div class="MuiCardHeader-root css-15x3obx" style="padding-top: 0px; padding-bottom: 10px;">
          <div class="MuiCardHeader-content css-11qjisw">
            <span class="MuiTypography-root MuiTypography-h6 MuiCardHeader-title css-jef1j">Récapitulatif</span>
          </div>
        </div>

        <!-- order -->
        <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-13dslnb" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 5px 10px; border-radius: 15px;">
          <div v-if="product" class="checkout__row checkout__product-info-row" style="align-items: center; justify-content: space-between;">
            <div class="checkout__product-info" style="padding-right: 0px;">
              <img v-if="product.uploads" :src="baseUrl + '/uploads/' + product.uploads[0].filename" class="checkout__image" style="border-radius: 8px;" />
              <div style="padding-right: 30px;">
              <h5 class="checkout__name" style="margin-bottom: 5px; font-weight: 600; font-size: 14px; margin-right: 10px;"> {{ product.title }} </h5>
              <div class="checkout__attr" v-if="variant"><span> {{ variant.title }} </span></div>
              </div>
            </div>
            <div class="product--quantity--detail">x{{ quantity }}</div>
          </div>
          <hr class="MuiDivider-root MuiDivider-fullWidth css-ss6lby" style="margin-bottom: 5px; margin-top: 5px;"/>
          <div class="MuiCardContent-root css-18mhetb">
            <div class="css-ikzlcq">
              <div class="css-9jay18">
                <p class="MuiTypography-root MuiTypography-body2 css-11r9ii4">Sous-total</p>
                <h6 class="MuiTypography-root MuiTypography-subtitle2 css-yemnbq">{{ subTotal | formatPrice }}€</h6>
              </div>
            <!--   <div class="css-9jay18">
                <p class="MuiTypography-root MuiTypography-body2 css-11r9ii4" style="color: #18cea0; font-weight: 600;">PROMO10</p>
                <h6 class="MuiTypography-root MuiTypography-subtitle2 css-yemnbq" style="color: #18cea0; font-weight: 600;">-10,00€</h6>
              </div> -->
              <div class="css-9jay18">
                <p class="MuiTypography-root MuiTypography-body2 css-11r9ii4">Livraison</p>
                <h6 class="MuiTypography-root MuiTypography-subtitle2 css-yemnbq">-</h6>
              </div>
              <hr class="MuiDivider-root MuiDivider-fullWidth css-ss6lby" style="margin-bottom: 10px; margin-top: 5px; border-style: dashed;" />
              <div class="css-9jay18">
                <h6 class="MuiTypography-root MuiTypography-subtitle1 css-k9tjo5" style="font-weight: 600; margin-bottom: 0px;">Total</h6>
                <div class="MuiBox-root css-s2uf1z">
                  <h6 class="MuiTypography-root MuiTypography-subtitle1 css-kdhaao" style="font-weight: 600;">{{ total | formatPrice }}€</h6>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- shippingAddress -->
        <div class="MuiCardHeader-root css-15x3obx" style="padding-top: 20px; padding-bottom: 10px;">
          <div class="MuiCardHeader-content css-11qjisw">
            <span class="MuiTypography-root MuiTypography-h6 MuiCardHeader-title css-jef1j" style="display: initial;">Adresse</span>
          </div>
        </div>

        <div v-if="shippingAddress" class="card panel-item" style="border-radius: 15px; border: 1px solid rgba(22, 24, 35, 0.12);">
          <div class="card-body parcelshop-card-body">
            <div class="card-title">
              {{ firstname }} {{ lastname }}
            </div>
            <div class="card-text">
              <div>{{ address }}</div>
              <div>{{ zip }} {{ city }}</div>
            </div>
          </div>
        </div>
        <div v-else class="top-author" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 15px; border-radius: 15px;">
          <div @click="showShippingAddress()" class="top-author--container" style="">
            <div class="top-author--item">
              <!-- <img :src="" style="border-radius: 0px;"/> -->
              <div>
                <span>Ajouter une adresse</span>
                <div><span></span></div>
              </div>
              <div style="margin-right: 5px;"><span style="float: right;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187);width: 16px;height: 16px;"><path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path></svg></span></div>
            </div>
          </div>
        </div>


				<!-- carrier -->
        <div v-if="shippingAddress" class="MuiCardHeader-root css-15x3obx" style="padding-top: 20px; padding-bottom: 10px;">
          <div class="MuiCardHeader-content css-11qjisw">
            <span class="MuiTypography-root MuiTypography-h6 MuiCardHeader-title css-jef1j" style="display: initial;">Mode de livraison</span>
          </div>
        </div>
        <div v-if="shippingAddress" class="top-author" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 15px; border-radius: 15px;">
          <div class="top-author--container" style="">
            <div @click="showRelayPopup()" class="top-author--item">
              <img :src="require(`@/assets/img/relay.svg`)" style="border-radius: 0px;"/>
              <div>
                <span>Mondial Relais</span>
                <div><span>A partir de 3€</span></div>
              </div>
              <div style="margin-right: 5px;"><span style="float: right;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187);width: 16px;height: 16px;"><path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path></svg></span></div>
            </div>
            <hr class="MuiDivider-root MuiDivider-fullWidth css-ss6lby" style="margin-bottom: 10px; margin-top: 10px;" />
            <div class="top-author--item">
              <img :src="require(`@/assets/img/colissimo.svg`)" style="border-radius: 0px;"/>
              <div>
                <span>Colissimo</span>
                <div><span>A partir de 7€</span></div>
              </div>
              <div style="margin-right: 5px;"><span style="float: right;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187);width: 16px;height: 16px;"><path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path></svg></span></div>
            </div>
          </div>
        </div>

         
        <div v-if="relay" class="card panel-item" style="border-radius: 15px; border: 1px solid rgba(22, 24, 35, 0.12);">
          <div class="card-body parcelshop-card-body">
            <div class="card-title">
               3SDM
            </div>
            <div class="card-text">
              <div>287 RUE DES BROTTEAUX</div>
              <div>01700 MIRIBEL</div>
            </div>
          </div>
        </div>

        <div @click="payment()" style="margin: 30px auto">
          <div style="text-align: center;">
            <div class="btn-swipe">Paiement</div>
          </div>
        </div>
      </div>

      <div v-else class="checkout__body" style="padding: 0px;">
      	<iframe v-if="url" :src="url" width="100%" height="100%" style="border: none; width: -webkit-fill-available; height: calc(100vh - 50px);"></iframe>
      </div>


      <!-- shipping to home -->
      <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popupShippingAddress" style="overflow-y: scroll; height: 100%;"> 
        <div class="checkout__header">
          <div @click="hideShippingAddress()" class="checkout__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
          </div>
          <div class="checkout__title"> Livraison</div>
          <div class="checkout__right-btn">
            <div @click="saveShippingAddress()" style="color: #FE2C55; font-weight: 600;">Enregistrer</div>
          </div>
        </div>
        <div style="padding: 15px;">
          <div class="form--input">
            <div class="form--input--item" :class="{'form--input--item--error': errorFirstname }">
              <fieldset>
                <legend>Prénom</legend>
                <input type="text" v-model="firstname">
              </fieldset>
            </div>
            <div class="form--input--item" :class="{'form--input--item--error': errorLastname }">
              <fieldset>
                <legend>Nom</legend>
                <input type="text" v-model="lastname">
              </fieldset>
            </div>
          </div>

          <div class="form--input--item" :class="{'form--input--item--error': errorAddress }">
            <fieldset>
              <legend>Adresse</legend>
              <input type="text" v-model="address">
            </fieldset>
          </div>

          <div class="form--input--item">
            <fieldset>
              <legend>Complément d'adresse</legend>
              <input type="text" v-model="address2">
            </fieldset>
          </div>
          
          <div class="form--input">
            <div class="form--input--item" :class="{'form--input--item--error': errorZip }">
              <fieldset>
                <legend>Code postal</legend>
                <input type="text" v-model="zip">
              </fieldset>
            </div>

            <div class="form--input--item" :class="{'form--input--item--error': errorCity }">
              <fieldset>
                <legend>Ville</legend>
                <input type="text" v-model="city">
              </fieldset>
            </div>
          </div>

          <div class="form--input--item">
            <fieldset>
              <legend>Téléphone</legend>
              <input type="text" v-model="phone">
            </fieldset>
          </div>
        </div>
      </div>


      <!-- shipping to relay -->
      <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popupRelay" style="overflow-y: scroll; height: 100%;"> 
        <div class="checkout__header">
          <div @click="hideRelay()" class="checkout__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
          </div>
          <div class="checkout__title"> Choisir un point relais</div>
        </div>
        <div style="padding: 15px;">

			    <div class="images_filter">
			      <ul>
			        <li @click="showMap()" v-bind:class="{active: tabMap}"  :style="[tabMap ? {'color': '#fe2c55'} : {'color': '#999'}]" style="font-weight: 600">Carte </li>
			        <li @click="showList()" v-bind:class="{active: tabList}"  :style="[tabList ? {'color': '#fe2c55'} : {'color': '#999'}]" style="font-weight: 600">Liste des relais </li>
			      </ul>
			    </div>

          <div @click="saveRelay()" v-for="(point, index) in points" v-if="points.length" class="card panel-item" style="margin-top: 15px; border-radius: 15px; border: 1px solid rgba(145,158,171,.24);">
            <div class="card-body parcelshop-card-body">
              <div class="card-title" style="margin-bottom: 5px; font-weight: 600;">
                <img :src="require(`@/assets/img/relay.svg`)" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"/> {{ point.name }}
              </div>
              <div class="card-text">
                <div>{{ point.house_number }} {{ point.street }}</div>
                <div>{{ point.zip }} {{ point.city }}</div>
              <!--   <div v-if="point.open_tomorrow" style="text-transform: capitalize; font-weight: 600; font-size: 14px; margin-top: 3px;">Ouvert demain</div><br>
                <div v-if="point.formatted_opening_times" style="color: #999; font-size: 14px;">
                  <ul style="text-transform: capitalize;">
                    <li v-if="point.formatted_opening_times[0].length">
                      Lundi : <span v-for="(hour, index2) in point.formatted_opening_times[0]">{{ hour }} </span>
                    </li>
                    <li v-if="point.formatted_opening_times[1].length">
                      Mardi : <span v-for="(hour, index2) in point.formatted_opening_times[1]">{{ hour }} </span>
                    </li>
                    <li v-if="point.formatted_opening_times[2].length">
                      Mercredi : <span v-for="(hour, index2) in point.formatted_opening_times[2]">{{ hour }} </span>
                    </li>
                    <li v-if="point.formatted_opening_times[3].length">
                      Jeudi : <span v-for="(hour, index2) in point.formatted_opening_times[3]">{{ hour }} </span>
                    </li>
                    <li v-if="point.formatted_opening_times[4].length">
                      Vendredi : <span v-for="(hour, index2) in point.formatted_opening_times[4]">{{ hour }} </span>
                    </li>
                    <li v-if="point.formatted_opening_times[5].length">
                      Samedi : <span v-for="(hour, index2) in point.formatted_opening_times[5]">{{ hour }} </span>
                    </li>
                    <li v-if="point.formatted_opening_times[6].length">
                      Dimanche : <span v-for="(hour, index2) in point.formatted_opening_times[6]">{{ hour }} </span>
                    </li>
                  </ul>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped src="../assets/css/checkout.css"></style>

<script>

import Pusher from 'pusher-js';

export default {
  name: 'Checkout',
  data() {
    return {
      product: this.$route.params.product,
      variant: this.$route.params.variant,
      quantity: this.$route.params.quantity,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      sendcloud_pk: window.localStorage.getItem("sendcloud_pk"),
      pusher: new Pusher('55da4c74c2db8041edd6', { cluster: 'eu' }),
      carriers: [],
      client_secret: null,      
      subTotal: null,
      total: null,
      shippingAddress: true,
      tabMap: true,
      tabList: false,
      shippingTab: true,
      paymentTab: false,
      relay: false,
      popupShippingAddress: false,
      popupRelay: false,
      errorFirstname: false,
      errorLastname: false,
      errorAddress: false,
      errorZip: false,
      errorCity: false,
      firstname: "Julien",
      lastname: "Reignier",
      address: "87 chemin de la lune",
      address2: null,
      zip: "01700",
      city: "Miribel",
      points: null,
      url: null,
    }
  },
  filters: {
    formatPrice(value) {
    	return value.replace('.', ',');
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();

    console.log(this.product);
    console.log(this.variant);

    if (this.variant) {
      this.subTotal = this.variant.price * this.quantity;
    } else {
      this.subTotal = this.product.price * this.quantity;
    }

    this.subTotal = this.subTotal.toFixed(2);
    this.total = this.subTotal;

    window.cordova.plugin.http.post(this.baseUrl + "/user/api/payment", { "product": this.product.id, "variant": this.variant ? this.variant.id : null, "quantity": this.quantity }, { Authorization: "Bearer " + this.token }, (response) => {
      console.log(JSON.parse(response.data));
      this.client_secret = JSON.parse(response.data);
  		this.url = "https://checkout.trustshare.io/process?s=" + this.client_secret;

      var channel = this.pusher.subscribe(this.client_secret);
      channel.bind("pusher:subscription_succeeded", (response) => {
        console.log("subscription_succeeded : " + response);
      });

      channel.bind("pusher:subscription_error", (response) => {
        console.log("subscription_error : " + response);
      });

      var event = "event" + this.client_secret;

      channel.bind(event, (data) => {
        console.log(data);
        if (data.event == "settlement_settled" || data.event == "checkout_settling") {
        	this.$router.push({ name: 'Feed' });
        }
      });

    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    hideShippingAddress() {
      this.popupShippingAddress = false;
    },
    hideRelay() {
      this.popupRelay = false;
    },
    saveShippingAddress() {
      this.errorFirstname = false;
      this.errorLastname = false;
      this.errorAddress = false;
      this.errorZip = false;
      this.errorCity = false;

      if (!this.firstname) {
        this.errorFirstname = true;
      }

      if (!this.lastname) {
        this.errorLastname = true;
      }

      if (!this.address) {
        this.errorAddress = true;
      }

      if (!this.zip) {
        this.errorZip = true;
      }

      if (!this.city) {
        this.errorCity = true;
      }

      if (!this.errorFirstname && !this.errorLastname && !this.errorAddress && !this.errorZip && !this.errorCity) {
        this.popupShippingAddress = false;
        this.shippingAddress = true;
      }
    },
    saveRelay() {
      this.popupRelay = false;
      this.relay = true;
    },
    showShippingAddress() {
      this.popupShippingAddress = true;
    },
    showRelayPopup() {
    	this.findServicePoints();
      this.popupRelay = true;
    },
    goBack() {
      this.$router.back();
    },
    goShipping() {
      this.shippingTab = true;
    },
    findServicePoints() {
      window.cordova.plugin.http.setDataSerializer('json');
      window.cordova.plugin.http.get("https://servicepoints.sendcloud.sc/api/v2/service-points", { "access_token": this.sendcloud_pk, "country": "FR", "carrier": "mondial_relay", "postal_code": this.zip }, {}, (response) => {
        console.log(response);
        console.log(JSON.parse(response.data));
        this.points = JSON.parse(response.data);
      }, function(response) {
        console.log(response.error);
      });
    },
    payment() {
    	if (this.url) {
    		this.shippingTab = false;
    	}
    },
    showMap() {
      this.tabMap = true;
      this.tabList = false;
    },
    showList() {
      this.tabMap = false;
      this.tabList = true;
    },
  }
};

</script>

