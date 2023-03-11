<template>
  <main class="my_profile1" style="padding: 0px;">
    <div class="checkout__header" style="padding: 5px 15px 15px 12px;">
      <div @click="goBack()" class="checkout__close-btn" style="top: 47px;">
        <img :src="require(`@/assets/img/arrow-left.svg`)" style="width: 28px; height: 28px;"/>
      </div>
      <div class="checkout__title"></div>
      <div @click="actionSheet()" class="checkout__right-btn" style="top: 45px;">
        <img :src="require(`@/assets/img/ellipsis-h.svg`)" style="width: 28px; height: 28px;"/>
        <div v-if="profile && profile.vendor" @click="goToMessage(profile)" style="width: 28px; height: 28px; position: absolute; top: 115px; right: 0px;">
          <img :src="require(`@/assets/img/comment-dots.svg`)"/>
        </div>
      </div>
    </div>

    <img :src="require(`@/assets/img/bg-profil.png`)" style="width: 100%; margin-top: -27px; height: 190px;">
    <div v-if="profile && profile.vendor" style="padding: 0px; text-align: center; margin-top: -95px;">
      <div>
        <img v-if="profile.picture" :src="cloudinary256x256 + profile.picture" class="user" style="margin: 5px; width: 100px; border-radius: 50%; border: 7px solid white; height: 100px; box-shadow: rgb(0 0 0 / 12%) 0px 0px 6px 0px;">
        <img v-else :src="require(`@/assets/img/anonyme.jpg`)" class="user" style="margin: 5px; width: 100px; border-radius: 50%; border: 7px solid white; height: 100px; box-shadow: rgb(0 0 0 / 12%) 0px 0px 6px 0px;">
        <div v-if="profile.followers" @click="updateFollow()" style="margin-top: -40px; margin-left: 65px;border-radius: 50px;border: 2px solid white;">
          <img v-if="!following" :src="require(`@/assets/img/plus-circle.svg`)" style="width: 35px; height: 35px; border: 1px solid white; background: white; border-radius: 100px; pointer-events: auto;"/>
          <img v-else :src="require(`@/assets/img/check-circle.svg`)" style="width: 35px; height: 35px; border: 1px solid white; background: white; border-radius: 100px; pointer-events: auto;"/>
        </div>
        <div style="margin-top: 7px;">
          <span style="font-size: 20px; font-weight: 500;">{{ profile.vendor.businessName }}
            <img v-if="profile.vendor.businessType == 'company'" :src="require(`@/assets/img/verified.svg`)" style="width: 19px; height: 19px; margin-bottom: 4px;"/>
          </span>
          <div>
            <span v-if="profile.followers.length > 1" style="font-weight: 400">{{ profile.followers.length }} abonnés</span>
            <span v-else style="font-weight: 400">{{ profile.followers.length }} abonné</span>
          </div>
        </div>

        <p class="desc" style="margin: 20px 30px; text-align: center;">{{ profile.vendor.summary }}</p>
        <div class="images_filter" style="padding: 10px; background-color: white; z-index: 1000000;">
          <ul>
            <li @click="showLive()" v-bind:class="{active: live}"  :style="[live ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]" style="font-weight: 600;">Vidéos</li>
            <li @click="showShop()" v-bind:class="{active: shop}"  :style="[shop ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">Boutique</li>
          </ul>
        </div>

        <div class="images_sec" style="padding: 0px 10px;">
          <div v-if="live" class="images" style="margin-bottom: 30px;">
            <div v-if="profile && profile.vendor.clips" class="row">
              <div v-for="(clip, index) in profile.vendor.clips" v-if="clip.status == 'available'" class="col-6 col-img">
                <div @click="goToFeed(index)">
                  <img :src="clip.preview" style="border-radius: 10px; width: 100%; object-fit: cover; background: #eeeeee;">
                  <div style="background-image: linear-gradient(180deg, transparent 80%, rgba(0, 0, 0, 0.25)); border-radius: 10px; height: 300px; position: absolute; z-index: 10; width: calc(100% - 10px); bottom: 5px;"></div>
                  <div class="product--item" style="flex-direction: row;position: absolute;bottom: 15px;z-index: 10000000;left: calc(25vw - 27.5px);">
                    <img v-if="clip.product.uploads.length" :src="cloudinary256x256 + clip.product.uploads[0].filename" style="line-height: 0;display: block;border-radius: 10px;width: 48px;height: 48px;box-shadow: 0 0 5px rgb(0 0 0 / 20%); border: 2px solid white; background: #eeeeee;">
                    <img v-else :src="require(`@/assets/img/no-preview.png`)" style="line-height: 0;display: block;border-radius: 10px;width: 48px;height: 48px;box-shadow: 0 0 5px rgb(0 0 0 / 20%); border: 2px solid white; background: #eeeeee;">
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="loading" class="row">
              <div v-for="i in 6" class="col-6 col-img">
                <div style="border-radius: 10px; width: 100%; height: 300px; background: #eeeeee;"></div>
              </div>
            </div>
            <div v-else class="row">
              <div class="container" style="margin: 120px auto 0px; text-align: center;">
                <div style="margin: 0px auto;">
                  <Lottie :options="defaultOptions" :width="200"/>
                </div>
              </div>
              <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun clips</h5>
            </div>
          </div>

          <div v-if="shop" class="items" style="padding: 5px;">
            <div v-if="profile && profile.vendor.products" class="shop--part" style="gap: 20px 10px; margin-bottom: 30px;">
              <div v-for="product in profile.vendor.products" @click="showProduct(product)" class="shop--box">
                <div>
                  <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="width: 100%; border-radius: 10px; background: #eeeeee;">
                  <img v-else :src="require(`@/assets/img/no-preview.png`)" style="width: 100%; border-radius: 10px;">
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
            <div v-else>
              <div class="container" style="margin: 120px auto 0px; text-align: center;">
                <div style="margin: 0px auto;">
                  <Lottie :options="defaultOptions2" style="width:100%"/>
                </div>
              </div>
              <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun produit</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- product popup -->
    <div v-if="popupProduct" class="store-products-item__login-popup store-products-item__login-popup--active product-popup">
      <div @click="hideProduct()" style="width: 38px; height: 38px; position: absolute; top: 20px; left: 20px; z-index: 10000;">
        <img :src="require(`@/assets/img/close-popup.svg`)" style="width: 38px; height: 38px; filter: drop-shadow(0px 0px 1px #222);"/>
      </div>
      <img v-if="user.favoris.find(favoris => favoris.product.id === product.id)" @click="favoris(product)" :src="require(`@/assets/img/circle-heart-full.svg`)" style="width: 35px; height: 35px; position: absolute; top: 40px; top: 22px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222); pointer-events: auto;"/>
      <img v-else @click="favoris(product)" :src="require(`@/assets/img/circle-heart.svg`)" style="width: 35px; height: 35px; position: absolute; top: 22px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222); pointer-events: auto;"/>
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
  
import Product from '../components/Product';
import Lottie from 'vue-lottie';
import * as animationData2 from '../assets/lottie/no-product.json';
import * as animationData from '../assets/lottie/replay.json';


export default {
  name: 'Profile',
  components: {
    Product,
    Lottie
  },
  data() {
    return {
      id: this.$route.params.id,
      user: this.$store.getters.getUser,
      lineItems: this.$store.getters.getLineItems,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      profile: this.$store.getters.getProfile,
      defaultOptions: {animationData: animationData},
      defaultOptions2: {animationData: animationData2},
      live: true,
      shop: false,
      following: false,
      loading: false,
      popupProduct: false,
      product: null,
      variant: null,
    }
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {
    window.StatusBar.styleDefault();
    window.StatusBar.overlaysWebView(true);
    
    var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
    window.cordova.plugin.http.get(this.baseUrl + "/api/profile/" + this.id, {}, httpHeader, (response) => {
      console.log(JSON.parse(response.data));
      this.profile = JSON.parse(response.data);
      this.getFollowers();
    }, (response) => {
      console.log(response.error);
    });

    window.cordova.plugin.http.get(this.baseUrl + "/api/profile/" + this.id + "/clips", {}, null, (response) => {
     this.$store.commit('setClipsProfile', JSON.parse(response.data));
    }, (response) => {
      console.log(response.error);
    });

  },
  methods: {
    getFollowers() {
      if (this.profile && this.profile.followers) {
        this.profile.followers.map((follower, index) => {
          this.user.following.map((following, index) => {
            if (follower.id == following.id) {
              this.following = true;
            }
          });
        });
      }
    },
    showShop() {
      this.shop = true;
      this.live = false;
    }, 
    showLive() {
      this.shop = false;
      this.live = true;
    },
    updateFollow() {
      this.loading = true;
      if (this.following == true) {
        this.following = false;
      } else {
        this.following = true;
      }

      window.cordova.plugin.http.get(this.baseUrl + "/user/api/follow/" + this.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.$store.commit('setUser', JSON.parse(response.data));
        this.loading = false;
      }, (response) => {
        console.log(response.error);
        this.loading = false;
      });
    },
    actionSheet() {
      var buttonLabels = [ 'Partager', 'Silencieux', 'Signaler'];
      var options = {
        buttonLabels: buttonLabels,
        addCancelButtonWithLabel: 'Annuler',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };

      window.plugins.actionsheet.show(options, (index) => {
        console.log(index);
        if (index == 1) {
          window.plugins.socialsharing.share('#1 Application de Live Shopping', null, null, 'https://swipelive.fr');
        } else if (index == 2) {
          // mettre en silencieux
        } else if (index == 3) {
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
      var exist = false;
      this.user.discussions.map((discussion, index) => {
        if (discussion.vendor.id == user.id) {
          exist = true;
          this.$router.push({ name: 'ListMessages', params: { discussionId: discussion.id } });
        }
      });

      if (!exist) {
        this.$router.push({ name: 'ListMessages', params: { userId: user.id, picture: user.picture, businessName: user.vendor.businessName } });
      }
    },
    goToFeed(index) {
      this.$router.push({ name: 'Feed', params: { type: 'profile', index: index, profileId: this.profile.id } });
    },
    showProduct(product) {
      window.StatusBar.overlaysWebView(false);  
      window.StatusBar.styleDefault();
      window.StatusBar.backgroundColorByHexString("#ffffff");
      this.product = product;
      this.popupProduct = true;
    },
    hideProduct() {
      window.StatusBar.styleDefault();
      window.StatusBar.overlaysWebView(true);
      this.popupProduct = false;
      this.product = null;
    },
    favoris(product) {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/favoris/" + product.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.user = JSON.parse(response.data);
        this.$store.commit('setUser', JSON.parse(response.data));
      }, (response) => {
        console.log(response.error);
      });
    },
    selectVariantChild(variant) {
      console.log(variant);
      this.variant = variant;
    },
    addToCart() {
      this.popupProduct = false;

      if (typeof this.product.vendor == "object") {
        var vendor = this.product.vendor.id;
      } else {
        var vendor = this.product.vendor;
      } 

      if (this.lineItems.length) {
        var exist = false;
        var newVendor = false;

        this.lineItems.map(lineItem => {
          if (lineItem.vendor != vendor) {
            newVendor = true;
          }
        });

        if (newVendor == false) {
          this.lineItems.map(lineItem => {
            if (lineItem.variant && this.variant && (lineItem.variant.id == this.variant.id)) {
              exist = true;
              lineItem.quantity += 1;
            } else if (lineItem.product.id == this.product.id) {
              if (!this.variant) {
                exist = true;
                lineItem.quantity += 1;
              }
            }
          });
        } else {
          exist = true;
          navigator.notification.confirm(
            'Ce article va remplacer votre ancien panier',
            (buttonIndex) => {
              if (window.cordova.platformId == "browser") {
                var id = 1;
              } else {
                var id = 2;
              }
              if (buttonIndex == id) {
                this.lineItems = [];
                this.lineItems.push({ "product": this.product, "variant": this.variant, "quantity": 1, "vendor": vendor });
                this.$store.commit('setLineItems', this.lineItems);
                this.$root.$children[0].updateLineItems();
              }
            },   
            'Nouveau panier ?', 
            ['Conserver','Nouveau'] 
          );
        }

        if (!exist) {
          this.lineItems.push({ "product": this.product, "variant": this.variant, "quantity": 1, "vendor": vendor  });
          this.$store.commit('setLineItems', this.lineItems);
        }
      } else {
        this.lineItems.push({ "product": this.product, "variant": this.variant, "quantity": 1, "vendor": vendor  });
        this.$store.commit('setLineItems', this.lineItems);
      }
    }
  }
};

</script>

