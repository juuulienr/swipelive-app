<template>
  <main class="products">
    <div class="checkout">
      <div class="checkout__header" style="padding: 15px;">
        <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 8px; padding: 0.5rem 0px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: #161823;"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
        </div>
        <div class="checkout__title" style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Mon Profil</div>
        <div class="checkout__right-btn" style="position: absolute; right: 15px; top: 8px; padding: 0.5rem 0px;">
          <div @click="submit()" style="color: #ff2773; font-weight: 600;">Enregistrer</div>
        </div>
      </div>
      <div style="padding: 15Px;">
        <div class="general--profile" style="margin-bottom: 25px;">
          <div>
            <span @click="uploadSheet()" style="width: 128px; height:128px;">
              <span>
                <span>
                  <img v-if="user.picture" :src="cloudinary256x256 + user.picture">
                  <img v-else :src="require(`@/assets/img/anonyme.jpg`)">
                </span>
              </span>
            </span>
          </div>
        </div>

        <div v-if="user.vendor" class="form--input--item" :class="{'form--input--item--error': errorBusinessName }">
          <fieldset>
            <legend>Nom commercial</legend>
            <input type="text" v-model="user.vendor.businessName">
          </fieldset>
        </div>

        <div class="form--input">
          <div class="form--input--item" :class="{'form--input--item--error': errorFirstname }">
            <fieldset>
              <legend>Prénom</legend>
              <input type="text" v-model="user.firstname">
            </fieldset>
          </div>

          <div class="form--input--item" :class="{'form--input--item--error': errorLastname }">
            <fieldset>
              <legend>Nom</legend>
              <input type="text" v-model="user.lastname">
            </fieldset>
          </div>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorEmail }">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="user.email">
          </fieldset>
        </div>

        <div v-if="user.vendor" @click="openDatePicker()" class="form--input--item" :class="{'form--input--item--error': errorDob }">
          <fieldset>
            <legend>Date de naissance</legend>
            <input type="text" id="date" v-model="user.vendor.dob">
          </fieldset>
        </div>
        <div v-if="errorDob" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: -10px;">18 ans et +</div>
      
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
        

        <div v-if="user.vendor" class="form--input--item" :class="{'form--input--item--error': errorSummary }">
          <fieldset style="height: 90px;">
            <legend>Brève description de l'activité</legend>
            <textarea v-model="user.vendor.summary" style="height: 90px; margin-top: 10px;" maxlength="120"></textarea>
          </fieldset>
        </div>

        <div v-if="user.vendor" class="form--input--item" :class="{'form--input--item--error': errorAddress }">
          <fieldset>
            <legend>Adresse</legend>
            <input type="text" v-model="user.vendor.address">
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
        </div><br>
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

<script>
import Rolldate from 'rolldate';

export default {
  name: 'EditUser',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      errorEmail: false,
      errorFirstname: false,
      errorLastname: false,
      errorSummary: false,
      errorBusinessName: false,
      errorBusinessType: false,
      errorDob: false,
      errorAddress: false,
      errorCompany: false,
      errorSiren: false,
      errorZip: false,
      errorCity: false,
      vendor: null,
      day: null,
      month: null,
      year: null,
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);  
    window.StatusBar.styleDefault();
    console.log(this.user.vendor.dob);
  },
  methods: {
    async submit() {
      event.preventDefault();
      this.errorEmail = false;
      this.errorFirstname = false;
      this.errorLastname = false;
      this.errorSummary = false;
      this.errorDob = false;
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

        if (!this.user.vendor.dob) {
          this.errorDob = true;
        } else {
          var today = new Date();
          var eighteenYearsAgo = today.setFullYear(today.getFullYear()-18);
          eighteenYearsAgo = new Date(eighteenYearsAgo);

          if (eighteenYearsAgo < new Date(this.user.vendor.dob)) {
            this.errorDob = true;
          }
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
      }

      if (!this.errorEmail && !this.errorFirstname && !this.errorLastname && !this.errorSummary && !this.errorDob && !this.errorAddress && !this.errorZip && !this.errorCity && !this.errorCompany && !this.errorSiren && !this.errorBusinessName) {
        window.cordova.plugin.http.setDataSerializer('json');
        if (this.user.vendor) {
          var httpParams = { "email": this.user.email, "lastname": this.user.lastname, "firstname": this.user.firstname, "company": this.user.vendor.company, "summary": this.user.vendor.summary, "dob": this.user.vendor.dob, "businessName": this.user.vendor.businessName, "businessType": this.user.vendor.businessType, "siren": this.user.vendor.siren, "address": this.user.vendor.address, "zip": this.user.vendor.zip, "city": this.user.vendor.city };
        } else {
          var httpParams = { "email": this.user.email, "lastname": this.user.lastname, "firstname": this.user.firstname, "businessType" : null };
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
        window.cordova.plugin.http.setDataSerializer('json');
        if (window.cordova && (window.cordova.platformId === "android" || window.cordova.platformId === "ios")) {
          window.cordova.plugin.http.uploadFile(this.baseUrl + "/user/api/profile/picture", {}, { Authorization: "Bearer " + this.token }, imageUri, 'picture', (response) => {
          	console.log(JSON.parse(response.data));
            this.user = JSON.parse(response.data);
            window.localStorage.setItem("user", response.data);
          }, function(response) {
            console.log(response.error);
          });
        }
      }, (error) => {
        console.log("Impossible de récupérer l'image : " + error);
      }, options);
    },
    openDatePicker() {
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
          this.user.vendor.dob = "" + this.day + "/" + this.month + "/" + this.year + "";
        }
      });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    }
  }
};

</script>

