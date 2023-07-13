<template>
  <main class="products" style="padding: 0px 15px;">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Boutique</div>
    </div>

    <div class="checkout__body">
      <div class="profile--follow" style="box-shadow: 0 0 5px rgb(0 0 0 / 20%); margin: 15px 5px 25px; padding: 12px 0px;">
        <div style="border-right: 1px solid #eff1f6;">
          <h4>{{ numberOfProductsInStock }}</h4>
          <p>En stock</p>
        </div>
        <div>
          <h4>{{ numberOfOutOfStockProducts }}</h4>
          <p>Épuisé</p>
        </div>
      </div>

      <div @click="addProduct()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); margin: 10px 0px 25px;">Ajouter un article</div>

      <div v-if="products.length" class="items">
        <div class="lasted--product" style="margin-top: 20px;">
          <div v-for="(product, index) in sortedProducts" @click="editProduct(product)" class="product--item">
            <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style=" background: #eeeeee">
            <img v-else :src="require(`@/assets/img/no-preview.png`)">
            <div class="details">
              <div class="title">{{ product.title }}</div>
              <div class="price" :class="{ 'stock-unavailable': isProductUnavailable(product), 'stock-available': !isProductUnavailable(product) }">{{ getProductQuantity(product) }}</div>
            </div>
            <div style="margin-right: 10px;">
              <div v-if="product.variants.length > 0" class="price">{{ lowestVariantPrice(product.variants) | formatPrice }}€</div>
              <div v-else class="price">{{ product.price | formatPrice }}€</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="loading">
        <div class="loader2">
          <span></span>
        </div>
      </div>
      <div v-else>
        <div class="container" style="margin: 120px auto 0px; text-align: center;">
          <div style="margin: 0px auto;">
            <Lottie :options="defaultOptions" style="width:100%"/>
          </div>
        </div>
        <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun article</h5>
        <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos articles apparaîtront ici.</div>
      </div>
    </div>
  </main>
</template>


<style scoped src="../../assets/css/shop.css"></style>

<script>
import Lottie from 'vue-lottie';
import * as animationData from '../../assets/lottie/no-product.json';


export default {
  name: 'Shop',
  components: {
    Lottie
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      defaultOptions: {animationData: animationData},
      user: this.$store.getters.getUser,
      products: [],
      loading: true,
    }
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  computed: {
    sortedProducts() {
      return this.products.sort((a, b) => {
        const aQuantity = a.variants.length > 0 ? this.totalVariantQuantity(a.variants) : a.quantity;
        const bQuantity = b.variants.length > 0 ? this.totalVariantQuantity(b.variants) : b.quantity;

        if (aQuantity === bQuantity) {
          return 0;
        } else if (aQuantity === 0 || bQuantity > 0) {
          return 1;
        } else {
          return -1;
        }
      });
    },
    numberOfProductsInStock() {
      return this.products.filter((product) => this.getProductQuantity(product) !== "Épuisé").length;
    },
    numberOfOutOfStockProducts() {
      return this.products.filter((product) => this.getProductQuantity(product) === "Épuisé").length;
    },
  },
  created() {    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");
    
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/products", {}, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(response);
        this.products = JSON.parse(response.data);
        this.loading = false;
      }, (response) => {
        console.log(response.error);
      });
    },
    totalVariantQuantity(variants) {
      return variants.reduce((total, variant) => total + variant.quantity, 0);
    },
    lowestVariantPrice(variants) {
      const lowestPrice = Math.min(...variants.map((variant) => variant.price));
      return lowestPrice;
    },
    getProductQuantity(product) {
      if (product.quantity === 0) {
        return "Épuisé";
      } else if (product.variants.length > 0 && this.totalVariantQuantity(product.variants) === 0) {
        return "Épuisé";
      } else if (product.variants.length === 0) {
        return product.quantity + " en stock";
      } else {
        var quantity = this.totalVariantQuantity(product.variants);
        return quantity + " en stock";
      }
    },
    isProductUnavailable(product) {
      return (product.quantity === 0) || (product.variants.length > 0 && this.totalVariantQuantity(product.variants) === 0);
    },
    addProduct() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      window.plugins.nativepagetransitions.slide({
        direction: 'left',
        duration: 400,
        iosdelay: 0,
        androiddelay: 0,
        winphonedelay: 0,
        slowdownfactor: 1,
      });
      this.$router.push({ name: 'AddEditProduct' });
    },
    editProduct(product) {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      window.plugins.nativepagetransitions.slide({
        direction: 'left',
        duration: 400,
        iosdelay: 0,
        androiddelay: 0,
        winphonedelay: 0,
        slowdownfactor: 1,
      });
      this.$store.commit('setProduct', product);
      this.$router.push({ name: 'AddEditProduct', params: { productId: product.id } });
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
  }
};

</script>

