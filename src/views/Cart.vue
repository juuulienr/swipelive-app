<template>
  <main class="cart">
    <div class="checkout" style="margin-top: 50px;">
      <div class="checkout__body">
        <div v-if="product" class="checkout__row checkout__product-info-row" style="align-items: center;">
          <div class="checkout__product-info">
            <img v-if="product.uploads" :src="baseUrl + '/uploads/' + product.uploads[0].filename" class="checkout__image" style="border-radius: 8px;">
            <div>
              <h5 class="checkout__name" style="margin-bottom: 5px; font-weight: 600;"> {{ product.title }} </h5>
              <div class="checkout__attr" v-if="variant"><span> {{ variant.title }} </span></div>
            </div>
          </div>
          <div class="product--quantity--detail">
            <div class="product--quantity--input">
              <button @click="decreaseQuantity()">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="MuiBox-root css-540lu8 iconify iconify--eva" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z"></path></svg>
              </button>
              <span>{{ quantity }}</span>
              <button @click="increaseQuantity()">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="MuiBox-root css-540lu8 iconify iconify--eva" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <div v-if="subTotal && total" class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-13dslnb">
          <div class="MuiCardContent-root css-18mhetb">
            <div class="css-ikzlcq">
              <div class="css-9jay18">
                <p class="MuiTypography-root MuiTypography-body2 css-11r9ii4">Sous Total</p>
                <h6 class="MuiTypography-root MuiTypography-subtitle2 css-yemnbq">{{ subTotal | formatPrice }}€</h6>
              </div>
              <div v-if="promotion" class="css-9jay18">
                <p class="MuiTypography-root MuiTypography-body2 css-11r9ii4" style="color: #18cea0; font-weight: 600;">PROMO10</p>
                <h6 class="MuiTypography-root MuiTypography-subtitle2 css-yemnbq" style="color: #18cea0; font-weight: 600;">-10,00€</h6>
              </div>
              <hr class="MuiDivider-root MuiDivider-fullWidth css-ss6lby">
              <div class="css-9jay18">
                <h6 class="MuiTypography-root MuiTypography-subtitle1 css-k9tjo5" style="font-weight: 600;">Total</h6>
                <div class="MuiBox-root css-s2uf1z">
                  <h6 class="MuiTypography-root MuiTypography-subtitle1 css-kdhaao" style="font-weight: 600;">{{ total | formatPrice }}€</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style="margin: 30px auto">
          <div @click="goCheckout()" style="text-align: center;">
            <div class="btn-swipe">Acheter</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="../assets/css/cart.css"></style>

<script>

export default {
  name: 'Cart',
  props: ['product', 'variant'],
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      quantity: 1,
      subTotal: null,
      total: null,
      promotion: false
    }
  },
  filters: {
    formatPrice(value) {
    	return value.replace('.', ',');
    }
  },
  created() {
    console.log(this.product);
    this.updateCart();
  },
  methods: { 
    increaseQuantity() {
      if (this.variant.length) {
        if (this.variant.quantity > this.quantity) {
          this.quantity += 1;
          this.updateCart();
        }
      } else {
        if (this.product.quantity > this.quantity) {
          this.quantity += 1;
          this.updateCart();
        }
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity -= 1;

        this.updateCart();
      }
    },
    updateCart() {
      if (this.variant.length) {
        this.subTotal = this.variant.price * this.quantity;
      } else {
        this.subTotal = this.product.price * this.quantity;
      }

      this.subTotal = this.subTotal.toFixed(2);
      this.total = this.subTotal;
    },
    goCheckout() {
      this.$router.push({ name: 'Checkout', params: { quantity: this.quantity, product: this.product, variant: this.variant.length ? this.variant : null } });
    },
  }
};

</script>

