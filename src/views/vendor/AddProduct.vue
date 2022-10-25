<template>
  <main class="products">
    <div class="checkout">
      <div class="checkout__header" style="padding: 15px;">
        <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 8px; padding: 0.5rem 0px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: #161823;"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
        </div>
        <div class="checkout__title" style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Ajouter un produit</div>
      </div>

      <div style="padding: 15px;margin-top: 5px;">
        <div class="form--input--item" :class="{'form--input--item--error': errorTitle }">
          <fieldset>
            <legend>Titre</legend>
            <input type="text" v-model="title">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorCategory }">
          <fieldset>
            <legend>Catégorie</legend>
            <select required v-model="category">
              <option value="">Choisir une catégorie</option>
              <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
            </select>
          </fieldset>
        </div>

        <div @click="uploadSheet()" class="form--input--item" :class="{'form--input--item--error': errorImage }">
          <div class="c-cell__content">
            <div class="c-cell__body">
              <div class="dropzone">
                <div class="media-select__input" style="padding-top: 130px;">
                  <div class="media-select__input-content">
                    <button class="c-button c-button--default c-button--default c-button--primary c-button--inline c-button--truncated c-button--icon-left" type="button" style="border: none; height: 100px;">
                      <span class="c-button__content" style="display: grid;">
                        <img :src="require(`@/assets/img/upload.svg`)" style="width: 72px; height: 72px; margin: 0 auto;">
                        <span class="c-button__label">
                          <span style="font-size: 14px; color: #333;">Ajouter des images</span>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="images.length" class="content--img">
          <div v-for="(image, index) in images" :key="image.id">
            <span>
              <span>
                <img :src="baseUrl + '/uploads/' + image.filename">
              </span>
            </span>
            <button @click="deleteImage(index, image.id)">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="MuiBox-root css-0 iconify iconify--eva" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29l-4.3 4.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4.29-4.3l4.29 4.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42z"></path></svg>
            </button>
          </div>
        </div>
        
        <div class="form--input--item" :class="{'form--input--item--error': errorDescription }">
          <fieldset style="height: 150px;">
            <legend>Description</legend>
            <textarea v-model="description" style="height: 136px; margin-top: 10px; line-height: 24px; font-size: 14px;"></textarea>
          </fieldset>
        </div>


        <div v-if="!variants.length" class="form--input">
          <div class="form--input--item" :class="{'form--input--item--error': errorPrice }">
            <fieldset>
              <legend>Prix</legend>
              <input type="text" v-model="price" placeholder="0,00" inputmode="decimal">
            </fieldset>
          </div>
          <div class="form--input--item" :class="{'form--input--item--error': errorCompareAtPrice }">
            <fieldset>
              <legend>Prix avant réduction</legend>
              <input type="text" v-model="compareAtPrice" inputmode="decimal">
            </fieldset>
          </div>
        </div>


        <div v-if="!variants.length" class="form--input">
          <div class="form--input--item" :class="{'form--input--item--error': errorWeight }">
            <fieldset>
              <legend>Format du colis</legend>
              <select required v-model="weight">
                <option value="" selected="selected">Choisir un format</option>
                <option value="small">Petit : 0 à 1kg</option>
                <option value="medium">Moyen : 1 à 2kg</option>
                <option value="large">Grand : 2kg et +</option>
              </select>
            </fieldset>
          </div>
          <div class="form--input--item">
            <fieldset>
              <legend>Quantité</legend>
              <input type="text" v-model="quantity" inputmode="decimal">
            </fieldset>
          </div>
        </div>


        <!-- variants -->
        <div class="title-wrapper-3KgEa">
          <div style="margin-top: 0px;">
            <div style="font-size: 16px; margin-top: 10px;">Variantes</div>
            <div v-if="variants.length" @click="addVariant()" style="color: #fe2c55; margin-top: 10px;">Modifier</div>
            <div v-else class="profil--slide" style="margin-top: 10px;">
              <input type="checkbox" v-model="checkedVariants" class="slider" id="slider1" @change="addVariant()">
              <label for="slider1">
                <span></span>
              </label>
              <label for="slider1"></label>
            </div>
          </div>
        </div>
        <div class="form-container-3hjAo">
          <p style="font-size: 13px;color: rgb(153, 153, 153);margin-top: 10px;">Ce produit dispose de plusieurs options (tailles, couleurs différentes, poids...)</p>
          <div v-if="variants.length" class="items">
            <div class="lasted--product">
              <div v-for="(item, index) in variants" class="product--item" style="border: 1px solid rgb(176, 181, 187); padding: 5px 15px; margin-left: 0px; border-radius: 10px;">
                <div @click="editVariant(index)" class="details" style="margin-left: 5px;">
                  <div class="title">{{ item.title }}</div>
                  <div class="price" v-if="item.quantity">Qté : {{ item.quantity }} | Prix : {{ item.price | formatPrice }}€</div>
                  <div class="price" v-else><span style="color: #ff0000;">Qté : 0</span> | Prix : {{ item.price | formatPrice }}€</div>
                </div>
                <div style="margin-top: 11px;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187);width: 16px;height: 16px;"><path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path></svg>
                </div>
              </div>
            </div>
          </div>
          <div @click="submit()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); margin-top: 40px;">Enregistrer</div><br>
        </div>
      </div>


      <!-- popup variant -->
      <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popupVariant" style="overflow-y: scroll; height: 60%; box-shadow: rgba(0, 0, 0, 1) 0px 10px 5px 0px;"> 
        <div class="checkout__header">
          <div @click="hideVariant()" class="checkout__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
          </div>
          <div class="checkout__title"> Ajouter des options</div>
        </div>
        <div style="padding: 15px;">
          <div v-if="option1">
            <div class="row">
              <div class="col-5" style="padding-right: 0px;">
                <div class="form--input--item" :class="{'form--input--item--error': errorNameOption1 }">
                  <fieldset>
                    <legend>Option 1</legend>
                    <input type="text" placeholder="Taille" v-model="inputNameOption1" style="text-transform: capitalize;">
                  </fieldset>
                </div>
              </div>
              <div class="col-5" style="padding-right: 0px;">
                <div class="form--input--item" :class="{'form--input--item--error': errorInputOption1 }">
                  <fieldset>
                    <legend>Valeur</legend>
                    <input type="text" placeholder="S, M, L, XL" v-model="inputOption1" v-on:keyup.enter="addValueOption1()">
                  </fieldset>
                </div>
              </div>
              <div class="col-2">
                <svg @click="addValueOption1()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 36px; height: 36px; fill: #fe2c55; margin-top: 9px; border: 1px solid #fe2c55; padding: 4px; border-radius: 30px;">
                  <defs></defs>
                  <path d="M352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"
                  style="fill: rgb(254, 44, 85);"></path>
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256C397.4 512 512 397.4 512 256S397.4 0 256 0zM352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"
                  style="fill: white;"></path>
                </svg>
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
            <div class="row">
              <div class="col-5" style="padding-right: 0px;">
                <div class="form--input--item" :class="{'form--input--item--error': errorNameOption2 }" style="margin-top: 20px;">
                  <fieldset>
                    <legend>Option 2</legend>
                    <input type="text" placeholder="Couleur" v-model="inputNameOption2" style="text-transform: capitalize;">
                  </fieldset>
                </div>
              </div>
              <div class="col-5" style="padding-right: 0px;">
                <div class="form--input--item" style="margin-top: 20px;">
                  <fieldset>
                    <legend>Valeur</legend>
                    <input type="text" placeholder="Bleu, rouge..." v-model="inputOption2" v-on:keyup.enter="addValueOption2()">
                  </fieldset>
                </div>
              </div>
              <div class="col-2">
                <svg @click="addValueOption2()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 36px; height: 36px; fill: #fe2c55; margin-top: 30px; border: 1px solid #fe2c55; padding: 4px; border-radius: 30px;">
                  <defs></defs>
                  <path d="M352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"
                  style="fill: rgb(254, 44, 85);"></path>
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256C397.4 512 512 397.4 512 256S397.4 0 256 0zM352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"
                  style="fill: white;"></path>
                </svg>
              </div>
            </div>
            <div>
              <span v-for="(value, index) in valuesOption2" class="tags-input__tag"> {{ value }}
                <span @click="deleteValue2(index)" class="tags-input__tag-remove"> × </span>
              </span>
            </div>
          </div>
          <div v-else @click="addOption()">
            <hr><br>
            <div style="color: #FE2C55; font-weight: 500; margin-top: 15px;">Ajouter une 2ème option</div>
          </div>


          <div @click="generate()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); margin: 0 auto; position: absolute; bottom: 20px;">Enregistrer</div>
        </div>
      </div>


      <!-- edit variant -->
      <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popupEditVariant" style="overflow-y: scroll; height: 50%; box-shadow: rgba(0, 0, 0, 1) 0px 10px 5px 0px;"> 
        <div class="checkout__header">
          <div @click="hideEditVariant()" class="checkout__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
          </div>
          <div class="checkout__title"> Modifier</div>
          <div class="checkout__right-btn">
            <div @click="deleteVariant(variant.id)" style="color: #FE2C55; font-weight: 600;">Supprimer</div>
          </div>
        </div>
        <div style="padding: 0px 15px;">
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
              		<input type="text" v-model="variant.price" placeholder="0,00" inputmode="decimal">
                </fieldset>
              </div>
              <div class="form--input--item" :class="{'form--input--item--error': checkCompareAtPrice }">
                <fieldset>
                  <legend>Prix avant réduction</legend>
              		<input type="text" v-model="variant.compareAtPrice" inputmode="decimal">
                </fieldset>
              </div>
            </div>

            <div class="form--input">
              <div class="form--input--item" :class="{'form--input--item--error': !variant.weight }">
                <fieldset>
                  <legend>Format du colis</legend>
                  <select required v-model="variant.weight">
                    <option value="" :selected="!variant.weigh">Choisir un format</option>
                    <option value="small">Petit</option>
                    <option value="medium">Moyen</option>
                    <option value="large">Grand</option>
                  </select>
                </fieldset>
              </div>
              <div class="form--input--item" :class="{'form--input--item--error': variant.quantity == 0 }">
                <fieldset>
                  <legend>Quantité</legend>
              		<input type="text" v-model="variant.quantity" inputmode="decimal">
                </fieldset>
              </div>
            </div>

            <div @click="saveEditVariant()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); position: absolute; bottom: 45px; margin: 0 auto;">Enregistrer</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>

.checkout__right-btn {
  position: absolute;
  right: 0;
  top: 8px;
  padding: 0.5rem;
}

.tags-input__tag {
  display: inline-flex;
  padding: 3px 9px;
  margin: 0 .25rem 0.5rem;
  border-radius: 25px;
  background: white;
  color: #fe2c55;
  border: 1px solid #fe2c55;
  font-weight: 600;
}

.tags-input__tag-remove {
  display: inline-block;
  margin-left: 0.5rem;
  margin-right: 0.25rem;
  line-height: 1rem;
  transform: translateY(7%);
  font-size: 1.5em;
  cursor: pointer;
  color: #fe2c55;
  font-weight: 600;
}

.store-products-item__login-popup.store-products-item__login-popup--active {
  bottom: 0;
}

.store-products-item__login-popup {
  position: fixed;
  width: 100%;
  bottom: -80%;
  background-color: #fff;
  animation-duration: 400ms !important;
  animation-iteration-count: 1 !important;
  animation-fill-mode: both !important;
  animation-name: keyframe_d37zz3 !important;
  z-index: 1000000000;
}

.btn-swipe {
  color: white !important;
  font-weight: 600;
  margin: 20px auto;
  padding: 14px 40px;
  font-size: 15px;
}

.my_form_check {
 display: inline-block;
 margin-top: 58px;
}

.styled-checkbox {
 position: absolute;
 opacity: 0;
}

.styled-checkbox + label {
 position: relative;
 cursor: pointer;
 padding: 0;
}

.styled-checkbox + label:before {
 content: "";
 margin-right: 4vw;
 display: inline-block;
 vertical-align: text-top;
 width: 20px;
 height: 20px;
 background: #fff;
 border: 2px solid #2ecc71;
 border-radius: 2px;
}

.styled-checkbox:checked + label:before {
 background: #2ecc71;
}

.styled-checkbox:disabled + label {
 color: #b8b8b8;
 cursor: auto;
}

.styled-checkbox:checked + label:after {
 content: "";
 position: absolute;
 left: 5px;
 top: 10px;
 background: white;
 width: 2.5px;
 height: 2.5px;
 box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
 -webkit-transform: rotate(45deg);
 transform: rotate(45deg);
}

.previews {
  font-size: 0;
  margin: 1rem -5px -.5rem;
  position: relative;
  z-index: 8;
}

.previews .preview {
  border-radius: 8px;
  display: inline-block;
  height: 100px;
  width: 100px;
  margin: 5px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 2px 0 rgb(0 0 0 / 20%);
  object-fit: cover;
}

.previews .preview img,.previews .preview .no-image {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.previews .preview i {
  color: #fff;
  cursor: pointer;
  font-size: 1.25rem;
  height: auto;
  margin-right: .25rem;
  margin-top: .25rem;
  position: absolute;
  right: 0;
  text-shadow: 0 0 2px rgb(0 0 0 / 50%);
  top: 0;
  transition: .2s opacity;
  width: auto;
  z-index: 3;
}

.content--img {
  margin: 0px 0px 20px;
  padding: 0px;
  position: relative;
}
.content--img > div {
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  box-sizing: border-box;
  text-align: left;
  padding: 0px;
  margin: 4px;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: inline-flex;
  border: 1px solid rgba(145, 158, 171, 0.24);
}
.content--img > div > span {
  width: 100%;
  line-height: 0;
  display: block;
  overflow: hidden;
  position: relative;
  padding-top: 100%;
}
.content--img > div > span > span {
  display: inline-block;
  inset: 0px;
  line-height: 0;
  position: absolute;
  background-size: cover !important;
  transition: filter .3s,-webkit-filter .3s;
}
.content--img > div > span > span img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content--img > div button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  text-align: center;
  flex: 0 0 auto;
  border-radius: 50%;
  overflow: visible;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 1.125rem;
  top: 6px;
  padding: 2px;
  right: 6px;
  position: absolute;
  color: rgb(255, 255, 255);
  background-color: rgba(22, 28, 36, 0.72);
}

.content--img > div button:hover {
  background-color: rgba(22, 28, 36, 0.48);
}

select::placeholder {
  color: #999;
}


.profil--slide {
  display: inline-flex;
  height: 38px;
  padding: 12px;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  z-index: 0;
  vertical-align: middle;

}
.profil--slide label:last-of-type {
  background-color: rgb(145, 158, 171);
  border-radius: 7px;
  display: block;
  width: 34px;
  height: 14px;
  margin-bottom: 0px;
}
.profil--slide > label:first-of-type {
  padding: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
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
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  right: auto;
  box-shadow: rgb(145 158 171 / 16%) 0px 1px 2px 0px;
}
.profil--slide > label:first-of-type:hover {
  background-color: rgba(99, 115, 129, 0.08);
}
.profil--slide label:first-of-type span {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;

}
.profil--slide input[type=checkbox] {
  visibility: hidden;

}
.profil--slide input[type=checkbox]:checked + label:first-of-type {
  left: 35px;
}  

.slider:checked + label:first-of-type span {
  background-color: rgb(0, 171, 85);
}

.slider:checked ~ label:last-of-type {
  background-color: rgb(0, 171, 85) !important;
  opacity: .5;
}


.lasted--product {
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: hidden;
}
.product--item {
  display: flex;
  flex-direction: row;
}
.product--item img {
  line-height: 0;
  display: block;
  overflow: hidden;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
}
.product--item .details {
  margin-left: 16px;
  flex-grow: 1;
  min-width: 200px;
}
.product--item .details .title {
  text-decoration: none;
  color: rgb(33, 43, 54);
  font-weight: 600;
  line-height: 1.57143;
  font-size: 15px;
}
.product--item .details .price {
  line-height: 1.57143;
  font-size: 14px;
  font-weight: 400;
  color: rgb(99, 115, 129);
}

textarea::-webkit-scrollbar {
  display: none;
}
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script>

export default {
  name: 'AddProduct',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      visible: "",
      title: "",
      description: "",
      category: "",
      price: null,
      compareAtPrice: null,
      quantity: 0,
      weight: "",
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
      checkedVariants: false,
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
    	console.log(value);
    	return value.toString().replace('.', ',');
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();

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
          });
        }

        var httpParams = { "title": this.title, "description": this.description, "category": this.category, "price": this.price.replace(',','.'), "compareAtPrice": this.compareAtPrice ? this.compareAtPrice.replace(',','.') : null, "quantity": this.quantity, "weight": this.weight, "online": true, "uploads": this.uploads, "options" : this.options ? this.options : null, "variants" : this.variants ? this.variants : null };

        await window.cordova.plugin.http.post(this.baseUrl + "/user/api/products/add", httpParams, { Authorization: "Bearer " + this.token }, (response) => {
          console.log(response);
          var result = JSON.parse(response.data);
          if (result) {
            this.$router.push({ name: 'ShopVendor' });
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
          window.cordova.plugin.http.uploadFile(this.baseUrl + "/user/api/products/upload/add", {}, { Authorization: "Bearer " + this.token }, imageUri, 'picture', (response) => {
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
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/products/upload/delete/" + id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.images.splice(index, 1);
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
        this.checkedVariants = true;
      } else {
        this.checkedVariants = false;
    	console.log(this.checkedVariants);
      }
    },
    hideVariant() {
      this.popupVariant = false;
      this.visible = ""; 
    },
    deleteVariant(id) {
      if (this.variants[this.visible].id == id) {
        this.variants.splice(this.visible, 1);
      }
      
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
      this.variant = { "title": this.variants[index].title, "price": this.variants[index].price, "compareAtPrice": this.variants[index].compareAtPrice ? this.variants[index].compareAtPrice : null, "quantity": this.variants[index].quantity ? this.variants[index].quantity : 0, "position": this.variants[index].position, "option1": this.variants[index].option1, "option2": this.variants[index].option2, "weight" : this.variants[index].weight };
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
      this.$router.push({ name: 'ShopVendor' });
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

      if (!this.errorNameOption1 && !this.errorInputOption1 && !this.errorCompareAtPrice) {
        this.options.push({ "name": this.inputNameOption1, "data": this.valuesOption1, "position": 1 });

        if (this.valuesOption2.length && !this.errorNameOption2) {
          var count = 1;

          this.options.push({ "name": this.inputNameOption2, "data": this.valuesOption2, "position": 2 });
          this.valuesOption1.map((element, index) => {
            this.valuesOption2.map((element2, index2) => {
              this.variants.push({ "title": element + " - " + element2, "price": this.price, "compareAtPrice": this.compareAtPrice, "quantity": 0, "position": count, "option1": element, "option2": element2, "weight" : this.weight });
              count++;
            });
          });
        } else {
          this.valuesOption1.map((element, index) => {
            this.variants.push({ "title": element, "price": this.price, "compareAtPrice": this.compareAtPrice, "quantity": 0, "position": index + 1, "option1": element, "option2": "", "weight" : this.weight });
          });
        }

        this.errorNameOption1 = false;
        this.errorInputOption1 = false;
        this.errorNameOption2 = false;
        this.errorCompareAtPrice = false;
        this.popupVariant = false;
      }
    }
  }
};

</script>

