<template>
  <main v-touch:swipe.right="swipeHandler" class="my_profile1" style="padding: 0px;">
    <div class="checkout__header" style="padding: 5px 15px 15px 12px;">
      <div @click="goBack()" class="checkout__close-btn" style="top: 10px;">
        <img :src="require(`@/assets/img/arrow-left.svg`)" style="width: 28px; height: 28px;"/>
      </div>
      <div class="checkout__title"></div>
      <div @click="actionSheet()" class="checkout__right-btn" style="top: 8px;">
        <img :src="require(`@/assets/img/ellipsis-h.svg`)" style="width: 28px; height: 28px;"/>
        <img @click="goToMessage(profile)" :src="require(`@/assets/img/comment-dots.svg`)" style="width: 28px; height: 28px; position: absolute; right: 0px; top: 118px;"/>
      </div>
    </div>


    <img v-if="profile && profile.vendor" :src="require(`@/assets/img/bg-profil.png`)" style="width: 100%; margin-top: -27px;">
    <div v-if="profile && profile.vendor" style="padding: 0px; text-align: center; margin-top: -60px;">
      <div>
        <img v-if="profile.picture" :src="cloudinary256x256 + profile.picture" class="user" style="margin: 5px; width: 100px; border-radius: 50%; border: 7px solid white; height: 100px; box-shadow: rgb(0 0 0 / 12%) 0px 0px 6px 0px;">
        <img v-else :src="require(`@/assets/img/anonyme.jpg`)" class="user" style="margin: 5px; width: 100px; border-radius: 50%; border: 7px solid white; height: 100px; box-shadow: rgb(0 0 0 / 12%) 0px 0px 6px 0px;">
        <div style="margin-top: -40px; margin-left: 65px;border-radius: 50px;border: 2px solid white;">
          <img v-if="!following" @click="updateFollow()" :src="require(`@/assets/img/plus-circle.svg`)" style="width: 35px; height: 35px; border: 1px solid white; background: white; border-radius: 100px;"/>
          <img v-else @click="updateFollow()" :src="require(`@/assets/img/check-circle.svg`)" style="width: 35px; height: 35px; border: 1px solid white; background: white; border-radius: 100px;"/>
        </div>
        <div style="margin-top: 7px;">
          <span style="font-size: 20px; font-weight: 500;">{{ profile.vendor.businessName }}
            <img v-if="profile.vendor.businessType == 'company'" :src="require(`@/assets/img/verified.svg`)" style="width: 24px; height: 24px; margin-bottom: 4px;"/>
          </span>
          <div>
            <span style="font-weight: 400">{{ followers }} abonnés</span>
          </div>
        </div>

        <p class="desc" style="margin: 10px 30px 20px; font-weight: 400; font-size: 14px; color: #1F1D2B; text-align: center;">{{ profile.vendor.summary }}</p>
        <div class="images_filter" style="padding: 10px; position: sticky; background-color: white; top: 0px; z-index: 1000000;">
          <ul>
            <li @click="showLive()" v-bind:class="{active: live}"  :style="[live ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]" style="font-weight: 600;">Vidéos</li>
            <li @click="showShop()" v-bind:class="{active: shop}"  :style="[shop ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">Boutique</li>
          </ul>
        </div>

        <div class="images_sec" style="padding: 0px 10px;">
          <div v-if="live" class="images" style="margin-bottom: 30px;">
            <div v-if="profile" class="row">
              <div v-for="(clip, index) in profile.vendor.clips" class="col-6 col-img">
                <router-link v-if="clip.status == 'available'" :to="{ name: 'ListClips', params: { type: 'profile', index: index, profileId: profile.id }}">
                  <img :src="clip.preview" style="border-radius: 10px; width: 100%; object-fit: cover;">
                </router-link>
              </div>
            </div>
          </div>

          <div v-if="shop" class="items" style="padding: 5px;">
            <div v-if="profile && profile.vendor.products" class="shop--part" style="gap: 20px 10px;">
              <div v-if="product.archived == false" v-for="product in profile.vendor.products" class="shop--box">
                <div>
                  <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="width: 100%; border-radius: 10px;">
                  <img v-else :src="require(`@/assets/img/no-preview.jpg`)" style="width: 100%; border-radius: 10px;">
                </div>
                <div class="shop--item--details" style="width: 100%; padding: 0px; margin-top: 6px; padding-left: 5px;">
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
      </div>
    </div>
  </main>
</template>


<style scoped>

.my_profile1 .info_profile {
  text-align: center;
}

.my_profile1 .info_profile .btn-follow .btn {
  background: #ff2a80;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px;
  padding: 10px 42px;
  font-weight: bold;
  margin: 10px 0px;
  border-radius: 30px;
}

.images_filter ul {
  background-color: #eff1f6;
  border-radius: 11px;
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
  color: #272c30;
  border-radius: 11px;
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
    window.StatusBar.backgroundColorByHexString("#ffffff");

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
    notifOff() {
      this.notif = false;
    },
    notifOn() {
      this.notif = true;
    },
    actionSheet() {
      var buttonLabels = [ 'Partager', 'Se désabonner', 'Silencieux', 'Signaler'];
      var options = {
        buttonLabels: buttonLabels,
        addCancelButtonWithLabel: 'Annuler',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };

      window.plugins.actionsheet.show(options, (index) => {
        console.log(index);
        if (index == 1) {
        } else if (index == 2) {
          window.plugins.socialsharing.share('#1 Application de Live Shopping', null, null, 'https://swipelive.fr');
        } else if (index == 3) {
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
    goToMessage(user) {
      var exist = false;
      this.user.discussions.map((discussion, index) => {
        if (discussion.vendor.id == user.id) {
          exist = true;
          this.$router.push({ name: 'ListMessages', params: { discussionId: discussion.id } });
        }
      });

      if (!exist) {
        this.$router.push({ name: 'ListMessages', params: { userId: user.id, picture: user.picture, businessName: user.vendor.businessName } });
      }
    }
  }
};

</script>

