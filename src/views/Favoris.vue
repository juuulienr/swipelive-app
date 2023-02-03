<template>
  <main class="products shop_3">
    <div class="checkout__header" style="padding: 5px 10px 15px;">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Mes Favoris</div>
    </div>

    <div v-if="favoris && favoris.length > 0 && selectedCategory" class="checkout__body items">
      <div class="s1yvqyx7 dir dir-ltr">
        <div class="dir dir-ltr">
          <div class="awuxh4x dir dir-ltr">
            <div class="cw9aemg dir dir-ltr">
              <div class="c14whb16 dir dir-ltr">
                <button v-for="category in categories" :key="category" :class="{ 'ccma3s' : category === selectedCategory }" @click="selectCategory(category)" class="c1l3w0tx dir dir-ltr">
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
      <div class="shop--part" style="margin: 25px 5px 5px;">
        <div v-if="heart.product.archived == false" v-for="(heart, index) in filteredFavoris" class="shop--item">
          <div>
            <div>
              <img v-if="heart.product.uploads.length" :src="cloudinary256x256 + heart.product.uploads[0].filename" style="width: 100%;">
              <img v-else :src="require(`@/assets/img/no-preview.jpg`)" style="width: 100%;">
              <svg @click="removeFavoris(heart.product, index)" width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 25px; height: 25px; fill: white; border-radius: 30px; position: absolute; top: 10px; right: 10px; z-index: 100000000;">
                <g transform="matrix( 1 0 0 1 1 3 )">
                  <path d="M16 0C13.8 0 12.2 1.2 11 2.5C9.8 1.3 8.2 0 6 0C2.5 0 0 2.9 0 6.5C0 8.3 0.7 9.9 2 11L11 19.5L20 11C21.2 9.8 22 8.3 22 6.5C22 2.9 19.5 0 16 0Z" fill="#FFFFFF"></path>
                </g>
              </svg>
            </div>
          </div>
          <div class="shop--item--details">
            <div class="shop--item--name">{{ heart.product.title }}</div>
            <div class="shop--item--price">
              <div class="price" :style="[heart.product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#000'}]"> {{ heart.product.price | formatPrice }}€ 
                <span v-if="heart.product.compareAtPrice" class="last-price">{{ heart.product.compareAtPrice | formatPrice }}€ </span>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>   
    <div v-else class="checkout__body items">
      <div class="container" style="margin: 100px auto 0px; text-align: center;">
        <video style="height: 220px; width: 220px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/like.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
      </div>
      <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 30px;">Aucun favoris</h5>
      <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos articles favoris apparaîtront ici.</div>
    </div>
  </main>
</template>

<style scoped src="../assets/css/favoris.css"></style>

<script>

import Product from '../components/Product';

export default {
  name: 'Favoris',
  components: {
    Product,
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      user: JSON.parse(window.localStorage.getItem("user")),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      categories: JSON.parse(window.localStorage.getItem("categories")),
      token: window.localStorage.getItem("token"),
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

    this.favoris = this.user.favoris;
    console.log(this.favoris);

    var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
    window.cordova.plugin.http.get(this.baseUrl + "/api/categories", {}, httpHeader, (response) => {
      this.categories = JSON.parse(response.data);
      this.selectedCategory = this.categories[0];
      window.localStorage.setItem("categories", response.data);
    }, (response) => {
      console.log(response.error);
    });
  },  
  computed: {
    filteredFavoris() {
      if (this.selectedCategory) {
        return this.favoris.filter(favoris => favoris.product.category.id === this.selectedCategory.id);
      } else {
        return this.favoris;
      }
    }
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
    selectCategory(category) {
      this.selectedCategory = category;
    },
    goBack() {
      this.$router.back();
    },
  }
};

</script>

