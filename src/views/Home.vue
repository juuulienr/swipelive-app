<template>
  <main>
    <div style="position: absolute; background: white; padding: 10px 20px 15px; width: 100%; z-index: 110; text-align: center;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div v-if="!popupSearch">
          <div @click="goAccount()" class="video-page__influencer-badge2" style="width: 46px; border-radius: 50%; padding: 0px; font-size: 14px; background: transparent;">
            <div v-if="user" class="video-page__influencer-img2" style="color: white;font-weight: 500;padding: 0px;text-align: center;line-height: 25px;">
              <img v-if="user.picture" :src="cloudinary256x256 + user.picture" style="border-radius: 50%; width: 46px; height: 46px; border: 2px solid #fff; object-fit: cover;">
              <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%; width: 46px; height: 46px; border: 2px solid #fff; object-fit: cover;">
            </div>
          </div>
        </div>
        <svg v-if="popupSearch" @click="hideSearch()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
        <div style="width: 100%; margin-right: 12px; margin-left: 12px;">
          <div class="chat--left--head--input">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="css-1q8h0dm iconify iconify--eva">
              <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
            </svg>
            <input ref="search" @click="search()" v-on:keyup="changed" v-model="searchValue" type="text" placeholder="Rechercher"/>
          </div>
        </div>
        <div v-if="!popupSearch">
          <div class="video-page__influencer-badge2" style="width: 34px; border-radius: 50%; padding: 0px; font-size: 14px; background: transparent; height: 34px;">
            <div class="video-page__influencer-img2" style="color: white; font-weight: 500; padding: 0px; text-align: center; line-height: 33px;">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="height: 28px; width: 28px; fill: rgb(126, 133, 155); margin-bottom: 1px;">
                  <path d="M352 128C352 57.421 294.579 0 224 0 153.42 0 96 57.421 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 32c52.935 0 96 43.065 96 96H128c0-52.935 43.065-96 96-96zm192 400c0 26.467-21.533 48-48 48H80c-26.467 0-48-21.533-48-48V160h64v48c0 8.837 7.164 16 16 16s16-7.163 16-16v-48h192v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48h64v272z"></path>
                </svg>
                <span class="counter" style=" position: absolute; top: 18px; right: 16px; height: 18px; width: 18px; border-radius: 100%; background-color: #ff2773; color: rgb(255, 255, 255); font-size: 13px; display: flex; -webkit-box-align: center; align-items: center; -webkit-box-pack: center; justify-content: center; " > 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="categories" class="people-section" style="background: white; padding: 75px 0px 0px;">
      <h2 style="font-weight: 500; font-size: 17px; margin-left: 10px;">Catégories</h2>
      <div class="people" style="padding: 0px 10px;">
        <router-link v-for="category in categories" :key="category.id" :to="{ name: 'GridProducts', params: { id: category.id, name: category.name }}">
          <div class="one-people text-center">
            <div class="people-img">
              <img v-if="category.picture" :src="require(`@/assets/img/` + category.picture)" style="width: 100px; height: 100px; margin: 0 auto;">
            </div>
            <p>{{ category.name }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <div v-if="following" class="favourite" style="padding-top: 10px; margin-bottom: 15px;">
    	<h2 style="font-weight: 500; font-size: 17px; margin-left: 10px;">Abonnements</h2>
    	<div class="list_persone" style="display:flex;">
    		<div @click="search()" style="padding: 0px 5px;">
  				<div class="personne">
  					<img class="user" :src="require(`@/assets/img/add-follow.jpg`)" style="padding: 4px;">
  					<h5 class="name">Ajouter</h5>
  				</div>
    		</div>
        <div v-if="following && following.length" v-for="(user, index) in following" style="padding: 0px 5px;">
          <router-link :to="{ name: 'Profile', params: { id: user.id } }">
            <div class="personne">
              <img v-if="user.picture" :src="cloudinary256x256 + user.picture" class="user" style="border: 1px dashed #ff2773; padding: 3px;">
              <img v-else class="user" :src="require(`@/assets/img/anonyme.jpg`)">
              <h5 class="name">{{ user.vendor.businessName }}</h5>
            </div>
          </router-link>
        </div>
    	</div>
    </div>

    <div v-if="clips" v-touch:swipe.left="swipeHandler" class="favourite" style="padding-top: 10px;">
      <h2 style="font-weight: 500; font-size: 17px; margin-left: 10px;">Tendances</h2>
      <div class="images">
        <div class="row" style="margin: 0px;">
          <div v-for="(clip, index) in clips" class="col-6 col-img">
            <router-link :to="{ name: 'ListClips', params: { type: 'trending', index: index }}">
              <div class="checkout__header" style="z-index: 15; width: calc(100% - 10px); position: absolute; padding: 0.5rem 0px 0px;">
                <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: white; font-size: 14px; line-height: 26px; text-transform: lowercase;"> 
                  <img v-if="clip.vendor.user.picture" :src="cloudinary256x256 + clip.vendor.user.picture" style="width: 30px; height: 30px; border: 1px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10000; margin-right: 3px;">
                  <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="width: 30px; height: 30px; border: 1px solid white; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10; margin-right: 3px;">
                  {{ clip.vendor.businessName }}
                </div>
              </div>
              <img :src="clip.preview" style="border-radius: 10px; width: 100%; height: 300px; object-fit: cover;">
              <div style="background-image: linear-gradient(0deg, transparent 80%, rgba(0, 0, 0, 0.25)); border-radius: 10px; height: 300px; position: absolute; z-index: 10; width: calc(100% - 10px); top: 5px;"></div>
            </router-link>
          </div>
        </div>
      </div>
    </div><br><br>


    <!-- search -->
    <div v-if="popupSearch" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll;height: calc(100vh - 60px);">
    	<div class="list_persone">
    		<div class="suggested show" style="margin-top: 5px; padding: 10px 15px;">
    			<div v-if="results && results.length" class="row">
            <div v-for="user in results" class="col-6" style="padding-right: 5px; padding-left: 5px;">
              <div class="personne" style=" box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px; padding: 20px 20px; border-radius: 16px; margin-bottom: 10px; box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px;">
                <img @click="goToProfile(user.id)" v-if="user.picture" :src="cloudinary256x256 + user.picture" class="user" style="width: 70px; height: 70px; margin-bottom: 10px;" />
                <img @click="goToProfile(user.id)" v-else :src="require(`@/assets/img/anonyme.jpg`)" class="user" style="width: 70px; height: 70px; margin-bottom: 10px;" />
                <h5 @click="goToProfile(user.id)" class="name" style="font-size: 15px; font-weight: 500;">{{ user.vendor.businessName }} 
                  <svg viewBox="0 0 24 24" aria-label="Compte certifié" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr" style="width: 19px; height: 19px; margin-bottom: 3px; fill: rgb(255, 39, 115);">
                    <g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g>
                  </svg>
                </h5>
                <p @click="goToProfile(user.id)" v-if="user.followers.length > 1" class="sous_name" style="margin-top: 5px; color: #999; font-weight: 400;">{{user.followers.length }} abonnés</p>
                <p @click="goToProfile(user.id)" v-else class="sous_name" style="margin-top: 5px; color: #999; font-weight: 400;">{{user.followers.length }} abonné</p>

                <div @click="follow(user.id)" class="btn-swipe" :style="[isFollowing == true ? {'padding': '5px 12px', 'border': '1px solid rgba(99, 99, 99, 0.4)', 'background': 'white', 'color': 'rgba(99, 99, 99, 0.4)'} : {'padding': '6px 12px'}]" style="color: white; margin-top: 18px; font-size: 13px; margin: 15px 15px 0px; border-radius: 30px;">
                  <span v-if="loading">
                    <svg viewBox="25 25 50 50" class="loading">
                      <circle :style="[isFollowing == true ? {'stroke': 'rgba(99, 99, 99, 0.4)'} : {'stroke': 'white'}]" cx="50" cy="50" r="20"></circle>
                    </svg>
                  </span>
                  <span v-else-if="isFollowing == true">Abonné</span>
                  <span v-else>Suivre</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
              Afficher des suggestions ici
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
      isFollowing: false,
      loading: false
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

    window.cordova.plugin.http.get(this.baseUrl + "/user/api/clips/trending", {}, { Authorization: "Bearer " + this.token }, (response) => {
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
	      window.cordova.plugin.http.get(this.baseUrl + "/user/api/user/search", { "search": this.searchValue }, { Authorization: "Bearer " + this.token }, (response) => {
	        this.results = JSON.parse(response.data);
	      }, (response) => {
	        console.log(response.error);
	      });
    	} else {
	      this.results = null;;
    	}
    },
    follow(id) {
      console.log(this.isFollowing);
      this.loading = true;

      if (this.isFollowing) {
        this.isFollowing = false;
      } else {
        this.isFollowing = true;
      }
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/follow/" + id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        setTimeout(() => {
          this.loading = false;
          window.localStorage.setItem("user", response.data);
        }, 300);
      }, (response) => {
        setTimeout(() => {
          this.loading = false;
        }, 300);
        console.log(response.error);
      });
    },
    goToProfile(id) {
      this.$router.push({ name: 'Profile', params: { id: id } });
    }
  }
};

</script>

