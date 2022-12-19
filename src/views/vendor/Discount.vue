<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Promotions</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 50px;">
      <div @click="showPromo()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); margin: 10px 0px 25px;">Ajouter une promotion</div>

      <div style="box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;margin: 5px;padding: 18px 0px;border-radius: 10px;">
        <p style="text-align: center;margin-bottom: 22Px;">Performances</p>
        <div class="profile--follow">
          <div>
            <h4>3</h4>
            <p>Promotions</p>
          </div>
          <hr>
          <div>
            <h4>5</h4>
            <p>Utilisés</p>
          </div>
          <hr>
          <div>
            <h4>100,58€</h4>
            <p>Total</p>
          </div>
        </div>
      </div>

      <p style="text-align: left; font-size: 12px; line-height: 1.57143; font-size: 13px; font-weight: 400; color: #999; margin: 0; margin-top: 15px; padding: 10px; ">Cette promotion sera appliqué automatiquement lors du passage en caisse . </p>

      <div style="box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;margin: 5px;padding: 8px 0px;margin-top: 10px;border-radius: 10px; margin-bottom: 15px;">
        <div class="profile--follow">
          <div style="width: 40%;">
            <img src="https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/1ad36aab1eb15a377d8393144b34dd93.jpeg" class="user" style="margin: 7px 25px;width: 64px;height: 64px;border-radius: 100%;">
            <label class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-g5gk3y">
              <span @click="check()" class="MuiSwitch-root MuiSwitch-sizeMedium css-1nvvhq">
                <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1hei3uy" :class="{'Mui-checked': isChecked }">
                  <input class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3" name="inStock" type="checkbox" value="true" :checked="isChecked">
                  <span class="MuiSwitch-thumb css-byglaq"></span>
                  <span class="MuiTouchRipple-root css-w0pj6f"></span>
                </span><span class="MuiSwitch-track css-1ju1kxc"></span>
              </span>
              <!-- <span class="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label css-k36ljx">In stock</span> -->
            </label>
          </div>
          <hr style="margin: 0px;border-width: 0 2px 0 0;border-style: dashed;border-color: rgba(145,158,171,.24);">
          <div>
            <h4 style="font-size: 30px; font-weight: 600; margin-top: 3px; margin-bottom: 0px;">-50%</h4>
            <p>Valable sur toute la boutique </p>
            <h4 style="font-size: 19px; margin-top: 10px; margin-bottom: 0px;">PROMO50</h4>
          </div>
        </div>
      </div>



      <!-- promo popup -->
      <div v-if="popupPromo" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 30px);">
        <div class="checkout__header" style="padding: 5px 5px 15px; z-index: 10000000; background: white; width: 100%;">
          <div @click="hidePromo()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
              <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
            </svg>
          </div>
          <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Ajouter une promotion</div>
        </div>
        <div class="items" style="margin-top: 20px; margin-bottom: 20px;">
          <div>
            <div class="form--input--item">
              <fieldset>
                <legend>Titre de la promotion</legend>
                <input type="text" placeholder="Ex: PROMO10">
              </fieldset>
            </div>
            
            <div class="form--input--item">
              <fieldset>
                <legend>Type de remise</legend>
                <select required v-model="type" :style="{'color': type ? '#525c66': 'rgba(145,158,171,.8)'}">
                  <option value="" selected>Choisir un type</option>
                  <option value="percent">Pourcentage</option>
                  <option value="euro">Euro</option>
                </select>
              </fieldset>
            </div>

            <div class="form--input--item">
              <fieldset>
                <legend>Valeur de la remise</legend>
                <input type="text" placeholder="Ex: 30">
              </fieldset>
            </div>
            <br>
            <div @click="savePromo()" class="btn-swipe" style="color: white; text-align: center;">Enregistrer</div>
          </div>
        </div>
      </div>


  <!--     <div>
        <div class="container" style="margin: 100px auto 0px; text-align: center;">
          <video style="height: 220px; width: 220px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/discount.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
        </div>
        <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 30px;">Aucune promotion</h5>
        <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos promotions apparaîtront ici.</div>
      </div> -->
    </div>
  </main>
</template>

<style scoped>
  

.store-products-item__login-popup.store-products-item__login-popup--active {
  bottom: 0;
}

.store-products-item__login-popup {
  position: fixed;
  width: 100%;
  bottom: -80%;
  background-color: #fff;
  border-radius: 15px;
  animation-duration: 400ms !important;
  animation-iteration-count: 1 !important;
  animation-fill-mode: both !important;
  animation-name: keyframe_d37zz3 !important;
  z-index: 1000000000;
}


.css-g5gk3y {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  vertical-align: middle;
  justify-content: center;
  margin-bottom: 0px;
}

.css-1nvvhq {
  display: inline-flex;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  z-index: 0;
  vertical-align: middle;
  padding: 9px 13px 9px 12px;
  width: 58px;
  height: 38px;
}

.css-1hei3uy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  padding: 9px;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  color: rgb(255, 255, 255);
  transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.css-1nvvhq .MuiSwitch-switchBase.Mui-checked {
  transform: translateX(13px);
}
.css-1hei3uy.Mui-checked {
  color: rgb(0, 171, 85);
}
.css-1hei3uy.Mui-checked {
  transform: translateX(20px);
}
.css-1nvvhq .MuiSwitch-switchBase {
  left: 3px;
  padding: 12px;
}

.css-1hei3uy .MuiSwitch-input {
  left: 0%;
  width: 100%;
}
.css-1m9pwf3 {
  cursor: inherit;
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  margin: 0px;
  padding: 0px;
  z-index: 1;
}
.css-1nvvhq .MuiSwitch-thumb {
  width: 14px;
  height: 14px;
  box-shadow: none;
  color: rgb(255, 255, 255) !important;
}

.css-byglaq {
  box-shadow: rgb(145 158 171 / 20%) 0px 2px 1px -1px, rgb(145 158 171 / 14%) 0px 1px 1px 0px, rgb(145 158 171 / 12%) 0px 1px 3px 0px;
  background-color: currentcolor;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.css-w0pj6f {
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  z-index: 0;
  inset: 0px;
  border-radius: inherit;
}

.css-1nvvhq .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
  opacity: 1;
}

.css-1hei3uy.Mui-checked + .MuiSwitch-track {
  background-color: rgb(0, 171, 85);
}
.css-1hei3uy.Mui-checked + .MuiSwitch-track {
  opacity: 0.5;
}
.css-1nvvhq .MuiSwitch-track {
  opacity: 1;
  border-radius: 14px;
  background-color: rgba(145, 158, 171, 0.48);
}
.css-1ju1kxc {
  height: 100%;
  width: 100%;
  border-radius: 7px;
  z-index: -1;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: rgb(0, 0, 0);
  opacity: 0.38;
}
.css-g5gk3y .MuiFormControlLabel-label {
  line-height: 1.57143;
  font-size: 0.875rem;
  font-weight: 400;
}
.css-k36ljx {
  margin: 0px;
  line-height: 1.5;
  font-size: 1rem;
  font-weight: 400;
}

</style>


<script>

export default {
  name: 'Discount',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      popupPromo: false,
      isChecked: false,
      type: "",
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Account' });
    },
    hidePromo() {
      this.popupPromo = false;
    }, 
    savePromo() {
      this.popupPromo = false;
    },
    showPromo() {
      this.popupPromo = true;
    },
    check() {
      console.log(this.isChecked);
      if(this.isChecked) {
       this.isChecked = false;
      } else {
       this.isChecked = true;
      }
    }
  }
};

</script>

