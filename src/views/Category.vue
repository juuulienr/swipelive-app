<template>
  <main class="products shop_3" style="padding: 0px;">
    <div class="people-section" style="padding-right: 0px; box-shadow: rgba(0,0,0,0.16) 0px 0px 6px 0px; padding-bottom: 7px;">
      <div class="s1yvqyx7 dir dir-ltr">
        <div class="dir dir-ltr">
          <div class="awuxh4x dir dir-ltr">
            <div class="cw9aemg dir dir-ltr">
              <div class="c14whb16 dir dir-ltr">
                <button @click="selectCategory(category)" v-for="category in categories" :key="category" :class="{ 'ccma3s': category === selectedCategory }" class="c1l3w0tx dir dir-ltr">
                  <div class="c8gkmzg dir dir-ltr">
                    <span class="c1m2z0bj c1w8ohg7 dir dir-ltr">
                      <img v-if="category.picture" class="i1wps9q8 dir dir-ltr" :src="require(`@/assets/img/` + category.picture)" alt="" width="24" height="24" />
                      <div class="tamhn2w dir dir-ltr">
                        <span class="t1h65ots dir dir-ltr">{{ category.name }}</span>
                      </div>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="filteredProducts.length" class="shop--part" style="margin: 25px 15px 0px; gap: 20px 10px; padding-bottom: 80px;">
      <div v-for="product in filteredProducts" class="shop--box">
        <div>
          <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="width: 100%; border-radius: 10px;">
          <img v-else :src="require(`@/assets/img/no-preview.png`)" style="width: 100%; border-radius: 10px;">
        </div>
        <div class="shop--item--details" style="width: 100%; padding: 0px; margin-top: 6px; padding-left: 5px;">
          <div class="shop--item--name" style="font-size: 13px; text-align: left;">{{ product.title }}</div>
          <div class="shop--item--price">
            <div class="price" style="font-size: 12px; margin: 0px; font-weight: 500;" :style="[product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]"> {{ product.price | formatPrice }}€
              <span v-if="product.compareAtPrice" class="last-price" style="margin-left: 3px;">{{ product.compareAtPrice | formatPrice }}€ </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container" style="margin: 120px auto 0px; text-align: center;">
        <div style="margin: 0px auto;">
          <lottie :options="defaultOptions" style="width:100%"/>
        </div>
      </div>
      <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun produit</h5>
      <div style="font-weight: 400;font-size: 15px;text-align: center;">Il n'y a pas d'article dans cette catégorie.</div>
    </div>
  </main>
</template>

<style scoped src="../assets/css/category.css"></style>

<script>

import Product from '../components/Product';
import Lottie from 'vue-lottie';
import * as animationData from '../assets/lottie/no-product.json';


export default {
  name: 'Category',
  components: {
    Product,
    'lottie': Lottie,
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      user: JSON.parse(window.localStorage.getItem("user")),
      lineItems: window.localStorage.getItem("lineItems") ? JSON.parse(window.localStorage.getItem("lineItems")) : [],
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      categories: JSON.parse(window.localStorage.getItem("categories")),
      defaultOptions: {animationData: animationData},
      id: this.$route.params.id,
      selectedCategory: null,
      products: null,
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
  computed: {
    filteredProducts() {
      if (this.products) {
        return this.products.filter(product => product.category.id === this.selectedCategory.id);
      }

      return false;
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");

    if (this.id) {
      this.categories.map((category, index) => {
        if (category.id == this.id) {
          this.selectedCategory = category; 
        }
      });
    } else {
      this.selectedCategory = this.categories[0]; 
    }

    var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
    window.cordova.plugin.http.get(this.baseUrl + "/api/products/all", {}, httpHeader, (response) => {
      this.products = JSON.parse(response.data);
      console.log(this.products);
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {   
    selectCategory(category) {
      this.selectedCategory = category;
    },
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

