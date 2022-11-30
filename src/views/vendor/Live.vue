<template>
  <div class="livestream">
    <div v-if="prelive" class="prelive">

      <!-- rotate camera -->
      <div @click="switchCamera()" :style="{'top': safeareaTop }" class="video-page__influencer-badge4" style="position: absolute; width: 40px; height: 40px; right: 70px; z-index: 1000;">
        <div class="video-page__influencer-username-holder">
          <span class="video-page__influencer-video-count">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 40px; height: 40px; padding: 8px; fill: white;"><path d="M448 96h-72l-8.457-22.51C358.2 48.51 334.3 32 307.6 32H204.4C177.7 32 153.9 48.51 144.5 73.45L136 96H64C28.65 96 0 124.7 0 160v256c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V160C512 124.7 483.3 96 448 96zM464 416c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V160c0-8.822 7.178-16 16-16h105.2l20.19-53.64C191.7 84.16 197.8 80 204.4 80h103.3c6.631 0 12.65 4.172 14.98 10.38L342.7 144H448c8.822 0 16 7.178 16 16V416zM346.9 187.7l-14.76 14.77C311.2 183.8 284.6 173 256 173c-35.64 0-68.69 16.12-90.64 44.22C157.2 227.7 159 242.8 169.5 250.9C179.9 259.1 195 257.2 203.2 246.8c22.5-28.79 67.17-32.26 95.08-10.48l-14.61 14.62C275.9 258.6 281.3 271.7 292.1 272h67.36C364.2 271.9 368 268 368 263.3V196.4C368 185.4 354.7 179.9 346.9 187.7zM308.8 329.2c-22.5 28.79-67.17 32.26-95.08 10.48l14.61-14.62C236.1 317.4 230.7 304.3 219.9 304H152.6C147.8 304.1 144 307.1 144 312.7v66.87c0 11.02 13.33 16.54 21.12 8.74l14.76-14.77C200.8 392.2 227.4 403 256 403c35.64 0 68.69-16.12 90.64-44.22c8.172-10.45 6.312-25.53-4.125-33.69C332.1 316.9 317 318.8 308.8 329.2z"/></svg>
          </span>
        </div>
      </div>

      <!-- close live -->
      <div @click="goBack()" :style="{'top': safeareaTop }" class="video-page__influencer-badge4" style="position: absolute; width: 40px; height: 40px; right: 15px; z-index: 1000; background-color: rgba(255,0,0,.3);">
        <div class="video-page__influencer-username-holder">
          <span class="video-page__influencer-video-count">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 40px; height: 40px; padding: 8px; fill: white;"><path d="M336.1 175c-9.375-9.375-24.56-9.375-33.94 0L256 222.1L208.1 175c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03L175 303c-9.375 9.375-9.375 24.56 0 33.94c9.373 9.373 24.56 9.381 33.94 0L256 289.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0c9.375-9.375 9.375-24.56 0-33.94l-47.03-47.03l47.03-47.03C346.3 199.6 346.3 184.4 336.1 175zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256S512 397.4 512 256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z"/></svg>
          </span>
        </div>
      </div>

      <!-- promo -->
      <div @click="showPromo()" :style="{'top': safeareaTop2 }" class="video-page__influencer-badge4" style="position: absolute; width: 40px; height: 40px; right: 15px; z-index: 1000; border-radius: 8px;">
        <div class="video-page__influencer-username-holder">
          <span class="video-page__influencer-video-count">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 40px; height: 40px; padding: 9px; fill: white;"><path d="M536.5 170.7l-135.7-131.9c-9.453-9.219-24.67-9-33.94 .5c-9.234 9.5-9.016 24.69 .5 33.94l135.5 131.7C519 221.1 528 242.8 528 265.8s-8.969 44.63-25.3 60.95l-111.7 112.4c-9.344 9.406-9.312 24.59 .0938 33.94C395.8 477.7 401.9 480 408 480c6.172 0 12.33-2.359 17.02-7.078l111.7-112.3C562 335.3 576 301.6 576 265.8S562 196.2 536.5 170.7zM463.6 225.6L286.4 48.4C277.4 39.38 259.6 32 246.8 32H60C44.54 32 32 44.54 32 60v186.8c0 12.76 7.381 30.58 16.4 39.6l177.2 177.2c21.87 21.87 57.32 21.87 79.2 .002l158.8-158.8C485.5 282.9 485.5 247.5 463.6 225.6zM144 176c-17.67 0-32-14.32-32-32c0-17.68 14.33-32 32-32s32 14.32 32 32C176 161.7 161.7 176 144 176z"></path></svg>
          </span>
        </div>
      </div>


      <!-- multistream -->
      <div @click="actionSheet()" :style="{'bottom': safeareaBottom }" class="video-page__influencer-badge4" style="position: absolute; height: 40px; z-index: 1000; left: 30px; background: transparent;">
        <div class="video-page__influencer-username-holder">
          <span class="video-page__influencer-video-count" style="display: flex; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 32px; height: 32px; margin-left: 10px;fill: #ff2773;"><defs></defs><path class="fa-primary" d="M288 200C257.1 200 232 225.1 232 256S257.1 312 288 312S344 286.9 344 256S318.9 200 288 200z"/><path class="fa-secondary" d="M64 256c0-51.5 16.98-99.91 49.13-139.1c11.05-13.78 8.844-33.94-4.953-45c-13.75-10.97-33.89-8.812-44.98 4.938C22.44 126.8 0 190.7 0 256c0 65.28 22.44 129.2 63.19 180C69.52 443.9 78.8 448 88.17 448c7.031 0 14.09-2.312 20-7.031c13.8-11.06 16-31.22 4.953-45C80.98 355.9 64 307.5 64 256zM512.8 75.96c-11.09-13.78-31.23-15.97-44.98-4.938c-13.8 11.06-16 31.22-4.953 45C495 156.1 512 204.5 512 256c0 51.5-16.98 99.91-49.13 139.1c-11.05 13.78-8.844 33.94 4.953 45C473.7 445.7 480.8 448 487.8 448c9.375 0 18.66-4.094 24.98-11.97C553.6 385.2 576 321.3 576 256C576 190.7 553.6 126.8 512.8 75.96zM392.3 149.1c-9.962 8.75-10.95 23.91-2.19 33.87c34.97 39.78 34.97 104.5 0 144.3c-8.758 9.969-7.772 25.12 2.19 33.87c4.567 3.1 10.21 5.969 15.84 5.969c6.678 0 13.32-2.75 18.06-8.156c50.33-57.25 50.33-150.4 0-207.7C417.4 142.2 402.3 141.2 392.3 149.1zM183.7 149.1C173.8 141.2 158.6 142.2 149.8 152.2c-50.33 57.25-50.33 150.4 0 207.7c4.739 5.406 11.39 8.156 18.06 8.156c5.614 0 11.28-1.969 15.84-5.969c9.962-8.75 10.95-23.91 2.19-33.87c-34.97-39.78-34.97-104.5 0-144.3C194.7 173.9 193.7 158.7 183.7 149.1z" style="fill: white;"/></svg>
            <div style="margin-left: 10px; font-size: 16px; font-weight: 600;">Diffuser sur les réseaux sociaux</div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: white; width: 16px; height: 16px; margin-left: 10px;">
              <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"
              ></path>
            </svg>
          </span>
        </div>
      </div>

      <!-- multistream popup -->
      <div v-if="popupFacebook" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 100%; top: 30%; padding: 15px;"> 
        <div @click="hideFacebook()" style="float: right;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #525c66;"><path d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z"/></svg>
        </div>
        <div style="display: flex; justify-content: center;">
          <div class="video-page__influencer-username2" style="font-size: 17px; font-weight: 600;">Facebook</div>
        </div>
        <div class="items" style="margin-top: 20px; margin-bottom: 20px;">
          <div class="top-author">
            <div class="top-author--container" style="padding-top: 0px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="video-page__influencer-username2" style="font-size: 15px; font-weight: 500;">Profil</div>
                <div @click="showProfil()" class="btn-swipe" style="color: white;text-align: center;width: fit-content;background: #ff2773;padding: 5px 24px;border-radius: 30px;font-size: 11px;font-weight: 600;">Activer</div>
              </div>
              <div v-if="profil" class="top-author--item">
                <img :src="require(`@/assets/img/anonyme.jpg`)" alt="Avatar" />
                <div><span>Deja Brady</span></div>
                <span class="filter--choice">
                  <input name="category" type="radio" />
                  <svg viewBox="0 0 24 24" aria-hidden="true" data-testid="RadioButtonUncheckedIcon" class="css-12qyrmm">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" aria-hidden="true" data-testid="RadioButtonCheckedIcon" class="svg--point">
                    <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                  </svg>
                </span>
              </div>
              <hr style="width: 100%; margin-top: 10px; margin-bottom: 0px;" />
              <div style="display: flex; justify-content: space-between;    align-items: center;">
                <div class="video-page__influencer-username2" style="font-size: 15px; font-weight: 500;">Pages</div>
                <div @click="showPages()" class="btn-swipe" style="color: white;text-align: center;width: fit-content;background: #ff2773;padding: 5px 24px;border-radius: 30px;font-size: 11px;font-weight: 600;">Activer</div>
              </div>
              <div v-if="pages" class="top-author--item">
                <img :src="require(`@/assets/img/anonyme.jpg`)" alt="Avatar" />
                <div><span>Deja Brady</span></div>
                <span class="filter--choice">
                  <input name="category" type="radio" />
                  <svg viewBox="0 0 24 24" aria-hidden="true" data-testid="RadioButtonUncheckedIcon" class="css-12qyrmm">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" aria-hidden="true" data-testid="RadioButtonCheckedIcon" class="svg--point">
                    <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                  </svg>
                </span>
              </div>
              <div v-if="pages" class="top-author--item">
                <img :src="require(`@/assets/img/anonyme.jpg`)" alt="Avatar" />
                <div><span>Deja Brady</span></div>
                <span class="filter--choice">
                  <input name="category" type="radio" />
                  <svg viewBox="0 0 24 24" aria-hidden="true" data-testid="RadioButtonUncheckedIcon" class="css-12qyrmm">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" aria-hidden="true" data-testid="RadioButtonCheckedIcon" class="svg--point">
                    <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                  </svg>
                </span>
              </div>
              <hr style="width: 100%; margin-top: 10px; margin-bottom: 0px;" />
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="video-page__influencer-username2" style="font-size: 15px; font-weight: 500;">Groupes</div>
                <div @click="showGroups()" class="btn-swipe" style="color: white;text-align: center;width: fit-content;background: #ff2773;padding: 5px 24px;border-radius: 30px;font-size: 11px;font-weight: 600;">Activer</div>
              </div>
              <div v-if="groups" class="top-author--item">
                <img :src="require(`@/assets/img/anonyme.jpg`)" alt="Avatar" />
                <div><span>Deja Brady</span></div>
                <span class="filter--choice">
                  <input name="category" type="radio" />
                  <svg viewBox="0 0 24 24" aria-hidden="true" data-testid="RadioButtonUncheckedIcon" class="css-12qyrmm">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" aria-hidden="true" data-testid="RadioButtonCheckedIcon" class="svg--point">
                    <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                  </svg>
                </span>
              </div>
              <div v-if="groups" class="top-author--item">
                <img :src="require(`@/assets/img/anonyme.jpg`)" alt="Avatar" />
                <div><span>Deja Brady</span></div>
                <span class="filter--choice">
                  <input name="category" type="radio" />
                  <svg viewBox="0 0 24 24" aria-hidden="true" data-testid="RadioButtonUncheckedIcon" class="css-12qyrmm">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                  </svg>
                  <svg viewBox="0 0 24 24" aria-hidden="true" data-testid="RadioButtonCheckedIcon" class="svg--point">
                    <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <!-- promo popup -->
      <div v-if="popupPromo" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 100%; top: 60%; padding: 15px;"> 
        <div @click="hidePromo()" style="float: right;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #525c66;"><path d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z"/></svg>
        </div>
        <div style="display: flex; justify-content: center;">
          <div class="video-page__influencer-username2" style="font-size: 17px; font-weight: 600;">Promotion</div>
        </div>
        <div class="items" style="margin-top: 20px; margin-bottom: 20px;">
          <div v-if="addPromo">
            <div class="form--input--item" :class="{'form--input--item--error': errorTitle }">
              <fieldset>
                <legend>Titre</legend>
                <input type="text" v-model="title" placeholder="Ex: PROMO10">
              </fieldset>
            </div>
              
            <div class="form--input">
              <div class="form--input--item" :class="{'form--input--item--error': errorType }">
                <fieldset>
                  <legend>Remise</legend>
                  <select v-model="type">
                    <option value="percent" selected>Pourcentage</option>
                    <option value="euro">Euro</option>
                  </select>
                </fieldset>
              </div>
              <div class="form--input--item" :class="{'form--input--item--error': errorDiscount }">
                <fieldset>
                  <legend>Valeur</legend>
                  <input type="text" v-model="discount">
                </fieldset>
              </div>
            </div>
            <br>
            <div @click="savePromo()" class="btn-swipe" style="color: white; text-align: center;">Enregistrer</div>
          </div>
          <div v-if="listPromo">
            <div class="top-author--container" style="border: 2px dashed #f1f0f0; border-radius: 15px;">
              <div class="top-author--item">
                <img :src="require(`@/assets/img/gift.png`)" style="width: 48px; height: 48px;">
                <div>
                  <span>{{ title }}</span>
                  <div>
                    <span v-if="type == 'percent'">Réduction : {{ discount }}%</span>
                    <span v-else>Réduction : {{ discount }}€</span>
                  </div>
                </div>
                <div @click="deletePromo()" class="btn-swipe" style="color: white;text-align: center;width: fit-content;background: #ff2773;margin: 0px auto;padding: 5px 24px;border: 1px solid #ff2773;border-radius: 30px;font-size: 11px; font-weight: 600">Supprimer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div :style="{'bottom': safeareaBottom2 }" @click="start()" style="left: calc(50vw - 64px); position: absolute;">
        <img :src="require(`@/assets/img/golive.png`)" style="width: 128px; height: 128px;">
      </div>
    </div>

    <div v-if="counter" class="counter">
      <span class="cssanimation">{{ countdown }}</span>
    </div>

    <div v-if="ready" class="ready">

      <!-- viewers -->
      <div class="bp9cbjyn jk6sbkaj kdgqqoy6 ihh4hy1g qttc61fc rq0escxv pq6dq46d datstx6m jb3vyjys p8fzw8mz qt6c0cv9 pcp91wgn afxn4irw m8weaby5 ee40wjg4" :style="{'top': safeareaTop3 }" style="position: absolute; height: 24px; width: fit-content; left: 15px; background-color: rgba(0, 0, 0, 0.5); padding: 0px 12px;">
        <span class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa ht8s03o8 a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb mdeji52x j5wam9gi lrazzd5p ljqsnud1" dir="auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="fill: white; width: 12px; margin-bottom: 2px; height: 12px;"><path d="M572.5 238.1C518.3 115.5 410.9 32 288 32S57.69 115.6 3.469 238.1C1.563 243.4 0 251 0 256c0 4.977 1.562 12.6 3.469 17.03C57.72 396.5 165.1 480 288 480s230.3-83.58 284.5-206.1C574.4 268.6 576 260.1 576 256C576 251 574.4 243.4 572.5 238.1zM432 256c0 79.45-64.47 144-143.9 144C208.6 400 144 335.5 144 256S208.5 112 288 112S432 176.5 432 256zM288 160C285.7 160 282.4 160.4 279.5 160.8C284.8 170 288 180.6 288 192c0 35.35-28.65 64-64 64C212.6 256 201.1 252.7 192.7 247.5C192.4 250.5 192 253.6 192 256c0 52.1 43 96 96 96s96-42.99 96-95.99S340.1 160 288 160z"/></svg>
          <span style="padding-left: 5px; font-weight: bold;">{{ viewers }}</span>
        </span>
      </div>

      <!-- amount -->
      <div class="bp9cbjyn jk6sbkaj kdgqqoy6 ihh4hy1g qttc61fc rq0escxv pq6dq46d datstx6m jb3vyjys p8fzw8mz qt6c0cv9 pcp91wgn afxn4irw m8weaby5 ee40wjg4" :style="{'top': safeareaTop }" style="position: absolute; height: 30px; width: fit-content; right: calc(50vw - 54px); padding: 20px 20px; border-radius: 30px; background-color: rgba(0,0,0,.75);">
        <span dir="auto" class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa ht8s03o8 a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb mdeji52x e9vueds3 j5wam9gi lrazzd5p ljqsnud1">
          <span style="font-weight: bold;font-size: 18px;">199,50 <span style="color: #7ed957">€</span></span>
        </span>
      </div>

      <!-- rotate camera -->
      <div @click="switchCamera()" :style="{'top': safeareaTop }" class="video-page__influencer-badge4" style="position: absolute; width: 40px; height: 40px; right: 70px; z-index: 1000;">
        <div class="video-page__influencer-username-holder">
          <span class="video-page__influencer-video-count">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 40px; height: 40px; padding: 8px; fill: white;"><path d="M448 96h-72l-8.457-22.51C358.2 48.51 334.3 32 307.6 32H204.4C177.7 32 153.9 48.51 144.5 73.45L136 96H64C28.65 96 0 124.7 0 160v256c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V160C512 124.7 483.3 96 448 96zM464 416c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V160c0-8.822 7.178-16 16-16h105.2l20.19-53.64C191.7 84.16 197.8 80 204.4 80h103.3c6.631 0 12.65 4.172 14.98 10.38L342.7 144H448c8.822 0 16 7.178 16 16V416zM346.9 187.7l-14.76 14.77C311.2 183.8 284.6 173 256 173c-35.64 0-68.69 16.12-90.64 44.22C157.2 227.7 159 242.8 169.5 250.9C179.9 259.1 195 257.2 203.2 246.8c22.5-28.79 67.17-32.26 95.08-10.48l-14.61 14.62C275.9 258.6 281.3 271.7 292.1 272h67.36C364.2 271.9 368 268 368 263.3V196.4C368 185.4 354.7 179.9 346.9 187.7zM308.8 329.2c-22.5 28.79-67.17 32.26-95.08 10.48l14.61-14.62C236.1 317.4 230.7 304.3 219.9 304H152.6C147.8 304.1 144 307.1 144 312.7v66.87c0 11.02 13.33 16.54 21.12 8.74l14.76-14.77C200.8 392.2 227.4 403 256 403c35.64 0 68.69-16.12 90.64-44.22c8.172-10.45 6.312-25.53-4.125-33.69C332.1 316.9 317 318.8 308.8 329.2z"/></svg>
          </span>
        </div>
      </div>

      <!-- close live -->
      <div @click="stop()" :style="{'top': safeareaTop }" class="video-page__influencer-badge4" style="position: absolute; width: 40px; height: 40px; right: 15px; z-index: 1000; background-color: rgba(255,0,0,.5);">
        <div class="video-page__influencer-username-holder">
          <span class="video-page__influencer-video-count">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 40px; height: 40px; padding: 8px; fill: white;"><path d="M336.1 175c-9.375-9.375-24.56-9.375-33.94 0L256 222.1L208.1 175c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03L175 303c-9.375 9.375-9.375 24.56 0 33.94c9.373 9.373 24.56 9.381 33.94 0L256 289.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0c9.375-9.375 9.375-24.56 0-33.94l-47.03-47.03l47.03-47.03C346.3 199.6 346.3 184.4 336.1 175zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256S512 397.4 512 256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z"/></svg>
          </span>
        </div>
      </div>


      <!-- comments -->
      <div v-if="comments.length" :style="{'bottom': safeareaBottom }" class="scrollToMe" ref="scrollToMe">
        <div v-for="comment in comments" class="video-page__influencer-badge" style="padding: 4px 15px 5px 7px; width: fit-content;">
          <div class="video-page__influencer-img" style="padding-right: 7px;">
            <img v-if="comment.user.picture" :src="cloudinary256x256 + comment.user.picture" style="border-radius: 50%;width: 20px;height: 20px; object-fit: cover">
            <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%;width: 20px;height: 20px; object-fit: cover">
          </div>
          <div class="video-page__influencer-username-holder">
            <div class="video-page__influencer-username"> 
              <span v-if="comment.isVendor" style="font-size: 13px;margin-right: 3px;"> {{ user.vendor.businessName }} : </span>
              <span v-else style="font-size: 13px;margin-right: 3px;"> {{ comment.user.firstname }} : </span>
              <span style="font-weight: 500;">{{ comment.content }}</span>
            </div>
          </div>
        </div>
      </div>


      <!-- product -->
      <div v-if="liveProducts.length" class="video-page__product-box" :style="{'bottom': safeareaBottom3 }">
        <div class="video-page__product-top">
          <div class="video-page__image">
            <img v-if="liveProducts[0].product.uploads" :src="cloudinary256x256 + liveProducts[0].product.uploads[0].filename">
          </div>
          <div class="video-page__info">
            <div style="height: 38px;">
              <h5 class="video-page__name"> {{ liveProducts[0].product.title }}</h5>
            </div>
            <div class="video-page__price-row">
              <div class="video-page__price">
                <div class="video-page__price-line">
                  <div class="video-page__price"> {{ liveProducts[0].product.price | formatPrice }}€
                    <span v-if="liveProducts[0].product.compareAtPrice" class="disc" style="font-size: 14px; text-decoration: line-through; color: rgb(153, 153, 153); padding-left: 5px; font-weight: 500;">{{ liveProducts[0].product.compareAtPrice | formatPrice }}€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- orders -->
      <div @click="showOrders()" :style="{'bottom': safeareaBottom2 }" class="video-page__influencer-badge5">
        <div class="video-page__influencer-username-holder">
          <span class="video-page__influencer-video-count">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 40px;height: 40px;padding: 8px 5px 8px 5px;fill: white;"><path d="M416 160h-72V120C344 53.83 290.2 0 224 0S104 53.83 104 120V160H32C14.33 160 0 174.3 0 192v240C0 476.2 35.82 512 80 512h288c44.18 0 80-35.82 80-80V192C448 174.3 433.7 160 416 160zM152 120C152 80.3 184.3 48 224 48s72 32.3 72 72V160h-144V120zM128 248C114.8 248 104 237.3 104 224S114.8 200 128 200S152 210.8 152 224S141.3 248 128 248zM320 248c-13.25 0-24-10.75-24-24S306.8 200 320 200S344 210.8 344 224S333.3 248 320 248z"/></svg>
          </span>
        </div>
      </div>

      <!-- send comment -->
      <div @click="openPopup()" class="video-page__influencer-badge-send" :style="{'bottom': safeareaBottom2 }">
        <div class="video-page__influencer-username-holder">
          <div class="video-page__influencer-username" style="color: hsla(0,0%,100%,.6); font-size: 15px; font-weight: 600;"> Commenter...</div>
        </div>
      </div>


      <div v-if="liveProducts.length > 1" @click="changeProduct()" :style="{'bottom': safeareaBottom2 }" class="video-page__influencer-badge-end">
        <div class="video-page__influencer-username-holder">
          <div class="video-page__influencer-username" style="">Suivant</div>
        </div>
      </div>


      <!-- input comment -->
	    <div v-if="popup" class="css-1dko8fk" :style="{'bottom': writeInput }">
	      <div class="css-miqn2j">
	        <input v-focus v-on-clickaway="away" placeholder="Votre commentaire..." type="text" class="css-9gu6qp" v-model="content"/>
	      </div>
	      <button id="buttonSend" :class="{'Mui-disabled': content.length == 0 }" class="css-il3d4y">
	        <svg id="svgSend" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
	          <path id="pathSend" d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12L2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" fill="currentColor"></path>
	        </svg>
	      </button>
	    </div>


      <!-- popup orders -->
      <div v-if="popupOrders" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 100%; top: 60%; padding: 15px;"> 
        <div @click="hideOrders()" style="float: right;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #525c66;"><path d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z"/></svg>
        </div>
        <div style="display: flex; justify-content: center;">
          <div class="video-page__influencer-username2" style="font-size: 17px; font-weight: 600;">Commandes</div>
        </div>
        <div class="items" style="margin-top: 20px; margin-bottom: 20px;">
          <!-- show orders -->
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped src="../../assets/css/live.css"></style>

<script>
import Pusher from 'pusher-js';
import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: 'Feed',
  mixins: [ clickaway ],
  data() {
    return {
      id: this.$route.params.id,
      baseUrl: window.localStorage.getItem("baseUrl"),
      user: JSON.parse(window.localStorage.getItem("user")),
      token: window.localStorage.getItem("token"),
      bambuserId: window.localStorage.getItem("bambuserId"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      comments: [],
      purchases: [],
      liveProducts: [],
      live: [],
      pusher: null,
      broadcaster: null,
      http: null,
      viewers: 0,
      display: 1,
      prelive: true,
      ready: false,
      counter: false,
      popup: false,
      errListenerId: false,
      broadcastListenerId: false,
      statusListenerId: false,
      safeareaTop: '10px',
      safeareaTop2: '120px',
      safeareaTop3: '20px',
      safeareaBottom: '205px',
      safeareaBottom2: '10px',
      safeareaBottom3: '65px',
      safeareaBottom4: '165px',
      writeInput: '0px',
      content: "",
      countdown: 3,
      interval: null,
      type: null,
      title: null,
      discount: null,
      popupFacebook: false,
      popupPromo: false,
      popupOrders: false,
      groups: false,
      pages: false,
      profil: false,
      listPromo: false,
      addPromo: true,
      errorTitle: false,
      errorType: false,
      errorDiscount: false,
    }
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {
    console.log(this.id);
    window.StatusBar.styleLightContent();
    window.StatusBar.overlaysWebView(true);

    if (window.cordova.plugin && window.cordova.plugin.http) {
      this.http = window.cordova.plugin.http;
      this.http.setDataSerializer('json');
    }

    if (window.cordova && window.cordova.platformId === "android") {
      this.safeareaTop = '35px';
      this.safeareaTop2 = '135px';
      this.safeareaTop3 = '45px';
      this.safeareaBottom = '230px';
      this.safeareaBottom2 = '35px';
      this.safeareaBottom3 = '90px';
      this.safeareaBottom4 = '190px';

      if (!this.bambuserId) {
        window.localStorage.setItem("bambuserId", "7a1Fm1qdrF4bYhnTfZosPA");
      }
    }

    if (window.cordova && window.cordova.platformId === "ios") {
      this.safeareaTop = 'calc(env(safe-area-inset-top) + 10px)';
      this.safeareaTop2 = 'calc(env(safe-area-inset-top) + 120px)';
      this.safeareaTop3 = 'calc(env(safe-area-inset-top) + 20px)';
      this.safeareaBottom = 'calc(env(safe-area-inset-bottom) + 205px)';
      this.safeareaBottom2 = 'calc(env(safe-area-inset-bottom) + 10px)';
      this.safeareaBottom3 = 'calc(env(safe-area-inset-bottom) + 65px)';
      this.safeareaBottom4 = 'calc(env(safe-area-inset-bottom) + 165px)';

      if (!this.bambuserId) {
        window.localStorage.setItem("bambuserId", "Eqza0IhJO8JKQTs37D0VKQ");
      }
    }

    if (window.bambuser && window.bambuser.broadcaster && (window.cordova.platformId === "ios" || window.cordova.platformId === "android")) {
      this.broadcaster = window.bambuser.broadcaster;
      this.broadcaster.setApplicationId(this.bambuserId, () => {
        this.broadcaster.switchCamera();
      }, (err) => { 
        console.log(err);
      });
    } else {
      console.log("Bambuser is not available");
    }

    if (this.broadcaster) {
      this.broadcaster.setTitle("Live" + this.id);
      this.broadcaster.setAuthor(this.user.vendor.businessName);
      // this.broadcaster.setCustomData("Custom data");
      setTimeout(() => {
        this.broadcaster.showViewfinderBehindWebView();
        document.getElementsByTagName('body')[0].classList.add("show-viewfinder");
      }, 1000);
    }

    if (this.user && this.token) {
      this.http.get(this.baseUrl + "/user/api/profile", {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.user = JSON.parse(response.data);
      }, (error) => {
        console.log(error);
      });
    }
  },
  mounted() {},
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
        this.$router.push({ name: 'Account' });
      }
    },
    openPopup() {
      this.popup = true;
    },
    changeProduct() {
      if (this.liveProducts.length > 1) {
        this.http.put(this.baseUrl + "/user/api/live/" + this.id + "/update/display", { "display": this.display + 1 }, { Authorization: "Bearer " + this.token }, (response) => {
          console.log(JSON.parse(response.data));
          this.display = this.display + 1;
          this.liveProducts.shift();
        }, (response) => {
          console.log(response.error);
        });
      } else {
        this.stop();
      }
    },
    away(event) {
      console.log(event);
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
    	console.log(this.content);
      this.popup = false;
      // this.comments.push({ "content": this.content, user: { "firstname": this.user.firstname, "lastname": this.user.lastname, "picture": this.user.picture, "vendor": true }});
      // this.scrollToElement();

      this.http.post(this.baseUrl + "/user/api/live/" + this.id + "/comment/add", { "content": this.content }, { Authorization: "Bearer " + this.token }, (response) => {
      	console.log(JSON.parse(response.data));
        var result = JSON.parse(response.data);
        this.content = "";
        this.comments = result.comments;
        this.scrollToElement();
      }, (response) => {
        console.log(response.error);
      });
    },
    scrollToElement() {
      console.log(this.$refs);
      var el = this.$refs.scrollToMe;

      if (el) {
        setTimeout(() => {
          el.scrollTop = el.scrollHeight;
        }, 500)
      }
    },
    async start() {
      if (this.broadcaster) {
        try {
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
        // this.prelive = false;
        // this.counter = false;
        // this.ready = true;

        // this.http.put(this.baseUrl + "/user/api/live/update/" + this.id, { "broadcastId" : "test" }, { Authorization: "Bearer " + this.token }, (response) => {
        //   console.log(response);
        //   var result = JSON.parse(response.data);
        //   if (result) {
        //     console.log(result);
        //     this.live = result;
        //     this.liveProducts = result.liveProducts;

        //     this.pusher = new Pusher('55da4c74c2db8041edd6', { cluster: 'eu' });
        //     var channel = this.pusher.subscribe(result.channel);
        //   }
        // }, (response) => {
        //   console.log(response.error);
        // });

        console.log("Bambuser is not available");
      }
    },
    async stop() {
      if (this.broadcaster) {
        this.broadcaster.hideViewfinder();
        this.pusher.unsubscribe(this.live.channel);

        try {
          await this.broadcaster.stopBroadcast();

          this.http.put(this.baseUrl + "/user/api/live/stop/" + this.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
            var result = JSON.parse(response.data);
            if (result) {
              this.$router.push({ name: 'PostLive', params: { id: this.id } });
            }
          }, (response) => {
            console.log(response.error);
          });
        } catch (e) {
          console.log('Failed to stop broadcast', e);
        }
      }
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

          window.plugins.toast.show("Une erreur est survenue !", 'long', 'top', function(a){
            console.log('toast success: ' + a);
          }, function(b){
            console.log('toast error: ' + b);
          });

          this.broadcaster.hideViewfinder();
          this.broadcaster.removeEventListener(this.errListenerId);
          this.pusher.unsubscribe(this.live.channel);
          this.$router.push({ name: 'PostLive', params: { id: this.id } });
        });
      }
    },
    listenForBroadcastId() {
      if (!this.broadcastListenerId) {
        this.broadcastListenerId = this.broadcaster.addEventListener('broadcastIdAvailable', broadcastId => {
          console.log("J'ai le broadcastId : " + broadcastId);
          this.broadcaster.removeEventListener(this.broadcastListenerId);
          console.log(this.id);

          this.http.put(this.baseUrl + "/user/api/live/update/" + this.id, { "broadcastId" : broadcastId }, { Authorization: "Bearer " + this.token }, (response) => {
            console.log(response);
            var result = JSON.parse(response.data);
            if (result) {
              console.log(result);
              this.live = result;
              this.liveProducts = result.liveProducts;

              this.pusher = new Pusher('55da4c74c2db8041edd6', { cluster: 'eu' });
              var channel = this.pusher.subscribe(result.channel);

              channel.bind(result.event, (data) => {
                console.log(data);

                if (data.comment) {
                	console.log(data.comment);
                  if (data.comment.user.firstname != this.user.firstname && data.comment.user.lastname != this.user.lastname) {
                    this.comments.push(data.comment);
                    this.scrollToElement();
                  }
                }

                if (data.viewers) {
                  this.viewers = data.viewers;
                }
              });
            }
          }, (response) => {
            console.log(response.error);
          });
        });
      }
    },
    listenForStatusChange() {
      if (!this.statusListenerId) {
        this.statusListenerId = this.broadcaster.addEventListener('connectionStatusChange', status => {
          console.log("status change : " + status);

          if (status == "reconnecting") {
            window.plugins.toast.show('Tentative de reconnexion ...', 'long', 'top', function(a){
              console.log('toast success: ' + a);
            }, function(b){
              console.log('toast error: ' + b);
            });
          }

          if (status == "finishing") {
            this.broadcaster.hideViewfinder();
            this.broadcaster.removeEventListener(this.statusListenerId);
            this.pusher.unsubscribe(this.live.channel);
          }
        });
      }
    },
    actionSheet() {
      var options = {
        title: 'Réseaux sociaux',
        buttonLabels: ['Connecter avec Facebook' ],
        addCancelButtonWithLabel: 'Annuler',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };
      window.plugins.actionsheet.show(options, (index) => {
        if (index == 1) {
          this.popupFacebook = true;
        }
      }, (error) => {
        console.log(error);
      });
    },
    hideFacebook() {
      this.popupFacebook = false;
    },
    showProfil() {
      this.profil = true;
    },
    showPages() {
      this.pages = true;
    },
    showGroups() {
      this.groups = true;
    },
    showPromo() {
      this.popupPromo = true;
    },
    savePromo() {
      this.errorTitle = false;
      this.errorType = false;
      this.errorDiscount = false;

      if (!this.discount) {
        this.errorDiscount = true;
      }

      if (!this.title) {
        this.errorTitle = true;
      }

      if (!this.type) {
        this.errorType = true;
      }

      if (!this.errorTitle && !this.errorType && !this.errorDiscount) {
        this.listPromo = true;
        this.addPromo = false;
      }
    },
    listPromo() {
      this.listPromo = true;
      this.addPromo = false;
    },
    hidePromo() {
      this.popupPromo = false;
    },
    deletePromo() {
      this.listPromo = false;
      this.addPromo = true;
    },
    showOrders() {
      this.popupOrders = true;
    },
    hideOrders() {
      this.popupOrders = false;
    }
  }
};

</script>

