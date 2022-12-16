<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Ajouter un article</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 50px;">
      <div @click="uploadSheet()" class="drop--file" :class="{'drop--img--error': errorImage }">
        <div class="drop--img">
          <video v-if="isAndroid" style="height: 120px; width: 100px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/upload-img.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
          <video v-else style="height: 120px; width: 100px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/upload-img.mp4`)"></video>
        </div>
        <div class="drop--text">
          <h5>Ajouter des photos</h5>
          <p>1 à 6 photos</p>
        </div>
      </div>

      <div v-if="images.length || loadingImg" class="content--img" style="margin-top: 15px;">
        <div v-if="images.length" v-for="(image, index) in images" :key="image.id">
          <span>
            <span>
              <img :src="cloudinary256x256 + image.filename">
            </span>
          </span>
          <button @click="deleteImage(index, image.id)">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="MuiBox-root css-0 iconify iconify--eva" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42z"></path></svg>
          </button>
        </div>
        <div v-if="loadingImg" style="border: 2px solid rgba(145,158,171,.24);">
          <span style="margin: 0 auto;">
            <span style="top: calc(50% - 13px); left: calc(50% - 13px);">
              <svg viewBox="25 25 50 50" class="loading" style="width: 24px; height: 24px; top: calc(50% - 13px); left: calc(50% - 13px);">
                <circle cx="50" cy="50" r="20" style="stroke: rgb(255, 39, 115);"></circle>
              </svg>
            </span>
          </span>
        </div>
      </div>


      <div style="margin-top: 25px;">
        <div class="form--input--item" :class="{'form--input--item--error': errorTitle }">
          <fieldset>
            <legend>Titre</legend>
            <input type="text" v-model="title" placeholder="Ex: Shampooing Aloé Vera Bio" maxlength="38">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorCategory }">
          <fieldset>
            <legend>Catégorie</legend>
            <select required v-model="category" :style="{'color': category ? '#525c66': 'rgba(145,158,171,.8)'}">
              <option value="">Choisir une catégorie</option>
              <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
            </select>
          </fieldset>
        </div>
        
        <div class="form--input--item" :class="{'form--input--item--error': errorDescription }">
          <fieldset style="height: 150px;">
            <legend>Description</legend>
            <textarea v-model="description" style="height: 125px; margin-top: 10px; line-height: 24px; font-size: 14px;"></textarea>
          </fieldset>
        </div>


        <div v-if="!variants.length" class="form--input">
          <div class="form--input--item" :class="{'form--input--item--error': errorPrice }">
            <fieldset>
              <legend>Prix de vente</legend>
              <input type="text" v-model="price" placeholder="Ex: 10,00" inputmode="decimal">
            </fieldset>
          </div>
          <div class="form--input--item" :class="{'form--input--item--error': errorCompareAtPrice }">
            <fieldset>
              <legend>Prix avant réduction</legend>
              <input type="text" v-model="compareAtPrice" placeholder="Ex: 15,00" inputmode="decimal">
            </fieldset>
          </div>
        </div>

        <div v-if="!variants.length" class="form--input--item">
          <fieldset>
            <legend>Quantité</legend>
            <input type="text" v-model="quantity" inputmode="decimal">
          </fieldset>
        </div>
         
        <div v-if="!variants.length" class="form--input" style="grid-template-columns: 1fr 60px;">
          <div class="form--input--item" :class="{'form--input--item--error': errorWeight }">
          	<fieldset>
          		<legend>Poids</legend>
          		<input type="text" v-model="weight" inputmode="decimal">
          	</fieldset>
          </div>
          <div class="form--input--item">
            <fieldset>
              <input @click="selectWeightUnit('product')" type="text" v-model="weightUnit" readonly style="width: 75%;">
            </fieldset>
          </div>
        </div>
        <hr>

        <!-- variants -->
        <div class="title-wrapper-3KgEa">
          <div style="margin-bottom: 20px;margin-top: 0px;">
            <div v-if="variants.length" style="font-size: 16px; margin-top: 10px;">Variantes</div>
            <div v-else style="font-size: 16px; margin-top: 10px;">Options</div>
            <div v-if="variants.length" @click="addVariant()" style="color: #ff2773; margin-top: 10px;">Modifier</div>
          </div>
        </div>
        <div class="form-container-3hjAo" style="margin-bottom: 35px;">
          <p style="font-size: 14px; color: rgb(153, 153, 153); margin-top: 10px; font-weight: 400;">Ajoutez des options si cet article possède des variantes, telles que des tailles ou des couleurs différentes.</p>
          <div v-if="variants.length" class="items">
            <div class="lasted--product">
              <div v-for="(variant, index) in variants" class="product--item" style="align-items: center;">
                <img @click="editVariant(index)" v-if="images.length" :src="cloudinary256x256 + images[0]" style="line-height: 0;display: block;border-radius: 10px;width: 64px;height: 64px;margin-right: 16px;">
                <img @click="editVariant(index)" v-else :src="require(`@/assets/img/no-preview.jpg`)" style="line-height: 0;display: block;border-radius: 10px;width: 64px;height: 64px;margin-right: 16px;">
                <div @click="editVariant(index)" class="details">
                  <div class="title">{{ variant.title }}</div>
                  <div class="price"  v-if="variant.quantity" style="margin: 0px; height: 22px; min-width: 22px; line-height: 0; border-radius: 6px; cursor: default; align-items: center; white-space: nowrap; display: inline-flex; justify-content: center; color: rgb(34, 154, 22); font-size: 0.75rem; background-color: rgba(84, 214, 44, 0.16); font-weight: 700; padding: 0 8px; margin-top: 3px; ">{{ variant.quantity }} en stock</div>
                  <div class="price" v-else style="margin: 0px; height: 22px; min-width: 22px; line-height: 0; border-radius: 6px; cursor: default; align-items: center; white-space: nowrap; display: inline-flex; justify-content: center; color: #ff0000; font-size: 0.75rem; background-color: #d62c2c29; font-weight: 700; padding: 0 8px; margin-top: 3px; ">Épuisé</div>
                </div>
                <div @click="editVariant(index)" style="margin-right: 20px;">
                  <div class="price">{{ variant.price | formatPrice }}€</div>
                </div>
                <div @click="deleteVariant(index)" style="padding: 10px;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style=" width: 16px; fill: red; margin-bottom: 3px;"><path d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z"></path></svg>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div @click="addVariant()" class="btn-swipe" style="color: rgb(255, 39, 115);background: white;border: 1px solid rgb(255, 39, 115);text-align: center;width: fit-content;padding: 8px 18px;margin-top: 20px;font-weight: 400;font-size: 14Px;">Ajouter des options</div>
          </div>
        </div>

        <hr>
        <div @click="submit()" class="btn-swipe" style="color: white;text-align: center;width: calc(100vw - 30px);margin: 45px 0px 25px;">Ajouter</div>
      </div>


      <!-- popup variant -->
      <div v-if="popupVariant" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 30px);">  <div class="checkout__header" style="padding: 5px 5px 15px; z-index: 10000000; background: white; width: 100%;">
          <div @click="hideVariant()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
              <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
            </svg>
          </div>
          <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Options</div>
        </div>
        <div class="checkout__body" style="overflow: scroll; padding: 15px 0px;">
          <div v-if="option1">
            <div style="font-size: 16px;margin-bottom: 30px;">Ajouter une option</div>
            <div>
              <div class="form--input--item" :class="{'form--input--item--error': errorNameOption1 }" style="margin-bottom: 25px;">
                <fieldset>
                  <legend>Nom de l'option</legend>
                  <input type="text" placeholder="Taille, Couleur, Matière..." v-model="inputNameOption1" style="text-transform: capitalize;">
                </fieldset>
              </div>
              <div style="display: grid; grid-template-columns: repeat(1, calc(100vw - 80px) 1fr)">
                <div class="form--input--item" :class="{'form--input--item--error': errorInputOption1 }">
                  <fieldset>
                    <legend>Valeur de l'option</legend>
                    <input type="text" placeholder="Bleu, Noir, M, L..." v-model="inputOption1" v-on:keyup.enter="addValueOption1()">
                  </fieldset>
                </div>
                <div @click="addValueOption1()">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 40px; height: 40px; margin-top: 7px; margin-left: 7px;">
                    <path d="M352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"
                    style="fill: rgba(255, 39, 115, 0.6);"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <span v-for="(value, index) in valuesOption1" class="tags-input__tag"> {{ value }}
                <span @click="deleteValue1(index)" class="tags-input__tag-remove"> × </span>
              </span>
            </div>
          </div>

          <div v-if="option2">
            <hr>
            <div style="margin-top: 40px;">
              <div class="form--input--item" :class="{'form--input--item--error': errorNameOption2 }" style="margin-bottom: 25px;">
                <fieldset>
                  <legend>Nom de l'option 2</legend>
                  <input type="text" placeholder="Taille, Couleur, Matière..." v-model="inputNameOption2" style="text-transform: capitalize;">
                </fieldset>
              </div>
              <div style="display: grid; grid-template-columns: repeat(1, calc(100vw - 80px) 1fr)">
                <div class="form--input--item" :class="{'form--input--item--error': errorInputOption1 }">
                  <fieldset>
                    <legend>Valeur de l'option 2</legend>
                    <input type="text" placeholder="Bleu, Noir, M, L..." v-model="inputOption2" v-on:keyup.enter="addValueOption2()">
                  </fieldset>
                </div>
                <div @click="addValueOption2()">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 40px; height: 40px; margin-top: 7px; margin-left: 7px;">
                    <path d="M352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"
                    style="fill: rgba(255, 39, 115, 0.6);"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <span v-for="(value, index) in valuesOption2" class="tags-input__tag"> {{ value }}
                <span @click="deleteValue2(index)" class="tags-input__tag-remove"> × </span>
              </span>
            </div>
          </div>
          <div v-else>
            <hr><br>
            <div @click="addOption()" class="btn-swipe" style="color: #ff2773; background: white; border: 1px solid #ff2773; text-align: center; width: calc(100vw - 110px); margin: 0px auto;">Ajouter une 2ème option</div>
          </div>

          <div @click="generate()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); margin: 0 auto; position: absolute; bottom: 45px;">Enregistrer</div>
        </div>
      </div>


      <!-- edit variant -->
      <div v-if="popupEditVariant" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 30px);">  
        <div class="checkout__header" style="padding: 5px 5px 15px; z-index: 10000000; background: white; width: 100%;">
          <div @click="hideEditVariant()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
              <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
            </svg>
          </div>
          <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Modifier</div>
        </div>
        <div class="checkout__body" style="overflow: scroll; padding: 15px 0px;">
          <div>
            <div class="form--input--item" :class="{'form--input--item--error': !variant.title }" style="margin-top: 10px;">
              <fieldset>
                <legend>Nom du variant</legend>
                <input type="text" v-model="variant.title">
              </fieldset>
            </div>

            <div class="form--input">
              <div class="form--input--item" :class="{'form--input--item--error': !variant.price }">
                <fieldset>
                  <legend>Prix de vente</legend>
              		<input type="text" v-model="variant.price" placeholder="Ex: 10,00" inputmode="decimal">
                </fieldset>
              </div>
              <div class="form--input--item" :class="{'form--input--item--error': checkCompareAtPrice }">
                <fieldset>
                  <legend>Prix avant réduction</legend>
              		<input type="text" v-model="variant.compareAtPrice" placeholder="Ex: 15,00" inputmode="decimal">
                </fieldset>
              </div>
            </div>
		         
		        <div class="form--input" style="grid-template-columns: 1fr 60px;">
		          <div class="form--input--item" :class="{'form--input--item--error': !variant.weight }">
		          	<fieldset>
		          		<legend>Poids</legend>
		          		<input type="text" v-model="variant.weight" inputmode="decimal">
		          	</fieldset>
		          </div>
		          <div class="form--input--item">
		            <fieldset>
		              <input @click="selectWeightUnit('variant')" type="text" v-model="variant.weightUnit" readonly style="width: 75%;">
		            </fieldset>
		          </div>
		        </div>

            <div class="form--input--item" :class="{'form--input--item--error': variant.quantity == 0 }">
              <fieldset>
                <legend>Quantité</legend>
                <input type="text" v-model="variant.quantity" inputmode="decimal">
              </fieldset>
            </div>

            <div @click="saveEditVariant()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); position: absolute; bottom: 45px; margin: 0 auto;">Enregistrer</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped src="../../assets/css/editproduct.css"></style>

<script>

export default {
  name: 'AddProduct',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      visible: "",
      title: "",
      description: "",
      category: "",
      price: null,
      compareAtPrice: null,
      quantity: "",
      weight: "",
      weightUnit: "kg",
      uploads: [],
      images: [],
      categories: [],
      popupVariant: false,
      popupEditVariant: false,
      option1: true,
      option2: false,
      errorTitle: false,
      errorDescription: false,
      errorCategory: false,
      errorWeight: false,
      errorImage: false,
      errorPrice: false,
      errorCompareAtPrice: false,
      inputOption1: "",
      inputOption2: "",
      inputNameOption1: "",
      inputNameOption2: "",
      valuesOption1: [],
      valuesOption2: [],
      errorNameOption1: false,
      errorInputOption1: false,
      errorNameOption2: false,
      loadingImg: false,
      isAndroid: false,
      options: [],
      variants: [],
      variant: []
    }
  },
	computed: {
	  checkCompareAtPrice() {
	  	if (this.variant.compareAtPrice && parseFloat(this.variant.compareAtPrice) < parseFloat(this.variant.price)) {
	  		return true;
	  	} else {
	  		return false;
	  	}
	  }
	},
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();

    if (window.cordova && (window.cordova.platformId === "android")) {
      this.isAndroid = true;
    }

    window.cordova.plugin.http.get(this.baseUrl + "/api/categories", {}, { 'Content-Type':  'application/json; charset=UTF-8' }, (response) => {
      this.categories = JSON.parse(response.data);
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    async submit() {
      window.cordova.plugin.http.setDataSerializer('json');
      this.errorCompareAtPrice = false;
      this.errorDescription = false;
      this.errorCategory = false;
      this.errorWeight = false;
      this.errorImage = false;
      this.errorPrice = false;
      this.errorTitle = false;

      if (!this.title) {
        this.errorTitle = true;
      }

      if (!this.description) {
        this.errorDescription = true;
      }

      if (!this.category) {
        this.errorCategory = true;
      }

      if (this.quantity != "" || !this.quantity) {
        this.quantity = parseFloat(this.quantity);
      } else {
        this.quantity = 0;
      }

      if (!this.variants.length) {
        if (!this.weight) {
          this.errorWeight = true;
        }

        if (!this.price || parseFloat(this.price) < 2) {
          this.errorPrice = true;
        }

        if (this.compareAtPrice) {
          if (parseFloat(this.compareAtPrice) < parseFloat(this.price)) {
            this.errorCompareAtPrice = true;
          }
        }
      }

      if (window.cordova && (window.cordova.platformId === "android" || window.cordova.platformId === "ios")) {
        if (this.images.length == 0) {
          this.errorImage = true;
        }
      }

      if (!this.errorTitle && !this.errorDescription && !this.errorCategory && !this.errorWeight && !this.errorPrice && !this.errorImage && !this.errorCompareAtPrice) {
        if (this.variants) {
          this.variants.map((element, index) => {
          	console.log(element, index);
          	if (this.variants[index].price.includes(',')) {
           	 	this.variants[index].price = this.variants[index].price.replace(',','.');
          	}
          	if (this.variants[index].compareAtPrice && this.variants[index].compareAtPrice.includes(',')) {
           	 	this.variants[index].compareAtPrice = this.variants[index].compareAtPrice.replace(',','.');
          	}
          	if (this.variants[index].weight) {
          		this.variants[index].weight = this.variants[index].weight.replace(',','.');
          	}
          });
        }

        var httpParams = { "title": this.title, "description": this.description, "category": this.category, "price": this.price.replace(',','.'), "compareAtPrice": this.compareAtPrice ? this.compareAtPrice.replace(',','.') : null, "quantity": this.quantity, "weight": this.weight.replace(',','.'), "weightUnit": this.weightUnit, "online": true, "uploads": this.uploads, "options" : this.options ? this.options : null, "variants" : this.variants ? this.variants : null };

        await window.cordova.plugin.http.post(this.baseUrl + "/user/api/products/add", httpParams, { Authorization: "Bearer " + this.token }, (response) => {
          console.log(response);
          var result = JSON.parse(response.data);
          if (result) {
            this.$router.push({ name: 'Shop' });
          }
        }, (response) => {
          console.log(JSON.parse(response.error));
          this.errorTitle = false;
          this.errorDescription = false;
          this.errorCategory = false;
          this.errorWeight = false;
          this.errorImage = false;
          this.errorPrice = false;
          this.errorCompareAtPrice = false;
        });
      }
    },
    uploadSheet() {
      if (this.images.length < 6) {
      	var options = {
          title: 'Ajouter des photos',
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
      }
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
        this.loadingImg = true;
        
        if (window.cordova && (window.cordova.platformId === "android" || window.cordova.platformId === "ios")) {
          window.cordova.plugin.http.uploadFile(this.baseUrl + "/user/api/products/upload/add", {}, { Authorization: "Bearer " + this.token }, imageUri, 'picture', (response) => {
            this.loadingImg = false;
            var result = JSON.parse(response.data);
            console.log(result);
            this.images.push(result);
            this.uploads.push(result.id);
          }, (response) => {
            console.log(response.error);
          });
        }
      }, (error) => {
        console.log("Impossible de récupérer l'image : " + error);
      }, options);
    },
    deleteImage(index, id) {
      console.log(index, id);
      this.images.splice(index, 1);
      
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/products/upload/delete/" + id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        var filtersList = this.uploads.filter(element => element !== id)
        this.uploads = filtersList;
      }, (response) => {
        console.log(response.error);
      });
    },
    addVariant() {
      this.errorCompareAtPrice = false;
      this.errorDescription = false;
      this.errorCategory = false;
      this.errorWeight = false;
      this.errorImage = false;
      this.errorPrice = false;
      this.errorTitle = false;

      if (!this.price || parseFloat(this.price) < 2) {
        this.errorPrice = true;
      }

      if (this.compareAtPrice) {
        if (parseFloat(this.compareAtPrice) < parseFloat(this.price)) {
          this.errorCompareAtPrice = true;
        }
      }

      if (!this.weight) {
        this.errorWeight = true;
      }

      if (!this.errorPrice && !this.errorWeight && !this.errorCompareAtPrice) {
        this.errorTitle = false;
        this.errorDescription = false;
        this.errorCategory = false;
        this.errorWeight = false;
        this.errorImage = false;
        this.errorPrice = false;
        this.errorCompareAtPrice = false;
        this.popupVariant = true;
      }
    },
    hideVariant() {
      this.popupVariant = false;
      this.visible = ""; 
    },
    deleteVariant(index) {
      this.variants.splice(index, 1);
      
      if (this.variants.length == 0) {
        this.options = [];
        this.inputNameOption1 = "";
        this.inputOption1 = "";
        this.valuesOption1 = [];
        this.inputNameOption2 = "";
        this.inputOption2 = "";
        this.valuesOption2 = [];
      } else {
        this.valuesOption1.map((element, index) => {
          var exist = false;
          this.variants.map((variant, index) => {
            if (element.toLowerCase() === variant.option1.toLowerCase()) {
              exist = true;
            }
          });

          if (!exist) {
            this.valuesOption1.splice(index, 1);
          }
        });

        this.options = [];
        this.options.push({ "name": this.inputNameOption1, "data": this.valuesOption1, "position": 1 });

        if (this.valuesOption2.length > 0) {
          this.valuesOption2.map((element, index) => {
            var exist = false;
            this.variants.map((variant, index) => {
              if (element.toLowerCase() === variant.option2.toLowerCase()) {
                exist = true;
              }
            });

            if (!exist) {
              this.valuesOption2.splice(index, 1);
            }
          });

          this.options.push({ "name": this.inputNameOption2, "data": this.valuesOption2, "position": 2 });
        }
      }

      this.variant = [];
      this.visible = "";
      this.popupEditVariant = false;
    },
    saveEditVariant() {
    	console.log(this.variant.quantity);
      if (this.variant.title && parseFloat(this.variant.price) > 2 && this.variant.weight) {
        if (!this.variant.compareAtPrice) {
          this.variant.compareAtPrice = null;
        }

        if (this.variant.quantity != "") {
          this.variant.quantity = parseFloat(this.variant.quantity);
        } else {
          this.variant.quantity = 0;
        }

        this.variants[this.visible] = this.variant;
        this.popupEditVariant = false;
        this.variant = [];
        this.visible = ""; 
      }
    },
    hideEditVariant() {
      this.popupEditVariant = false;
      this.variant = [];
      this.visible = ""; 
    },
    editVariant(index) {
      this.variant = { "title": this.variants[index].title, "price": this.variants[index].price, "compareAtPrice": this.variants[index].compareAtPrice ? this.variants[index].compareAtPrice : null, "quantity": this.variants[index].quantity ? this.variants[index].quantity : 0, "position": this.variants[index].position, "option1": this.variants[index].option1, "option2": this.variants[index].option2, "weight" : this.variants[index].weight, "weightUnit" : this.variants[index].weightUnit };
      console.log(this.variant);

      this.popupEditVariant = true;
      this.visible = index;
    },
    addOption() {
      this.option2 = true;
    },
    addValueOption1() {
      if (this.inputOption1 && this.inputOption1 != "") {
        var exists = this.valuesOption1.some((element) => {
          return element.toLowerCase() === this.inputOption1.toLowerCase()
        });

        if (!exists) {
          this.valuesOption1.push(this.inputOption1);
          this.inputOption1 = "";
        }
      }
    },
    addValueOption2() {
      if (this.inputOption2 && this.inputOption2 != "") {
        var exists = this.valuesOption2.some((element) => {
          return element.toLowerCase() === this.inputOption2.toLowerCase()
        });

        if (!exists) {
          this.valuesOption2.push(this.inputOption2);
          this.inputOption2 = "";
        }
      }
    },
    deleteValue1(index) {
      this.valuesOption1.splice(index, 1);
    },
    deleteValue2(index) {
      this.valuesOption2.splice(index, 1);
    },
    goBack() {
      this.$router.push({ name: 'Shop' });
    },
    generate() {
      this.errorNameOption1 = false;
      this.errorInputOption1 = false;
      this.errorNameOption2 = false;

      if (!this.inputNameOption1) {
        this.errorNameOption1 = true;
      }

      if (this.valuesOption1.length < 2) {
        this.errorInputOption1 = true;
      }

      if (this.valuesOption2.length > 1 && !this.inputNameOption2) {
        this.errorNameOption2 = true;
      }

      if (this.compareAtPrice) {
        if (parseFloat(this.compareAtPrice) < parseFloat(this.price)) {
          this.errorCompareAtPrice = true;
        }
      }

      if (!this.valuesOption2.length && this.inputNameOption2) {
        this.inputNameOption2 = "";
      }

      if (!this.errorNameOption1 && !this.errorInputOption1 && !this.errorCompareAtPrice) {
        this.options = [];
        this.variants = [];
        this.options.push({ "name": this.inputNameOption1, "data": this.valuesOption1, "position": 1 });

        if (this.valuesOption2.length && !this.errorNameOption2) {
          var count = 1;

          this.options.push({ "name": this.inputNameOption2, "data": this.valuesOption2, "position": 2 });
          this.valuesOption1.map((element, index) => {
            this.valuesOption2.map((element2, index2) => {
              this.variants.push({ "title": element + " - " + element2, "price": this.price, "compareAtPrice": this.compareAtPrice, "quantity": 0, "position": count, "option1": element, "option2": element2, "weight" : this.weight, "weightUnit" : this.weightUnit });
              count++;
            });
          });
        } else {
          this.valuesOption1.map((element, index) => {
            this.variants.push({ "title": element, "price": this.price, "compareAtPrice": this.compareAtPrice, "quantity": 0, "position": index + 1, "option1": element, "option2": "", "weight" : this.weight, "weightUnit" : this.weightUnit });
          });
        }

        this.errorNameOption1 = false;
        this.errorInputOption1 = false;
        this.errorNameOption2 = false;
        this.errorCompareAtPrice = false;
        this.popupVariant = false;
      }
    },
    selectWeightUnit(type) {
    	var data = {
    		numbers: [
    			{description: "kg"},
    			{description: "g"},
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
	    	console.log(result);
	    	if (type == 'product') {
	    		this.weightUnit = result[0].description;
	    	} else {
	    		this.variant.weightUnit = result[0].description;
	    	}
	    }, (error) => {
	    	console.log(error);
	    });
    },
  }
};

</script>

