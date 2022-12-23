<template>
  <main v-touch:swipe.right="swipeHandler" class="my_profile1" style="padding: 0px 10px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Profil</div>
      <div @click="actionSheet()" class="checkout__right-btn" style="right: 15px; position: absolute; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px;height: 20px;fill: #161823;border-radius: 30px;">
          <path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z"></path>
        </svg>
      </div>
    </div>

    <div v-if="profile && profile.vendor" class="checkout__body" style="overflow: scroll; padding-bottom: 50px;">
      <div class="top-author--container" style="padding: 0px;">
        <div class="top-author--item">
          <img v-if="profile.picture" :src="cloudinary256x256 + profile.picture" class="user" style="margin: 5px; width: 80px; height: 80px;">
          <img v-else :src="require(`@/assets/img/anonyme.jpg`)" class="user" style="margin: 5px; width: 80px; height: 80px;">
          <div>
            <span style="font-size: 16px; font-weight: 500;">{{ profile.vendor.businessName }}
              <svg v-if="profile.vendor.businessType == 'company'" viewBox="0 0 24 24" aria-label="Compte certifié" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr" style="width: 19px;height: 19Px;margin-bottom: 3px;fill: #ff2773;"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>
            </span>
            <span v-else style="font-size: 16px; font-weight: 500;">{{ profile.firstname }} {{ profile.lastname }}</span>
            <div>
              <span>{{ followers }} abonnés</span>
            </div>
          </div>
          <div @click="goToMessage(profile.id)" style="color: rgb(0, 132, 255);background-color: rgba(45, 136, 255, 0.2);text-align: center;width: fit-content;margin: 0px auto;padding: 12px;border-radius: 40px;font-size: 13px;font-weight: 400;margin-right: 10px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px;fill: rgb(0, 132, 255);height: 20px;">
              <path d="M128 216c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 384c-28.3 0-56.3-4.3-83.2-12.8l-15.2-4.8-13 9.2c-23 16.3-58.5 35.3-102.6 39.6 12-15.1 29.8-40.4 40.8-69.6l7.1-18.7-13.7-14.6C47.3 313.7 32 277.6 32 240c0-97 100.5-176 224-176s224 79 224 176-100.5 176-224 176z"></path>
            </svg>
          </div>
        </div>
      </div>

      <p class="desc" style="margin: 10px 30px 20px; font-weight: 400; font-size: 14px; color: #1F1D2B; text-align: center;">{{ profile.vendor.summary }}</p>

      <div class="info_profile">
        <div class="btn-follow">
          <div @click="updateFollow()" class="btn-swipe" :style="[following == true ? {'padding': '11px 30px', 'border': '1px solid rgba(99, 99, 99, 0.4)', 'background': 'white', 'color': 'rgba(99, 99, 99, 0.4)'} : {'padding': '12px 30px'}]" style="color: white; text-align: center; width: fit-content; background: #ff2773; margin: 0px auto; border-radius: 30px; margin-bottom: 25px; font-weight: 500; width: 160px;">
            <span v-if="following == true">Abonné</span>
            <span v-else>Suivre</span>
          </div>
        </div>

        <div class="profile--follow" style="box-shadow: 0 0 5px rgb(0 0 0 / 20%); margin: 5px; padding: 12px 0px;">
          <div>
            <h4 v-if="followers">{{ followers }}</h4>
            <h4 v-else>-</h4>
            <p v-if="followers > 1">Abonnés</p>
            <p v-else>Abonné</p>
          </div>
          <hr>
          <div>
            <h4 v-if="profile.vendor.lives.length">{{ profile.vendor.lives.length }}</h4>
            <h4 v-else>-</h4>
            <p v-if="profile.vendor.lives.length > 1">Lives</p>
            <p v-else>Live</p>
          </div>
        </div>
      </div>

      <div class="images_sec">
        <div class="images_filter">
          <ul>
            <li @click="showLive()" v-bind:class="{active: live}"  :style="[live ? {'color': '#ff2773', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]" style="font-weight: 600;">Replay</li>
            <li @click="showShop()" v-bind:class="{active: shop}"  :style="[shop ? {'color': '#ff2773', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">Boutique</li>
          </ul>
        </div>

        <div v-if="live" class="images">
          <div v-if="profile" class="row">
            <div v-for="(clip, index) in profile.vendor.clips" class="col-6 col-img">
              <router-link v-if="clip.status == 'available'" :to="{ name: 'ListClips', params: { type: 'profile', index: index, profileId: profile.id }}">
                <img :src="clip.preview" style="border-radius: 10px; width: 100%; object-fit: cover; height: calc(100% - 10px)">
              </router-link>
            </div>
          </div>
        </div>

        <div v-if="shop" class="items" style="margin-top: 20px; padding: 0px 5px;">
          <div v-if="profile && profile.vendor.products" class="shop--part" style="margin: 0px;">
            <div v-if="product.archived == false" v-for="product in profile.vendor.products" class="shop--item">
              <div>
                <div>
                  <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename">
                  <img v-else :src="require(`@/assets/img/no-preview.jpg`)"/>
                </div>
              </div>
              <div class="shop--item--details">
                <div class="shop--item--name">{{ product.title }}</div>
                <div class="shop--item--price">
                  <div class="price" :style="[product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#000'}]"> {{ product.price | formatPrice }}€ 
                    <span v-if="product.compareAtPrice" class="last-price">{{ product.compareAtPrice | formatPrice }}€ </span>
                  </div>
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

.my_profile1 .info_profile {
  text-align: center;
}

.my_profile1 .info_profile .btn-follow .btn {
  background: #ff2773;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px;
  padding: 10px 42px;
  font-weight: bold;
  margin: 10px 0px;
  border-radius: 30px;
}

.my_profile1 .images_sec {
  padding: 30px 0px;
}

.my_profile1 .images_sec .images_filter ul {
  background-color: #eff1f6;
  border-radius: 11px;
  display: flex;
  justify-content: space-between;
}

.my_profile1 .images_sec .images_filter ul li {
  display: inline-block;
  text-align: center;
  width: 50%;
  margin: 2px;
  padding: 1vh 0;
  color: #6c7b8a;
}

.my_profile1 .images_sec .images_filter ul .active {
  background-color: #fff;
  color: #000;
  border-radius: 11px;
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
      loading: false,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      profile: null,
      notif: true,
      followers: null,
      nbProducts: 0
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

      if (this.profile.vendor.products) {
        this.profile.vendor.products.map(product => {
          if (product.archived == false) {
            this.nbProducts += 1;
          }
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
        this.loading = true;
        if (this.following == true) {
          this.following = false;
          this.followers--;
        } else {
          this.following = true;
          this.followers++;
        }

        window.cordova.plugin.http.get(this.baseUrl + "/user/api/follow/" + this.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
          window.localStorage.setItem("user", response.data);
          this.loading = false;
        }, (response) => {
          console.log(response.error);
          this.loading = false;
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
      var buttonLabels = ['Partager', 'Signaler'];
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
        }
      }, (error) => {
        console.log(error);
      });
    },
    goBack() {
      this.$router.back();
    },
    goToMessage(id) {
      this.$router.push({ name: 'ListMessages', params: { id: id } });
    }
  }
};

</script>

