<template>
  <main class="products">
    <div class="checkout">
      <div class="checkout__header" style="padding: 15px;">
        <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 8px; padding: 0.5rem 0px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: #161823;"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
        </div>
        <div class="checkout__title" style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Ma boutique</div>
      </div>
      <div @click="actionSheet()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); margin: 10px 15px 30px;">Ajouter un produit</div>
      <div v-if="products" class="items">
        <div class="lasted--product" style="margin-top: 20px;">
          <div v-for="(product, index) in products" v-if="product.archived == false" @click="editProduct(product.id)" class="product--item">
            <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" alt="Product">
            <div class="details">
              <div class="title">{{ product.title }}</div>
              <div class="price" v-if="product.variants.length && stocks[index] > 0">Qté : {{ stocks[index] }} | Prix : {{ prices[index] | formatPrice }}€</div>
              <div class="price" style="color: #e74c3c" v-else-if="product.variants.length && stocks[index] == 0">Qté : {{ stocks[index] }} | Prix : {{ prices[index] | formatPrice }}€</div>
              <div class="price" v-else-if="product.quantity > 0">Qté : {{ product.quantity }} | Prix : {{ product.price | formatPrice }}€</div>
              <div class="price" style="color: #e74c3c" v-else>Qté : {{ product.quantity }} | Prix : {{ product.price | formatPrice }}€</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>

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

.products {
  height: 100vh;
  width: 100%;
}

.products header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 5vw;
}

.products header .h-left .h-title {
  font-size: 0.9em;
  padding-left: 4vw;
  text-transform: uppercase;
  margin-bottom: 0;
}

.products header img {
  width: 20px;
}

.products header .h-right img {
  margin-left: 3vw;
}

img {
  width:100%
}

.products .list_options {
  padding: 2vh 5vw;
  background-color: #f9fbfe;
}

.products .list_options ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.products .list_options ul li .dropdown .btn {
  font-size: 0.9em;
  background-color: #fff !important;
  color: #222;
  border: none;
  box-shadow: 0px 0px 8px 5px #eee;
  text-transform: uppercase;
  padding-left: 5vw;
  padding-right: 5vw;
  margin-right: 2vw;
}

.products .list_options ul li .dropdown-menu {
  margin-top: 2vh;
  margin-left: -25%;
  padding: 1vh 2vw;
  -webkit-box-shadow: 0px 0px 4px 4px #eee;
  box-shadow: 0px 0px 4px 4px #eee;
  position: relative;
  width: 70vw;
}

.products .list_options ul li .dropdown-menu ul {
  display: block;
}

.products .list_options ul li .dropdown-menu li:not(:last-child) {
  border-bottom: 1px solid #eee;
}

.products .list_options ul li .dropdown-menu .checked .option {
  color: #222;
}

.products .list_options ul li .dropdown-menu li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 100%;
  padding: 1vh 0;
}

.products .list_options ul li .dropdown-menu li .option {
  font-size: 0.8em;
  margin-bottom: 0;
  color: #555;
}

.products .list_options ul li .dropdown-menu.first:before {
  left: 15%;
}

.products .list_options ul li .dropdown-menu.second:before {
  left: 42%;
}

.products .list_options ul li .dropdown-menu.last:before {
  right: 25%;
}

.products .list_options ul li .dropdown-menu:before {
  content: "";
  position: absolute;
  top: -5px;
  width: 14px;
  height: 14px;
  border: 6px solid;
  border-color: #fff #fff transparent transparent;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.products .list_options ul li .my_form_check {
  display: inline-block;
}

.products .list_options ul li .styled-checkbox {
  position: absolute;
  opacity: 0;
}

.products .list_options ul li .styled-checkbox + label {
  position: relative;
  cursor: pointer;
  padding: 0;
}

.products .list_options ul li .styled-checkbox + label:before {
  content: "";
  margin-right: 4vw;
  display: inline-block;
  vertical-align: text-top;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 3px;
  -webkit-box-shadow: 0 0 1px 1px #ccc;
  box-shadow: 0 0 1px 1px #ccc;
}

.products .list_options ul li .styled-checkbox:hover + label:before {
  background: #dadada;
}

.products .list_options ul li .styled-checkbox:focus + label:before {
  -webkit-box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
}

.products .list_options ul li .styled-checkbox:checked + label:before {
  background: #3b3b4d;
}

.products .list_options ul li .styled-checkbox:disabled + label {
  color: #b8b8b8;
  cursor: auto;
}

.products .list_options ul li .styled-checkbox:checked + label:after {
  content: "";
  position: absolute;
  left: 4px;
  top: 9px;
  background: white;
  width: 1.8px;
  height: 1.8px;
  -webkit-box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white,
  4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
  box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white,
  4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.products .list_options ul .sliders {
  position: relative;
}

.products .list_options ul .sliders img {
  width: 18px;
}

.products .list_options ul .sliders .number {
  position: absolute;
  color: #fff;
  top: -1vh;
  right: -4px;
  padding: 1px 3px;
  border-radius: 3px;
  background-color: #5882f2;
  font-size: 0.6em;
}

.products .items {
  padding: 0 15px;
}

.products .items .col-img {
  padding-right: 0;
}

.products .items .price_ratings > div {
  display: inline-block;
  height: 3vh;
}

.products .items .ratings {
  display: flex;
  align-items: center;
}

.products .items .one_item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.products .items .one_item .title {
  font-size: 16px;
  font-weight: 600;
}

.products .items .one_item .desc {
  font-size: 14px;
  color: #6c7b8a;
  margin-bottom: 0px;
}

.products .items .one_item .price {
  margin-right: 5vw;
  color: #5882f2;
  position: relative;
  top: 1px;
}


.products .items .one_item .img_item img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 12px;
}

.products .my_navbar {
  overflow: hidden;
  height: 6vh;
  width: 100vw;
}

.products .my_navbar .nav_content {
  position: fixed;
  bottom: 0vh;
  left: 0;
  width: 100%;
  height: 6vh;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 5vw;
}

.products .my_navbar .nav_content .icon_nav {
  text-align: center;
}

.products .my_navbar .nav_content .icon_nav img {
  width: 70%;
}

.products .my_navbar .nav_content .shopping {
  position: relative;
}

.products .my_navbar .nav_content .shopping .number {
  position: absolute;
  right: 0px;
  top: 0;
  background-color: #5882f2;
  color: #fff;
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 0.6em;
}

.lasted--product {
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: hidden;
}
.product--item {
  display: flex;
  flex-direction: row;
}
.product--item img {
  line-height: 0;
  display: block;
  overflow: hidden;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
}
.product--item .details {
  margin-left: 16px;
  flex-grow: 1;
  min-width: 200px;
}
.product--item .details .title {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  line-height: 1.57143;
  font-size: 15px;
}
.product--item .details .price {
  line-height: 1.57143;
  font-size: 14px;
  font-weight: 400;
  color: #333;
}


.store-products-item__login-popup.store-products-item__login-popup--active {
  bottom: 0;
}

.store-products-item__login-popup {
  position: fixed;
  width: 100%;
  bottom: -80%;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  animation-duration: 400ms !important;
  animation-iteration-count: 1 !important;
  animation-fill-mode: both !important;
  animation-name: keyframe_d37zz3 !important;
  z-index: 1000000000;
}
</style>

<script>

export default {
  name: 'ShopVendor',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      stocks: [],
      prices: [],
      products: null,
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
    
    window.cordova.plugin.http.get(this.baseUrl + "/user/api/products", {}, { Authorization: "Bearer " + this.token }, (response) => {
      var result = JSON.parse(response.data);
      
      if (result) {
        this.products = result;
        this.products.map((product, index) => {
          if (product.variants.length) {
            var quantity = 0;
            var price = null;
            product.variants.map((variant) => {
              if (!price) {
                price = variant.price;
              }
              if (price && variant.price < price) {
                price = variant.price;
              }
              quantity = quantity + variant.quantity;
            });
            this.stocks[index] = quantity;
            this.prices[index] = price;
          }
        });
      } else {
      	this.$router.push({ name: 'AddProduct' });
      }
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    actionSheet() {
      this.$router.push({ name: 'AddProduct' });
      var options = {
        buttonLabels: ['Ajouter Manuellement', 'Importer depuis Shopify'],
        addCancelButtonWithLabel: 'Annuler',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };
      window.plugins.actionsheet.show(options, (index) => {
        console.log(index);
        if (index == 1) {
          this.$router.push({ name: 'AddProduct' });
        } else if (index == 2) {
          this.$router.push({ name: 'AddProduct' });
        }
      }, (error) => {
        console.log(error);
      });
    },
    editProduct(id) {
      this.$router.push({ name: 'EditProduct', params: { id: id } });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
  }
};

</script>

