<template>
  <main class="products" style="padding: 0px 15px">
    <div class="checkout__header">
      <div class="checkout__close-btn" @click="goBack()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Promotions</div>
    </div>

    <div class="checkout__body">
      <div class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); margin: 10px 0px 25px;" @click="showPromo()">Ajouter une promotion</div>
      <div v-if="user.vendor.promotions && user.vendor.promotions.length > 0">
        <p style="text-align: left; font-size: 12px; line-height: 1.57143; font-size: 13px; font-weight: 400; color: #999; margin: 0; margin-top: 15px; padding: 10px;">La promotion activé sera appliqué automatiquement lors du passage en caisse de vos clients.</p>
        <div v-for="(promo, index) in user.vendor.promotions" style="border: 1px solid #ff2f80; margin: 5px;padding: 8px 0px;margin-top: 10px;border-radius: 10px; margin-bottom: 15px;">
          <div class="profile--follow">
            <div style="width: 40%; margin-top: 5px;">
              <img src="/img/discount.svg" class="user" style="margin: 7px 25px;width: 64px;height: 64px;border-radius: 100%;">
              <label class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-g5gk3y">
                <span class="MuiSwitch-root MuiSwitch-sizeMedium css-1nvvhq" @click="check(promo)">
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
              <svg style="width: 24Px; height: 24px; right: 8px; position: absolute;" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" @click="deletePromo(promo, index)"><path fill="#999999" d="M13.4,12l4.3-4.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L12,10.6L7.7,6.3c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l4.3,4.3l-4.3,4.3C6.1,16.5,6,16.7,6,17c0,0.6,0.4,1,1,1c0.3,0,0.5-0.1,0.7-0.3l4.3-4.3l4.3,4.3c0.2,0.2,0.4,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12z"/></svg>
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
            <Vue3Lottie :animationData="LottieJSON" :width="200"/>
          </div>
        </div>
        <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucune promotion</h5>
        <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos promotions apparaîtront ici.</div>
      </div>
    </div>

    <!-- promo popup -->
    <div v-if="popupPromo" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 30px);">
      <div class="checkout__header" style="padding: 5px 5px 15px; z-index: 10000000; background: white; width: 100%;">
        <div class="checkout__close-btn" @click="hidePromo()">
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
              <input v-model="promotion.title" type="text" placeholder="Ex: PROMO20" style="text-transform: uppercase;">
            </fieldset>
          </div>
          
          <div class="form--input">
            <div class="form--input--item" :class="{'form--input--item--error': promotion.type == 'percent' && promotion.value > 99 }">
              <fieldset>
                <legend>Valeur de la remise</legend>
                <input v-model="promotion.value" type="number" step="1" placeholder="Ex: 20">
              </fieldset>
            </div>
            <div class="form--input--item">
              <fieldset>
                <legend>Type de remise</legend>
                <select v-model="promotion.type" required :style="{'color': promotion.type ? '#525c66': 'rgba(145,158,171,.8)'}">
                  <option value="" selected>Choisir un type</option>
                  <option value="percent">Pourcentage</option>
                  <option value="fixe">Fixe</option>
                </select>
              </fieldset>
            </div>
          </div>
          <br>
          <div class="btn-swipe" style="color: white; text-align: center;" @click="savePromo()">Enregistrer</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useMainStore } from '../../stores/useMainStore.js';
import LottieJSON from '../../assets/lottie/discount.json';

export default {
  name: 'ListPromotions',
  data() {
    const mainStore = useMainStore();

    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: mainStore.getUser,
      LottieJSON: LottieJSON,
      popupPromo: false,
      promotion: {
        title: '',
        type: '',
        value: null,
        isActive: true,
      },
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Account' });
    },
    hidePromo() {
      this.popupPromo = false;
    },
    async savePromo() {
      const mainStore = useMainStore();
      this.$Haptics.impact({ style: 'medium' });

      if (this.promotion.value) {
        this.promotion.value = parseFloat(this.promotion.value);
      }

      if (this.promotion.type === 'fixe' || (this.promotion.type === 'percent' && this.promotion.value < 100)) {
        this.user.vendor.promotions.forEach((promo) => {
          promo.isActive = false;
        });

        this.promotion.vendor = this.user.id;
        this.promotion.title = this.promotion.title.toUpperCase();
        this.user.vendor.promotions.unshift(this.promotion);
        this.popupPromo = false;

        try {
          const response = await this.$CapacitorHttp.request({
            method: 'POST',
            url: `${this.baseUrl}/user/api/promotion/add`,
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
            },
            data: this.promotion,
          });

          const updatedUser = response.data;
          mainStore.setUser(updatedUser);
          this.user = updatedUser;
          this.promotion = { title: '', type: '', value: null, isActive: true };
        } catch (error) {
          console.error(error);
          const errorMessage = error.response?.data || 'An error occurred';

          await this.$Toast.show({
            text: errorMessage,
            duration: 'long',
            position: 'top',
          });
        }
      }
    },
    async deletePromo(promo, index) {
      const mainStore = useMainStore();
      this.$Haptics.impact({ style: 'medium' });
      this.user.vendor.promotions.splice(index, 1);

      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/promotion/delete/${promo.id}`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.status === 200) {
          const updatedUser = response.data;
          mainStore.setUser(updatedUser);
          this.user = updatedUser;
        }
      } catch (error) {
        console.error(error);
      }
    },
    showPromo() {
      this.$Haptics.impact({ style: 'medium' });
      this.popupPromo = true;
    },
    async check(promo) {
      const mainStore = useMainStore();

      if (promo.isActive) {
        promo.isActive = false;
      } else {
        this.user.vendor.promotions.forEach((promotion) => {
          promotion.isActive = false;
        });
        promo.isActive = true;
      }

      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/promotion/activate/${promo.id}`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.status === 200) {
          const updatedUser = response.data;
          mainStore.setUser(updatedUser);
          this.user = updatedUser;
        }
      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>


<style scoped src="../../assets/css/promotion.css"></style>
