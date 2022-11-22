<template>
  <main class="products">
    <div style="position: absolute; background: white; padding: 15px; width: 100%; z-index: 1000000000; text-align: center;">
      <svg @click="goBack()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823; float: left;">
        <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
      </svg>
      <h5 style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Choix des produits</h5>
    </div>
    <div class="checkout" style="margin-top: 50px;">
      <div class="items">
        <div class="my_form_check" style="font-size: 14px; color: #637381; font-weight: 400;">
          Tout selectionner
          <div class="profil--slide">
            <input @click="checkAll()" type="checkbox" class="slider" id="sliderAll">
            <label for="sliderAll">
              <span></span>
            </label>
            <label for="sliderAll"></label>
          </div>
        </div>
        <hr class="MuiDivider-root MuiDivider-fullWidth css-ss6lby" style="margin-top: 15px;flex-shrink: 0;border-width: 0px 0px thin;border-style: solid;border-color: rgba(145, 158, 171, 0.24);">
        <div v-if="products.length"  class="lasted--product" style="margin-top: 20px;">
          <div v-for="(product, index) in products" :key="product.id" v-if="product.archived == false" class="product--item">
            <img v-if="product.uploads.length" :src="baseUrl + '/uploads/' + product.uploads[0].filename" alt="Product">
            <div class="details">
              <div class="title">{{ product.title }}</div>
              <div class="price">Qté : {{ product.quantity }} | Prix : {{ product.price | formatPrice }}€</div>
            </div>
            <div class="profil--slide">
              <input type="checkbox" class="slider" :id="product.id" :value="{ 'product': product.id, 'priority': index + 1 }" v-model="selected" @change="updateCheckAll()">
              <label :for="product.id">
                <span></span>
              </label>
              <label :for="product.id"></label>
            </div>
          </div>
        </div>

        <div @click="submit()" class="btn-swipe" style="color: white; text-align: center; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); width: calc(100vw - 40px);">Continuer</div>
      </div>
    </div>
  </main>
</template>


<style scoped>

.products {
  height: 100vh;
  width: 100%;
}

img {
  width:100%
}

.products .items {
  padding: 0 5vw;
}

.products .items .col-img {
  padding-right: 0;
}

.my_form_check {
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
.product--item > img {
  line-height: 0;
  display: block;
  overflow: hidden;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
}
.product--item > .details {
  margin-left: 16px;
  flex-grow: 1;
  min-width: 200px;
}
.product--item > .details > .title {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  line-height: 1.57143;
  font-size: 15px;
}
.product--item > .details > .price {
  line-height: 1.57143;
  font-size: 14px;
  font-weight: 400;
  color: #333;
}

.profil--slide {
  display: inline-flex;
  height: 38px;
  padding: 12px;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  z-index: 0;
  vertical-align: middle;

}
.profil--slide label:last-of-type {
  background-color: rgb(145, 158, 171);
  border-radius: 7px;
  display: block;
  width: 34px;
  height: 14px;
}

.profil--slide > label:first-of-type {
  background-color: rgba(99, 115, 129, 0.08);
  padding: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  padding: 9px;
  border-radius: 50%;
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  right: auto;
  box-shadow: rgb(145 158 171 / 16%) 0px 1px 2px 0px;
}

.profil--slide label:first-of-type span {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
}

.profil--slide input[type=checkbox] {
  visibility: hidden;

}
.profil--slide input[type=checkbox]:checked + label:first-of-type {
  left: 35px;
}  

.slider:checked + label:first-of-type span {
  background-color: rgb(0, 171, 85);
}

.slider:checked ~ label:last-of-type {
  background-color: rgb(0, 171, 85) !important;
  opacity: .5;
}
</style>

<script>

export default {
  name: 'PreLive',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      user: JSON.parse(window.localStorage.getItem("user")),
      token: window.localStorage.getItem("token"),
      bambuserId: window.localStorage.getItem("bambuserId"),
      products: [],
      selected: [],
      isCheckAll: false,
      pending: false
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
      this.products = JSON.parse(response.data);
      if (this.products.length == 0) {
        this.$router.push({ name: 'AddProduct' });
      }
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    async submit() {
      console.log(this.selected);

      if (this.selected.length > 0 && !this.pending) {
        this.pending = true;
        var httpParams = { "views": 0, "status": 0, "liveProducts": this.selected };

        window.cordova.plugin.http.setDataSerializer('json');
        window.cordova.plugin.http.post(this.baseUrl + "/user/api/prelive", httpParams, { Authorization: "Bearer " + this.token }, (response) => {
          var result = JSON.parse(response.data);
          if (result) {
            if (this.selected.length > 1) {
              this.$router.push({ name: 'PreLive2', params: { id: result.id } });
            } else {
              this.$router.push({ name: 'Live', params: { id: result.id } });
            }
          }
        }, (response) => {
          this.pending = false;
          console.log(response.error);
        });
      }
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selected = [];
      if(this.isCheckAll){
        this.products.map((element, key) => { 
          this.selected.push({ 'product': element.id, 'priority': key + 1 });
        });
      }
    },
    updateCheckAll() {
      if(this.selected.length == this.products.length){
         this.isCheckAll = true;
      } else {
         this.isCheckAll = false;
      }
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
  }
};

</script>

