<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div v-if="rules" class="checkout__title">Règles du Live</div>
      <div v-else-if="step1" class="checkout__title">Articles</div>
      <div v-else class="checkout__title">Ordre de passage</div>
    </div>

    <div class="checkout__body" style="overflow: initial; padding-bottom: 85px;">
      <div v-if="rules" class="items rules">
        <br>

        <p><span>Amusez-vous et invitez des amis 🎉 </span> <br>
        Les lives sont plus sympas avec votre communauté. Assurez-vous de faire la promotion de vos articles et n'oubliez pas de les partager.</p>

        <p><span>Pas de contrefaçons ou d'article illicite 🚨  </span> <br>
        Si vous n'êtes pas sûr de l'authenticité d'un produit, ne le vendez pas. Il vaut mieux être honnête.</p>

        <p><span>Dites la vérité ✌️  </span> <br>
        Soyez transparent sur ce que vous vendez et donnez des détails sur vos articles. Les acheteurs apprécient l'honnêteté.</p>

        <p> <span>Soyez respectueux 💙  </span> <br>
        N’oubliez pas de rester poli et courtois en toutes circonstances. Ne vous engagez pas dans le harcèlement ou l'intimidation sur Swipe Live.</p>

        <p><span>Envoyez vos articles dans les 3 jours ouvrés 📦 </span> <br>
        Ne faites pas attendre vos clients et emballez correctement vos articles pour qu'ils ne soient pas endommagés pendant le transport.</p>

        <div @click="goStep1()" class="btn-swipe btn-prelive">
          <div>BONNES VENTES ! 🚀</div>
        </div>
      </div>
      <div v-if="step1" class="items">
        <div class="my_form_check">
          Selectionner tous les articles
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
            <div v-for="(product, index) in products" :key="product.id" v-if="product.archived == false && (stocks[index] > 0 || product.quantity > 0)" class="product--item">
              <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename">
              <img v-else :src="require(`@/assets/img/no-preview.png`)">
              <div class="details">
                <div class="title">{{ product.title }}</div>
                <div class="price stock-available" v-if="stocks[index] > 0">{{ stocks[index] }} en stock | {{ prices[index] | formatPrice }}€</div>
                <div class="price stock-available" v-else-if="product.quantity > 0">{{ product.quantity }} en stock | {{ product.price | formatPrice }}€</div>
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

        <div @click="goStep2()" class="btn-swipe btn-prelive">
          <span v-if="loading">
            <svg viewBox="25 25 50 50" class="loading">
              <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
            </svg>
          </span>
          <span v-else>Continuer</span>
        </div>
      </div>
      <div v-if="step2" class="items">
        <p class="p_item">Déplacer les articles par ordre de passage.</p>
        <div v-if="live.liveProducts.length" class="one_item">
          <draggable :list="live.liveProducts" :move="checkMove" @start="dragging = true" @end="dragging = false">
            <div v-for="(element, index) in live.liveProducts" :key="element.id" class="row align-items-center draggable-item">
              <div class="col-1">
                <div style="font-size: 18px; color: rgb(99, 115, 129);">{{ index + 1 }}</div>
              </div>
              <div class="col-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 20px; height: 20px; margin-left: -5px; fill: rgb(99, 115, 129);">
                  <path d="M424 392H23.1C10.8 392 0 402.8 0 415.1C0 429.2 10.8 440 23.1 440H424c13.2 0 24-10.8 24-23.1C448 402.8 437.2 392 424 392zM424 72H23.1C10.8 72 0 82.8 0 95.1S10.8 120 23.1 120H424c13.2 0 24-10.8 24-23.1S437.2 72 424 72zM424 232H23.1C10.8 232 0 242.8 0 256c0 13.2 10.8 24 23.1 24H424C437.2 280 448 269.2 448 256S437.2 232 424 232z"/>
                </svg>
              </div>
              <div class="col-3 col-img">
                <div class="img_item">
                  <img v-if="element.product.uploads.length" :src="cloudinary256x256 + element.product.uploads[0].filename">
                  <img v-else :src="require(`@/assets/img/no-preview.png`)">
                </div>
              </div>
              <div class="col-6" style="padding-left: 0px; padding-right: 0px;">
                <div class="info">
                  <div class="title" style="">{{ element.product.title }}</div>
                </div>
              </div>
            </div>
          </draggable>

          <div @click="submit()" class="btn-swipe btn-prelive">Continuer</div>
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
      user: this.$store.getters.getUser,
      token: window.localStorage.getItem("token"),
      bambuserId: window.localStorage.getItem("bambuserId"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      products: [],
      selected: [],
      checked: [],
      stocks: [],
      prices: [],
      live: [],
      rules: window.localStorage.getItem("rules") ? false : true,
      step1: window.localStorage.getItem("rules") ? true : false,
      step2: false,
      isCheckAll: true,
      loading: false,
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
    window.StatusBar.backgroundColorByHexString("#ffffff");

    window.cordova.plugin.http.get(this.baseUrl + "/user/api/products", {}, { Authorization: "Bearer " + this.token }, (response) => {
      this.products = JSON.parse(response.data);
      if (this.products.length == 0) {
        this.$router.push({ name: 'AddEditProduct' });
      } else {
        this.products.map((product, index) => { 
          this.selected.push({ 'product': product.id, 'priority': index + 1 });
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
            this.stocks[index] = quantity;
            this.prices[index] = price;
          }
        });
      }
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    goStep1() {
      this.rules = false;
      this.step1 = true;
      this.step2 = false;
      window.localStorage.setItem("rules", true);
    },
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
        this.products.map((element, index) => { 
          this.selected.push({ 'product': element.id, 'priority': index + 1 });
          this.checked.push({ 'selected': true });
        });
      } else {
        this.products.map((element, index) => { 
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
      if (this.step1 || this.rules) {
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
        this.live.liveProducts.map((element, index) => { 
          var priority = index + 1;
          
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

