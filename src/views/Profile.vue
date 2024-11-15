<template>
  <main class="my_profile1" style="padding: 0px;">
    <div class="checkout__header" style="padding: 5px 15px 15px 12px;">
      <div @click="goBack()" class="checkout__close-btn" style="top: 7px;">
        <img src="/img/arrow-left.svg" style="width: 28px; height: 28px;"/>
      </div>
      <div class="checkout__title"></div>
      <div @click="actionSheet()" class="checkout__right-btn" style="top: 5px;">
        <img src="/img/ellipsis-h.svg" style="width: 28px; height: 28px;"/>
      </div>
      <div v-if="profile && profile.vendor" @click="goToMessage(profile)" style="width: 28px; height: 28px; position: absolute; top: 160px; right: 15px;">
        <img src="/img/comment-dots.svg"/>
      </div>
    </div>

    <img src="/img/bg-profil.png" style="width: 100%; margin-top: -27px; height: 190px;">
    <div v-if="profile && profile.vendor" style="padding: 0px; text-align: center; margin-top: -95px;">
      <div>
        <img v-if="profile.picture" :src="$cloudinary256x256 + profile.picture" class="user" style="margin: 5px; width: 100px; border-radius: 50%; border: 7px solid white; height: 100px; box-shadow: rgb(0 0 0 / 12%) 0px 0px 6px 0px;">
        <img v-else src="/img/anonyme.jpg" class="user" style="margin: 5px; width: 100px; border-radius: 50%; border: 7px solid white; height: 100px; box-shadow: rgb(0 0 0 / 12%) 0px 0px 6px 0px;">
        <div v-if="profile.followers && following != null" @click="updateFollow()" style="margin-top: -40px; margin-left: 65px;border-radius: 50px;border: 2px solid white;">
          <img v-if="!following" src="/img/plus-circle.svg" style="width: 35px; height: 35px; border: 1px solid white; background: white; border-radius: 100px; pointer-events: auto;"/>
          <img v-else src="/img/check-circle.svg" style="width: 35px; height: 35px; border: 1px solid white; background: white; border-radius: 100px; pointer-events: auto;"/>
        </div>
        <div style="margin-top: 7px;">
          <span style="font-size: 20px; font-weight: 500;">{{ profile.vendor.pseudo }}
            <img v-if="profile.vendor.businessType == 'company'" src="/img/verified.svg" style="width: 19px; height: 19px; margin-bottom: 4px;"/>
          </span>
          <div>
            <span v-if="profile.followers.length > 1" style="font-weight: 400">{{ followers }} abonnés</span>
            <span v-else style="font-weight: 400">{{ followers }} abonné</span>
          </div>
        </div>

        <p class="desc" style="margin: 20px 30px; text-align: center;">{{ profile.vendor.summary }}</p>
        <div class="images_filter" style="padding: 10px; background-color: white; z-index: 1000000;">
          <ul>
            <li @click="showLive()" v-bind:class="{active: live}"  :style="[live ? {'color': '#ff2f80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]" style="font-weight: 600;">Vidéos</li>
            <li @click="showShop()" v-bind:class="{active: shop}"  :style="[shop ? {'color': '#ff2f80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">Boutique</li>
          </ul>
        </div>

        <div class="images_sec" style="padding: 0px 10px;">
          <div v-if="live" class="images" style="margin-bottom: 30px;">
            <template v-if="clips.length">
              <div class="row">
                <template v-for="(clip, index) in clips" :key="index">
                  <div v-if="clip.status == 'available'" class="col-6 col-img">
                    <div @click="goToFeed(index)">
                      <img
                        v-if="clip.preview"
                        :src="$amazonS3 + clip.preview"
                        style="border-radius: 10px; width: 100%; object-fit: cover; background: #eeeeee; height: 300px;"
                      >
                      <div v-else style="border-radius: 10px; width: 100%; object-fit: cover; background: #eeeeee; height: 300px;"></div>
                      <div style="background-image: linear-gradient(180deg, transparent 80%, rgba(0, 0, 0, 0.25)); border-radius: 10px; height: 300px; position: absolute; z-index: 10; width: calc(100% - 10px); bottom: 5px;"></div>
                      <div class="product--item" style="flex-direction: row; position: absolute; bottom: 15px; z-index: 10000000; left: calc(25vw - 27.5px);">
                        <img
                          v-if="clip.product.uploads.length"
                          :src="$cloudinary256x256 + clip.product.uploads[0].filename"
                          style="line-height: 0; display: block; border-radius: 10px; width: 48px; height: 48px; border: 1px solid #ddd !important; background: #eeeeee;"
                        >
                        <img
                          v-else
                          src="/img/no-preview.png"
                          style="line-height: 0; display: block; border-radius: 10px; width: 48px; height: 48px; border: 1px solid #ddd !important; background: #eeeeee;"
                        >
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </template>

            <template v-else-if="loadingClips">
              <div class="loader2">
                <span></span>
              </div>
            </template>

            <template v-else>
              <div class="row">
                <div class="container" style="margin: 120px auto 0px; text-align: center;">
                  <div style="margin: 0px auto;">
                    <Vue3Lottie :options="LottieJSON" :width="200" />
                  </div>
                  <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun clips</h5>
                </div>
              </div>
            </template>
          </div>


          <div v-if="shop" class="items" style="padding: 5px;">
            <div v-if="products.length" class="shop--part" style="gap: 20px 10px; margin-bottom: 30px;">
              <div v-for="product in products" @click="showProduct(product)" class="shop--box">
                <div>
                  <img v-if="product.uploads.length" :src="$cloudinary256x256 + product.uploads[0].filename" style="width: 100%; border-radius: 10px; background: #eeeeee;">
                  <img v-else src="/img/no-preview.png" style="width: 100%; border-radius: 10px;">
                </div>
                <div class="shop--item--details" style="width: 100%; padding: 0px; margin-top: 6px; padding-left: 5px;">
                  <div class="shop--item--name" style="font-size: 13px; text-align: left;">{{ product.title }}</div>
                  <div class="shop--item--price">
                    <div class="price" style="font-size: 13px; margin: 0px; font-weight: 500" :style="[product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]"> {{ product.price | formatPrice }}€
                      <span v-if="product.compareAtPrice" class="last-price" style="margin-left: 3px;">{{ product.compareAtPrice | formatPrice }}€ </span>
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
                  <Vue3Lottie :options="LottieJSON2" style="width:100%"/>
                </div>
                <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun produit</h5>
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
      <img v-if="user.favoris.find(favoris => favoris.product.id === product.id)" @click="favoris(product)" src="/img/circle-heart-full.svg" style="width: 35px; height: 35px; position: absolute; top: 40px; top: 22px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222); pointer-events: auto;"/>
      <img v-else @click="favoris(product)" src="/img/circle-heart.svg" style="width: 35px; height: 35px; position: absolute; top: 22px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222); pointer-events: auto;"/>
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


<style scoped src="../assets/css/profile.css"></style>

<script>
import { useMainStore } from '../stores/useMainStore';
import Product from '../components/Product.vue';
import LottieJSON from '../assets/lottie/replay.json';
import LottieJSON2 from '../assets/lottie/no-product.json';

export default {
  name: 'Profile',
  components: {
    Product,
  },
  data() {
    const mainStore = useMainStore();
    
    return {
      id: this.$route.params.id,
      user: mainStore.getUser,
      profile: null,
      lineItems: mainStore.getLineItems,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      LottieJSON: LottieJSON,
      LottieJSON2: LottieJSON2,
      clips: [],
      products: [],
      popupProduct: false,
      loadingProfile: true,
      loadingClips: true,
      loadingProducts: true,
      live: true,
      shop: false,
      following: null,
      followers: 0,
      product: null,
      variant: null,
    };
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {
    this.getFollowers();
    
    window.cordova.plugin.http.get(this.baseUrl + "/api/profile/" + this.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
      this.profile = JSON.parse(response.data);
      this.loadingProfile = false;
    }, (response) => {
      console.log(response.error);
    });

    window.cordova.plugin.http.get(this.baseUrl + "/api/profile/" + this.id + "/clips", {}, { Authorization: "Bearer " + this.token }, (response) => {
      this.clips = JSON.parse(response.data);
      this.loadingClips = false;
    }, (response) => {
      console.log(response.error);
    });

    window.cordova.plugin.http.get(this.baseUrl + "/api/profile/" + this.id + "/products", {}, { Authorization: "Bearer " + this.token }, (response) => {
      this.products = JSON.parse(response.data);
      this.loadingProducts = false;
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    getFollowers() {
      if (this.profile && this.profile.followers) {
        this.following = false;
        this.followers = this.profile.followers.length;
        this.profile.followers.map((follower) => {
          this.user.following.map((following) => {
            if (follower.id === following.id) {
              this.following = true;
            }
          });
        });
      }
    },
    showShop() {
      this.$Haptics.impact({ style: 'medium' });
      this.shop = true;
      this.live = false;
    },
    showLive() {
      this.$Haptics.impact({ style: 'medium' });
      this.shop = false;
      this.live = true;
    },
    updateFollow() {
      const mainStore = useMainStore();
      this.following = !this.following;
      this.followers += this.following ? 1 : -1;

      window.cordova.plugin.http.get(this.baseUrl + "/user/api/follow/" + this.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        mainStore.setUser(JSON.parse(response.data));
      }, (response) => {
        console.log(response.error);
      });
    },
    actionSheet() {
      const buttonLabels = ['Partager', 'Silencieux', 'Signaler'];
      const options = {
        buttonLabels,
        addCancelButtonWithLabel: 'Annuler',
        androidEnableCancelButton: true,
        winphoneEnableCancelButton: true,
      };

      window.plugins.actionsheet.show(options, (index) => {
        if (index === 1) {
          window.plugins.socialsharing.share('#1 Application de Live Shopping', null, null, 'https://swipelive.app');
        } else if (index === 3) {
          window.plugins.toast.show("L'utilisateur a été signalé !", 'long', 'top');
        }
      }, (error) => {
        console.log(error);
      });
    },
    goBack() {
      this.$router.back();
    },
    goToMessage(user) {
      this.$Haptics.impact({ style: 'medium' });
      this.$router.push({ name: 'ListMessages', params: { userId: user.id, picture: user.picture, pseudo: user.vendor.pseudo } });
    },
    goToFeed(index) {
      this.$router.push({ name: 'Feed', params: { type: 'profile', index, profileId: this.profile.id } });
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
    favoris(product) {
      const mainStore = useMainStore();
      this.$Haptics.impact({ style: 'medium' });
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/favoris/" + product.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        mainStore.setUser(JSON.parse(response.data));
      }, (response) => {
        console.log(response.error);
      });
    },
    selectVariantChild(variant) {
      this.variant = variant;
    },
    addToCart() {
      const mainStore = useMainStore();
      this.$Haptics.impact({ style: 'medium' });
      this.popupProduct = false;

      const vendor = typeof this.product.vendor === "object" ? this.product.vendor.id : this.product.vendor;
      let exist = false;
      let newVendor = false;

      this.lineItems.forEach((lineItem) => {
        if (lineItem.vendor !== vendor) {
          newVendor = true;
        }
      });

      if (!newVendor) {
        this.lineItems.forEach((lineItem) => {
          if (lineItem.variant?.id === this.variant?.id || lineItem.product.id === this.product.id && !this.variant) {
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
    },
    async confirmReplaceCart(vendor) {
      const mainStore = useMainStore();

      try {
        const { value } = await this.$Dialog.confirm({
          title: 'Nouveau panier ?',
          message: 'Ce article va remplacer votre ancien panier.',
          okButtonTitle: 'Nouveau',
          cancelButtonTitle: 'Conserver',
        });

        if (value) {
          mainStore.setLineItems([
            {
              product: this.product,
              variant: this.variant,
              quantity: 1,
              vendor,
            },
          ]);
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
