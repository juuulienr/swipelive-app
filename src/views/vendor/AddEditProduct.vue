<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div v-if="productId" class="checkout__title">Modifier</div>
      <div v-else class="checkout__title">Ajouter</div>
      <div v-if="productId" @click="deleteProduct()" class="checkout__right-btn" style="right: 15px; position: fixed; top: 0px;">
        <div style="color: #ff2a80;">Supprimer</div>
      </div>
    </div>

    <div class="checkout__body">
      <div @click="uploadSheet()" class="drop--file">
        <div class="drop--img">
          <div style="margin: 0px auto;">
            <Lottie :options="defaultOptions" :width="120"/>
          </div>
        </div>
        <div class="drop--text">
          <h5>Ajouter des photos</h5>
          <p>1 à 6 photos</p>
        </div>
      </div>

      <div v-if="product.uploads.length > 0 || loadingImg" class="content--img" style="margin-top: 15px;">
        <div v-for="(upload, index) in product.uploads" :key="upload.id">
          <span>
            <span>
              <img :src="cloudinary256x256 + upload.filename">
            </span>
          </span>
          <button @click="deleteImage(index, upload.id)">
            <svg xmlns="http://www.w3.org/2000/svg" class="MuiBox-root css-0 iconify iconify--eva" viewBox="0 0 24 24">
              <path fill="currentColor" d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42z"></path>
            </svg>
          </button>
        </div>
        <div v-if="loadingImg" style="border: 2px solid rgba(145,158,171,.24); background: #ecf0f1;">
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
            <input type="text" v-model="product.title" maxlength="38">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorCategory }">
          <fieldset>
            <legend>Catégorie</legend>
            <select v-if="categories.length && product.category" required v-model="product.category.id" :style="{'color': product.category.id ? '#525c66': 'rgba(145,158,171,.8)'}">
              <option value="">Choisir une catégorie</option>
              <option v-for="category in categories" :value="category.id" :selected="category.id === product.category.id">{{ category.name }}</option>
            </select>
          </fieldset>
        </div>


        <div class="form--input--item" :class="{'form--input--item--error': errorDescription }">
          <fieldset style="height: 150px;">
            <legend>Description</legend>
            <textarea v-model="product.description" style="height: 125px; margin-top: 10px; line-height: 24px; font-size: 14px;"></textarea>
          </fieldset>
        </div>


        <div v-if="!product.variants.length" class="form--input">
          <div class="form--input--item" :class="{'form--input--item--error': errorPrice }">
            <fieldset>
              <legend>Prix de vente</legend>
              <input type="text" v-model="product.price" inputmode="decimal">
            </fieldset>
          </div>
          <div class="form--input--item" :class="{'form--input--item--error': errorCompareAtPrice }">
            <fieldset>
              <legend>Prix avant réduction</legend>
              <input type="text" v-model="product.compareAtPrice" inputmode="decimal">
            </fieldset>
          </div>
        </div>

        <div v-if="!product.variants.length" class="form--input--item">
          <fieldset>
            <legend>Quantité</legend>
            <input type="text" v-model="product.quantity" inputmode="decimal">
          </fieldset>
        </div>
         
        <div v-if="!product.variants.length" class="form--input" style="grid-template-columns: 1fr 60px;">
          <div class="form--input--item" :class="{'form--input--item--error': errorWeight }">
          	<fieldset>
          		<legend>Poids</legend>
          		<input type="text"  v-model="product.weight" inputmode="decimal">
          	</fieldset>
          </div>
          <div class="form--input--item">
            <fieldset>
              <input @click="selectWeightUnit('product')" type="text" v-model="product.weightUnit" readonly style="width: 75%;">
            </fieldset>
          </div>
        </div>
        <div v-if="errorWeight" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: -15px;">Maximum 20kg</div>

        <!-- product.variants -->
        <div class="title-wrapper-3KgEa">
          <div style="margin-bottom: 20px;margin-top: 0px;">
            <div v-if="product.variants.length" style="font-size: 16px; margin-top: 10px;">Variantes</div>
            <div v-else style="font-size: 16px; margin-top: 10px;">Options</div>
            <div v-if="product.variants.length" @click="addVariant()" style="color: #ff2a80; margin-top: 10px;">Modifier</div>
          </div>
        </div>
        <div class="form-container-3hjAo" style="margin-bottom: 35px;">
          <p style="font-size: 14px; color: rgb(153, 153, 153); margin-top: 10px; font-weight: 400;">Ajoutez des options si cet article possède des variantes, telles que des tailles ou des couleurs différentes.</p>
          <div v-if="product.variants.length" class="items">
            <div class="lasted--product">
              <div v-for="(variant, index) in product.variants" @click="editVariant(index)" class="product--item" style="align-items: center;">
                <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="line-height: 0;display: block;border-radius: 10px;width: 64px;height: 64px;margin-right: 16px;">
                <div class="details">
                  <div class="title">{{ variant.title }}</div>
                  <div v-if="variant.quantity" class="price stock-available">{{ variant.quantity }} en stock</div>
                  <div v-else class="price stock-unavailable">Épuisé</div>
                </div>
                <div style="margin-right: 20px;">
                  <div class="price">{{ variant.price | formatPrice }}€</div>
                </div>
                <div style="padding: 10px;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style=" width: 16px; fill: red; margin-bottom: 3px;"><path d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z"></path></svg>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div @click="addVariant()" class="btn-swipe" style="color: #ff2a80; background: white; border: 1px solid #ff2a80; text-align: center; width: calc(100vw - 110px); margin: 20px auto;">Ajouter des options</div>
          </div>
        </div>

        <hr>

        <div style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; padding: 15px 0px 10px; ">
          <div @click="submit()" class="btn-swipe" style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; width: calc(100vw - 30px); margin: 0 auto;">
            <span v-if="loading">
              <svg viewBox="25 25 50 50" class="loading">
                <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
              </svg>
            </span>
            <span v-else>Enregistrer</span>
          </div>
        </div>
      </div>


      <!-- popup variant -->
      <div v-if="popupVariant" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 30px);">  <div class="checkout__header" style="padding: 5px 5px 15px; z-index: 10000000; background: white; width: 100%;">
          <div @click="hideVariant()" class="checkout__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
            </svg>
          </div>
          <div class="checkout__title">Options</div>
        </div>
        <div class="checkout__body" style="overflow: scroll; padding: 15px 0px;">
          <div v-if="option1">
            <div style="font-size: 16px;margin-bottom: 30px;">Ajouter une option</div>
            <div>
              <div class="form--input--item" :class="{'form--input--item--error': errorNameOption1 }" style="margin-bottom: 25px;">
                <fieldset>
                  <legend>Titre de l'option</legend>
                  <input type="text" placeholder="Taille, Couleur, Matière..." v-model="inputNameOption1" style="text-transform: capitalize;">
                </fieldset>
              </div>
              <div style="display: grid; grid-template-columns: repeat(1, calc(100vw - 80px) 1fr);">
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
              <div style="display: grid; grid-template-columns: repeat(1, calc(100vw - 80px) 1fr);">
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
            <div @click="addOption()" class="btn-swipe" style="color: #ff2a80; background: white; border: 1px solid #ff2a80; text-align: center; width: calc(100vw - 110px); margin: 0px auto;">Ajouter une 2ème option</div>
          </div>

          <div @click="generate()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); margin: 0 auto; position: absolute; bottom: 45px;">Enregistrer</div>
        </div>
      </div>


      <!-- edit variant -->
      <div v-if="popupEditVariant" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 30px);">  
        <div class="checkout__header" style="padding: 5px 5px 15px; z-index: 10000000; background: white; width: 100%;">
          <div @click="hideEditVariant()" class="checkout__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
            </svg>
          </div>
          <div class="checkout__title">Modifier</div>
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
                  <legend>Prix</legend>
                  <input type="text" v-model="variant.price" inputmode="decimal">
                </fieldset>
              </div>
              <div class="form--input--item" :class="{'form--input--item--error': checkCompareAtPrice }">
                <fieldset>
                  <legend>Prix avant réduction</legend>
                  <input type="text"  v-model="variant.compareAtPrice" inputmode="decimal">
                </fieldset>
              </div>
            </div>

		        <div class="form--input" style="grid-template-columns: 1fr 60px;">
		          <div class="form--input--item" :class="{'form--input--item--error': !variant.weight }">
		          	<fieldset>
		          		<legend>Poids</legend>
		          		<input type="text"  v-model="variant.weight" inputmode="decimal">
		          	</fieldset>
		          </div>
		          <div class="form--input--item">
		            <fieldset>
		              <input @click="selectWeightUnit('variant')" type="text" v-model="variant.weightUnit" readonly style="width: 75%;">
		            </fieldset>
		          </div>
		        </div>
            <div v-if="errorVariantWeight" style="font-size: 13px; color: rgb(255, 0, 0); margin-bottom: 20px; margin-top: -15px;">Maximum 20kg</div>

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


<style scoped src="../../assets/css/addeditproduct.css"></style>

<script>

import Lottie from 'vue-lottie';
import * as animationData from '../../assets/lottie/upload.json';


export default {
  name: 'AddEditProduct',
  components: {
    Lottie
  },
  data() {
    return {
      productId: this.$route.params.productId,
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      defaultOptions: {animationData: animationData},
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: this.$store.getters.getUser,
      product: {
        'title': '',
        'description': '',
        'category': {
          'id': '',
        },
        'price': null,
        'compareAtPrice': null,
        'quantity': '',
        'weight': '',
        'weightUnit': 'g',
        'uploads': [],
        'variants': [],
        'options': [],
      },
      categories: this.$store.getters.getCategories,
      popupVariant: false,
      popupEditVariant: false,
      errorTitle: false,
      errorDescription: false,
      errorCategory: false,
      errorWeight: false,
      errorPrice: false,
      errorCompareAtPrice: false,
      errorVariantWeight: false,
      option1: true,
      option2: false,
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
      loadingDelete: false,
      loading: false,
      isAndroid: false,
      visible: "",
      variant: [],
      array: [],
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
    window.StatusBar.backgroundColorByHexString("#ffffff");

    if (window.cordova && (window.cordova.platformId === "android")) {
      this.isAndroid = true;
    }

    if (!this.$store.getters.getCategories.length) {
      window.cordova.plugin.http.get(this.baseUrl + "/api/categories", {}, { 'Content-Type':  'application/json; charset=UTF-8' }, (response) => {
        this.categories = JSON.parse(response.data);
        this.$store.commit('setCategories', JSON.parse(response.data));
      }, (response) => {
        console.log(response.error);
      });
    }
  },
  mounted() {
    if (this.productId) {
      this.user.vendor.products.map((product, index) => {
        if (this.productId == product.id) {
          this.product = product;

          if (this.product.options) {
            this.product.options.map((element, index) => { 
              if (element.position == 1) {
                this.inputNameOption1 = element.name;
                this.valuesOption1 = element.data;
              } else {
                this.inputNameOption2 = element.name;
                this.valuesOption2 = element.data;
                this.option2 = true;
              }
            });
          }
        }
      });
    }
  },
  methods: {
    async submit() {
      window.cordova.plugin.http.setDataSerializer('json');
      this.errorTitle = false;
      this.errorDescription = false;
      this.errorCategory = false;
      this.errorWeight = false;
      this.errorPrice = false;
      this.errorCompareAtPrice = false;

      if (!this.product.title) {
        this.errorTitle = true;
      }

      if (!this.product.description) {
        this.errorDescription = true;
      }

      if (!this.product.category) {
        this.errorCategory = true;
      }

      if (!this.product.variants.length) {
        if (!this.product.weight) {
          this.errorWeight = true;
        } else if (this.product.weight > 20 && this.product.weightUnit == "kg") {
          this.errorWeight = true;
        } else if (this.product.weight > 20000 && this.product.weightUnit == "g") {
          this.errorWeight = true;
        }

        if (!this.product.price || parseFloat(this.product.price) < 2) {
          this.errorPrice = true;
        }

        if (this.product.compareAtPrice) {
          if (parseFloat(this.product.compareAtPrice) < parseFloat(this.product.price)) {
            this.errorCompareAtPrice = true;
          }
        }
      }

      if (!this.errorTitle && !this.errorDescription && !this.errorCategory && !this.errorWeight && !this.errorPrice && !this.errorCompareAtPrice && !this.loading) {
        this.loading = true;
        if (this.product.variants) {
          this.product.variants.map((element, index) => { 
          	console.log(element, index);
          	if (this.product.variants[index].price.includes(',')) {
           	 	this.product.variants[index].price = this.product.variants[index].price.replace(',','.');
          	}
          	if (this.product.variants[index].compareAtPrice && this.product.variants[index].compareAtPrice.includes(',')) {
           	 	this.product.variants[index].compareAtPrice = this.product.variants[index].compareAtPrice.replace(',','.');
          	}
          	if (this.product.variants[index].weight) {
          		this.product.variants[index].weight = this.product.variants[index].weight.replace(',','.');
          	}
          });
        }

        var httpParams = { "title": this.product.title, "description": this.product.description, "category": this.product.category.id, "price": this.product.price.replace(',','.'), "compareAtPrice": this.product.compareAtPrice ? this.product.compareAtPrice.replace(',','.') : null, "quantity": this.product.quantity ? parseFloat(this.product.quantity) : 0, "weight": this.product.weight.replace(',','.'), "weightUnit": this.product.weightUnit, "online": true, "options" : this.product.options ? this.product.options : null, "variants" : this.product.options && this.product.variants ? this.product.variants : null, "uploads" : this.product.uploads ? this.product.uploads : null };

        if (this.productId) {
          await window.cordova.plugin.http.put(this.baseUrl + "/user/api/product/edit/" + this.productId, httpParams, { Authorization: "Bearer " + this.token }, (response) => {
            this.$store.commit('setUser', JSON.parse(response.data));
            window.plugins.toast.showWithOptions({
              message: "L'article a bien été modifié !",
              duration: "short", // 2000 ms
              position: "top",
              addPixelsY: 50,
              styling: {
                backgroundColor: '#18cea0', // make sure you use #RRGGBB. Default #333333
                textColor: '#FFFFFF', // Ditto. Default #FFFFFF
              }
            });

            this.$router.push({ name: 'Shop' });
          }, (response) => {
            this.loading = false;
            console.log(JSON.parse(response.error));
          });
        } else {
          await window.cordova.plugin.http.post(this.baseUrl + "/user/api/product/add", httpParams, { Authorization: "Bearer " + this.token }, (response) => {
            this.$store.commit('setUser', JSON.parse(response.data));
            window.plugins.toast.showWithOptions({
              message: "L'article a bien été modifié !",
              duration: "short", // 2000 ms
              position: "top",
              addPixelsY: 50,
              styling: {
                backgroundColor: '#18cea0', // make sure you use #RRGGBB. Default #333333
                textColor: '#FFFFFF', // Ditto. Default #FFFFFF
              }
            });
            this.$router.push({ name: 'Shop' });
          }, (response) => {
            this.loading = false;
            console.log(JSON.parse(response.error));
          });
        }
      }
    },
    uploadSheet() {
      if (this.product.uploads.length < 9) {
        var options = {
          title: 'Ajouter des photos',
          buttonLabels: ['À Partir de la bibliothèque', 'Prendre une photo'],
          addCancelButtonWithLabel: 'Annuler',
          androidEnableCancelButton : true,
          winphoneEnableCancelButton : true
        };
        window.plugins.actionsheet.show(options, (index) => { 
          if (index == 1) {
            this.openFilePicker();
          } else if (index == 2) {
            this.openCamera();
          }
        }, function(error) {
          console.log(error);
        });
      }
    },
    openFilePicker() {
      var options = {
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        targetHeight: 750,
        targetWidth: 750,
        allowEdit: false,
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
        targetHeight: 750,
        targetWidth: 750,
        allowEdit: false,
        correctOrientation: true,
      }
      this.uploadImage(options);
    },
    uploadImage(options) {
      navigator.camera.getPicture((imageUri) => {
        console.log(imageUri);
        window.cordova.plugin.http.setDataSerializer('json');
        var url = this.baseUrl + "/user/api/product/upload";
        this.loadingImg = true;

        if (window.cordova && (window.cordova.platformId === "android" || window.cordova.platformId === "ios")) {
          window.cordova.plugin.http.uploadFile(url, {}, { Authorization: "Bearer " + this.token }, imageUri, 'picture', (response) => {
            this.loadingImg = false;
            this.product.uploads.push(JSON.parse(response.data));
          }, (response) => {
            console.log(response.error);
          });
        } else {
          var imgData = "data:image/jpeg;base64," + imageUri;
          window.cordova.plugin.http.post(url, { "picture" : imgData }, { Authorization: "Bearer " + this.token }, (response) => {
            this.loadingImg = false;
            this.product.uploads.push(JSON.parse(response.data));
          }, function(response) {
            console.log(response.error);
          });
        }
      }, (error) => {
        console.log("Impossible de récupérer l'image : " + error);
      }, options);
    },
    deleteImage(index, id) {
      this.product.uploads.splice(index, 1);

      window.cordova.plugin.http.get(this.baseUrl + "/user/api/product/upload/delete/" + id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        var filtersList = this.product.uploads.filter(element => element !== id);
        this.product.uploads = filtersList;
      }, (response) => {
        console.log(response.error);
      });
    },
    deleteProduct() {
      if (this.productId && !this.loadingDelete) {
        this.loadingDelete = true;
        window.cordova.plugin.http.get(this.baseUrl + "/user/api/product/delete/" + this.productId, {}, { Authorization: "Bearer " + this.token }, (response) => {
          this.$router.push({ name: 'Shop' });
        }, (response) => {
          this.loadingDelete = false;
          console.log(response.error);
        });
      }
    },
    addVariant() {
      this.errorTitle = false;
      this.errorDescription = false;
      this.errorCategory = false;
      this.errorWeight = false;
      this.errorPrice = false;
      this.errorCompareAtPrice = false;

      if (!this.product.price || parseFloat(this.product.price) < 2) {
        this.errorPrice = true;
      }

      if (this.product.compareAtPrice) {
        if (parseFloat(this.product.compareAtPrice) < parseFloat(this.product.price)) {
          this.errorCompareAtPrice = true;
        }
      }

      if (!this.product.weight) {
        this.errorWeight = true;
      }

      if (!this.errorPrice && !this.errorWeight && !this.errorCompareAtPrice) {
        this.errorTitle = false;
        this.errorDescription = false;
        this.errorCategory = false;
        this.errorWeight = false;
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
      var id = this.product.variants[index].id;
      this.product.variants.splice(index, 1);

      if (this.product.options && id && this.productId) {
        window.cordova.plugin.http.get(this.baseUrl + "/user/api/variant/delete/" + id, {}, { Authorization: "Bearer " + this.token }, (response) => {
          console.log(response);
        }, (response) => {
          console.log(response);
        });
      }
      
      if (this.product.variants.length == 0) {
        this.product.options = [];
        this.inputNameOption1 = "";
        this.inputOption1 = "";
        this.valuesOption1 = [];
        this.inputNameOption2 = "";
        this.inputOption2 = "";
        this.valuesOption2 = [];
      } else {
        this.valuesOption1.map((element, index) => {
          var exist = false;
          this.product.variants.map((variant, index) => {
            if (element.toLowerCase() === variant.option1.toLowerCase()) {
              exist = true;
            }
          });

          if (!exist) {
            this.valuesOption1.splice(index, 1);
          }
        });

        this.product.options = [];
        this.product.options.push({ "name": this.inputNameOption1, "data": this.valuesOption1, "position": 1 });

        if (this.valuesOption2.length > 0) {
          this.valuesOption2.map((element, index) => {
            var exist = false;
            this.product.variants.map((variant, index) => {
              if (element.toLowerCase() === variant.option2.toLowerCase()) {
                exist = true;
              }
            });

            if (!exist) {
              this.valuesOption2.splice(index, 1);
            }
          });

          this.product.options.push({ "name": this.inputNameOption2, "data": this.valuesOption2, "position": 2 });
        }
      }

      this.variant = [];
      this.visible = "";
      this.popupEditVariant = false;
    },
    async saveEditVariant() {
      console.log(this.variant);
      this.errorVariantWeight = false;

      if (this.variant.weight && this.variant.weight > 20 && this.variant.weightUnit == "kg") {
        this.errorVariantWeight = true;
      } else if (this.variant.weight && this.variant.weight > 20000 && this.variant.weightUnit == "g") {
        this.errorVariantWeight = true;
      }

      if (this.variant.title && parseFloat(this.variant.price) > 2 && !this.errorVariantWeight) {
        if (!this.variant.compareAtPrice) {
          this.variant.compareAtPrice = null;
        }

        if (this.variant.quantity != "") {
          this.variant.quantity = parseFloat(this.variant.quantity);
        } else {
          this.variant.quantity = 0;
        }

        if (this.variant.id) {
          window.cordova.plugin.http.setDataSerializer('json');
          var httpParams = { "title": this.variant.title, "price": this.variant.price.replace(",","."), "compareAtPrice": this.variant.compareAtPrice ? this.variant.compareAtPrice.replace(",",".") : null, "quantity": this.variant.quantity, "weight": this.variant.weight, "weightUnit": this.variant.weightUnit };

          await window.cordova.plugin.http.post(this.baseUrl + "/user/api/variant/edit/" + this.variant.id, httpParams, { Authorization: "Bearer " + this.token }, (response) => {
            console.log(response);
          }, (response) => {
            console.log(JSON.parse(response));
          });
        }

        this.product.variants[this.visible] = this.variant;
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
      this.variant = { "id": this.product.variants[index].id, "title": this.product.variants[index].title, "price": this.product.variants[index].price, "compareAtPrice": this.product.variants[index].compareAtPrice ? this.product.variants[index].compareAtPrice : null, "quantity": this.product.variants[index].quantity ? this.product.variants[index].quantity : 0, "position": this.product.variants[index].position, "option1": this.product.variants[index].option1, "option2": this.product.variants[index].option2, "weight" : this.product.variants[index].weight, "weightUnit" : this.product.variants[index].weightUnit };

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
      this.product.options = [];
      var count = 1;
      var array = [];

      if (!this.inputNameOption1) {
        this.errorNameOption1 = true;
      }

      if (this.valuesOption1.length < 2) {
        this.errorInputOption1 = true;
      }

      if (this.valuesOption2.length > 1 && !this.inputNameOption2) {
        this.errorNameOption2 = true;
      }
      
      if (!this.errorNameOption1 && !this.errorInputOption1) {
        this.product.options.push({ "name": this.inputNameOption1, "data": this.valuesOption1, "position": 1 });

        if (this.product.compareAtPrice) {
          if (parseFloat(this.product.compareAtPrice) < parseFloat(this.product.price)) {
            this.errorCompareAtPrice = true;
          }
        }

        if (this.valuesOption2.length && !this.errorNameOption2 && !this.errorCompareAtPrice) {
          this.product.options.push({ "name": this.inputNameOption2, "data": this.valuesOption2, "position": 2 });
          this.valuesOption1.map((element, index) => {
            this.valuesOption2.map((element2, index2) => {
              array.push({ "title": element + " / " + element2, "price": this.product.price, "compareAtPrice": this.product.compareAtPrice, "quantity": 0, "position": count, "option1": element, "option2": element2, "weight" : this.product.weight, "weightUnit" : this.product.weightUnit });
              count++;
            });
          });

          array.map((element, index) => {
            this.product.variants.map((element2, index2) => {
              if (element2.option1 == element.option1 && element2.option2 == element.option2) {
                array[index] = this.product.variants[index2];
              }
            });
          });

        } else {
          this.valuesOption1.map((element, index) => {
            array.push({ "title": element, "price": this.product.price, "compareAtPrice": this.product.compareAtPrice, "quantity": 0, "position": index + 1, "option1": element, "option2": "", "weight" : this.product.weight, "weightUnit" : this.product.weightUnit });
          });

          array.map((element, index) => {
            this.product.variants.map((element2, index2) => {
              if (element2.option1 == element.option1) {
                array[index] = this.product.variants[index2];
              }
            });
          });
        }

        this.product.variants = array;
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
	    		this.product.weightUnit = result[0].description;
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

