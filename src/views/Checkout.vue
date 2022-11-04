<template>
  <main class="cart">
    <div style="position: absolute; background: white; padding: 15px; width: 100%; z-index: 1000000000; text-align: center;">
      <svg @click="goBack()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823; float: left;">
        <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
      </svg>
      <h5 style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Paiement</h5>
    </div>
    <div class="checkout" style="margin-top: 50px; margin-bottom: 125px;">
      <div class="checkout__body">
        <div class="MuiCardHeader-root css-15x3obx" style="padding-top: 0px; padding-bottom: 10px;">
          <div class="MuiCardHeader-content css-11qjisw">
            <span class="MuiTypography-root MuiTypography-h6 MuiCardHeader-title css-jef1j">Récapitulatif</span>
          </div>
        </div>

        <!-- order -->
        <div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiCard-root css-13dslnb" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 5px 10px; border-radius: 15px;">
          <div v-if="product" class="checkout__row checkout__product-info-row" style="align-items: center; justify-content: space-between;">
            <div class="checkout__product-info" style="padding-right: 0px;">
              <img v-if="product.uploads" :src="baseUrl + '/uploads/' + product.uploads[0].filename" class="checkout__image" style="border-radius: 8px;" />
              <div style="padding-right: 30px;">
              <h5 class="checkout__name" style="margin-bottom: 5px; font-weight: 600; font-size: 14px; margin-right: 10px;"> {{ product.title }} </h5>
              <div class="checkout__attr" v-if="variant"><span> {{ variant.title }} </span></div>
              </div>
            </div>
            <div class="product--quantity--detail">x{{ quantity }}</div>
          </div>
          <hr class="MuiDivider-root MuiDivider-fullWidth css-ss6lby" style="margin-bottom: 5px; margin-top: 5px;"/>
          <div class="MuiCardContent-root css-18mhetb">
            <div class="css-ikzlcq">
              <div class="css-9jay18">
                <p class="MuiTypography-root MuiTypography-body2 css-11r9ii4">Sous-total</p>
                <h6 class="MuiTypography-root MuiTypography-subtitle2 css-yemnbq">{{ subTotal | formatPrice }}€</h6>
              </div>
<!--               <div class="css-9jay18">
                <p class="MuiTypography-root MuiTypography-body2 css-11r9ii4" style="color: #18cea0; font-weight: 600;">PROMO10</p>
                <h6 class="MuiTypography-root MuiTypography-subtitle2 css-yemnbq" style="color: #18cea0; font-weight: 600;">-10,00€</h6>
              </div> -->
              <div class="css-9jay18">
                <p class="MuiTypography-root MuiTypography-body2 css-11r9ii4">Livraison</p>
                <h6 class="MuiTypography-root MuiTypography-subtitle2 css-yemnbq">-</h6>
              </div>
              <hr class="MuiDivider-root MuiDivider-fullWidth css-ss6lby" style="margin-bottom: 10px; margin-top: 5px; border-style: dashed;" />
              <div class="css-9jay18">
                <h6 class="MuiTypography-root MuiTypography-subtitle1 css-k9tjo5" style="font-weight: 600; margin-bottom: 0px;">Total</h6>
                <div class="MuiBox-root css-s2uf1z">
                  <h6 class="MuiTypography-root MuiTypography-subtitle1 css-kdhaao" style="font-weight: 600;">{{ total | formatPrice }}€</h6>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- shippingAddress -->
        <div v-if="shippingMethod != 'relay'" class="MuiCardHeader-root css-15x3obx" style="padding-top: 20px; padding-bottom: 10px;">
          <div class="MuiCardHeader-content css-11qjisw">
            <span class="MuiTypography-root MuiTypography-h6 MuiCardHeader-title css-jef1j" style="display: initial;">Adresse de livraison</span>
          </div>
        </div>

        <div v-if="shippingAddress && shippingMethod != 'relay'" class="card panel-item" style="border-radius: 15px; border: 1px solid rgba(22, 24, 35, 0.12);">
          <div @click="showShippingAddress()" class="card-body parcelshop-card-body">
            <div class="card-title">
              {{ firstname }} {{ lastname }}
            </div>
            <div class="card-text">
              <div>{{ address }}</div>
              <div>{{ zip }} {{ city }}</div>
              <span style="float: right; margin-top: -51px;">
              	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);"><path d="M493.255 56.236l-37.49-37.49c-24.993-24.993-65.515-24.994-90.51 0L12.838 371.162.151 485.346c-1.698 15.286 11.22 28.203 26.504 26.504l114.184-12.687 352.417-352.417c24.992-24.994 24.992-65.517-.001-90.51zm-95.196 140.45L174 420.745V386h-48v-48H91.255l224.059-224.059 82.745 82.745zM126.147 468.598l-58.995 6.555-30.305-30.305 6.555-58.995L63.255 366H98v48h48v34.745l-19.853 19.853zm344.48-344.48l-49.941 49.941-82.745-82.745 49.941-49.941c12.505-12.505 32.748-12.507 45.255 0l37.49 37.49c12.506 12.506 12.507 32.747 0 45.255z"/></svg>
              </span>
            </div>
          </div>
        </div>
        <div v-else-if="!shippingAddress" class="top-author" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 15px; border-radius: 15px;">
          <div @click="showShippingAddress()" class="top-author--container" style="">
            <div class="top-author--item">
              <div>
                <span>Ajouter une adresse</span>
                <div><span></span></div>
              </div>
              <div style="margin-right: 5px;"><span style="float: right;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187);width: 16px;height: 16px;"><path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path></svg></span></div>
            </div>
          </div>
        </div>

         
        <!-- shippingAddress -->
        <div v-if="shippingMethod == 'relay' && pointSelected" class="MuiCardHeader-root css-15x3obx" style="padding-top: 20px; padding-bottom: 10px;">
          <div class="MuiCardHeader-content css-11qjisw">
            <span class="MuiTypography-root MuiTypography-h6 MuiCardHeader-title css-jef1j" style="display: initial;">Détails de la livraison</span>
          </div>
        </div>
        <div v-if="shippingMethod == 'relay' && pointSelected" class="card panel-item" style="border-radius: 15px; border: 1px solid rgba(22, 24, 35, 0.12);">
          <div class="card-body parcelshop-card-body">
            <div class="card-title">
              <img :src="require(`@/assets/img/relay.svg`)" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"/> {{ pointSelected.name }}
            </div>
            <div class="card-text">
              <div>{{ pointSelected.house_number }} {{ pointSelected.street }}</div>
              <div>{{ pointSelected.zip }} {{ pointSelected.city }}</div>
            </div>
          </div>
        </div>



				<!-- carrier -->
        <div v-if="shippingAddress" class="MuiCardHeader-root css-15x3obx" style="padding-top: 20px; padding-bottom: 10px;">
          <div class="MuiCardHeader-content css-11qjisw">
            <span class="MuiTypography-root MuiTypography-h6 MuiCardHeader-title css-jef1j" style="display: initial;">Option de livraison</span>
          </div>
        </div>
        <div v-if="shippingAddress" class="top-author" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 15px; border-radius: 15px;">
          <div class="top-author--container" style="">
            <div @click="showRelayPopup()" class="top-author--item">
              <img :src="require(`@/assets/img/relay.svg`)" style="border-radius: 0px;"/>
              <div>
                <span>Mondial Relais</span>
                <div><span>Livraison 1 à 3 jours - 2,90€</span></div>
              </div>
              <div style="margin-right: 5px;">
				        <div class="filter--choice">
				        	<div>
				        		<div class="gender--choice">
				        			<label>
				        				<span>
				        					<svg v-if="shippingMethod == 'relay'" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-12qyrmm" focusable="false" viewBox="0 0 24 24" style="fill: #18cea0"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
				        					<svg v-else class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-12qyrmm" focusable="false" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
				        					<svg v-if="shippingMethod == 'relay'" class="svg--point" focusable="false" viewBox="0 0 24 24" style="fill: #18cea0"><path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path></svg>
				        				</span>
				        			</label>
				        		</div>
				        	</div>
				        </div>
              </div>
            </div>
            <hr class="MuiDivider-root MuiDivider-fullWidth css-ss6lby" style="margin-bottom: 10px; margin-top: 10px;" />
            <div @click="changeToAddress()" class="top-author--item">
              <img :src="require(`@/assets/img/colissimo.svg`)" style="border-radius: 0px;"/>
              <div>
                <span>Colissimo</span>
                <div><span>Livraison 3 à 5 jours - 8,40€</span></div>
              </div>
              <div style="margin-right: 5px;">
				        <div class="filter--choice">
				        	<div>
				        		<div class="gender--choice">
				        			<label>
				        				<span>
				        					<svg v-if="shippingMethod == 'address'" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-12qyrmm" focusable="false" viewBox="0 0 24 24" style="fill: #18cea0"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
				        					<svg v-else class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-12qyrmm" focusable="false" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path></svg>
				        					<svg v-if="shippingMethod == 'address'" class="svg--point" focusable="false" viewBox="0 0 24 24" style="fill: #18cea0"><path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path></svg>
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
        <div class="MuiCardHeader-root css-15x3obx" style="padding-top: 20px; padding-bottom: 10px;">
          <div class="MuiCardHeader-content css-11qjisw">
            <span class="MuiTypography-root MuiTypography-h6 MuiCardHeader-title css-jef1j" style="display: initial;">Mode de paiement</span>
          </div>
        </div>
        <div class="card panel-item" style="border-radius: 15px; border: 1px solid rgba(22, 24, 35, 0.12);">
          <div class="card-body parcelshop-card-body">
            <div class="card-title">
	            <div class="top-author--item">
	              <div>
	                <span>Paypal</span>
	                <div><span></span></div>
	              </div>
	              <div style="margin-right: 5px;"><span style="float: right;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187);width: 16px;height: 16px;"><path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path></svg></span></div>
	            </div>
            </div>
          </div>
        </div>
      </div>


      <div @click="payment()" style="position: fixed; bottom: 0px; width: 100%; background: white; padding: 25px; padding-bottom: calc(env(safe-area-inset-bottom) + 25px); border-top: 1px solid rgba(22, 24, 35, 0.12); z-index: 100;">
        <div style="text-align: center;">
          <div class="btn-swipe">Payer</div>
        </div>
      </div>

      <!-- shipping to home -->
      <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popupShippingAddress" style="overflow-y: scroll; height: 100%;"> 
        <div class="checkout__header">
          <div @click="hideShippingAddress()" class="checkout__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
          </div>
          <div class="checkout__title"> Adresse de livraison</div>
        </div>
        <div style="padding: 15px;">
          <div class="form--input">
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
          </div>

          <div class="form--input--item" :class="{'form--input--item--error': errorAddress }">
            <fieldset>
              <legend>Adresse</legend>
              <input type="text" v-model="address">
            </fieldset>
          </div>

          <div class="form--input--item">
            <fieldset>
              <legend>Complément d'adresse</legend>
              <input type="text" v-model="address2">
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
              <legend>Téléphone</legend>
              <input type="text" v-model="phone">
            </fieldset>
          </div>

          <div @click="saveShippingAddress()" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); position: absolute; bottom: 45px; margin: 0 auto; background: #fe2c55">Enregistrer</div>
        </div>
      </div>


      <!-- show relais -->
      <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popupRelay" style="overflow-y: scroll; height: 100%;"> 
        <div class="checkout__header">
          <div @click="hideRelay()" class="checkout__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
          </div>
          <div class="checkout__title"> Choisir un point relais</div>
        </div>
        <div style="padding: 15px;">

			    <div class="images_filter">
			      <ul>
			        <li @click="showMap()" v-bind:class="{active: tabMap}"  :style="[tabMap ? {'color': '#fe2c55'} : {'color': '#999'}]" style="font-weight: 600">Carte </li>
			        <li @click="showList()" v-bind:class="{active: tabList}"  :style="[tabList ? {'color': '#fe2c55'} : {'color': '#999'}]" style="font-weight: 600">Liste des relais </li>
			      </ul>
			    </div>

			    <div v-if="tabMap">
			    	<div v-if="points">
			    		<div class="map" style="height: calc(100vh - 315px); width:100%"></div>
			    		<div class="card panel-item" style="margin-top: 15px; margin-bottom: 15px; border-radius: 15px; border: 1px solid rgba(145,158,171,.24);">
			    			<div class="card-body parcelshop-card-body">
			    				<div class="card-title">
			    					<img :src="require(`@/assets/img/relay.svg`)" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"/> {{ points[0].name }}
			    				</div>
			    				<div class="card-text">
			    					<div>{{ points[0].house_number }} {{ points[0].street }}</div>
			    					<div>{{ points[0].zip }} {{ points[0].city }}</div>
			    				</div>
			    			</div>
			    		</div>
			        <div @click="saveRelay(points[0])" style="text-align: center;">
			          <div class="btn-swipe">Selectionner</div>
			        </div>
			    	</div>
			    </div>
			    <div v-if="tabList">
	          <div v-if="points" v-for="(point, index) in points" class="card panel-item" style="margin-top: 15px; border-radius: 15px; border: 1px solid rgba(145,158,171,.24);">
	            <div @click="showRelayInfoPopup(index)" class="card-body parcelshop-card-body">
	              <div class="card-title">
	                <img :src="require(`@/assets/img/relay.svg`)" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"/> {{ point.name }}
	              </div>
	              <div class="card-text">
	                <div>{{ point.house_number }} {{ point.street }}</div>
	                <div>{{ point.zip }} {{ point.city }}</div>
	                <span style="float: right; margin-top: -51px;">
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


      <!-- select relais -->
      <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popupRelayInfo" style="overflow-y: scroll; height: 100%;"> 
        <div class="checkout__header">
          <div @click="hideRelayInfo()" class="checkout__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
          </div>
          <div class="checkout__title">Informations</div>
        </div>
        <div style="padding: 15px;">
        	<div class="card panel-item" style="border-radius: 15px; border: 1px solid rgba(22, 24, 35, 0.12);">
        		<div class="card-body parcelshop-card-body">
        			<div class="card-title">
        				<img :src="require(`@/assets/img/relay.svg`)" style="border-radius: 0px; height: 24px; width: 24px; margin-right: 5px;"/> {{ point.name }}
        			</div>
        			<div class="card-text">
        				<div>{{ point.house_number }} {{ point.street }}</div>
        				<div>{{ point.zip }} {{ point.city }}</div>
        			</div>
        		</div>
        	</div>

      		<div v-if="point.formatted_opening_times">
      			<div style="margin-bottom: 7px; font-weight: 600; margin-top: 20px;">Horaires d'ouverture</div>
      			<ul style="text-transform: capitalize;">
      				<li v-if="point.formatted_opening_times[0].length">
      					Lundi : <span v-for="(hour, index2) in point.formatted_opening_times[0]">{{ hour }} </span>
      				</li>
      				<li v-if="point.formatted_opening_times[1].length">
      					Mardi : <span v-for="(hour, index2) in point.formatted_opening_times[1]">{{ hour }} </span>
      				</li>
      				<li v-if="point.formatted_opening_times[2].length">
      					Mercredi : <span v-for="(hour, index2) in point.formatted_opening_times[2]">{{ hour }} </span>
      				</li>
      				<li v-if="point.formatted_opening_times[3].length">
      					Jeudi : <span v-for="(hour, index2) in point.formatted_opening_times[3]">{{ hour }} </span>
      				</li>
      				<li v-if="point.formatted_opening_times[4].length">
      					Vendredi : <span v-for="(hour, index2) in point.formatted_opening_times[4]">{{ hour }} </span>
      				</li>
      				<li v-if="point.formatted_opening_times[5].length">
      					Samedi : <span v-for="(hour, index2) in point.formatted_opening_times[5]">{{ hour }} </span>
      				</li>
      				<li v-if="point.formatted_opening_times[6].length">
      					Dimanche : <span v-for="(hour, index2) in point.formatted_opening_times[6]">{{ hour }} </span>
      				</li>
      			</ul>
          </div>
	        <div @click="saveRelay(point)" class="btn-swipe" style="color: white; text-align: center; width: calc(100vw - 30px); position: absolute; bottom: 45px; margin: 0 auto; background: #fe2c55">Selectionner</div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped src="../assets/css/checkout.css"></style>

<script>

import Pusher from 'pusher-js';

export default {
  name: 'Checkout',
  data() {
    return {
      product: this.$route.params.product,
      variant: this.$route.params.variant,
      quantity: this.$route.params.quantity,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      sendcloud_pk: window.localStorage.getItem("sendcloud_pk"),
      pusher: new Pusher('55da4c74c2db8041edd6', { cluster: 'eu' }),
      carriers: [],
      client_secret: null,      
      subTotal: null,
      total: null,
      shippingAddress: true,
      tabMap: true,
      tabList: false,
      popupShippingAddress: false,
      popupRelay: false,
      popupRelayInfo: false,
      errorFirstname: false,
      errorLastname: false,
      errorAddress: false,
      errorZip: false,
      errorCity: false,
      firstname: "Julien",
      lastname: "Reignier",
      address: "87 chemin de la lune",
      address2: null,
      zip: "01700",
      city: "Miribel",
      points: null,
      point: null,
      pointSelected: null,
      shippingMethod: null,
    }
  },
  filters: {
    formatPrice(value) {
    	return value.replace('.', ',');
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();

    console.log(this.product);
    console.log(this.variant);

    if (this.variant) {
      this.subTotal = this.variant.price * this.quantity;
    } else {
      this.subTotal = this.product.price * this.quantity;
    }

    this.subTotal = this.subTotal.toFixed(2);
    this.total = this.subTotal;

    window.cordova.plugin.http.post(this.baseUrl + "/user/api/payment", { "product": this.product.id, "variant": this.variant ? this.variant.id : null, "quantity": this.quantity }, { Authorization: "Bearer " + this.token }, (response) => {
      console.log(JSON.parse(response.data));
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    showShippingAddress() {
      this.popupShippingAddress = true;
    },
    hideShippingAddress() {
      this.popupShippingAddress = false;
    },
    saveShippingAddress() {
      this.errorFirstname = false;
      this.errorLastname = false;
      this.errorAddress = false;
      this.errorZip = false;
      this.errorCity = false;

      if (!this.firstname) {
        this.errorFirstname = true;
      }

      if (!this.lastname) {
        this.errorLastname = true;
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

      if (!this.errorFirstname && !this.errorLastname && !this.errorAddress && !this.errorZip && !this.errorCity) {
        this.popupShippingAddress = false;
        this.shippingAddress = true;
      }
    },
    showRelayPopup() {
      this.popupRelay = true;
    	this.shippingMethod = "relay";
      this.tabMap = true;
      this.tabList = false;

      window.cordova.plugin.http.setDataSerializer('json');
      window.cordova.plugin.http.get("https://servicepoints.sendcloud.sc/api/v2/service-points", { "access_token": this.sendcloud_pk, "country": "FR", "carrier": "mondial_relay", "postal_code": this.zip }, {}, (response) => {
        this.points = JSON.parse(response.data);
      }, function(response) {
        console.log(response.error);
      });
    },
    hideRelay() {
      this.popupRelay = false;
    },
    saveRelay(point) {
    	this.pointSelected = point;
      this.popupRelay = false;
      this.popupRelayInfo = false;
    },
    showRelayInfoPopup(index) {
    	this.point = this.points[index];
      this.popupRelayInfo = true;
    },
    hideRelayInfo() {
      this.popupRelayInfo = false;
    },
    saveRelayInfo() {
      this.popupRelayInfo = false;
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
      this.$router.back();
    },
    payment() {
      this.$router.push({ name: 'Feed' });
    },
    changeToAddress() {
    	this.shippingMethod = "address";
    },
  }
};

</script>

