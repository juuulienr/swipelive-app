<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Ma boutique</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 50px;">
      <div @click="addProduct()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); margin: 10px 0px 25px;">Ajouter un article</div>

      <div v-if="products" class="items">
        <div class="lasted--product" style="margin-top: 20px;">
          <div v-for="(product, index) in products" v-if="product.archived == false" @click="editProduct(product.id)" class="product--item" style="align-items: center;">
            <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="line-height: 0;display: block;border-radius: 10px;width: 64px;height: 64px;margin-right: 16px;">
            <img v-else :src="require(`@/assets/img/no-preview.jpg`)" style="line-height: 0;display: block;border-radius: 10px;width: 64px;height: 64px;margin-right: 16px;">
            <div class="details">
              <div class="title">{{ product.title }}</div>
              <div class="price" v-if="stocks[index] > 0" style="margin: 0px; height: 22px; min-width: 22px; line-height: 0; border-radius: 6px; cursor: default; align-items: center; white-space: nowrap; display: inline-flex; justify-content: center; color: rgb(34, 154, 22); font-size: 0.75rem; background-color: rgba(84, 214, 44, 0.16); font-weight: 700; padding: 0 8px; margin-top: 3px; ">{{ stocks[index] }} en stock</div>
              <div class="price" v-else-if="stocks[index] == 0" style="margin: 0px; height: 22px; min-width: 22px; line-height: 0; border-radius: 6px; cursor: default; align-items: center; white-space: nowrap; display: inline-flex; justify-content: center; color: #ff0000; font-size: 0.75rem; background-color: #d62c2c29; font-weight: 700; padding: 0 8px; margin-top: 3px; ">Épuisé</div>
              <div class="price" v-else-if="product.quantity > 0" style="margin: 0px; height: 22px; min-width: 22px; line-height: 0; border-radius: 6px; cursor: default; align-items: center; white-space: nowrap; display: inline-flex; justify-content: center; color: rgb(34, 154, 22); font-size: 0.75rem; background-color: rgba(84, 214, 44, 0.16); font-weight: 700; padding: 0 8px; margin-top: 3px; ">{{ product.quantity }} en stock</div>
              <div class="price" v-else style="margin: 0px; height: 22px; min-width: 22px; line-height: 0; border-radius: 6px; cursor: default; align-items: center; white-space: nowrap; display: inline-flex; justify-content: center; color: #ff0000; font-size: 0.75rem; background-color: #d62c2c29; font-weight: 700; padding: 0 8px; margin-top: 3px; ">Épuisé</div>
            </div>
            <div style="margin-right: 10px;">
              <div class="price">{{ product.price | formatPrice }}€</div>
            </div>
          </div>
        </div>
      </div>
    <!--   <div v-else>
        <div class="container" style="margin: 100px auto 0px; text-align: center;">
          <video style="height: 220px; width: 220px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/product.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
        </div>
        <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 30px;">Aucun article</h5>
        <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos articles apparaîtront ici.</div>
      </div> -->
    </div>
  </main>
</template>


<style scoped src="../../assets/css/shopvendor.css"></style>

<script>

export default {
  name: 'Shop',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      stocks: [],
      prices: [],
      products: null,
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
    
    window.cordova.plugin.http.get(this.baseUrl + "/user/api/products", {}, { Authorization: "Bearer " + this.token }, (response) => {
      this.products = JSON.parse(response.data);
      this.products.map((product, index) => {
        if (product.variants.length) {
          var quantity = 0;
          var price = null;
          product.variants.map((variant) => {
            if (!price) {
              price = variant.price;
            }
            if (price && variant.price < price) {
              price = variant.price;
            }
            quantity = quantity + variant.quantity;
          });
          this.stocks[index] = quantity;
          this.prices[index] = price;
        }
      });
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    addProduct() {
      this.$router.push({ name: 'AddProduct' });
    },
    editProduct(id) {
      this.$router.push({ name: 'EditProduct', params: { id: id } });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
  }
};

</script>

