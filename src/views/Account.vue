<template>
  <main class="my_profile1" style="padding: 0px 15px 15px;">
    <div class="checkout__header">
      <div class="checkout__title">Mon compte</div>
    </div>

    <div class="checkout__body" style="padding-bottom: 85px">
      <div v-if="user" class="top-author--container" style="padding: 0px; align-items: center;">
        <div @click="goEditProfile()" class="top-author--item">
          <img v-if="user.picture" :src="cloudinary256x256 + user.picture" class="user" style="margin: 5px; width: 70px; height: 70px;">
          <img v-else class="user" :src="require(`@/assets/img/anonyme.jpg`)" style="margin: 5px; width: 70px; height: 70px;">
          <img :src="require(`@/assets/img/cog.svg`)" style="width: 27px; padding: 3px; height: 27px; border: 1px solid rgb(221, 221, 221) !important; margin-left: -30px; margin-top: 50px; background: white;"/>
          <div style="margin: 0 0 0 8px">
            <span v-if="user.vendor" style="font-size: 16px; font-weight: 500;">{{ user.vendor.businessName }}
              <svg v-if="user.vendor.businessType == 'company'" viewBox="0 0 24 24" aria-label="Compte certifié" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr" style="width: 19px;height: 19Px;margin-bottom: 3px;fill: #ff2a80;"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>
            </span>
            <span v-else style="font-size: 16px; font-weight: 500;">{{ user.firstname }} {{ user.lastname }}</span>
            <div>
              <span v-if="user.vendor && user.followers.length > 1">{{ user.followers.length }} abonnés</span>
              <span v-else-if="user.vendor">{{ user.followers.length }} abonné</span>
              <span v-else>{{user.following.length }} abonnement</span>
            </div>
          </div>
        </div>
      </div>

      <p v-if="user.vendor" class="desc" style="margin: 10px 30px 20px; font-weight: 400; font-size: 14px; color: #1F1D2B; text-align: center;">{{ user.vendor.summary }}</p>


      <hr style="margin-bottom: 25px; margin-top: 10px;">

      <div v-if="!user.vendor" @click="goToVendorRegistration()" class="top-author--container" style="padding: 16px;align-items: center;box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px !important;margin: 10px;border: 1px solid rgb(221, 221, 221) !important;border-radius: 12px !important; margin-bottom: 30px;">
        <div class="top-author--item">
          <div style="margin: 0px 0px 0px 8px;">
            <span style="font-size: 16px;font-weight: 500;font-size: 18px !important;line-height: 22px !important;margin: 0px 0px 8px !important;padding: 0px !important;">Vendez vos articles sur Swipe Live</span>
            <div style="margin-top: 5px;">
              <span style=" font-size: 13px !important; line-height: 18px !important; font-weight: 400 !important; margin: 0px !important; padding: 0px !important;">Commencez à vendre et gagnez de l'argent en toute simplicité.</span>
            </div>
          </div>
          <img :src="require(`@/assets/img/become-seller.png`)" class="user" style="height: 100%;width: 120px;border-radius: 0px;">
        </div>
      </div>


      <div v-if="user.vendor" style="background: #ff2a80 !important; border-radius: 16px; margin-top: 25px; margin-bottom: 25px;">
        <div @click="goToPrelive()" class="account-band" style="justify-content: left;">
          <span style="font-size: 16px; color: #fff;">
            <img class="img1":src="require(`@/assets/img/video.svg`)"/>
          </span>
          <span style="font-weight: 500; color: #fff">Lancer un direct</span>
          <span style="float: right;">
          </span>
        </div>
      </div>


      <div v-if="user.vendor" class="account-box">
        <div class="account-band">
          <router-link :to="{ name: 'Shop' }">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/shop.svg`)"/>
            </span>
            <span class="title">Boutique</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
        <div class="account-band">
          <router-link :to="{ name: 'ListOrders', params: { 'isOrder': true } }">
            <span class="left-side">
              <img class="img1" :src="require(`@/assets/img/orders.svg`)"/>
            </span>
            <span class="title">Commandes</span>
            <span style="float: right;">
              <img class="img2" class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
        <div class="account-band">
          <router-link :to="{ name: 'Wallet' }">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/wallet.svg`)"/>
            </span>
            <span class="title">Porte-monnaie</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
      </div>
      <div v-if="user.vendor" class="account-box" style="margin-top: 25px;">
        <div class="account-band">
          <router-link :to="{ name: 'ListOrders', params: { 'isOrder': false } }">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/purchases.svg`)"/>
            </span>
            <span class="title">Achats</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
        <div class="account-band">
          <router-link :to="{ name: 'ListClips' }">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/clips.svg`)"/>
            </span>
            <span class="title">Replays</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
        <div class="account-band">
          <router-link :to="{ name: 'ListPromotions' }">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/promotion.svg`)"/>
            </span>
            <span class="title">Promotions</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
      </div>
      <div v-if="user.vendor" class="account-box" style="margin-top: 25px;">
        <div class="account-band">
          <router-link :to="{ name: 'ListFollowing' }">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/followers.svg`)"/>
            </span>
            <span class="title">Communauté</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
        <div class="account-band">
          <router-link :to="{ name: 'Partner' }">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/partner.svg`)"/>
            </span>
            <span class="title">Partenariats</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
        <div class="account-band">
          <router-link :to="{ name: 'Favoris' }">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/favoris.svg`)"/>
            </span>
            <span class="title">Favoris</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
      </div>



      <div v-if="!user.vendor" class="account-box">
        <div class="account-band">
          <router-link :to="{ name: 'ListOrders', params: { 'isOrder': false } }">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/purchases.svg`)"/>
            </span>
            <span class="title">Achats</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
        <div class="account-band">
          <router-link :to="{ name: 'ListFollowing' }">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/followers.svg`)"/>
            </span>
            <span class="title">Abonnements</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
        <div class="account-band">
          <router-link :to="{ name: 'Favoris' }">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/favoris.svg`)"/>
            </span>
            <span class="title">Favoris</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
      </div>


      <div v-if="!user.vendor" class="account-box" style="margin-top: 25px;">
        <div class="account-band">
          <router-link :to="{ name: 'SwipeWheel' }">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/trophy.svg`)"/>
            </span>
            <span class="title">Swipe Roulette</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
      </div>


      <div class="account-box" style="margin-top: 25px;">
        <div class="account-band" style="justify-content: left;">
          <div @click="addReview()" style="width: 100%">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/star.svg`)"/>
            </span>
            <span class="title">Noter Swipe Live</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </div>
        </div>
        <div class="account-band">
          <router-link :to="{ name: 'About' }">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/info.svg`)"/>
            </span>
            <span class="title">Informations</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </router-link>
        </div>
        <div class="account-band" style="justify-content: left;">
          <div @click="logout()" style="width: 100%">
            <span class="left-side">
              <img class="img1":src="require(`@/assets/img/power.svg`)"/>
            </span>
            <span class="title">Déconnexion</span>
            <span style="float: right;">
              <img class="img2" :src="require(`@/assets/img/chevron-right.svg`)"/>
            </span>
          </div>
        </div>
      </div>


      <div style="margin-top: 25px;">
        <div class="box-network">
          <img @click="openUrl('https://www.facebook.com/swipelive.fr')" :src="require(`@/assets/img/facebook-link.svg`)" style="width: 48px; height: 48px; margin-right: 20px;"/>
          <img @click="openUrl('https://www.instagram.com/swipeliveapp')" :src="require(`@/assets/img/instagram-link.svg`)" style="width: 48px; height: 48px;"/>
        </div>
      </div>
      <div class="box-network" style="padding: 0px;">      
        <img :src="require(`@/assets/img/logo-text.png`)" style="width: 150px; height: 80px;"/>
      </div>
    </div>
  </main>
</template>


<style scoped src="../assets/css/account.css"></style>


<script>

export default {
  name: 'Account',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: this.$store.getters.getUser,
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);  
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");
  },
  methods: {
    logout() {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('banned');
      window.localStorage.removeItem('rules');
      this.$router.push({ name: 'Welcome' });
    },
    goBack() {
      this.$router.push({ name: 'Feed' });
    },
    addReview() {
      // window.cordova.plugins.AppReview.openStoreScreen(null, true);
    },
    goEditProfile() {
      this.$router.push({ name: 'EditUser' });
    },
    goToPrelive() {
      if (this.user.vendor.products.length > 0) {
        this.$router.push({ name: 'PreLive' });
      } else {
        this.$router.push({ name: 'Shop' });
      }
    },
    goToVendorRegistration() {
      this.$router.push({ name: 'VendorRegistration' });
    },
    openUrl(url) {
      window.SafariViewController.isAvailable((available) => {
        if (available) {
          window.SafariViewController.show({ url: url }, (result) => {
            console.log(result);
          }, (error) => {
            console.log("KO: " + error);
          })
        } else {
          window.cordova.InAppBrowser.open(url, '_system', 'location=no');
        }
      });
    },
  }
};

</script>

