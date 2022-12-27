<template>
  <main class="products shop_3" style="padding: 0px 10px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div v-if="category" class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">{{ category.name }}</div>
      <div v-else class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">{{ name }}</div>
    </div>


    <div class="checkout__body items" style="overflow: scroll; padding-bottom: 50px; padding-top: 10px;">
      <div v-if="category && category.products.length" class="shop--part" style="margin: 0px 5px;">
        <div v-if="product.archived == false" v-for="product in category.products" class="shop--item">
          <div>
            <div>
              <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="width: 100%;">
              <img v-else :src="require(`@/assets/img/no-preview.jpg`)" style="width: 100%;">
            </div>
          </div>
          <div class="shop--item--details">
            <div class="shop--item--name">{{ product.title }}</div>
            <div class="shop--item--price">
              <div class="price" :style="[product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#000'}]"> {{ product.price | formatPrice }}€ 
                <span v-if="product.compareAtPrice" class="last-price">{{ product.compareAtPrice | formatPrice }}€ </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- product popup -->
    <!-- <div v-if="popupProduct" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 100%; padding-bottom: 80px;">
      <svg @click="hideProduct()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 30px; height: 30px; fill: rgb(153, 153, 153); padding: 5px; background: white; border-radius: 30px; opacity: 0.5; position: absolute; top: 15px; left: 15px; z-index: 100000000;"><path d="M432.6 209.3l-191.1 183.1C235.1 397.8 229.1 400 224 400s-11.97-2.219-16.59-6.688L15.41 209.3C5.814 200.2 5.502 184.1 14.69 175.4c9.125-9.625 24.38-9.938 33.91-.7187L224 342.8l175.4-168c9.5-9.219 24.78-8.906 33.91 .7187C442.5 184.1 442.2 200.2 432.6 209.3z"/></svg>
      <Product :product="product" @clicked="onClickChild"/>
    </div>
    <div v-if="popupProduct" style="background-color: white;bottom: 25px; position: fixed; z-index: 2147483647;">
      <div style="padding: 15px 15px 25px; background-color: white; width: 100vw;">
        <div @click="goCheckout()" class="btn-swipe2" style="border-radius: 10px; width: 100%; background: rgb(24, 206, 160); color: white !important; font-weight: 600; margin: 0 auto; padding: 12px 36px; font-size: 15px; text-align: center;">
        	Acheter
        </div>
      </div>
    </div>
 -->

  </main>
</template>


<script>

import Product from './Product';

export default {
  name: 'Category',
  components: {
    Product,
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      user: JSON.parse(window.localStorage.getItem("user")),
      lineItems: window.localStorage.getItem("lineItems") ? JSON.parse(window.localStorage.getItem("lineItems")) : [],
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      id: this.$route.params.id,
      name: this.$route.params.name,
      category: null,
      popupProduct: false,
      product: [],
      variant: [],
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

    window.cordova.plugin.http.get(this.baseUrl + "/api/categories/" + this.id, {}, { 'Content-Type':  'application/json; charset=UTF-8' }, (response) => {
      this.category = JSON.parse(response.data);
      console.log(this.category);
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    showProduct(product) {
      this.product = product;
      this.popupProduct = true;
    },
    hideProduct() {
      this.popupProduct = false;
      this.product = [];
    },
    onClickChild (variant) {
      this.variant = variant;
    },
    goCheckout() {
      this.lineItems = [];
      this.lineItems.push({ "product": this.product, "variant": this.variant, "quantity": 1 });
      window.localStorage.setItem("lineItems", JSON.stringify(this.lineItems));
      this.$router.push({ name: 'Checkout' });
    },
    goBack() {
      this.$router.back();
    },
  }
};

</script>

