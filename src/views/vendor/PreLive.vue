<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Articles</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 85px;">
      <div class="items">
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

        <div @click="submit()" class="btn-swipe" style="color: white; text-align: center; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); width: calc(100vw - 40px);">
          <span v-if="loading">
            <svg viewBox="25 25 50 50" class="loading">
              <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
            </svg>
          </span>
          <span v-else>Continuer</span>
        </div>
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


.css-g5gk3y {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  vertical-align: middle;
  justify-content: center;
  margin-bottom: 0px;
}

.css-1nvvhq {
  display: inline-flex;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  z-index: 0;
  vertical-align: middle;
  padding: 9px 13px 9px 12px;
  width: 58px;
  height: 38px;
}

.css-1hei3uy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: transparent;
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
  top: 0px;
  left: 0px;
  z-index: 1;
  color: rgb(255, 255, 255);
  transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.css-1nvvhq .MuiSwitch-switchBase.Mui-checked {
  transform: translateX(13px);
}
.css-1hei3uy.Mui-checked {
  color: rgb(0, 171, 85);
}
.css-1hei3uy.Mui-checked {
  transform: translateX(20px);
}
.css-1nvvhq .MuiSwitch-switchBase {
  left: 3px;
  padding: 12px;
}

.css-1hei3uy .MuiSwitch-input {
  left: 0%;
  width: 100%;
}
.css-1m9pwf3 {
  cursor: inherit;
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  margin: 0px;
  padding: 0px;
  z-index: 1;
}
.css-1nvvhq .MuiSwitch-thumb {
  width: 14px;
  height: 14px;
  box-shadow: none;
  color: rgb(255, 255, 255) !important;
}

.css-byglaq {
  box-shadow: rgb(145 158 171 / 20%) 0px 2px 1px -1px, rgb(145 158 171 / 14%) 0px 1px 1px 0px, rgb(145 158 171 / 12%) 0px 1px 3px 0px;
  background-color: currentcolor;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.css-w0pj6f {
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  z-index: 0;
  inset: 0px;
  border-radius: inherit;
}

.css-1nvvhq .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
  opacity: 1;
}

.css-1hei3uy.Mui-checked + .MuiSwitch-track {
  background-color: rgb(0, 171, 85);
}
.css-1hei3uy.Mui-checked + .MuiSwitch-track {
  opacity: 0.5;
}
.css-1nvvhq .MuiSwitch-track {
  opacity: 1;
  border-radius: 14px;
  background-color: rgba(145, 158, 171, 0.48);
}
.css-1ju1kxc {
  height: 100%;
  width: 100%;
  border-radius: 7px;
  z-index: -1;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: rgb(0, 0, 0);
  opacity: 0.38;
}
.css-g5gk3y .MuiFormControlLabel-label {
  line-height: 1.57143;
  font-size: 0.875rem;
  font-weight: 400;
}
.css-k36ljx {
  margin: 0px;
  line-height: 1.5;
  font-size: 1rem;
  font-weight: 400;
}

.lasted--product {
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: hidden;
  padding: 3px;
}
.product--item {
  display: flex;
  flex-direction: row;
  padding: 7px;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px;
}
.product--item img {
  line-height: 0;
  display: block;
  border-radius: 12px;
  width: 64px;
  height: 64px;
  margin-right: 0px;
}
.product--item .details {
  flex-grow: 1;
}
.product--item .details .title {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  line-height: 1.57143;
  font-size: 15px;
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
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      products: [],
      selected: [],
      checked: [],
      stocks: [],
      prices: [],
      isCheckAll: true,
      loading: false
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
    async submit() {
      console.log(this.selected);

      if (this.selected.length > 0 && !this.pending) {
        var httpParams = { "views": 0, "status": 0, "liveProducts": this.selected };
        this.loading = true;

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
      this.$router.push({ name: 'Account' });
    },
  }
};

</script>

