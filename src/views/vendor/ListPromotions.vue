<template>
  <main class="products" style="padding: 0px 15px">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Promotions</div>
    </div>

    <div class="checkout__body">
      <div @click="showPromo()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); margin: 10px 0px 25px;">Ajouter une promotion</div>
      <div v-if="user.vendor.promotions && user.vendor.promotions.length > 0">
 <!--        <div style="border: 1px solid #272c30; margin: 5px;padding: 18px 0px;border-radius: 10px;">
          <p style="text-align: center;margin-bottom: 22Px;">Performances</p>
          <div class="profile--follow">
            <div>
              <h4>{{ user.vendor.promotions.length }}</h4>
              <p v-if="user.vendor.promotions.length > 1">Promotions</p>
              <p v-else>Promotion</p>
            </div>
            <hr style="width: 1px;">
            <div>
              <h4>-</h4>
              <p>Utilisés</p>
            </div>
            <hr style="width: 1px;">
            <div>
              <h4>-</h4>
              <p>Total</p>
            </div>
          </div>
        </div>
 -->
        <p style="text-align: left; font-size: 12px; line-height: 1.57143; font-size: 13px; font-weight: 400; color: #999; margin: 0; margin-top: 15px; padding: 10px;">La promotion activé sera appliqué automatiquement lors du passage en caisse de vos clients.</p>

        <div v-for="(promo, index) in user.vendor.promotions" style="border: 1px solid #ff2f80; margin: 5px;padding: 8px 0px;margin-top: 10px;border-radius: 10px; margin-bottom: 15px;">
          <div class="profile--follow">
            <div style="width: 40%; margin-top: 5px;">
              <img :src="require(`@/assets/img/discount.svg`)" class="user" style="margin: 7px 25px;width: 64px;height: 64px;border-radius: 100%;">
              <label class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-g5gk3y">
                <span @click="check(promo)" class="MuiSwitch-root MuiSwitch-sizeMedium css-1nvvhq">
                  <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1hei3uy" :class="{'Mui-checked': promo.isActive }">
                    <input class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3" type="checkbox" value="true" :checked="promo.isActive">
                    <span class="MuiSwitch-thumb css-byglaq"></span>
                    <span class="MuiTouchRipple-root css-w0pj6f"></span>
                  </span><span class="MuiSwitch-track css-1ju1kxc"></span>
                </span>
              </label>
            </div>
            <hr style="margin: 0px;border-width: 0 2px 0 0;border-style: dashed;border-color: rgba(145,158,171,.24); width: 1px;">
            <div>
              <svg @click="deletePromo(promo, index)" style="width: 24Px; height: 24px; right: 8px; position: absolute;" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="#999999" d="M13.4,12l4.3-4.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L12,10.6L7.7,6.3c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l4.3,4.3l-4.3,4.3C6.1,16.5,6,16.7,6,17c0,0.6,0.4,1,1,1c0.3,0,0.5-0.1,0.7-0.3l4.3-4.3l4.3,4.3c0.2,0.2,0.4,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12z"/></svg>
              <h4 v-if="promo.type == 'percent'" style="font-size: 30px; font-weight: 600; margin-top: 3px; margin-bottom: 0px;color: #ff2f80;">-{{promo.value}}%</h4>
              <h4 v-else style="font-size: 30px; font-weight: 600; margin-top: 3px; margin-bottom: 0px;color: #ff2f80;">-{{promo.value}}€</h4>
              <p>Valable sur toute la boutique </p>
              <h4 style="font-size: 15px; margin: 10px auto; color: #ff2f80; border: 1px solid #ff2f80; padding: 3px 15px; border-radius: 10px;text-transform: uppercase;">{{ promo.title }}</h4>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="container" style="margin: 100px auto 0px; text-align: center;">
          <div style="margin: 0px auto;">
            <Lottie :options="defaultOptions" :width="200"/>
          </div>
        </div>
        <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucune promotion</h5>
        <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos promotions apparaîtront ici.</div>
      </div>
    </div>

    <!-- promo popup -->
    <div v-if="popupPromo" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 30px);">
      <div class="checkout__header" style="padding: 5px 5px 15px; z-index: 10000000; background: white; width: 100%;">
        <div @click="hidePromo()" class="checkout__close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
        </div>
        <div class="checkout__title">Ajouter une promotion</div>
      </div>
      <div class="items" style="margin-top: 20px; margin-bottom: 20px;">
        <div>
          <div class="form--input--item">
            <fieldset>
              <legend>Titre de la promotion</legend>
              <input type="text" v-model="promotion.title" placeholder="Ex: PROMO20" style="text-transform: uppercase;">
            </fieldset>
          </div>
          
          <div class="form--input">
            <div class="form--input--item" :class="{'form--input--item--error': promotion.type == 'percent' && promotion.value > 99 }">
              <fieldset>
                <legend>Valeur de la remise</legend>
                <input type="number" step="1" v-model="promotion.value" placeholder="Ex: 20">
              </fieldset>
            </div>
            <div class="form--input--item">
              <fieldset>
                <legend>Type de remise</legend>
                <select required v-model="promotion.type" :style="{'color': promotion.type ? '#525c66': 'rgba(145,158,171,.8)'}">
                  <option value="" selected>Choisir un type</option>
                  <option value="percent">Pourcentage</option>
                  <option value="fixe">Fixe</option>
                </select>
              </fieldset>
            </div>
          </div>
          <br>
          <div @click="savePromo()" class="btn-swipe" style="color: white; text-align: center;">Enregistrer</div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="../../assets/css/promotion.css"></style>


<script>
import Lottie from 'vue-lottie';
import * as animationData from '../../assets/lottie/discount.json';

export default {
  name: 'ListPromotions',
  components: {
    Lottie
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: this.$store.getters.getUser,
      defaultOptions: {animationData: animationData},
      popupPromo: false,
      promotion: {
        'title': '',
        'type': '',
        'value': null,
        'isActive': true
      },
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");
  },
  methods: {
    goBack() {
      window.plugins.nativepagetransitions.slide({
        direction: 'right',
        duration: 400,
        iosdelay: 0,
        androiddelay: 0,
        winphonedelay: 0,
        slowdownfactor: 1,
      });
      this.$router.push({ name: 'Account' });
    },
    hidePromo() {
      this.popupPromo = false;
    }, 
    savePromo() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      if (this.promotion.value) {
        this.promotion.value = parseFloat(this.promotion.value);
      }

      if (this.promotion.type == 'fixe' || (this.promotion.type == 'percent' && this.promotion.value < 100)) {
        this.user.vendor.promotions.map((promo, index) => {
          promo.isActive = false;
        });

        this.promotion.vendor = this.user.id;
        this.promotion.title = this.promotion.title.toUpperCase();
        this.user.vendor.promotions.unshift(this.promotion);
        this.popupPromo = false;

          console.log(this.promotion);
        window.cordova.plugin.http.setDataSerializer('json');
        window.cordova.plugin.http.post(this.baseUrl + "/user/api/promotion/add", this.promotion, { Authorization: "Bearer " + this.token }, (response) => {
          this.$store.commit('setUser', JSON.parse(response.data));
          this.user = this.$store.getters.getUser;
          this.promotion = { 'title': '', 'type': '', 'value': null, 'isActive': true };
          console.log(this.promotion);
        }, (response) => {
          console.log(JSON.parse(response.error));
          window.plugins.toast.show(JSON.parse(response.error), 'long', 'top');
        });
      }
    },
    deletePromo(promo, index) {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.user.vendor.promotions.splice(index, 1);
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/promotion/delete/" + promo.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.$store.commit('setUser', JSON.parse(response.data));
      }, (response) => {
        console.log(response.error);
      });
    },
    showPromo() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.popupPromo = true;
    },
    check(promo) {
      if(promo.isActive) {
        promo.isActive = false;
      } else {
        this.user.vendor.promotions.map((promotion, index) => {
          promotion.isActive = false;
        });
        promo.isActive = true;
      }

      window.cordova.plugin.http.get(this.baseUrl + "/user/api/promotion/activate/" + promo.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.$store.commit('setUser', JSON.parse(response.data));
      }, (response) => {
        console.log(response.error);
      });
    }
  }
};

</script>

