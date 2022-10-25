<template>
  <main class="cart">
    <div style="position: absolute; background: white; padding: 15px; width: 100%; z-index: 1000000000; text-align: center;">
      <svg @click="goBack()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823; float: left;">
        <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
      </svg>
      <h5 style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Checkout</h5>
    </div>
    <div class="checkout" style="margin-top: 50px;">
      <div class="checkout__body">
        <div class="MuiCardHeader-root css-15x3obx" style="padding-top: 0px; padding-bottom: 10px;">
          <div class="MuiCardHeader-content css-11qjisw">
            <span class="MuiTypography-root MuiTypography-h6 MuiCardHeader-title css-jef1j">Récapitulatif</span>
          </div>
        </div>

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
                <p class="MuiTypography-root MuiTypography-body2 css-11r9ii4">Sous Total</p>
                <h6 class="MuiTypography-root MuiTypography-subtitle2 css-yemnbq">{{ subTotal | formatPrice }}€</h6>
              </div>
              <div class="css-9jay18">
                <p class="MuiTypography-root MuiTypography-body2 css-11r9ii4" style="color: #18cea0; font-weight: 600;">PROMO10</p>
                <h6 class="MuiTypography-root MuiTypography-subtitle2 css-yemnbq" style="color: #18cea0; font-weight: 600;">-10,00€</h6>
              </div>
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


        <div class="MuiCardHeader-root css-15x3obx" style="padding-top: 20px; padding-bottom: 10px;">
          <div class="MuiCardHeader-content css-11qjisw">
            <span class="MuiTypography-root MuiTypography-h6 MuiCardHeader-title css-jef1j" style="display: initial;">Mode de livraison</span>
            <span @click="removeShipping()" v-if="shipping || relay" class="MuiTypography-root MuiTypography-h6 MuiCardHeader-title css-jef1j" style="display: initial; color: #fe2c55; font-size: 14px; font-weight: 500; float: right;">Modifier</span>
          </div>
        </div>
        <div v-if="!shipping && !relay" class="top-author" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 15px; border-radius: 15px;">
          <div class="top-author--container" style="">
            <div @click="showRelayPopup()" class="top-author--item">
              <img :src="require(`@/assets/img/relay.svg`)" style="border-radius: 0px;"/>
              <div>
                <span>Mondial Relais</span>
                <div><span>A partir de 3€</span></div>
              </div>
              <div style="margin-right: 5px;"><span style="float: right;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187);width: 16px;height: 16px;"><path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path></svg></span></div>
            </div>
            <hr class="MuiDivider-root MuiDivider-fullWidth css-ss6lby" style="margin-bottom: 10px; margin-top: 10px;" />
            <div @click="showShippingPopup()" class="top-author--item">
              <img :src="require(`@/assets/img/colissimo.svg`)" style="border-radius: 0px;"/>
              <div>
                <span>Colissimo</span>
                <div><span>A partir de 7€</span></div>
              </div>
              <div style="margin-right: 5px;"><span style="float: right;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187);width: 16px;height: 16px;"><path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path></svg></span></div>
            </div>
          </div>
        </div>

         
        <div v-if="shipping" class="card panel-item" style="border-radius: 15px; border: 1px solid rgba(22, 24, 35, 0.12);">
          <div class="card-body parcelshop-card-body">
            <div class="card-title">
              {{ firstname }} {{ lastname }}
            </div>
            <div class="card-text">
              <div>{{ address }}</div>
              <div>{{ zip }} {{ city }}</div>
            </div>
          </div>
        </div>

         
        <div v-if="relay" class="card panel-item" style="border-radius: 15px; border: 1px solid rgba(22, 24, 35, 0.12);">
          <div class="card-body parcelshop-card-body">
            <div class="card-title">
               3SDM
            </div>
            <div class="card-text">
              <div>287 RUE DES BROTTEAUX</div>
              <div>01700 MIRIBEL</div>
            </div>
          </div>
        </div>

<!-- 
        <div class="MuiCardHeader-root css-15x3obx" style="margin-top: 10px; padding-bottom: 10px;">
          <div class="MuiCardHeader-content css-11qjisw">
            <span class="MuiTypography-root MuiTypography-h6 MuiCardHeader-title css-jef1j">Mode de paiement</span>
          </div>
        </div>
        <div class="checkout__row checkout__product-info-row" style="align-items: center;">
          <div class="checkout__product-info checkout_payment_type" style="padding-right: 0px;padding: 5px 20px;border-radius: 15px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="width: 36px; height: 36px; fill: #333;">
              <path d="M116.9 158.5c-7.5 8.9-19.5 15.9-31.5 14.9-1.5-12 4.4-24.8 11.3-32.6 7.5-9.1 20.6-15.6 31.3-16.1 1.2 12.4-3.7 24.7-11.1 33.8m10.9 17.2c-17.4-1-32.3 9.9-40.5 9.9-8.4 0-21-9.4-34.8-9.1-17.9.3-34.5 10.4-43.6 26.5-18.8 32.3-4.9 80 13.3 106.3 8.9 13 19.5 27.3 33.5 26.8 13.3-.5 18.5-8.6 34.5-8.6 16.1 0 20.8 8.6 34.8 8.4 14.5-.3 23.6-13 32.5-26 10.1-14.8 14.3-29.1 14.5-29.9-.3-.3-28-10.9-28.3-42.9-.3-26.8 21.9-39.5 22.9-40.3-12.5-18.6-32-20.6-38.8-21.1m100.4-36.2v194.9h30.3v-66.6h41.9c38.3 0 65.1-26.3 65.1-64.3s-26.4-64-64.1-64h-73.2zm30.3 25.5h34.9c26.3 0 41.3 14 41.3 38.6s-15 38.8-41.4 38.8h-34.8V165zm162.2 170.9c19 0 36.6-9.6 44.6-24.9h.6v23.4h28v-97c0-28.1-22.5-46.3-57.1-46.3-32.1 0-55.9 18.4-56.8 43.6h27.3c2.3-12 13.4-19.9 28.6-19.9 18.5 0 28.9 8.6 28.9 24.5v10.8l-37.8 2.3c-35.1 2.1-54.1 16.5-54.1 41.5.1 25.2 19.7 42 47.8 42zm8.2-23.1c-16.1 0-26.4-7.8-26.4-19.6 0-12.3 9.9-19.4 28.8-20.5l33.6-2.1v11c0 18.2-15.5 31.2-36 31.2zm102.5 74.6c29.5 0 43.4-11.3 55.5-45.4L640 193h-30.8l-35.6 115.1h-.6L537.4 193h-31.6L557 334.9l-2.8 8.6c-4.6 14.6-12.1 20.3-25.5 20.3-2.4 0-7-.3-8.9-.5v23.4c1.8.4 9.3.7 11.6.7z"/>
            </svg>
          </div>
          <div class="checkout__product-info checkout_payment_type" style="padding-right: 0px;padding: 5px 20px;border-radius: 15px;margin-left: 15px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="width: 36px; height: 36px; fill: #333;">
              <path d="M105.72,215v41.25h57.1a49.66,49.66,0,0,1-21.14,32.6c-9.54,6.55-21.72,10.28-36,10.28-27.6,0-50.93-18.91-59.3-44.22a65.61,65.61,0,0,1,0-41l0,0c8.37-25.46,31.7-44.37,59.3-44.37a56.43,56.43,0,0,1,40.51,16.08L176.47,155a101.24,101.24,0,0,0-70.75-27.84,105.55,105.55,0,0,0-94.38,59.11,107.64,107.64,0,0,0,0,96.18v.15a105.41,105.41,0,0,0,94.38,59c28.47,0,52.55-9.53,70-25.91,20-18.61,31.41-46.15,31.41-78.91A133.76,133.76,0,0,0,205.38,215Zm389.41-4c-10.13-9.38-23.93-14.14-41.39-14.14-22.46,0-39.34,8.34-50.5,24.86l20.85,13.26q11.45-17,31.26-17a34.05,34.05,0,0,1,22.75,8.79A28.14,28.14,0,0,1,487.79,248v5.51c-9.1-5.07-20.55-7.75-34.64-7.75-16.44,0-29.65,3.88-39.49,11.77s-14.82,18.31-14.82,31.56a39.74,39.74,0,0,0,13.94,31.27c9.25,8.34,21,12.51,34.79,12.51,16.29,0,29.21-7.3,39-21.89h1v17.72h22.61V250C510.25,233.45,505.26,220.34,495.13,211ZM475.9,300.3a37.32,37.32,0,0,1-26.57,11.16A28.61,28.61,0,0,1,431,305.21a19.41,19.41,0,0,1-7.77-15.63c0-7,3.22-12.81,9.54-17.42s14.53-7,24.07-7C470,265,480.3,268,487.64,273.94,487.64,284.07,483.68,292.85,475.9,300.3Zm-93.65-142A55.71,55.71,0,0,0,341.74,142H279.07V328.74H302.7V253.1h39c16,0,29.5-5.36,40.51-15.93.88-.89,1.76-1.79,2.65-2.68A54.45,54.45,0,0,0,382.25,158.26Zm-16.58,62.23a30.65,30.65,0,0,1-23.34,9.68H302.7V165h39.63a32,32,0,0,1,22.6,9.23A33.18,33.18,0,0,1,365.67,220.49ZM614.31,201,577.77,292.7h-.45L539.9,201H514.21L566,320.55l-29.35,64.32H561L640,201Z"/>
            </svg>
          </div>
          <div class="checkout__product-info checkout_payment_type" style="padding: 7px 20px;border-radius: 15px;margin-left: 15px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 32px;height: 32px;fill: rgb(51, 51, 51);">
              <defs></defs>
              <path class="fa-primary" d="M512 32h-448c-35.35 0-64 28.65-64 64v320c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V96C576 60.65 547.3 32 512 32zM63.1 272c0-8.838 7.164-16 16-16h96c8.836 0 16 7.162 16 16v32c0 8.836-7.164 16-16 16h-96c-8.836 0-16-7.164-16-16V272zM160 408C160 412.4 156.4 416 152 416h-80C67.58 416 64 412.4 64 408l0-16c0-4.42 3.582-8 8-8h80c4.418 0 8 3.58 8 8L160 408zM352 408c0 4.418-3.582 8-8 8h-144C195.6 416 192 412.4 192 408l0-16c0-4.42 3.582-8 8-8h143.1c4.418 0 8 3.58 8 8L352 408zM384 304c0 8.836-7.164 16-16 16h-128c-8.836 0-16-7.164-16-16v-32c0-8.838 7.164-16 15.1-16h128c8.836 0 16 7.162 16 16L384 304zM512 304c0 8.836-7.164 16-16 16h-64C423.2 320 416 312.8 416 304l0-32c0-8.838 7.164-16 16-16H496C504.8 256 512 263.2 512 272V304zM512 176C512 184.8 504.8 192 496 192h-96c-8.836 0-16-7.164-16-16v-64c0-8.838 7.164-16 16-16H496C504.8 96 512 103.2 512 112V176z" style="fill: #5d9ceb;"></path><path class="fa-secondary" d="M63.1 272c0-8.838 7.164-16 16-16h96c8.836 0 16 7.162 16 16v32c0 8.836-7.164 16-16 16h-96c-8.836 0-16-7.164-16-16V272zM384 304c0 8.836-7.164 16-16 16h-128c-8.836 0-16-7.164-16-16v-32c0-8.838 7.164-16 15.1-16h128c8.836 0 16 7.162 16 16L384 304zM512 304c0 8.836-7.164 16-16 16h-64C423.2 320 416 312.8 416 304l0-32c0-8.838 7.164-16 16-16H496C504.8 256 512 263.2 512 272V304z" style="fill: white;"></path>
            </svg>
          </div>
        </div> -->

        <div style="margin: 30px auto">
          <div @click="nativePayment()" style="text-align: center;">
            <div class="btn-swipe">Payer</div>
          </div>
        </div>
      </div>


      <!-- shipping to home -->
      <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popupShipping" style="overflow-y: scroll; height: 100%;"> 
        <div class="checkout__header">
          <div @click="hideShipping()" class="checkout__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
          </div>
          <div class="checkout__title"> Livraison</div>
          <div class="checkout__right-btn">
            <div @click="saveShipping()" style="color: #FE2C55; font-weight: 600;">Enregistrer</div>
          </div>
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
        </div>
      </div>


      <!-- shipping to relay -->
      <div class="store-products-item__login-popup store-products-item__login-popup--active" v-if="popupRelay" style="overflow-y: scroll; height: 100%;"> 
        <div class="checkout__header">
          <div @click="hideRelay()" class="checkout__close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: rgb(153, 153, 153);"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
          </div>
          <div class="checkout__title"> Trouver un Point Relais</div>
        </div>
        <div style="padding: 15px;">
          <div style="width: 100%;">
            <div class="chat--left--head--input" style="border-radius: 8px;">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="MuiBox-root css-1q8h0dm iconify iconify--eva">
                <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
              </svg>
              <input v-on:keyup="findServicePoints()" v-model="search" ref="search" type="text" placeholder="Ville ou code postal" style="height: 1.75em"/>
            </div>
          </div>

          <div @click="saveRelay()" v-for="(point, index) in points" class="card panel-item" style="margin-top: 15px; border-radius: 15px; border: 1px solid rgba(145,158,171,.24);">
            <div class="card-body parcelshop-card-body">
              <div class="card-title">
                <span class="parcelshop-number">{{ index + 1 }}</span> {{ point.name }}
              </div>
              <div class="card-text">
                <div>{{ point.house_number }} {{ point.street }}</div>
                <div>{{ point.zip }} {{ point.city }}</div>
                <div v-if="point.open_tomorrow" style="text-transform: capitalize; font-weight: 600; font-size: 14px; margin-top: 3px;">Ouvert demain</div><br>
                <div v-if="point.formatted_opening_times" style="color: #999; font-size: 14px;">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped src="../assets/css/checkout.css"></style>

<script>

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
      client_secret: null,      
      subTotal: null,
      total: null,
      shipping: false,
      relay: false,
      popupShipping: false,
      popupRelay: false,
      errorFirstname: false,
      errorLastname: false,
      errorAddress: false,
      errorZip: false,
      errorCity: false,
      firstname: null,
      lastname: null,
      address: null,
      address2: null,
      zip: null,
      city: null,
      search: null,
      points: null,
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
      this.client_secret = JSON.parse(response.data);
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: { 
    async nativePayment() {
    	try {
    		console.log(window.trustshare);
  			const trustshare = window.trustshare('sandbox_pk_1LQaPGXimq3JzXalAiMh4SerMvdwZ0oF');
  			console.log(trustshare);
  			console.log(this.client_secret);
    		const result = await trustshare.sdk.v1.confirmPaymentIntent(this.client_secret);
    		// const result = await trustshare.sdk.v1.confirmVerification(this.client_secret);

    		console.log(result);
    	} catch (error) {
    		console.log(error);
    	}
    },
    hideShipping() {
      this.popupShipping = false;
    },
    hideRelay() {
      this.popupRelay = false;
    },
    saveShipping() {
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
        this.popupShipping = false;
        this.shipping = true;
      }
    },
    saveRelay() {
      this.popupRelay = false;
      this.relay = true;
    },
    showShippingPopup() {
      this.popupShipping = true;
    },
    showRelayPopup() {
      this.popupRelay = true;
    },
    removeShipping() {
      this.relay = false;
      this.shipping = false;
    },
    goBack() {
      this.$router.back();
    },
    findServicePoints() {
      console.log(this.search);
      if (this.search.length == 5) {
        window.cordova.plugin.http.setDataSerializer('json');
        window.cordova.plugin.http.get("https://servicepoints.sendcloud.sc/api/v2/service-points", { "country": "FR", "carrier": "mondial_relay", "postal_code": this.search }, { 'Authorization': 'AccessToken ' + this.sendcloud_pk }, (response) => {
          console.log(response);
          console.log(JSON.parse(response.data));
          this.points = JSON.parse(response.data);
        }, function(response) {
          console.log(response.error);
        });
      }
    },
    openUrl(url) {
      window.SafariViewController.isAvailable((available) => {
        if (available) {
          window.SafariViewController.show({ url: url }, (result) => {
            if (result.event === 'opened') {
              console.log('opened');
            } else if (result.event === 'loaded') {
              console.log('loaded');
            } else if (result.event === 'closed') {
              console.log('closed');
            }
          }, (error) => {
            console.log("KO: " + error);
          })
        } else {
          window.cordova.InAppBrowser.open(url, '_system', 'location=no');
        }
      });
    },
  }
};

</script>

