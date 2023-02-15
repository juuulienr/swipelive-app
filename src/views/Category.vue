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
      <div v-for="product in filteredProducts" @click="showProduct(product)" class="shop--box">
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
          <Lottie :options="defaultOptions" style="width:100%"/>
        </div>
      </div>
      <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun produit</h5>
      <div style="font-weight: 400;font-size: 15px;text-align: center;">Il n'y a pas d'article dans cette catégorie.</div>
    </div>


    <!-- product popup -->
    <div v-if="popupProduct" class="store-products-item__login-popup store-products-item__login-popup--active product-popup">
      <div @click="hideProduct()" style="display: flex;">
        <div class="scroll-indicator" style="margin: 15px auto 0px;"></div>
      </div>
      <svg v-if="user.favoris.find(favoris => favoris.product.id === product.id)" @click="favoris(product)" xmlns="http://www.w3.org/2000/svg" class="heart-svg" style="top: 45px;filter: drop-shadow(0px 0px 1px #222);">
        <g transform="matrix( 1 0 0 1 1 3 )">
          <path d="M16 0C13.8 0 12.2 1.2 11 2.5C9.8 1.3 8.2 0 6 0C2.5 0 0 2.9 0 6.5C0 8.3 0.7 9.9 2 11L11 19.5L20 11C21.2 9.8 22 8.3 22 6.5C22 2.9 19.5 0 16 0Z" fill="#FFFFFF"></path>
        </g>
      </svg>
      <svg v-else @click="favoris(product)" xmlns="http://www.w3.org/2000/svg" class="heart-svg" style="top: 45px;filter: drop-shadow(0px 0px 1px #222);">
        <g transform="matrix( 1 0 0 1 1 2 )">
          <path d="M15 3C17.5 3 19 4.90001 19 7.20001C19 8.40001 18.4 9.49999 17.7 10.3C16.5 11.5 11 16 11 16C11 16 5.50005 11.5 4.30005 10.3C3.50005 9.49999 3 8.40001 3 7.20001C3 4.90001 4.5 3 7 3C8.7 3 10.3 4.6 11 6C11.7 4.6 13.3 3 15 3ZM15 0C13.5 0 12.1 0.599994 11 1.39999C9.9 0.499994 8.5 0 7 0C3 0 0 3.10001 0 7.20001C0 9.10001 0.799951 10.9 2.19995 12.4C3.59995 13.9 11 19.9 11 19.9C11 19.9 18.4 13.9 19.8 12.4C21.2 10.9 22 9.10001 22 7.20001C22 3.10001 19 0 15 0Z" fill="#FFFFFF" style="fill: white;"></path>
        </g>
      </svg>
      <Product :product="product" @selectVariant="selectVariantChild"></Product>
    </div>
    <div v-if="popupProduct" class="product-popup-btn">
      <div class="groups">
        <div @click="addToCart()" class="btn-swipe btn-checkout">Ajouter</div>
      </div>
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
    Lottie
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
      product: null,
      variant: null,
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
    goBack() {
      this.$router.back();
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
    showProduct(product) {
      this.product = product;
      this.popupProduct = true;
    },
    hideProduct() {
      this.popupProduct = false;
      this.product = null;
    },
    favoris(product) { 
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/favoris/" + product.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.user = JSON.parse(response.data);
        window.localStorage.setItem("user", response.data);
      }, (response) => {
        console.log(response.error);
      });
    },
    selectVariantChild(variant) {
      console.log(variant);
    },
    addToCart() {
      this.popupProduct = false;
    }
  }
};

</script>

