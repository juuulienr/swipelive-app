<template>
  <main class="products shop_3">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div v-if="category" class="checkout__title">{{ category.name }}</div>
      <div v-else class="checkout__title">{{ name }}</div>
    </div>


    <div v-if="category && category.products.length" class="checkout__body items" style="overflow: scroll; padding-bottom: 50px;">
      <div class="s1yvqyx7 dir dir-ltr">
        <div class="dir dir-ltr">
          <div class="awuxh4x dir dir-ltr">
            <div class="cw9aemg dir dir-ltr">
              <div class="c14whb16 dir dir-ltr">
                <button v-for="category in categories" :key="category" :class="{ 'ccma3s' : category.id == id }" class="c1l3w0tx dir dir-ltr">
                  <div class="c8gkmzg dir dir-ltr">
                    <span class="c1m2z0bj c1w8ohg7 dir dir-ltr">
                      <img class="i1wps9q8 dir dir-ltr" src="https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg" alt="" width="24" height="24" />
                      <div class="tamhn2w dir dir-ltr"><span class="t1h65ots dir dir-ltr">{{ category.name }}</span></div>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="shop--part" style="margin: 25px 5px 0px 5px;">
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
  </main>
</template>

<style scoped src="../assets/css/category.css"></style>

<script>

import Product from '../components/Product';

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
      categories: JSON.parse(window.localStorage.getItem("categories")),
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

    var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
    window.cordova.plugin.http.get(this.baseUrl + "/api/categories/" + this.id, {}, httpHeader, (response) => {
      this.category = JSON.parse(response.data);
      console.log(this.category);
    }, (response) => {
      console.log(response.error);
    });

    window.cordova.plugin.http.get(this.baseUrl + "/api/categories", {}, httpHeader, (response) => {
      this.categories = JSON.parse(response.data);
      window.localStorage.setItem("categories", response.data);
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

