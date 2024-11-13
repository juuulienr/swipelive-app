<template>
  <main>
    <div style="padding: 10px 15px 15px; width: 100%; z-index: 110; text-align: center; top: 0px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="width: 100%;">
          <div class="chat--left--head--input">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="css-1q8h0dm iconify iconify--eva">
              <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
            </svg>
            <input @click="search()" ref="search" v-on:keyup="changed" v-model="searchValue" type="text" placeholder="Rechercher"/>
          </div>
        </div>
      </div>
    </div>
  	<div class="list_persone" style="margin-top: 15px;">
  		<div class="suggested">
  			<div v-if="results.length" style="display: grid; grid-template-columns: repeat(3,1fr)!important; gap: 25px 15px;">
          <div v-for="(result, index) in results">
            <div class="personne">
              <div @click="goToProfile(result)">
                <img v-if="result.picture" :src="$cloudinary256x256 + result.picture" class="user" style="margin-bottom: 8px; pointer-events: auto; background: #eeeeee;"/>
                <img v-else src="/img/anonyme.jpg" class="user" style="margin-bottom: 8px; pointer-events: auto; background: #eeeeee;"/>
                <h5 class="name">{{ result.vendor.pseudo }}
                  <img v-if="result.vendor.businessType == 'company'" src="/img/verified.svg" style="width: 16px; margin-bottom: 3px; height: 16px"/>
                </h5>
                <p v-if="result.followers.length > 1" class="sous_name" :style="result.vendor.businessType != 'company' ? {'margin-top': '3px'} : ''" style="color: #999; font-weight: 400;">{{result.followers.length }} abonnés</p>
                <p v-else class="sous_name" :style="result.vendor.businessType != 'company' ? {'margin-top': '3px'} : ''" style="color: #999; font-weight: 400;">{{ result.followers.length }} abonné</p>
              </div>
              <div v-if="searchFollowing.length && !searchFollowing[index].value" @click="follow(result.id, index)" style="position: absolute; right: 12px; top: 50px; width: 30px; height: 30px; ">
                <img src="/img/plus-circle.svg" style="border: 1px solid white; background: white; border-radius: 100px;"/>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="loadingSearch">
          <div class="loader2">
            <span></span>
          </div>
        </div>
        <div v-else style="margin: 50px 0px;">
          Aucun résultat
        </div>
  		</div>
    </div>
  </main>
</template>

<style scoped src="../assets/css/home.css"></style>

<script>
import { useMainStore } from '../stores/useMainStore.js';

export default {
  name: 'Search',
  data() {
    const mainStore = useMainStore();

    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: mainStore.getUser,
      following: mainStore.getFollowing,
      results: [],
      searchFollowing: [],
      searchValue: "",
      loadingSearch: false,
    };
  },
  created() {
    const mainStore = useMainStore();

    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");

    if (this.user.length === 0) {
      window.cordova.plugin.http.get(
        `${this.baseUrl}/user/api/profile`,
        {},
        { Authorization: `Bearer ${this.token}` },
        (response) => {
          const userData = JSON.parse(response.data);
          this.user = userData;
          mainStore.setUser(userData); // Utilisation de l'action Pinia
          this.changed();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.changed();
    }

    this.loadFollowing();
  },
  methods: {
    search() {
      this.popupSearch = true;
      this.$nextTick(() => this.$refs.search.focus());
    },
    addFollowing() {
      this.popupSearch = true;
    },
    loadFollowing() {
      const mainStore = useMainStore();

      window.cordova.plugin.http.get(
        `${this.baseUrl}/user/api/following`,
        {},
        { Authorization: `Bearer ${this.token}` },
        (response) => {
          const followingData = JSON.parse(response.data);
          this.following = followingData;
          mainStore.setFollowing(followingData); // Utilisation de l'action Pinia
        },
        (response) => {
          console.log(response.error);
        }
      );
    },
    changed() {
      if (this.searchValue.length > 0) {
        this.loadingSearch = true;
        window.cordova.plugin.http.get(
          `${this.baseUrl}/user/api/user/search`,
          { search: this.searchValue },
          { Authorization: `Bearer ${this.token}` },
          (response) => {
            this.results = JSON.parse(response.data);
            this.updateSearchFollowing();
            this.loadingSearch = false;
          },
          (response) => {
            console.log(response.error);
          }
        );
      } else {
        this.loadingSearch = true;
        window.cordova.plugin.http.get(
          `${this.baseUrl}/user/api/user/search`,
          { search: this.searchValue },
          { Authorization: `Bearer ${this.token}` },
          (response) => {
            this.results = JSON.parse(response.data);
            this.updateSearchFollowing();
            this.loadingSearch = false;
          },
          (response) => {
            console.log(response.error);
          }
        );
      }
    },
    updateSearchFollowing() {
      this.searchFollowing = [];
      this.results.forEach((result) => {
        let isFollower = false;

        if (result.followers.length && this.user.following.length) {
          result.followers.forEach((follower) => {
            this.user.following.forEach((following) => {
              if (follower.id === following.id) {
                isFollower = true;
              }
            });
          });
        }

        this.searchFollowing.push({ value: isFollower });
      });
    },
    follow(id, index) {
      const mainStore = useMainStore();

      this.searchFollowing[index].value = !this.searchFollowing[index].value;

      window.cordova.plugin.http.get(
        `${this.baseUrl}/user/api/follow/${id}`,
        {},
        { Authorization: `Bearer ${this.token}` },
        (response) => {
          this.changed();
          const updatedUser = JSON.parse(response.data);
          this.user = updatedUser;
          mainStore.setUser(updatedUser); // Utilisation de l'action Pinia
          this.loadFollowing();
        },
        (response) => {
          console.log(response.error);
        }
      );
    },
    goToProfile(user) {
      const mainStore = useMainStore();

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

      mainStore.setProfile(user); // Utilisation de l'action Pinia
      this.$router.push({ name: 'Profile', params: { id: user.id, overlaysWebView: true } });
    },
  },
};
</script>
