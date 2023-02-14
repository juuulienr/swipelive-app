<template>
  <main class="products shop_3" style="padding: 0px;">
    <div class="checkout__header" style="padding: 5px 15px 15px;">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Favoris</div>
    </div>

    <div v-if="favoris && favoris.length > 0" class="checkout__body items">
      <div class="shop--part" style="margin: 10px 15px 0px; gap: 20px 10px;">
        <div v-if="heart.product.archived == false" v-for="(heart, index) in favoris" class="shop--box">
          <div>
            <div>
              <img v-if="heart.product.uploads.length" :src="cloudinary256x256 + heart.product.uploads[0].filename" style="width: 100%; border-radius: 10px;">
              <img v-else :src="require(`@/assets/img/no-preview.png`)" style="width: 100%; border-radius: 10px;">
              <svg @click="removeFavoris(heart.product, index)" width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 25px; height: 25px; fill: white; border-radius: 30px; position: absolute; top: 10px; right: 10px; z-index: 100000000;filter: drop-shadow(0px 0px 1px #222);">
                <g transform="matrix( 1 0 0 1 1 3 )">
                  <path d="M16 0C13.8 0 12.2 1.2 11 2.5C9.8 1.3 8.2 0 6 0C2.5 0 0 2.9 0 6.5C0 8.3 0.7 9.9 2 11L11 19.5L20 11C21.2 9.8 22 8.3 22 6.5C22 2.9 19.5 0 16 0Z" fill="#FFFFFF"></path>
                </g>
              </svg>
            </div>
          </div>
          <div class="shop--item--details" style="width: 100%; padding: 0px; margin-top: 6px; padding-left: 5px;">
            <div class="shop--item--name" style="font-size: 13px; text-align: left;">{{ heart.product.title }}</div>
            <div class="shop--item--price">
              <div class="price" style="font-size: 12px; margin: 0px; font-weight: 500;" :style="[heart.product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]"> {{ heart.product.price | formatPrice }}€
                <span v-if="heart.product.compareAtPrice" class="last-price" style="margin-left: 3px;">{{ heart.product.compareAtPrice | formatPrice }}€ </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>   
    <div v-else class="checkout__body items">
      <div class="container" style="margin: 120px auto 0px; text-align: center;">
        <div style="margin: 0px auto;">
          <lottie :options="defaultOptions" :width="200"/>
        </div>
      </div>
      <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun favoris</h5>
      <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos articles favoris apparaîtront ici.</div>
    </div>
  </main>
</template>


<style>
.shop--box, .shop--box>div:first-of-type {
  position: relative;
}
</style>

<script>

import Product from '../components/Product';
import Lottie from 'vue-lottie';
import * as animationData from '../assets/lottie/favoris.json';


export default {
  name: 'Favoris',
  components: {
    'lottie': Lottie,
    Product,
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      user: JSON.parse(window.localStorage.getItem("user")),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      categories: JSON.parse(window.localStorage.getItem("categories")),
      token: window.localStorage.getItem("token"),
      defaultOptions: {animationData: animationData},
      selectedCategory: '',
      favoris: [],
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
    window.StatusBar.backgroundColorByHexString("#ffffff");
    
    this.favoris = this.user.favoris;
    console.log(this.favoris);
  },  
  methods: {
    removeFavoris(product, index) { 
      this.favoris.map((favoris, index) => {
        if (favoris.product.id == product.id) {
          this.favoris.splice(index, 1);
        }
      });

      window.cordova.plugin.http.get(this.baseUrl + "/user/api/favoris/" + product.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        window.localStorage.setItem("user", response.data);
      }, (response) => {
        console.log(response.error);
      });
    },
    goBack() {
      this.$router.back();
    },
  }
};

</script>

