<template>
  <main class="products shop_3" style="padding: 0px;">
    <div class="checkout__header" style="padding: 5px 20px 15px;">
      <div class="checkout__close-btn" @click="goBack()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Favoris</div>
    </div>

    <div v-if="favoris.length" class="checkout__body items">
      <div class="shop--part" style="margin: 10px 15px 0px; gap: 20px 10px;">
        <div v-for="(heart, index) in favoris" class="shop--box">
          <div>
            <div @click="showProduct(heart.product)">
              <img v-if="heart.product.uploads.length" :src="$cloudinary256x256 + heart.product.uploads[0].filename" style="width: 100%; border-radius: 10px; background: #eeeeee; height: calc(50vw - 20px);">
              <img v-else src="/img/no-preview.png" style="width: 100%; border-radius: 10px; background: #eeeeee; height: calc(50vw - 20px);">
              <img src="/img/circle-heart-full.svg" style="width: 30px; height: 30px; position: absolute; top: 7px; right: 7px; z-index: 10000; filter: drop-shadow(rgb(34, 34, 34) 0px 0px 1px); pointer-events: auto;" @click.stop="removeFavoris(heart.product)"/>
            </div>
          </div>
          <div class="shop--item--details" style="width: 100%; padding: 0px; margin-top: 6px; padding-left: 5px;" @click="showProduct(heart.product)">
            <div class="shop--item--name" style="font-size: 13px; text-align: left;">{{ heart.product.title }}</div>
            <div class="shop--item--price">
              <div class="price" style="font-size: 12px; margin: 0px; font-weight: 500;" :style="[heart.product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]">
                {{ $formatPrice(heart.product.price) }}€
                <span v-if="heart.product.compareAtPrice" class="last-price" style="margin-left: 3px;">
                  {{ $formatPrice(heart.product.compareAtPrice) }}€
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>   
    <div v-else-if="loading">
      <div class="loader2">
        <span></span>
      </div>
    </div>
    <div v-else class="checkout__body items">
      <div class="container" style="margin: 120px auto 0px; text-align: center;">
        <div style="margin: 0px auto;">
          <Vue3Lottie :animationData="LottieJSON" :width="200"/>
        </div>
      </div>
      <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun favoris</h5>
      <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos articles favoris apparaîtront ici.</div>
    </div>


    <!-- product popup -->
    <div v-if="popupProduct" class="store-products-item__login-popup store-products-item__login-popup--active product-popup">
      <div style="width: 38px; height: 38px; position: absolute; top: 20px; left: 20px; z-index: 10000;" @click="hideProduct()">
        <img src="/img/close-popup.svg" style="width: 38px; height: 38px; filter: drop-shadow(0px 0px 1px #222);"/>
      </div>
      <Product :product="product" @selectVariant="selectVariantChild"></Product>
    </div>
    <div v-if="popupProduct" class="product-popup-btn">
      <div class="groups">
        <div v-if="product.quantity > 0" class="btn-swipe btn-checkout" @click="addToCart()">Ajouter</div>
        <div v-else class="btn-swipe btn-checkout" style="color: rgb(170, 170, 170); background: #eff1f6;">Épuisé</div>
      </div>
    </div>
  </main>
</template>


<script>
import { useMainStore } from '../stores/useMainStore';
import Product from '../components/Product.vue';
import LottieJSON from '../assets/lottie/favoris.json';

export default {
  name: 'Favoris',
  components: {
    Product,
  },
  data() {
    const mainStore = useMainStore();

    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: mainStore.getUser,
      lineItems: mainStore.getLineItems,
      categories: mainStore.getCategories,
      LottieJSON: LottieJSON,
      favoris: [],
      popupProduct: false,
      loading: true,
      product: null,
      variant: null,
    };
  },
  created() {    
    this.loadFavoris();
  },  
  methods: {
    async loadFavoris() {
      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: this.baseUrl + "/user/api/favoris",
          headers: {
            Authorization: "Bearer " + this.token,
          },
        });
        this.favoris = response.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async removeFavoris(product) {
      const mainStore = useMainStore();
      this.$Haptics.impact({ style: 'medium' });
      this.favoris = this.favoris.filter(favoris => favoris.product.id !== product.id);

      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: this.baseUrl + "/user/api/favoris/" + product.id,
          headers: {
            Authorization: "Bearer " + this.token,
          },
        });
        mainStore.setUser(response.data); 
      } catch (error) {
        console.log(error);
      }
    },
    showProduct(product) {
      this.$Haptics.impact({ style: 'medium' });
      this.product = product;
      this.popupProduct = true;
    },
    hideProduct() {
      this.popupProduct = false;
      this.product = null;
    },
    selectVariantChild(variant) {
      this.variant = variant;
    },
    addToCart() {
      const mainStore = useMainStore();
      this.$Haptics.impact({ style: 'medium' });
      this.popupProduct = false;

      const vendor = typeof this.product.vendor === "object" ? this.product.vendor.id : this.product.vendor;
      let exist = false;
      let newVendor = false;

      this.lineItems.forEach(lineItem => {
        if (lineItem.vendor !== vendor) {
          newVendor = true;
        }
      });

      if (!newVendor) {
        this.lineItems.forEach(lineItem => {
          if (lineItem.variant?.id === this.variant?.id || lineItem.product.id === this.product.id && !this.variant) {
            exist = true;
            lineItem.quantity += 1;
          }
        });
      } else {
        exist = true;
        this.confirmReplaceCart(vendor);
      }

      if (!exist) {
        this.lineItems.push({ product: this.product, variant: this.variant, quantity: 1, vendor });
        mainStore.setLineItems(this.lineItems);
      }
    },
    goBack() {
      this.$Haptics.impact({ style: 'medium' });
      this.$router.back();
    },
    async confirmReplaceCart(vendor) {
      const mainStore = useMainStore();

      try {
        const { value } = await this.$Dialog.confirm({
          title: 'Nouveau panier ?',
          message: 'Cet article va remplacer votre ancien panier.',
          okButtonTitle: 'Nouveau',
          cancelButtonTitle: 'Conserver',
        });

        if (value) {
          mainStore.setLineItems([
            {
              product: this.product,
              variant: this.variant,
              quantity: 1,
              vendor,
            },
          ]);
        }
      } catch (error) {
        console.error('Erreur lors de la confirmation de remplacement du panier :', error);
      }
    },
  }
};
</script>



<style>
.shop--box, .shop--box>div:first-of-type {
  position: relative;
}

.product-popup {
  overflow-y: scroll; 
  height: 100%; 
  padding-bottom: 120px;
  border-radius: 0px !important;
}

.product-popup-btn {
  background-color: white;
  bottom: 0px; 
  position: fixed; 
  z-index: 1000000001;
}

.product-popup-btn {
  background-color: white;
  bottom: 0px; 
  position: fixed; 
  z-index: 1000000001;
}

.product-popup-btn .groups {
  padding: 15px 20px 42px;
  background-color: white;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-popup-btn .btn-addtoCart {
  color: rgb(24, 206, 160);
  text-align: center;
  width: calc(50vw - 25px);
  background: white;
  padding: 13px 20px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 15px;
  margin: 0px 20px 0px 0px;
  height: 50px;
  border: 2px solid rgb(24, 206, 160);
}

.product-popup-btn .btn-checkout {
  text-align: center;
  width: calc(100vw - 25px);
  padding: 14px 20px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 15px;
  margin: 0px;
  background: rgb(24, 206, 160);
  color: rgb(255, 255, 255);
  height: 50px;
}

.scroll-indicator {
  height: 5px;
  width: 60px;
  background: rgba(0,0,0,0.2);
  border-radius: 4.5px;
  margin: 15px auto;
}

.hide-svg {
  width: 30px; 
  height: 30px; 
  fill: rgb(153, 153, 153); 
  padding: 5px; 
  background: white; 
  border-radius: 30px; 
  opacity: 0.5; 
  position: absolute; 
  top: 15px; 
  left: 15px; 
  z-index: 100000000;
}

.heart-svg {
  width: 30px;
  height: 30px;
  fill: white;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100000000;
}

</style>

