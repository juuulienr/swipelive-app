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


<style scoped src="../../assets/css/shopvendor.css"></style>

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

