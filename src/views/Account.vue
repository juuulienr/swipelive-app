<template>
  <main class="my_profile1" style="padding: 0px 15px">
    <div class="checkout__header">
      <div class="checkout__title">Mon compte</div>
    </div>

    <div class="checkout__body" style="padding-bottom: 95px; padding-top: 15px;">
      <div v-if="user" class="top-author--container" style="padding: 0px; align-items: center;">
        <div @click="goEditProfile()" class="top-author--item">
          <img v-if="user.picture" :src="$cloudinary256x256 + user.picture" class="user" style="margin: 5px; width: 100px; border-radius: 50%; border: 7px solid white; box-shadow: rgb(0 0 0 / 12%) 0px 0px 6px 0px; height: 100px;">
          <img v-else class="user" src="/img/anonyme.jpg" style="margin: 5px; width: 100px; border-radius: 50%; border: 7px solid white; box-shadow: rgb(0 0 0 / 12%) 0px 0px 6px 0px; height: 100px;">
          <img src="/img/cog.svg" style="width: 32px; padding: 3px; height: 32px; border: 1px solid rgb(221, 221, 221) !important; margin-left: -35px; margin-top: 58px; background: white;"/>
          <div style="margin: 0 0 0 8px">
            <span v-if="user.vendor" style="font-size: 16px; font-weight: 500; margin-left: 4px;">{{ user.vendor.pseudo }}
              <svg v-if="user.vendor.businessType == 'company'" viewBox="0 0 24 24" aria-label="Compte certifié" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr" style="width: 19px;height: 19px;margin-bottom: 3px;fill: #ff2f80; margin-left: 5px;"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>
            </span>
            <span v-else style="font-size: 16px; font-weight: 500; margin-left: 4px;">{{ user.firstname }} {{ user.lastname }}</span>
            <div style="margin-left: 4px;">
              <span v-if="user.vendor && user.followers.length > 1">{{ user.followers.length }} abonnés</span>
              <span v-else-if="user.vendor">{{ user.followers.length }} abonné</span>
              <span v-else>{{user.following.length }} abonnement</span>
            </div>
          </div>
        </div>
      </div>

      <p v-if="user.vendor" class="desc" style="margin: 20px 30px; text-align: center;">{{ user.vendor.summary }}</p>

      <div @click="goToVendorRegistration()">
        <img v-if="!user.vendor" src="/img/govendor.webp" style="width: calc(100vw - 30px); margin: 10px 0px 25px;"/>
      </div>
      
      <div v-if="user.vendor" style="background: #ff2f80 !important; border-radius: 16px; margin-top: 25px; margin-bottom: 25px;">
        <div @click="goToPrelive()" class="account-band" style="justify-content: center; padding: 14px 24px;">
          <span style="font-size: 16px; color: #fff;">
            <img style="width: 29px; height: 29px; margin-right: 10px;" class="img1" src="/img/video.svg"/>
          </span>
          <span style="font-weight: 600; color: #fff">Lancer un direct</span>
          <span style="float: right;">
          </span>
        </div>
      </div>

      <div v-if="user.vendor" class="account-box">
        <div class="account-band">
          <div @click="shop()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/shop.svg"/>
            </span>
            <span class="title">Boutique</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
        <div class="account-band">
          <div @click="listOrders(true)" style="width: 100%">
            <span class="left-side">
              <img class="img1" src="/img/orders.svg"/>
            </span>
            <span class="title">Commandes</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
        <div class="account-band">
          <div @click="wallet()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/wallet.svg"/>
            </span>
            <span class="title">Porte-monnaie</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
      </div>
      <div v-if="user.vendor" class="account-box" style="margin-top: 25px;">
        <div class="account-band">
          <div @click="listMessages()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/message.svg"/>
            </span>
            <span class="title">Messagerie</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
        <div class="account-band">
          <div @click="listOrders(false)" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/purchases.svg"/>
            </span>
            <span class="title">Achats</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
        <div class="account-band">
          <div @click="listClips()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/clips.svg"/>
            </span>
            <span class="title">Replays</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
        <div class="account-band">
          <div @click="listPromotions()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/promotion.svg"/>
            </span>
            <span class="title">Promotions</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
      </div>
      <div v-if="user.vendor" class="account-box" style="margin-top: 25px;">
        <div class="account-band">
          <div @click="listFollowing()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/followers.svg"/>
            </span>
            <span class="title">Communauté</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
        <div class="account-band">
          <div @click="listPartners()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/partner.svg"/>
            </span>
            <span class="title">Partenariats</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
        <div class="account-band">
          <div @click="favoris()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/favoris.svg"/>
            </span>
            <span class="title">Favoris</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
      </div>



      <div v-if="!user.vendor" class="account-box">
        <div class="account-band">
          <div @click="listMessages()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/message.svg"/>
            </span>
            <span class="title">Messagerie</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
        <div class="account-band">
          <div @click="listOrders(false)" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/purchases.svg"/>
            </span>
            <span class="title">Achats</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
        <div class="account-band">
          <div @click="listFollowing()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/followers.svg"/>
            </span>
            <span class="title">Abonnements</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
        <div class="account-band">
          <div @click="favoris()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/favoris.svg"/>
            </span>
            <span class="title">Favoris</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
      </div>


      <div v-if="!user.vendor" class="account-box" style="margin-top: 25px;">
        <div class="account-band">
          <div @click="swipeWheel()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/trophy.svg"/>
            </span>
            <span class="title">Swipe Roulette</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
      </div>


      <div class="account-box" style="margin-top: 25px;">
        <div class="account-band" style="justify-content: left;">
          <div @click="addReview()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/star.svg"/>
            </span>
            <span class="title">Noter Swipe Live</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
        <div class="account-band">
          <div @click="about()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/info.svg"/>
            </span>
            <span class="title">Informations</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
        <div class="account-band" style="justify-content: left;">
          <div @click="logout()" style="width: 100%">
            <span class="left-side">
              <img class="img1"src="/img/power.svg"/>
            </span>
            <span class="title">Déconnexion</span>
            <span style="float: right;">
              <img class="img2" src="/img/chevron-right.svg"/>
            </span>
          </div>
        </div>
      </div>

      <div class="box-network" style="padding-top: 12px;">      
        <img src="/img/logo-text.png" style="width: 150px; height: 80px;"/>
      </div>
    </div>
  </main>
</template>


<style scoped src="../assets/css/account.css"></style>


<script>
import { useMainStore } from '../stores/useMainStore.js';

export default {
  name: 'Account',
  data() {
    const mainStore = useMainStore();

    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: mainStore.getUser,
    };
  },
  created() {
    const mainStore = useMainStore();

    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");

    window.cordova.plugin.http.get(
      `${this.baseUrl}/user/api/profile`, 
      {}, 
      { Authorization: `Bearer ${this.token}` }, 
      (response) => {
        const userData = JSON.parse(response.data);
        mainStore.setUser(userData); // Utilisation de l'action Pinia pour mettre à jour l'utilisateur
        this.user = userData;
      }, 
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    logout() {
      const mainStore = useMainStore();

      window.localStorage.removeItem('token');
      window.localStorage.removeItem('banned');
      mainStore.resetState(); // Réinitialisation de l'état avec Pinia
      this.$router.push({ name: 'Welcome' });
    },
    about() {
      this.addTapticAndSlide();
      this.$router.push({ name: 'About' });
    },
    swipeWheel() {
      this.addTapticAndSlide();
      this.$router.push({ name: 'SwipeWheel' });
    },
    listOrders(isOrder) {
      this.addTapticAndSlide();
      this.$router.push({ name: 'ListOrders', params: { isOrder } });
    },
    listFollowing() {
      this.addTapticAndSlide();
      this.$router.push({ name: 'ListFollowing' });
    },
    listMessages() {
      this.addTapticAndSlide();
      this.$router.push({ name: 'ListMessages' });
    },
    listPartners() {
      this.addTapticAndSlide();
      this.$router.push({ name: 'ListPartners' });
    },
    favoris() {
      this.addTapticAndSlide();
      this.$router.push({ name: 'Favoris' });
    },
    listClips() {
      this.addTapticAndSlide();
      this.$router.push({ name: 'ListClips' });
    },
    listPromotions() {
      this.addTapticAndSlide();
      this.$router.push({ name: 'ListPromotions' });
    },
    wallet() {
      this.addTapticAndSlide();
      this.$router.push({ name: 'Wallet' });
    },
    shop() {
      this.addTapticAndSlide();
      this.$router.push({ name: 'Shop' });
    },
    addReview() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      // window.cordova.plugins.AppReview.openStoreScreen(null, true);
    },
    goEditProfile() {
      this.addTapticAndSlide();
      this.$router.push({ name: 'EditUser' });
    },
    goToPrelive() {
      this.addTapticAndSlide();
      if (this.user.vendor.products.length > 0) {
        this.$router.push({ name: 'PreLive' });
      } else {
        this.$router.push({ name: 'Shop' });
      }
    },
    goToVendorRegistration() {
      this.addTapticAndSlide();
      this.$router.push({ name: 'VendorRegistration' });
    },
    addTapticAndSlide() {
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
    },
    openUrl(url) {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      window.SafariViewController.isAvailable((available) => {
        if (available) {
          window.SafariViewController.show({ url }, (result) => {
            console.log(result);
          }, (error) => {
            console.log("KO: " + error);
          });
        } else {
          window.cordova.InAppBrowser.open(url, '_system', 'location=no');
        }
      });
    },
  }
};
</script>