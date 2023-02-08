<template>
  <main class="cart">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Paiement</div>
    </div>
    <div class="checkout__body" style="padding-bottom: 110px;">

      <!-- order summary -->
      <div v-if="lineItems && lineItems.length" class="css-13dslnb">
        <div v-for="(lineItem, index) in lineItems" class="checkout__row checkout__product-info-row">
          <div class="checkout__product-info">
            <img v-if="lineItem.product.uploads" :src="cloudinary256x256 + lineItem.product.uploads[0].filename" class="checkout__image"/>
            <img v-else :src="require(`@/assets/img/no-preview.jpg`)" class="checkout__image"/>
            <span class="counter-badge">{{ lineItem.quantity }}</span>
            <div style="padding-right: 30px;">   
              <h5 class="checkout__name" style="margin-bottom: 0px;"> {{ lineItem.product.title }} </h5>
              <div v-if="lineItem.variant" class="checkout__attr">
                <span>{{ lineItem.variant.title }}</span>
              </div>
            </div>
          </div>
          <div class="product--quantity--detail">
            <span v-if="lineItem.variant" style="font-size: 14px; font-weight: 400;">{{ lineItem.variant.price * lineItem.quantity | formatPrice }}€</span>
            <span v-else style="font-size: 14px; font-weight: 400;">{{ lineItem.product.price * lineItem.quantity | formatPrice }}€</span>
          </div>
        </div>
        <hr class="css-ss6lby" style="margin-bottom: 5px; margin-top: 5px; border-style: dashed;"/>
        <div class="css-18mhetb">
          <div class="css-ikzlcq">
            <div class="css-9jay18">
              <p class="css-11r9ii4">Sous-total</p>
              <h6 class="css-yemnbq">{{ subTotal | formatPrice }}€</h6>
            </div>
          <!--   <div class="css-9jay18">
              <p class="css-11r9ii4" style="color: #18cea0; font-weight: 500;">PROMO10</p>
              <h6 class="css-yemnbq" style="color: #18cea0; font-weight: 500;">-10,00€</h6>
            </div> -->
            <div class="css-9jay18">
              <p class="css-11r9ii4">Livraison</p>
              <h6 v-if="shippingPrice" class="css-yemnbq">+{{ shippingPrice | formatPrice }}€</h6>
              <h6 v-else class="css-yemnbq">-</h6>
            </div>
            <hr class="css-ss6lby" style="margin-bottom: 10px; margin-top: 5px;"/>
            <div class="css-9jay18">
              <h6 class="css-k9tjo5">Total</h6>
              <div class="css-s2uf1z">
                <h6 class="css-kdhaao">{{ total | formatPrice }}€</h6>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!-- domicile -->
      <div v-if="shippingAddress && shippingMethod != 'service_point'" class="card panel-item card-address">
        <div @click="showShippingAddress()" class="card-body parcelshop-card-body">
          <div class="card-title">
            <img :src="require(`@/assets/img/domicile.png`)"/>
            {{ name }}
          </div>
          <div class="card-text">
            <div>{{ address }}</div>
            <div>{{ zip }} {{ city }}</div>
            <div>{{ country }}</div>
            <span>
            	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);">
                <path d="M493.255 56.236l-37.49-37.49c-24.993-24.993-65.515-24.994-90.51 0L12.838 371.162.151 485.346c-1.698 15.286 11.22 28.203 26.504 26.504l114.184-12.687 352.417-352.417c24.992-24.994 24.992-65.517-.001-90.51zm-95.196 140.45L174 420.745V386h-48v-48H91.255l224.059-224.059 82.745 82.745zM126.147 468.598l-58.995 6.555-30.305-30.305 6.555-58.995L63.255 366H98v48h48v34.745l-19.853 19.853zm344.48-344.48l-49.941 49.941-82.745-82.745 49.941-49.941c12.505-12.505 32.748-12.507 45.255 0l37.49 37.49c12.506 12.506 12.507 32.747 0 45.255z"/>
              </svg>
            </span>
          </div>
        </div> 
      </div>
      <div v-else-if="!shippingAddress" class="card panel-item card-address">
        <div class="css-15x3obx">
          <div class="css-11qjisw">
            <span class="css-jef1j" style="display: initial;">Adresse de livraison</span>
          </div>
        </div>
        <div class="top-author">
          <div @click="showShippingAddress()" class="top-author--container">
            <div class="top-author--item">
              <img :src="require(`@/assets/img/domicile.png`)"/>
              <div style="margin-left: 7px;">
                <span style="font-weight: 500; color: #ff2a80;">Ajouter une adresse de livraison</span>
              </div>
              <div style="margin-right: 5px;">
                <span style="float: right;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: #ff2a80;width: 16px;height: 16px;">
                    <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
     


      <!-- service_point -->
      <div v-if="shippingMethod == 'service_point' && pointSelected" class="card panel-item" style="border-radius: 10px; box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px; margin: 20px 5px; border: none;">
        <div class="card-body parcelshop-card-body">
          <div v-if="pointSelected.carrier == 'chronopost'" class="card-title" style="font-weight: 500; margin-bottom: 3px;">
  					<img :src="require(`@/assets/img/shop2shop.png`)" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"/>
            Shop2Shop
          </div>
          <div v-else-if="pointSelected.carrier == 'mondial_relay'" class="card-title" style="font-weight: 500; margin-bottom: 3px;">
            <img :src="require(`@/assets/img/` + pointSelected.carrier + `.png`)" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"> 
            Mondial Relay
          </div>
          <div v-else class="card-title" style="font-weight: 500; margin-bottom: 3px;">
            <img :src="require(`@/assets/img/` + pointSelected.carrier + `.png`)" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"/>
            {{ pointSelected.carrier }}
          </div>
          <div class="card-text" style="font-weight: 400; line-height: 20px; font-size: 14px;">
            <div>{{ pointSelected.name }}</div>
            <div>{{ pointSelected.house_number }} {{ pointSelected.street }}</div>
            <div>{{ pointSelected.zip }} {{ pointSelected.city }}</div>
          </div>
        </div>
      </div>



			<!-- shipping method -->
      <div v-if="shippingAddress" class="top-author" style="border-radius: 10px; box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px; margin: 20px 5px; border: none;">
        <div class="css-15x3obx" style="padding-top: 10px; padding-bottom: 10px; text-align: center;">
          <div class="css-11qjisw">
            <span class="css-jef1j" style="display: initial;">Option de livraison</span>
          </div>
        </div>
        <div class="top-author--container" style="">
          <div @click="showRelayPopup()" class="top-author--item">
            <img v-if="pointSelected && pointSelected.carrier == 'chronopost'" :src="require(`@/assets/img/shop2shop.png`)" style="border-radius: 0px; height: 45px; width: 45px; margin-left: 5px;"/>
            <img v-else-if="pointSelected && pointSelected.carrier" :src="require(`@/assets/img/` + pointSelected.carrier + `.png`)" style="border-radius: 0px; height: 45px; width: 45px; margin-left: 5px;"/>
            <img v-else :src="require(`@/assets/img/mondial_relay.png`)" style="border-radius: 0px; height: 45px; width: 45px; margin-left: 5px;"/>
            <div>
              <span style="text-transform: capitalize;">Point relais</span>
            </div>
            <div style="margin-right: 5px;">
			        <div class="filter--choice">
			        	<div>
			        		<div class="gender--choice">
			        			<label>
			        				<span>
			        					<svg class="css-12qyrmm" viewBox="0 0 24 24" v-bind:style="isServicePoints">
			        						<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
			        					</svg>
			        					<svg v-if="shippingMethod == 'service_point'" class="svg--point" viewBox="0 0 24 24" style="fill: #18cea0">
			        						<path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
			        					</svg>
			        				</span>
			        			</label>
			        		</div>
			        	</div>
			        </div>
            </div>
          </div>
          <hr class="css-ss6lby" style="margin-bottom: 10px; margin-top: 10px;"/>
          <div @click="changeToAddress()" class="top-author--item">
            <img :src="require(`@/assets/img/domicile.png`)" style="border-radius: 0px; height: 45px; width: 45px; margin-left: 5px;"/>
            <div>
              <span style="text-transform: capitalize;">Domicile</span>
            </div>
            <div style="margin-right: 5px;">
			        <div class="filter--choice">
			        	<div>
			        		<div class="gender--choice">
			        			<label>
			        				<span>
			        					<svg class="css-12qyrmm" viewBox="0 0 24 24" v-bind:style="isDomicile">
			        						<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
			        					</svg>
			        					<svg v-if="shippingMethod == 'domicile'" class="svg--point" viewBox="0 0 24 24" style="fill: #18cea0">
			        						<path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
			        					</svg>
			        				</span>
			        			</label>
			        		</div>
			        	</div>
			        </div>
            </div>
          </div>
        </div>
      </div>

       
      <!-- payment -->
      <div @click="showPopupPayment()" class="card panel-item" style="border-radius: 10px; box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px; margin: 20px 5px; border: none;">
        <div class="css-15x3obx" style="padding-top: 10px; padding-bottom: 10px; text-align: center;">
          <div class="css-11qjisw">
            <span class="css-jef1j" style="display: initial;">Mode de paiement</span>
          </div>
        </div>
        <div class="card-body parcelshop-card-body" style="padding: 0px;margin-bottom: 5px;">
          <div class="top-author--container">
            <div class="top-author--item">
              <div>
                <span v-if="paymentType">{{ paymentType }}</span>
                <span v-else>Ajouter un mode de paiement</span>
                <div><span></span></div>
              </div>
              <div style="margin-right: 5px;">
                <span style="float: right;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187);width: 16px;height: 16px;">
                    <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div @click="payment()" class="div-payment">
      <div style="text-align: center;">
        <div class="btn-swipe">Payer</div>
      </div>
    </div>


    <!-- shipping to home -->
    <div v-if="popupShippingAddress" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 20px);">  
      <div class="checkout__header" style="padding: 5px 5px 15px; background: white; width: 100%;">
        <div @click="hideShippingAddress()" class="checkout__close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
        </div>
        <div class="checkout__title">Adresse de livraison</div>
      </div>
      <div class="checkout__body" style="overflow: scroll; padding: 18px 0px;">
        <div class="form--input--item" :class="{'form--input--item--error': errorName }">
          <fieldset>
            <legend>Nom et prénom</legend>
            <input type="text" v-model="name">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorPhone }">
          <fieldset>
            <legend>Téléphone</legend>
            <input type="text" v-model="phone" inputmode="decimal">
          </fieldset>
        </div>
        <div v-if="errorPhone" style="font-size: 13px;color: rgb(255, 0, 0);margin-bottom: 20px;margin-top: -15px;">Le format est incorrect</div>


        <div class="form--input--item" :class="{'form--input--item--error': errorAddress }">
          <fieldset>
            <legend>Adresse</legend>	
            <vue-google-autocomplete ref="address" id="map" :country="['fr', 'be', 'lu', 'ch']" @placechanged="getAddressData" @change="updateAddressData" @error="handleError" @inputChange="inputChangeAddressInput" @focus="focusAddressInput" @blur="blurAddressInput" type="text" v-model="address" placeholder="">
          	</vue-google-autocomplete>
          </fieldset>
        </div>
        
        <div class="form--input" style="grid-template-columns: 140px 1fr;">
          <div class="form--input--item" :class="{'form--input--item--error': errorZip }">
            <fieldset>
              <legend>Code postal</legend>
              <input type="text" v-model="zip" inputmode="numeric">
            </fieldset>
          </div>

          <div class="form--input--item" :class="{'form--input--item--error': errorCity }">
            <fieldset>
              <legend>Ville</legend>
              <input type="text" v-model="city">
            </fieldset>
          </div>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorCountry }">
          <fieldset>
            <legend>Pays</legend>
            <input @click="selectCountry()" type="text" v-model="country" readonly>
          </fieldset>
        </div>

        <div @click="saveShippingAddress()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 20px); margin: 0 auto; background: #ff2a80">Enregistrer</div>
      </div>
    </div>


    <!-- payment method -->
    <div v-if="popupPayment" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 20px);">  
      <div class="checkout__header" style="padding: 5px 5px 15px; background: white; width: 100%;">
        <div @click="hidePopupPayment()" class="checkout__close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
        </div>
        <div class="checkout__title">Mode de paiement</div>
      </div>
      <div class="checkout__body" style="overflow: scroll; padding: 18px 0px;">
        <div @click="savePayment('Apple Pay')" class="card panel-item card-payment">
          <div class="card-body parcelshop-card-body">
            <div>
	            <div class="top-author--item">
	              <div>
	                <span>Apple Pay</span>
	                <div><span></span></div>
	              </div>
	              <div style="margin-right: 5px;">
                  <span style="float: right;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187);width: 16px;height: 16px;">
                      <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
                    </svg>
                  </span>
                </div>
	            </div>
            </div>
          </div>
        </div>
        <div @click="savePayment('Carte bancaire')" class="card panel-item card-payment" style="">
          <div class="card-body parcelshop-card-body">
            <div>
	            <div class="top-author--item">
	              <div>
	                <span>Carte bancaire</span>
	                <div><span></span></div>
	              </div>
	              <div style="margin-right: 5px;">
                  <span style="float: right;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187);width: 16px;height: 16px;">
                      <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
                    </svg>
                  </span>
                </div>
	            </div>
            </div>
          </div>
        </div>
        <div @click="savePayment('Paypal')" class="card panel-item card-payment">
          <div class="card-body parcelshop-card-body">
            <div>
	            <div class="top-author--item">
	              <div>
	                <span>Paypal</span>
	                <div><span></span></div>
	              </div>
	              <div style="margin-right: 5px;">
                  <span style="float: right;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187);width: 16px;height: 16px;">
                      <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
                    </svg>
                  </span>
                </div>
	            </div>
            </div>
          </div>
        </div>
    	</div>
    </div>


    <!-- show relais -->
    <div v-if="popupRelay" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 20px);">  
      <div class="checkout__header" style="padding: 5px 5px 15px; background: white; width: 100%;">
        <div @click="hideRelay()" class="checkout__close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
        </div>
        <div class="checkout__title">Point relais</div>
      </div>
      <div class="checkout__body" style="padding: 18px 0px;">
		    <div class="images_filter">
		      <ul>
		        <li @click="showMap()" v-bind:class="{active: tabMap}"  :style="[tabMap ? {'color': '#ff2a80'} : {'color': '#525c66'}]">Carte </li>
		        <li @click="showList()" v-bind:class="{active: tabList}"  :style="[tabList ? {'color': '#ff2a80'} : {'color': '#525c66'}]">Liste des relais </li>
		      </ul>
		    </div>
		    <div v-if="tabMap">
    			<gmap-map v-if="points && locationMarkers.length > 0" :zoom="13" :center="center" :options="mapOptions" style="width:100%; height: calc(100vh - 390px); margin-top: 15px;">
	    			<gmap-marker :key="index" v-for="(m, index) in locationMarkers" :position="m.position" @click="updateMapSelected(m.position,index)"></gmap-marker>
    			</gmap-map>

	    		<div v-if="mapSelected">
            <div @click="showRelayInfoPopup(mapSelected)" class="card panel-item" style="border-radius: 10px;margin: 35px 5px 22px;border: none; box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px;">
              <div class="card-body parcelshop-card-body">
                <div class="card-title" style="font-weight: 500; margin-bottom: 4px;">
                  <div class="map-badge">Le plus proche</div>
                  <img v-if="mapSelected.carrier == 'chronopost'" :src="require(`@/assets/img/shop2shop.png`)" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"> 
                  <img v-else :src="require(`@/assets/img/` + mapSelected.carrier + `.png`)" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"> 
                  {{ mapSelected.name }} 
                </div>
                <div class="card-text" style="font-weight: 400; font-size: 14px; line-height: 20px;">
                  <div>{{ mapSelected.house_number }} {{ mapSelected.street }}</div>
                  <div>{{ mapSelected.zip }} {{ mapSelected.city }}</div>
                </div>
                <span v-if="shippingProducts && shippingProducts.service_point && service.carrier == mapSelected.carrier" v-for="service in shippingProducts.service_point" style="color: #000;float: right;margin-right: 5px;margin-top: -50px;font-weight: 400;">{{ service.price | formatPrice }}€</span>
              </div>
            </div>
		    		<div @click="saveRelay(mapSelected)" style="text-align: center;">
		    			<div class="btn-swipe">Selectionner</div>
		    		</div>
	    		</div>
		    </div>
		    <div v-if="tabList">
          <div v-if="points" v-for="(point, index) in points" class="card panel-item" style="border-radius: 10px;margin: 15px 5px;border: none;box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;">
            <div @click="showRelayInfoPopup(point)" class="card-body parcelshop-card-body">
              <div class="card-title" style="font-weight: 500; margin-bottom: 4px;">
                <img v-if="point.carrier == 'chronopost'" :src="require(`@/assets/img/shop2shop.png`)" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"> 
                <img v-else :src="require(`@/assets/img/` + point.carrier + `.png`)" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"> 
                {{ point.name }} 
              </div>
              <div class="card-text" style="font-weight: 400; font-size: 14px; line-height: 20px;">
                <div>{{ point.house_number }} {{ point.street }}</div>
                <div>{{ point.zip }} {{ point.city }}</div>
                <div v-if="point.distance > 1000" style="text-transform: lowercase;color: #ff2a80;font-size: 13px;margin-top: 3px;"> {{ (point.distance / 1000).toFixed(2).replace(".", ",") }}km</div>
                <div v-else style="text-transform: lowercase;color: #ff2a80;font-size: 13px;margin-top: 3px;"> {{ point.distance }}m</div>
              </div>
              <span v-if="shippingProducts && shippingProducts.service_point && service.carrier == point.carrier" v-for="service in shippingProducts.service_point" style="float: right;margin-top: -52px;font-weight: 400;font-size: 14px;">
                {{ service.price | formatPrice }}€
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187);width: 16px;height: 16px;margin-left: 7px;margin-bottom: 3px;">
                  <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z">
                  </path>
                </svg>
              </span>
            </div>
          </div>
		    </div>
      </div>
    </div>


    <!-- select relais -->
    <div v-if="popupRelayInfo" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 20px);">  <div class="checkout__header" style="padding: 5px 5px 15px; background: white; width: 100%;">
        <div @click="hideRelayInfo()" class="checkout__close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
        </div>
        <div class="checkout__title">Informations</div>
      </div>
      <div class="checkout__body" style="padding: 18px 0px;">
      	<div class="card panel-item" style="border: none;">
          <div class="card-body parcelshop-card-body" style="padding: 5px;">
            <div v-if="point.carrier == 'chronopost'" class="card-title card-relayinfo">
              <img :src="require(`@/assets/img/shop2shop.png`)"> 
              Shop2Shop
            </div>
            <div v-else-if="point.carrier == 'mondial_relay'" class="card-title card-relayinfo">
              <img :src="require(`@/assets/img/` + point.carrier + `.png`)"> 
              Mondial Relay
            </div>
            <div v-else class="card-title card-relayinfo">
              <img :src="require(`@/assets/img/` + point.carrier + `.png`)"> 
              {{ point.carrier }}
            </div>
            <div class="card-text">
              <div style="font-weight: 600;font-size: 20px;margin-bottom: 7px;"> {{ point.name }}</div>
              <div>{{ point.house_number }} {{ point.street }}</div>
              <div>{{ point.zip }} {{ point.city }}</div>
            </div>
          </div>
          <div v-if="point.formatted_opening_times[0].length !== 0 || point.formatted_opening_times[1].length !== 0 || point.formatted_opening_times[2].length !== 0 || point.formatted_opening_times[3].length !== 0 || point.formatted_opening_times[4].length !== 0 || point.formatted_opening_times[5].length !== 0 || point.formatted_opening_times[6].length !== 0">
            <hr>
            <div style="text-transform: capitalize;line-height: 40px;">
              <div v-if="point.formatted_opening_times[0].length" class="opening-times">
                <div> Lundi</div>
                <div v-if="point.formatted_opening_times[0].length > 1" class="hour">{{ point.formatted_opening_times[0][0] }}, {{ point.formatted_opening_times[0][1] }}</div>
                <div v-else class="hour">{{ point.formatted_opening_times[0][0] }}</div>
              </div>
              <div v-if="point.formatted_opening_times[1].length" class="opening-times">
                <div> Mardi</div>
                <div v-if="point.formatted_opening_times[1].length > 1" class="hour">{{ point.formatted_opening_times[1][0] }}, {{ point.formatted_opening_times[1][1] }}</div>
                <div v-else class="hour">{{ point.formatted_opening_times[1][0] }}</div>
              </div>
              <div v-if="point.formatted_opening_times[2].length" class="opening-times">
                <div> Mercredi</div>
                <div v-if="point.formatted_opening_times[2].length > 1" class="hour">{{ point.formatted_opening_times[2][0] }}, {{ point.formatted_opening_times[2][1] }}</div>
                <div v-else class="hour">{{ point.formatted_opening_times[2][0] }}</div>
              </div>
              <div v-if="point.formatted_opening_times[3].length" class="opening-times">
                <div> Jeudi</div>
                <div v-if="point.formatted_opening_times[3].length > 1" class="hour">{{ point.formatted_opening_times[3][0] }}, {{ point.formatted_opening_times[3][1] }}</div>
                <div v-else class="hour">{{ point.formatted_opening_times[3][0] }}</div>
              </div>
              <div v-if="point.formatted_opening_times[4].length" class="opening-times">
                <div> Vendredi</div>
                <div v-if="point.formatted_opening_times[4].length > 1" class="hour">{{ point.formatted_opening_times[4][0] }}, {{ point.formatted_opening_times[4][1] }}</div>
                <div v-else class="hour">{{ point.formatted_opening_times[4][0] }}</div>
              </div>
              <div v-if="point.formatted_opening_times[5].length" class="opening-times">
                <div> Samedi</div>
                <div v-if="point.formatted_opening_times[5].length > 1" class="hour">{{ point.formatted_opening_times[5][0] }}, {{ point.formatted_opening_times[5][1] }}</div>
                <div v-else class="hour">{{ point.formatted_opening_times[5][0] }}</div>
              </div>
              <div v-if="point.formatted_opening_times[6].length" class="opening-times">
                <div> Dimanche</div>
                <div v-if="point.formatted_opening_times[6].length > 1" class="hour">{{ point.formatted_opening_times[6][0] }}, {{ point.formatted_opening_times[6][1] }}</div>
                <div v-else class="hour">{{ point.formatted_opening_times[6][0] }}</div>
              </div>
            </div>
            <hr> 
            <div style="font-weight: 400;padding: 5px;text-align: center;">Les horaires d'ouverture peuvent différer.</div>
          </div>
      	</div>
        <div @click="saveRelay(point)" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 20px); position: absolute; bottom: 45px; margin: 0 auto; background: #ff2a80">Selectionner</div>
      </div>
    </div>
  </main>
</template>



<style scoped src="../assets/css/checkout.css"></style>
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

import VueGoogleAutocomplete from "vue-google-autocomplete";


export default {
  name: 'Checkout',
  props: ['lineItems'],
  components: { VueGoogleAutocomplete },
  data() {
    return {
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      sendcloud_pk: window.localStorage.getItem("sendcloud_pk"),
      user: JSON.parse(window.localStorage.getItem("user")),
      carriers: [],
      subTotal: null,
      shippingPrice: null,
      shippingMethodId: null,
      shippingName: null,
      shippingCarrier: null,
      total: null,
      shippingAddress: false,
      tabMap: true,
      tabList: false,
      popupPayment: false,
      popupShippingAddress: false,
      popupRelay: false,
      popupRelayInfo: false,
      errorName: false,
      errorAddress: false,
      errorZip: false,
      errorCity: false,
      errorCountry: false,
      errorPhone: false,
      name: null,
      phone: null,
      address: null,
      zip: null,
      city: null,
      country: null,
      countryShort: null,
      points: null,
      point: null,
      pointSelected: null,
      shippingMethod: null,
      mapSelected: null,
      center: null,
      showAutocomplete: false,
      paymentType: null,
      shippingProducts: null,
      locationMarkers: [],
      mapOptions: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        clickableIcons: false
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
  
    if (this.lineItems.length) {
      this.lineItems.map(lineItem => {
        if (lineItem.variant) {
          this.subTotal += lineItem.variant.price * lineItem.quantity;
        } else {
          this.subTotal += lineItem.product.price * lineItem.quantity;
        }
      });

      this.subTotal = this.subTotal.toFixed(2);
      this.total = this.subTotal;
    }

    this.name = this.user.firstname + ' ' + this.user.lastname;

    if (this.user && this.user.shippingAddresses.length) {
    	this.name = this.user.shippingAddresses[0].name;
    	this.phone = this.user.shippingAddresses[0].phone;
    	this.address = this.user.shippingAddresses[0].houseNumber + " " + this.user.shippingAddresses[0].address;
    	this.zip = this.user.shippingAddresses[0].zip;
    	this.city = this.user.shippingAddresses[0].city;
    	this.country = this.user.shippingAddresses[0].country;
    	this.countryShort = this.user.shippingAddresses[0].countryCode;

      var marker = {
        lat: parseFloat(this.user.shippingAddresses[0].latitude),
        lng: parseFloat(this.user.shippingAddresses[0].longitude)
      };

      this.center = marker;
      this.shippingAddress = true;
    	this.getShippingPrice();
    }
  },
	computed: {
		isServicePoints() {
			return this.shippingMethod == "service_point" ? 'fill: #18cea0' : '';
		},
		isDomicile() {
			return this.shippingMethod == "domicile" ? 'fill: #18cea0' : '';
		}
	},
  methods: {
    showShippingAddress() {
    	if (document.getElementsByClassName('pac-container').length) {
	    	document.getElementsByClassName('pac-container')[0].remove();
    	}
      this.popupShippingAddress = true;
    },
    hideShippingAddress() {
      this.popupShippingAddress = false;
    },
    saveShippingAddress() {
      this.errorName = false;
      this.errorAddress = false;
      this.errorZip = false;
      this.errorCity = false;
      this.errorCountry = false;
      this.errorPhone = false;

      if (!this.name) {
        this.errorName = true;
      }

      if (this.phone) {
        if (!this.checkPhone(this.phone)) {
          this.errorPhone = true;
        } else {
          this.phone = this.phone.replace(/\s/g, '');
          console.log(this.phone);
        }
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

    	switch (this.country) {
    		case "France":
			    this.countryShort = "FR";
	    		break;
	    	case "Belgique":
			    this.countryShort = "BE";
	    		break;
	    	case "Suisse":
			    this.countryShort = "CH";
	    		break;
	    	case "Luxembourg":
			    this.countryShort = "LU";
	    		break;
			  default:
			    this.countryShort = null;
        	this.errorCountry = true;
    	}

      if (!this.errorName && !this.errorAddress && !this.errorZip && !this.errorCity && !this.errorCountry && !this.errorPhone) {
        this.popupShippingAddress = false;
        this.shippingAddress = true;
        this.getShippingPrice();

        var houseNumber = this.address.split(' ', 1)[0];
        var street = this.address.split(houseNumber)[1].trim();
        var httpParams = { "address": street, "houseNumber": houseNumber, "city": this.city, "zip": this.zip, "country": this.country, "countryCode": this.countryShort, "phone": this.phone, "name": this.name, "longitude": this.center.lng.toString(), "latitude": this.center.lat.toString() };

        if (this.user.shippingAddresses.length > 0) {
        	var url = this.baseUrl + "/user/api/shipping/address/edit/" + this.user.shippingAddresses[0].id;
        } else {
        	var url = this.baseUrl + "/user/api/shipping/address";
        }

        window.cordova.plugin.http.post(url, httpParams, { Authorization: "Bearer " + this.token }, (response) => {
          console.log(response);
        }, (response) => {
          console.log(response);
        });
      }
    },
    getShippingPrice() {
      window.cordova.plugin.http.post(this.baseUrl + "/user/api/shipping/price", { "lineItems": this.lineItems, "countryShort": this.countryShort }, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(JSON.parse(response.data));
        this.shippingProducts = JSON.parse(response.data);
      }, (response) => {
        console.log(response.error);
      });
    },
    showRelayPopup() {
    	if (this.countryShort) {
	      this.popupRelay = true;
	    	this.shippingMethod = "service_point";
	      this.tabMap = true;
	      this.tabList = false;
	      this.locationMarkers = [];
	      this.mapSelected = null;

	      console.log(this.center);
	      window.cordova.plugin.http.setDataSerializer('json');
	      window.cordova.plugin.http.get("https://servicepoints.sendcloud.sc/api/v2/service-points", { "access_token": this.sendcloud_pk, "country": this.countryShort.toString(), "latitude": this.center.lat.toString(), "longitude": this.center.lng.toString(), "carrier": "mondial_relay,chronopost", "radius": "20000" }, {}, (response) => {
	        this.points = JSON.parse(response.data);
	        this.points.map((point, index) => {
            let parts = point.street.split(" ");
            let number = 0;
            let street = "";

            for (let i = 0; i < parts.length; i++) {
              let part = parts[i];
              if (isNaN(part)) {
                street += part + " ";
              } else {
                number = parseInt(part);
              }
            }

            street = street.trim();
            point.street = street;
            point.house_number = number;

		        var marker = {
		          lat: parseFloat(point.latitude),
		          lng: parseFloat(point.longitude)
		        };

	        	this.locationMarkers.push({ position: marker });

	        	if (!this.mapSelected) {
			        this.mapSelected = point;
	        	}
	        });
	      }, function(response) {
	        console.log(response.error);
	      });
    	}
    },
    hideRelay() {
      this.popupRelay = false;

      if (!this.pointSelected) {
    		this.shippingMethod = null;
      }
    },
    saveRelay(point) {
    	this.pointSelected = point;
      this.popupRelay = false;
      this.popupRelayInfo = false;

      this.shippingProducts.service_point.map((method) => {
      	if (method.carrier == point.carrier) {
      		if (this.shippingPrice) {
	      		this.total = (parseFloat(this.total) - parseFloat(this.shippingPrice)).toFixed(2);
      		}
      		this.shippingPrice = method.price;
      		this.shippingMethodId = method.id;
      		this.shippingName = method.name;
      		this.shippingCarrier = method.carrier;
		      this.total = (parseFloat(this.total) + parseFloat(this.shippingPrice)).toFixed(2).toString();
      	}
      });
    },
    showRelayInfoPopup(point) {
    	this.point = point;
      this.popupRelayInfo = true;
    },
    hideRelayInfo() {
      this.popupRelayInfo = false;
    },
    saveRelayInfo() {
      this.popupRelayInfo = false;
    },
    showPopupPayment() {
    	this.popupPayment = true;
    },
    hidePopupPayment() {
    	this.popupPayment = false;
    },
    savePayment(paymentType) {
    	this.paymentType = paymentType;
    	this.popupPayment = false;
    },
    showMap() {
      this.tabMap = true;
      this.tabList = false;
    },
    showList() {
      this.tabMap = false;
      this.tabList = true;
    },
    goBack() {
      this.$emit('hideCheckout');
    },
    payment() {
      console.log(this.lineItems);
      if (this.shippingMethodId && this.shippingName && this.shippingCarrier && this.shippingPrice) {
  	    window.cordova.plugin.http.post(this.baseUrl + "/user/api/orders/payment/success", { "lineItems": this.lineItems, "shippingName": this.shippingName, "shippingMethodId": this.shippingMethodId, "shippingCarrier": this.shippingCarrier, "shippingPrice": this.shippingPrice, "servicePointId": this.pointSelected ? this.pointSelected.id : null }, { Authorization: "Bearer " + this.token }, (response) => {
          console.log(JSON.parse(response.data));
          this.$emit('paymentSuccess', JSON.parse(response.data));
  	    }, (response) => {
  	      console.log(response.error);
          
          window.plugins.toast.show(response.error, 'long', 'top', function(a){
            console.log('toast success: ' + a);
          }, function(b){
            console.log('toast error: ' + b);
          });
  	    });
      }
    },
    changeToAddress() {
    	this.shippingMethod = "domicile";
      this.pointSelected = null;
      this.shippingMethodId = this.shippingProducts.domicile[0].id;
      this.shippingName = this.shippingProducts.domicile[0].name;

  		if (this.shippingPrice) {
    		this.total = (parseFloat(this.total) - parseFloat(this.shippingPrice)).toFixed(2);
  		}

      this.shippingPrice = this.shippingProducts.domicile[0].price;
  		this.shippingCarrier = this.shippingProducts.domicile[0].carrier;
      this.total = (parseFloat(this.total) + parseFloat(this.shippingPrice)).toFixed(2).toString();
    },
    updateMapSelected(position, index) {
      var marker = {
        lat: position.lat,
        lng: position.lng
      };
      this.mapSelected = this.points[index];
      this.center = marker;
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
    	console.log(addressData, placeResultData, id);
    	
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

      var marker = {
        lat: addressData.latitude,
        lng: addressData.longitude
      };
      this.center = marker;
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
    			{description: "Suisse"},
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

