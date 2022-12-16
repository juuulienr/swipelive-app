<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Mes abonnements</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 50px;">
      <div v-if="user.vendor" class="images_filter" style="margin: 15px 0px;">
        <ul>
          <li @click="showFollowers()" v-bind:class="{active: tabFollowers}"  :style="[tabFollowers ? {'color': '#ff2773'} : {'color': '#525c66'}]">Abonnés </li>
          <li @click="showFollowing()" v-bind:class="{active: tabFollowing}"  :style="[tabFollowing ? {'color': '#ff2773'} : {'color': '#525c66'}]">Abonnement </li>
        </ul>
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
            <div @click="actionSheet()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px; height: 20px; fill: #999; border-radius: 30px;"><path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z"></path></svg>
            </div>
          </div>
        </div>
     <!--    <div v-else>
          <div class="container" style="margin: 100px auto 0px; text-align: center;">
            <video style="height: 220px; width: 220px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/follower.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
          </div>
          <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 30px;">Aucun abonné</h5>
          <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos abonnés apparaîtront ici.</div>
        </div> -->
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
            <div @click="unfollow(user.id)" style="background-color: #eee; color: #666; text-align: center;width: fit-content;margin: 0px auto;padding: 5px 24px;border-radius: 30px;font-size: 13px;">Abonné</div>
          </div>
        </div>
       <!--  <div v-else>
          <div class="container" style="margin: 100px auto 0px; text-align: center;">
            <video style="height: 220px; width: 220px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/follower.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
          </div>
          <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 30px;">Aucun abonnement</h5>
          <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos abonnements apparaîtront ici.</div>
        </div> -->
      </div>
    </div>
  </main>
</template>


<style scoped>
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
  width: 54px;
  height: 54px;
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
  font-weight: 500;
  line-height: 1.57143;
}

.top-author--item > div > div {
  line-height: 1.5;
  font-size: 14px;
  font-weight: 400;
  color: #525c66;
  display: flex;
  align-items: center;
}
.top-author--item > div > div > svg {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}


.images_filter ul {
  background-color: #f4f6f9;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
}

.images_filter ul li {
  display: inline-block;
  text-align: center;
  width: 50%;
  margin: 2px;
  padding: 1vh 0;
  color: #6c7b8a;
}

.images_filter ul .active {
  background-color: #fff;
  color: #000;
  border-radius: 10px;
}

</style>

<script>
export default {
  name: 'ListFollowing',
  data() {
    return {
      user: JSON.parse(window.localStorage.getItem("user")),
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
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
    
    console.log(this.user);

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
    actionSheet() {
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
          // supprimer follower
        }
      }, (error) => {
        console.log(error);
      });
    },
  }
};
</script>