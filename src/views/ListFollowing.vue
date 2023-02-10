<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div v-if="user.vendor" class="checkout__title">Followers</div>
      <div v-else class="checkout__title">Abonnements</div>
    </div>

    <div class="checkout__body">
      <div v-if="user.vendor" class="images_filter" style="margin: 15px 0px;">
        <ul>
          <li @click="showFollowers()" v-bind:class="{active: tabFollowers}"  :style="[tabFollowers ? {'color': '#ff2a80'} : {'color': '#525c66'}]">Followers </li>
          <li @click="showFollowing()" v-bind:class="{active: tabFollowing}"  :style="[tabFollowing ? {'color': '#ff2a80'} : {'color': '#525c66'}]">Suivis </li>
        </ul>
      </div>
      <div v-else>
        <div class="top-author">
          <div v-if="following && following.length" class="top-author--container">
            <div v-for="user in following" class="top-author--item">
              <img v-if="user.picture"class="user" :src="cloudinary256x256 + user.picture">
              <img v-else class="user" :src="require(`@/assets/img/anonyme.jpg`)">
              <div>
                <span>{{ user.vendor.businessName }}</span>
                <div>
                  <span v-if="user.followers.length > 1">{{user.followers.length }} abonnés</span>
                  <span v-else>{{user.followers.length }} abonné</span>
                </div>
              </div>
              <div @click="unfollow(user.id)" class="btn-follow">Abonné</div>
            </div>
          </div>
          <div v-else>
            <div class="container" style="margin: 100px auto 0px; text-align: center;">
              <div style="margin: 0px auto;">
                <lottie :options="defaultOptions" :width="200"/>
              </div>
            </div>
            <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun abonnement</h5>
            <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos abonnements apparaîtront ici.</div>
          </div>
        </div>
      </div>

      <div v-if="tabFollowers && !loading" class="top-author">
        <div v-if="followers && followers.length" class="top-author--container">
          <div v-for="user in followers" class="top-author--item">
            <img v-if="user.picture" class="user" :src="cloudinary256x256 + user.picture">
      			<img v-else class="user" :src="require(`@/assets/img/anonyme.jpg`)">
            <div>
              <span v-if="user.vendor">{{ user.vendor.businessName }}</span>
              <span v-else>{{ user.firstname }} {{ user.lastname }}</span>
            </div>
            <div @click="actionSheet(user.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px; height: 20px; fill: #999; border-radius: 30px;">
                <path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="container" style="margin: 100px auto 0px; text-align: center;">
            <div style="margin: 0px auto;">
              <lottie :options="defaultOptions" :width="200"/>
            </div>
          </div>
          <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun abonné</h5>
          <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos abonnés apparaîtront ici.</div>
        </div>
      </div>

      <div v-if="tabFollowing && !loading" class="top-author">
        <div v-if="following && following.length" class="top-author--container">
          <div v-for="user in following" class="top-author--item">
            <img v-if="user.picture"class="user" :src="cloudinary256x256 + user.picture">
      			<img v-else class="user" :src="require(`@/assets/img/anonyme.jpg`)">
            <div>
              <span>{{ user.vendor.businessName }}</span>
              <div>
                <span v-if="user.followers.length > 1">{{user.followers.length }} abonnés</span>
                <span v-else>{{user.followers.length }} abonné</span>
              </div>
            </div>
            <div @click="unfollow(user.id)" class="btn-follow">Abonné</div>
          </div>
        </div>
        <div v-else>
          <div class="container" style="margin: 100px auto 0px; text-align: center;">
            <div style="margin: 0px auto;">
              <lottie :options="defaultOptions" :width="200"/>
            </div>
          </div>
          <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun abonnement</h5>
          <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos abonnements apparaîtront ici.</div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped src="../assets/css/listfollowing.css"></style>

<script>
import Product from '../components/Product';
import Lottie from 'vue-lottie';
import * as animationData from '../assets/lottie/followers.json';


export default {
  name: 'ListFollowing',
  components: {
    'lottie': Lottie,
  },
  data() {
    return {
      user: JSON.parse(window.localStorage.getItem("user")),
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      defaultOptions: {animationData: animationData},
      tabFollowers: true,
      tabFollowing: false,
      followers: null,
      following: null,
      loading: true,
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");
    
    if (this.user && this.token) {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/following", {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.following = JSON.parse(response.data);
	      this.loading = false;
        console.log(this.following);
      }, (response) => {
        console.log(response.error);
      });
      
      if (this.user.vendor) {
	      window.cordova.plugin.http.get(this.baseUrl + "/user/api/followers", {}, { Authorization: "Bearer " + this.token }, (response) => {
	        this.followers = JSON.parse(response.data);
	        this.loading = false;
	        console.log(this.followers);
	      }, (response) => {
	        console.log(response.error);
	      });
      }
    }
  },
  methods: {
    showFollowers() {
      this.tabFollowers = true;
      this.tabFollowing = false;
    },
    showFollowing() {
      this.tabFollowers = false;
      this.tabFollowing = true;
    },
    unfollow(id) {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/follow/" + id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        window.localStorage.setItem("user", response.data);
        var filtersList = this.following.filter(element => element.id !== id);
        this.following = filtersList;
      }, (response) => {
        console.log(response.error);
      });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
    removeFollower(id) {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/followers/remove/" + id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        window.localStorage.setItem("user", response.data);
        var filtersList = this.followers.filter(element => element.id !== id);
        this.followers = filtersList;
      }, (response) => {
        console.log(response.error);
      });
    },
    actionSheet(userId) {
      var buttonLabels = ['Supprimer ce follower'];
      var options = {
        buttonLabels: buttonLabels,
        addCancelButtonWithLabel: 'Annuler',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };

      window.plugins.actionsheet.show(options, (index) => {
        console.log(index);
        if (index == 1) {
          this.removeFollower(userId);
        }
      }, (error) => {
        console.log(error);
      });
    },
  }
};
</script>