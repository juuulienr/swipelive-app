<template>
  <main class="products" style="padding: 0px 15px">
    <div class="checkout__header">
      <div class="checkout__close-btn" @click="goBack()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div v-if="rules" class="checkout__title">Règles du Live</div>
      <div v-else-if="step1" class="checkout__title">Articles</div>
      <div v-else class="checkout__title">Ordre de passage</div>
    </div>

    <div class="checkout__body" style="overflow: initial;">
      <div v-if="rules" class="items rules"><br>
        <p><span>Amusez-vous et invitez des amis 🎉</span><br>
        Les lives sont plus sympas avec votre communauté. Assurez-vous de faire la promotion de vos articles et n'oubliez pas de les partager.</p>

        <p><span>Pas de contrefaçons ou d'article illicite 🚨</span><br>
        Si vous n'êtes pas sûr de l'authenticité d'un produit, ne le vendez pas. Il vaut mieux être honnête.</p>

        <p><span>Dites la vérité ✌️</span><br>
        Soyez transparent sur ce que vous vendez et donnez des détails sur vos articles. Les acheteurs apprécient l'honnêteté.</p>

        <p> <span>Soyez respectueux 💙</span><br>
        N’oubliez pas de rester poli et courtois en toutes circonstances. Ne vous engagez pas dans le harcèlement ou l'intimidation sur Swipe Live.</p>

        <p><span>Envoyez vos articles dans les 3 jours ouvrés 📦</span><br>
        Ne faites pas attendre vos clients et emballez correctement vos articles pour qu'ils ne soient pas endommagés pendant le transport.</p>

        <div class="btn-swipe btn-prelive" @click="goStep1()">
          <div>BONNES VENTES ! 🚀</div>
        </div>
      </div>
      <div v-if="step1" class="items">
        <div class="my_form_check">
          Selectionner tous les articles
          <label for="sliderAll" class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-g5gk3y">
            <span class="MuiSwitch-root MuiSwitch-sizeMedium css-1nvvhq">
              <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1hei3uy" :class="{'Mui-checked': isCheckAll }">
                <input id="sliderAll" class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3" type="checkbox" value="true" checked @click="checkAll()">
                <span class="MuiSwitch-thumb css-byglaq"></span>
                <span class="MuiTouchRipple-root css-w0pj6f"></span>
              </span><span class="MuiSwitch-track css-1ju1kxc"></span>
            </span>
          </label>
        </div>

        <div v-if="products.length" class="items">
          <div class="lasted--product" style="margin-top: 12px; padding-bottom: 140px;">
            <div v-for="(product, index) in products" :key="product.id" class="product--item">
              <img v-if="product.uploads.length" :src="$cloudinary256x256 + product.uploads[0].filename" style="background: #eeeeee;">
              <img v-else src="/img/no-preview.png" style="background: #eeeeee;">
              <div class="details">
                <div class="title">{{ product.title }}</div>
                <div class="price" style="display: inline-block;" :class="{ 'stock-unavailable': isProductUnavailable(product), 'stock-available': !isProductUnavailable(product) }">{{ getProductQuantity(product) }} | 
                  <span v-if="product.variants.length > 0"> {{ $formatPrice(lowestVariantPrice(product.variants)) }}€</span>
                  <span v-else> {{ $formatPrice(product.price) }}€</span>
                </div>
              </div>
              <div>
                <div class="price">
                  <label class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-g5gk3y">
                    <span class="MuiSwitch-root MuiSwitch-sizeMedium css-1nvvhq">
                      <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1hei3uy" :class="{'Mui-checked': checked[index].selected }">
                        <input :id="product.id" v-model="selected" type="checkbox" :checked="checked[index].selected" :value="{ 'product': product, 'priority': index + 1 }" class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3" @change="updateCheckAll(index)">
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
        <div v-else-if="loadingProducts">
          <div class="loader2">
            <span></span>
          </div>
        </div>

        <div class="btn-swipe btn-prelive" @click="goStep2()">
          <span>Continuer</span>
        </div>
      </div>
      <div v-if="step2" class="items">
        <p class="p_item">Déplacer les articles par ordre de passage.</p>
        <div v-if="selected.length" class="one_item">
          <draggable :list="selected" :move="checkMove" @start="dragging = true" @end="dragging = false">
            <div v-for="(element, index) in selected" :key="element.id" class="row align-items-center draggable-item">
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
                  <img v-if="element.product.uploads.length" :src="$cloudinary256x256 + element.product.uploads[0].filename" style="background: #eeeeee;">
                  <img v-else src="/img/no-preview.png" style="background: #eeeeee;">
                </div>
              </div>
              <div class="col-6" style="padding-left: 0px; padding-right: 0px;">
                <div class="info">
                  <div class="title" style="">{{ element.product.title }}</div>
                </div>
              </div>
            </div>
          </draggable>

          <div class="btn-swipe btn-prelive" @click="submit()">
            <span v-if="loading">
              <svg viewBox="25 25 50 50" class="loading">
                <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
              </svg>
            </span>
            <span v-else>Continuer</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import { useMainStore } from '../../stores/useMainStore.js';
import { VueDraggableNext } from 'vue-draggable-next';
import { Agora } from '@swipelive/capacitor-agora';

export default {
  name: 'PreLive',
  components: {
    draggable: VueDraggableNext,
  },
  data() {
    const mainStore = useMainStore();

    return {
      user: mainStore.getUser,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      rules: mainStore.getRules,
      step1: mainStore.getRules ? false : true,
      step2: false,
      isCheckAll: true,
      loadingProducts: true,
      loading: false,
      dragging: false,
      products: [],
      selected: [],
      checked: [],
      live: [],
    };
  },
  async created() {    
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/products`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        const allProducts = response.data;
        this.products = allProducts.filter(product => this.getProductQuantity(product) !== "Épuisé");

        this.products.forEach((product, index) => {
          this.selected.push({ product, priority: index + 1 });
          this.checked.push({ selected: true });
        });

        this.loadingProducts = false;
      } catch (error) {
        console.error(error);
      }
    },
    goStep1() {
      this.$Haptics.impact({ style: 'medium' });
      const mainStore = useMainStore();
      mainStore.setRules(false);
      this.rules = false;
      this.step1 = true;
      this.step2 = false;
    },
    goStep2() {
      this.$Haptics.impact({ style: 'medium' });

      if (this.selected.length > 0) {
        if (this.selected.length > 1) {
          this.step1 = false;
          this.step2 = true;
        } else {
          this.submit();
        }
      }
    },
    async submit() {
      if (!this.loading) {
        this.$Haptics.impact({ style: 'medium' });
        this.loading = true;

        const liveProducts = this.selected.map((element, index) => ({
          product: element.product.id,
          priority: index + 1,
        }));

        const httpParams = { views: 0, status: 0, liveProducts };

        try {
          const response = await this.$CapacitorHttp.request({
            method: 'POST',
            url: `${this.baseUrl}/user/api/prelive`,
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
            },
            data: httpParams,
          });

          this.live = response.data;
          await this.goToLive();
        } catch (error) {
          console.error(error);
          this.loading = false;
        }
      }
    },
    async goToLive() {
      try {
        if (this.$Capacitor.isNativePlatform()) {
          const permissions = await Agora.requestPermissions();
      
          if (!permissions.granted) {
            console.warn("Permissions not granted. Redirecting to app settings.");
            return;
          }

          if (this.$Capacitor.getPlatform() === "ios") {
            await this.$StatusBar.setStyle({ style: this.$Style.Dark });
            await this.$StatusBar.setOverlaysWebView({ overlay: true });
            await this.$StatusBar.setBackgroundColor({ color: '#ffffffff' });
          }

          if (this.$Capacitor.getPlatform() === "android") {
            await this.$StatusBar.setStyle({ style: this.$Style.Dark });
            await this.$StatusBar.setOverlaysWebView({ overlay: true });
          }
        }

        this.$router.push({
          name: "Live",
          params: { id: this.live.id },
        });
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    totalVariantQuantity(variants) {
      return variants.reduce((total, variant) => total + variant.quantity, 0);
    },
    lowestVariantPrice(variants) {
      return Math.min(...variants.map((variant) => variant.price));
    },
    getProductQuantity(product) {
      if (product.quantity === 0) {
        return "Épuisé";
      } else if (product.variants.length > 0 && this.totalVariantQuantity(product.variants) === 0) {
        return "Épuisé";
      } else if (product.variants.length === 0) {
        return `${product.quantity} en stock`;
      } else {
        return `${this.totalVariantQuantity(product.variants)} en stock`;
      }
    },
    isProductUnavailable(product) {
      return product.quantity === 0 || (product.variants.length > 0 && this.totalVariantQuantity(product.variants) === 0);
    },
    checkMove(event) {
      console.log(event);
    },
    checkAll() {
      this.$Haptics.impact({ style: 'medium' });
      this.isCheckAll = !this.isCheckAll;
      this.selected = [];
      this.checked = [];

      if (this.isCheckAll) {
        this.products.forEach((product, index) => {
          this.selected.push({ product, priority: index + 1 });
          this.checked.push({ selected: true });
        });
      } else {
        this.products.forEach(() => {
          this.checked.push({ selected: false });
        });
      }
    },
    updateCheckAll(index) {
      this.checked[index].selected = !this.checked[index].selected;

      this.isCheckAll = this.selected.length === this.products.length;
    },
    goBack() {
      if (this.step1 || this.rules) {
        this.$router.push({ name: 'Account' });
      } else {
        this.step2 = false;
        this.step1 = true;
      }
    },
  }
};
</script>

<style scoped src="../../assets/css/prelive.css"></style>
