<template>
  <div class="cart">
    <div class="checkout__header" style="padding-right: 20px; padding-left: 20px;">
      <div class="checkout__title">Panier</div>
    </div>
    <div v-if="lineItems && lineItems.length" class="checkout">
      <div class="checkout__body" :style="[fullscreen ? {'height': '68vh'} : {'height': '38vh'}]" style="overflow-y: scroll; padding: 0 10px 15px;">
        <div v-for="(lineItem, index) in lineItems" :key="index" class="checkout__row checkout__product-info-row" style="align-items: center; padding: 7px 0px;">
          <div class="checkout__product-info">
            <img v-if="lineItem.product.uploads" :src="$cloudinary256x256 + lineItem.product.uploads[0].filename" class="checkout__image" style="border-radius: 10px;">
            <img v-else src="/img/no-preview.png" class="checkout__image" style="border-radius: 10px;">
            <div>
              <h5 class="checkout__name" style="margin-bottom: 0px;">{{ lineItem.product.title }}</h5>
              <div v-if="lineItem.variant" class="checkout__attr">
                <span style="font-size: 12px; color: rgb(153, 153, 153); font-weight: 400; text-transform: capitalize;">{{ lineItem.variant.title }}</span>
              </div>
              <div>
                <span v-if="lineItem.variant" style="font-size: 14px;">{{ $formatPrice(lineItem.variant.price * lineItem.quantity) }}€</span>
                <span v-else style="font-size: 14px;">{{ $formatPrice(lineItem.product.price * lineItem.quantity) }}€</span>
                <span v-if="lineItem.variant && lineItem.variant.compareAtPrice" class="last-price">{{ $formatPrice(lineItem.variant.compareAtPrice * lineItem.quantity) }}€</span>
                <span v-else-if="lineItem.product.compareAtPrice" class="last-price">{{ $formatPrice(lineItem.product.compareAtPrice * lineItem.quantity) }}€</span>
              </div>
            </div>
          </div>
          <div class="product--quantity--detail">
            <div class="product--quantity--input">
              <button @click="decreaseQuantity(lineItem, index)">
                <svg xmlns="http://www.w3.org/2000/svg" class="css-540lu8 iconify iconify--eva" width="1em" height="1em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z"></path>
                </svg>
              </button>
              <span>{{ lineItem.quantity }}</span>
              <button @click="increaseQuantity(lineItem, index)">
                <svg xmlns="http://www.w3.org/2000/svg" class="css-540lu8 iconify iconify--eva" width="1em" height="1em" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="subTotal" class="css-13dslnb" :style="[fullscreen ? {'bottom': 'calc(env(safe-area-inset-bottom) + 65px)'} : {'bottom': 'calc(env(safe-area-inset-bottom) + 10px)'}]">
        <div class="css-18mhetb">
          <div class="css-9jay18">
            <h6 class="css-k9tjo5">Sous-total</h6>
            <div class="css-s2uf1z">
              <h6 class="css-kdhaao">{{ $formatPrice(subTotal) }}€</h6>
            </div>
          </div>
        </div>
        <div style="margin: 15px auto;">
          <div style="text-align: center;" @click="getShippingPrice()">
            <div class="btn-swipe">
              <span v-if="loading">
                <svg viewBox="25 25 50 50" class="loading">
                  <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
                </svg>
              </span>
              <span v-else>Paiement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="checkout">
      <div class="checkout__body" style="text-align: center;">
        <div class="container" :style="[fullscreen ? {'margin': '150px auto 0px'} : {'margin': '75px auto 0px'}]" style="text-align: center;">
          <div style="margin: 0px auto;">
            <Vue3Lottie :animationData="LottieJSON" :width="200"/>
          </div>
        </div>
        <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 30px;">Votre panier est vide</h5>
        <div style="font-weight: 400;font-size: 15px;text-align: center;">Ajouter des articles à votre panier.</div>
      </div>
    </div>
  </div>
</template>

<script>
import Lottie from 'vue3-lottie';
import LottieJSON from '../assets/lottie/order.json';
import { useMainStore } from '@/stores/useMainStore.js';
import { toRaw } from 'vue';

export default {
  name: 'Cart',
  components: {
    Lottie,
  },
  data() {
    const mainStore = useMainStore();
    return {
      fullscreen: this.$route.params.fullscreen,
      lineItems: [...mainStore.lineItems],
      user: mainStore.user,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      LottieJSON: LottieJSON,
      loading: false,
    };
  },
  computed: {
    subTotal() {
      return this.lineItems.reduce((total, lineItem) => {
        const price = lineItem.variant ? lineItem.variant.price : lineItem.product.price;
        return total + price * lineItem.quantity;
      }, 0).toFixed(2);
    },
  },
  methods: {
    increaseQuantity(lineItem, index) {
      if (lineItem.variant && lineItem.variant.quantity > lineItem.quantity) {
        this.lineItems[index].quantity += 1;
        this.syncWithStore();
      } else if (lineItem.product.quantity > lineItem.quantity) {
        this.lineItems[index].quantity += 1;
        this.syncWithStore();
      }
    },
    decreaseQuantity(lineItem, index) {
      if (lineItem.quantity > 1) {
        this.lineItems[index].quantity -= 1;
      } else {
        this.lineItems.splice(index, 1);
      }
      this.syncWithStore();
    },
    async getShippingPrice() {
      this.loading = true;
      const mainStore = useMainStore();

      try {
        const serializableLineItems = this.lineItems.map(item => {
          const rawItem = toRaw(item);
          return {
            vendor: rawItem.vendor,
            product: rawItem.product ? { id: rawItem.product.id, weight: rawItem.product.weight, weightUnit: rawItem.product.weightUnit } : null,
            variant: rawItem.variant ? { id: rawItem.variant.id, weight: rawItem.variant.weight, weightUnit: rawItem.variant.weightUnit } : null,
            quantity: rawItem.quantity,
          };
        });

        const response = await this.$CapacitorHttp.request({
          method: 'POST',
          url: `${this.baseUrl}/user/api/shipping/price`,
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          data: { lineItems: serializableLineItems },
        });

        mainStore.setShippingProducts(response.data);
        this.goCheckout();
      } catch (error) {
        console.error('Erreur lors de la récupération des frais de livraison :', error);
      } finally {
        this.loading = false;
      }
    },
    goCheckout() {
      this.$router.push({ name: 'Checkout', params: { fullscreen: true } });
    },
    syncWithStore() {
      const mainStore = useMainStore();
      mainStore.setLineItems(this.lineItems);
    },
  },
};
</script>

<style scoped src="../assets/css/cart.css"></style>
