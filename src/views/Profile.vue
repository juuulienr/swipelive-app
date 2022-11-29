<template>
  <main class="my_profile1" v-touch:swipe.right="swipeHandler">
    <div style="padding: 15px;">
      <svg @click="goBack()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823;">
        <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
      </svg>
      <div @click="actionSheet()" style="float: right;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px;height: 20px;fill: #161823;border-radius: 30px;"><path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z"></path></svg>
      </div>
    </div>
    <div v-if="profile" class="info_profile">
      <div class="img_profile">
        <img v-if="profile.picture" :src="cloudinary256x256 + profile.picture" style="width: 96px; height: 96px; object-fit: cover; border-radius: 50%; image-orientation: none; border: 3px solid #ff2773; padding: 3px;"/>
        <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="width: 96px; height: 96px; object-fit: cover; border-radius: 50%; image-orientation: none;border: 2 dashed #ff2773; padding: 3px;"/>
      </div>

      <div v-if="profile.vendor" class="per_inf">
        <h5 class="name" style="font-size: 18px; font-weight: 600;">{{ profile.vendor.businessName }}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="width: 32px;height: 32px;margin-left: 5px;margin-bottom: 3px;"><defs></defs>
            <path class="fa-primary" d="M160 160H103.4c-13.25 0-24 10.75-24 24v144c0 13.25 10.75 24 24 24s24-10.75 24-24V288H160c35.28 0 64-28.7 64-64S195.3 160 160 160zM160 240H127.4v-32H160c8.812 0 16 7.172 16 16S168.8 240 160 240zM488 160c-48.53 0-88 43.06-88 96s39.47 96 88 96S576 308.9 576 256S536.5 160 488 160zM488 304C465.9 304 448 282.5 448 256s17.94-48 40-48S528 229.5 528 256S510.1 304 488 304zM384.6 224c0-35.3-28.72-64-64-64H264C250.8 160 240 170.8 240 184v144C240 341.3 250.8 352 264 352S288 341.3 288 328V288h17.01l34.93 53.17C344.6 348.2 352.2 352 360 352c4.5 0 9.094-1.266 13.16-3.938c11.06-7.281 14.16-22.16 6.875-33.23l-24.51-37.32C373 266.1 384.6 246.4 384.6 224zM320.6 240H288v-32h32.63c8.812 0 16 7.172 16 16S329.4 240 320.6 240z" style="fill: #385898;fill: rgb(0, 132, 255);"></path><path class="fa-secondary" d="M320.6 208H288v32h32.63c8.812 0 16-7.172 16-16S329.4 208 320.6 208zM160 208H127.4v32H160c8.812 0 16-7.172 16-16S168.8 208 160 208zM576 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h512c35.35 0 64-28.65 64-64V96C640 60.65 611.3 32 576 32zM160 288H127.4v40c0 13.25-10.75 24-24 24s-24-10.75-24-24v-144c0-13.25 10.75-24 24-24H160c35.28 0 64 28.7 64 64S195.3 288 160 288zM380.1 314.8c7.281 11.08 4.188 25.95-6.875 33.23C369.1 350.7 364.5 352 360 352c-7.812 0-15.47-3.812-20.09-10.83L305 288H288v40C288 341.3 277.3 352 264 352S240 341.3 240 328v-144C240 170.8 250.8 160 264 160h56.63c35.28 0 64 28.7 64 64c0 22.4-11.61 42.07-29.08 53.51L380.1 314.8zM488 352c-48.53 0-88-43.06-88-96s39.47-96 88-96S576 203.1 576 256S536.5 352 488 352zM488 208C465.9 208 448 229.5 448 256s17.94 48 40 48S528 282.5 528 256S510.1 208 488 208z" style="fill: #E7F3FF;"></path>
          </svg>
        </h5>
        <p class="desc" style="margin: 10px 45px 20px;">{{ profile.vendor.summary }}</p>
      </div>
      <div v-else class="per_inf">
        <h5 class="name" style="font-size: 18px; font-weight: 600;">{{ profile.firstname }} {{ profile.lastname }}</h5>
      </div>

      <div class="btn-follow" style="display: flex; justify-content: center; align-items: center;">
        <div v-if="following" @click="updateFollow()" class="btn-swipe" style="color: #ff2773; text-align: center; width: fit-content; background: white; padding: 10px 40px; border: 1px solid #ff2773; border-radius: 30px; margin-right: 10px;">Abonné</div>
        <div v-else @click="updateFollow()" class="btn-swipe" style="color: white; text-align: center; width: fit-content; background: #ff2773; padding: 10px 40px; border: 1px solid #ff2773; border-radius: 30px; margin-right: 10px;">S'abonner</div>
        <svg v-if="following" @click="sendMessage(profile.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 26px;height: 26px;margin-left: 7px;fill: rgb(153, 153, 153);"><path d="M256 31.1c-141.4 0-255.1 93.13-255.1 208c0 47.62 19.91 91.25 52.91 126.3c-14.87 39.5-45.87 72.88-46.37 73.25c-6.623 7-8.374 17.25-4.624 26C5.816 474.3 14.38 480 24 480c61.49 0 109.1-25.75 139.1-46.25c28.1 9 60.16 14.25 92.9 14.25c141.4 0 255.1-93.13 255.1-207.1S397.4 31.1 256 31.1zM256 416c-28.25 0-56.24-4.25-83.24-12.75c-9.516-3.068-19.92-1.461-28.07 4.338c-22.1 16.25-58.54 35.29-102.7 39.66c11.1-15.12 29.75-40.5 40.74-69.63l.1289-.3398c4.283-11.27 1.791-23.1-6.43-32.82C47.51 313.1 32.06 277.6 32.06 240c0-97 100.5-176 223.1-176c123.5 0 223.1 79 223.1 176S379.5 416 256 416zM256 216c-13.25 0-24 10.74-24 24c0 13.25 10.75 24 24 24s24-10.75 24-24C280 226.7 269.3 216 256 216zM384 216c-13.25 0-24 10.74-24 24c0 13.25 10.75 24 24 24s24-10.75 24-24C408 226.7 397.3 216 384 216zM128 216c-13.25 0-24 10.74-24 24c0 13.25 10.75 24 24 24S152 253.3 152 240C152 226.7 141.3 216 128 216z"></path></svg>
      </div>

      <div class="profile--follow" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 12px 0px; margin: 20px 60px 0px;">
        <div>
          <h4>{{ followers }}</h4>
          <p v-if="followers > 1">Abonnés</p>
          <p v-else>Abonné</p>
        </div>
        <hr>
        <div>
          <h4>{{ profile.vendor.lives.length }}</h4>
          <p v-if="profile.vendor.lives.length > 1">Lives</p>
          <p v-else>Live</p>
        </div>
      </div>
    </div>

    <div v-if="profile" class="images_sec">
      <div class="images_filter">
        <ul>
          <li v-if="profile.vendor.clips" @click="showLive()" v-bind:class="{active: live}"  :style="[live ? {'color': '#ff2773'} : {'color': '#999'}]" style="font-weight: 600;">Replay <span :style="[live ? {'background': '#f1f0f0'} : {'background': '#FFF'}]" style="margin-left: 5px; padding: 3px 9px; border-radius: 40px; font-size: 13px;">{{ profile.vendor.clips.length }}</span></li>
          <li v-if="profile.vendor.products" @click="showShop()" v-bind:class="{active: shop}"  :style="[shop ? {'color': '#ff2773'} : {'color': '#999'}]" style="font-weight: 600;">Produits <span :style="[shop ? {'background': '#f1f0f0'} : {'background': '#FFF'}]" style="margin-left: 5px; padding: 3px 9px; border-radius: 40px; font-size: 13px; color: #ff2773;">{{ profile.vendor.products.length }}</span></li>
        </ul>
      </div>

      <div v-if="live" class="images">
        <div v-if="profile" class="row">
          <div v-for="(clip, index) in profile.vendor.clips" class="col-6 col-img">
            <router-link v-if="clip.status == 'available'" :to="{ name: 'ListClips', params: { type: 'profile', index: index, profileId: profile.id }}">
              <img :src="clip.preview" style="border-radius: 10px; width: 100%">
              <img :src="cloudinary256x256 + clip.product.uploads[0].filename" style="width: 48px; height: 48px; border: 2px solid white; border-radius: 30px; background: white; position: absolute; left: 39%; top: 81%; box-shadow: rgb(96 121 159 / 12%) 0px 7px 14px 0px, rgb(0 33 60 / 12%) 0px 3px 6px 0px; object-fit: cover;">
            </router-link>
          </div>
        </div>
      </div>

      <div v-if="shop" class="items" style="margin-top: 20px;">
        <div v-if="profile && profile.vendor.products" class="shop--part" style="margin: 0px;">
          <div v-if="product.archived == false" v-for="product in profile.vendor.products" class="shop--item">
            <div @click="goProduct(product.id)">
              <div style="text-align:center;">
                <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="padding: 5px; width: calc(50vw - 45px); height: calc(50vw - 45px); object-fit: cover; border-radius: 10px;">
              </div>
            </div>
            <div @click="goProduct(product.id)" class="shop--item--details">
              <div class="shop--item--name" style="margin-top: 0px; height: 45px; font-weight: 500; line-height: 1.24; text-align: center; justify-content: center;">{{ product.title }}</div>
              <div>
                <div class="btn-swipe" style="color: white; text-align: center; font-size: 14px; width: 100%; background: rgb(24, 206, 160); padding: 9px; border-radius: 7px; font-weight: 600;"> {{ product.price | formatPrice }}€ 
                  <span v-if="product.compareAtPrice" style="opacity: 0.7; text-decoration: line-through; font-weight: 500; padding-left: 5px; font-size: 13px; line-height: 18px;">{{ product.compareAtPrice | formatPrice }}€ </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>
header {
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
  background: #ff2773;
  -webkit-box-shadow: 0px 0px 9px -2px rgb(0 0 0 / 50%);
  box-shadow: 0px 0px 9px -2px rgb(0 0 0 / 50%);
  padding: 10px 42px;
  font-weight: bold;
  margin: 10px 0px;
  border-radius: 30px;
}

.my_profile1 .images_sec {
  padding: 30px 15px;
}

.my_profile1 .images_sec .images_filter ul {
  background-color: #f4f6f9;
  border-radius: 12px;
  display: flex;
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
  margin-top: 10px;
}

.my_profile1 .images_sec .images .row {
  margin: 0;
}

.col-img {
  padding: 5px;
}

.my_profile1 .images_sec .images .image img {
  border-radius: 5px;
}


.items .one_item {
  margin: 0px 0px 2vh;
}

.items .one_item .img_item img {
  width: calc(50vw - 45px);
  height: calc(50vw - 45px);
  object-fit: cover;
  border-radius: 8px;
}

.items .one_item .info_item {
  padding: 1.5vh 0 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.items .one_item .info_item p {
  margin-bottom: 3px;
}

.items .one_item .info_item .price {
  color: #5882f2;
  font-size: 0.8em;
}

.items .one_item .info_item .title {
  font-size: 0.9em;
  font-weight: 500;
}

.items .one_item .info_item .disc {
  color: #fff;
  background-color: #979797;
  font-size: 0.8em;
  padding: 1.5px 6px;
  border-radius: 3px;
}

.items .one_item .shop_icon img {
  width: 9vw;
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


.shop--item {
  background-color: rgb(255, 255, 255);
  color: rgb(33, 43, 54);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  overflow: hidden;
  position: relative;
  border-radius: 16px;
  z-index: 0;
}
.shop--item > div:first-of-type > div > img {
  object-fit: cover;
  max-width: 100%;
}
.shop--item--details {
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 0px;
  padding-bottom: 15px;
}
.shop--item--name {
  font-weight: 600;
  line-height: 1.57143;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  text-decoration: none;
  padding-bottom: 5px;
}
.shop--item--name:hover {
  text-decoration: underline;
}
.shop--item--details > div {
  margin: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.color {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.color > span {
  margin-left: -4px;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  border: 2px solid rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 24%) -1px 1px 2px inset;
}
.price {
  font-weight: 600;
  line-height: 1.5;
  font-size: 1rem;
  margin: 0px 0px 0px 4px;
}
.last-price {
  font-weight: 400;
  color: rgb(145, 158, 171);
  text-decoration: line-through;
}
.shop--part {
  display: grid;
  grid-template-columns: repeat(2,1fr)!important;
  gap: 10px;
}
</style>

<script>

export default {
  name: 'Profile',
  data() {
    return {
      id: this.$route.params.id,
      live: true,
      shop: false,
      following: false,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      profile: null,
      notif: true,
      followers: null
    }
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);  
    window.StatusBar.styleDefault();

    var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
    window.cordova.plugin.http.get(this.baseUrl + "/api/profile/" + this.id, {}, httpHeader, (response) => {
      this.profile = JSON.parse(response.data);
      this.followers = this.profile.followers.length;
      
      if (this.profile.followers && this.user) {
        this.profile.followers.map((follower, index) => {
          this.user.following.map((following, index) => {
            if (follower.id == following.id) {
              this.following = true;
              this.notif = true;
            }
          });
        });
      }
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    showShop() {
      this.shop = true;
      this.live = false;
    }, 
    showLive() {
      this.shop = false;
      this.live = true;
    },
    swipeHandler (dir) {
      if (dir == "right") {
        this.$router.push({ name: 'Feed' });
      }
    },
    updateFollow() {
      if (this.user && this.token) {
        if (this.following == true) {
          this.following = false;
          this.followers--;
        } else {
          this.following = true;
          this.followers++;
        }

        window.cordova.plugin.http.get(this.baseUrl + "/user/api/follow/" + this.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
          window.localStorage.setItem("user", response.data);
        }, (response) => {
          console.log(response.error);
        });
      } else {
        this.$router.push({ name: 'Welcome' });
      }
    },
    goProduct(id) {
      this.$router.push({ name: 'Product', params: { id: id } });
    },
    sendMessage(id) {
      this.$router.push({ name: 'Message', params: { id: id } });
    },
    notifOff() {
      this.notif = false;
    },
    notifOn() {
      this.notif = true;
    },
    actionSheet() {
      if (this.following && !this.notif) {
      	var buttonLabels = ['Partager', 'Signaler', 'Activer le son'];
      } else if (this.following && this.notif) {
      	var buttonLabels = ['Partager', 'Signaler', 'Mode silencieux'];
      } else {
      	var buttonLabels = ['Partager', 'Signaler'];
      }

      var options = {
        buttonLabels: buttonLabels,
        addCancelButtonWithLabel: 'Annuler',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };

      window.plugins.actionsheet.show(options, (index) => {
        console.log(index);
        if (index == 1) {
    			window.plugins.socialsharing.share('#1 Application de Live Shopping', null, null, 'https://swipelive.fr');
        } else if (index == 2) {
          window.plugins.toast.show("L'utilisateur a été signalé !", 'long', 'top', function(a){
            console.log('toast success: ' + a);
          }, function(b){
            console.log('toast error: ' + b);
          });
        } else {
          // this.notifOn();
          // Activer le son
          
          // this.notifOff();
          // Mode silencieux
        }
      }, (error) => {
        console.log(error);
      });
    },
    goBack() {
      this.$router.back();
    }
  }
};

</script>

