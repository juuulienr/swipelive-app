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
                      <img v-if="category.picture" class="i1wps9q8 dir dir-ltr" :src="require(`@/assets/img/` + category.picture)" alt="" width="24" height="24" />
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

    <div v-if="following.length && following.length > 0" class="favourite" style="padding-top: 15px; margin-bottom: 20px;">
    	<h2 style="font-weight: 500; font-size: 16px; margin-left: 15px;">Abonnements</h2>
    	<div class="list_persone" style="display:flex; padding: 0px; padding-left: 5px;">
        <div v-for="(user, index) in following" style="padding: 0px 5px;">
          <div @click="goToProfile(user)">
            <div class="personne">
              <img v-if="user.picture" :src="cloudinary256x256 + user.picture" class="user" style="border: 2px solid #ff2a80; padding: 3px; background: #eeeeee;">
              <img v-else class="user" :src="require(`@/assets/img/anonyme.jpg`)" style="border: 2px solid #ff2a80; padding: 3px; background: #eeeeee;">
              <h5 class="name" style="margin-top: 7px;">{{ user.vendor.businessName }}</h5>
            </div>
          </div>
        </div>
    	</div>
    </div>


    <div v-if="clipsTrending && clipsTrending.length > 0" class="favourite" style="padding-top: 15px; margin-bottom: 20px;">
      <h2 style="font-weight: 500; font-size: 16px; margin-left: 15px;">Tendances 🔥</h2>
      <div class="list_persone" style="display:flex; padding: 0px 5px">
        <div v-for="(clip, index) in clipsTrending" @click="showTrendingClip(index)" style="padding: 0px 5px;">
          <div class="personne">
            <div class="checkout__header" style="z-index: 15; width: 160px; position: absolute; padding: 0.5rem 0px 0px;">
              <div class="checkout__title" style="margin-bottom: 0px; color: white; font-size: 14px; line-height: 26px; text-transform: capitalize; font-weight: 600;"> 
                <img v-if="clip.vendor.user && clip.vendor.user.picture" :src="cloudinary256x256 + clip.vendor.user.picture" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10000; margin-right: 3px; background: #eeeeee;">
                <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10; margin-right: 3px; background: #eeeeee;">
                {{ clip.vendor.businessName }}
              </div>
            </div>
            <img :src="clip.preview" style="border-radius: 10px; width: 100%; object-fit: cover; width: 160px; height: 270px; background: #eeeeee;">
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
              <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="width: 150px; height: 150px; border-radius: 10px; background: #eeeeee;">
              <img v-else :src="require(`@/assets/img/no-preview.png`)" style="width: 150px; height: 150px; border-radius: 10px; background: #eeeeee;">
            </div>
            <div class="shop--item--details" style="width: 150px; padding: 0px; margin-top: 6px; padding-left: 5px;">
              <div class="shop--item--name" style="font-size: 13px; text-align: left;">{{ product.title }}</div>
              <div class="shop--item--price">
                <div class="price" style="font-size: 13px; margin: 0px; font-weight: 500;" :style="[product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]"> {{ product.price | formatPrice }}€ 
                  <span v-if="product.compareAtPrice" class="last-price" style="margin-left: 3px;">{{ product.compareAtPrice | formatPrice }}€ </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <div v-if="clipsLatest && clipsLatest.length > 0" class="favourite" style="padding-top: 15px; margin-bottom: 20px;">
      <h2 style="font-weight: 500; font-size: 16px; margin-left: 15px;">Nouveautés ⭐️</h2>
      <div class="list_persone" style="display:flex; padding: 0px 5px">
        <div v-for="(clip, index) in clipsLatest" @click="showLatestClip(index)" style="padding: 0px 5px;">
          <div class="personne">
            <div class="checkout__header" style="z-index: 15; width: 160px; position: absolute; padding: 0.5rem 0px 0px;">
              <div class="checkout__title" style="margin-bottom: 0px; color: white; font-size: 14px; line-height: 26px; text-transform: capitalize; font-weight: 600;"> 
                <img v-if="clip.vendor.user && clip.vendor.user.picture" :src="cloudinary256x256 + clip.vendor.user.picture" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10000; margin-right: 3px; background: #eeeeee;">
                <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10; margin-right: 3px; background: #eeeeee;">
                {{ clip.vendor.businessName }}
              </div>
            </div>
            <img :src="clip.preview" style="border-radius: 10px; width: 100%; object-fit: cover; width: 160px; height: 270px; background: #eeeeee;">
            <div style="background-image: linear-gradient(0deg, transparent 80%, rgba(0, 0, 0, 0.25)); border-radius: 10px; height: 270px; position: absolute; z-index: 10; width: 160px; top: 0px;"></div>
          </div>
        </div>
      </div>
    </div>




    <!-- product popup -->
    <div v-if="popupProduct" class="store-products-item__login-popup store-products-item__login-popup--active product-popup">
      <div @click="hideProduct()" style="width: 38px; height: 38px; position: absolute; top: 20px; left: 20px; z-index: 10000;">
        <img :src="require(`@/assets/img/close-popup.svg`)" style="width: 38px; height: 38px; filter: drop-shadow(0px 0px 1px #222);"/>
      </div>
      <img v-if="user.length !== 0 && user.favoris.find(favoris => favoris.product.id === product.id)" @click="favoris(product)" :src="require(`@/assets/img/circle-heart-full.svg`)" style="width: 35px; height: 35px; position: absolute; top: 40px; top: 22px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222);pointer-events: auto;"/>
      <img v-else @click="favoris(product)" :src="require(`@/assets/img/circle-heart.svg`)" style="width: 35px; height: 35px; position: absolute; top: 22px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222);pointer-events: auto;"/>
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
import Product from '../components/Product';

export default {
  name: 'Home',
  components: {
    Product,
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: this.$store.getters.getUser,
      lineItems: this.$store.getters.getLineItems,
      categories: this.$store.getters.getCategories,
      clipsTrending: this.$store.getters.getClipsTrending,
      clipsLatest: this.$store.getters.getClipsLatest,
      productsTrending: this.$store.getters.getProductsTrending,
      results: this.$store.getters.getSuggestions,
      following: this.$store.getters.getFollowing,
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      searchFollowing: [],
      popupProduct: false,
      product: null,
      variant: null,
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");

    if (this.user.length == 0) {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/profile", {}, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(JSON.parse(response.data));
        this.user = JSON.parse(response.data);
        this.$store.commit('setUser', JSON.parse(response.data));
        this.loadFollowing();
      }, (error) => {
        console.log(error);
      }); 
    } else {
      this.loadFollowing();
    }

    if (this.$store.getters.getClipsTrending.length == 0) {
      this.loadClipsTrending();
    }

    if (this.$store.getters.getProductsTrending.length == 0) {
      this.loadProductsTrending();
    }

    if (this.$store.getters.getClipsLatest.length == 0) {
      this.loadClipsLatest();
    }
  },
  methods: {
    loadClipsTrending() {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/clips/trending", {}, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(JSON.parse(response.data));
        this.clipsTrending = JSON.parse(response.data);
        this.$store.commit('setClipsTrending', JSON.parse(response.data));
      }, (response) => {
        console.log(response.error);
      });
    },
    loadClipsLatest() {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/clips/latest", {}, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(JSON.parse(response.data));
        this.clipsLatest = JSON.parse(response.data);
        this.$store.commit('setClipsLatest', JSON.parse(response.data));
      }, (response) => {
        console.log(response.error);
      });
    },
    loadProductsTrending() {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/products/trending", {}, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(JSON.parse(response.data));
        this.productsTrending = JSON.parse(response.data);
        this.$store.commit('setProductsTrending', JSON.parse(response.data));
      }, (response) => {
        console.log(response.error);
      });
    },
    loadFollowing() {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/following", {}, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(JSON.parse(response.data));
        this.following = JSON.parse(response.data);
        this.$store.commit('setFollowing', JSON.parse(response.data));
      }, (response) => {
        console.log(response.error);
      });
    },
    goToProfile(user) {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      window.plugins.nativepagetransitions.slide({
        direction: 'left',
        duration: 400,
        iosdelay: 0,
        androiddelay: 0,
        winphonedelay: 0,
        slowdownfactor: 1,
      });
      this.$store.commit('setProfile', user);
      this.$router.push({ name: 'Profile', params: { id: user.id, overlaysWebView: true } });
    },
    goToCategory(category) {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.$router.push({ name: 'Category', params: { id: category.id } });
    },
    showProduct(product) {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.product = product;
      this.popupProduct = true;
    },
    showLatestClip(index) {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      window.plugins.nativepagetransitions.slide({
        direction: 'left',
        duration: 400,
        iosdelay: 0,
        androiddelay: 0,
        winphonedelay: 0,
        slowdownfactor: 1,
      });

      this.$router.push({ name: 'Feed', params: { type: 'latest', index: index } });
    },
    showTrendingClip(index) {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      
      window.plugins.nativepagetransitions.slide({
        direction: 'left',
        duration: 400,
        iosdelay: 0,
        androiddelay: 0,
        winphonedelay: 0,
        slowdownfactor: 1,
      });

      this.$router.push({ name: 'Feed', params: { type: 'trending', index: index } });
    },
    hideProduct() {
      this.popupProduct = false;
      this.product = null;
    },
    favoris() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/favoris/" + this.product.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
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
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
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
    },
  }
};

</script>

