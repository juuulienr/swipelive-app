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

    <div class="favourite" style="padding-top: 15px; margin-bottom: 20px;">
    	<h2 style="font-weight: 500; font-size: 16px; margin-left: 15px;">Abonnements</h2>
    	<div class="list_persone" style="display:flex; padding: 0px; padding-left: 5px;">
    		<div @click="addFollowing()" style="padding: 0px 5px;">
  				<div class="personne">
  					<img class="user" :src="require(`@/assets/img/add-follow.png`)">
  					<h5 class="name" style="margin-top: 7px;">Rechercher</h5>
  				</div>
    		</div>
        <div v-if="user" v-for="(follow, index) in user.following" style="padding: 0px 5px;">
          <div @click="goToProfile(follow.following)">
            <div class="personne">
              <img v-if="follow.following.picture" :src="cloudinary256x256 + follow.following.picture" class="user" style="border: 2px solid #ff2a80; padding: 3px; background: #ecf0f1;">
              <img v-else class="user" :src="require(`@/assets/img/anonyme.jpg`)" style="border: 2px solid #ff2a80; padding: 3px; background: #ecf0f1;">
              <h5 class="name" style="margin-top: 7px;">{{ follow.following.vendor.businessName }}</h5>
            </div>
          </div>
        </div>
    	</div>
    </div>


    <div v-if="clipsTrending && clipsTrending.length > 0" class="favourite" style="padding-top: 15px; margin-bottom: 20px;">
      <h2 style="font-weight: 500; font-size: 16px; margin-left: 15px;">Tendances 🔥</h2>
      <div class="list_persone" style="display:flex; padding: 0px 5px">
        <div v-for="(clip, index) in clipsTrending" style="padding: 0px 5px;">
          <router-link :to="{ name: 'Feed', params: { type: 'trending', index: index }}">
            <div class="personne">
              <div class="checkout__header" style="z-index: 15; width: 160px; position: absolute; padding: 0.5rem 0px 0px;">
                <div class="checkout__title" style="margin-bottom: 0px; color: white; font-size: 14px; line-height: 26px; text-transform: capitalize; font-weight: 600;"> 
                  <img v-if="clip.vendor.user.picture" :src="cloudinary256x256 + clip.vendor.user.picture" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10000; margin-right: 3px; background: #ecf0f1;">
                  <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10; margin-right: 3px; background: #ecf0f1;">
                  {{ clip.vendor.businessName }}
                </div>
              </div>
              <img :src="clip.preview" style="border-radius: 10px; width: 100%; object-fit: cover; width: 160px; height: 270px; background: #ecf0f1;">
              <div style="background-image: linear-gradient(0deg, transparent 80%, rgba(0, 0, 0, 0.25)); border-radius: 10px; height: 270px; position: absolute; z-index: 10; width: 160px; top: 0px;"></div>
            </div>
          </router-link>
        </div>
      </div>
    </div>



    <div v-if="productsTrending && productsTrending.length > 0" class="favourite" style="padding-top: 15px; margin-bottom: 20px;">
      <h2 style="font-weight: 500; font-size: 16px; margin-left: 15px;">Top Produits 🛍</h2>
      <div class="list_persone" style="display:flex; padding: 0px 5px">
        <div v-for="product in productsTrending" @click="showProduct(product)" style="padding: 0px 5px;">
          <div class="personne">
            <div>
              <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="width: 150px; border-radius: 10px; background: #ecf0f1;">
              <img v-else :src="require(`@/assets/img/no-preview.png`)" style="width: 150px; border-radius: 10px; background: #ecf0f1;">
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



    <div v-if="latestClips && latestClips.length > 0" class="favourite" style="padding-top: 15px; margin-bottom: 20px;">
      <h2 style="font-weight: 500; font-size: 16px; margin-left: 15px;">Nouveautés ⭐️</h2>
      <div class="list_persone" style="display:flex; padding: 0px 5px">
        <div v-for="(clip, index) in latestClips" style="padding: 0px 5px;">
          <router-link :to="{ name: 'Feed', params: { type: 'latest', index: index }}">
            <div class="personne">
              <div class="checkout__header" style="z-index: 15; width: 160px; position: absolute; padding: 0.5rem 0px 0px;">
                <div class="checkout__title" style="margin-bottom: 0px; color: white; font-size: 14px; line-height: 26px; text-transform: capitalize; font-weight: 600;"> 
                  <img v-if="clip.vendor.user.picture" :src="cloudinary256x256 + clip.vendor.user.picture" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10000; margin-right: 3px; background: #ecf0f1;">
                  <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10; margin-right: 3px; background: #ecf0f1;">
                  {{ clip.vendor.businessName }}
                </div>
              </div>
              <img :src="clip.preview" style="border-radius: 10px; width: 100%; object-fit: cover; width: 160px; height: 270px; background: #ecf0f1;">
              <div style="background-image: linear-gradient(0deg, transparent 80%, rgba(0, 0, 0, 0.25)); border-radius: 10px; height: 270px; position: absolute; z-index: 10; width: 160px; top: 0px;"></div>
            </div>
          </router-link>
        </div>
      </div>
    </div>



    <!-- search -->
    <div v-if="popupSearch" style="position: absolute; background: white; padding: 10px 15px 15px; width: 100%; z-index: 110; text-align: center; top: 0px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <svg @click="hideSearch()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
        <div style="width: 100%; margin-right: 12px; margin-left: 12px;">
          <div class="chat--left--head--input">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="css-1q8h0dm iconify iconify--eva">
              <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
            </svg>
            <input @click="search()" ref="search" v-on:keyup="changed" v-model="searchValue" type="text" placeholder="Rechercher"/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="popupSearch" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: calc(100vh - 60px); animation: none">
    	<div class="list_persone" style="margin-top: 15px; padding: 0px 10px;">
    		<div class="suggested">
    			<div v-if="results && results.length" style="display: grid; grid-template-columns: repeat(3,1fr)!important; gap: 25px 15px;">
            <div v-for="(result, index) in results">
              <div class="personne">
                <div @click="goToProfile(result)">
                  <img v-if="result.picture" :src="cloudinary256x256 + result.picture" class="user" style="margin-bottom: 8px; pointer-events: auto;"/>
                  <img v-else :src="require(`@/assets/img/anonyme.jpg`)" class="user" style="margin-bottom: 8px; pointer-events: auto;"/>
                  <h5 class="name">{{ result.vendor.businessName }}
                    <img v-if="result.vendor.businessType == 'company'" :src="require(`@/assets/img/verified.svg`)" style="width: 16px; margin-bottom: 3px; height: 16px"/>
                  </h5>
                  <p v-if="result.followers.length > 1" class="sous_name" :style="result.vendor.businessType != 'company' ? {'margin-top': '3px'} : ''" style="color: #999; font-weight: 400;">{{result.followers.length }} abonnés</p>
                  <p v-else class="sous_name" :style="result.vendor.businessType != 'company' ? {'margin-top': '3px'} : ''" style="color: #999; font-weight: 400;">{{ result.followers.length }} abonné</p>
                </div>
                <div @click="follow(result.id, index)" style="position: absolute; right: 8px; top: 50px; width: 30px; height: 30px; ">
                  <img v-if="!searchFollowing[index].value" :src="require(`@/assets/img/plus-circle.svg`)" style="border: 1px solid white; background: white; border-radius: 100px;"/>
                  <img v-else :src="require(`@/assets/img/check-circle.svg`)" style="border: 1px solid white; background: white; border-radius: 100px;"/>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="display: grid; grid-template-columns: repeat(3,1fr)!important; gap: 25px 15px;">
            <div v-for="(result, index) in suggestions">
              <div class="personne">
                <div @click="goToProfile(result)">
                  <img v-if="result.picture" :src="cloudinary256x256 + result.picture" class="user" style="margin-bottom: 8px; pointer-events: auto;"/>
                  <img v-else :src="require(`@/assets/img/anonyme.jpg`)" class="user" style="margin-bottom: 8px; pointer-events: auto;"/>
                  <h5 class="name">{{ result.vendor.businessName }}
                    <img v-if="result.vendor.businessType == 'company'" :src="require(`@/assets/img/verified.svg`)" style="width: 16px; margin-bottom: 3px; height: 16px"/>
                  </h5>
                  <p v-if="result.followers.length > 1" class="sous_name" :style="result.vendor.businessType != 'company' ? {'margin-top': '3px'} : ''" style="color: #999; font-weight: 400;">{{result.followers.length }} abonnés</p>
                  <p v-else class="sous_name" :style="result.vendor.businessType != 'company' ? {'margin-top': '3px'} : ''" style="color: #999; font-weight: 400;">{{ result.followers.length }} abonné</p>
                </div>
                <div @click="follow(result.id, index)" style="position: absolute; right: 8px; top: 50px; width: 30px; height: 30px; ">
                  <img v-if="!searchFollowing[index].value" :src="require(`@/assets/img/plus-circle.svg`)" style="border: 1px solid white; background: white; border-radius: 100px;"/>
                  <img v-else :src="require(`@/assets/img/check-circle.svg`)" style="border: 1px solid white; background: white; border-radius: 100px;"/>
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
        <img :src="require(`@/assets/img/close-popup.svg`)" style="width: 38px; height: 38px; filter: drop-shadow(0px 0px 1px #222);"/>
      </div>
      <img v-if="user.favoris.find(favoris => favoris.product.id === product.id)" @click="favoris(product)" :src="require(`@/assets/img/circle-heart-full.svg`)" style="width: 35px; height: 35px; position: absolute; top: 40px; top: 22px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222);pointer-events: auto;"/>
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
      latestClips: this.$store.getters.getClipsLatest,
      productsTrending: this.$store.getters.getProductsTrending,
      suggestions: this.$store.getters.getSuggestions,
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      searchFollowing: [],
      following: null,
      popupSearch: false,
      popupProduct: false,
      searchValue: "",
      product: null,
      variant: null,
      results: [],
      loading: false
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");

    window.cordova.plugin.http.get(this.baseUrl + "/user/api/profile", {}, { Authorization: "Bearer " + this.token }, (response) => {
      this.$store.commit('setUser', JSON.parse(response.data));
      this.user = JSON.parse(response.data);
    }, (error) => {
      console.log(error);
    });

    this.changed();
  },
  methods: {
    goAccount() {
      this.$router.push({ name: 'Account' });
    },
    search() {
      this.popupSearch = true;
      this.$nextTick(() => this.$refs.search.focus());
    },
    addFollowing() {
      this.popupSearch = true;
    },
    hideSearch() {
      this.popupSearch = false;
      this.searchValue = "";
      this.changed();
    }, 
    changed() {
      if (this.searchValue.length > 2) {
        window.cordova.plugin.http.get(this.baseUrl + "/user/api/user/search", { "search": this.searchValue }, { Authorization: "Bearer " + this.token }, (response) => {
          this.searchFollowing = [];
          this.results = JSON.parse(response.data);
          this.results.map((element, index) => {
            var followers = element.followers;
            var isFollower = false;

            if (followers.length) {
              followers.map((element, index) => {
                if (element.follower.id == this.user.id) {
                  isFollower = true;
                }
              });
            }

            this.searchFollowing.push({ "value": isFollower });
          });
        }, (response) => {
          console.log(response.error);
        });
      } else {
        window.cordova.plugin.http.get(this.baseUrl + "/user/api/user/search", { "search": this.searchValue }, { Authorization: "Bearer " + this.token }, (response) => {
          this.results = [];
          this.searchFollowing = [];
      
          this.suggestions = JSON.parse(response.data);
          this.$store.commit('setSuggestions', JSON.parse(response.data));
          this.suggestions.map((element, index) => {
            var followers = element.followers;
            var isFollower = false;

            if (followers.length) {
              followers.map((element, index) => {
                if (element.follower.id == this.user.id) {
                  isFollower = true;
                }
              });
            }

            this.searchFollowing.push({ "value": isFollower });
          });
        }, (response) => {
          console.log(response.error);
        });
      }
    },
    follow(id, index) {
      if (this.searchFollowing[index].value) {
        this.searchFollowing[index].value = false;
      } else {
        this.searchFollowing[index].value = true;
      }

      window.cordova.plugin.http.get(this.baseUrl + "/user/api/follow/" + id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        setTimeout(() => {
          this.changed();
          this.user = JSON.parse(response.data);
          this.$store.commit('setUser', JSON.parse(response.data));
        }, 300);
      }, (response) => {
        console.log(response.error);
      });
    },
    goToProfile(profile) {
      this.$store.commit('setProfile', profile);
      this.$router.push({ name: 'Profile', params: { id: profile.id } });
    },
    goToCategory(category) {
      this.$router.push({ name: 'Category', params: { id: category.id } });
    },
    showProduct(product) {
      console.log(product);
      this.product = product;
      this.popupProduct = true;
    },
    hideProduct() {
      this.popupProduct = false;
      this.product = null;
    },
    favoris() { 
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

