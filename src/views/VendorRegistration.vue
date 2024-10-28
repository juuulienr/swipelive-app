<template>
  <main style="padding: 0px 15px">
    <div v-if="!step3" class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div v-if="type" class="checkout__title">Inscription</div>
      <div v-else class="checkout__title">Informations</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 50px; padding-top: 15px;">

      <!-- type -->
      <div v-if="type" class="step1">
        <div style="font-weight: 500; margin-bottom: 20px; text-align: center; font-size: 16px;">Quel vendeur êtes-vous ?</div>
        <div style="display: flex; justify-content: space-evenly;">
          <div @click="goStep1('company')" style="width: 135px; height: 135px; text-align: center; padding: 20px; border-radius: 16px; border: 2px solid #ff2f80; align-items: center; box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px 0px, rgb(0 0 0 / 4%) 0px 0px 0px 1px !important; border-radius: 50% !important;">
            <div style="font-size: 15px; color: #ff2f80; margin-top: 35px; font-weight: 500;">Professionnel</div>
          </div>
          <div @click="goStep1('individual')" style="width: 135px; height: 135px; text-align: center; padding: 20px; border-radius: 16px; border: 2px solid #ff2f80; align-items: center; box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px 0px, rgb(0 0 0 / 4%) 0px 0px 0px 1px !important; border: 2px solid #272c30 !important; border-radius: 100% !important;">
            <div style="font-size: 15px; color: rgb(82, 92, 102); margin-top: 35px; font-weight: 500;">Particulier</div>
          </div>
        </div>

        <div class="informations" style="margin: 40px auto; width: 100%; border-radius: 10px; color: black; font-weight: 400; font-size: 15px; text-align: left; padding: 0px 15px; line-height: 29px;">
          <div style="font-weight: 500; margin-bottom: 20px; font-size: 16px;">Chaque vendeur bénéficie :</div>
          <div>
            <img :src="require(`@/assets/img/check.svg`)" style="width: 27px; height: 27px;"/>
            Boutique intégrée
          </div>
          <div>
            <img :src="require(`@/assets/img/check.svg`)" style="width: 27px; height: 27px;"/>
            Lives et replay
          </div>
          <div>
            <img :src="require(`@/assets/img/check.svg`)" style="width: 27px; height: 27px;"/>
            Tarifs réduits sur les livraisons
          </div>
          <div>
            <img :src="require(`@/assets/img/check.svg`)" style="width: 27px; height: 27px;"/>
            Paiements intégrés et sécurisés
          </div>
          <div>
            <img :src="require(`@/assets/img/check.svg`)" style="width: 27px; height: 27px;"/>
            Messagerie instantanée
          </div>
          <div>
            <img :src="require(`@/assets/img/check.svg`)" style="width: 27px; height: 27px;"/>
            Notifications en temps réel
          </div>
          <div>
            <img :src="require(`@/assets/img/check.svg`)" style="width: 27px; height: 27px;"/>
            Diffusion sur les réseaux sociaux
          </div>
        </div>

        <div style="margin-top: 20px; text-align: center; margin: 15px 15px 0px;">
          <div style="font-size: 16px;color: #ff2f80;font-size: 17px;">Pas d'abonnement, Pas de contrat...</div><br>
          <div style="font-size: 15px;">Une petite commission de 8% sur chaque vente</div>
          <div style="font-weight: 400; text-align: left; font-size: 13px; color: #525c66;">
            5% de frais de service qui nous permettent de payer les salaires de notre équipe et de garder les lumières allumées <br> 3% de frais bancaire classique.
          </div> 
        </div>
      </div>


      <!-- step1 -->
      <div v-if="step1" class="step1">
        <div class="general--profile">
          <span style="border: 1px dashed rgba(145,158,171,.32)">
            <span v-if="loadingImg">
              <svg viewBox="25 25 50 50" class="loading" style="width: 24px; height: 24px; top: calc(50% - 13px); left: calc(50% - 13px);">
                <circle cx="50" cy="50" r="20" style="stroke: #ff2f80;"></circle>
              </svg>
            </span>
            <span v-else-if="user.picture" @click="uploadSheet()">
              <img :src="$cloudinary256x256 + user.picture" style="object-fit: cover; width: 142px; height: 142px;">
            </span>
            <div v-else @click="uploadSheet()">
              <svg xmlns="http://www.w3.org/2000/svg" class="MuiBox-root css-v73erd iconify iconify--ic" viewBox="0 0 24 24">
                <path d="M3 8c0 .55.45 1 1 1s1-.45 1-1V6h2c.55 0 1-.45 1-1s-.45-1-1-1H5V2c0-.55-.45-1-1-1s-1 .45-1 1v2H1c-.55 0-1 .45-1 1s.45 1 1 1h2v2z" fill="currentColor"></path>
                <circle cx="13" cy="14" r="3" fill="currentColor"></circle>
                <path d="M21 6h-3.17l-1.24-1.35A1.99 1.99 0 0 0 15.12 4h-6.4c.17.3.28.63.28 1c0 1.1-.9 2-2 2H6v1c0 1.1-.9 2-2 2c-.37 0-.7-.11-1-.28V20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5z" fill="currentColor"></path>
              </svg>
              <span style="font-weight: 400; margin: 0px 20px; text-align: center;">Ajoute une photo de profil</span>
            </div>
          </span>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorFirstname }">
          <fieldset>
            <legend>Prénom</legend>
            <input type="text" required v-model="user.firstname" style="text-transform: capitalize;">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLastname }">
          <fieldset>
            <legend>Nom</legend>
            <input type="text" required v-model="user.lastname" style="text-transform: capitalize;">
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

        <div class="form--input--item" :class="{'form--input--item--error': errorEmail }">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="user.email" style="text-transform: lowercase;">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorPhone }">
          <fieldset>
            <legend>Téléphone</legend>
            <input type="text" v-model="user.phone" inputmode="decimal">
          </fieldset>
        </div>
        <div v-if="errorPhone && user.phone" style="font-size: 13px;color: rgb(255, 0, 0);margin-bottom: 20px;margin-top: -15px;">Le format est incorrect</div>
        <div v-else-if="errorPhone" style="font-size: 13px;color: rgb(255, 0, 0);margin-bottom: 20px;margin-top: -15px;">Le téléphone est obligatoire</div>

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
            <VueGoogleAutocomplete
              ref="autocomplete"
              id="map"
              :api-key="yourGoogleMapsAPIKey"
              :options="{ componentRestrictions: { country: ['fr', 'be', 'lu'] } }"
              @place_changed="getAddressData"
              @change="updateAddressData"
              @error="handleError"
              @inputChange="inputChangeAddressInput"
              @focus="focusAddressInput"
              @blur="blurAddressInput"
              type="text"
              v-model="address"
              placeholder=""
            />
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

        <div class="form--input--item" :class="{'form--input--item--error': errorPseudo }">
          <fieldset>
            <legend>Pseudo (visible par les clients)</legend>
            <input type="text" v-model="pseudo" maxlength="30" style="text-transform: capitalize;">
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

        <h5 style="font-weight: 600;margin-bottom: 0px;font-size: 24px;text-align: center;margin-top: 30px;line-height: 38px;">Bienvenue {{ pseudo }} 👋 <br> dans votre espace vendeur !</h5>
        <br />
        <div style="font-weight: 400; font-size: 15px; margin-top: 10px; padding: 0px 10px; text-align: justify; line-height: 27px;">Vous pouvez dès à présent créer votre communauté et exploiter la vidéo en direct pour offrir des expériences d'achat fun et unique avec des taux de conversion 10 fois supérieurs à ceux des sites de commerce électronique traditionnels.</div>

        <div @click="submitStep3()" class="btn-swipe" style="color: white; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 30px); text-align: center; width: calc(100vw - 30px); line-height: 1.41176; letter-spacing: -0.025em;">
          <span>Bonnes ventes 🚀</span>
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


</style>

<script>

import VueGoogleAutocomplete from "vue3-google-autocomplete";

export default {
  name: 'VendorRegistration',
  components: { VueGoogleAutocomplete },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      stripe_pk: window.localStorage.getItem("stripe_pk"),
      user: this.$store.getters.getUser,
      type: true,
      step1: false,
      step2: false,
      step3: false,
      email: null,
      businessType: null,
      summary: null,
      pseudo: null,
      company: null,
      siren: null,
      address: null,
      zip: null,
      city: null,
      picture: null,
      tokenAccount: null,
      tokenPerson: null,
      errorFirstname: false,
      errorLastname: false,
      errorEmail: false,
      errorDay: false,
      errorMonth: false,
      errorYear: false,
      errorBusinessType: false,
      errorPseudo: false,
      errorCompany: false,
      errorSiren: false,
      errorAddress: false,
      errorZip: false,
      errorCity: false,
      errorSummary: false,
      errorCountry: false,
      errorPhone: false,
      errorRegistration: null,
      showAutocomplete: false,
      loadingImg: false,
      loading: false,
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");
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
      } else {
        if (!this.checkPhone(this.user.phone)) {
          this.errorPhone = true;
        } else {
          this.user.phone = this.user.phone.replace(/\s/g, '');
          console.log(this.user.phone);
        }
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

      if (!this.errorEmail && !this.errorFirstname && !this.errorLastname && !this.errorYear && !this.errorMonth && !this.errorDay && !this.errorPhone) {
        this.step1 = false;
        this.step2 = true;
      }
    }, 
    submitStep2() {
      this.errorSummary = false;
      this.errorPseudo = false;
      this.errorCompany = false;
      this.errorAddress = false;
      this.errorCompany = false;
      this.errorCountry = false;
      this.errorSiren = false;
      this.errorZip = false;
      this.errorCity = false;

      if (!this.summary) {
        this.errorSummary = true;
      }

      if (!this.pseudo) {
        this.errorPseudo = true;
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

      if (!this.errorSummary && !this.errorPseudo && !this.errorAddress && !this.errorZip && !this.errorCity && !this.errorCompany && !this.errorSiren && !this.errorCountry) {
        this.loading = true;
        this.submit();
      }
    }, 
    submitStep3() {
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

      this.$router.push({ name: 'Account' });
    }, 
    async submit() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }

      const stripe = Stripe(this.stripe_pk);

      if (this.businessType == 'company') {
        const accountResult = await stripe.createToken('account', {
          business_type: 'company',
          company: {
            name: this.company,
            tax_id: this.siren,
            address: {
              line1: this.address,
              city: this.city,
              postal_code: this.zip,
            },
            owners_provided: true,
            directors_provided: true,
            executives_provided: true,
          },
          tos_shown_and_accepted: true,
        });

        const personResult = await stripe.createToken('person', {
          person: {
            first_name: this.user.firstname,
            last_name: this.user.lastname,
            email: this.user.email,
            dob: {
              day: this.user.day,
              month: this.user.month,
              year: this.user.year
            },
            address: {
              line1: this.address,
              city: this.city,
              postal_code: this.zip
            },
            relationship: {
              representative: true,
              owner: true,
            }
          },
        });

        if (accountResult.token && personResult.token) {
          this.tokenAccount = accountResult.token.id;
          this.tokenPerson = personResult.token.id;
        }
      } else if (this.businessType == 'individual') {
        const accountResult = await stripe.createToken('account', {
          business_type: 'individual',
          individual: {
            first_name: this.user.firstname,
            last_name: this.user.lastname,
            email: this.user.email,
            dob: {
              day: this.user.day,
              month: this.user.month,
              year: this.user.year
            },
            address: {
              line1: this.address,
              city: this.city,
              postal_code: this.zip,
            },
          },
          tos_shown_and_accepted: true,
        });

        if (accountResult.token) {
          this.tokenAccount = accountResult.token.id;
        }
      }

      window.cordova.plugin.http.setDataSerializer('json');
      var httpParams = { "firstname": this.user.firstname, "lastname": this.user.lastname, "email": this.user.email, "phone": this.user.phone, "picture": this.user.picture, "company": this.company, "summary": this.summary, "day": this.user.day, "month": this.user.month, "year": this.user.year, "businessType": this.businessType, "pseudo": this.pseudo, "company": this.company, "siren": this.siren, "address": this.address, "zip": this.zip, "city": this.city, "country": this.country, "countryShort": this.countryShort, "tokenAccount": this.tokenAccount, "tokenPerson": this.tokenPerson };

      await window.cordova.plugin.http.post(this.baseUrl + "/user/api/vendor", httpParams, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(response);
        this.$store.commit('setUser', JSON.parse(response.data));
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
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetHeight: 256,
        targetWidth: 256,
        allowEdit: true,
        correctOrientation: true
      }

      this.uploadImage(options);
    },
    openCamera() {
      var options = {
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetHeight: 256,
        targetWidth: 256,
        allowEdit: true,
        correctOrientation: true,
      }

      this.uploadImage(options);
    },
    uploadImage(options) {
      navigator.camera.getPicture((imageUri) => {
        console.log(imageUri);
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
        window.plugins.nativepagetransitions.slide({
          direction: 'right',
          duration: 400,
          iosdelay: 0,
          androiddelay: 0,
          winphonedelay: 0,
          slowdownfactor: 1,
        });

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
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
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
      console.log(addressData, placeResultData);
      
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
    checkPhone(phone) {
      var regex = /^(?:0|00|\+)(?:\d ?){6,14}\d$/;
      return regex.test(phone);
    },
  }
};
</script>