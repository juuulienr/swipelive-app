<template>
  <div v-if="product" class="product">
    <header v-if="id">
      <a @click="$router.go(-1)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: rgb(153, 153, 153);"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
      </a>
    </header>

    <div v-if="product.uploads" style="width: 100vw;">
      <VueSlickCarousel v-bind="settings">
        <div class="vue-slick" v-for="upload in product.uploads" v-bind:key="upload.id">
          <img :src="baseUrl + '/uploads/' + upload.filename">
        </div>
      </VueSlickCarousel>
    </div>

    <div class="product--info">
      <div class="row">
        <div class="col-9">
          <div class="title">{{ product.title }}</div>
        </div>
        <div class="col-3" style="text-align: center; padding-left: 0px;">
          <div class="new-price" style="color: #333;" v-if="variant && variant.price">{{ variant.price | formatPrice }}€</div>
          <div class="new-price" style="color: #333;" v-else>{{ product.price | formatPrice }}€</div>
          <div class="last-price" style="font-size: 13px; font-weight: 500;" v-if="variant && variant.compareAtPrice">{{ variant.compareAtPrice | formatPrice }}€</div>
          <div class="last-price" style="font-size: 13px; font-weight: 500;" v-if="!variant && product.compareAtPrice">{{ product.compareAtPrice | formatPrice }}€</div>
        </div>
      </div>
      <div v-if="product.options.length" style="margin-top: 25px;">
        <div class="technology" style="font-weight: 600;">{{ product.options[0].name }}</div>
        <div class="variants">
          <div v-if="option1.available == true" @click="updateVariant(option1.name, option1.available)"  v-for="option1 in available" class="option" :class="{'active' : selected == option1.name }">
            {{ option1.name }}
          </div>
        </div>
        <div v-if="product.options.length > 1" class="technology" style="margin-top: 15px; font-weight: 600;">{{ product.options[1].name }}</div>
        <div class="variants">
          <div v-if="option2.available == true" @click="updateVariant2(option2.name, option2.available)"  v-for="option2 in available2" class="option" :class="{'active' : selected2 == option2.name }">
            {{ option2.name }}
          </div>
        </div>
      </div>

      <div style="margin: 25px 0px 15px;">
        <div class="technology" style="font-weight: 600;">Description</div>
        <p style="margin-top: 10px; font-size: 15px; color: #999;">{{ product.description }}</p>
      </div>
<!-- 
      <div v-if="unavailable == true" class="btn-swipe" style="background: #dcdde1; color: #333 !important; margin-bottom: 50px; margin-top: 25px;" :style="{'bottom': safeareaBottom }">Épuisé</div>
      <div v-else @click="addToCart()" class="btn-swipe" style=" margin-bottom: 50px; margin-top: 25px;" :style="{'bottom': safeareaBottom }">Ajouter au panier</div> -->
<!--     </div>
    <div style="background-color: white; bottom: 0px; position: absolute; z-index: 2147483647; width: calc(-30px + 100vw); margin: 15px;"><div class="btn-swipe" style="padding: 8px 65px; display: flex; align-items: center; justify-content: space-between;"><span><div class="btn-swipe" style="color: white; text-align: center; font-size: 15px; width: 100%; background-color: rgb(24, 206, 160); padding: 0px; border-radius: 7px; font-weight: 600;"> 500,00€ </div></span><hr style="border-style: solid; border-color: white;">Acheter</div></div> -->
  </div>
</template>


<style scoped>
.description {
  margin: 20px;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  margin-bottom: 5px;
}

.title {
  font-weight: 500;
  font-size: 16px;
  color: #333;
}

.description .price {
  font-weight: 600;
  font-size: 15.5px;
  text-align: right;
  color: #333;
}

header {
  display: grid;
  margin: 0px 20px;
  grid-auto-flow: column;
  justify-content: space-between;
  height: 50px;
  align-items: center;
}

header img {
  width: 24px;
  height: 24px;
}

.info {
  color: #6C7B8A;
  font-size: 11.5px;
  padding: 20px;
  padding-top: 0px;
  line-height: 21px;
}

.btn-swipe {
  background: rgb(24, 206, 160);
  color: white !important;
  font-weight: 600;
  margin: 0 auto;
  padding: 12px 36px;
  font-size: 15px;
  text-align: center;
}

.btn-swipe img {
  width: 20px;
  height: 20px;
}

.technology {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
}

.btn-tech {
  margin-left: 21.5px;
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  grid-gap: 8px;
}

.variants .option {
  position: relative;
  font-size: 14px;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(38,38,38,.2);
  border-radius: 5px;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
  font-weight: 500;
}

.variants .option.active {
  border: 2px solid #262626;
  font-weight: 600;
}

.variants .option.unavailable {
  text-decoration-line: line-through;
}

.variants .option:not(:last-child) {
  margin-right: .625rem;
}

.color {
  margin-left: 20px;
  color: #6C7B8A;
  font-weight: 500;
  font-size: 9px;
}

.color .c {
  padding-top: 8px;

}

.color .c div {
  margin-right: 8px;
}

.product {
  background-color: rgb(255, 255, 255);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-image: none;
  overflow: hidden;
  position: relative;
  border-radius: 16px;
  z-index: 0;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
}
.product--images, .product--info, .details--order > div, .review > div:first-of-type > div {
  flex-basis: 100%;
  max-width: 100%;
}
.product--images--container {
  width: 100%;
}
.carrousel {
  margin: 10px;
  z-index: 0;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}
.carrousel--img--princ {
  width: 100%;
  padding-bottom: 100%;
  background-size: cover;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
}
.carrousel--img--princ > img {
  position: absolute;
  width: 100%;
  height: 100%;
  display: inline-block;
  opacity: 1;
  transition: opacity .3s;
  object-fit: cover;
  cursor: zoom-in;
}
.product--images--container {
  margin: 24px auto;
  max-width: 384px;
  position: relative;
  display: flex;
  gap: 12px;
  overflow: hidden;
}
.product--images--container:before {
  top: 0px;
  z-index: 9;
  content: "";
  height: 100%;
  position: absolute;
  width: 42.6667px;
  background-image: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
}
.product--images--container:after {
  top: 0px;
  z-index: 9;
  content: "";
  height: 100%;
  position: absolute;
  width: 42.6667px;
  right: 0px;
  transform: scaleX(-1);
  background-image: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
}
.product--images--item {
  cursor: pointer;
}
.product--images--item--active {
  border: 3px solid rgb(0, 171, 85);
  min-width: 64px;
  height: 64px;
  display: block;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}
.product--images--item--active > img {
  position: absolute;
  top: -3px;
  left: -3px;
}
.product--images--container > div > img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 12px;
}
.product--info {
  padding: 15px;
}
.low--stock {
  height: 22px;
  min-width: 22px;
  line-height: 0;
  border-radius: 6px;
  cursor: default;
  align-items: center;
  white-space: nowrap;
  display: inline-flex;
  justify-content: center;
  padding: 0px 8px;
  color: rgb(183, 33, 54);
  font-size: 15px;
  background-color: rgba(255, 72, 66, 0.16);
  font-weight: 600;
  text-transform: uppercase;
}
.product--info > .sale {
  margin: 16px 0px 8px;
  font-weight: 700;
  line-height: 1.5;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: rgb(255, 72, 66);
  display: block;
}
.product--info > .title {
  font-size: 1rem;
  margin: 0 0 5px;
  font-weight: 600;
  line-height: 1.5;
}
.product--rating {
  position: relative;
  display: flex;
  width: 120px;
  height: 24px;
}
.product--rating > div > svg {
  min-width: 24px;
  min-height: 24px;
}
.item--rate--number {
  margin: 4px 0px 0px;
  line-height: 1.5;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgb(99, 115, 129);
}
.product--rating > div {
  position: absolute !important;
  top: 0px;
  left: 0px;
  display: inline-flex;
  position: relative;
  font-size: 1.125rem;
  color: rgb(250, 175, 0);
  cursor: pointer;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
  pointer-events: none;
  z-index: 3;
}
.rate--bg {
  z-index: 2 !important;
}
.rate--fg {
  overflow: hidden;
}
.product--rate--detail {
  margin: 0px 0px 0px 8px;
  line-height: 1.57143;
  font-size: 0.875rem;
  font-weight: 400;
  color: rgb(99, 115, 129);
}
.product--rate {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
}
.last-price {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.5;
  color: rgb(145, 158, 171);
  text-decoration: line-through;
  display: inline-block;
}
.new-price {
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.5;
}
hr {
  flex-shrink: 0;
  border-width: 0px 0px thin;
  border-color: rgba(145, 158, 171, 0.24);
  border-style: dashed;
}
.product--color {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 24px;
}
.product--color > div > label {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}
.product--color > div > label > svg {
  display: none;
}
.product--color > div > label:hover {
  background-color: rgba(99, 115, 129, 0.08);
}
.product--color > div {
  display: flex;
}
.product--color > div > label > span {
  width: 20px;
  height: 20px;
  display: block;
  border-radius: 50%;
}
.product--color > div > .is--selected > span {
  width: 28px;
  height: 28px;
}
.product--color > div > .is--selected > svg {
  display: block;
  position: absolute;
  color: white;
  font-size: 18px;
}
.product--color > span, .product--size > span, .product--quantity > span {
  margin: 4px 0px 0px;
  font-weight: 600;
  line-height: 1.5;
  font-size: 1rem;
}
.product--size, .product--quantity {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

}
.product--size--detail {
  display: flex;
  flex-direction: column;
}
.product--size--detail > div {
  line-height: 1.4375em;
  font-size: 1rem;
  font-weight: 400;
  color: rgb(33, 43, 54);
  box-sizing: border-box;
  cursor: text;
  display: inline-flex;
  align-items: center;
  position: relative;
  border-radius: 8px;
  border: solid 1px rgba(145, 158, 171, 0.32);
}
.product--size--detail > div:hover {
  border-color: rgb(33, 43, 54);
}
.product--size--detail > div > svg {
  user-select: none;
  width: 1em;
  height: 1em;
  display: inline-block;
  fill: currentcolor;
  flex-shrink: 0;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 16px;
  position: absolute;
  right: 7px;
  top: calc(50% - 0.5em);
  pointer-events: none;
  color: rgb(99, 115, 129);
}
.product--size--detail > div > select {
  appearance: none;
  user-select: none;
  border-radius: 8px;
  cursor: pointer;
  font: inherit;
  letter-spacing: inherit;
  color: currentcolor;
  border: 0px;
  box-sizing: content-box;
  background: none;
  height: 1.4375em;
  margin: 0px;
  -webkit-tap-highlight-color: transparent;
  display: block;
  min-width: 0px;
  width: 100%;
  animation-name: mui-auto-fill-cancel;
  animation-duration: 10ms;
  padding: 8.5px 14px;
  padding-right: 32px;
}
.product--size--detail > span {
  color: rgb(99, 115, 129);
  line-height: 1.5;
  font-size: 0.75rem;
  font-weight: 400;
  text-align: right;
  margin: 8px 0px 0px;
  text-decoration: underline rgba(99, 115, 129, 0.4);
}
.product--size--detail > span:hover {
  text-decoration: underline rgba(99, 115, 129, 1);
}
.product--quantity--detail {
  display: flex;
  flex-direction: column;
  align-items: end;
}
.product--quantity--detail > span {
  margin: 8px 0px 0px;
  line-height: 1.5;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgb(99, 115, 129);
}
.product--quantity--input {
  padding: 4px 6px;
  border: 1px solid rgba(145, 158, 171, 0.32);
  line-height: 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
}
.product--quantity--input > button {
  background-color: transparent;
  color: rgba(145, 158, 171, 0.8);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  text-align: center;
  flex: 0 0 auto;
  border-radius: 50%;
  overflow: visible;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  padding: 5px;
  font-size: 1.125rem;
}
.product--quantity--input > button > svg {
  width: 14px;
  height: 14px;
}
.product--quantity--input > span {
  margin: 0px;
  line-height: 1.57143;
  font-size: 0.875rem;
  font-weight: 400;
  width: 40px;
  text-align: center;
}
.vue-slick img {
  width: 100vw;
  height: 100vw;
  object-fit: cover;
}
</style>

<style>

.slick-dots {
  bottom: 10px !important;
}

.slick-dots li, .slick-dots li button {
  width: 10px !important;
}

.slick-dots li button:before {
  opacity: 1 !important; 
  color: #999 !important;
}

.slick-dots li.slick-active button:before {
  color: #fe2c55 !important;
}

</style>

<script>

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'


export default {
  name: 'Product',
  props: ['product'],
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      id: this.$route.params.id,
      variant: null,
      available: [],
      available2: [],
      unavailable: false,
      selected: "",
      selected2: "",
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      safeareaBottom: '30px',
      description: false,
      settings: {
        dots: true,
      }
    }
  },
  filters: {
    formatPrice(value) {
    	return value.replace('.', ',');
    }
  },
  created() {
    if (window.cordova && window.cordova.platformId === "android") {
      this.safeareaBottom = "50px";
    }

    if (window.cordova && window.cordova.platformId === "ios") {
      this.safeareaBottom = 'calc(env(safe-area-inset-bottom) + 30px)';
    }

    if (this.id) {
      window.StatusBar.overlaysWebView(false);
      window.StatusBar.styleDefault();
      
      window.cordova.plugin.http.get(this.baseUrl + "/api/products/" + this.id, {}, { 'Content-Type':  'application/json; charset=UTF-8' }, (response) => {
        this.product = JSON.parse(response.data);
        this.loadOptions();
      }, (response) => {
        console.log(response.error);
      });
    } else {
      this.loadOptions();
    }
  },
  methods: {
    addToCart() {
      if (this.user && this.token) {
        console.log(this.product, this.variant);
        if (this.product) {
          this.$router.push({ name: 'Cart', params: { product: this.product, variant: this.variant ? this.variant : null } });
        }
      } else {
        this.$router.push({ name: 'Welcome' });
      }
    },
    updateVariant(option1, available) {
      if (available) {
        if (this.product.options.length == 1) {
          this.product.variants.map((variant) => {
            if (variant.option1 == option1) {
              this.variant = variant;
              this.selected = option1;
            }
          });
        } else {
          this.available2 = [];
          this.selected2 = "";
          this.product.options[1].data.map((option2, index) => {
            var stock = this.product.variants.some((variant) => {
              if (variant.option1 == option1) {
                this.selected = option1;
                if (variant.option2 == option2) {
                  if (variant.quantity != 0) {
                    if (!this.selected2) {
                      this.selected2 = option2;
                      this.variant = variant;
                    }
                    return true;
                  }
                  return false;
                }
              }
            });

            this.available2.push({ "name" : option2, "available": stock });
          });
        }
        this.$emit('clicked', this.variant);
      }
    },
    updateVariant2(option2, available) {
      if (available) {
        this.product.variants.map((variant) => {
          if (variant.option2 == option2) {
            this.variant = variant;
            this.selected2 = option2;
          }
        });
        this.$emit('clicked', this.variant);
      }
    },
    loadOptions() {
      if (this.product.variants && this.product.variants.length && this.product.options.length) {
        if (this.product.options.length == 1) {
          this.product.options[0].data.map((name) => {
            var stock = this.product.variants.some((variant) => {
              if (variant.option1 == name) {
                if (variant.quantity != 0) {
                  if (!this.selected) {
                    this.selected = name;
                    this.variant = variant;
                    this.$emit('clicked', this.variant);
                  }
                  return true;
                }
              }
              return false;
            });

            this.available.push({ "name" : name, "available": stock });
          });
        } else {
          this.product.options[0].data.map((name, index) => {
            var stock = false;
            this.product.options[1].data.map((name2) => {
              var stock2 = this.product.variants.some((variant) => {
                if (variant.option1 == name && variant.option2 == name2) {
                  if (variant.quantity != 0) {
                    stock = true;
                    if (!this.selected) {
                      this.selected = name;
                      this.selected2 = name2;
                      this.variant = variant;
                      this.$emit('clicked', this.variant);
                    }
                    return true;
                  }
                }
                return false;
              });

              if (index == 0) {
                this.available2.push({ "name" : name2, "available": stock2 });
              }
            });

            this.available.push({ "name" : name, "available": stock });
          });
        }

        if (!this.variant) {
          this.unavailable = true;          
        }
      }
    },
    showDescription() {
      if (this.description) {
        this.description = false;
      } else {
        this.description = true;
      }
    },
  }
};

</script>

