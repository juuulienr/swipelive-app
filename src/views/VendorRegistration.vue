<template>
  <main style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div v-if="!step3" @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div v-if="step1" class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Informations personnelles</div>
      <div v-else-if="step2" class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Informations société</div>
      <div v-else-if="step3" class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Félicitation</div>
      <div v-else class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Inscription vendeur</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 50px; padding-top: 15px;">

      <!-- type -->
      <div v-if="type" class="step1">
        <div style="font-weight: 500; margin-bottom: 20px; text-align: center; font-size: 16px;">Selectionner le type de vendeur :</div>
        <div style="display: flex; justify-content: space-between;">
          <div @click="goStep1('company')" style="width: 48%; text-align: center; padding: 30px 20px; border-radius: 16px; border: 2px solid #ff2773;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: -webkit-fill-available;height: 32px;margin-bottom: 15px;">
              <path d="M547.69,286.8a102.1,102.1,0,0,0,16.4-3.6V480a32,32,0,0,1-32,32H84a32,32,0,0,1-32-32V283.2a125.89,125.89,0,0,0,16.4,3.6,135.49,135.49,0,0,0,18,1.2,132.81,132.81,0,0,0,29.51-3.8V384H500V284.2a127.12,127.12,0,0,0,29.51,3.8A138.38,138.38,0,0,0,547.69,286.8Z" class="fa-secondary" style="fill: #5234ff;"></path>
              <path d="M602,118.6c33.6,53.6,3.8,128-59,136.4a102.9,102.9,0,0,1-13.7.9,99.08,99.08,0,0,1-73.81-33.1A98.83,98.83,0,0,1,316,230.88a96.26,96.26,0,0,1-8.08-8.08,98.9,98.9,0,0,1-139.62,8,97.4,97.4,0,0,1-8-8,98.75,98.75,0,0,1-73.81,33.1,104.6,104.6,0,0,1-13.7-.9C10.12,246.5-19.58,172.1,14,118.6L78.83,15A32,32,0,0,1,106,0H510a32,32,0,0,1,27.07,15Z" class="fa-primary" style="fill: #ff2773;"></path>
            </svg>
            <div style="font-size: 14px;color: rgb(82, 92, 102);font-weight: 500;">Professionnel</div>
          </div>
          <div @click="goStep1('individual')" style="width: 48%; text-align: center; padding: 30px 20px; border-radius: 16px; border: 2px solid #ff2773;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: -webkit-fill-available; height: 32px; margin-bottom: 15px;">
              <path d="M352 128A128 128 0 1 1 224 0a128 128 0 0 1 128 128z" class="fa-secondary" style="fill: #ff2773;"></path>
              <path d="M313.6 288h-16.7a174.1 174.1 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48v-41.6A134.43 134.43 0 0 0 313.6 288z" class="fa-primary" style="fill: #5234ff;"></path>
            </svg>
            <div style="font-size: 14px;color: rgb(82, 92, 102);font-weight: 500;">Particulier</div>
          </div>
        </div>
        <div class="informations" style="margin: 40px auto; width: 100%; border-radius: 10px; color: black; font-weight: 400; font-size: 14px; text-align: left; padding: 0px 15px; line-height: 27px;">
          <div style="font-weight: 500; margin-bottom: 20px; text-align: center; font-size: 15px;">Chaque  vendeur bénéficie :</div>
          <div>- Boutique intégrée</div>
          <div>- Lives et replay</div>
          <div>- Tarifs réduits sur les livraisons</div>
          <div>- Paiements intégrés et sécurisés</div>
          <div>- Messagerie instantanée</div>
          <div>- Notifications en temps réel</div>
          <div>- Diffusion sur les réseaux sociaux</div>
        </div>

        <div style="margin-top: 20px; text-align: center; margin: 15px 15px 0px;">
          <div style="font-size: 16px;"> Notre commission : 9% sur chaque vente. </div>
          <div style="color: #ff2773; font-size: 16px;"> Vous gagnez, nous gagnons ! </div><br>
          <div style="font-weight: 400; text-align: left; font-size: 13px; color: #525c66;">
            6% de frais de service qui nous permettent de payer les salaires de notre équipe et de garder les lumières allumées <br> + 3% de frais bancaire classique.
          </div> 
        </div>
      </div>


      <!-- step1 -->
      <div v-if="step1" class="step1">
        <div class="general--profile">
          <span :style="[errorPicture ? {'border': '1px dashed #ff0000'} : {'border': '1px dashed rgba(145,158,171,.32)'}]">
            <span v-if="loadingImg">
              <svg viewBox="25 25 50 50" class="loading" style="width: 24px; height: 24px; top: calc(50% - 13px); left: calc(50% - 13px);">
                <circle cx="50" cy="50" r="20" style="stroke: rgb(255, 39, 115);"></circle>
              </svg>
            </span>
            <span v-else-if="user.picture" @click="uploadSheet()">
              <img :src="cloudinary256x256 + user.picture" style="object-fit: cover; width: 142px; height: 142px;">
            </span>
            <div v-else @click="uploadSheet()">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="MuiBox-root css-v73erd iconify iconify--ic" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M3 8c0 .55.45 1 1 1s1-.45 1-1V6h2c.55 0 1-.45 1-1s-.45-1-1-1H5V2c0-.55-.45-1-1-1s-1 .45-1 1v2H1c-.55 0-1 .45-1 1s.45 1 1 1h2v2z" fill="currentColor"></path><circle cx="13" cy="14" r="3" fill="currentColor"></circle><path d="M21 6h-3.17l-1.24-1.35A1.99 1.99 0 0 0 15.12 4h-6.4c.17.3.28.63.28 1c0 1.1-.9 2-2 2H6v1c0 1.1-.9 2-2 2c-.37 0-.7-.11-1-.28V20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5z" fill="currentColor"></path></svg>
              <span style="font-weight: 400; margin: 0px 20px; text-align: center;">Ajoute une photo de profil</span>
            </div>
          </span>
        </div>
        <div v-if="errorPicture" style="text-align: center; font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 30px; margin-top: -35px;">Une image ou un logo est obligatoire</div>

        <div class="form--input--item" :class="{'form--input--item--error': errorFirstname }">
          <fieldset>
            <legend>Prénom</legend>
            <input type="text" required v-model="user.firstname">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLastname }">
          <fieldset>
            <legend>Nom</legend>
            <input type="text" required v-model="user.lastname">
          </fieldset>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3,1fr); gap: 24px 16px;">
          <div class="form--input--item" :class="{'form--input--item--error': errorDay }">
            <fieldset>
              <legend>Jour</legend>
              <input type="text" required v-model="user.day" inputmode="decimal" maxlength="2" style="width: 80%">
            </fieldset>
          </div>
          <div class="form--input--item" :class="{'form--input--item--error': errorMonth }">
            <fieldset>
              <legend>Mois</legend>
              <input type="text" required v-model="user.month" inputmode="decimal" maxlength="2" style="width: 80%">
            </fieldset>
          </div>
          <div class="form--input--item" :class="{'form--input--item--error': errorYear }">
            <fieldset>
              <legend>Année</legend>
              <input type="text" required v-model="user.year" inputmode="decimal" maxlength="4" style="width: 80%">
            </fieldset>
          </div>
        </div>
        <div v-if="errorYear" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: -15px;">Vous devez avoir plus de 18 ans</div>

        <VuePhoneNumberInput v-model="user.phone" :translations="{
          countrySelectorLabel: 'Code pays',
          countrySelectorError: 'Choisir un pays',
          phoneNumberLabel: 'Numéro de téléphone',
          example: 'Exemple :'}"
          :border-radius="10"
          :preferred-countries="['FR', 'BE', 'LU', 'CH']"
          @update="onUpdate"
        />
        <div v-if="errorPhone && user.phone" style="font-size: 13px;color: rgb(255, 0, 0);margin-bottom: 20px;margin-top: -15px;">Le format est incorrect</div>
        <div v-else-if="errorPhone" style="font-size: 13px;color: rgb(255, 0, 0);margin-bottom: 20px;margin-top: -15px;">Le téléphone est obligatoire</div>

        <div class="form--input--item" :class="{'form--input--item--error': errorEmail }">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="user.email" style="text-transform: lowercase;">
          </fieldset>
        </div>

        <div @click="submitStep1()" class="btn-swipe" style="color: white; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 30px); text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">Suivant</div>
      </div>


      <!-- step2 -->
      <div v-if="step2" class="step2">
        <div v-if="errorRegistration" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: 10px;">{{ errorRegistration }}</div>

        <div v-if="businessType == 'company'" class="form--input--item" :class="{'form--input--item--error': errorCompany }">
          <fieldset>
            <legend>Nom de société</legend>
            <input type="text" v-model="company">
          </fieldset>
        </div>

        <div v-if="businessType == 'company'" class="form--input--item" :class="{'form--input--item--error': errorSiren }">
          <fieldset>
            <legend>SIREN</legend>
            <input type="text" v-model="siren" maxlength="9" inputmode="decimal">
          </fieldset>
        </div>
        <div v-if="errorSiren" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: -10px;">SIREN (9 chiffres)</div>

        <div class="form--input--item" :class="{'form--input--item--error': errorAddress }">
          <fieldset>
            <legend>Adresse</legend>
              <vue-google-autocomplete ref="address" id="map" :country="['fr', 'be', 'lu']" @placechanged="getAddressData" @change="updateAddressData" @error="handleError" @inputChange="inputChangeAddressInput" @focus="focusAddressInput" @blur="blurAddressInput" type="text" v-model="address" placeholder=""></vue-google-autocomplete>
          </fieldset>
        </div>

        <div class="form--input" style="grid-template-columns: 140px 1fr;">
          <div class="form--input--item" :class="{'form--input--item--error': errorZip }">
            <fieldset>
              <legend>Code postal</legend>
              <input type="text" v-model="zip" inputmode="decimal">
            </fieldset>
          </div>
          <div class="form--input--item" :class="{'form--input--item--error': errorCity }">
            <fieldset>
              <legend>Ville</legend>
              <input type="text" v-model="city">
            </fieldset>
          </div>
        </div>

        <div class="form--input--item">
          <fieldset>
            <legend>Pays</legend>
            <input type="text" @click="selectCountry()" v-model="country">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorBusinessName }">
          <fieldset>
            <legend>Pseudo (visible par les clients)</legend>
            <input type="text" v-model="businessName" maxlength="30">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorSummary }">
          <fieldset style="height: 90px;">
            <legend>Présentation (visible par les clients)</legend>
            <textarea v-model="summary" style="height: 90px; margin-top: 10px;" maxlength="120"></textarea>
          </fieldset>
        </div>


        <div @click="submitStep2()" class="btn-swipe" style="color: white; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 30px); text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">
          <span v-if="loading">
            <svg viewBox="25 25 50 50" class="loading">
              <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
            </svg>
          </span>
          <span v-else>S'inscrire</span>
        </div>
      </div>


      <!-- step3 -->
      <div v-if="step3" class="step3">
        <img :src="require(`@/assets/img/welcome-vendor.jpg`)" style="width: calc(100vw - 30px); border-radius: 10px;">

        <h5 style="font-weight: 600;margin-bottom: 0px;font-size: 25px;text-align: center;margin-top: 30px;line-height: 38px;">Bienvenue sur <br> Swipe Live vendeur</h5>
        <br />
        <div style="font-weight: 400;font-size: 15px; text-align: left; margin-top: 10px;">Vous pouvez dès à présent créer votre communauté et exploiter la vidéo en direct pour offrir des expériences d'achat fun et unique avec des taux de conversion 10 fois supérieurs à ceux des sites de commerce électronique traditionnels.</div>

        <div @click="submitStep3()" class="btn-swipe" style="color: white; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 30px); text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">
          <span>Accéder</span>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.general--profile {
  padding-bottom: 45px;
}

.general--profile > span {
  width: 144px;
  height: 144px;
  margin: auto;
  border-radius: 50%;
  display: block;
  padding: 8px;
  border: 1px dashed rgba(145, 158, 171, 0.32);
  position: relative;
}

.general--profile > span > span {
  z-index: 0;
  width: 100%;
  height: 100%;
  outline: none;
  display: flex;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  align-items: center;
  justify-content: center;
}

.general--profile > span > span > span {
  line-height: 0;
  display: block;
  overflow: hidden;
  z-index: 8;
  width: 100%;
  height: 100%;
  background-size: cover !important;
}

.general--profile > span > span > span img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.general--profile > span div {
  display: flex;
  position: absolute;
  top: 8px;
  left: 8px;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: #525c66;
  background-color: rgb(244, 246, 248);
  border-radius: 50%;
  cursor: pointer;
}

.general--profile > span div span {
  line-height: 1.5;
  font-size: 0.75rem;
}

.general--profile > span div svg {
  width: 24px;
  height: 24px;
  margin-bottom: 8px;
}

</style>

<style>
  
.display-mode {
  display: initial !important;
  z-index: 100000000000;
}

.hdpi.pac-logo:after {
  background: none !important;
  height: 0px !important;
}

.pac-item {
  padding: 3px 12px !important;
  border: none !important;
  font-size: 14px !important;
}

.hdpi .pac-icon {
  display: none !important;
}

.pac-item-query {
  font-size: 14px !important;
}

.pac-container {
  box-shadow: 0 6px 19px 0 #d9d9d9 !important;
  border-top: none !important;
  border-radius: 7px !important;
  padding: 7px 3px !important;
}

.vue-phone-number-input {
  margin-bottom: 34px !important;
}
.country-selector__input {
  border: 2px solid #e0e3eb !important;
  height: 50px !important;
}

.input-tel__input {
  border: 2px solid #e0e3eb !important;
  height: 50px !important;
  box-shadow: none !important;
}

.country-selector__country-flag {
  top: 25px !important;
}

.input-tel__label {
  color: #525c66 !important;
}

.country-selector__label {
  color: #525c66 !important;
}

.dots-text {
  color: #525c66 !important;
}

button.flex.align-center.country-selector__list__item.selected {
  background: white !important;
}


</style>

<script>

import VueGoogleAutocomplete from "vue-google-autocomplete";
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';

export default {
  name: 'VendorRegistration',
  components: { VueGoogleAutocomplete, VuePhoneNumberInput },
  data() {
    return {
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
      type: true,
      step1: false,
      step2: false,
      step3: false,
      email: null,
      businessType: null,
      summary: null,
      businessName: null,
      company: null,
      siren: null,
      address: null,
      zip: null,
      city: null,
      picture: null,
      errorFirstname: false,
      errorLastname: false,
      errorEmail: false,
      errorDay: false,
      errorMonth: false,
      errorYear: false,
      errorBusinessType: false,
      errorBusinessName: false,
      errorCompany: false,
      errorSiren: false,
      errorAddress: false,
      errorZip: false,
      errorCity: false,
      errorSummary: false,
      errorCountry: false,
      errorPhone: false,
      errorPicture: false,
      errorRegistration: null,
      showAutocomplete: false,
      loadingImg: false,
      loading: false,
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
  },
  methods: {
    submitStep1() {
      this.errorEmail = false;
      this.errorFirstname = false;
      this.errorLastname = false;
      this.errorDay = false;
      this.errorMonth = false;
      this.errorYear = false;
      this.errorPhone = false;
      this.errorPicture = false;

      if (!this.user.email) {
        this.errorEmail = true;
      } else {
        if (!this.validEmail(this.user.email)) {
          this.errorEmail = true;
        }
      }

      if (!this.user.firstname) {
        this.errorFirstname = true;
      }

      if (!this.user.lastname) {
        this.errorLastname = true;
      }

      if (!this.user.phone) {
        this.errorPhone = true;
      }

      if (!this.user.picture) {
        this.errorPicture = true;
      }

      if (!this.user.day) {
        this.errorDay = true;
      } else {
        if (parseInt(this.user.day) > 31 || parseInt(this.user.day) < 1) {
          this.errorDay = true;
        }
      }

      if (!this.user.month) {
        this.errorMonth = true;
      } else {
        if (parseInt(this.user.month) > 12 || parseInt(this.user.month) == 0) {
          this.errorMonth = true;
        } else if (parseInt(this.user.month) < 10) {
          this.user.month = "0" + parseInt(this.user.month);
        }
      }

      if (!this.user.year) {
        this.errorYear = true;
      } else {
        if (this.user.year.length == 4) {
          var today = new Date();
          var limit = today.getFullYear() - 100;
          if (parseInt(this.user.year) > limit) {
            var adult = today.setFullYear(today.getFullYear() - 18);
            adult = new Date(adult);

            if (adult < new Date(this.user.year)) {
              this.errorYear = true;
            }
          } else {
            this.errorYear = true;
          }
        } else {
          this.errorYear = true;
        }
      }

      if (!this.errorEmail && !this.errorFirstname && !this.errorLastname && !this.errorYear && !this.errorMonth && !this.errorDay && !this.errorPhone && !this.errorPicture) {
        this.step1 = false;
        this.step2 = true;
      }
    }, 
    submitStep2() {
      console.log(this.businessType);
      this.errorSummary = false;
      this.errorBusinessName = false;
      this.errorAddress = false;
      this.errorCompany = false;
      this.errorSiren = false;
      this.errorZip = false;
      this.errorCity = false;

      if (!this.summary) {
        this.errorSummary = true;
      }

      if (!this.businessName) {
        this.errorBusinessName = true;
      }

      if (!this.address) {
        this.errorAddress = true;
      }

      if (!this.zip) {
        this.errorZip = true;
      }

      if (!this.city) {
        this.errorCity = true;
      }

      if (!this.country) {
        this.errorCountry = true;
      }

      if (this.businessType == "company") {
        if (!this.company) {
          this.errorCompany = true;
        }

        if (!this.siren) {
          this.errorSiren = true;
        }
      }
      
      switch (this.country) {
        case "France":
          this.countryShort = "FR";
          break;
        case "Belgique":
          this.countryShort = "BE";
          break;
        case "Luxembourg":
          this.countryShort = "LU";
          break;
        default:
          this.countryShort = null;
          this.errorCountry = true;
      }

      if (!this.errorSummary && !this.errorBusinessName && !this.errorAddress && !this.errorZip && !this.errorCity && !this.errorCompany && !this.errorSiren && !this.errorCountry) {
        this.loading = true;
        this.submit();
      }
    }, 
    submitStep3() {
      this.$router.push({ name: 'Account' });
    }, 
    async submit() {
      window.cordova.plugin.http.setDataSerializer('json');
      var httpParams = { "firstname": this.user.firstname, "lastname": this.user.lastname, "email": this.user.email, "phone": this.user.phone, "picture": this.user.picture, "company": this.company, "summary": this.summary, "pushToken": this.pushToken, "day": this.user.day, "month": this.user.month, "year": this.user.year, "businessType": this.businessType, "businessName": this.businessName, "company": this.company, "siren": this.siren, "address": this.address, "zip": this.zip, "city": this.city, "country": this.country, "countryShort": this.countryShort };

      await window.cordova.plugin.http.post(this.baseUrl + "/user/api/vendor", httpParams, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(response);
        window.localStorage.setItem("user", response.data);
        this.loading = false;
        this.step1 = false;
        this.step2 = false;
        this.step3 = true;
      }, (response) => {
        console.log(JSON.parse(response.error));
        this.errorRegistration = JSON.parse(response.error);
        this.loading = false;
      });
    }, 
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    uploadSheet() {
      var options = {
        title: 'Ajouter une photo',
        buttonLabels: ['À Partir de la bibliothèque', 'Prendre une photo'],
        addCancelButtonWithLabel: 'Annuler',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };
      window.plugins.actionsheet.show(options, (index) => {
        console.log(index);
        if (index == 1) {
          this.openFilePicker();
        } else if (index == 2) {
          this.openCamera();
        }
      }, (error) => {
        console.log(error);
      });
    },
    openFilePicker() {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true
      }

      this.uploadImage(options);
    },
    openCamera() {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true,
      }

      this.uploadImage(options);
    },
    uploadImage(options) {
      navigator.camera.getPicture((imageUri) => {
        console.log(imageUri);
        this.errorPicture = false;
        this.loadingImg = true;

        window.cordova.plugin.http.setDataSerializer('json');
        if (window.cordova.platformId === "android" || window.cordova.platformId === "ios") {
          window.cordova.plugin.http.uploadFile(this.baseUrl + "/user/api/profile/picture", {}, { Authorization: "Bearer " + this.token }, imageUri, 'picture', (response) => {
            var result = JSON.parse(response.data);
            this.user.picture = result.picture;
            this.loadingImg = false;
          }, function(response) {
            console.log(response.error);
          });
        } else {
          var imgData = "data:image/jpeg;base64," + imageUri;
          window.cordova.plugin.http.post(this.baseUrl + "/user/api/profile/picture", { "picture" : imgData }, { Authorization: "Bearer " + this.token }, (response) => {
            var result = JSON.parse(response.data);
            this.user.picture = result.picture;
            this.loadingImg = false;
          }, function(response) {
            console.log(response.error);
          });
        }
      }, (error) => {
        console.log("Impossible de récupérer l'image : " + error);
      }, options);
    },
    goBack() {
      if (this.type) {
        this.$router.push({ name: 'Account' });
      } else if (this.step1) {
        this.type = true;
        this.step1 = false;
        this.step2 = false;
      } else if (this.step2) {
        this.step1 = true;
        this.step2 = false;
      }
    },
    goStep1(businessType) {
      this.businessType = businessType;
      this.type = false;
      this.step1 = true;
    },
    handleError(error) {
      console.log(error);
    },
    updateAddressData(addressData) {
      var data = addressData.split(',');
      this.$refs.address.update(data[0]);
      this.address = data[0];
    },
    getAddressData(addressData, placeResultData, id) {
      console.log(addressData);
      console.log(placeResultData);
      
      if (addressData.street_number) {
        var street = addressData.street_number + ' ' + addressData.route;
        this.countryShort = placeResultData.address_components[5].short_name;
      } else {
        var street = addressData.route;
        this.countryShort = placeResultData.address_components[4].short_name;
      }

      this.$refs.address.update(street);
      this.address = street;
      this.zip = addressData.postal_code;
      this.city = addressData.locality;
      this.country = addressData.country;
    },
    blurAddressInput() {
      this.showAutocomplete = false;
      document.getElementsByClassName('pac-container')[0].classList.remove("display-mode");
    },
    focusAddressInput() {
      this.showAutocomplete = true;
    },
    inputChangeAddressInput(input) {
      console.log(input.newVal);
      if (input.newVal.length > 2 && this.showAutocomplete) {
        document.getElementsByClassName('pac-container')[0].classList.add("display-mode");
      } else {
        document.getElementsByClassName('pac-container')[0].classList.remove("display-mode");
      }
    },
    selectCountry() {
    	var data = {
    		numbers: [
    			{description: "France"},
    			{description: "Belgique"},
    			{description: "Luxembourg"},
    		],
    	};

	    var config = {
	    	title: "",
	    	items:[
	    		[data.numbers]
	    	],
	    	positiveButtonText: "Choisir",
	    	negativeButtonText: "Annuler"
	    };

	    window.SelectorCordovaPlugin.showSelector(config, (result) => {
	    	this.country = result[0].description;
	    }, (error) => {
	    	console.log(error);
	    });
    }, 
    onUpdate(event) {
      console.log(event);
      if (event.e164) {
        if (event.isValid) {
          this.errorPhone = false;
          this.user.phone = event.e164;
        } else {
          this.errorPhone = true;
        }
      }
    }
  }  
};
</script>