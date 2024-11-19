<template>
  <main style="padding: 0px 0px 100px;">
    <div v-if="categories" class="people-section" style="background: white; padding-right: 0px; box-shadow: rgba(0,0,0,0.16) 0px 0px 6px 0px; padding-bottom: 7px;">
      <div class="s1yvqyx7 dir dir-ltr">
        <div class="dir dir-ltr">
          <div class="awuxh4x dir dir-ltr">
            <div class="cw9aemg dir dir-ltr">
              <div class="c14whb16 dir dir-ltr">
                <button @click="goToCategory(category)" v-for="category in categories" :key="category" class="c1l3w0tx dir dir-ltr">
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


    <div v-if="clipsTrending && clipsTrending.length > 0" class="favourite" style="padding-top: 20px; margin-bottom: 20px;">
      <h2 style="font-weight: 500; font-size: 16px; margin-left: 15px;">Tendances 🔥</h2>
      <div class="list_persone" style="display:flex; padding: 0px 5px">
        <div v-for="(clip, index) in clipsTrending" @click="showTrendingClip(index)" style="padding: 0px 5px;">
          <div class="personne">
            <div class="checkout__header" style="z-index: 15; width: 160px; position: absolute; padding: 0.5rem 0px 0px;">
              <div class="checkout__title" style="margin-bottom: 0px; color: white; font-size: 14px; line-height: 26px; text-transform: capitalize; font-weight: 600;"> 
                <img v-if="clip.vendor.user && clip.vendor.user.picture" :src="$cloudinary256x256 + clip.vendor.user.picture" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10000; margin-right: 3px; background: #eeeeee;">
                <img v-else src="/img/anonyme.jpg" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10; margin-right: 3px; background: #eeeeee;">
                {{ clip.vendor.pseudo }}
              </div>
            </div>
            <img v-if="clip.preview" :src="$amazonS3 + clip.preview" style="border-radius: 10px; width: 100%; object-fit: cover; width: 160px; height: 270px; background: #eeeeee;">
            <div v-else style="border-radius: 10px; width: 100%; object-fit: cover; width: 160px; height: 270px; background: #eeeeee;"></div>
            <div style="background-image: linear-gradient(0deg, transparent 80%, rgba(0, 0, 0, 0.25)); border-radius: 10px; height: 270px; position: absolute; z-index: 10; width: 160px; top: 0px;"></div>
          </div>
        </div>
      </div>
    </div>


    <div v-if="productsTrending && productsTrending.length > 0" class="favourite" style="padding-top: 15px; margin-bottom: 20px;">
      <h2 style="font-weight: 500; font-size: 16px; margin-left: 15px;">Top Produits 🛍</h2>
      <div class="list_persone" style="display:flex; padding: 0px 5px">
        <div v-for="product in productsTrending" @click="showProduct(product)" style="padding: 0px 5px;">
          <div class="personne">
            <div>
              <img v-if="product.uploads.length" :src="$cloudinary256x256 + product.uploads[0].filename" style="width: 150px; height: 150px; border-radius: 10px; background: #eeeeee;">
              <img v-else src="/img/no-preview.png" style="width: 150px; height: 150px; border-radius: 10px; background: #eeeeee;">
            </div>
            <div class="shop--item--details" style="width: 150px; padding: 0px; margin-top: 6px; padding-left: 5px;">
              <div class="shop--item--name" style="font-size: 13px; text-align: left;">{{ product.title }}</div>
              <div class="shop--item--price">
                <div class="price" style="font-size: 13px; margin: 0px; font-weight: 500;" :style="[product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]">
                  {{ $formatPrice(product.price) }}€ 
                  <span v-if="product.compareAtPrice" class="last-price" style="margin-left: 3px;">{{ $formatPrice(product.compareAtPrice) }}€ </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- product popup -->
    <div v-if="popupProduct" class="store-products-item__login-popup store-products-item__login-popup--active product-popup">
      <div @click="hideProduct()" style="width: 38px; height: 38px; position: absolute; top: 20px; left: 20px; z-index: 10000;">
        <img src="/img/close-popup.svg" style="width: 38px; height: 38px; filter: drop-shadow(0px 0px 1px #222);"/>
      </div>
      <img v-if="user.length !== 0 && user.favoris.find(favoris => favoris.product.id === product.id)" @click="favoris(product)" src="/img/circle-heart-full.svg" style="width: 35px; height: 35px; position: absolute; top: 40px; top: 22px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222);pointer-events: auto;"/>
      <img v-else @click="favoris(product)" src="/img/circle-heart.svg" style="width: 35px; height: 35px; position: absolute; top: 22px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222);pointer-events: auto;"/>
      <Product :product="product" @selectVariant="selectVariantChild"></Product>
    </div>
    <div v-if="popupProduct" class="product-popup-btn">
      <div class="groups">
        <div v-if="product.quantity > 0" @click="addToCart()" class="btn-swipe btn-checkout">Ajouter</div>
        <div v-else class="btn-swipe btn-checkout" style="color: rgb(170, 170, 170); background: #eff1f6;">Épuisé</div>
      </div>
    </div>
  </main>
</template>

<style scoped src="../assets/css/home.css"></style>

<script>
import Product from '../components/Product.vue';
import { useMainStore } from '../stores/useMainStore.js';

export default {
  name: 'Home',
  components: {
    Product,
  },
  data() {
    const mainStore = useMainStore();

    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: mainStore.getUser,
      lineItems: mainStore.getLineItems,
      categories: mainStore.getCategories,
      results: [],
      clipsTrending: mainStore.getClipsTrending,
      productsTrending: mainStore.getProductsTrending,
      searchFollowing: [],
      popupProduct: false,
      product: null,
      variant: null,
    };
  },
  created() {
    const mainStore = useMainStore();

    this.loadProfile();
    this.loadClipsTrending();
    this.loadProductsTrending();
  },
  methods: {
    async loadProfile() {
      const mainStore = useMainStore();

      if (this.user.length === 0) {
        try {
          const response = await this.$CapacitorHttp.get({
            url: `${this.baseUrl}/user/api/profile`,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.user = response.data;
          mainStore.setUser(userData);
        } catch (error) {
          console.error('Erreur lors de la récupération du profil utilisateur :', error);
        }
      }
    },
    async loadClipsTrending() {
      const mainStore = useMainStore();

      try {
        const response = await this.$CapacitorHttp.get({
          url: `${this.baseUrl}/user/api/clips/trending`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.clipsTrending = response.data;
        mainStore.setClipsTrending(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des clips tendance :', error);
      }
    },
    async loadProductsTrending() {
      const mainStore = useMainStore();

      try {
        const response = await this.$CapacitorHttp.get({
          url: `${this.baseUrl}/user/api/products/trending`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.productsTrending = response.data;
        mainStore.setProductsTrending(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits tendance :', error);
      }
    },
    goToProfile(user) {
      const mainStore = useMainStore();
      this.$Haptics.impact({ style: 'medium' });
      mainStore.setProfile(user);
      this.$router.push({ name: 'Profile', params: { id: user.id } });
    },
    goToCategory(category) {
      this.$Haptics.impact({ style: 'medium' });
      this.$router.push({ name: 'Category', params: { id: category.id } });
    },
    showProduct(product) {
      this.$Haptics.impact({ style: 'medium' });
      this.product = product;
      this.popupProduct = true;
    },
    showLatestClip(index) {
      this.$Haptics.impact({ style: 'medium' });
      this.$router.push({ name: 'Feed', params: { type: 'latest', index } });
    },
    showTrendingClip(index) {
      this.$Haptics.impact({ style: 'medium' });
      this.$router.push({ name: 'Feed', params: { type: 'trending', index } });
    },
    hideProduct() {
      this.popupProduct = false;
      this.product = null;
    },
    async favoris() {
      const mainStore = useMainStore();
      this.$Haptics.impact({ style: 'medium' });

      try {
        const response = await this.$CapacitorHttp.get({
          url: `${this.baseUrl}/user/api/favoris/${this.product.id}`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.user = response.data;
        mainStore.setUser(response.data);
      } catch (error) {
        console.error('Erreur lors de la mise à jour des favoris :', error);
      }
    },
    selectVariantChild(variant) {
      this.variant = variant;
    },
    addToCart() {
      const mainStore = useMainStore();

      this.$Haptics.impact({ style: 'medium' });
      this.popupProduct = false;

      const vendor = typeof this.product.vendor === "object" ? this.product.vendor.id : this.product.vendor;

      if (this.lineItems.length) {
        let exist = false;
        let newVendor = false;

        this.lineItems.forEach((lineItem) => {
          if (lineItem.vendor !== vendor) newVendor = true;
        });

        if (!newVendor) {
          this.lineItems.forEach((lineItem) => {
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
          mainStore.setLineItems(this.lineItems);
        }
      } else {
        this.lineItems.push({ product: this.product, variant: this.variant, quantity: 1, vendor });
        mainStore.setLineItems(this.lineItems);
      }
    },
    async confirmReplaceCart() {
      const mainStore = useMainStore();

      try {
        const { value } = await this.$Dialog.confirm({
          title: 'Nouveau panier ?',
          message: 'Cet article va remplacer votre ancien panier.',
          okButtonTitle: 'Nouveau',
          cancelButtonTitle: 'Conserver',
        });

        if (value) {
          this.lineItems = [
            {
              product: this.product,
              variant: this.variant,
              quantity: 1,
              vendor,
            },
          ];
          mainStore.setLineItems(this.lineItems);
        } else {
          console.log('L\'utilisateur a choisi de conserver le panier existant.');
        }
      } catch (error) {
        console.error('Erreur lors de la confirmation de remplacement du panier :', error);
      }
    },
  }
};
</script>
