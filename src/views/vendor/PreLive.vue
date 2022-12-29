<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div v-if="step1" class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Articles</div>
      <div v-else class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Ordre de passage</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 85px;">
      <div v-if="step1" class="items">
        <div class="my_form_check" style="font-size: 14px; color: #525c66; font-weight: 500; margin-right: 9px;">
          Tous les articles
          <label for="sliderAll" class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-g5gk3y">
            <span class="MuiSwitch-root MuiSwitch-sizeMedium css-1nvvhq">
              <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1hei3uy" :class="{'Mui-checked': isCheckAll }">
                <input @click="checkAll()" id="sliderAll" class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3" type="checkbox" value="true" checked="">
                <span class="MuiSwitch-thumb css-byglaq"></span>
                <span class="MuiTouchRipple-root css-w0pj6f"></span>
              </span><span class="MuiSwitch-track css-1ju1kxc"></span>
            </span>
          </label>
        </div>

        <div v-if="products.length" class="items">
          <div class="lasted--product" style="margin-top: 12px;">
            <div v-for="(product, index) in products" :key="product.id" v-if="product.archived == false && (stocks[index] > 0 || product.quantity > 0)" class="product--item" style="align-items: center;">
              <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="line-height: 0;display: block;border-radius: 10px;width: 64px;height: 64px;">
              <img v-else :src="require(`@/assets/img/no-preview.jpg`)" style="line-height: 0;display: block;border-radius: 10px;width: 64px;height: 64px;">
              <div class="details">
                <div class="title">{{ product.title }}</div>
                <div class="price" v-if="stocks[index] > 0" style="margin: 0px; height: 22px; min-width: 22px; line-height: 0; border-radius: 6px; cursor: default; align-items: center; white-space: nowrap; display: inline-flex; justify-content: center; color: rgb(34, 154, 22); font-size: 0.75rem; background-color: rgba(84, 214, 44, 0.16); font-weight: 700; padding: 0 8px; margin-top: 3px; ">{{ stocks[index] }} en stock | {{ prices[index] | formatPrice }}€</div>
                <div class="price" v-else-if="product.quantity > 0" style="margin: 0px; height: 22px; min-width: 22px; line-height: 0; border-radius: 6px; cursor: default; align-items: center; white-space: nowrap; display: inline-flex; justify-content: center; color: rgb(34, 154, 22); font-size: 0.75rem; background-color: rgba(84, 214, 44, 0.16); font-weight: 700; padding: 0 8px; margin-top: 3px; ">{{ product.quantity }} en stock | {{ product.price | formatPrice }}€</div>
                </div>
              <div>
                <div class="price">
                  <label class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-g5gk3y">
                    <span class="MuiSwitch-root MuiSwitch-sizeMedium css-1nvvhq">
                      <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1hei3uy" :class="{'Mui-checked': checked[index].selected }">
                        <input type="checkbox" :checked="checked[index].selected" :id="product.id" :value="{ 'product': product.id, 'priority': index + 1 }" v-model="selected" @change="updateCheckAll(index)" class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3">
                        <span class="MuiSwitch-thumb css-byglaq"></span>
                        <span class="MuiTouchRipple-root css-w0pj6f"></span>
                      </span><span class="MuiSwitch-track css-1ju1kxc"></span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div @click="goStep2()" class="btn-swipe" style="color: white; text-align: center; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); width: calc(100vw - 40px);">
          <span v-if="loading">
            <svg viewBox="25 25 50 50" class="loading">
              <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
            </svg>
          </span>
          <span v-else>Continuer</span>
        </div>
      </div>
      <div v-if="step2" class="items">
        <p style="padding-top: 20px; margin-bottom: 0px; text-align: center; font-weight: 400">Déplacer les articles par ordre de passage.</p>
        <div v-if="live.liveProducts.length" class="one_item">
          <draggable :list="live.liveProducts" :move="checkMove" @start="dragging = true" @end="dragging = false">
            <div v-for="(element, index) in live.liveProducts" :key="element.id" class="row align-items-center" style="margin: 15px 5px; box-shadow: 0 0 5px rgb(0 0 0 / 20%); padding: 10px; border-radius: 20px;">
              <div class="col-1">
                <div style="font-size: 18px; color: rgb(99, 115, 129);">{{ index + 1 }}</div>
              </div>
              <div class="col-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 20px; height: 20px; margin-left: -5px; fill: rgb(99, 115, 129);"><path d="M424 392H23.1C10.8 392 0 402.8 0 415.1C0 429.2 10.8 440 23.1 440H424c13.2 0 24-10.8 24-23.1C448 402.8 437.2 392 424 392zM424 72H23.1C10.8 72 0 82.8 0 95.1S10.8 120 23.1 120H424c13.2 0 24-10.8 24-23.1S437.2 72 424 72zM424 232H23.1C10.8 232 0 242.8 0 256c0 13.2 10.8 24 23.1 24H424C437.2 280 448 269.2 448 256S437.2 232 424 232z"/></svg>
              </div>
              <div class="col-3 col-img">
                <div class="img_item">
                  <img v-if="element.product.uploads.length" :src="cloudinary256x256 + element.product.uploads[0].filename" style="width: 52px; height: 52px; border-radius: 12px; object-fit: cover;">
                  <img v-else :src="require(`@/assets/img/no-preview.jpg`)" style="width: 52px; height: 52px; border-radius: 12px; object-fit: cover;">
                </div>
              </div>
              <div class="col-6" style="padding-left: 0px; padding-right: 0px;">
                <div class="info">
                  <div class="title" style="text-decoration: none; color: rgb(33, 43, 54); line-height: 1.57143; font-size: 15px;">{{ element.product.title }}</div>
                </div>
              </div>
            </div>
          </draggable>

          <div @click="submit()" class="btn-swipe" style="color: white; text-align: center; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); width: calc(100vw - 40px);">Continuer</div>
        </div>
      </div>
    </div>
  </main>
</template>



<style scoped src="../../assets/css/prelive.css"></style>

<script>

import draggable from 'vuedraggable';

export default {
  name: 'PreLive',
  components: {
    draggable
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      user: JSON.parse(window.localStorage.getItem("user")),
      token: window.localStorage.getItem("token"),
      bambuserId: window.localStorage.getItem("bambuserId"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      products: [],
      selected: [],
      checked: [],
      stocks: [],
      prices: [],
      step1: true,
      step2: false,
      isCheckAll: true,
      loading: false,
      live: [],
      dragging: false,
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
        this.$router.push({ name: 'AddEditProduct' });
      } else {
        this.products.map((product, key) => { 
          this.selected.push({ 'product': product.id, 'priority': key + 1 });
          this.checked.push({ 'selected': true });

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
            this.stocks[key] = quantity;
            this.prices[key] = price;
          }
        });
      }
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    async goStep2() {
      console.log(this.selected);

      if (this.selected.length > 0 && !this.pending) {
        var httpParams = { "views": 0, "status": 0, "liveProducts": this.selected };
        this.loading = true;

        window.cordova.plugin.http.setDataSerializer('json');
        window.cordova.plugin.http.post(this.baseUrl + "/user/api/prelive", httpParams, { Authorization: "Bearer " + this.token }, (response) => {
          var result = JSON.parse(response.data);
          this.live = result;
          console.log(this.liveProducts);

          if (this.selected.length > 1) {
            this.step1 = false;
            this.step2 = true;
            this.loading = false;
          } else {
            this.$router.push({ name: 'Live', params: { id: result.id } });
          }
        }, (response) => {
          this.loading = false;
          console.log(response.error);
        });
      }
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selected = [];
      this.checked = [];
      if (this.isCheckAll) {
        this.products.map((element, key) => { 
          this.selected.push({ 'product': element.id, 'priority': key + 1 });
          this.checked.push({ 'selected': true });
        });
      } else {
        this.products.map((element, key) => { 
          this.checked.push({ 'selected': false });
        });
      }
    },
    updateCheckAll(index) {
      if (this.checked[index].selected) {
        this.checked[index].selected = false;
      } else {
        this.checked[index].selected = true;
      }

      if (this.selected.length == this.products.length) {
         this.isCheckAll = true;
      } else {
         this.isCheckAll = false;
      }
    },
    goBack() {
      if (this.step1) {
        this.$router.push({ name: 'Account' });
      } else {
        this.step2 = false;
        this.step1 = true;
      }
    },
    checkMove(event) {
      console.log(event);
    },
    async submit() {
      if (!this.pending) {
        this.pending = true;
        this.live.liveProducts.map((element, key) => { 
          var priority = key + 1;
          
          window.cordova.plugin.http.setDataSerializer('json');
          window.cordova.plugin.http.put(this.baseUrl + "/user/api/liveproducts/edit/" + element.id, { "priority": priority }, { Authorization: "Bearer " + this.token }, (response) => {}, (response) => {
            this.pending = false;
            console.log(response.error);
          });
        });

        if (this.pending) {
          this.$router.push({ name: 'Live', params: { id: this.live.id } });
        }
      }
    },
  }
};

</script>

