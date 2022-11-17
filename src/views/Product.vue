<template>
  <div v-if="product" class="product">
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
  	</div>
  </div>
</template>


<style scoped src="../assets/css/product.css"></style>

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

