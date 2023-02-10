<template>
  <main style="padding: 0px 0px 100px;">
    <div v-if="categories" class="people-section" style="background: white; padding-right: 0px; box-shadow: rgba(0,0,0,0.16) 0px 0px 6px 0px; padding-bottom: 7px;">
      <div class="s1yvqyx7 dir dir-ltr">
        <div class="dir dir-ltr">
          <div class="awuxh4x dir dir-ltr">
            <div class="cw9aemg dir dir-ltr">
              <div class="c14whb16 dir dir-ltr">
                <button @click="goToCategory(category)" v-for="category in categories" :key="category" :class="{ 'ccma3s' : category.id == id }" class="c1l3w0tx dir dir-ltr">
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
    	<h2 v-touch:swipe.left="swipeHandler" style="font-weight: 500; font-size: 16px; margin-left: 15px;">Abonnements</h2>
    	<div class="list_persone" style="display:flex; padding: 0px; padding-left: 5px;">
    		<div @click="addFollowing()" style="padding: 0px 5px;">
  				<div class="personne">
  					<img class="user" :src="require(`@/assets/img/add-follow.svg`)" style="border: 2px solid rgb(255, 42, 128); padding: 30px;">
  					<h5 class="name" style="margin-top: 5px;">Rechercher</h5>
  				</div>
    		</div>
        <div v-if="user" v-for="(follow, index) in user.following" style="padding: 0px 5px;">
          <router-link :to="{ name: 'Profile', params: { id: follow.following.id } }">
            <div class="personne">
              <img v-if="follow.following.picture" :src="cloudinary256x256 + follow.following.picture" class="user" style="border: 2px solid #ff2a80; padding: 3px;">
              <img v-else class="user" :src="require(`@/assets/img/anonyme.jpg`)" style="border: 2px solid #ff2a80; padding: 3px;">
              <h5 class="name" style="margin-top: 5px;">{{ follow.following.vendor.businessName }}</h5>
            </div>
          </router-link>
        </div>
    	</div>
    </div>


    <div v-if="clips" class="favourite" style="padding-top: 15px; margin-bottom: 20px;">
      <h2 v-touch:swipe.left="swipeHandler" style="font-weight: 500; font-size: 16px; margin-left: 15px;">Tendances 🔥</h2>
      <div class="list_persone" style="display:flex; padding: 0px 5px">
        <div v-for="(clip, index) in clips" style="padding: 0px 5px;">
          <router-link :to="{ name: 'ListClips', params: { type: 'trending', index: index }}">
            <div class="personne">
              <div class="checkout__header" style="z-index: 15; width: 160px; position: absolute; padding: 0.5rem 0px 0px;">
                <div class="checkout__title" style="margin-bottom: 0px; color: white; font-size: 14px; line-height: 26px; text-transform: capitalize; font-weight: 600;"> 
                  <img v-if="clip.vendor.user.picture" :src="cloudinary256x256 + clip.vendor.user.picture" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10000; margin-right: 3px;">
                  <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10; margin-right: 3px;">
                  {{ clip.vendor.businessName }}
                </div>
              </div>
              <img :src="clip.preview" style="border-radius: 10px; width: 100%; object-fit: cover; width: 160px; height: 250px;">
              <div style="background-image: linear-gradient(0deg, transparent 80%, rgba(0, 0, 0, 0.25)); border-radius: 10px; height: 250px; position: absolute; z-index: 10; width: 150px; top: 0px;"></div>
            </div>
          </router-link>
        </div>
      </div>
    </div>



    <div v-if="products" class="favourite" style="padding-top: 15px; margin-bottom: 20px;">
      <h2 v-touch:swipe.left="swipeHandler" style="font-weight: 500; font-size: 16px; margin-left: 15px;">Top Produits 🛍</h2>
      <div class="list_persone" style="display:flex; padding: 0px 5px">
        <div v-if="product.archived == false" v-for="product in products" style="padding: 0px 5px;">
          <div class="personne">
            <div>
              <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="width: 150px; border-radius: 10px;">
              <img v-else :src="require(`@/assets/img/no-preview.png`)" style="width: 150px; border-radius: 10px;">
            </div>
            <div class="shop--item--details" style="width: 150px; padding: 0px; margin-top: 6px; padding-left: 5px;">
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



    <div v-if="clips" class="favourite" style="padding-top: 15px; margin-bottom: 20px;">
      <h2 v-touch:swipe.left="swipeHandler" style="font-weight: 500; font-size: 16px; margin-left: 15px;">Nouveautés ⭐️</h2>
      <div class="list_persone" style="display:flex; padding: 0px 5px">
        <div v-for="(clip, index) in clips" style="padding: 0px 5px;">
          <router-link :to="{ name: 'ListClips', params: { type: 'trending', index: index }}">
            <div class="personne">
              <div class="checkout__header" style="z-index: 15; width: 160px; position: absolute; padding: 0.5rem 0px 0px;">
                <div class="checkout__title" style="margin-bottom: 0px; color: white; font-size: 14px; line-height: 26px; text-transform: capitalize; font-weight: 600;"> 
                  <img v-if="clip.vendor.user.picture" :src="cloudinary256x256 + clip.vendor.user.picture" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10000; margin-right: 3px;">
                  <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="width: 32px; height: 32px; border: 2px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10; margin-right: 3px;">
                  {{ clip.vendor.businessName }}
                </div>
              </div>
              <img :src="clip.preview" style="border-radius: 10px; width: 100%; object-fit: cover; width: 160px; height: 250px;">
              <div style="background-image: linear-gradient(0deg, transparent 80%, rgba(0, 0, 0, 0.25)); border-radius: 10px; height: 250px; position: absolute; z-index: 10; width: 150px; top: 0px;"></div>
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
    <div v-if="popupSearch" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll;height: calc(100vh - 60px);">
    	<div class="list_persone" style="margin-top: 15px; padding: 0px 10px;">
    		<div class="suggested">
    			<div v-if="suggestions && suggestions.length" style="display: grid; grid-template-columns: repeat(3,1fr)!important; gap: 25px 15px;">
            <div v-for="(suggestion, index) in suggestions">
              <div class="personne">
                <img @click="goToProfile(suggestion.id)" v-if="suggestion.picture" :src="cloudinary256x256 + suggestion.picture" class="user" style="margin-bottom: 8px;"/>
                <img @click="goToProfile(suggestion.id)" v-else :src="require(`@/assets/img/anonyme.jpg`)" class="user" style="margin-bottom: 8px;"/>
                <img v-if="!searchFollowing[index].value" @click="follow(suggestion.id, index)" :src="require(`@/assets/img/plus-circle.svg`)" style="width: 30px; height: 30px; border: 1px solid white; background: white; border-radius: 100px; position: absolute; right: 8px; top: 68px;"/>
                <img v-else @click="follow(suggestion.id, index)" :src="require(`@/assets/img/check-circle.svg`)" style="width: 30px; height: 30px; border: 1px solid white; background: white; border-radius: 100px; position: absolute; right: 8px; top: 68px;"/>
                <h5 @click="goToProfile(suggestion.id)" class="name">{{ suggestion.vendor.businessName }}
                  <img :src="require(`@/assets/img/verified.svg`)" style="width: 16px; margin-bottom: 3px; height: 16px"/>
                </h5>
                <p @click="goToProfile(suggestion.id)" v-if="suggestion.followers.length > 1" class="sous_name" style="color: #999; font-weight: 400;">{{suggestion.followers.length }} abonnés</p>
                <p @click="goToProfile(suggestion.id)" v-else class="sous_name" style="margin-top: 5px; color: #999; font-weight: 400;">{{ suggestion.followers.length }} abonné</p>
              </div>
            </div>
          </div>
          <!-- <div v-else></div> -->
    		</div>
    	</div>
    </div>
  </main>
</template>

<style scoped src="../assets/css/home.css"></style>

<script>

export default {
  name: 'Home',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
      categories: JSON.parse(window.localStorage.getItem("categories")),
      clips: JSON.parse(window.localStorage.getItem("trend")),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      following: null,
      popupSearch: false,
      searchValue: "",
      suggestions: null,
      searchFollowing: [],
      products: null,
      loading: false
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");
    
    var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
    window.cordova.plugin.http.get(this.baseUrl + "/api/categories", {}, httpHeader, (response) => {
      this.categories = JSON.parse(response.data);
      window.localStorage.setItem("categories", response.data);
    }, (response) => {
      console.log(response.error);
    });

    window.cordova.plugin.http.get(this.baseUrl + "/user/api/clips/trending", {}, { Authorization: "Bearer " + this.token }, (response) => {
      this.clips = JSON.parse(response.data);
      window.localStorage.setItem("trend", response.data);
    }, (response) => {
      console.log(response.error);
    });

    window.cordova.plugin.http.get(this.baseUrl + "/api/products/trending", {}, { Authorization: "Bearer " + this.token }, (response) => {
      this.products = JSON.parse(response.data);
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    swipeHandler(dir) {
      if (dir == "left") {
        this.$router.push('/feed');
      }
    },
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
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/user/search", { "search": this.searchValue }, { Authorization: "Bearer " + this.token }, (response) => {
        this.suggestions = JSON.parse(response.data);
        this.searchFollowing = [];

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
          console.log(this.searchFollowing);
        });
      }, (response) => {
        console.log(response.error);
      });
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
          window.localStorage.setItem("user", response.data);
        }, 300);
      }, (response) => {
        console.log(response.error);
      });
    },
    goToProfile(id) {
      this.$router.push({ name: 'Profile', params: { id: id } });
    },
    goToCategory(category) {
      this.$router.push({ name: 'Category', params: { id: category.id, name: category.name } });
    }
  }
};

</script>

