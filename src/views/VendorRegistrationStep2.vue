<template>
  <main>
    <div style="position: absolute; background: white; padding: 15px; width: 100%; z-index: 1000000000; text-align: center;">
      <svg @click="goBack()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823; float: left;">
        <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
      </svg>
      <h5 v-if="step1" style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Informations personnelles</h5>
      <h5 v-else style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Informations société</h5>
    </div>
    <div style="padding: 15px; margin-top: 70px;">
      <!-- step1 -->
      <div v-if="step1" class="step1">
        <div class="general--profile">
          <span @click="uploadSheet()">
            <span v-if="picture">
              <span>
                <img :src="cloudinary256x256 + picture">
              </span>
            </span>
            <div v-else>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="MuiBox-root css-v73erd iconify iconify--ic" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M3 8c0 .55.45 1 1 1s1-.45 1-1V6h2c.55 0 1-.45 1-1s-.45-1-1-1H5V2c0-.55-.45-1-1-1s-1 .45-1 1v2H1c-.55 0-1 .45-1 1s.45 1 1 1h2v2z" fill="currentColor"></path><circle cx="13" cy="14" r="3" fill="currentColor"></circle><path d="M21 6h-3.17l-1.24-1.35A1.99 1.99 0 0 0 15.12 4h-6.4c.17.3.28.63.28 1c0 1.1-.9 2-2 2H6v1c0 1.1-.9 2-2 2c-.37 0-.7-.11-1-.28V20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5z" fill="currentColor"></path></svg>
              <span>Photo de profil</span>
            </div>
          </span>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorFirstname }">
          <fieldset>
            <legend>Prénom</legend>
            <input type="text" v-model="firstname">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLastname }">
          <fieldset>
            <legend>Nom</legend>
            <input type="text" v-model="lastname">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorEmail }">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="email" style="text-transform: lowercase;">
          </fieldset>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3,1fr); gap: 24px 16px;">
          <div class="form--input--item" :class="{'form--input--item--error': errorDob }">
            <fieldset>
              <legend>Jour</legend>
              <input type="text" id="date" v-model="dob" required>
            </fieldset>
          </div>
          <div class="form--input--item" :class="{'form--input--item--error': errorDob }">
            <fieldset>
              <legend>Mois</legend>
              <input type="text" id="date" v-model="dob" required>
            </fieldset>
          </div>
          <div class="form--input--item" :class="{'form--input--item--error': errorDob }">
            <fieldset>
              <legend>Année</legend>
              <input type="text" id="date" v-model="dob" required>
            </fieldset>
          </div>
        </div>
        <div v-if="errorDob" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: -10px;">18 ans et +</div>
        
        <div class="form--input--item" :class="{'form--input--item--error': errorPassword }">
          <fieldset>
            <legend>Mot de passe</legend>
            <input type="password" v-model="password">
          </fieldset>
        </div>

        <div @click="submitStep1()" class="btn-swipe" style="color: white; text-align: center; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); width: calc(100vw - 30px);">Suivant</div>
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


        <div class="form--input--item" :class="{'form--input--item--error': errorBusinessName }">
          <fieldset>
            <legend>Nom commercial</legend>
            <input type="text" v-model="businessName">
          </fieldset>
        </div>


        <div v-if="businessType == 'company'" class="form--input--item" :class="{'form--input--item--error': errorSiren }">
          <fieldset>
            <legend>SIREN</legend>
            <input type="text" v-model="siren" minlength="9" maxlength="9">
          </fieldset>
        </div>
        <div v-if="errorSiren" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: -10px;">SIREN (9 chiffres)</div>
        

        <div class="form--input--item" :class="{'form--input--item--error': errorSummary }">
          <fieldset style="height: 90px;">
            <legend>Brève description de l'activité</legend>
            <textarea v-model="summary" style="height: 90px; margin-top: 10px;" maxlength="120"></textarea>
          </fieldset>
        </div>


        <div class="form--input--item" :class="{'form--input--item--error': errorAddress }">
          <fieldset>
            <legend>Adresse</legend>
              <vue-google-autocomplete ref="address" id="map" :country="['fr', 'be', 'lu']" @placechanged="getAddressData" @change="updateAddressData" @error="handleError" @inputChange="inputChangeAddressInput" @focus="focusAddressInput" @blur="blurAddressInput" type="text" v-model="address" placeholder="">
              </vue-google-autocomplete>
          </fieldset>
        </div>
        

        <div class="form--input">
          <div class="form--input--item" :class="{'form--input--item--error': errorZip }">
            <fieldset>
              <legend>Code postal</legend>
              <input type="text" v-model="zip">
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
            <input @click="selectCountry()" type="text" readonly>
          </fieldset>
        </div>


        <div @click="submitStep2()" class="btn-swipe" style="color: white; text-align: center; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); width: calc(100vw - 30px);">S'inscrire</div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.rolldate-container header {
  font-size: 16px  !important;
}

.rolldate-btn {
  font-size: 15px !important;
}

.general--profile {
  padding-bottom: 30px;
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

.cards-main li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  padding: 2vh 5vw;
  border-bottom: 1px solid #eee;
}

.cards-main li img {
  width: 11px;
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

import AuthAPI from "../services/authAPI.js";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import Rolldate from 'rolldate';

export default {
  name: 'VendorRegistrationStep2',
  data() {
    return {
      businessType: this.$route.params.businessType,
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      baseUrl: window.localStorage.getItem("baseUrl"),
      step1: true,
      step2: false,
      email: null,
      password: null,
      firstname: null,
      lastname: null,
      summary: null,
      dob: null,
      day: null,
      month: null,
      year: null,
      businessName: null,
      company: null,
      siren: null,
      address: null,
      zip: null,
      city: null,
      picture: null,
      waiting: false,
      errorFirstname: false,
      errorLastname: false,
      errorEmail: false,
      errorDob: false,
      errorBusinessType: false,
      errorBusinessName: false,
      errorCompany: false,
      errorSiren: false,
      errorAddress: false,
      errorZip: false,
      errorCity: false,
      errorSummary: false,
      errorCountry: false,
      errorPassword: false,
      errorRegistration: null,
      showAutocomplete: false,
    }
  },
  created() {
    var isAuthenticated = AuthAPI.isAuthenticated();
    if (isAuthenticated) {
      this.$router.push({ name: 'Feed' });
    }
    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
  },
  methods: {
    submitStep1() {
      this.errorEmail = false;
      this.errorPassword = false;
      this.errorFirstname = false;
      this.errorLastname = false;
      this.errorDob = false;

      if (!this.email) {
        this.errorEmail = true;
      } else {
        if (!this.validEmail(this.email)) {
          this.errorEmail = true;
        }
      }

      if (!this.password) {
        this.errorPassword = true;
      }

      if (!this.firstname) {
        this.errorFirstname = true;
      }

      if (!this.lastname) {
        this.errorLastname = true;
      }

      if (!this.dob) {
        this.errorDob = true;
      } else {
        var today = new Date();
        var eighteenYearsAgo = today.setFullYear(today.getFullYear()-18);
        eighteenYearsAgo = new Date(eighteenYearsAgo);

        if (eighteenYearsAgo < new Date(this.dob)) {
          this.errorDob = true;
        }
      }

      if (!this.errorEmail && !this.errorPassword && !this.errorFirstname && !this.errorLastname && !this.errorDob) {
        this.step1 = false;
        this.step2 = true;
      }
    }, 
    submitStep2() {
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

      if (!this.errorSummary && !this.errorBusinessName && !this.errorAddress && !this.errorZip && !this.errorCity && !this.errorCompany && !this.errorSireny && !this.errorCountry) {
        this.submit();
      }
    }, 
    async submit() {
      if (!this.errorEmail && !this.errorPassword && !this.errorFirstname && !this.errorLastname && !this.errorSummary && !this.errorDob && !this.errorBusinessType && !this.errorBusinessName && !this.errorAddress && !this.errorZip && !this.errorCity && !this.errorCompany && !this.errorSiren) {

        window.cordova.plugin.http.setDataSerializer('json');
        var httpParams = { "email": this.email, "password": this.password, "lastname": this.lastname, "firstname": this.firstname, "picture": this.picture, "company": this.company, "summary": this.summary, "pushToken": this.pushToken, "dob": this.dob, "businessType": this.businessType, "businessName": this.businessName, "company": this.company, "siren": this.siren, "address": this.address, "zip": this.zip, "city": this.city, "country": this.country, "countryShort": this.countryShort };
        var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };

        await window.cordova.plugin.http.post(this.baseUrl + "/api/user/register", httpParams, httpHeader, (response) => {
          console.log(response);
          window.localStorage.setItem("user", response.data);
          this.authenticate();
        }, (response) => {
          console.log(JSON.parse(response.error));
          this.errorRegistration = JSON.parse(response.error);
        });
      }
    }, 
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async authenticate() {
      var httpParams = { "username": this.email, "password": this.password };
      var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
      
      await window.cordova.plugin.http.post(this.baseUrl + "/user/api/login_check", httpParams, httpHeader, (response) => {
        console.log(response);
        var result = JSON.parse(response.data);
        window.localStorage.setItem("token", result.token);
        this.$router.push({ name: 'AllowNotif' });
      }, (response) => {
        console.log(response.error);
      });
    },
    openDatePicker() {
      this.dob = null;

      if (window.cordova && (window.cordova.platformId === "android" || window.cordova.platformId === "ios")) {
        window.cordova.plugins.DateTimePicker.show({
          mode: "date",
          allowFutureDates: false,
          success: (newDate) => {
            console.log(newDate);
            console.log(newDate.getDate());
            console.log(newDate.getMonth());

            if (newDate.getDate() > 9) {
              this.day = newDate.getDate();
            } else {
              this.day = "0" + newDate.getDate();
            }

            this.month = newDate.getMonth() + 1;
            if (this.month < 10) {
              this.month = "0" + newDate.getMonth();
            }

            this.year = newDate.getFullYear();
            this.dob = "" + this.day + "/" + this.month + "/" + this.year + "";
          }
        });
      } else {
        this.day = "12";
        this.month = "06";
        this.year = "1996";
        this.dob = "" + this.day + "/" + this.month + "/" + this.year + "";
        console.log(this.dob);
      }
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
        
        window.cordova.plugin.http.setDataSerializer('json');
        if (window.cordova && (window.cordova.platformId === "android" || window.cordova.platformId === "ios")) {
          window.cordova.plugin.http.uploadFile(this.baseUrl + "/api/registration/picture", {}, { Authorization: "Bearer " }, imageUri, 'picture', (response) => {
          	console.log(JSON.parse(response.data));
            this.picture = JSON.parse(response.data);
            console.log(this.picture);
          }, function(response) {
            console.log(response);
          });
        }
      }, (error) => {
        console.log("Impossible de récupérer l'image : " + error);
      }, options);
    },
    goBack() {
      if (this.step1) {
        this.$router.push({ name: 'VendorRegistrationStep1' });
      } else if (this.step2) {
        this.step1 = true;
        this.step2 = false;
      }
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
    }
  }  
};
</script>