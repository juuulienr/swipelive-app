<template>
  <main>
    <div style="position: absolute; background: white; padding: 15px; width: 100%; z-index: 1000000000; text-align: center;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <svg v-if="popupSearch" @click="hideSearch()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153); margin-right: 15px;"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
        <div style="width: 100%; margin-right: 15px;">
          <div class="chat--left--head--input">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="MuiBox-root css-1q8h0dm iconify iconify--eva">
              <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
            </svg>
            <input @click="search()" v-on:keyup="changed" v-model="searchValue" type="text" placeholder="Rechercher"/>
          </div>
        </div>
        <div v-if="!popupSearch">
          <div @click="goAccount()" class="video-page__influencer-badge2" style="width: 40px; border-radius: 50%; padding: 0px; font-size: 14px; background: transparent;">
            <div v-if="user" class="video-page__influencer-img2" style="color: white;font-weight: 500;padding: 0px;text-align: center;line-height: 25px;">
              <img v-if="user.picture" :src="baseUrl + '/uploads/' + user.picture" style="border-radius: 50%; width: 40px; height: 40px; border: 2px solid #fff; object-fit: cover;">
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
              <img v-if="category.picture" :src="require(`@/assets/img/` + category.picture)" style="border: 2px solid #FE2C55; padding: 3px; background: #fff; width: 86px; height: 86px; border-radius: 100%; margin: 0 auto;">
            </div>
            <p>{{ category.name }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <div v-if="following && following.length" class="favourite" style="padding-top: 10px; margin-bottom: 15px;">
    	<h2 style="font-weight: 600; font-size: 17px; margin-left: 10px;">Abonnements</h2>
    	<div class="list_persone" style="display:flex;">
    		<div v-for="(user, index) in following" v-if="user.type == 'vendor'" style="padding: 0px 15px;">
    			<router-link :to="{ name: 'Profile', params: { id: user.id } }">
    				<div class="personne">
    					<img v-if="user.picture" :src="baseUrl + '/uploads/' + user.picture" class="user">
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
              <img :src="baseUrl + '/uploads/' + clip.product.uploads[0].filename" style="width: 48px; height: 48px; border: 2px solid white; border-radius: 30px; padding: 2; background: white; position: absolute; left: 39%; top: 81%; box-shadow: rgb(96 121 159 / 12%) 0px 7px 14px 0px, rgb(0 33 60 / 12%) 0px 3px 6px 0px; object-fit: cover;">
              <img v-if="clip.vendor.user.picture" :src="baseUrl + '/uploads/' + clip.vendor.user.picture" style="width: 24px;height: 24px;border: 1px solid white;border-radius: 30px;position: absolute;left: 12px;top: 12px; object-fit: cover; z-index: 10000;">
              <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="width: 24px;height: 24px;border: 1px solid white;border-radius: 30px;position: absolute;left: 12px;top: 12px; object-fit: cover; z-index: 10000;">
              <div style="position: absolute; left: 42px; top: 15px; color: white; font-weight: 600; font-size: 13px; z-index: 10000;">{{ clip.vendor.businessName }}</div>
              <div style="background-image: linear-gradient(0deg, transparent 80%, rgba(0, 0, 0, 0.25));border-radius: 10px;height: 100%;position: absolute;z-index: 10;width: calc(100% - 10px);top: 5px;"></div>
            </router-link>
          </div>
        </div>
      </div>
    </div><br><br>


    <!-- search -->
    <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popupSearch" style="overflow-y: scroll;height: calc(100vh - 60px);">
    	<div class="list_persone">
    		<div class="suggested show">
    			<div v-if="results && results.length" class="row">
    				<div v-for="user in results" class="col-6">
    					<router-link :to="{ name: 'Profile', params: { id: user.id } }">
    						<div class="personne">
    							<img v-if="user.picture" class="user" :src="baseUrl + '/uploads/' + user.picture">
    							<img v-else class="user" :src="require(`@/assets/img/anonyme.jpg`)">
    							<h5 class="name">{{ user.vendor.businessName }}</h5>
    							<p v-if="user.followers.length > 1" class="sous_name">{{user.followers.length }} abonnés</p>
    							<p v-else class="sous_name">{{user.followers.length }} abonné</p>
    						</div>
    					</router-link>
    				</div>
    			</div>
    			<div v-else-if="searchValue && searchValue.length > 2" style="margin-top: 50px;">
    				Aucun résultat
    			</div>
    			<div v-else style="margin-top: 50px;">
    			</div>
    		</div>
    	</div>
    </div>
  </main>
</template>


<style scoped>

.places::-webkit-scrollbar {
  display: none;
}
.places {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.places div:first-child {
  margin-left: 10px;
}

.people:first-child div.people-img {
  margin-left: 10px;
}

.images {
  padding: 0px 8px;
}

.images .grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  grid-gap: 10px;
}
.people-section {
  padding-right: 10px;
  overflow: hidden;
}
.people-section .people-title span {
  font-size: 11px;
}
.people-section .people-view span {
  color: #4885ed;
  font-size: 13px;
  line-height: 28px;
}
.people-section .people {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: auto;
  padding: 10px 0;
}
.people-section .one-people img {
  width: 80px;
}
.people-section .one-people p {
  margin-top: 10px;
  font-weight: 600;
  font-size: 13px;
  text-transform: capitalize;
  width: 100px;
  margin-bottom: 5px;
}
.people-section .two-people {
  margin: 0 10px;
  cursor: pointer;
}
.people-section .two-people img {
  width: 80px;
}
.people-section .two-people p {
  font-size: 14px;
  margin-bottom: -5px;
}

.favourite {
  padding: 25px 0px 0px;
  text-align: left;
  overflow: hidden;
}

.places {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: auto;
}

.places img {
  width: 130px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 10px;
}

.toolbar {
  position: fixed;
  bottom: 12px;
  left: 0;
  width: 100%;
}

.toolbar .wrapper {
  background: white;
  padding: 12px;
  border-radius: 3px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  border: #eee 1px solid;
}

.toolbar .wrapper > *:not(:last-child) {
  margin-right: 6px;
}

.separator {
  margin: 0 12px;
}

.info {
  color: #eee;
}

.test {
  background: #eee;
  height: 100%;
  border-radius: 3px;
}

.info,
.test {
  font-size: 42px;
}

.col-img {
  padding: 5px;
}

.toolbar,
.info,
.test {
  display: flex;
  align-items: center;
  justify-content: center;
}

.people-section .people::-webkit-scrollbar {
  display: none;
}
.people-section .people {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

input[type="number"] {
  width: 85px;
}

.number {
  display: inline-block;
  width: 40px;
  font-family: monospace;
  text-align: center;
  background: #eee;
  border-radius: 3px;
  padding: 4px 0;
}

.chat--left--head--input {
  display: inline-flex;
  flex-direction: row;
  position: relative;
  min-width: 0px;
  padding: 0px;
  border: 0px;
  vertical-align: top;
  line-height: 1.4375em;
  font-size: 1rem;
  font-weight: 400;
  color: rgb(33, 43, 54);
  cursor: text;
  align-items: center;
  width: 100%;
  border-radius: 30px;
  padding-left: 14px;
  border: solid 1px rgba(145, 158, 171, 0.24);
}
.chat--left--head--input svg {
  display: flex;
  height: 0.01em;
  max-height: 2em;
  align-items: center;
  white-space: nowrap;
  margin-right: 8px;
  color: rgb(145, 158, 171);
  width: 20px;
  height: 20px;
}

.chat--left--head--input input {
  font: inherit;
  letter-spacing: inherit;
  color: currentcolor;
  border: 0;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  background: none;
  height: 1.4375em;
  margin: 0;
  -webkit-tap-highlight-color: transparent;
  display: block;
  min-width: 0;
  width: 100%;
  padding: 8.5px 14px 8.5px 0;
  outline: none;
  font-size: 14px;
}


.top-author--container {
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 20px;
}
.top-author--item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top-author--item > img {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  font-size: 1.25rem;
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
  object-fit: cover;
}
.top-author--item > div:first-of-type {
  margin: 0px 0px 0px 16px;
  flex-grow: 1;
}
.top-author--item > div > span {
  font-weight: 600;
  line-height: 1.57143;
  font-size: 14px;
}

.top-author--item > div > div {
  line-height: 1.5;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgb(99, 115, 129);
  display: flex;
  align-items: center;
}
.top-author--item > div > div > svg {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}


.store-products-item__login-popup.store-products-item__login-popup--active {
  bottom: 0;
}

.store-products-item__login-popup {
  position: fixed;
  width: 100%;
  bottom: -80%;
  background-color: #fff;
  z-index: 1000000000;
}

.contact_suggest .my_container {
 padding-left: 15px;
 padding-right: 15px;
}
.Preloade main {
 position: relative;
 height: 94vh;
 width: 100vw;
 background: #fff;
 background-size: 100vw auto;
 background-repeat: no-repeat;
 border-bottom-right-radius: 40px;
 border-bottom-left-radius: 40px;
 padding-bottom: 6.5vh;
}
.Preloade header {
 width: 100vw;
 overflow: hidden;
 height: 8vh;
 display: flex;
 justify-content: center;
 align-items: center;
 text-align: center;
 padding-top: 12px;
 background: #000;
 color: #fff;
 font-size: 16px;
 text-transform: uppercase;
}
.Preloade .backButton {
 width: 8vw;
 position: absolute;
 left: 3vw;
 max-width: 60px;
}
.search {
 width: 8vw;
 position: absolute;
 right: 3vw;
 max-width: 60px;
}
.backButton,.search {
 top: 13px;
}
.Preloade .navbar {
 width: 100vw;
 height: 6vh;
 background: white;
 position: fixed;
 bottom: 0;
 display: flex;
 border-top: 1px solid #eaeced;
 padding: 4px 0;
 text-align: center;
}
.Preloade3 .navbaeelement {
 display: flex;
 flex: 1;
 justify-content: center;
 align-items: center;
 flex-direction: column;
}
.navbaeelement img {
 width: 22px;
}
.nav_time {
 text-align: center;
 padding: 20px 0 0;
 text-transform: uppercase;
 cursor: pointer;
 font-size: 14px;
}
.nav_time img {
 width: 15px;
 margin-right: 8px;
}
.one_time.active {
 border-bottom: 2px solid #4c5fef;
}
.one_time:not(.active) {
 border-bottom: 2px solid #eee;
}
.row {
 margin-left: 0 !important;
 margin-right: 0 !important;
}
.people {
 position: relative;
}
.list_persone {
 text-align: center;
}
.list_persone .br_right {
 border-bottom: 1px solid #eee;
}
.list_persone .br_left {
 border-right: 1px solid #eee;
 border-bottom: 1px solid #eee;
}
.list_persone .personne {
 position: relative;
 padding: 12px 0;
}
.list_persone .personne .tomodify {
 position: absolute;
 top: 10px;
 right: 6px;
 width: 24px;
}
.list_persone .personne .user {
  border-radius: 100%;
  width: 72px;
  height: 72px;
  object-fit: cover;
}
.list_persone .personne .name {
 margin-top: 10px;
 margin-bottom: 0px;
 font-size: 15px;
 font-weight: 600;
 text-transform: capitalize;
}
.list_persone .personne .sous_name {
 margin-bottom: 0px;
 font-size: 12px;
 color: #999;
}
.list_persone .personne .btn {
 border-radius: 20px;
 padding: 4px 14px;
 font-size: 12px;
 width: 70%;
 text-transform: uppercase;
}
.list_persone .personne .btn_request {
 background-color: #eee;
 color: #666;
}
.show {
 display: block !important;
}

</style>

<script>

export default {
  name: 'Home',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
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
    	var url = this.baseUrl + "/user/api/clips/trending";
    	var url2 = this.baseUrl + "/user/api/user/search";
    } else {
    	var url = this.baseUrl + "/api/clips/trending";
    	var url2 = this.baseUrl + "/api/user/search";
    }

    window.cordova.plugin.http.get(url, {}, httpHeader, (response) => {
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
      // this.$nextTick(() => this.$refs.search.focus());
    },
    hideSearch() {
      this.popupSearch = false;
	    this.results = null;
	    this.searchValue = null;
    }, 
    changed() {
    	if (this.searchValue.length > 2) {
	      window.cordova.plugin.http.get(url2, { "search": this.searchValue }, httpHeader, (response) => {
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

