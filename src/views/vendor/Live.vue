<template>
  <div class="livestream" style="background: black;">
    <div v-if="browser" id="player" style="height: 100vh; overflow: hidden;"></div>

    <div v-if="prelive" class="prelive">
      <!-- filter top/bottom -->
      <div class="filter-bottom"></div>
      

      <!-- go back -->
      <div @click="goBack()" class="video-page__influencer-badge4 badge-goback" :style="{'top': safeareaTop }">
        <div class="video-page__influencer-username-holder">
          <span class="video-page__influencer-video-count">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
            </svg>
          </span>
        </div>
      </div>


      <!-- facebook -->
      <div v-if="facebook" @click="showFacebook()" :style="{'top': safeareaTop }" class="video-page__influencer-badge4 badge-facebook">
        <div class="video-page__influencer-username-holder">
          <span class="video-page__influencer-video-count">
            <img :src="require(`@/assets/img/facebook.svg`)" style="width: 36px; height: 36px;"/>
          </span>
        </div>
      </div>


      <!-- rotate camera -->
      <div :style="{'top': safeareaTop }" class="video-page__influencer-badge4" style="position: absolute; right: 15px; background: rgba(0, 0, 0, 0.25);">
        <div @click="switchCamera()" class="video-page__influencer-username-holder" style="padding-left: 5px;">
          <span class="video-page__influencer-video-count">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 40px; height: 40px; padding: 10px; fill: white;">
              <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM384 256c0 8.8-7.2 16-16 16H291.3c-6.2 0-11.3-5.1-11.3-11.3c0-3 1.2-5.9 3.3-8L307 229c-13.6-13.4-31.9-21-51-21c-19.2 0-37.7 7.6-51.3 21.3L185 249c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l19.7-19.7C193.4 172.7 224 160 256 160c31.8 0 62.4 12.6 85 35l23.7-23.7c2.1-2.1 5-3.3 8-3.3c6.2 0 11.3 5.1 11.3 11.3V256zM128 320c0-8.8 7.2-16 16-16h76.7c6.2 0 11.3 5.1 11.3 11.3c0 3-1.2 5.9-3.3 8L205 347c13.6 13.4 31.9 21 51 21c19.2 0 37.7-7.6 51.3-21.3L327 327c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-19.7 19.7C318.6 403.3 288 416 256 416c-31.8 0-62.4-12.6-85-35l-23.7 23.7c-2.1 2.1-5 3.3-8 3.3c-6.2 0-11.3-5.1-11.3-11.3V320z"/>
            </svg>
          </span>
        </div>
        <div @click="showPromo()" class="video-page__influencer-username-holder">
          <span class="video-page__influencer-video-count">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 40px; height: 40px; padding: 10px; fill: white;">
              <path d="M536.5 170.7l-135.7-131.9c-9.453-9.219-24.67-9-33.94 .5c-9.234 9.5-9.016 24.69 .5 33.94l135.5 131.7C519 221.1 528 242.8 528 265.8s-8.969 44.63-25.3 60.95l-111.7 112.4c-9.344 9.406-9.312 24.59 .0938 33.94C395.8 477.7 401.9 480 408 480c6.172 0 12.33-2.359 17.02-7.078l111.7-112.3C562 335.3 576 301.6 576 265.8S562 196.2 536.5 170.7zM463.6 225.6L286.4 48.4C277.4 39.38 259.6 32 246.8 32H60C44.54 32 32 44.54 32 60v186.8c0 12.76 7.381 30.58 16.4 39.6l177.2 177.2c21.87 21.87 57.32 21.87 79.2 .002l158.8-158.8C485.5 282.9 485.5 247.5 463.6 225.6zM144 176c-17.67 0-32-14.32-32-32c0-17.68 14.33-32 32-32s32 14.32 32 32C176 161.7 161.7 176 144 176z"></path>
            </svg>
          </span>
        </div>
        <div @click="showMultistream()" class="video-page__influencer-username-holder" style="padding-right: 5px;">
          <span class="video-page__influencer-video-count">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 40px; height: 40px; padding: 10px; fill: #ff2a80;">
              <path class="fa-primary" d="M288 200C257.1 200 232 225.1 232 256S257.1 312 288 312S344 286.9 344 256S318.9 200 288 200z"/>
              <path class="fa-secondary" d="M64 256c0-51.5 16.98-99.91 49.13-139.1c11.05-13.78 8.844-33.94-4.953-45c-13.75-10.97-33.89-8.812-44.98 4.938C22.44 126.8 0 190.7 0 256c0 65.28 22.44 129.2 63.19 180C69.52 443.9 78.8 448 88.17 448c7.031 0 14.09-2.312 20-7.031c13.8-11.06 16-31.22 4.953-45C80.98 355.9 64 307.5 64 256zM512.8 75.96c-11.09-13.78-31.23-15.97-44.98-4.938c-13.8 11.06-16 31.22-4.953 45C495 156.1 512 204.5 512 256c0 51.5-16.98 99.91-49.13 139.1c-11.05 13.78-8.844 33.94 4.953 45C473.7 445.7 480.8 448 487.8 448c9.375 0 18.66-4.094 24.98-11.97C553.6 385.2 576 321.3 576 256C576 190.7 553.6 126.8 512.8 75.96zM392.3 149.1c-9.962 8.75-10.95 23.91-2.19 33.87c34.97 39.78 34.97 104.5 0 144.3c-8.758 9.969-7.772 25.12 2.19 33.87c4.567 3.1 10.21 5.969 15.84 5.969c6.678 0 13.32-2.75 18.06-8.156c50.33-57.25 50.33-150.4 0-207.7C417.4 142.2 402.3 141.2 392.3 149.1zM183.7 149.1C173.8 141.2 158.6 142.2 149.8 152.2c-50.33 57.25-50.33 150.4 0 207.7c4.739 5.406 11.39 8.156 18.06 8.156c5.614 0 11.28-1.969 15.84-5.969c9.962-8.75 10.95-23.91 2.19-33.87c-34.97-39.78-34.97-104.5 0-144.3C194.7 173.9 193.7 158.7 183.7 149.1z" style="fill: white;"/>
            </svg>
          </span>
        </div>
      </div>

    
      <!-- promo popup -->
      <div v-if="popupPromo" class="store-products-item__login-popup store-products-item__login-popup--active promotion">
        <div @click="hidePromo()" style="display: flex;">
          <div class="scroll-indicator"></div>
        </div>
        <div style="text-align: center; margin-bottom: 20px; font-weight: 600; color: rgb(51, 51, 51);">
          <span style="text-align: center; font-size: 17px; margin: 0px auto; color: #272c30;">Créer une promotion</span>
        </div>

        <div class="items" style="overflow: scroll; padding: 15px 0px 40px;">
          <div style="margin-bottom: 10px;">
            <div class="form--input--item">
              <fieldset>
                <legend>Titre de la promotion</legend>
                <input type="text" v-model="promotion.title" placeholder="Ex: PROMO20" style="text-transform: uppercase;">
              </fieldset>
            </div>
            
            <div class="form--input">
              <div class="form--input--item" :class="{'form--input--item--error': promotion.type == 'percent' && promotion.value > 99 }">
                <fieldset>
                  <legend>Valeur de la remise</legend>
                  <input type="number" step="1" v-model="promotion.value" placeholder="Ex: 20">
                </fieldset>
              </div>
              
              <div class="form--input--item">
                <fieldset>
                  <legend>Type de remise</legend>
                  <select required v-model="promotion.type" :style="{'color': promotion.type ? '#525c66': 'rgba(145,158,171,.8)'}">
                    <option value="" selected>Choisir un type</option>
                    <option value="percent">Pourcentage</option>
                    <option value="fixe">Fixe</option>
                  </select>
                </fieldset>
              </div>
            </div>
            <div @click="savePromo()" class="btn-swipe" style="color: white; text-align: center;">Enregistrer</div>
          </div>
          <hr> 

          <!-- afficher les promotions -->
          <div v-if="user.vendor.promotions && user.vendor.promotions.length > 0">
            <p style="text-align: left; font-size: 12px; line-height: 1.57143; font-size: 13px; font-weight: 400; color: #999; margin: 0; margin-top: 15px; padding: 10px;">La promotion activé sera appliqué automatiquement lors du passage en caisse de vos clients.</p>

            <div v-for="(promo, index) in user.vendor.promotions" style="border: 1px solid rgb(255, 102, 0); margin: 5px;padding: 8px 0px;margin-top: 10px;border-radius: 10px; margin-bottom: 15px;">
              <div class="profile--follow">
                <div style="width: 40%; margin-top: 5px;">
                  <img :src="require(`@/assets/img/discount.svg`)" class="user" style="margin: 7px 25px;width: 64px;height: 64px;border-radius: 100%;">
                  <label class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-g5gk3y">
                    <span @click="check(promo)" class="MuiSwitch-root MuiSwitch-sizeMedium css-1nvvhq">
                      <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1hei3uy" :class="{'Mui-checked': promo.isActive }">
                        <input class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3" type="checkbox" value="true" :checked="promo.isActive">
                        <span class="MuiSwitch-thumb css-byglaq"></span>
                        <span class="MuiTouchRipple-root css-w0pj6f"></span>
                      </span><span class="MuiSwitch-track css-1ju1kxc"></span>
                    </span>
                  </label>
                </div>
                <hr style="margin: 0px;border-width: 0 2px 0 0;border-style: dashed;border-color: rgba(145,158,171,.24); width: 1px;">
                <div>
                  <svg @click="deletePromo(promo, index)" style="width: 24Px; height: 24px; right: 8px; position: absolute;" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path fill="#999999" d="M13.4,12l4.3-4.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L12,10.6L7.7,6.3c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l4.3,4.3l-4.3,4.3C6.1,16.5,6,16.7,6,17c0,0.6,0.4,1,1,1c0.3,0,0.5-0.1,0.7-0.3l4.3-4.3l4.3,4.3c0.2,0.2,0.4,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12z"/></svg>
                  <h4 v-if="promo.type == 'percent'" style="font-size: 30px; font-weight: 600; margin-top: 3px; margin-bottom: 0px;color: rgb(255, 102, 0);">-{{ promo.value }}%</h4>
                  <h4 v-else style="font-size: 30px; font-weight: 600; margin-top: 3px; margin-bottom: 0px;color: rgb(255, 102, 0);">-{{ promo.value }}€</h4>
                  <p>Valable sur toute la boutique </p>
                  <h4 style="font-size: 15px; margin: 10px auto; color: rgb(255, 102, 0); border: 1px solid rgb(255, 102, 0); padding: 3px 15px; border-radius: 10px;text-transform: uppercase;">{{ promo.title }}</h4>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="container" style="margin: 40px auto 0px; text-align: center;">
              <div style="margin: 0px auto;">
                <Lottie :options="defaultOptions5" :width="200"/>
              </div>
            </div>
            <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucune promotion</h5>
            <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos promotions apparaîtront ici.</div>
          </div>
        </div>
      </div>

      
    
      <!-- multistream popup -->
      <div v-if="popupMultistream" class="store-products-item__login-popup store-products-item__login-popup--active multistream">
        <div @click="hideMultistream()" style="display: flex;">
          <div class="scroll-indicator"></div>
        </div>
        <div class="multistream-box">
          <span class="multistream-title">Connexion Streaming</span>
        </div>

        <div class="items" style="overflow: scroll; padding: 15px 15px 40px;">
          <div class="multistream-div" style="margin-bottom: 15px;">
            <div @click="showFacebook()" class="multistream-card">
              <img :src="require(`@/assets/img/facebook.svg`)"/>
              <div class="subtitle">Facebook</div>
              <div class="available" style="">Disponible</div>
            </div>
            <div class="multistream-card">
              <img :src="require(`@/assets/img/instagram.svg`)"/>
              <div class="subtitle">Instagram</div>
              <div class="unavailable">A venir</div>
            </div>
          </div>
          <div class="multistream-div">
            <div class="multistream-card">
              <img :src="require(`@/assets/img/tiktok.svg`)"/>
              <div class="subtitle">Tiktok</div>
              <div class="unavailable">A venir</div>
            </div>
            <div class="multistream-card">
              <img :src="require(`@/assets/img/youtube.svg`)"/>
              <div class="subtitle">Youtube</div>
              <div class="unavailable">A venir</div>
            </div>
          </div>
        </div>
      </div>


      <!-- facebook popup -->
      <div v-if="popupFacebook" class="store-products-item__login-popup store-products-item__login-popup--active facebook">
        <div @click="hideFacebook()" style="display: flex;">
          <div class="scroll-indicator"></div>
        </div>
        <div class="header">
          <span class="title">Facebook</span>
        </div>
        <div class="items facebook-items">
          <div class="top-author">
            <div class="top-author--container" style="padding-top: 0px;">
              <!-- profile -->
              <div class="facebook-title">
                <div class="video-page__influencer-username2">Profil</div>
              </div>
              <div class="top-author--item" style="box-shadow: none; padding: 0px;">
                <img v-if="user.picture" :src="cloudinary256x256 + user.picture"/>
                <img v-else :src="require(`@/assets/img/anonyme.jpg`)"/>
                <div><span>{{ user.firstname }} {{ user.lastname }}</span></div>
                <span class="filter--choice">
                  <label class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-g5gk3y">
                    <span @click="checkProfile()" class="MuiSwitch-root MuiSwitch-sizeMedium css-1nvvhq">
                      <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1hei3uy" :class="{'Mui-checked': isProfileChecked }">
                        <input class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3" type="checkbox" value="true" :checked="isProfileChecked" id="profile" v-model="isProfileChecked">
                        <span class="MuiSwitch-thumb css-byglaq"></span>
                        <span class="MuiTouchRipple-root css-w0pj6f"></span>
                      </span><span class="MuiSwitch-track css-1ju1kxc"></span>
                    </span>
                  </label>
                </span>
              </div>

              <!-- pages -->
              <hr class="facebook-hr"/>
              <div class="facebook-title">
                <div class="video-page__influencer-username2">Pages</div>
                <div v-if="!isShowPages" @click="showPages()" style="margin-right: 12px; color: #ff2a80;">Activer</div>
              </div>
              <div v-if="pages.length > 0" v-for="(page, index) in pages" class="top-author--item" style="box-shadow: none; padding: 0px">
                <img :src="page.picture.data.url"/>
                <div><span>{{ page.name }}</span></div>
                <span class="filter--choice">
                  <label :for="'page-' + page.id" class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-g5gk3y">
                    <span class="MuiSwitch-root MuiSwitch-sizeMedium css-1nvvhq">
                      <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1hei3uy" :class="{'Mui-checked': page.selected }">
                        <input :id="'page-' + page.id" :checked="page.selected" v-model="page.selected" @change="onPageSelectionChanged(page, index)" class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3" type="checkbox">
                        <span class="MuiSwitch-thumb css-byglaq"></span>
                        <span class="MuiTouchRipple-root css-w0pj6f"></span>
                      </span><span class="MuiSwitch-track css-1ju1kxc"></span>
                    </span>
                  </label>
                </span>
              </div>

              <!-- groups -->
              <hr class="facebook-hr"/>
              <div class="facebook-title">
                <div class="video-page__influencer-username2">Groupes</div>
                <div v-if="!isShowGroups" @click="showGroups()" style="margin-right: 12px; color: #ff2a80;">Activer</div>
              </div>
              <div v-if="groups.length > 0" v-for="(group, index) in groups" class="top-author--item" style="box-shadow: none; padding: 0px">
                <img :src="group.picture.data.url"/>
                <div><span>{{ group.name }}</span></div>
                <span class="filter--choice">
                  <label :for="'group-' + group.id" class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-g5gk3y">
                    <span class="MuiSwitch-root MuiSwitch-sizeMedium css-1nvvhq">
                      <span class="MuiButtonBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary PrivateSwitchBase-root MuiSwitch-switchBase MuiSwitch-colorPrimary css-1hei3uy" :class="{'Mui-checked': group.selected }">
                        <input :id="'group-' + group.id" v-model="group.selected" :checked="group.selected" class="PrivateSwitchBase-input MuiSwitch-input css-1m9pwf3" type="checkbox">
                        <span class="MuiSwitch-thumb css-byglaq"></span>
                        <span class="MuiTouchRipple-root css-w0pj6f"></span>
                      </span><span class="MuiSwitch-track css-1ju1kxc"></span>
                    </span>
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div @click="saveFacebook()" class="btn-swipe btn-facebook">Enregistrer</div>
        </div>
      </div>


      <div :style="{'bottom': safeareaBottom }" @click="start()" style="left: calc(50vw - 75px); position: absolute; z-index: 20;">
        <div style="margin: 0px auto;">
          <Lottie :options="defaultOptions" :width="150" v-on:animCreated="handleAnimation"/>
        </div>
      </div>
    </div>

    <div v-if="counter" class="counter">
      <span class="cssanimation">{{ countdown }}</span>
    </div>

    <div v-if="ready" class="ready">
      <!-- top/bottom filter -->
      <div class="filter-bottom"></div>

      <!-- heart animation -->
      <div class="n7fi1qx3 ni8dbmo4 stjgntxs hzruof5a pmk7jnqg kr520xx4 etr7akla bt9ki6u7 bipmatt0" style="z-index: 100000000">
        <div v-if="anim1" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 1px;">
          <div class="_g19 KeyframeAnimation-js_6">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim2" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 11px;">
          <div class="_g19 KeyframeAnimation-js_8">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim3" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 9px;">
          <div class="_g19 KeyframeAnimation-js_9">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim4" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 13px;">
          <div class="_g19 KeyframeAnimation-js_10">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim5" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">    
          <div class="_g19 KeyframeAnimation-js_11"> 
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim6" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 15px;">
          <div class="_g19 KeyframeAnimation-js_12">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim7" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 1px;">
          <div class="_g19 KeyframeAnimation-js_13">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim8" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_14">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim9" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_15">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim10" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_16">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim11" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_17">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim12" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_18">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim13" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_19">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim14" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_20">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim15" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_21">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim16" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_22">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim17" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_23">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim18" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_24">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim19" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_25">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim20" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_26">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim21" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_27">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim22" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_28">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim23" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_29">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
        <div v-if="anim24" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
          <div class="_g19 KeyframeAnimation-js_30">
            <div class="_g19 KeyframeAnimation-js_7">
              <img :src="require(`@/assets/img/heart-red.svg`)"/>
            </div>
          </div>
        </div>
      </div>
      

      <!-- live badge -->
      <div :style="{'top': safeareaTop2 }" class="bp9cbjyn jk6sbkaj kdgqqoy6 ihh4hy1g qttc61fc rq0escxv pq6dq46d datstx6m jb3vyjys p8fzw8mz qt6c0cv9 pcp91wgn afxn4irw m8weaby5 ee40wjg4 q1gqmpn5 jbu8tgem l44iypv3 badge-live">
        <span class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa ht8s03o8 a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb mdeji52x e9vueds3 j5wam9gi lrazzd5p ljqsnud1">LIVE</span>
      </div>

      <!-- viewers -->
      <div :style="{'top': safeareaTop2 }" class="bp9cbjyn jk6sbkaj kdgqqoy6 ihh4hy1g qttc61fc rq0escxv pq6dq46d datstx6m jb3vyjys p8fzw8mz qt6c0cv9 pcp91wgn afxn4irw m8weaby5 ee40wjg4 badge-viewers">
        <span class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa ht8s03o8 a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb mdeji52x j5wam9gi lrazzd5p ljqsnud1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="fill: white; width: 12px; margin-bottom: 2px; height: 12px;">
            <path d="M572.5 238.1C518.3 115.5 410.9 32 288 32S57.69 115.6 3.469 238.1C1.563 243.4 0 251 0 256c0 4.977 1.562 12.6 3.469 17.03C57.72 396.5 165.1 480 288 480s230.3-83.58 284.5-206.1C574.4 268.6 576 260.1 576 256C576 251 574.4 243.4 572.5 238.1zM432 256c0 79.45-64.47 144-143.9 144C208.6 400 144 335.5 144 256S208.5 112 288 112S432 176.5 432 256zM288 160C285.7 160 282.4 160.4 279.5 160.8C284.8 170 288 180.6 288 192c0 35.35-28.65 64-64 64C212.6 256 201.1 252.7 192.7 247.5C192.4 250.5 192 253.6 192 256c0 52.1 43 96 96 96s96-42.99 96-95.99S340.1 160 288 160z"></path>
          </svg>
          <span style="padding-left: 5px; font-weight: bold;">{{ viewers }}</span>
        </span>
      </div>


      <!-- amount -->
      <div class="bp9cbjyn jk6sbkaj kdgqqoy6 ihh4hy1g qttc61fc rq0escxv pq6dq46d datstx6m jb3vyjys p8fzw8mz qt6c0cv9 pcp91wgn afxn4irw m8weaby5 ee40wjg4 badge-amount" :style="{'top': safeareaTop }">
        <span class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa ht8s03o8 a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb mdeji52x e9vueds3 j5wam9gi lrazzd5p ljqsnud1">
          <span style="font-weight: bold;font-size: 18px;">{{ amount | formatPrice }} €</span>
        </span>
      </div>


      <!-- rotate camera + close -->
      <div :style="{'top': safeareaTop }" class="video-page__influencer-badge4" style="position: absolute; right: 15px; background: rgba(0, 0, 0, 0.25); z-index: 20;">
        <div @click="switchCamera()" class="video-page__influencer-username-holder" style="padding-left: 5px;">
          <span class="video-page__influencer-video-count">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 40px; height: 40px; padding: 10px; fill: white;">
              <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM384 256c0 8.8-7.2 16-16 16H291.3c-6.2 0-11.3-5.1-11.3-11.3c0-3 1.2-5.9 3.3-8L307 229c-13.6-13.4-31.9-21-51-21c-19.2 0-37.7 7.6-51.3 21.3L185 249c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l19.7-19.7C193.4 172.7 224 160 256 160c31.8 0 62.4 12.6 85 35l23.7-23.7c2.1-2.1 5-3.3 8-3.3c6.2 0 11.3 5.1 11.3 11.3V256zM128 320c0-8.8 7.2-16 16-16h76.7c6.2 0 11.3 5.1 11.3 11.3c0 3-1.2 5.9-3.3 8L205 347c13.6 13.4 31.9 21 51 21c19.2 0 37.7-7.6 51.3-21.3L327 327c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-19.7 19.7C318.6 403.3 288 416 256 416c-31.8 0-62.4-12.6-85-35l-23.7 23.7c-2.1 2.1-5 3.3-8 3.3c-6.2 0-11.3-5.1-11.3-11.3V320z"/>
            </svg>
          </span>
        </div>
        <div @click="stop()" class="video-page__influencer-username-holder">
          <span class="video-page__influencer-video-count" style="margin-left: 5px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 40px; height: 40px; padding: 8px; fill: white;">
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
            </svg>
          </span>
        </div>
      </div>


      <!-- comments -->
      <div v-if="comments.length" class="scrollToMe" ref="scrollToMe" :style="[ comments.length > 3 ? {'-webkit-mask-image': '-webkit-gradient(linear, 0% 0%, 0% 20%, from(rgba(0, 0, 0, 0)), to(#272c30))', 'bottom': safeareaBottom3 } : { 'bottom': safeareaBottom3 } ]" style="margin-right: 50px;">
        <div v-for="comment in comments" style="display: flex;">
          <div class="video-page__influencer-img" style="padding-right: 6px;">
            <img v-if="comment.user.picture" :src="cloudinary256x256 + comment.user.picture">
            <img v-else :src="require(`@/assets/img/anonyme.jpg`)">
          </div>
          <div class="video-page__influencer-badge">
            <div class="video-page__influencer-username-holder">
              <div class="video-page__influencer-username" style="line-height: 18px;"> 
                <div v-if="comment.user.vendor" class="username">{{ comment.user.vendor.businessName }}</div>
                <div v-else class="username">{{ comment.user.firstname }} {{ comment.user.lastname }}</div>
                <div class="content">{{ comment.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- product -->
      <div v-if="liveProducts.length" class="video-page__product-box" :style="{'bottom': safeareaBottom2 }">
        <div class="video-page__product-top">
          <div class="video-page__image">
            <img v-if="liveProducts[0].product.uploads.length" :src="cloudinary256x256 + liveProducts[0].product.uploads[0].filename">
            <img v-else :src="require(`@/assets/img/no-preview.png`)">
          </div>
          <div class="video-page__info">
            <div>
              <h5 class="video-page__name"> {{ liveProducts[0].product.title }}</h5>
            </div>
            <div class="video-page__price-row">
              <div class="video-page__price">
                <div class="video-page__price-line">
                  <div class="video-page__price" :style="[liveProducts[0].product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]">{{ liveProducts[0].product.price | formatPrice }}€
                    <span v-if="liveProducts[0].product.compareAtPrice" class="disc" style="font-size: 13px; text-decoration: line-through; color: #999; padding-left: 3px; font-weight: 500;">{{ liveProducts[0].product.compareAtPrice | formatPrice }}€ <img v-if="user.vendor.promotions.find(promo => promo.isActive === true)" :src="require(`@/assets/img/discount.svg`)" style="width: 22px; height: 22px; transform: rotate(-30deg); margin-bottom: 5px; margin-left: 9px;"/></span>
                  </div>
                  <div class="price stock-available" v-if="available">{{ available }} en stock</div>
                  <div class="price stock-unavailable" v-else-if="available == 0">Épuisé</div>
                </div>
              </div>
            </div>
          </div>  
          <div v-if="liveProducts.length > 1" @click="changeProduct()" class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count" style="padding: 20px 10px;">
              <img :src="require(`@/assets/img/next-product.svg`)" style="width: 40px; height: 40px; margin-right: 7px;"/>
            </span>
          </div>
        </div>
      </div>


      <!-- send comment -->
      <div @click="openPopup()" class="video-page__influencer-badge-send" :style="{'bottom': safeareaBottom }" style="background: rgba(0, 0, 0, 0.25); left: 15Px; right: 180px;">
        <div class="video-page__influencer-username-holder">
          <div class="video-page__influencer-username" style="color: white; font-size: 15px; font-weight: 600;"> Commenter...</div>
        </div>
      </div>


      <div :style="{'bottom': safeareaBottom }" style="position: absolute; background-color: rgba(0, 0, 0, 0.25); right: 15px; display: flex; position: absolute; z-index: 20; border-radius: 25px; align-items: center;">

        <!-- orders -->
        <div @click="showOrders()" class="video-page__influencer-username-holder" style="padding-left: 5px;padding-right: 5px;">
          <span class="video-page__influencer-video-count">
            <img :src="require(`@/assets/img/bag.svg`)" style="width: 23px; padding: 0px; height: 23px; width: 40px; height: 40px; padding: 8px;" />
          </span>
        </div>

        <!-- viewer -->
        <div @click="showViewers" class="video-page__influencer-username-holder" style="padding-right: 5px;">
          <span class="video-page__influencer-video-count">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 38px;height: 40px;padding: 10px 0px;fill: white;">
            <path d="M572.5 238.1C518.3 115.5 410.9 32 288 32S57.69 115.6 3.469 238.1C1.563 243.4 0 251 0 256c0 4.977 1.562 12.6 3.469 17.03C57.72 396.5 165.1 480 288 480s230.3-83.58 284.5-206.1C574.4 268.6 576 260.1 576 256C576 251 574.4 243.4 572.5 238.1zM432 256c0 79.45-64.47 144-143.9 144C208.6 400 144 335.5 144 256S208.5 112 288 112S432 176.5 432 256zM288 160C285.7 160 282.4 160.4 279.5 160.8C284.8 170 288 180.6 288 192c0 35.35-28.65 64-64 64C212.6 256 201.1 252.7 192.7 247.5C192.4 250.5 192 253.6 192 256c0 52.1 43 96 96 96s96-42.99 96-95.99S340.1 160 288 160z"></path>
            </svg>
          </span>
        </div>

        <!-- likes -->
        <div @click="addAnimation()" class="video-page__influencer-username-holder">
          <span class="video-page__influencer-video-count">
            <img :src="require(`@/assets/img/heart-feed.svg`)" style="width: 40px; height: 40px; padding: 8px; margin: 0px 4px;" />
          </span>
        </div>
      </div>

        

      <!-- input comment -->
	    <div v-if="popup" class="css-1dko8fk" :style="{'bottom': writeInput }" style="height: 55px; border-radius: 0px;">
	      <div class="css-miqn2j">
	        <input v-focus v-on-clickaway="away" placeholder="Aa" type="text" class="css-9gu6qp" v-model="content" style="padding: 10px 0px 10px 15px; font-size: 14px; background: rgb(244, 244, 244); border-radius: 30px; font-weight: 400;"/>
	      </div>
	      <button id="buttonSend" :class="{'Mui-disabled': content.length == 0 }" class="css-il3d4y">
	        <svg id="svgSend" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
	          <path id="pathSend" d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12L2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" fill="currentColor"></path>
	        </svg>
	      </button>
	    </div>



      <!-- popup orders -->
      <div v-if="popupOrders" class="store-products-item__login-popup store-products-item__login-popup--active popup-orders">
        <div @click="hideOrders()" style="display: flex;">
          <div class="scroll-indicator"></div>
        </div>
        <div class="orders-box">
          <span class="orders-title">Commandes</span>
        </div>

        <div class="top-author" style="margin-top: 15px;">
          <div v-if="orders && orders.length > 0" class="top-author--container" style="margin-bottom: 40px;">
            <div v-for="order in orders" class="top-author--item" style="position: relative">
              <img v-if="order.upload" :src="cloudinary256x256 + order.upload"/>
              <img v-else :src="require(`@/assets/img/no-preview.png`)"/>
              <span class="order-counter">{{ order.nbProducts }}</span>
              <div>
                <div><span>#{{ order.number }}</span></div>
                <span v-if="order.buyer.vendor">{{ order.buyer.vendor.businessName }}</span>
                <span v-else>{{ order.buyer.firstname }} {{ order.buyer.lastname }}</span>
                <div><span style="font-size: 11px; color: #999;">{{ order.createdAt | formatDate }}</span></div>
              </div>
              <span class="css-4ioo3c">{{ order.amount | formatPrice }}€</span>
            </div>
          </div>
          <div v-else class="checkout__body">
            <div class="container" style="margin: 0px auto; text-align: center;">
              <div style="margin: 0px auto;">
                <Lottie :options="defaultOptions3" :width="180"/>
              </div>
            </div>
            <h5 class="orders-none">Aucune commande</h5>
            <div class="orders-none-text">Vos commandes apparaîtront ici.</div>
          </div>
        </div>
      </div>



      <!-- popup view users -->
      <div v-if="popupViewers" class="store-products-item__login-popup store-products-item__login-popup--active popup-viewers">
        <div @click="hideViewers()" style="display: flex;">
          <div class="scroll-indicator"></div>
        </div>
        <div class="viewers-box">
          <span class="viewers-title">Spectateurs</span>
        </div>

        <div class="top-author" style="margin-top: 15px;">
          <div v-if="spectators && spectators.length > 0" class="top-author--container" style="gap: 0px; margin-bottom: 40px;">
            <div v-for="(user, index) in spectators" class="top-author--item" style="box-shadow: none;">
              <img v-if="user.picture" class="user" :src="cloudinary256x256 + user.picture">
              <img v-else class="user" :src="require(`@/assets/img/anonyme.jpg`)">
              <div>
                <span v-if="user.vendor">{{ user.vendor.businessName }}</span>
                <span v-else>{{ user.firstname }} {{ user.lastname }}</span>
              </div>
              <div @click="bannedViewer(user.id, index)">
                <img :src="require(`@/assets/img/ban.svg`)" style="width: 24px !important; height: 24px !important;"/>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="container" style="margin: 0px auto; text-align: center;">
            <div style="margin: 50px auto 0px;">
              <Lottie :options="defaultOptions2" :width="220"/>
            </div>
            </div>
            <h5 class="viewers-none">Aucun spectateur</h5>
            <div class="viewers-none-text">Vos spectateurs apparaîtront ici.</div>
          </div>
        </div>
      </div>
    </div>


    <div v-if="performance" class="store-products-item__login-popup store-products-item__login-popup--active performance" style="overflow-y: scroll; height: 100%; width: 100vw; padding: 0px 15px 15px; left: 0px; background: white; border-radius: none;">
      <div class="checkout__header">
        <div class="checkout__title">Performance</div>
      </div>

      <div class="checkout__body">
        <div class="cards-main">
          <div class="container" style="text-align: center;">
            <div style="margin: 0px auto;">
              <Lottie :options="defaultOptions4" :width="200"/>
            </div>
          </div>
          <div class="performance-title">Bravo {{ user.vendor.businessName }} !</div>
          <p class="performance-p">Voici quelques statistiques du live.</p>
          <div class="performance-bloc" style="margin-top: 30px;">
            <div class="performance-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="fill: rgb(104, 92, 240);">
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"></path>
              </svg>
              <h4 class="performance-h4">{{ countViews }}</h4>
              <div v-if="countViews > 1" class="performance-text">Vues</div>
              <div v-else class="performance-text">Vue</div>
            </div>
            <div class="performance-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="fill: #ff2a80;">
                <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
              </svg>
              <h4 class="performance-h4">{{ countLikes|formatLikes }}</h4>
              <div v-if="countLikes > 1" class="performance-text">Likes</div>
              <div v-else class="performance-text">Like</div>
            </div>
          </div>
          <div class="performance-bloc">
            <div class="performance-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="fill: #FFB800;">
                <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 96c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm200-24c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24z"></path>
              </svg>
              <h4 class="performance-h4">{{ countOrders }}</h4>
              <div v-if="countOrders > 1" class="performance-text">Commandes</div>
              <div v-else class="performance-text">Commande</div>
            </div>
            <div class="performance-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="fill: #73D751;">
                <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 336c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
              <h4 class="performance-h4">{{ amount|formatPrice }}€</h4>
              <div class="performance-text">Montant</div>
            </div>
          </div>
          <div v-if="countOrders > 0" @click="goOrders()" class="btn-swipe btn-orders">Voir les commandes</div>
          <div v-else @click="goBack()" class="btn-swipe btn-orders">Terminer</div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped src="../../assets/css/live.css"></style>

<script>
import Pusher from 'pusher-js';
import Lottie from 'vue-lottie';
import { mixin as clickaway } from 'vue-clickaway';
import * as animationData from '../../assets/lottie/golive.json';
import * as animationData2 from '../../assets/lottie/no-viewer.json';
import * as animationData3 from '../../assets/lottie/no-order.json';
import * as animationData4 from '../../assets/lottie/trophy.json';
import * as animationData5 from '../../assets/lottie/discount.json';

export default {
  name: 'Feed',
  mixins: [ clickaway ],
  components: {
    Lottie
  },
  data() {
    return {
      id: this.$route.params.id,
      baseUrl: window.localStorage.getItem("baseUrl"),
      user: this.$store.getters.getUser,
      token: window.localStorage.getItem("token"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      defaultOptions: {animationData: animationData},
      defaultOptions2: {animationData: animationData2},
      defaultOptions3: {animationData: animationData3},
      defaultOptions4: {animationData: animationData4},
      defaultOptions5: {animationData: animationData5},
      comments: [],
      purchases: [],
      liveProducts: [],
      live: [],
      orders: [],
      spectators: [],
      pusher: null,
      broadcaster: null,
      http: null,
      viewers: 0,
      display: 1,
      browser: false,
      video: false,
      prelive: true,
      ready: false,
      performance: false,
      counter: false,
      popup: false,
      errListenerId: false,
      broadcastListenerId: false,
      statusListenerId: false,
      isProfileChecked: false,
      isShowPages: null,
      isShowGroups: null,
      safeareaTop: '0px',
      safeareaTop2: '7px',
      safeareaBottom: '0px',
      safeareaBottom2: '57px',
      safeareaBottom3: '185px',
      writeInput: '0px',
      content: "",
      countdown: 3,
      interval: null,
      type: null,
      title: null,
      discount: null,
      showGroupsPage: false,
      popupFacebook: false,
      popupViewers: false,
      popupMultistream: false,
      popupPromo: false,
      popupOrders: false,
      groups: [],
      pages: [],
      profile: [],
      profil: false,
      errorTitle: false,
      errorType: false,
      errorDiscount: false,
      facebook: false,
      countLikes: 0,
      countViews: 0,
      countOrders: 0,
      amount: "0.00",
      available: null,
      fbToken: null,
      fbTokenPage: null,
      fbIdentifier: null,
      fbPageIdentifier: null,
      fbStreamId: null,
      nextGroupPage: null,
      promotion: {
        'title': '',
        'type': '',
        'value': null,
        'isActive': true
      },
      anim1: false,
      anim2: false,
      anim3: false,
      anim4: false,
      anim5: false,
      anim6: false,
      anim7: false,
      anim8: false,
      anim9: false,
      anim10: false,
      anim11: false,
      anim12: false,
      anim13: false,
      anim14: false,
      anim15: false,
      anim16: false,
      anim17: false,
      anim18: false,
      anim19: false,
      anim20: false,
      anim21: false,
      anim22: false,
      anim23: false,
      anim24: false,
      num: 0,
    }
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDate(datetime) {
      console.log(datetime);
      const date = new Date(datetime);
      return date.toLocaleDateString(navigator.language) + " " + date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    },
    formatLikes(value) {
      if (value < 1000) {
        return value;
      } else if (value < 1000000) {
        return (value / 1000).toFixed(2) + 'k';
      } else {
        return (value / 1000000).toFixed(2) + 'm';
      }
    }
  },
  created() {
    window.StatusBar.styleLightContent();
    window.StatusBar.overlaysWebView(true);
    document.getElementsByTagName('body')[0].classList.add("dark-mode");

    if (window.cordova.plugin && window.cordova.plugin.http) {
      this.http = window.cordova.plugin.http;
      this.http.setDataSerializer('json');
    }

    if (window.cordova && window.cordova.platformId === "browser") {
      this.browser = true;
    }

    if (window.cordova && window.cordova.platformId === "ios") {
      this.safeareaTop = 'calc(env(safe-area-inset-top) + 0px)';
      this.safeareaTop2 = 'calc(env(safe-area-inset-top) + 7px)';
      this.safeareaBottom = 'calc(env(safe-area-inset-bottom) + 0px)';
      this.safeareaBottom2 = 'calc(env(safe-area-inset-bottom) + 57px)';
      this.safeareaBottom3 = 'calc(env(safe-area-inset-bottom) + 185px)';
    }

    if (window.cordova && window.cordova.platformId === "android") {
      this.safeareaTop = '25px';
      this.safeareaTop2 = '32px';
      this.safeareaBottom = '25px';
      this.safeareaBottom2 = '82px';
      this.safeareaBottom3 = '210px';
    }

    this.initiateBroadcast();
  },
  beforeDestroy() {
    document.getElementsByTagName('body')[0].classList.remove("dark-mode");
    document.getElementsByTagName('body')[0].classList.remove("show-viewfinder");
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    goBack() {
      if (this.broadcaster) {
        this.broadcaster.hideViewfinder();
      }
      if (this.performance) {
        this.$router.push({ name: 'Account' });
      } else {
        this.$router.push({ name: 'PreLive' });
      }
    },
    openPopup() {
      this.popup = true;
    },
    changeProduct() {
      if (this.liveProducts.length > 1) {
        if (window.TapticEngine) {
          TapticEngine.impact({ style: 'medium' });
        }
        this.display = this.display + 1;
        this.liveProducts.shift();
        this.available = this.checkQuantity();
        
        this.http.put(this.baseUrl + "/user/api/live/" + this.id + "/update/display", { "display": this.display }, { Authorization: "Bearer " + this.token }, (response) => {
        }, (response) => {
          console.log(response.error);
        });
      }
    },
    away(event) {
      if (event.target.id == "buttonSend" || event.target.id == "svgSend" || event.target.id == "pathSend") {
        if (this.content && this.content.length > 0) {
          this.send();
        }
      } else if (event.target.className !== "css-1dko8fk" && event.target.className !== "css-miqn2j") {
        this.popup = false;
        this.content = "";
      }
    },
    send() {
      this.popup = false;
      var content = this.content;
      this.content = "";
      this.comments.push({ "content": content, "user": { "vendor": { "businessName": this.user.vendor.businessName }, "firstname": this.user.firstname, "lastname": this.user.lastname, "picture": this.user.picture } });
      this.scrollToElement();

      this.http.post(this.baseUrl + "/user/api/live/" + this.id + "/comment/add", { "content": content }, { Authorization: "Bearer " + this.token }, (response) => {
      }, (response) => {
        console.log(response.error);
      });
    },
    scrollToElement() {
      var el = this.$refs.scrollToMe;

      if (el) {
        setTimeout(() => {
          el.scrollTop = el.scrollHeight;
        }, 500)
      }
    },
    bannedViewer(userId, index) {
      console.log(userId, index);
      var filtersList = this.spectators.filter(element => element.id !== userId);
      this.spectators = filtersList;

      this.http.get(this.baseUrl + "/user/api/live/" + this.id + "/update/banned/" + userId, {}, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(response);
      }, (response) => { 
        console.log(response.error); 
      });
    },
    async initiateBroadcast() {
      if (window.bambuser && window.bambuser.broadcaster && (window.cordova.platformId === "ios" || window.cordova.platformId === "android")) {
        try {
          if (window.cordova && window.cordova.platformId === "ios") {
            await window.bambuser.broadcaster.setApplicationId("Eqza0IhJO8JKQTs37D0VKQ");
          } else {
            await window.bambuser.broadcaster.setApplicationId("7a1Fm1qdrF4bYhnTfZosPA");
          }
          await window.bambuser.broadcaster.switchCamera();
          this.showBroadcast();
        } catch (e) {
          this.showBroadcast();
        }
      } else {
        this.showBroadcast();
      }
    },
    async showBroadcast() {
      if (window.bambuser && window.bambuser.broadcaster && (window.cordova.platformId === "ios" || window.cordova.platformId === "android")) {
        this.broadcaster = window.bambuser.broadcaster;

        try {
          await this.broadcaster.setTitle("Live" + this.id);
          await this.broadcaster.setAuthor(this.user.vendor.businessName);
          await this.broadcaster.showViewfinderBehindWebView();

          setTimeout(() => {
            document.getElementsByTagName('body')[0].classList.remove("dark-mode");
            document.getElementsByTagName('body')[0].classList.add("show-viewfinder");
          }, 500);
        } catch (e) {
          console.log(e);
        }
      } else {
        setTimeout(() => {
          var ressourceUri = "https://cdn.bambuser.net/broadcasts/20057381-f1d8-6fc1-1aa6-6fc9a896afc0?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1671610447&da_static=1&da_ttl=0&da_signature=f19839f85cb0bcf6376f8816b899ee4c79728afd8087a23ddeb5307c0d4e345d";
          this.video = window.BambuserPlayer.create(document.getElementById('player'), ressourceUri);
          this.video.scaleMode = "aspectFill";
          this.video.play();
        }, 200);
      }
    },
    async start() {
      if (this.broadcaster) {
        try {
          if (window.TapticEngine) {
            TapticEngine.impact({ style: 'medium' });
          }
          await this.broadcaster.startBroadcast();
          this.listenForError();
          this.listenForBroadcastId();
          this.listenForStatusChange();
          this.prelive = false;
          this.counter = true;

          this.interval = setInterval(() => {
            if (this.countdown == 1) {
              this.counter = false;
              this.ready = true;
              clearInterval(this.interval);
            }
            this.countdown = this.countdown - 1;
          }, 700);
        } catch (e) {
          console.log('Failed to start broadcast', e);
        }
      } else {
        this.prelive = false;
        this.counter = false;
        this.ready = true;

        this.http.put(this.baseUrl + "/user/api/live/update/" + this.id, { "broadcastId" : "test", "fbIdentifier": this.fbIdentifier, "fbToken": this.fbToken }, { Authorization: "Bearer " + this.token }, (response) => {
          this.live = JSON.parse(response.data);
          this.liveProducts = this.live.liveProducts;
          this.available = this.checkQuantity();

          this.pusher = new Pusher('55da4c74c2db8041edd6', { cluster: 'eu' });
          var channel = this.pusher.subscribe(this.live.channel);
        }, (response) => {
          console.log(response.error);
        });
      }
    },
    checkQuantity() {
      var product = this.liveProducts[0].product;
      if (product.quantity === 0) {
        return 0;
      } else if (product.variants.length > 0 && this.totalVariantQuantity(product.variants) === 0) {
        return 0;
      } else if (product.variants.length === 0) {
        return product.quantity;
      } else {
        var quantity = this.totalVariantQuantity(product.variants);
        return quantity;
      }
    },
    totalVariantQuantity(variants) {
      return variants.reduce((total, variant) => total + variant.quantity, 0);
    },
    async stop() {
      window.StatusBar.overlaysWebView(false);
      window.StatusBar.styleDefault();
      window.StatusBar.backgroundColorByHexString("#ffffff");
      
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }

      this.ready = false;
      this.performance = true;

      if (this.broadcaster) {
        this.broadcaster.hideViewfinder();
        this.pusher.unsubscribe(this.live.channel);

        try {
          await this.broadcaster.stopBroadcast();
        } catch (e) {
          console.log('Failed to stop broadcast', e);
        }
      }

      if (this.browser) {
        this.video = null;
        if (document.getElementById('player')) {
          document.getElementById('player').remove();
        }
      }

      this.http.put(this.baseUrl + "/user/api/live/stop/" + this.id, { "fbStreamId": this.fbStreamId, "fbToken": this.fbToken }, { Authorization: "Bearer " + this.token }, (response) => {
        this.$store.commit('setUser', JSON.parse(response.data));
        this.user = JSON.parse(response.data);
      }, (response) => {
        console.log(response.error);
      });
    },
    switchCamera() {
      if (this.broadcaster) {
        this.broadcaster.switchCamera();
      }
    },
    listenForError() {
      if (!this.errListenerId) {
        this.errListenerId = this.broadcaster.addEventListener('connectionError', status => {
          console.log("Une erreur est survenue : " + status);
          window.plugins.toast.show("Une erreur est survenue !", 'long', 'top');

          this.broadcaster.hideViewfinder();
          this.broadcaster.removeEventListener(this.errListenerId);
          this.pusher.unsubscribe(this.live.channel);
          this.ready = false;
          this.performance = true;
        });
      }
    },
    listenForBroadcastId() {
      if (!this.broadcastListenerId) {
        this.broadcastListenerId = this.broadcaster.addEventListener('broadcastIdAvailable', broadcastId => {
          console.log("broadcastId : " + broadcastId);

          this.broadcaster.removeEventListener(this.broadcastListenerId);
          this.http.put(this.baseUrl + "/user/api/live/update/" + this.id, { "broadcastId" : broadcastId }, { Authorization: "Bearer " + this.token }, (response) => {
            this.live = JSON.parse(response.data);
            this.liveProducts = this.live.liveProducts;
            this.available = this.checkQuantity();
            this.pusher = new Pusher('55da4c74c2db8041edd6', { cluster: 'eu' });
            var channel = this.pusher.subscribe(this.live.channel);

            channel.bind(this.live.event, (data) => {
              console.log(data);

              if ('comment' in data) {
                if (data.comment.user.firstname != this.user.firstname && data.comment.user.lastname != this.user.lastname) {
                  this.comments.push(data.comment);
                  this.scrollToElement();
                }
              }

              if ('viewers' in data) {
                if (data.viewers.count > this.viewers) {
                  this.countViews += 1;
                }
                this.viewers = data.viewers.count;

                if (data.viewers.type == "add") {
                  this.spectators.push(data.viewers.user);
                } else {
                  var filtersList = this.spectators.filter(element => element.id !== data.viewers.user.id);
                  this.spectators = filtersList;
                }
              }

              if ('likes' in data) {
                this.countLikes += 1;
                if (data.likes != this.user.id) {
                  this.showAnimation();
                }
              }

              if ('order' in data) {
                this.countOrders += 1;
                this.amount = parseFloat(this.amount) + parseFloat(data.order.amount);
                this.amount = this.amount.toFixed(2);
                data.order.createdAt = new Date();
                this.orders.unshift(data.order);
                this.available = data.order.available;
              }
            });
          }, (response) => {
            console.log(response.error);
          });

          if (this.isShowPages) {
            this.pages = this.pages.filter(page => page.selected);
          }

          if (this.isShowGroups) {
            this.groups = this.groups.filter(group => group.selected);
          }

          console.log(this.pages);
          console.log(this.groups);

          // stream on facebook
          if (this.fbToken) {
            this.http.put(this.baseUrl + "/user/api/live/update/stream/" + this.id, { "broadcastId" : broadcastId, "fbIdentifier" : this.fbIdentifier, "fbToken": this.fbToken, "fbPageIdentifier" : this.fbPageIdentifier, "fbTokenPage": this.fbTokenPage, "showGroupsPage": this.showGroupsPage, "pages": this.pages, "groups": this.groups }, { Authorization: "Bearer " + this.token }, (response) => {
              var result = JSON.parse(response.data);
              this.fbStreamId = result.fbStreamId; 
              console.log(this.fbStreamId);

              var url = 'https://streaming-graph.facebook.com/' + this.fbStreamId + '/live_comments?access_token=' + this.fbToken + '&comment_rate=ten_per_second&fields=from{name,id},message';
              var source = new EventSource(url);
              console.log(source);

              source.onmessage = function(event) {
                console.log(event);
              };
              source.onerror = function(error) {
                console.log('error', error);
              };
              source.open = function(open) {
                console.log(open);
              };
            }, (response) => {
              console.log(response.error);
            });
          }
        }, (response) => {
          console.log(response.error);
        });
      }
    },
    listenForStatusChange() {
      if (!this.statusListenerId) {
        this.statusListenerId = this.broadcaster.addEventListener('connectionStatusChange', status => {
          console.log("status change : " + status);

          if (status == "reconnecting") {
            window.plugins.toast.show('Tentative de reconnexion ...', 'long', 'top');
          }

          if (status == "finishing") {
            this.broadcaster.hideViewfinder();
            this.broadcaster.removeEventListener(this.statusListenerId);
            this.pusher.unsubscribe(this.live.channel);
          }
        });
      }
    },
    showFacebook() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.popupMultistream = false;

      window.facebookConnectPlugin.login(["public_profile", "publish_video"], (response) => {
        console.log(response);
        this.fbToken = response.authResponse.accessToken;
        this.fbIdentifier = response.authResponse.userID;
        this.popupFacebook = true;
      }, (loginError) => {
        console.log(loginError);
      });
    },
    hideFacebook() {
      this.popupFacebook = false;
    },
    saveFacebook() {
      this.popupFacebook = false;
      this.facebook = true;
    },
    showPages() {
      this.isShowPages = true;
      var url = this.fbIdentifier + "/accounts?fields=name,access_token,picture.type(large)&access_token=" + this.fbToken;

      window.facebookConnectPlugin.api(url, ["pages_manage_posts", "pages_show_list", "public_profile", "publish_video"], async (result) => {
        result.data.map((page, index) => {
          page.selected = false;
          this.pages.push(page);
        });
      }, (error) => {
        console.error("Failed to retrieve pages : ", error);
      });
    },
    showGroups() {
      this.isShowGroups = true;
     
      if (this.showGroupsPage) {
        var url = this.fbPageIdentifier + "/groups?fields=name,picture.type(large)&access_token=" + this.fbTokenPage;
      } else {
        var url = this.fbIdentifier + "/groups?fields=name,picture.type(large)&access_token=" + this.fbToken;
      }

      window.facebookConnectPlugin.api(url, ["publish_to_groups", "public_profile", "publish_video"], async (result) => {
        console.log(result);
        result.data.map((group, index) => {
          group.selected = false;
          this.groups.push(group);
        });

        if ('cursors' in result.paging) {
          if ('after' in result.paging.cursors) {
            this.getAllData(result.paging.cursors.after, this.showGroupsPage);
          }
        }
      }, (error) => {
        console.error("Failed to retrieve groups : ", error);
      });
    },
    async getAllData(after, showGroupsPage) {
      console.log(this.groups);

      if (this.showGroupsPage) {
        var url = this.fbPageIdentifier + "/groups?fields=name,picture.type(large)&access_token=" + this.fbTokenPage + "&after=" + after;
      } else {
        var url = this.fbIdentifier + "/groups?fields=name,picture.type(large)&access_token=" + this.fbToken + "&after=" + after;
      }

      window.facebookConnectPlugin.api(url, ["publish_to_groups", "public_profile", "publish_video"], async (result) => {
        console.log(result);
        if (result.data.length > 0) {
          result.data.map((group, index) => { 
            group.selected = false;
            this.groups.push(group);
          });


          if ('cursors' in result.paging) {
            if ('after' in result.paging.cursors) {
              this.getAllData(result.paging.cursors.after, this.showGroupsPage);
            }
          }
        }
      }, (error) => {
        console.error("Failed: ", error);
      });
    },
    showViewers() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.popupViewers = true;
    },
    hideViewers() {
      this.popupViewers = false;
    },
    showMultistream() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.popupMultistream = true;
      this.popupPromo = false;
    },
    hideMultistream() {
      this.popupMultistream = false;
    },
    showPromo() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.popupPromo = true;
      this.popupMultistream = false;
    },
    savePromo() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      if (this.promotion.value) {
        this.promotion.value = parseFloat(this.promotion.value);
      }

      if (this.promotion.type == 'fixe' || (this.promotion.type == 'percent' && this.promotion.value < 100)) {
        this.promotion.vendor = this.user.id;
        this.promotion.title = this.promotion.title.toUpperCase();
        this.user.vendor.promotions.map((promo, index) => {
          promo.isActive = false;
        });
        this.user.vendor.promotions.unshift(this.promotion);

        window.cordova.plugin.http.setDataSerializer('json');
        window.cordova.plugin.http.post(this.baseUrl + "/user/api/promotion/add", this.promotion, { Authorization: "Bearer " + this.token }, (response) => {
          this.$store.commit('setUser', JSON.parse(response.data));
          this.user = this.$store.getters.getUser;
          this.promotion = { 'title': '', 'type': '', 'value': null, 'isActive': true };
        }, (response) => {
          console.log(JSON.parse(response.error));
        });
      }
    },
    deletePromo(promo, index) {
      this.user.vendor.promotions.splice(index, 1);
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/promotion/delete/" + promo.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.$store.commit('setUser', JSON.parse(response.data));
      }, (response) => {
        console.log(response.error);
      });
    },
    check(promo) {
      if(promo.isActive) {
        promo.isActive = false;
      } else {
        this.user.vendor.promotions.map((promotion, index) => {
          promotion.isActive = false;
        });
        promo.isActive = true;
      }

      window.cordova.plugin.http.get(this.baseUrl + "/user/api/promotion/activate/" + promo.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.$store.commit('setUser', JSON.parse(response.data));
        this.user = this.$store.getters.getUser;
      }, (response) => {
        console.log(response.error);
      });
    },
    hidePromo() {
      this.popupPromo = false;
    },
    showOrders() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.popupOrders = true;
    },
    hideOrders() {
      this.popupOrders = false;
    },
    goOrders() {
      this.$router.push({ name: 'ListOrders', params: { 'isOrder': true } });
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    addAnimation() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.showAnimation();

      this.http.put(this.baseUrl + "/user/api/live/" + this.id + "/update/likes", {}, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(response);
      }, (response) => { 
        console.log(response.error); 
      });
    },
    checkProfile() {
      if(this.isProfileChecked == true) {
       this.isProfileChecked = false;
      } else {
        if (this.isShowPages && this.pages.length > 0) {
          this.pages.map((page, index) => { 
            page.selected = false;
          });
        }
        this.isProfileChecked = true;
      }
    },
    onPageSelectionChanged(page, index) {
      console.log(page);
      if (page.selected == true) {
        this.pages.map((item, indexPage) => { 
          if (item.id !== page.id) {
            item.selected = false;
          }
        });
        this.isProfileChecked = false;
        this.fbPageIdentifier = page.id;
        this.fbTokenPage = page.access_token;
        // this.showGroupsPage = true;
        // this.showGroups();
      } else {
        // this.showGroupsPage = false;
        // this.showGroups();
      }
    },
    showAnimation() {
      if (this.num == 0 && !this.anim1) {
        this.anim1 = true;

        setTimeout(() => {
          this.anim1 = false;
        }, 2500);
      }

      if (this.num == 1 && !this.anim2) {
        this.anim2 = true;

        setTimeout(() => {
          this.anim2 = false;
        }, 2500);
      }

      if (this.num == 2 && !this.anim3) {
        this.anim3 = true;

        setTimeout(() => {
          this.anim3 = false;
        }, 2500);
      }

      if (this.num == 3 && !this.anim4) {
        this.anim4 = true;

        setTimeout(() => {
          this.anim4 = false;
        }, 2500);
      }
      
      if (this.num == 4 && !this.anim5) {
        this.anim5 = true;

        setTimeout(() => {
          this.anim5 = false;
        }, 2500);
      }

      if (this.num == 5 && !this.anim6) {
        this.anim6 = true;

        setTimeout(() => {
          this.anim6 = false;
        }, 2500);
      }

      if (this.num == 6 && !this.anim7) {
        this.anim7 = true;

        setTimeout(() => {
          this.anim7 = false;
        }, 2500);
      }

      if (this.num == 7 && !this.anim8) {
        this.anim8 = true;

        setTimeout(() => {
          this.anim8 = false;
        }, 2500);
      }

      if (this.num == 8 && !this.anim9) {
        this.anim9 = true;

        setTimeout(() => {
          this.anim9 = false;
        }, 2500);
      }

      if (this.num == 9 && !this.anim10) {
        this.anim10 = true;

        setTimeout(() => {
          this.anim10 = false;
        }, 2500);
      }

      if (this.num == 10 && !this.anim11) {
        this.anim11 = true;

        setTimeout(() => {
          this.anim11 = false;
        }, 2500);
      }

      if (this.num == 11 && !this.anim12) {
        this.anim12 = true;

        setTimeout(() => {
          this.anim12 = false;
        }, 2500);
      }

      if (this.num == 12 && !this.anim13) {
        this.anim13 = true;

        setTimeout(() => {
          this.anim13 = false;
        }, 2500);
      }

      if (this.num == 13 && !this.anim14) {
        this.anim14 = true;

        setTimeout(() => {
          this.anim14 = false;
        }, 2500);
      }

      if (this.num == 14 && !this.anim15) {
        this.anim15 = true;

        setTimeout(() => {
          this.anim15 = false;
        }, 2500);
      }

      if (this.num == 15 && !this.anim16) {
        this.anim16 = true;

        setTimeout(() => {
          this.anim16 = false;
        }, 2500);
      }

      if (this.num == 16 && !this.anim17) {
        this.anim17 = true;

        setTimeout(() => {
          this.anim17 = false;
        }, 2500);
      }

      if (this.num == 17 && !this.anim18) {
        this.anim18 = true;

        setTimeout(() => {
          this.anim18 = false;
        }, 2500);
      }

      if (this.num == 18 && !this.anim19) {
        this.anim19 = true;

        setTimeout(() => {
          this.anim19 = false;
        }, 2500);
      }

      if (this.num == 19 && !this.anim20) {
        this.anim20 = true;

        setTimeout(() => {
          this.anim20 = false;
        }, 2500);
      }

      if (this.num == 20 && !this.anim21) {
        this.anim21 = true;

        setTimeout(() => {
          this.anim21 = false;
        }, 2500);
      }

      if (this.num == 21 && !this.anim22) {
        this.anim22 = true;

        setTimeout(() => {
          this.anim22 = false;
        }, 2500);
      }

      if (this.num == 22 && !this.anim23) {
        this.anim23 = true;

        setTimeout(() => {
          this.anim23 = false;
        }, 2500);
      }

      if (this.num == 23 && !this.anim24) {
        this.anim24 = true;

        setTimeout(() => {
          this.anim24 = false;
        }, 2500);
      }

      if (this.num == 23) {
        this.num = 0;
      } else {
        this.num = this.num + 1;
      }
    },
  }
};

</script>

