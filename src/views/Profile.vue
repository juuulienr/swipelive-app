<template>
  <main class="my_profile1" style="padding: 0px;">
    <div class="checkout__header" style="padding: 5px 15px 15px 12px;">
      <div @click="goBack()" class="checkout__close-btn" style="top: 47px;">
        <img :src="require(`@/assets/img/arrow-left.svg`)" style="width: 28px; height: 28px;"/>
      </div>
      <div class="checkout__title"></div>
      <div @click="actionSheet()" class="checkout__right-btn" style="top: 45px;">
        <img :src="require(`@/assets/img/ellipsis-h.svg`)" style="width: 28px; height: 28px;"/>
        <img v-if="profile && profile.vendor" @click="goToMessage(profile)" :src="require(`@/assets/img/comment-dots.svg`)" style="width: 28px; height: 28px; position: absolute; right: 0px; top: 118px;"/>
      </div>
    </div>


    <img :src="require(`@/assets/img/bg-profil.png`)" style="width: 100%; margin-top: -27px; height: 190px;">
    <div v-if="profile && profile.vendor" style="padding: 0px; text-align: center; margin-top: -60px;">
      <div>
        <img v-if="profile.picture" :src="cloudinary256x256 + profile.picture" class="user" style="margin: 5px; width: 100px; border-radius: 50%; border: 7px solid white; height: 100px; box-shadow: rgb(0 0 0 / 12%) 0px 0px 6px 0px;">
        <img v-else :src="require(`@/assets/img/anonyme.jpg`)" class="user" style="margin: 5px; width: 100px; border-radius: 50%; border: 7px solid white; height: 100px; box-shadow: rgb(0 0 0 / 12%) 0px 0px 6px 0px;">
        <div style="margin-top: -40px; margin-left: 65px;border-radius: 50px;border: 2px solid white;">
          <img v-if="!following" @click="updateFollow()" :src="require(`@/assets/img/plus-circle.svg`)" style="width: 35px; height: 35px; border: 1px solid white; background: white; border-radius: 100px;"/>
          <img v-else @click="updateFollow()" :src="require(`@/assets/img/check-circle.svg`)" style="width: 35px; height: 35px; border: 1px solid white; background: white; border-radius: 100px;"/>
        </div>
        <div style="margin-top: 7px;">
          <span style="font-size: 20px; font-weight: 500;">{{ profile.vendor.businessName }}
            <img v-if="profile.vendor.businessType == 'company'" :src="require(`@/assets/img/verified.svg`)" style="width: 19px; height: 19px; margin-bottom: 4px;"/>
          </span>
          <div>
            <span style="font-weight: 400">{{ followers }} abonnés</span>
          </div>
        </div>

        <p class="desc" style="margin: 10px 30px 20px; font-weight: 400; font-size: 14px; color: #1F1D2B; text-align: center;">{{ profile.vendor.summary }}</p>
        <div class="images_filter" style="padding: 10px; background-color: white; z-index: 1000000;">
          <ul>
            <li @click="showLive()" v-bind:class="{active: live}"  :style="[live ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]" style="font-weight: 600;">Vidéos</li>
            <li @click="showShop()" v-bind:class="{active: shop}"  :style="[shop ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">Boutique</li>
          </ul>
        </div>

        <div class="images_sec" style="padding: 0px 10px;">
          <div v-if="live" class="images" style="margin-bottom: 30px;">
            <div v-if="profile" class="row">
              <div v-for="(clip, index) in profile.vendor.clips" class="col-6 col-img">
                <router-link v-if="clip.status == 'available'" :to="{ name: 'Feed', params: { type: 'profile', index: index, profileId: profile.id }}">
                  <img :src="clip.preview" style="border-radius: 10px; width: 100%; object-fit: cover;">
                </router-link>
              </div>
            </div>
          </div>

          <div v-if="shop" class="items" style="padding: 5px;">
            <div v-if="profile && profile.vendor.products" class="shop--part" style="gap: 20px 10px; margin-bottom: 30px;">
              <div v-if="product.archived == false" v-for="product in profile.vendor.products" @click="showProduct(product)" class="shop--box">
                <div>
                  <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="width: 100%; border-radius: 10px;">
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
          </div>
        </div>
      </div>
    </div>

    <!-- product popup -->
    <div v-if="popupProduct" class="store-products-item__login-popup store-products-item__login-popup--active product-popup">
      <img @click="hideProduct()" :src="require(`@/assets/img/close-popup.svg`)" style="width: 38px; height: 38px; position: absolute; top: 20px; left: 20px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222);"/>
      <img v-if="user.favoris.find(favoris => favoris.product.id === product.id)" @click="favoris(product)" :src="require(`@/assets/img/circle-heart-full.svg`)" style="width: 35px; height: 35px; position: absolute; top: 40px; top: 22px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222);"/>
      <img v-else @click="favoris(product)" :src="require(`@/assets/img/circle-heart.svg`)" style="width: 35px; height: 35px; position: absolute; top: 22px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222);"/>
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

export default {
  name: 'Profile',
  components: {
    Product
  },
  data() {
    return {
      id: this.$route.params.id,
      live: true,
      shop: false,
      following: false,
      loading: false,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: this.$store.getters.getUser,
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      popupProduct: false,
      profile: null,
      notif: true,
      followers: null,
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
      this.profile = JSON.parse(response.data);
      this.followers = this.profile.followers.length;
      
      if (this.profile.followers && this.user) {
        this.profile.followers.map((follower, index) => {
          this.user.following.map((following, index) => {
            if (follower.id == following.id) {
              this.following = true;
              this.notif = true;
            }
          });
        });
      }
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    showShop() {
      this.shop = true;
      this.live = false;
    }, 
    showLive() {
      this.shop = false;
      this.live = true;
    },
    updateFollow() {
      if (this.user && this.token) {
        this.loading = true;
        if (this.following == true) {
          this.following = false;
          this.followers--;
        } else {
          this.following = true;
          this.followers++;
        }

        window.cordova.plugin.http.get(this.baseUrl + "/user/api/follow/" + this.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
          this.$store.commit('setUser', JSON.parse(response.data));
          this.loading = false;
        }, (response) => {
          console.log(response.error);
          this.loading = false;
        });
      } else {
        this.$router.push({ name: 'Welcome' });
      }
    },
    notifOff() {
      this.notif = false;
    },
    notifOn() {
      this.notif = true;
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
          window.plugins.toast.show("L'utilisateur a été signalé !", 'long', 'top', {}, {});
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
    },
    addToCart() {
      this.popupProduct = false;
    }
  }
};

</script>

