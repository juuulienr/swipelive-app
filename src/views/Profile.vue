<template>
  <main v-touch:swipe.right="swipeHandler" class="my_profile1" style="padding: 0px;">
    <div class="checkout__header" style="padding: 5px 15px 15px 12px;">
      <div @click="goBack()" class="checkout__close-btn" style="top: 10px;">
        <img :src="require(`@/assets/img/arrow-left.svg`)" style="width: 28px; height: 28px;"/>
      </div>
      <div class="checkout__title"></div>
      <div @click="actionSheet()" class="checkout__right-btn" style="top: 8px;">
        <img :src="require(`@/assets/img/ellipsis-h.svg`)" style="width: 28px; height: 28px;"/>
        <img v-if="profile && profile.vendor" @click="goToMessage(profile)" :src="require(`@/assets/img/comment-dots.svg`)" style="width: 28px; height: 28px; position: absolute; right: 0px; top: 118px;"/>
      </div>
    </div>


    <img :src="require(`@/assets/img/bg-profil.png`)" style="width: 100%; margin-top: -27px;">
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
        <div class="images_filter" style="padding: 10px; position: sticky; background-color: white; top: 0px; z-index: 1000000;">
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
            <div v-if="profile && profile.vendor.products" class="shop--part" style="gap: 20px 10px;">
              <div v-if="product.archived == false" v-for="product in profile.vendor.products" @click="showProduct(product)" class="shop--box">
                <div>
                  <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="width: 100%; border-radius: 10px;">
                  <img v-else :src="require(`@/assets/img/no-preview.png`)" style="width: 100%; border-radius: 10px;">
                </div>
                <div class="shop--item--details" style="width: 100%; padding: 0px; margin-top: 6px; padding-left: 5px;">
                  <div class="shop--item--name" style="font-size: 13px; text-align: left;">{{ product.title }}</div>
                  <div class="shop--item--price">
                    <div class="price" style="font-size: 12px; margin: 0px;" :style="[product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]"> {{ product.price | formatPrice }}€
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
      <div @click="hideProduct()" style="display: flex;">
        <div class="scroll-indicator" style="margin: 15px auto 0px;"></div>
      </div>
      <svg v-if="user.favoris.find(favoris => favoris.product.id === product.id)" @click="favoris(product)" xmlns="http://www.w3.org/2000/svg" class="heart-svg" style="top: 45px;filter: drop-shadow(0px 0px 1px #222);">
        <g transform="matrix( 1 0 0 1 1 3 )">
          <path d="M16 0C13.8 0 12.2 1.2 11 2.5C9.8 1.3 8.2 0 6 0C2.5 0 0 2.9 0 6.5C0 8.3 0.7 9.9 2 11L11 19.5L20 11C21.2 9.8 22 8.3 22 6.5C22 2.9 19.5 0 16 0Z" fill="#FFFFFF"></path>
        </g>
      </svg>
      <svg v-else @click="favoris(product)" xmlns="http://www.w3.org/2000/svg" class="heart-svg" style="top: 45px;filter: drop-shadow(0px 0px 1px #222);">
        <g transform="matrix( 1 0 0 1 1 2 )">
          <path d="M15 3C17.5 3 19 4.90001 19 7.20001C19 8.40001 18.4 9.49999 17.7 10.3C16.5 11.5 11 16 11 16C11 16 5.50005 11.5 4.30005 10.3C3.50005 9.49999 3 8.40001 3 7.20001C3 4.90001 4.5 3 7 3C8.7 3 10.3 4.6 11 6C11.7 4.6 13.3 3 15 3ZM15 0C13.5 0 12.1 0.599994 11 1.39999C9.9 0.499994 8.5 0 7 0C3 0 0 3.10001 0 7.20001C0 9.10001 0.799951 10.9 2.19995 12.4C3.59995 13.9 11 19.9 11 19.9C11 19.9 18.4 13.9 19.8 12.4C21.2 10.9 22 9.10001 22 7.20001C22 3.10001 19 0 15 0Z" fill="#FFFFFF" style="fill: white;"></path>
        </g>
      </svg>
      <Product :product="product" @selectVariant="selectVariantChild"></Product>
    </div>
    <div v-if="popupProduct" class="product-popup-btn">
      <div class="groups">
        <div @click="addToCart()" class="btn-swipe btn-checkout">Ajouter</div>
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
      user: JSON.parse(window.localStorage.getItem("user")),
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
    window.StatusBar.overlaysWebView(false);  
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");

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
    swipeHandler (dir) {
      if (dir == "right") {
        this.$router.push({ name: 'Feed' });
      }
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
          window.localStorage.setItem("user", response.data);
          this.loading = false;
        }, (response) => {
          console.log(response.error);
          this.loading = false;
        });
      } else {
        this.$router.push({ name: 'Welcome' });
      }
    },
    goProduct(id) {
      this.$router.push({ name: 'Product', params: { id: id } });
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
      this.product = product;
      this.popupProduct = true;
    },
    hideProduct() {
      this.popupProduct = false;
      this.product = null;
    },
    favoris(product) { 
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/favoris/" + product.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.user = JSON.parse(response.data);
        window.localStorage.setItem("user", response.data);
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

