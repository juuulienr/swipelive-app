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
        <div v-for="(lineItem, index) in lineItems" :key="index" class="checkout__row checkout__product-info-row">
          <div class="checkout__product-info">
            <img v-if="lineItem.product.uploads" :src="$cloudinary256x256 + lineItem.product.uploads[0].filename" class="checkout__image"/>
            <img v-else src="/img/no-preview.png" class="checkout__image"/>
            <span class="counter-badge">{{ lineItem.quantity }}</span>
            <div style="padding-right: 30px;">   
              <h5 class="checkout__name" style="margin-bottom: 0px;"> {{ lineItem.product.title }} </h5>
              <div v-if="lineItem.variant" class="checkout__attr">
                <span>{{ lineItem.variant.title }}</span>
              </div>
            </div>
          </div>
          <div class="product--quantity--detail">
            <span v-if="lineItem.variant" style="font-size: 14px; font-weight: 400;">{{ $formatPrice(lineItem.variant.price * lineItem.quantity) }}€</span>
            <span v-else style="font-size: 14px; font-weight: 400;">{{ $formatPrice(lineItem.product.price * lineItem.quantity) }}€</span>
          </div>
        </div>
        <hr class="css-ss6lby" style="margin-bottom: 5px; margin-top: 5px; border-style: dashed;"/>
        <div class="css-18mhetb">
          <div class="css-ikzlcq">
            <div class="css-9jay18">
              <p class="css-11r9ii4">Sous-total</p>
              <h6 class="css-yemnbq">{{ $formatPrice(subTotal) }}€</h6>
            </div>
            <div v-if="promotion && promotionAmount" class="css-9jay18">
              <p class="css-11r9ii4" style="color: #18cea0; font-weight: 500;">{{ promotion.title }}</p>
              <h6 class="css-yemnbq" style="color: #18cea0; font-weight: 500;">-{{ $formatPrice(promotionAmount) }}€</h6>
            </div>
            <div class="css-9jay18">
              <p class="css-11r9ii4">Livraison</p>
              <h6 v-if="shippingPrice" class="css-yemnbq">{{ $formatPrice(shippingPrice) }}€</h6>
              <h6 v-else class="css-yemnbq">-</h6>
            </div>
            <hr class="css-ss6lby" style="margin-bottom: 10px; margin-top: 5px;"/>
            <div class="css-9jay18">
              <h6 class="css-k9tjo5">Total</h6>
              <div class="css-s2uf1z">
                <h6 class="css-kdhaao">{{ $formatPrice(total) }}€</h6>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- domicile -->
      <div v-if="shippingAddress && shippingMethod != 'service_point'" class="card panel-item card-address">
        <div @click="showShippingAddress()" class="card-body parcelshop-card-body">
          <div class="card-title">
            <img src="/img/domicile.png"/>
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
              <img src="/img/domicile.png"/>
              <div style="margin-left: 7px;">
                <span style="font-weight: 500; color: #ff2f80;">Ajouter une adresse de livraison</span>
              </div>
              <div style="margin-right: 5px;">
                <span style="float: right;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: #ff2f80;width: 16px;height: 16px;">
                    <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
     


      <!-- service_point -->
      <div v-if="shippingMethod == 'service_point' && pointSelected" class="card panel-item" style="border-radius: 10px; border: 1px solid rgb(221, 221, 221) !important; margin: 20px 5px;">
        <div class="card-body parcelshop-card-body">
          <div class="card-title" style="font-weight: 500; margin-bottom: 3px;">
            <div v-if="pointSelected.carrier_id == 'd8585c1d-eb67-4dae-be3e-8ffd8c54d7f3'">
              <img src="/img/shop2shop.png" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"/>
              <span>Shop2Shop</span>
            </div>
            <div v-else>
              <img src="/img/mondial_relay.png" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"> 
              <span>Mondial Relay</span>
            </div>
          </div>
          <div class="card-text" style="font-weight: 400; line-height: 20px; font-size: 14px;">
            <div style="text-transform: uppercase;">{{ pointSelected.name }}</div>
            <div style="text-transform: uppercase;">{{ pointSelected.address1 }}</div>
            <div style="text-transform: uppercase;">{{ pointSelected.zip }} {{ pointSelected.city }}</div>
          </div>
        </div>
      </div>


			<!-- shipping method -->
      <div v-if="shippingAddress" class="top-author" style="border-radius: 10px; border: 1px solid rgb(221, 221, 221) !important; margin: 20px 5px;">
        <div class="css-15x3obx" style="padding-top: 10px; padding-bottom: 10px; text-align: center;">
          <div class="css-11qjisw">
            <span class="css-jef1j" style="display: initial;">Option de livraison</span>
          </div>
        </div>
        <div class="top-author--container" style="">
          <div @click="showRelayPopup()" class="top-author--item">
            <img v-if="pointSelected && pointSelected.carrier == 'chronopost'" src="/img/shop2shop.png" style="border-radius: 0px; height: 45px; width: 45px; margin-left: 5px;"/>
            <img v-else-if="pointSelected && pointSelected.carrier" :src="`/img/${pointSelected.carrier}.png`" style="border-radius: 0px; height: 45px; width: 45px; margin-left: 5px;"/>
            <img v-else src="/img/mondial_relay.png" style="border-radius: 0px; height: 45px; width: 45px; margin-left: 5px;"/>
            <div>
              <span style="text-transform: capitalize;">Point relais</span>
            </div>
            <div style="margin-right: 5px;">
			        <div v-if="!loadingShipping && shippingProducts && shippingProducts.service_point" class="filter--choice">
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
            <img src="/img/domicile.png" style="border-radius: 0px; height: 45px; width: 45px; margin-left: 5px;"/>
            <div>
              <span style="text-transform: capitalize;">Domicile</span>
            </div>
            <div style="margin-right: 5px;">
			        <div v-if="!loadingShipping && shippingProducts && shippingProducts.domicile.length" class="filter--choice">
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
    </div>


    <div class="div-payment">
      <div @click="payment()" class="btn-swipe" style="text-align: center;">
        <span v-if="loadingPayment">
          <svg viewBox="25 25 50 50" class="loading">
            <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
          </svg>
        </span>
        <span v-else>Paiement</span>
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
            <input id="address-input" type="text" v-model="address" placeholder="Saisissez une adresse" @focus="initAutocomplete">
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
            <input type="text" v-model="country">
          </fieldset>
        </div>


        <div @click="saveShippingAddress()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 20px); margin: 0 auto; background: #ff2f80">
          <span v-if="loadingAddress">
            <svg viewBox="25 25 50 50" class="loading">
              <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
            </svg>
          </span>
          <span v-else>Enregistrer</span>
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
		        <li @click="showMap()" v-bind:class="{active: tabMap}"  :style="[tabMap ? {'color': '#ff2f80'} : {'color': '#525c66'}]">Carte </li>
		        <li @click="showList()" v-bind:class="{active: tabList}"  :style="[tabList ? {'color': '#ff2f80'} : {'color': '#525c66'}]">Liste des relais </li>
		      </ul>
		    </div>
		    <div v-if="tabMap">
          <GoogleMap 
            v-if="locationMarkers.length > 0"  
            api-key="AIzaSyBrLhSgilRrPKpGtAPbbzcaIp-5L5VgE_w"
            map-id="5227ff347d2cffb0"
            :zoom="15"
            :center="center"
            zoom-control
            :map-type-control="false"
            :scale-control="false"
            :street-view-control="false"
            :rotate-control="false"
            :fullscreen-control="false"
            :disable-default-ui="false"
            :clickable-icons="false"
            style="width:100%; height: calc(100vh - 390px); margin-top: 15px; border-radius: 12px; overflow: hidden;" 
          >
           <AdvancedMarker
              v-for="(marker, index) in locationMarkers"
              :key="index"
              :options="{ position: marker.position }"
              @click="updateMapSelected(marker.position,index)"
            />
          </GoogleMap>
          <div v-else>
            <div class="loader2">
              <span></span>
            </div>
          </div>

	    		<div v-if="mapSelected">
            <div @click="showRelayInfoPopup(mapSelected)" class="card panel-item" style="border-radius: 10px; margin: 35px 5px 22px; border: none; border: 1px solid rgb(221, 221, 221) !important;">
              <div class="card-body parcelshop-card-body">
                <div class="card-title" style="font-weight: 500; margin-bottom: 4px; text-transform: uppercase;">
                  <div class="map-badge">Le plus proche</div>
                  <img v-if="mapSelected.carrier_id && mapSelected.carrier_id == 'd8585c1d-eb67-4dae-be3e-8ffd8c54d7f3'" src="/img/shop2shop.png" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;">
                  <img v-else src="/img/mondial_relay.png" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;">
                  {{ mapSelected.name }}
                </div>
                <div class="card-text" style="font-weight: 400; font-size: 14px; line-height: 20px;">
                  <div style="text-transform: uppercase;">{{ mapSelected.address1 }}</div>
                  <div style="text-transform: uppercase;">{{ mapSelected.zip }} {{ mapSelected.city }}</div>
                </div>
                <template v-if="shippingProducts && shippingProducts.service_point">
                  <template v-for="service in shippingProducts.service_point" :key="service.carrier_id">
                    <span v-if="service.carrier_id == mapSelected.carrier_id" style="color: #000; float: right; margin-right: 5px; margin-top: -50px; font-weight: 400;">
                      {{ $formatPrice(service.price) }}€
                    </span>
                  </template>
                </template>
              </div>
            </div>
		    		<div @click="saveRelay(mapSelected)" style="text-align: center;">
		    			<div class="btn-swipe">Selectionner</div>
		    		</div>
	    		</div>
		    </div>
		    <div v-if="tabList">
          <template v-if="points">
            <div v-for="(point, index) in points" :key="point.id" class="card panel-item" style="border-radius: 10px; margin: 15px 5px; border: 1px solid #ddd!important;">
              <div @click="showRelayInfoPopup(point)" class="card-body parcelshop-card-body">
                <div class="card-title" style="font-weight: 500; margin-bottom: 4px; text-transform: uppercase;">
                  <img v-if="point.carrier_id == 'd8585c1d-eb67-4dae-be3e-8ffd8c54d7f3'" src="/img/shop2shop.png" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;">
                  <img v-else src="/img/mondial_relay.png" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;">
                  {{ point.name }}
                </div>
                <div class="card-text" style="font-weight: 400; font-size: 14px; line-height: 20px;">
                  <div style="text-transform: uppercase;">{{ point.address1 }}</div>
                  <div style="text-transform: uppercase;">{{ point.zip }} {{ point.city }}</div>
                  <div v-if="point.distance > 1000" style="text-transform: lowercase; color: #ff2f80; font-size: 13px; margin-top: 3px;">
                    {{ (point.distance / 1000).toFixed(2).replace('.', ',') }}km
                  </div>
                  <div v-else style="text-transform: lowercase; color: #ff2f80; font-size: 13px; margin-top: 3px;">
                    {{ point.distance }}m
                  </div>
                </div>
                <template v-if="shippingProducts && shippingProducts.service_point">
                  <template v-for="service in shippingProducts.service_point" :key="service.carrier_id">
                    <span v-if="service.carrier_id == point.carrier_id" style="float: right; margin-top: -52px; font-weight: 400; font-size: 14px;">
                      {{ $formatPrice(service.price) }}€
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 16px; height: 16px; margin-left: 7px; margin-bottom: 3px;">
                        <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
                      </svg>
                    </span>
                  </template>
                </template>
              </div>
            </div>
          </template>
		    </div>
      </div>
    </div>


    <!-- select relais -->
    <div v-if="popupRelayInfo" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 20px);">  
      <div class="checkout__header" style="padding: 5px 5px 15px; background: white; width: 100%;">
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
            <div v-if="point.carrier_id == 'd8585c1d-eb67-4dae-be3e-8ffd8c54d7f3'" class="card-title card-relayinfo">
              <img src="/img/shop2shop.png"> Shop2Shop
            </div>
            <div v-else-if="point.carrier_id == 'b139ac1f-bbb9-4235-b87e-aedcb3c32132'" class="card-title card-relayinfo">
              <img src="/img/mondial_relay.png"> Mondial Relay
            </div>
            <div v-else class="card-title card-relayinfo">
              {{ point.service_name }}
            </div>
            <div class="card-text">
              <div style="font-weight: 600;font-size: 20px;margin-bottom: 7px;"> {{ point.name }}</div>
              <div style="text-transform: uppercase;">{{ point.address1 }}</div>
              <div style="text-transform: uppercase;">{{ point.zip }} {{ point.city }}</div>
            </div>
          </div>
          <div v-if="point.hours.length">
            <hr>
            <div style="text-transform: capitalize;line-height: 40px;">
              <div v-for="(hour, index) in point.hours" class="opening-times">
                <div v-if="hour.day == 1">Lundi</div>
                <div v-else-if="hour.day == 2">Mardi</div>
                <div v-else-if="hour.day == 3">Mercredi</div>
                <div v-else-if="hour.day == 4">Jeudi</div>
                <div v-else-if="hour.day == 5">Vendredi</div>
                <div v-else-if="hour.day == 6">Samedi</div>
                <div v-else>Dimanche</div>
                <div class="hour">{{ hour.opening_hours }}</div>
              </div>
            </div>
            <hr> 
            <div style="font-weight: 400;padding: 5px;text-align: center;">Les horaires d'ouverture peuvent différer.</div>
          </div>
      	</div>
        <div @click="saveRelay(point)" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 20px); position: absolute; bottom: 45px; margin: 0 auto; background: #ff2f80">Selectionner</div>
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

.pac-container {
	box-shadow: 0 6px 19px 0 #d9d9d9 !important;
	border-top: none !important;
	border-radius: 7px !important;
	padding: 7px 3px !important;
  z-index: 1000000000000000;
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

</style>

<script>

import { GoogleMap, AdvancedMarker } from "vue3-google-map";
import { useMainStore } from '../stores/useMainStore.js';
import { Stripe } from '@swipelive/capacitor-stripe';
import { toRaw } from 'vue';

export default {
  name: 'Checkout',
  components: { 
    GoogleMap,
    AdvancedMarker,
  },
  data() {
    const mainStore = useMainStore();

    return {
      lineItems: mainStore.getLineItems,
      shippingProducts: mainStore.getShippingProducts,
      fullscreen: this.$route.params.fullscreen,
      user: mainStore.getUser,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      googleApiKey: 'AIzaSyBrLhSgilRrPKpGtAPbbzcaIp-5L5VgE_w',
      carriers: [],
      promotion: null,
      promotionAmount: null,
      subTotal: null,
      total: null,
      identifier: null,
      shippingPrice: null,
      shippingCarrierId: null,
      shippingCarrierName: null,
      shippingServiceId: null,
      shippingServiceName: null,
      shippingServiceCode: null,
      expectedDelivery: null,
      currency: null,
      shippingAddress: false,
      tabMap: true,
      tabList: false,
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
      locationMarkers: [],
      loadingShipping: true,
      loadingPayment: false,
      loadingAddress: false,
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
  async created() {
    if (this.$Capacitor.getPlatform() === "ios") {
      await this.$StatusBar.setStyle({ style: this.$Style.Default });
      await this.$StatusBar.setOverlaysWebView({ overlay: false });
      await this.$StatusBar.setBackgroundColor({ color: '#ffffff' });
    }

    if (this.$Capacitor.getPlatform() === "android") {
      await this.$StatusBar.setStyle({ style: this.$Style.Light });
      await this.$StatusBar.setOverlaysWebView({ overlay: false });
      await this.$StatusBar.setBackgroundColor({ color: '#ffffff' });
    }

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

      if (this.lineItems[0].vendor) {
        try {
          const response = await this.$CapacitorHttp.request({
            method: 'GET',
            url: `${this.baseUrl}/user/api/promotions/active/${this.lineItems[0].product.id}`,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });

          this.promotion = response.data;
          console.log(this.promotion);

          if (this.promotion) {
            if (this.promotion.type === "percent") {
              this.promotionAmount = this.subTotal * (this.promotion.value / 100);
            } else {
              this.promotionAmount = this.promotion.value;
            }

            this.total = (
              parseFloat(this.subTotal) - parseFloat(this.promotionAmount)
            ).toFixed(2);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    this.name = this.user.firstname + ' ' + this.user.lastname;

    if (this.user.phone) {
      this.phone = this.user.phone;
    }

    if (this.user.shippingAddresses.length) {
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

      console.log(this.shippingProducts);
      if (this.shippingProducts.length == 0) {
        this.getShippingPrice();
      } else {
        this.loadingShipping = false;
      }
    }
  },
	computed: {
		isServicePoints() {
			return this.shippingMethod == "service_point" ? 'fill: #18cea0' : '';
		},
		isDomicile() {
			return this.shippingMethod == "domicile" ? 'fill: #18cea0' : '';
    },
	},
  watch: {
    popupShippingAddress(newVal) {
      if (newVal) {
        this.loadGoogleMapsScript().then(() => {
          this.initAutocomplete();
        }).catch((error) => {
          console.error("Erreur de chargement de Google Maps : ", error);
        });
      }
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
    async saveShippingAddress() {
      const mainStore = useMainStore();
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
        this.loadingAddress = true;
        this.shippingAddress = true;

        var houseNumber = this.address.split(' ', 1)[0];
        var street = this.address.split(houseNumber)[1].trim();
        var httpParams = { "address": street, "houseNumber": houseNumber, "city": this.city, "zip": this.zip, "country": this.country, "countryCode": this.countryShort, "phone": this.phone, "name": this.name, "longitude": this.center.lng.toString(), "latitude": this.center.lat.toString() };

        if (this.user.shippingAddresses.length > 0) {
        	var url = this.baseUrl + "/user/api/shipping/address/edit/" + this.user.shippingAddresses[0].id;
        } else {
        	var url = this.baseUrl + "/user/api/shipping/address";
        }

        try {
          const response = await this.$CapacitorHttp.request({
            method: 'POST',
            url: url,
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
            },
            data: httpParams,
          });

          this.user = response.data;
          mainStore.setUser(mainStore.user);
          this.getShippingPrice();
          console.log(response);
        } catch (error) {
          console.log(error);
          this.popupShippingAddress = false;
          this.loadingAddress = false;
        }
      }
    },
    async getShippingPrice() {
      try {
        const serializableLineItems = this.lineItems.map(item => {
          const rawItem = toRaw(item);
          return {
            vendor: rawItem.vendor,
            product: rawItem.product ? { id: rawItem.product.id, weight: rawItem.product.weight, weightUnit: rawItem.product.weightUnit } : null,
            variant: rawItem.variant ? { id: rawItem.variant.id, weight: rawItem.variant.weight, weightUnit: rawItem.variant.weightUnit } : null,
            quantity: rawItem.quantity,
          };
        });

        const response = await this.$CapacitorHttp.request({
          method: 'POST',
          url: `${this.baseUrl}/user/api/shipping/price`,
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          data: { lineItems: serializableLineItems },
        });

        this.shippingProducts = response.data;
        this.loadingShipping = false;
        this.popupShippingAddress = false;
        this.loadingAddress = false;
      } catch (error) {
        console.log(error);
        await this.$Toast.show({
          text: error.message || 'Une erreur est survenue',
          duration: 'long',
          position: 'top',
        });

        this.loadingShipping = false;
        this.popupShippingAddress = false;
        this.loadingAddress = false;
      }
    },
    async showRelayPopup() {
      if (this.countryShort && !this.loadingShipping && this.shippingProducts && this.shippingProducts.service_point) {
        this.popupRelay = true;
        this.shippingMethod = "service_point";
        this.tabMap = true;
        this.tabList = false;
        this.locationMarkers = [];
        this.mapSelected = null;

        try {
          const response = await this.$CapacitorHttp.request({
            method: 'POST',
            url: `${this.baseUrl}/user/api/dropoff-locations`,
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
            },
            data: { service_point: toRaw(this.shippingProducts.service_point) },
          });

          this.points = response.data;
          const markersTemp = [];

          this.points.forEach((point, index) => {
            const latitude = parseFloat(point.latitude);
            const longitude = parseFloat(point.longitude);

            if (!isNaN(latitude) && !isNaN(longitude)) {
              const marker = {
                position: { lat: latitude, lng: longitude },
              };
              markersTemp.push(marker);
            } else {
              console.warn(`Coordonnées non valides pour le point à l'index ${index}`);
            }

            if (!this.mapSelected) {
              this.mapSelected = point;
            }

            if (index === 0) {
              this.center = { lat: latitude, lng: longitude };
            }
          });

          this.locationMarkers = markersTemp;
          console.log("Tous les marqueurs ont été ajoutés :", this.locationMarkers);
        } catch (error) {
          console.error("Erreur lors de la récupération des points :", error);
        }
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
      	if (method.carrier_id == point.carrier_id) {
      		if (this.shippingPrice) {
	      		this.total = (parseFloat(this.total) - parseFloat(this.shippingPrice)).toFixed(2);
      		}
          this.currency = method.currency;
          this.identifier = method.identifier;
      		this.shippingPrice = method.price;
          this.shippingCarrierId = method.carrier_id;
          this.shippingCarrierName = method.carrier_name;
      		this.shippingServiceId = method.service_id;
      		this.shippingServiceName = method.service_name;
          this.shippingServiceCode = method.service_code;
          this.expectedDelivery = method.expectedDelivery;
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
    	this.popupPaymentMethod = true;
    },
    hidePopupPaymentMethod() {
    	this.popupPaymentMethod = false;
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
      if (this.fullscreen) {
        this.$router.push({ name: 'Cart', params: { fullscreen: true }});
      } else {
        this.$emit('hideCheckout');
      }
    },
    async payment() {
      if (!this.shippingServiceId || !this.shippingServiceName || !this.shippingCarrierId || !this.shippingCarrierName || !this.shippingPrice || !this.identifier) {
        await this.showErrorToast('Veuillez vérifier les informations de livraison et de paiement.');
        return;
      }

      if (this.loadingPayment) return;

      this.loadingPayment = true;
      try {
        const serializableLineItems = this.lineItems.map(item => {
          const rawItem = toRaw(item);
          return {
            vendor: rawItem.vendor,
            product: rawItem.product ? { id: rawItem.product.id, weight: rawItem.product.weight, weightUnit: rawItem.product.weightUnit } : null,
            variant: rawItem.variant ? { id: rawItem.variant.id, weight: rawItem.variant.weight, weightUnit: rawItem.variant.weightUnit } : null,
            quantity: rawItem.quantity,
          };
        });

        const response = await this.$CapacitorHttp.request({
          method: 'POST',
          url: `${this.baseUrl}/user/api/orders/payment`,
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          data: {
            lineItems: serializableLineItems,
            identifier: this.identifier,
            promotionId: this.promotion?.id || null,
            promotionAmount: this.promotionAmount,
            shippingPrice: this.shippingPrice,
            shippingCarrierId: this.shippingCarrierId,
            shippingCarrierName: this.shippingCarrierName,
            shippingServiceId: this.shippingServiceId,
            shippingServiceName: this.shippingServiceName,
            shippingServiceCode: this.shippingServiceCode,
            expectedDelivery: this.expectedDelivery,
            dropoffLocationId: this.pointSelected?.dropoff_location_id || null,
            dropoffCountryCode: this.pointSelected?.country_code || null,
            dropoffName: this.pointSelected?.name || null,
            dropoffPostcode: this.pointSelected?.postcode || null,
          },
        });

        const paymentResponse = response.data;
        if (this.$Capacitor.getPlatform() === 'web') {
          await this.handleWebPayment(paymentResponse);
        } else {
          await this.handleMobilePayment(paymentResponse);
        }
      } catch (error) {
        console.error(error);
        await this.showErrorToast(error.message);
      } finally {
        this.loadingPayment = false;
      }
    },
    async handleWebPayment(paymentResponse) {
      const stripe = await loadStripe(paymentResponse.paymentConfig.publishableKey);
      const { error } = await stripe.redirectToCheckout({
        sessionId: paymentResponse.paymentConfig.sessionId,
      });

      if (error) {
        console.error(error.message);
        await this.showErrorToast(error.message || 'Une erreur est survenue lors du paiement.');
      }
    },
    async handleMobilePayment(paymentResponse) {
      try {
        await Stripe.initialize({
          publishableKey: paymentResponse.paymentConfig.publishableKey,
        });

        const result = await Stripe.createPaymentSheet({
          clientSecret: paymentResponse.paymentConfig.paymentIntent,
          merchantDisplayName: paymentResponse.paymentConfig.companyName,
          customerEphemeralKeySecret: paymentResponse.paymentConfig.ephemeralKey,
          customerId: paymentResponse.paymentConfig.customerId,
          countryCode: paymentResponse.paymentConfig.appleMerchantCountryCode,
          applePayMerchantId: paymentResponse.paymentConfig.appleMerchantId,
          paymentMethodLayout: 'horizontal',
        });

        console.log(result.status);

        if (result.status === 'completed') {
          console.log('Paiement réussi');
          this.lineItems = [];
          useMainStore().setLineItems(this.lineItems);

          if (this.fullscreen) {
            this.$Haptics.impact({ style: 'medium' });
            this.$router.push({ name: 'Home' });
          } else {
            this.$emit('paymentSuccess', paymentResponse.order);
          }
        } else if (result.status === 'canceled') {
          console.log('Paiement annulé');
          await this.showErrorToast('Le paiement a été annulé.');
        } else {
          console.log('Paiement échoué');
          await this.showErrorToast('Le paiement a échoué.');
        }
      } catch (error) {
        console.error('Erreur PaymentSheet:', error);
        await this.showErrorToast('Une erreur est survenue lors du paiement.');
      }
    },
    async showErrorToast(message) {
      await this.$Toast.show({
        text: message || 'Une erreur est survenue.',
        duration: 'long',
        position: 'top',
      });
    },
    changeToAddress() {
    	this.shippingMethod = "domicile";
      this.pointSelected = null;

  		if (this.shippingPrice) {
    		this.total = (parseFloat(this.total) - parseFloat(this.shippingPrice)).toFixed(2);
  		}

      if (this.shippingProducts.domicile.length) {
        this.currency = this.shippingProducts.domicile[0].currency;
        this.identifier = this.shippingProducts.domicile[0].identifier;
        this.shippingPrice = this.shippingProducts.domicile[0].price;
        this.shippingCarrierId = this.shippingProducts.domicile[0].carrier_id;
        this.shippingCarrierName = this.shippingProducts.domicile[0].carrier_name;
        this.shippingServiceId = this.shippingProducts.domicile[0].service_id;
        this.shippingServiceName = this.shippingProducts.domicile[0].service_name;
        this.shippingServiceCode = this.shippingProducts.domicile[0].service_code;
        this.expectedDelivery = this.shippingProducts.domicile[0].expectedDelivery;
      }

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
    loadGoogleMapsScript() {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBrLhSgilRrPKpGtAPbbzcaIp-5L5VgE_w&libraries=places`;
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
      this.autocompleteInstance = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: ["fr", "be", "lu", "ch"] },
        fields: ["formatted_address", "address_components", "geometry"]
      });
      this.autocompleteInstance.addListener("place_changed", this.getAddressData);
    },
    getAddressData() {
      const place = this.autocompleteInstance.getPlace();
      if (!place || !place.address_components) return;

      const addressData = this.extractAddressComponents(place.address_components);
      console.log(addressData);

      this.address = addressData.street_number + ' ' + addressData.route;
      this.zip = addressData.postal_code;
      this.city = addressData.locality;
      this.country = addressData.country;
      this.countryShort = addressData.country_short;
      this.center = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
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

