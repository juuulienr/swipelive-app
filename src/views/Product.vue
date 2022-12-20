<template>
  <div v-if="product" class="product">
    <div v-if="product.uploads" style="width: 100%;">
      <VueSlickCarousel v-bind="settings">
        <div class="vue-slick" v-for="upload in product.uploads" v-bind:key="upload.id">
          <img :src="cloudinary750x750 + upload.filename">
        </div>
      </VueSlickCarousel>
    </div>
    <div v-else style="width: 100vw;">
      <div class="vue-slick">
        <img :src="require(`@/assets/img/no-preview.jpg`)">
      </div>
    </div>

    <div class="product--info">
      <div class="row">
        <div class="col-9">
          <div class="title">{{ product.title }}</div>
          <div v-if="variant && variant.price" class="new-price" style="color: #333;">{{ variant.price | formatPrice }}€</div>
          <div v-else class="new-price" style="color: #333;">{{ product.price | formatPrice }}€</div>
          <div v-if="variant && variant.compareAtPrice" class="last-price" style="font-size: 13px; font-weight: 500;">{{ variant.compareAtPrice | formatPrice }}€</div>
          <div v-if="!variant && product.compareAtPrice" class="last-price" style="font-size: 13px; font-weight: 500;">{{ product.compareAtPrice | formatPrice }}€</div>
        </div>
        <div class="col-3" style="text-align: center; padding-left: 0px; margin-top: 12px;">
          <span class="css-4ioo3c" style="color: rgb(255, 255, 255);background-color: #ff2773; padding: 15px;">-15%</span> 
        </div>
      </div>
      <div v-if="product.options.length">
        <hr style="margin: 20px 0px;">
        <div class="technology" style="font-weight: 400;">{{ product.options[0].name }}</div>
        <div class="variants">
          <div v-if="option1.available == true" @click="updateVariant(option1.name, option1.available)"  v-for="option1 in available" class="option" :class="{'active' : selected == option1.name }">
            {{ option1.name }}
          </div>
        </div>
        <div v-if="product.options.length > 1" class="technology" style="margin-top: 15px; font-weight: 400;">{{ product.options[1].name }}</div>
        <div class="variants">
          <div v-if="option2.available == true" @click="updateVariant2(option2.name, option2.available)"  v-for="option2 in available2" class="option" :class="{'active' : selected2 == option2.name }">
            {{ option2.name }}
          </div>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <hr style="margin: 20px 0px;">
        <p style="margin-top: 10px; font-size: 15px; color: rgb(82, 92, 102); font-weight: 400;">{{ product.description }}</p>
      </div>
  	</div>
  </div>
</template>


<style scoped src="../assets/css/product.css"></style>

<style>

.slick-dots {
  bottom: 25px !important;
}

.slick-dots li, .slick-dots li button {
  width: 7px!important;
  z-index: 1000000000 !important;
}

.slick-dots li button:before {
  opacity: 0.4 !important; 
  color: #fff !important;
  z-index: 1000000000 !important;
}

.slick-dots li button {
  color: white !important;
  border: none !important;
}

.slick-dots li.slick-active button:before {
  opacity: 1 !important; 
}

.slick-dots li button:before {
  font-size: 10px !important;
}

.css-4ioo3c {
  line-height: 0;
  border-radius: 6px;
  cursor: default;
  align-items: center;
  white-space: nowrap;
  display: inline-flex;
  justify-content: center;
  padding: 20px 20px;
  color: hsl(161deg 65% 64%);
  font-size: 14px;
  background-color: hsl(160deg 60% 96%);
  font-weight: 700;
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
      cloudinary750x750: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_750,w_750/',
      safeareaBottom: '30px',
      settings: {
        dots: true,
      }
    }
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {
    if (window.cordova && window.cordova.platformId === "android") {
      this.safeareaBottom = "50px";
    }

    if (window.cordova && window.cordova.platformId === "ios") {
      this.safeareaBottom = 'calc(env(safe-area-inset-bottom) + 30px)';
    }

    this.loadOptions();
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
  }
};

</script>

