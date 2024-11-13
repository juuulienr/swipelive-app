<template>
  <div class="cart">
    <div class="checkout__header" style="padding-right: 20px; padding-left: 20px;">
      <div class="checkout__title">Panier</div>
    </div>
    <div v-if="lineItems && lineItems.length" class="checkout">
      <div class="checkout__body" :style="[fullscreen ? {'height': '68vh'} : {'height': '38vh'}]" style="overflow-y: scroll;  padding: 0 10px 15px;">
        <div v-for="(lineItem, index) in lineItems" :key="index" class="checkout__row checkout__product-info-row" style="align-items: center; padding: 7px 0px;">
          <div class="checkout__product-info">
            <img v-if="lineItem.product.uploads" :src="$cloudinary256x256 + lineItem.product.uploads[0].filename" class="checkout__image" style="border-radius: 10px;">
            <img v-else src="/img/no-preview.png" class="checkout__image" style="border-radius: 10px;">
            <div>
              <h5 class="checkout__name" style="margin-bottom: 0px;"> {{ lineItem.product.title }} </h5>
              <div v-if="lineItem.variant" class="checkout__attr">
                <span style="font-size: 12px;color: rgb(153, 153, 153);font-weight: 400; text-transform: capitalize;">{{ lineItem.variant.title }}</span>
              </div>
              <div>
                <span v-if="lineItem.variant" style="font-size: 14px;">{{ $formatPrice(lineItem.variant.price * lineItem.quantity) }}€</span>
                <span v-else style="font-size: 14px;">{{ $formatPrice(lineItem.product.price * lineItem.quantity) }}€</span>
                <span v-if="lineItem.variant && lineItem.variant.compareAtPrice" class="last-price">{{ $formatPrice(lineItem.variant.compareAtPrice * lineItem.quantity) }}€ </span>
                <span v-else-if="lineItem.product.compareAtPrice" class="last-price">{{ $formatPrice(lineItem.product.compareAtPrice * lineItem.quantity) }}€ </span>
              </div>
            </div>
          </div>
          <div class="product--quantity--detail">
            <div class="product--quantity--input">
              <button @click="decreaseQuantity(lineItem, index)">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="css-540lu8 iconify iconify--eva" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z"></path></svg>
              </button>
              <span>{{ lineItem.quantity }}</span>
              <button @click="increaseQuantity(lineItem, index)">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="css-540lu8 iconify iconify--eva" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"></path></svg>
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
          <div @click="showCheckout()" style="text-align: center;">
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

<style scoped src="../assets/css/cart.css"></style>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMainStore } from '@/stores/useMainStore';
import Lottie from 'vue3-lottie';
import LottieJSON from '../assets/lottie/order.json';

// Variables et store
const fullscreen = ref(useRoute().params.fullscreen);
const loading = ref(false);
const subTotal = ref(0);
const LottieData = LottieJSON;

// Store Pinia
const mainStore = useMainStore();
const lineItems = computed(() => mainStore.getLineItems);
const user = computed(() => mainStore.getUser);

// Méthodes pour manipuler les quantités
function increaseQuantity(lineItem, index) {
  if (lineItem.variant) {
    if (lineItem.variant.quantity > lineItem.quantity) {
      lineItem.quantity += 1;
      updateCart();
    }
  } else {
    if (lineItem.product.quantity > lineItem.quantity) {
      lineItem.quantity += 1;
      updateCart();
    }
  }
}

function decreaseQuantity(lineItem, index) {
  if (lineItem.quantity > 1) {
    lineItem.quantity -= 1;
    updateCart();
  } else {
    lineItems.value.splice(index, 1);
    updateCart();
  }
}

// Calcul et mise à jour du sous-total
function updateCart() {
  subTotal.value = 0;

  if (lineItems.value.length) {
    lineItems.value.forEach(lineItem => {
      if (lineItem.variant) {
        subTotal.value += lineItem.variant.price * lineItem.quantity;
      } else {
        subTotal.value += lineItem.product.price * lineItem.quantity;
      }
    });

    subTotal.value = parseFloat(subTotal.value.toFixed(2));
  }
}

// Affichage du checkout
function showCheckout() {
  if (window.TapticEngine) {
    TapticEngine.impact({ style: 'medium' });
  }
  getShippingPrice();
}

function getShippingPrice() {
  if (user.value.shippingAddresses.length) {
    loading.value = true;
    mainStore.setShippingProducts([]);
    window.cordova.plugin.http.post(`${mainStore.baseUrl}/user/api/shipping/price`, { lineItems: lineItems.value }, { Authorization: `Bearer ${mainStore.token}` }, (response) => {
      mainStore.setShippingProducts(JSON.parse(response.data));
      goCheckout();
    }, () => {
      goCheckout();
    });
  } else {
    goCheckout();
  }
}

function goCheckout() {
  const router = useRouter();
  if (fullscreen.value) {
    router.push({ name: 'Checkout', params: { fullscreen: true } });
  } else {
    emit('showCheckout', lineItems.value);
  }
}

onMounted(() => {
  updateCart();
});
</script>
