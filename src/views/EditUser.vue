/* global google */
<template>
  <main class="my_profile1" style="padding: 0px 15px;">
    <div class="checkout__header">
      <div class="checkout__close-btn" @click="goBack()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Informations</div>
    </div>

    <div class="checkout__body">
      <div>
        <div class="general--profile" style="padding-top: 10px; padding-bottom: 30px;">
          <div>
            <span style="border: 2px solid #ff2f80;" @click="uploadSheet()">
              <span>
                <svg v-if="loadingImg" viewBox="25 25 50 50" class="loading" style="width: 24px; height: 24px; top: calc(50% - 13px); left: calc(50% - 13px);">
                  <circle cx="50" cy="50" r="20" style="stroke: #ff2f80;"></circle>
                </svg>
                <span v-else>
                  <img v-if="user.picture" :src="$cloudinary256x256 + user.picture">
                  <img v-else src="/img/anonyme.jpg">
                </span>
              </span>
            </span>
          </div>
        </div>

        <h2 v-if="user.vendor" style="font-weight: 500; font-size: 17px; margin-left: 10px; margin-bottom: 30px;">Informations personnelles</h2>
        <div class="form--input--item" :class="{'form--input--item--error': errorFirstname }">
          <fieldset>
            <legend>Prénom</legend>
            <input v-model="user.firstname" type="text" required>
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLastname }">
          <fieldset>
            <legend>Nom</legend>
            <input v-model="user.lastname" type="text" required>
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorEmail }">
          <fieldset>
            <legend>Email</legend>
            <input v-model="user.email" type="text" disabled style="text-transform: lowercase;">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorPhone }">
          <fieldset>
            <legend>Téléphone</legend>
            <input v-model="user.phone" type="text" inputmode="decimal">
          </fieldset>
        </div>
        <div v-if="errorPhone" style="font-size: 13px;color: rgb(255, 0, 0);margin-bottom: 20px;margin-top: -15px;">Le format est incorrect</div>


        <h2 v-if="user.vendor" style="font-weight: 500; font-size: 17px; margin-left: 10px; margin-bottom: 30px; margin-top: 55px;">Informations vendeur</h2>
        <div v-if="user.vendor" class="form--input--item" :class="{'form--input--item--error': errorPseudo }">
          <fieldset>
            <legend>Pseudo (visible par les clients)</legend>
            <input v-model="user.vendor.pseudo" type="text">
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
            <input v-model="user.vendor.company" type="text" disabled>
          </fieldset>
        </div>

        <div v-if="user.vendor && user.vendor.businessType == 'company'" class="form--input--item" :class="{'form--input--item--error': errorSiren }">
          <fieldset>
            <legend>SIREN</legend>
            <input v-model="user.vendor.siren" type="text" minlength="9" maxlength="9" disabled>
          </fieldset>
        </div>
        <div v-if="errorSiren" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: -10px;">SIREN (9 chiffres)</div>

        <div v-if="user.vendor" class="form--input--item" :class="{'form--input--item--error': errorAddress }">
          <fieldset>
            <legend>Adresse</legend>  
            <input id="address-input" v-model="user.vendor.address" type="text" placeholder="Saisissez une adresse" @focus="initAutocomplete">
          </fieldset>
        </div>


        <div v-if="user.vendor" class="form--input" style="grid-template-columns: minmax(30%, 1fr) minmax(65%, 1fr)">
          <div class="form--input--item" :class="{'form--input--item--error': errorZip }">
            <fieldset>
              <legend>Code postal</legend>
              <input v-model="user.vendor.zip" type="text">
            </fieldset>
          </div>

          <div class="form--input--item" :class="{'form--input--item--error': errorCity }">
            <fieldset>
              <legend>Ville</legend>
              <input v-model="user.vendor.city" type="text">
            </fieldset>
          </div>
        </div>

        <div v-if="user.vendor" class="form--input--item" :class="{'form--input--item--error': errorCountry }">
          <fieldset>
            <legend>Pays</legend>
            <input v-model="user.vendor.country" type="text">
          </fieldset>
        </div>

        <div class="btn-swipe" style="color: white;text-align: center;width: calc(100vw - 30px);margin: 25px 0px;" @click.prevent="submit()">
          <span v-if="loading">
            <svg viewBox="25 25 50 50" class="loading">
              <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
            </svg>
          </span>
          <span v-else>Enregistrer</span>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
/* global google */
import { useMainStore } from '../stores/useMainStore';
import { Camera } from '@capacitor/camera';

export default {
  name: 'EditUser',
  data() {
    const mainStore = useMainStore();

    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: mainStore.getUser,
      showAutocomplete: false,
      errorPhone: false,
      errorEmail: false,
      errorFirstname: false,
      errorLastname: false,
      errorSummary: false,
      errorPseudo: false,
      errorBusinessType: false,
      errorAddress: false,
      errorCompany: false,
      errorSiren: false,
      errorZip: false,
      errorCity: false,
      errorCountry: false,
      loadingImg: false,
      loading: false,
      vendor: null,
    }
  },
  mounted() {
    if (this.user.vendor) {
      this.loadGoogleMapsScript()
      .then(() => {
        this.initAutocomplete();
      })
      .catch((error) => {
        console.error("Erreur de chargement de Google Maps : ", error);
      });
    }
  },
  methods: {
    async submit() {
      this.$Haptics.impact({ style: 'medium' });
      const mainStore = useMainStore();

      this.errorPhone = false;
      this.errorEmail = false;
      this.errorFirstname = false;
      this.errorLastname = false;
      this.errorSummary = false;
      this.errorPseudo = false;
      this.errorAddress = false;
      this.errorCompany = false;
      this.errorSiren = false;
      this.errorZip = false;
      this.errorCity = false;

      if (!this.user.email || !this.validEmail(this.user.email)) {
        this.errorEmail = true;
      }
      if (!this.user.firstname) {
        this.errorFirstname = true;
      }
      if (!this.user.lastname) {
        this.errorLastname = true;
      }
      if (this.user.phone && !this.checkPhone(this.user.phone)) {
        this.errorPhone = true;
      } else if (this.user.phone) {
        this.user.phone = this.user.phone.replace(/\s/g, '');
      }

      if (this.user.vendor) {
        if (!this.user.vendor.summary) this.errorSummary = true;
        if (!this.user.vendor.address) this.errorAddress = true;
        if (!this.user.vendor.zip) this.errorZip = true;
        if (!this.user.vendor.city) this.errorCity = true;
        if (!this.user.vendor.pseudo) this.errorPseudo = true;
        if (this.user.vendor.businessType === "company") {
          if (!this.user.vendor.company) this.errorCompany = true;
          if (!this.user.vendor.siren) this.errorSiren = true;
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

      if (!this.errorEmail && !this.errorFirstname && !this.errorLastname && !this.errorSummary && !this.errorAddress && !this.errorZip && !this.errorCity && !this.errorCompany && !this.errorSiren && !this.errorPseudo && !this.errorCountry && !this.errorPhone) {
        this.loading = true;
        let httpParams;
        if (this.user.vendor) {
          httpParams = {
            email: this.user.email,
            lastname: this.user.lastname,
            firstname: this.user.firstname,
            phone: this.user.phone,
            company: this.user.vendor.company,
            summary: this.user.vendor.summary,
            pseudo: this.user.vendor.pseudo,
            businessType: this.user.vendor.businessType,
            siren: this.user.vendor.siren,
            address: this.user.vendor.address,
            zip: this.user.vendor.zip,
            city: this.user.vendor.city,
            country: this.user.vendor.country,
            countryCode: this.user.vendor.countryCode,
          };
        } else {
          httpParams = {
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            email: this.user.email,
            phone: this.user.phone,
            businessType: null,
          };
        }

        try {
          const response = await this.$CapacitorHttp.request({
            method: 'POST',
            url: `${this.baseUrl}/user/api/profile/edit`,
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
            },
            data: httpParams,
          });

          mainStore.setUser(response.data);
          this.$router.push({ name: 'Account' });
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      }
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async uploadSheet() {
      try {
        const result = await this.$ActionSheet.showActions({
          title: 'Ajouter une photo',
          options: [
            { title: 'À Partir de la bibliothèque', icon: 'folder', style: 'default' },
            { title: 'Prendre une photo', icon: 'camera', style: 'default' },
            { title: 'Annuler', icon: 'close', style: 'cancel' },
          ],
        });

        if (result.index === 0) {
          this.openFilePicker();
        } else if (result.index === 1) {
          this.openCamera();
        }
      } catch (error) {
        console.log(error);
      }
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
    async uploadImage(options) {
      navigator.camera.getPicture(
        async (imageUri) => {
          this.loadingImg = true;

          try {
            if (this.$Capacitor.getPlatform() === "android" || this.$Capacitor.getPlatform() === "ios") {
              const formData = new FormData();
              formData.append("picture", imageUri);

              const response = await this.$CapacitorHttp.request({
                method: 'POST',
                url: `${this.baseUrl}/user/api/profile/picture`,
                headers: {
                  Authorization: `Bearer ${this.token}`,
                  'Content-Type': 'application/json',
                },
                body: formData,
              });

              const result = response.data;
              console.log(result);
              this.user.picture = result.picture;
              this.loadingImg = false;
            } else {
              const imgData = `data:image/jpeg;base64,${imageUri}`;
              const response = await this.$CapacitorHttp.request({
                method: 'POST',
                url: `${this.baseUrl}/user/api/profile/picture`,
                headers: {
                  Authorization: `Bearer ${this.token}`,
                  'Content-Type': 'application/json',
                },
                data: { picture: imgData },
              });

              const result = response.data;
              this.user.picture = result.picture;
              this.loadingImg = false;
            }
          } catch (error) {
            console.log(error);
            this.loadingImg = false;
          }
        },
        (error) => {
          console.log("Impossible de récupérer l'image : " + error);
        },
        options
      );
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },    
    loadGoogleMapsScript() {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        }
      });
    },
    initAutocomplete() {
      const input = document.getElementById("address-input");

      if (input) {
        this.autocompleteInstance = new google.maps.places.Autocomplete(input, {
          componentRestrictions: { country: ["fr", "be", "lu", "ch"] },
          fields: ["formatted_address", "address_components", "geometry"]
        });
        this.autocompleteInstance.addListener("place_changed", this.getAddressData);
      }
    },
    getAddressData() {
      const place = this.autocompleteInstance.getPlace();
      if (!place || !place.address_components) return;

      const addressData = this.extractAddressComponents(place.address_components);

      this.user.vendor.address = addressData.street_number + ' ' + addressData.route;
      this.user.vendor.zip = addressData.postal_code;
      this.user.vendor.city = addressData.locality;
      this.user.vendor.country = addressData.country;
      this.user.vendor.countryShort = addressData.country_short;
    },
    extractAddressComponents(components) {
      const addressComponents = {};
      components.forEach(component => {
        const types = component.types;
        if (types.includes("postal_code")) addressComponents.postal_code = component.long_name;
        if (types.includes("locality")) addressComponents.locality = component.long_name;
        if (types.includes("country")) {
          addressComponents.country = component.long_name;
          addressComponents.country_short = component.short_name;
        }
        if (types.includes("street_number")) addressComponents.street_number = component.long_name;
        if (types.includes("route")) addressComponents.route = component.long_name;
      });
      return addressComponents;
    },
    checkPhone(phone) {
      var regex = /^(?:0|00|\+)(?:\d ?){6,14}\d$/;
      return regex.test(phone);
    },
  }
};

</script>

