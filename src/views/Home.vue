<template>
  <main>
    <div style="position: absolute; background: white; padding: 15px; width: 100%; z-index: 1000000000; text-align: center;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <svg v-if="popupSearch" @click="hideSearch()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153); margin-right: 15px;"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
        <div style="width: 100%; margin-right: 15px;">
          <div class="chat--left--head--input">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="css-1q8h0dm iconify iconify--eva">
              <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
            </svg>
            <input ref="search" @click="search()" v-on:keyup="changed" v-model="searchValue" type="text" placeholder="Rechercher"/>
          </div>
        </div>
        <div v-if="!popupSearch">
          <div @click="goAccount()" class="video-page__influencer-badge2" style="width: 40px; border-radius: 50%; padding: 0px; font-size: 14px; background: transparent;">
            <div v-if="user" class="video-page__influencer-img2" style="color: white;font-weight: 500;padding: 0px;text-align: center;line-height: 25px;">
              <img v-if="user.picture" :src="cloudinary256x256 + user.picture" style="border-radius: 50%; width: 40px; height: 40px; border: 2px solid #fff; object-fit: cover;">
              <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%; width: 40px; height: 40px; border: 2px solid #fff; object-fit: cover;">
            </div>
            <div v-else class="video-page__influencer-img2" style="color: white;font-weight: 500;padding: 0px;text-align: center;line-height: 25px; object-fit: cover;">
              <img :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%; width: 40px; height: 40px; border: 2px solid #fff; object-fit: cover;">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="categories" class="people-section" style="background: white; padding: 65px 0px 0px;">
      <div class="people" style="min-height: 140px;">
        <router-link v-for="category in categories" :key="category.id" :to="{ name: 'GridProducts', params: { id: category.id, name: category.name }}">
          <div class="one-people text-center">
            <div class="people-img">
              <img v-if="category.picture" :src="require(`@/assets/img/` + category.picture)" style="border: 2px solid #ff2773; padding: 3px; background: #fff; width: 86px; height: 86px; border-radius: 100%; margin: 0 auto;">
            </div>
            <p>{{ category.name }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <div v-if="following && following.length" class="favourite" style="padding-top: 10px; margin-bottom: 15px;">
    	<h2 style="font-weight: 600; font-size: 17px; margin-left: 10px;">Abonnements</h2>
    	<div class="list_persone" style="display:flex;">
    		<div v-if="user.type == 'vendor'" v-for="(user, index) in following" style="padding: 0px 15px;">
    			<router-link :to="{ name: 'Profile', params: { id: user.id } }">
    				<div class="personne">
    					<img v-if="user.picture" :src="cloudinary256x256 + user.picture" class="user">
    					<img v-else class="user" :src="require(`@/assets/img/anonyme.jpg`)">
    					<h5 class="name">{{ user.vendor.businessName }}</h5>
    					<p v-if="user.followers.length > 1" class="sous_name">{{user.followers.length }} abonnés</p>
    					<p v-else class="sous_name">{{user.followers.length }} abonné</p>
    				</div>
    			</router-link>
    		</div>
    	</div>
    </div>

    <div v-if="clips" v-touch:swipe.left="swipeHandler" class="favourite" style="padding-top: 10px;">
      <h2 style="font-weight: 600; font-size: 17px; margin-left: 10px;">Tendances</h2>
      <div class="images">
        <div class="row" style="margin: 0px;">
          <div v-for="(clip, index) in clips" class="col-6 col-img">
            <router-link :to="{ name: 'ListClips', params: { type: 'trending', index: index }}">
              <img :src="clip.preview" style="border-radius: 10px; width: 100%; height: 100%">
              <img :src="cloudinary256x256 + clip.product.uploads[0].filename" style="width: 48px; height: 48px; border: 2px solid white; border-radius: 30px; padding: 2; background: white; position: absolute; left: 39%; top: 81%; box-shadow: rgb(96 121 159 / 12%) 0px 7px 14px 0px, rgb(0 33 60 / 12%) 0px 3px 6px 0px; object-fit: cover;">
              <img v-if="clip.vendor.user.picture" :src="cloudinary256x256 + clip.vendor.user.picture" style="width: 24px;height: 24px;border: 1px solid white;border-radius: 30px;position: absolute;left: 12px;top: 12px; object-fit: cover; z-index: 10000;">
              <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="width: 24px;height: 24px;border: 1px solid white;border-radius: 30px;position: absolute;left: 12px;top: 12px; object-fit: cover; z-index: 10000;">
              <div style="position: absolute; left: 42px; top: 15px; color: white; font-weight: 600; font-size: 13px; z-index: 10000;">{{ clip.vendor.businessName }}</div>
              <div style="background-image: linear-gradient(0deg, transparent 80%, rgba(0, 0, 0, 0.25));border-radius: 10px;height: 100%;position: absolute;z-index: 10;width: calc(100% - 10px);top: 5px;"></div>
            </router-link>
          </div>
        </div>
      </div>
    </div><br><br>


    <!-- search -->
    <div v-if="popupSearch" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll;height: calc(100vh - 60px);">
    	<div class="list_persone">
    		<div class="suggested show">
    			<div v-if="results && results.length" class="row">
    				<div v-for="user in results" class="col-6">
    					<router-link :to="{ name: 'Profile', params: { id: user.id } }">
    						<div class="personne">
    							<img v-if="user.picture" class="user" :src="cloudinary256x256 + user.picture">
    							<img v-else class="user" :src="require(`@/assets/img/anonyme.jpg`)">
    							<h5 class="name">{{ user.vendor.businessName }}</h5>
    							<p v-if="user.followers.length > 1" class="sous_name">{{user.followers.length }} abonnés</p>
    							<p v-else class="sous_name">{{user.followers.length }} abonné</p>
    						</div>
    					</router-link>
    				</div>
    			</div>
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
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      categories: null,
      clips: null,
      following: null,
      popupSearch: null,
      searchValue: null,
      results: null,
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();

    var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
    window.cordova.plugin.http.get(this.baseUrl + "/api/categories", {}, httpHeader, (response) => {
      this.categories = JSON.parse(response.data);
    }, (response) => {
      console.log(response.error);
    });

    if (this.user && this.token) {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/following", {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.following = JSON.parse(response.data);
        console.log(this.following);
      }, (response) => {
        console.log(response.error);
      });
    }

    if (this.user && this.user.vendor) {
    	httpHeader = { Authorization: "Bearer " + this.token };
    	var urlTrending = this.baseUrl + "/user/api/clips/trending";
    } else {
    	var urlTrending = this.baseUrl + "/api/clips/trending";
    }

    window.cordova.plugin.http.get(urlTrending, {}, httpHeader, (response) => {
      this.clips = JSON.parse(response.data);
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
      if (this.user && this.token) {
        this.$router.push({ name: 'Account' });
      } else {
        this.$router.push({ name: 'Welcome' });
      }
    },
    search(c) {
      this.popupSearch = true;
      this.$nextTick(() => this.$refs.search.focus());
    },
    hideSearch() {
      this.popupSearch = false;
	    this.results = null;
	    this.searchValue = null;
    }, 
    changed() {
    	if (this.searchValue.length > 2) {
        if (this.user && this.user.vendor) {
          var httpHeader = { Authorization: "Bearer " + this.token };
          var urlSearch = this.baseUrl + "/user/api/user/search";
        } else {
          var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
          var urlSearch = this.baseUrl + "/api/user/search";
        }

	      window.cordova.plugin.http.get(urlSearch, { "search": this.searchValue }, httpHeader, (response) => {
	        this.results = JSON.parse(response.data);
	      }, (response) => {
	        console.log(response.error);
	      });
    	} else {
	      this.results = null;;
    	}
    },
  }
};

</script>

