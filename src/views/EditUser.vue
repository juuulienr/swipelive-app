<template>
  <main class="my_profile1" style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Profil</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 50px;">
      <div>
        <div class="general--profile" style="padding-top: 10px;">
          <div>
            <span @click="uploadSheet()">
              <span>
                <svg v-if="loadingImg" viewBox="25 25 50 50" class="loading" style="width: 24px; height: 24px; top: calc(50% - 13px); left: calc(50% - 13px);">
                  <circle cx="50" cy="50" r="20" style="stroke: rgb(255, 39, 115);"></circle>
                </svg>
                <span v-else>
                  <img v-if="user.picture" :src="cloudinary256x256 + user.picture">
                  <img v-else :src="require(`@/assets/img/anonyme.jpg`)">
                </span>
              </span>
            </span>
          </div>
        </div>

        <h2 v-if="user.vendor" style="font-weight: 500; font-size: 17px; margin-left: 10px; margin-bottom: 30px;">Informations personnelles</h2>
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

        <div class="form--input--item" :class="{'form--input--item--error': errorEmail }">
          <fieldset>
            <legend>Email</legend>
            <input type="text" disabled v-model="user.email" style="text-transform: lowercase;">
          </fieldset>
        </div>

        <VuePhoneNumberInput v-model="user.phone" :translations="{
          countrySelectorLabel: 'Code pays',
          countrySelectorError: 'Choisir un pays',
          phoneNumberLabel: 'Numéro de téléphone',
          example: 'Exemple :'}"
          :border-radius="10"
          :preferred-countries="['FR', 'BE', 'LU', 'CH']"
          @update="onUpdate"
        />


        <h2 v-if="user.vendor" style="font-weight: 500; font-size: 17px; margin-left: 10px; margin-bottom: 30px; margin-top: 55px;">Informations vendeur</h2>
        <div v-if="user.vendor" class="form--input--item" :class="{'form--input--item--error': errorBusinessName }">
          <fieldset>
            <legend>Pseudo (visible par les clients)</legend>
            <input type="text" v-model="user.vendor.businessName">
          </fieldset>
        </div>

        <div v-if="user.vendor" class="form--input--item" :class="{'form--input--item--error': errorSummary }">
          <fieldset style="height: 90px;">
            <legend>Présentation (visible par les clients)</legend>
            <textarea v-model="user.vendor.summary" style="height: 90px; margin-top: 10px;" maxlength="120"></textarea>
          </fieldset>
        </div>

        <div v-if="user.vendor && user.vendor.businessType == 'company'" class="form--input--item" :class="{'form--input--item--error': errorCompany }">
          <fieldset>
            <legend>Nom de société</legend>
            <input type="text" v-model="user.vendor.company">
          </fieldset>
        </div>

        <div v-if="user.vendor && user.vendor.businessType == 'company'" class="form--input--item" :class="{'form--input--item--error': errorSiren }">
          <fieldset>
            <legend>SIREN</legend>
            <input type="text" v-model="user.vendor.siren" minlength="9" maxlength="9">
          </fieldset>
        </div>
        <div v-if="errorSiren" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: -10px;">SIREN (9 chiffres)</div>

        <div v-if="user.vendor" class="form--input--item" :class="{'form--input--item--error': errorAddress }">
          <fieldset>
            <legend>Adresse</legend>  
            <vue-google-autocomplete ref="address" id="map" :country="['fr', 'be', 'lu']" @placechanged="getAddressData" @change="updateAddressData" @error="handleError" @inputChange="inputChangeAddressInput" @focus="focusAddressInput" @blur="blurAddressInput" type="text" v-model="user.vendor.address">
            </vue-google-autocomplete>
          </fieldset>
        </div>

        <div v-if="user.vendor" class="form--input" style="grid-template-columns: minmax(30%, 1fr) minmax(65%, 1fr)">
          <div class="form--input--item" :class="{'form--input--item--error': errorZip }">
            <fieldset>
              <legend>Code postal</legend>
              <input type="text" v-model="user.vendor.zip">
            </fieldset>
          </div>

          <div class="form--input--item" :class="{'form--input--item--error': errorCity }">
            <fieldset>
              <legend>Ville</legend>
              <input type="text" v-model="user.vendor.city">
            </fieldset>
          </div>
        </div>

        <div v-if="user.vendor" class="form--input--item" :class="{'form--input--item--error': errorCountry }">
          <fieldset>
            <legend>Pays</legend>
            <input @click="selectCountry()" type="text" readonly v-model="user.vendor.country">
          </fieldset>
        </div>


        <div @click="submit()" class="btn-swipe" style="color: white;text-align: center;width: calc(100vw - 30px);margin: 25px 0px;">Enregistrer</div>
      </div>
    </div>
  </main>
</template>


<style scoped>
.btn-follow .btn {
  background: #ff2773;
  -webkit-box-shadow: 0px 0px 9px -2px rgb(0 0 0 / 50%);
  box-shadow: 0px 0px 9px -2px rgb(0 0 0 / 50%);
  padding: 10px 42px;
  font-weight: bold;
  margin: 10px 0px;
  border-radius: 30px;
}
</style>


<style>

.vue-phone-number-input {
  margin-bottom: 34px !important;
}
.country-selector__input {
  border: 2px solid #e0e3eb !important;
  height: 50px !important;
  font-weight: 500 !important;
  color: #525c66 !important;
}

.input-tel__input {
  border: 2px solid #e0e3eb !important;
  height: 50px !important;
  box-shadow: none !important;
  font-weight: 500 !important;
  color: #525c66 !important;
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
  name: 'EditUser',
  components: { VueGoogleAutocomplete, VuePhoneNumberInput },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      showAutocomplete: false,
      errorEmail: false,
      errorFirstname: false,
      errorLastname: false,
      errorSummary: false,
      errorBusinessName: false,
      errorBusinessType: false,
      errorAddress: false,
      errorCompany: false,
      errorSiren: false,
      errorZip: false,
      errorCity: false,
      errorCountry: false,
      loadingImg: false,
      vendor: null,
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);  
    window.StatusBar.styleDefault();
  },
  methods: {
    async submit() {
      event.preventDefault();
      this.errorEmail = false;
      this.errorFirstname = false;
      this.errorLastname = false;
      this.errorSummary = false;
      this.errorBusinessName = false;
      this.errorAddress = false;
      this.errorCompany = false;
      this.errorSiren = false;
      this.errorZip = false;
      this.errorCity = false;

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


      // if vendor
      if (this.user.vendor) {
        if (!this.user.vendor.summary) {
          this.errorSummary = true;
        }
        if (!this.user.vendor.address) {
          this.errorAddress = true;
        }

        if (!this.user.vendor.zip) {
          this.errorZip = true;
        }

        if (!this.user.vendor.city) {
          this.errorCity = true;
        }

        if (!this.user.vendor.businessName) {
          this.errorBusinessName = true;
        }

        if (this.user.vendor.businessType == "company") {
          if (!this.user.vendor.company) {
            this.errorCompany = true;
          }

          if (!this.user.vendor.siren) {
            this.errorSiren = true;
          }
        }
      
        switch (this.user.vendor.country) {
          case "France":
            this.user.vendor.countryShort = "FR";
            break;
          case "Belgique":
            this.user.vendor.countryShort = "BE";
            break;
          case "Luxembourg":
            this.user.vendor.countryShort = "LU";
            break;
          default:
            this.user.vendor.countryShort = null;
            this.errorCountry = true;
        }
      }

      if (!this.errorEmail && !this.errorFirstname && !this.errorLastname && !this.errorSummary && !this.errorAddress && !this.errorZip && !this.errorCity && !this.errorCompany && !this.errorSiren && !this.errorBusinessName && !this.errorCountry) {
        window.cordova.plugin.http.setDataSerializer('json');
        if (this.user.vendor) {
          var httpParams = { "email": this.user.email, "lastname": this.user.lastname, "firstname": this.user.firstname, "phone": this.user.phone, "company": this.user.vendor.company, "summary": this.user.vendor.summary, "businessName": this.user.vendor.businessName, "businessType": this.user.vendor.businessType, "siren": this.user.vendor.siren, "address": this.user.vendor.address, "zip": this.user.vendor.zip, "city": this.user.vendor.city, "country": this.user.vendor.country, "countryCode": this.user.vendor.countryCode };
        } else {
          var httpParams = { "firstname": this.user.firstname, "lastname": this.user.lastname, "email": this.user.email, "phone": this.user.phone, "businessType" : null };
        }

        await window.cordova.plugin.http.post(this.baseUrl + "/user/api/profile/edit", httpParams, { Authorization: "Bearer " + this.token }, (response) => {
          window.localStorage.setItem("user", response.data);
          this.$router.push({ name: 'Account' });
        }, (response) => {
          console.log(JSON.parse(response.error));
        });
      }
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
      this.$router.push({ name: 'Account' });
    },
    handleError(error) {
      console.log(error);
    },
    updateAddressData(addressData) {
      var data = addressData.split(',');
      this.$refs.address.update(data[0]);
      this.user.vendor.address = data[0];
    },
    getAddressData(addressData, placeResultData, id) {
      console.log(addressData);
      console.log(placeResultData);
      
      if (addressData.street_number) {
        var street = addressData.street_number + ' ' + addressData.route;
        this.user.vendor.countryShort = placeResultData.address_components[5].short_name;
      } else {
        var street = addressData.route;
        this.user.vendor.countryShort = placeResultData.address_components[4].short_name;
      }

      this.$refs.address.update(street);
      this.user.vendor.address = street;
      this.user.vendor.zip = addressData.postal_code;
      this.user.vendor.city = addressData.locality;
      this.user.vendor.country = addressData.country;
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
        this.user.vendor.country = result[0].description;
      }, (error) => {
        console.log(error);
      });
    }, 
    onUpdate(event) {
      if (event.isValid) {
        this.errorPhone = false;
        this.user.phone = event.e164;
      } else {
        this.errorPhone = true;
      }
      console.log(event);
    }
  }
};

</script>

