<template>
  <main class="products shop_3" style="padding: 0px;">
    <div class="people-section" style="padding-right: 0px; box-shadow: rgba(0,0,0,0.16) 0px 0px 6px 0px; padding-bottom: 7px;">
      <div class="s1yvqyx7 dir dir-ltr">
        <div class="dir dir-ltr">
          <div class="awuxh4x dir dir-ltr">
            <div class="cw9aemg dir dir-ltr">
              <div class="c14whb16 dir dir-ltr">
                <button v-for="category in categories" :key="category" :class="{ 'ccma3s': category === selectedCategory }" class="c1l3w0tx dir dir-ltr" @click="selectCategory(category)">
                  <div class="c8gkmzg dir dir-ltr">
                    <span class="c1m2z0bj c1w8ohg7 dir dir-ltr">
                      <img v-if="category.picture" class="i1wps9q8 dir dir-ltr" :src="`/img/${category.picture}`" alt="" width="24" height="24" />
                      <div class="tamhn2w dir dir-ltr">
                        <span class="t1h65ots dir dir-ltr">{{ category.name }}</span>
                      </div>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="filteredProducts.length" class="shop--part" style="margin: 25px 15px 0px; gap: 20px 10px; padding-bottom: 120px;">
      <div v-for="product in filteredProducts" class="shop--box" @click="showProduct(product)">
        <div>
          <img v-if="product.uploads.length" :src="$cloudinary256x256 + product.uploads[0].filename" style="width: 100%; border-radius: 10px; background: #eeeeee; height: calc(50vw - 20px);">
          <img v-else src="/img/no-preview.png" style="width: 100%; border-radius: 10px; background: #eeeeee; height: calc(50vw - 20px);">
        </div>
        <div class="shop--item--details" style="width: 100%; padding: 0px; margin-top: 6px; padding-left: 5px;">
          <div class="shop--item--name" style="font-size: 13px; text-align: left;">{{ product.title }}</div>
          <div class="shop--item--price">
            <div class="price" style="font-size: 13px; margin: 0px; font-weight: 500;" :style="[product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]">
              {{ $formatPrice(product.price) }}€
              <span v-if="product.compareAtPrice" class="last-price" style="margin-left: 3px;">
                {{ $formatPrice(product.compareAtPrice) }}€
              </span>
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
    <div v-else>
      <div class="container" style="margin: 120px auto 0px; text-align: center;">
        <div style="margin: 0px auto;">
          <Vue3Lottie :animationData="LottieJSON" style="width:100%"/>
        </div>
      </div>
      <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun produit</h5>
      <div style="font-weight: 400;font-size: 15px;text-align: center;">Il n'y a pas d'article dans cette catégorie.</div>
    </div>


    <!-- product popup -->
    <div v-if="popupProduct" class="store-products-item__login-popup store-products-item__login-popup--active product-popup">
      <div style="width: 38px; height: 38px; position: absolute; top: 20px; left: 20px; z-index: 10000;" @click="hideProduct()">
        <img src="/img/close-popup.svg" style="width: 38px; height: 38px; filter: drop-shadow(0px 0px 1px #222);"/>
      </div>
      <img v-if="user.favoris.find(favoris => favoris.product.id === product.id)" src="/img/circle-heart-full.svg" style="width: 35px; height: 35px; position: absolute; top: 40px; top: 22px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222); pointer-events: auto;" @click="favoris(product)"/>
      <img v-else src="/img/circle-heart.svg" style="width: 35px; height: 35px; position: absolute; top: 22px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222); pointer-events: auto;" @click="favoris(product)"/>
      <Product :product="product" @selectVariant="selectVariantChild"></Product>
    </div>
    <div v-if="popupProduct" class="product-popup-btn">
      <div class="groups">
        <div v-if="product.quantity > 0" class="btn-swipe btn-checkout" @click="addToCart()">Ajouter</div>
        <div v-else class="btn-swipe btn-checkout" style="color: rgb(170, 170, 170); background: #eff1f6;">Épuisé</div>
      </div>
    </div>
    
  </main>
</template>

<script>
import { useMainStore } from '../stores/useMainStore.js';
import Product from '../components/Product.vue';
import LottieJSON from '../assets/lottie/no-product.json';

export default {
  name: 'Category',
  components: {
    Product,
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      products: [],
      loading: true,
      user: useMainStore().getUser,
      lineItems: useMainStore().getLineItems,
      categories: useMainStore().getCategories,
      LottieJSON: LottieJSON,
      id: this.$route.params.id,
      selectedCategory: null,
      popupProduct: false,
      loadingProducts: true,
      product: null,
      variant: null,
    };
  },
  computed: {
    filteredProducts() {
      if (this.products) {
        return this.products.filter(product => product.category.id === this.selectedCategory.id);
      }
      return false;
    }
  },
  created() {    
    this.loadAllProducts();

    if (this.id) {
      this.categories.forEach((category) => {
        if (category.id == this.id) {
          this.selectedCategory = category; 
        }
      });
    } else {
      this.selectedCategory = this.categories[0]; 
    }
  },
  methods: {   
    goBack() {
      this.$router.back();
    },
    async loadAllProducts() {
      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/products/all`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.products = response.data;
        this.loadingProducts = false;
      } catch (error) {
        console.error('Erreur lors de la récupération de tous les produits :', error);
      }
    },
    async favoris(product) {
      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/favoris/${product.id}`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        const updatedUser = response.data;
        useMainStore().setUser(updatedUser);
        this.user = updatedUser;
      } catch (error) {
        console.error('Erreur lors de la mise à jour des favoris :', error);
      }
    },
    selectCategory(category) {
      this.$Haptics.impact({ style: 'medium' });
      this.selectedCategory = category;
    },
    showProduct(product) {
      this.$Haptics.impact({ style: 'medium' });
      this.product = product;
      this.popupProduct = true;
    },
    hideProduct() {
      this.popupProduct = false;
      this.product = null;
    },
    selectVariantChild(variant) {
      console.log(variant);
      this.variant = variant;
    },
    addToCart() {
      this.$Haptics.impact({ style: 'medium' });
      this.popupProduct = false;

      const vendor = typeof this.product.vendor === "object" ? this.product.vendor.id : this.product.vendor;

      if (this.lineItems.length) {
        let exist = false;
        let newVendor = false;

        this.lineItems.forEach(lineItem => {
          if (lineItem.vendor !== vendor) {
            newVendor = true;
          }
        });

        if (!newVendor) {
          this.lineItems.forEach(lineItem => {
            if (lineItem.variant && this.variant && lineItem.variant.id === this.variant.id) {
              exist = true;
              lineItem.quantity += 1;
            } else if (lineItem.product.id === this.product.id && !this.variant) {
              exist = true;
              lineItem.quantity += 1;
            }
          });
        } else {
          exist = true;
          this.confirmReplaceCart(vendor);
        }

        if (!exist) {
          this.lineItems.push({ product: this.product, variant: this.variant, quantity: 1, vendor });
          useMainStore().setLineItems(this.lineItems);
        }
      } else {
        this.lineItems.push({ product: this.product, variant: this.variant, quantity: 1, vendor });
        useMainStore().setLineItems(this.lineItems);
      }
    }, 
    async confirmReplaceCart(vendor) {
      try {
        const { value } = await this.$Dialog.confirm({
          title: 'Nouveau panier ?',
          message: 'Cet article va remplacer votre ancien panier.',
          okButtonTitle: 'Nouveau',
          cancelButtonTitle: 'Conserver',
        });

        if (value) {
          this.lineItems = [{ product: this.product, variant: this.variant, quantity: 1, vendor }];
          useMainStore().setLineItems(this.lineItems);
        } else {
          console.log('L\'utilisateur a choisi de conserver le panier existant.');
        }
      } catch (error) {
        console.error('Erreur lors de la confirmation :', error);
      }
    },
  }
};
</script>

<style scoped src="../assets/css/category.css"></style>
