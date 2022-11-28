<template>
  <main class="cart">
    <div class="checkout" style="margin-top: 50px;">
      <div v-if="lineItems && lineItems.length" class="checkout__body">
        <div v-for="(lineItem, index) in lineItems" class="checkout__row checkout__product-info-row" style="align-items: center; padding: 7px 0px;">
          <div class="checkout__product-info">
            <img v-if="lineItem.product.uploads" :src="cloudinary256x256 + lineItem.product.uploads[0].filename" class="checkout__image" style="border-radius: 8px;">
            <div>
              <h5 class="checkout__name" style="margin-bottom: 5px; font-weight: 600;"> {{ lineItem.product.title }} </h5>
              <div v-if="lineItem.variant" class="checkout__attr"><span> {{ lineItem.variant.title }} </span></div>
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
        <div v-if="subTotal" class="css-13dslnb">
          <div class="css-18mhetb">
            <div class="css-9jay18">
              <h6 class="css-k9tjo5" style="font-weight: 600;">Sous-total</h6>
              <div class="css-s2uf1z">
                <h6 class="css-kdhaao" style="font-weight: 600;">{{ subTotal | formatPrice }}€</h6>
              </div>
            </div>
          </div>
        </div>
        <div v-if="subTotal" style="margin: 30px auto">
          <div @click="goCheckout()" style="text-align: center;">
            <div class="btn-swipe">Paiement</div>
          </div>
        </div>
      </div>
      <div v-else class="checkout__body" style="text-align: center; margin-top: 100px;">
        Le panier est vide. <br> Go shopping
      </div>
    </div>
  </main>
</template>


<style scoped src="../assets/css/cart.css"></style>


<script>

export default {
  name: 'Cart',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      lineItems: window.localStorage.getItem("lineItems") ? JSON.parse(window.localStorage.getItem("lineItems")) : [],
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      subTotal: null
    }
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {
    this.updateCart();
  },
  methods: {
    increaseQuantity(lineItem, index) {
      if (lineItem.variant) {
        if (lineItem.variant.quantity > lineItem.quantity) {
          this.lineItems[index].quantity += 1;
          this.updateCart();
        }
      } else {
        if (lineItem.product.quantity > lineItem.quantity) {
          this.lineItems[index].quantity += 1;
          this.updateCart();
        }
      }
    },
    decreaseQuantity(lineItem, index) {
      console.log(lineItem);
      if (lineItem.quantity > 1) {
        this.lineItems[index].quantity -= 1;
        this.updateCart();
      } else {
        this.lineItems.splice(index, 1);
        this.updateCart();
      }
    },
    updateCart() {
      this.subTotal = null;

      if (this.lineItems.length) {
        this.lineItems.map(lineItem => {
          if (lineItem.variant) {
            this.subTotal += lineItem.variant.price * lineItem.quantity;
          } else {
            this.subTotal += lineItem.product.price * lineItem.quantity;
          }
        });

        this.subTotal = this.subTotal.toFixed(2);
      }

      window.localStorage.setItem("lineItems", JSON.stringify(this.lineItems));
      console.log(JSON.parse(window.localStorage.getItem("lineItems")));
    },
    goCheckout() {
      this.$router.push({ name: 'Checkout' });
    },
  }
};

</script>

