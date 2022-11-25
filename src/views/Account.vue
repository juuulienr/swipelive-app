<template>
  <main class="my_profile1">
    <div style="padding: 15px 15px 15px;">
      <svg @click="goBack()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(22, 24, 35);"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
    </div>
    <div v-if="user" class="info_profile">
      <div>
        <div class="img_profile">
          <img v-if="user.picture" :src="baseUrl + '/uploads/' + user.picture" style="width: 110px; height: 110px; object-fit: cover; border-radius: 50%; image-orientation: none; border: 3px solid #fe2c55; padding: 3px;"/>
          <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="width: 110px; height: 110px; object-fit: cover; border-radius: 50%; image-orientation: none;border: 3px solid #fe2c55; padding: 3px;"/>
        </div>
        <div class="per_inf">
          <h5 v-if="user.vendor" class="name" style="font-size: 18px; font-weight: 600; padding-bottom: 25px; margin-bottom: 0px;">{{ user.vendor.businessName }}</h5>
          <h5 v-else class="name" style="font-size: 18px; font-weight: 600; padding-bottom: 25px; margin-bottom: 0px;">{{ user.firstname }} {{ user.lastname }}</h5>
        </div>
      </div>
      <div v-if="user.vendor" @click="goPrelive()" class="btn-follow">
        <div class="btn-swipe" style="color: white; text-align: center; width: fit-content; background: #fe2c55; margin: 0px auto; padding: 12px 40px; border: 1px solid #fe2c55; border-radius: 30px; margin-bottom: 30px;">Lancer un live</div>
      </div>

      <div v-if="user.vendor" class="profile--follow" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 12px 0px; margin: 20px 40px;">
        <div>
          <h4>{{ user.followers.length }}</h4>
          <p v-if="user.followers.length > 1">Abonnés</p>
          <p v-else>Abonné</p>
        </div>
        <hr>
        <div>
          <h4>{{ user.vendor.lives.length }}</h4>
          <p v-if="user.vendor.lives.length > 1">Lives</p>
          <p v-else>Live</p>
        </div>
        <hr>
        <div>
          <h4>{{ user.vendor.sales.length }}</h4>
          <p v-if="user.vendor.sales.length > 1">Ventes</p>
          <p v-else>Vente</p>
        </div>
      </div>
    </div>
    
    <ul class="listbrands mb-3">
      <li>
        <router-link :to="{ name: 'EditUser' }">
          <span style="font-size: 16px; color: #333;">
            <img :src="require(`@/assets/img/profil.png`)" style="border: 1px solid #eab958;"> Mon Profil
          </span>
          <span style="float: right;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-top: 14px; margin-left: 3px;">
              <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
            </svg>
          </span>
        </router-link>
      </li>
      <li v-if="user.vendor">
        <router-link :to="{ name: 'ShopVendor' }">
          <span style="font-size: 16px; color: #333;">
            <img :src="require(`@/assets/img/shop.png`)" style="border: 1px solid #64a0d3;"> Ma Boutique
          </span>
          <span style="float: right;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-top: 14px; margin-left: 3px;">
              <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
            </svg>
          </span>
        </router-link>
      </li>
      <li v-if="user.vendor">
        <router-link :to="{ name: 'ClipsVendor' }">
          <span style="font-size: 16px; color: #333;">
            <img :src="require(`@/assets/img/clips.png`)" style="border: 1px solid #a48fe0;"> Mes Clips
          </span>
          <span style="float: right;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-top: 14px; margin-left: 3px;">
              <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
            </svg>
          </span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'ListOrders' }">
          <span style="font-size: 16px; color: #333;">
            <img :src="require(`@/assets/img/orders.png`)" style="border: 1px solid #66bfa4;"> Mes Transactions
          </span>
          <span style="float: right;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-top: 14px; margin-left: 3px;">
              <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
            </svg>
          </span>
        </router-link>
      </li>
      <li v-if="user.vendor">
        <router-link :to="{ name: 'Wallet' }">
          <span style="font-size: 16px; color: #333;">
            <img :src="require(`@/assets/img/wallet.png`)" style="border: 1px solid #64a0d3;"> Mon Porte-monnaie
          </span>
          <span style="float: right;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-top: 14px; margin-left: 3px;">
              <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
            </svg>
          </span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'ListMessages' }">
          <span style="font-size: 16px; color: #333;">
            <img :src="require(`@/assets/img/chat.png`)" style="border: 1px solid #a48fe0;"> Mes Discussions
          </span>
          <span style="float: right;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-top: 14px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
          </span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'ListFollowing' }">
          <span style="font-size: 16px; color: #333;">
            <img :src="require(`@/assets/img/followers.png`)" style="border: 1px solid #e07da4;"> Mes Abonnements
          </span>
          <span style="float: right;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-top: 14px; margin-left: 3px;">
              <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
            </svg>
          </span>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'About' }">
          <span style="font-size: 16px; color: #333;">
            <img :src="require(`@/assets/img/info.png`)" style="border: 1px solid #eab958;"> Informations
          </span>
          <span style="float: right;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 20px; height: 20px; width: 15px; height: 15px; margin-top: 14px; margin-left: 3px;">
              <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
            </svg>
          </span>
        </router-link>
      </li>
      <li @click="logout()" style="cursor: pointer; margin: 15px 15px 50px; font-weight: 600; padding: 0px;">
        <span style="color: #ff0000;font-size: 15px;margin: 10px auto;">Déconnexion</span>
      </li>
    </ul>
  </main>
</template>


<style scoped>
.my_profile1 .info_profile {
  text-align: center;
}

.my_profile1 .info_profile .img_profile {
  margin: 0 auto;
}

.my_profile1 .info_profile .per_inf .name {
  margin-top: 1.5vh;
  margin-bottom: 4px;
}

.my_profile1 .info_profile .per_inf .desc {
  font-size: 14px;
  color: #6c7b8a;
  margin-top: 5px;
}

.my_profile1 .info_profile .info_folw {
  padding: 2vh 6vw;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 75%;
  margin: auto;
}

.my_profile1 .info_profile .info_folw .folw .count_folow {
  margin-bottom: 3px;
  font-size: 1.2rem;
}

.my_profile1 .info_profile .info_folw .folw .name_folow {
  font-size: 0.9em;
  color: #6c7b8a;
}

.my_profile1 .info_profile .btn-follow .btn {
  background: #FE2C55;
  -webkit-box-shadow: 0px 0px 9px -2px rgb(0 0 0 / 50%);
  box-shadow: 0px 0px 9px -2px rgb(0 0 0 / 50%);
  padding: 10px 42px;
  font-weight: bold;
  margin: 10px 0px;
  border-radius: 30px;
}
 .my_profile1 header {
  display: grid;
  margin: 0px 20px;
  grid-auto-flow: column;
  justify-content: space-between;
  height: 50px;
  align-items: center;
}
header img {
  width: 24px;
  height: 24px;
}
.my_profile1 header .h-title {
 font-size: 1em;
 text-transform: uppercase;
 letter-spacing: 0.6px;
 margin-left: 4vw;
}
.my_profile1 header .back_icon img {
 width: 16px;
}
.my_profile1 header .h-option-icon img {
 width: 16px;
 margin: 0 4px;
}
.my_profile1 .refresh {
 position: fixed;
 top: 12vh;
 left: 45vw;
 background-color: #fff;
 border-radius: 25px;
 padding: 1.5vh 5vw;
 box-shadow: 0px 0px 5px 7px #eee;
}
.my_profile1 .refresh img {
 width: 26px;
}
.my_profile1 {
 color: #140f26;
}
.my_profile1 .listbrands li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 30px;
}
.my_profile1 .listbrands li img {
  width: 45px;
  border-radius: 11px;
  margin-right: 15px;
}

.my_profile1 {
  background-color: #fff;
}

.my_profile1 .info_user {
  text-align: center;
}

.my_profile1 .info_user .per_inf .name {
  margin-top: 1.5vh;
  margin-bottom: 4px;
}

.my_profile1 .info_user .per_inf .desc {
  font-size: 0.9em;
  color: #6c7b8a;
}

.my_profile1 .info_user .info_folw {
  padding: 2vh 6vw;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 75%;
  margin: auto;
}

.my_profile1 .info_user .info_folw .folw .count_folow {
  margin-bottom: 3px;
  font-size: 1.2rem;
}

.my_profile1 .info_user .info_folw .folw .name_folow {
  font-size: 0.9em;
  color: #6c7b8a;
}

.my_profile1 .info_user .btn-follow .btn {
  background: #FE2C55;
  -webkit-box-shadow: 0px 0px 9px -2px rgb(0 0 0 / 50%);
  box-shadow: 0px 0px 9px -2px rgb(0 0 0 / 50%);
  padding: 10px 42px;
  font-weight: bold;
  margin: 10px 0px;
  border-radius: 30px;
}

.my_profile1 .images_sec {
  padding: 2vh 5vw;
}

.my_profile1 .images_sec .images_filter ul {
  background-color: #f4f6f9;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.my_profile1 .images_sec .images_filter ul li {
  display: inline-block;
  text-align: center;
  width: 50%;
  margin: 2px 1%;
  padding: 1vh 0;
  color: #6c7b8a;
}

.my_profile1 .images_sec .images_filter ul .active {
  background-color: #fff;
  color: #000;
  border-radius: 10px;
}

.my_profile1 .images_sec .images {
  margin-top: 2vh;
}

.my_profile1 .images_sec .images .row {
  margin: 0;
}

.my_profile1 .images_sec .images .col-img {
  padding: 2px 1vw;
}

.my_profile1 .images_sec .images .image img {
  border-radius: 5px;
}

.profile--follow {
  background-color: rgb(255, 255, 255);
  color: rgb(33, 43, 54);
  background-image: none;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  z-index: 0;
  display: flex;
  flex-direction: row;
}
.profile--follow > div {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
}
.profile--follow > div > h4 {
  font-weight: 600;
  line-height: 1.5;
  font-size: 17px;
}
.profile--follow > div > p {
  line-height: 1.57143;
  font-size: 13px;
  font-weight: 500;
  color: #637381;
  margin: 0px;
}
.profile--follow > hr {
  flex-shrink: 0;
  border-width: 0px thin 0px 0px;
  border-style: solid;
  border-color: rgba(145, 158, 171, 0.24);
  height: auto;
  align-self: stretch;
}

a {
  width: 100%;
}

.btn-swipe {
  margin: auto;
  text-align: center;
  -webkit-animation: jumpscale 1.2s ease-in-out infinite;
}

@keyframes jumpscale {
  0% {
    transform: scale(.9);
  }
  80% {
    transform: scale(1);
  }
  100% {
    transform: scale(.9);
  }
}


</style>

<script>

import AuthAPI from "../services/authAPI.js";

export default {
  name: 'Account',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);  
    window.StatusBar.styleDefault();

    var isAuthenticated = AuthAPI.isAuthenticated();
    if (!isAuthenticated) {
      this.$router.push({ name: 'Welcome' });
    }

    if (this.user && this.token) {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/live/remove/waiting", {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.user = JSON.parse(response.data);
        window.localStorage.setItem("user", response.data);
      }, (error) => {
        console.log(error);
      });
    }
  },
  methods: {
    logout() {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('lineItems');
      this.$router.push({ name: 'Welcome' });
    },
    goBack() {
      this.$router.push({ name: 'Feed' });
    },
    goPrelive() {
      this.$router.push({ name: 'PreLive' });
    }
  }
};

</script>

