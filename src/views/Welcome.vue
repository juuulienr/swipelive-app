<template>
  <div class="welcome">
    <!-- velcome video -->
    <div class="video-player">
      <div playsinline="true" webkit-playsinline="true">
        <video v-if="isAndroid" ref="welcomeVideo" @loadeddata="onVideoLoaded" style="height: 100vh; object-fit: cover; position: fixed; width: 100%; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop muted="muted" autoplay :src="require(`@/assets/video/welcome.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
        <video v-else ref="welcomeVideo" @loadeddata="onVideoLoaded" style="height: 99vh; object-fit: cover; width: 100%;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/welcome.mp4`)" preview='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>'></video>
      </div>
    </div>
    <div v-if="!popup && !popupLogin && !popupPassword && !popupUserRegistration" @click="open()" class="btn-open" :style="{'bottom': safeareaBottom }">
      Accéder
    </div>

    <!-- welcome popup -->
    <div v-if="popup" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; animation: none;"> 
      <div class="bg-welcome" style="padding: 15px;">
        <div class="checkout__title" style="margin-top: 12px; font-size: 22px; margin-bottom: 20px;">Achetez, Vendez & Swipez 🛍</div>
        <p style="text-align: center;margin: 0px 30px;font-weight: 400;margin-bottom: 30px;">Créez un compte pour commencer à acheter, vendre et profiter de plein de réductions en live !</p>

        <div class="social-container-NE2xk" style="padding: 0px;">
          <div @click="userRegistration()" class="channel-item-wrapper-2gBWB" style="background: #ff2a80; border: none; margin-bottom: 0px;">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/mail.png`)" style="width: 24px; height: 24px; margin-bottom: 7px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">S'inscrire par email</div>
          </div>
        </div>

        <div class="tv-signin-dialog__separator" style="margin-top: 15px; margin-bottom: 15px;">
          <div class="tv-signin-dialog__separator-text">ou</div>
        </div>

        <div class="social-container-NE2xk">
          <div v-if="!isAndroid" @click="apple()" class="channel-item-wrapper-2gBWB" style="background: black; border: none;">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/apple.png`)" style="width: 24px; height: 24px; margin-bottom: 3px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">Continuer avec Apple</div>
          </div>
          <div @click="facebook()" class="channel-item-wrapper-2gBWB" style="background: #1e74e4; border: none;">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/facebook.png`)" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">Continuer avec Facebook</div>
          </div>
          <div @click="google()" class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/google.png`)" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Google</div>
          </div>
        </div>

        <p style="text-align: center;margin: 10px 30px 15px;font-weight: 400;color: #a7a8a9;">Avez-vous déjà un compte ?</p>
        <p @click="userLogin()" style="text-align: center;color: #ff2a80;">SE CONNECTER</p>
      </div>
    </div>


    <!-- test popup -->
    <div class="pane">
      <div class="checkout__header" style="padding: 5px 15px 15px; z-index: 10000000; background: white; width: 100%;">
        <div class="checkout__close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
        </div>
        <div class="checkout__title">Règle du jeu</div>
      </div>
      <div class="checkout__body info-wheel" style="overflow: scroll; padding: 15px 20px 50px;">
        <div class="container" style="text-align: center;">
          <h4 style="margin-top: 0px; margin-bottom: 50px;">Et si acheter devient un jeu ?</h4>
        </div>
        
        <h4>Swipe Roulette</h4>

        <p>La Swipe Roulette est un jeu qui selectionne au hasard une commande réalisée dans l'application. Cette commande sera remboursée à l'utilisateur.</p>

        <h4>Principes et modalités du jeu 🎉</h4>

        <p>Tous les 500 commandes faites sur Swipe Live, la roulette tourne et rembourse une commande directement sur la carte bancaire utilisée lors de l'achat.</p>
        <p>- Les gagnants recevrons une notification directement sur l'application Swipe Live.</p>

        <h4>Quelles commandes peuvent être tirées au sort ? 🛍</h4>

        <p>Toutes les commandes effectués sur l'application Swipe Live sont éligibles. <br> Il n'y a aucune limite sur le nombre de fois qu'un utilisateur peut gagner. <br> Swipe Live se réserve toutefois le droit de procéder à toute vérification utile à l'application des règles du jeu, notamment afin de disqualifier les participants ayant procédé à une manoeuvre frauduleuse ou abusive.</p>

        <h4>Limite de remboursement 💳</h4>

        <p>Lorsqu'une commande est tirée au sort, alors son montant total est remboursé par Swipe Live dans la limite de 50€. <br> Ex: Si un utilisateur dépense par exemple 100€ et que sa commande est tiré au sort, il gagnera 50€.</p>
      </div>

    </div>



    <!-- login popup -->
    <div v-if="popupLogin" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; animation: none;"> 
      <div class="checkout__header" style="padding: 13px 15px 13px;">
        <div @click="open()" class="checkout__close-btn" style="padding: 10px 0px">
           <img :src="require(`@/assets/img/arrow-left.svg`)" style="width: 28px; height: 28px;"/>
        </div>
      </div>
      <div style="padding: 15px;">
        <div class="checkout__title" style="margin-top: 40px; font-size: 22px; margin-bottom: 20px;">Se connecter</div>
        <div v-if="errorLoginEmail || errorLoginPassword" style="font-size: 13px; color: red; margin-bottom: 5px; text-align: center; font-weight: 400;">Identifiant ou mot de passe incorrect</div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLoginEmail }" style="margin-top: 15px">
          <fieldset>
            <legend>Email</legend>
            <input type="text" id="email" v-model="loginEmail" style="text-transform: lowercase;">
          </fieldset>
        </div>

        <div class="form--input--item" :class="{'form--input--item--error': errorLoginPassword }" style="margin-bottom: 15px;">
          <fieldset>
            <legend>Mot de passe</legend>
            <input type="password" id="password" v-model="loginPassword">
          </fieldset>
        </div>

        <div style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; padding: 15px 0px 10px; ">
          <div @click="login()" class="btn-swipe" style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; width: 275px; margin: 0 auto; padding: 13px 48px; border-radius: 30px;">
            <span v-if="loading">
              <svg viewBox="25 25 50 50" class="loading">
                <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
              </svg>
            </span>
            <span v-else>Se connecter</span>
          </div>
        </div>

        <div @click="forgotPassword()" class="small-1UkQD grey-rBkrL link-2j8GS" style="color: rgb(82, 92, 102) !important; font-size: 12px; font-weight: 400; text-align: center;">
          Mot de passe oublié ?
        </div>

        <div class="tv-signin-dialog__separator" style="margin-top: 15px; margin-bottom: 15px;">
          <div class="tv-signin-dialog__separator-text">ou</div>
        </div>

        <div class="social-container-NE2xk">
          <div v-if="!isAndroid" @click="apple()" class="channel-item-wrapper-2gBWB" style="background: black; border: none;">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/apple.png`)" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">Continuer avec Apple</div>
          </div>
          <div @click="facebook()" class="channel-item-wrapper-2gBWB" style="background: #1e74e4; border: none;">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/facebook.png`)" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW" style="color: white;">Continuer avec Facebook</div>
          </div>
          <div @click="google()" class="channel-item-wrapper-2gBWB">
            <div class="channel-icon-wrapper-2eYxZ">
              <img :src="require(`@/assets/img/google.png`)" style="width: 24px; height: 24px;"/>
            </div>
            <div class="channel-name-2qzLW">Continuer avec Google</div>
          </div>
        </div>
      </div>
    </div>


    <!-- registration popup -->
    <div v-if="popupUserRegistration" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; animation: none;"> 
      <div class="checkout__header" style="padding: 13px 15px 13px;">
        <div @click="open()" class="checkout__close-btn" style="padding: 10px 0px">
           <img :src="require(`@/assets/img/arrow-left.svg`)" style="width: 28px; height: 28px;"/>
        </div>
        <div class="checkout__title">S'inscrire</div>
      </div>
      <div class="checkout__body" style="overflow: scroll; padding: 15px;">
        <div class="general--profile">
          <span>
            <span v-if="loadingImg">
              <svg viewBox="25 25 50 50" class="loading" style="width: 24px; height: 24px; top: calc(50% - 13px); left: calc(50% - 13px);">
                <circle cx="50" cy="50" r="20" style="stroke: rgb(255, 39, 115);"></circle>
              </svg>
            </span>
            <span v-else-if="picture" @click="uploadSheet()">
              <img :src="cloudinary256x256 + picture" style="object-fit: cover; width: 142px; height: 142px;">
            </span>
            <div v-else @click="uploadSheet()">
              <svg xmlns="http://www.w3.org/2000/svg" class="MuiBox-root css-v73erd iconify iconify--ic" viewBox="0 0 24 24">
                <path d="M3 8c0 .55.45 1 1 1s1-.45 1-1V6h2c.55 0 1-.45 1-1s-.45-1-1-1H5V2c0-.55-.45-1-1-1s-1 .45-1 1v2H1c-.55 0-1 .45-1 1s.45 1 1 1h2v2z" fill="currentColor"></path>
                <circle cx="13" cy="14" r="3" fill="currentColor"></circle>
                <path d="M21 6h-3.17l-1.24-1.35A1.99 1.99 0 0 0 15.12 4h-6.4c.17.3.28.63.28 1c0 1.1-.9 2-2 2H6v1c0 1.1-.9 2-2 2c-.37 0-.7-.11-1-.28V20c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5z" fill="currentColor"></path>
              </svg>
              <span style="font-weight: 400; margin: 0px 20px; text-align: center;">Ajoute une photo de profil</span>
            </div>
          </span>
        </div>
        
      	<div class="form--input--item" :class="{'form--input--item--error': errorFirstname }">
      		<fieldset>
      			<legend>Prénom</legend>
      			<input type="text" v-model="firstname" style="text-transform: capitalize;">
      		</fieldset>
      	</div>

      	<div class="form--input--item" :class="{'form--input--item--error': errorLastname }">
      		<fieldset>
      			<legend>Nom</legend>
      			<input type="text" v-model="lastname" style="text-transform: capitalize;">
      		</fieldset>
      	</div>

        <div class="form--input--item" :class="{'form--input--item--error': errorEmail }">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="email" style="text-transform: lowercase;">
          </fieldset>
        </div>
        
        <div class="form--input--item" :class="{'form--input--item--error': errorPassword }">
          <fieldset>
            <legend>Mot de passe</legend>
            <input type="password" v-model="password">
          </fieldset>
        </div>

        <div @click="register()" class="btn-swipe" style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; margin-top: 20px;">
          <span v-if="loading">
            <svg viewBox="25 25 50 50" class="loading">
              <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
            </svg>
          </span>
          <span v-else>S'inscrire</span>
        </div>
      </div>
    </div>


    <!-- forgot password popup -->
    <div v-if="popupPassword" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; animation: none;"> 
      <div class="checkout__header" style="padding: 13px 15px 13px;">
        <div @click="open()" class="checkout__close-btn" style="padding: 10px 0px">
           <img :src="require(`@/assets/img/arrow-left.svg`)" style="width: 28px; height: 28px;"/>
        </div>
        <div class="checkout__title">Mot de passe oublié</div>
      </div>
      <div class="checkout__body" style="overflow: scroll; padding: 15px;">
        <div style="margin: 0px auto;">
          <Lottie :options="defaultOptions" :width="200" v-on:animCreated="handleAnimation"/>
        </div>

        <p v-if="isReset" style="font-size: 13px; color: #525c66; text-align: left; margin-bottom: 30px; font-weight: 400;">Un mail a été envoyé pour réinitialiser votre mot de passe.</p>
        <p v-else style="font-size: 13px; color: #525c66; text-align: left; margin-bottom: 30px; font-weight: 400;">Entrez l'adresse email associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>

        <div class="form--input--item" :class="{'form--input--item--error': errorEmailRecovery }">
          <fieldset>
            <legend>Email</legend>
            <input type="text" v-model="forgotEmail">
          </fieldset>
        </div>

        <div style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em; padding: 0px 0px 10px;">
          <div @click="resetPassword()" class="btn-swipe" :disabled="isReset ? disabled : ''" style="color: white; text-align: center; line-height: 1.41176; letter-spacing: -0.025em;">Réinitialiser</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/css/welcome.css"></style>


<style>
  .cupertino-pane-wrapper .pane {
    box-shadow: none !important;
  }

  ._9HetvA {
    z-index: 0;
}

.NqU4Yg {
    z-index: 1500;
    display: none;
}

._9HetvA, .NqU4Yg {
    position: relative;
}

.MxhaIQ._5aUrJg {
    opacity: 1;
}
.MxhaIQ.R4vkCQ {
    transition: opacity .25s ease-in-out;
}
.MxhaIQ {
    right: 0;
    left: 0;
    background-color: white;
    position: fixed;
    overflow-y: auto;
    top: 0;
    bottom: 0;
    opacity: 0;
    display: flex;
    width: 100%;
}

.IywfPg {
    position: relative;
    padding: 16px 48px;
    box-sizing: border-box;
    max-width: 100%;
    display: flex;
    pointer-events: none;
}

.EYTKnA {
    pointer-events: auto;
    margin-top: 20px;
}

.HmLo5g {
    position: relative;
}

.JFEjrQ {
    border-radius: 8px;
}
.Z2VWzw {
    background-color: #fff;
}
.JFEjrQ {
    position: relative;
}
.Z2VWzw {
    width: 100%;
    height: 100%;
}

.T_Xrlw {
    padding: 20px;
    max-width: 100%;
    box-sizing: border-box;
}

.gjqPYw {
    margin-bottom: 16px;
}

.bSncsg {
    margin: 0;
}
.l1bE7Q {
    color: #333;
}
.bSncsg {
    word-wrap: break-word;
    overflow-wrap: break-word;
}
.NAz2ZA {
    font-weight: 700;
    font-size: 1.3rem;
    letter-spacing: -.03rem;
    line-height: 1.3;
}

.jNAeLA {
    margin: 16px -8px 0;
}

.NT2yCg {
    background-color: transparent;
    border-color: rgba(14,19,24,.15);
}
.Qkd66A {
    border: 2px solid transparent;
    border-radius: 30px;
    cursor: pointer;
    margin: 0;
    padding: 0 6px;
}
._7x80Lg {
    flex: 0 0 auto;
    min-width: 180px;
}
.NT2yCg {
    color: rgba(14,19,24,.7);
}
.GnpDIA {
    justify-content: center;
}
.Qkd66A {
    color: #fff;
    display: inline-flex;
    height: 40px;
    letter-spacing: .01rem;
    line-height: 1.4;
    max-width: 100%;
    min-width: 80px;
    transition: background-color .1s linear,border-color .1s linear,color .1s linear;
    vertical-align: middle;
    align-items: center;
}

.n9zSJA {
    font-size: 1.3rem;
}

._8sh-Iw {
    background-color: #f84856;
}

._7x80Lg {
    flex: 0 0 auto;
    min-width: 180px;
}

.jNAeLA {
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: center;
}

.o4TrkA {
    outline: none;
}

.MWlxIg, .n9zSJA {
    font-weight: 500;
    line-height: 1.6;
}
.n9zSJA {
    font-size: 0.9rem;
}
.NT2yCg {
    color: rgba(14,19,24,.7);
}

.yIDCqA, button {
    -webkit-tap-highlight-color: transparent;
}

.GnpDIA>._38oWvQ {
    margin: auto;
}
.Qkd66A>._38oWvQ {
    padding: 0 8px;
}
.Qkd66A>._38oWvQ {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
}

.NT2yCg {
    background-color: transparent;
    border-color: rgba(14,19,24,.15);
}

.NT2yCg.zQlusQ:hover {
    border-color: rgba(14,19,24,.45);
}

.i7NByQ {    
    order: 1;
    align-self: flex-start;
    position: -webkit-sticky;
    position: sticky;
    top: 25px;
    right: 55px;
    z-index: 10;
    position: absolute;
}

.CA2Rbg {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
}
.T2s_Vg {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    pointer-events: auto;
    color: #7a818c;
    transition: background-color .25s ease-in-out;
}

.TcNIhA {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
}

.f_b3kA {
    width: 24px;
    height: 24px;
}
.xR4dgg {
    display: inline-block;
    vertical-align: text-bottom;
    box-sizing: border-box;
}

.xR4dgg>svg {
    width: 100%;
    height: 100%;
    display: block;
}

._1OmKeA {
    border-radius: inherit;
}
._1OmKeA {
    max-width: 100%;
}

.Tor9eg {
    border-radius: inherit;
}

.Tor9eg {
    max-width: 100%;
}

.g8iqDA {
    text-align: left;
}

.g8iqDA {
    border-radius: inherit;
}
.g8iqDA {
    overflow: hidden;
}

.Apwjig {
    background-image: linear-gradient(90deg,#00c4cc,#7d2ae8);
}

.pRBKkQ {
    min-height: 240px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.f5ZG2A {
    font-size: 1.4rem;
    color: #fff;
    font-weight: 700;
}

.I_nTag {
    padding: 16px;
}

.u9XXAg:not(:last-child) {
    margin-bottom: 8px;
}
._jLCyQ {
    text-align: left;
}

.bSncsg {
    word-wrap: break-word;
    overflow-wrap: break-word;
    margin: 0;
}

.X8Afzw {
    display: none;
}

.NviU_g {
    margin: 0;
    padding: 0;
}

.vx8KSw {
    margin-left: 4px;
}
.vx8KSw {
    padding: 8px 0;
}
.sWSiTQ {
    display: flex;
    align-items: stretch;
}

._3h20OQ {
    flex: 0 0 auto;
}

.D9iACw {
    color: #6bca2c;
}
.f_b3kA {
    width: 24px;
    height: 24px;
}
.xR4dgg {
    display: inline-block;
    vertical-align: text-bottom;
    box-sizing: border-box;
}

.vx8KSw ._-mnO6g {
    margin-right: 8px;
}
._-mnO6g {
    margin-left: 8px;
    flex: 1;
}

._jLCyQ {
    text-align: left;
}

.yPRhMg {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.Qkd66A {
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    margin: 0;
    padding: 0 6px;
}
._7WRzmA {
    flex: 1 1 auto;
}

.zKTE_w {
    background-color: #00c4cc;
}

._7WRzmA {
    flex: 1 1 auto;
}
.GnpDIA {
    justify-content: center;
}
._bDL5A {
    padding-top: 12px;
}

.HnhAQA {
    text-align: center;
}

.MWlxIg {
    font-size: 1.2rem;
}

._5JgSIQ a, ._6pE-dQ a, .eNPKgw, .oCRJNQ, .oUJMcQ, .ovm4pQ, .raaLGQ a, .T26_6Q, .wL6vqQ a, .z2oZFw a {
    cursor: pointer;
    text-decoration: underline;
}

.ovm4pQ, .T26_6Q, .wL6vqQ a, .z2oZFw a {
    color: #00c4cc;
}

.NT2yCg {
    color: rgba(14,19,24,.7);
}

.NT2yCg.Fdttyw, .NT2yCg.zQlusQ.Fdttyw, .NT2yCg.zQlusQ:active, .NT2yCg:active {
    background-color: rgba(14,19,24,.15);
    border-color: rgba(14,19,24,.7);
}
.NT2yCg.zQlusQ:hover {
    border-color: rgba(14,19,24,.45);
}
.NT2yCg {
    background-color: transparent;
    border-color: rgba(14,19,24,.15);
}

.zKTE_w.zQlusQ:hover {
    background-color: #00d9e1;
}

.vZfg_Q {
    min-width: 16px;
    min-height: 16px;
}

._7x80Lg {
    margin: 8px;
}

._sllktm {
    z-index: 20000000 !important;
    position: fixed !important;
    inset: 0px !important;
    max-height: 100% !important;
}

._1hm5t6t {
    -webkit-box-direction: normal !important;
    -webkit-box-orient: vertical !important;
    background: rgb(255, 255, 255) !important;
    position: relative !important;
    height: 100% !important;
    max-height: 100% !important;
    width: 100vw !important;
    max-width: 100vw !important;
    display: flex !important;
    flex-direction: column !important;
    animation-duration: 400ms !important;
    animation-iteration-count: 1 !important;
    animation-fill-mode: both !important;
    animation-name: keyframe_d37zz3 !important;
}


._bxii6c {
    -webkit-box-pack: justify !important;
    -webkit-box-align: center !important;
    border-bottom: 1px solid rgb(235, 235, 235) !important;
    padding: 12px 16px 10px !important;
    display: flex !important;
    flex-shrink: 0 !important;
    align-items: center !important;
    justify-content: space-between !important;
    color: rgb(34, 34, 34) !important;
}


._1mm2a5z {
    appearance: none !important;
    display: inline-block !important;
    border-radius: 50% !important;
    border: none !important;
    outline: none !important;
    margin: 0px !important;
    padding: 0px !important;
    color: rgb(34, 34, 34) !important;
    cursor: pointer !important;
    touch-action: manipulation !important;
    position: relative !important;
    background: transparent !important;
    transition: -ms-transform 0.25s ease 0s, -webkit-transform 0.25s ease 0s, transform 0.25s ease 0s !important;
}

._e296pg {
    position: relative !important;
}

._1m08oli {
    font-size: 18px !important;
    font-weight: 600 !important;
}

._gby1jkw {
    cursor: pointer !important;
    display: inline-block !important;
    margin: 0px -10px !important;
    position: relative !important;
    text-align: center !important;
    width: auto !important;
    touch-action: manipulation !important;
    font-size: 16px !important;
    line-height: 20px !important;
    font-weight: 600 !important;
    border-radius: 8px !important;
    outline: none !important;
    padding: 10px !important;
    transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s !important;
    border: none !important;
    background: transparent !important;
    color: rgb(34, 34, 34) !important;
    text-decoration: underline !important;
}

._5kol8m {
    padding: 12px 24px !important;
    overflow: auto !important;
    flex: 1 1 auto !important;
}

._zgc1p6 {
    -webkit-box-pack: justify !important;
    -webkit-box-align: center !important;
    display: flex !important;
    flex: 0 0 auto !important;
    border-top: 1px solid rgb(235, 235, 235) !important;
    padding: 16px 24px !important;
    align-items: center !important;
    justify-content: space-between !important;
    font-size: 16px !important;
    line-height: 20px !important;
}

._1qnlffd6 {
    cursor: pointer !important;
    display: inline-block !important;
    margin: 0px !important;
    position: relative !important;
    text-align: center !important;
    text-decoration: none !important;
    touch-action: manipulation !important;
    font-size: 16px !important;
    line-height: 20px !important;
    font-weight: 600 !important;
    border-radius: 8px !important;
    outline: none !important;
    padding: 14px 24px !important;
    transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s !important;
    border: none !important;
    background: rgb(34, 34, 34) !important;
    color: rgb(255, 255, 255) !important;
    width: 100% !important;
}

._nbd4yy8 {
    -webkit-box-pack: center !important;
    -webkit-box-align: center !important;
    background-color: rgb(255, 255, 255) !important;
    border-radius: 50% !important;
    border-style: solid !important;
    border-width: 2px !important;
    height: 32px !important;
    left: -1px !important;
    position: absolute !important;
    top: -1px !important;
    transform: translate3d(0px, 0px, 0px) !important;
    width: 32px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: -ms-transform 250ms ease-in-out 0s, -webkit-transform 250ms ease-in-out 0s, transform 250ms ease-in-out 0s !important;
    border-color: rgb(176, 176, 176) !important;
}
._40p2its {
    display: inline-block !important;
    border-width: 1px !important;
    border-style: solid !important;
    height: 24px !important;
    width: 24px !important;
    text-align: center !important;
    overflow: hidden !important;
    vertical-align: top !important;
    border-radius: 4px !important;
    background: rgb(34, 34, 34) !important;
    color: rgb(255, 255, 255) !important;
    border-color: rgb(34, 34, 34) !important;
}
._1nf9xc2y {
    border-radius: 32px !important;
    border-style: solid !important;
    border-width: 1px !important;
    cursor: pointer !important;
    height: 32px !important;
    position: relative !important;
    min-width: 48px !important;
    width: 48px !important;
    outline: none !important;
    background-color: rgb(34, 34, 34) !important;
    border-color: rgb(34, 34, 34) !important;
}


._10lpi8ws {
    -webkit-box-pack: center !important;
    -webkit-box-align: center !important;
    background-color: rgb(255, 255, 255) !important;
    border-radius: 50% !important;
    border-style: solid !important;
    border-width: 2px !important;
    height: 32px !important;
    left: -1px !important;
    position: absolute !important;
    top: -1px !important;
    width: 32px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: -ms-transform 250ms ease-in-out 0s, -webkit-transform 250ms ease-in-out 0s, transform 250ms ease-in-out 0s !important;
    border-color: rgb(34, 34, 34) !important;
    transform: translate3d(16px, 0px, 0px) !important;
    color: rgb(34, 34, 34) !important;
}

._10f0ki40 {
    border-bottom: 1px solid rgb(235, 235, 235) !important;
    padding-top: 8px !important;
    padding-bottom: 24px !important;
}

._1d9cfor {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
}

._kedp3u {
    font-size: 18px !important;
    line-height: 22px !important;
    font-weight: 600 !important;
}

._14i3z6h {
    color: inherit !important;
    font-size: 1em !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    margin: 0px !important;
    padding: 0px !important;
}

._1ubyg61 {
    -webkit-box-align: center !important;
    -webkit-box-pack: justify !important;
    color: rgb(34, 34, 34) !important;
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    padding-right: 4px !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
}

._1kfl0pr {
    margin-left: 12px !important;
}

._pwqvlx {
    position: relative !important;
    display: inline-block !important;
    cursor: pointer !important;
    padding: 0px !important;
}
._19t2uhr {
    position: absolute !important;
    opacity: 0 !important;
}
._167krry {
    display: inline-block !important;
    border-width: 1px !important;
    border-style: solid !important;
    border-color: rgb(176, 176, 176) !important;
    height: 24px !important;
    width: 24px !important;
    background: rgb(255, 255, 255) !important;
    text-align: center !important;
    overflow: hidden !important;
    vertical-align: top !important;
    border-radius: 4px !important;
}


._py3ty1 {
    font-weight: 400 !important;
    font-size: 16px !important;
}

._15oklaz {
    font-weight: 400 !important;
    font-size: 14px !important;
}

._1d9cfor {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
}

._1vmcy00 {
    min-width: 50px !important;
    margin-left: 12px !important;
}

._jro6t0 {
    display: -webkit-box !important;
    display: -moz-box !important;
    display: -ms-flexbox !important;
    display: -webkit-flex !important;
    display: flex !important;
}

._ebqknn {
    font-size: 14px !important;
    line-height: 18px !important;
    font-weight: 400 !important;
    color: rgb(113, 113, 113) !important;
}

._2lqt1m {
    padding-top: 5px !important;
    padding-bottom: 4px !important;
}

._aucgnq {
    border-radius: 32px !important;
    border-style: solid !important;
    border-width: 1px !important;
    cursor: pointer !important;
    height: 32px !important;
    position: relative !important;
    min-width: 48px !important;
    width: 48px !important;
    outline: none !important;
    background-color: rgb(176, 176, 176) !important;
    border-color: rgb(176, 176, 176) !important;
}

._1d9cfor {
    padding-top: 16px !important;
    padding-bottom: 16px !important;
}

._kedp3u {
    font-size: 18px !important;
    line-height: 22px !important;
    font-weight: 600 !important;
}

._14i3z6h {
    color: inherit !important;
    font-size: 1em !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    margin: 0px !important;
    padding: 0px !important;
}

._xiq13o {
    font-size: 16px !important;
    line-height: 20px !important;
    font-weight: 400 !important;
}

._15dmj15 {
    -webkit-box-pack: justify !important;
    -webkit-box-align: center !important;
    color: rgb(34, 34, 34) !important;
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    padding-right: 4px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
}
._t0tx82 {
    -webkit-box-flex: 1 !important;
    flex-grow: 1 !important;
}
._py3ty1 {
    font-weight: 400 !important;
    font-size: 16px !important;
}

._15oklaz {
    font-weight: 400 !important;
    font-size: 14px !important;
}

._3zlfom {
    -webkit-box-pack: justify !important;
    -webkit-box-align: center !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    width: 104px !important;
    height: 32px !important;
    color: rgb(34, 34, 34) !important;
    font-weight: 400 !important;
    font-size: 16px !important;
    line-height: 20px !important;
}

._7hhhl3:disabled {
    cursor: not-allowed !important;
    color: rgb(235, 235, 235) !important;
    border-color: rgb(235, 235, 235) !important;
    background: rgb(255, 255, 255) !important;
}

._7hhhl3 {
    -webkit-box-pack: center !important;
    -webkit-box-align: center !important;
    -webkit-box-flex: 0 !important;
    width: 32px !important;
    height: 32px !important;
    flex-grow: 0 !important;
    flex-shrink: 0 !important;
    cursor: pointer !important;
    display: inline-flex !important;
    margin: 0px !important;
    padding: 0px !important;
    text-align: center !important;
    text-decoration: none !important;
    border-width: 1px !important;
    border-style: solid !important;
    border-color: rgb(176, 176, 176) !important;
    color: rgb(113, 113, 113) !important;
    font-family: inherit !important;
    outline: none !important;
    touch-action: manipulation !important;
    align-items: center !important;
    justify-content: center !important;
    background: rgb(255, 255, 255) !important;
    border-radius: 50% !important;
}

._1665lvv {
    position: relative !important;
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    line-height: inherit !important;
}

._7hhhl3 {
    -webkit-box-pack: center !important;
    -webkit-box-align: center !important;
    -webkit-box-flex: 0 !important;
    width: 32px !important;
    height: 32px !important;
    flex-grow: 0 !important;
    flex-shrink: 0 !important;
    cursor: pointer !important;
    display: inline-flex !important;
    margin: 0px !important;
    padding: 0px !important;
    text-align: center !important;
    text-decoration: none !important;
    border-width: 1px !important;
    border-style: solid !important;
    border-color: rgb(176, 176, 176) !important;
    color: rgb(113, 113, 113) !important;
    font-family: inherit !important;
    outline: none !important;
    touch-action: manipulation !important;
    align-items: center !important;
    justify-content: center !important;
    background: rgb(255, 255, 255) !important;
    border-radius: 50% !important;
}

._8ovatg {
    height: 22px !important;
    width: 22px !important;
    padding: 5px !important;
}

._5afswi {
    left: 0px !important;
    border: 0px !important;
    clip: rect(0px, 0px, 0px, 0px) !important;
    clip-path: inset(100%) !important;
    height: 1px !important;
    overflow: hidden !important;
    padding: 0px !important;
    position: absolute !important;
    white-space: nowrap !important;
    width: 1px !important;
}






@media (min-width: 560px) {
    .Tor9eg {
        width: 560px;
    }
    .Apwjig {
        background-image: url(https://static.canva.com/web/images/7ce297e6f6938f6a4d3547cb266789d3.jpg);
    }
    .pRBKkQ {
        text-align: left;
        padding-right: 50%;
    }
    .pRBKkQ {
        min-height: 240px;
        box-sizing: border-box;
    }
    .pRBKkQ {
        background-size: cover;
        background-position: 50% 50%;
    }
    .zYxu0Q {
        padding: 0 32px;
    }

    .I_nTag {
        padding: 24px 32px 32px;
    }

    .X8Afzw {
        display: block;
    }

    .yPRhMg {
        margin-top: 16px;
    }

    .yPRhMg {
        flex-direction: row;
    }
}


@media (max-width: 991px) {
    .i7NByQ {    
        right: 25px;
        z-index: 10;
        position: absolute;
    }
    .IywfPg {
        padding: 16px;
    }
}



@media (min-width: 992px) {
    .T_Xrlw {
        min-width: 500px;
    }
}




</style>

<script>

import AuthAPI from "../utils/auth.js";
import Lottie from 'vue-lottie';
import * as animationData from '../assets/lottie/forgot-password.json';
import { CupertinoPane } from 'cupertino-pane';

export default {
  name: 'Welcome',
  components: {
    Lottie
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      defaultOptions: {animationData: animationData},
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      popup: false,
      popupPassword: false,
      popupUserRegistration: false,
      popupLogin: false,
      loginEmail: null,
      loginPassword: null,
      forgotEmail: null,
      errorLoginPassword: false,
      errorLoginEmail: false,
      errorEmailRecovery: false,
      errorFirstname: false,
      errorLastname: false,
      errorEmail: false,
      errorPassword: false,
      email: null,
      firstname: null,
      lastname: null,
      password: null,
      reset: false,
      picture: null,
      safeareaBottom: '40px',
      loading: false,
      loadingImg: false,
      isAndroid: false,
      isReset: false,
      device: null,
      connection: null,
      wifiIPAddress: null,
      carrierIPAddress: null,
      timezone: null,
      locale: null,
    }
  },
  created() {
    window.StatusBar.overlaysWebView(true);
    window.StatusBar.styleDefault();
    
    var isAuthenticated = AuthAPI.isAuthenticated();
    if (isAuthenticated) {
      this.$router.push({ name: 'Feed' });
    }

    if (window.cordova && (window.cordova.platformId === "ios")) {
      this.safeareaBottom = 'calc(env(safe-area-inset-bottom) + 40px)';
    }

    if (window.cordova && (window.cordova.platformId === "android")) {
      this.isAndroid = true;
    }

    if (window.device) {
      this.device = window.device;
      console.log(this.device);
    }

    try {
      this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.locale = Intl.DateTimeFormat().resolvedOptions().locale;
    } catch (error) {
      console.error(error);
    }

    if (navigator.connection && navigator.connection.type) {
      this.connection = navigator.connection.type;
    }

    if (window.networkinterface) {
      window.networkinterface.getWiFiIPAddress((ipInformation) => {
        if (ipInformation.ip) {
          this.wifiIPAddress = ipInformation.ip;
        }
      }, (error) => {
        console.log(error);
      });

      window.networkinterface.getCarrierIPAddress((ipInformation) => {
        if (ipInformation.ip) {
          this.carrierIPAddress = ipInformation.ip;
        }
      }, (error) => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.$refs.welcomeVideo.addEventListener('loadeddata', this.onVideoLoaded);
  },  
  beforeDestroy() {
    this.$refs.welcomeVideo.removeEventListener('loadeddata', this.onVideoLoaded);
  },
  methods: {
    cupertinoPane() {
      let pane = new CupertinoPane('.pane',{ 
        initialBreak: 'top', 
        breaks: {
          middle: {
            enabled: false
          },
          bottom: {
            enabled: false
          }
        },
        backdrop: true, 
        fastSwipeClose: true, 
        bottomClose: true, 
        events: {       
          onDragEnd: (data) => {
            console.log(data);
            // let windowHeight = window.innerHeight;
            // // let panePosition = pane.getPosition();
            // if (panePosition > windowHeight * 0.5) {
            //   pane.destroy({animate: true});
            // }
          },
        }
      });
      pane.present({animate: true})
    },
    onVideoLoaded() {
      if (navigator.splashscreen) {
        navigator.splashscreen.hide();
      }
    },
    async login() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;

      if (!this.loginEmail) {
        this.errorLoginEmail = true;
      } else {
        if (!this.checkEmail(this.loginEmail)) {
          this.errorLoginEmail = true;
        }
      }

      if (!this.loginPassword) {
        this.errorLoginPassword = true;
      } 

      if (!this.errorLoginEmail && !this.errorLoginPassword) {
        window.cordova.plugin.http.setDataSerializer('json');
        var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
        this.loading = true;

        await window.cordova.plugin.http.post(this.baseUrl + "/user/api/login_check", { "username": this.loginEmail, "password": this.loginPassword }, httpHeader, (response) => {
          var result = JSON.parse(response.data);
          window.localStorage.setItem("token", result.token);

          window.cordova.plugin.http.get(this.baseUrl + "/user/api/profile", {}, { Authorization: "Bearer " + result.token }, (response) => {
            console.log(JSON.parse(response.data));
            this.$store.commit('setUser', JSON.parse(response.data));
            this.$router.push({ name: 'Feed' });
          }, (error) => {
            console.log(error);
          });
        }, (response) => {
          this.loading = false;
          this.errorLoginPassword = true;
          this.errorLoginEmail = true;
          console.log(response);
        });
      }
    },
    async facebook() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }

      window.facebookConnectPlugin.login(['email', 'public_profile'], (response) => {
        console.log(response);
        this.loading = true;

        window.facebookConnectPlugin.api("me/?fields=id,first_name,last_name,email,picture.type(large),birthday&access_token=" + response.authResponse.accessToken, ["email", "public_profile"], async (result) => {
            console.log(result);
            this.email = result.email;
            this.password = Math.random().toString(36).slice(-15);

            window.cordova.plugin.http.setDataSerializer('json');
            var httpParams = { "email": this.email, "password": this.password, "firstname": result.first_name, "lastname": result.last_name, "picture": result.picture.data.url, "facebookId": response.authResponse.userID };
            var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };

            await window.cordova.plugin.http.post(this.baseUrl + "/api/authentication/facebook", httpParams, httpHeader, (response) => {
              this.authenticate(response.data);
            }, (response) => {
              this.loading = false;
              console.log(response.error);
              window.plugins.toast.show(error, 'long', 'top');
            });
          }, (error) => {
            this.loading = false;
            console.error("Failed: ", error);
          }
        );
      }, (loginError) => {
        console.log(loginError);
      });
    },
    async google() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }

      if (window.cordova.platformId === "android") {
        var clientId = "996587333677-akfb6s0k9se0kjtnosp1ce8udr2ju64q.apps.googleusercontent.com";
        // var clientId = "996587333677-93niun9524cn6ddis0js9cb0rtal6mtk.apps.googleusercontent.com";
      } else if (window.cordova.platformId === "ios") {
        var clientId = "996587333677-13mbeasei03gq72q8m91tm9l2fh01mr3.apps.googleusercontent.com";
      }

      if (clientId) {
        window.FirebasePlugin.authenticateUserWithGoogle(clientId, async (result) => {
          console.log(result);

          var idToken = result.idToken;
          var parts = idToken.split('.');
          var payload = parts[1];
          var decoded = atob(payload);
          var result = JSON.parse(decoded);
          console.log(result);

          this.loading = true;
          this.email = result.email;
          this.password = Math.random().toString(36).slice(-15);
          console.log(this.password);

          window.cordova.plugin.http.setDataSerializer('json');
          var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
          var httpParams = { "email": this.email, "password": this.password, "firstname": result.given_name, "lastname": result.family_name, "picture": result.picture, "googleId": result.sub };

          await window.cordova.plugin.http.post(this.baseUrl + "/api/authentication/google", httpParams, httpHeader, (response) => {
            console.log(response);
            this.authenticate(response.data);
          }, (response) => {
            this.loading = false;
            console.log(response.error);
            window.plugins.toast.show(response.error, 'long', 'top');
          });
        }, function(error) {
          console.error("Failed to authenticate with Google: " + error);
          window.plugins.toast.show(error, 'long', 'top');
        });
      }
    },
    async apple() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }

      // ajouter apple
      window.cordova.plugins.SignInWithApple.signin({ requestedScopes: [0, 1] }, async (result) => {
        console.log(result);
        var identityToken = result.identityToken;
        var fullName = result.fullName;
        var appleId = result.user;
        var parts = identityToken.split('.');
        var payload = parts[1];
        var decoded = atob(payload);
        var result = JSON.parse(decoded);

        this.loading = true;
        this.email = result.email;
        this.password = Math.random().toString(36).slice(-15);

        window.cordova.plugin.http.setDataSerializer('json');
        var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };
        var httpParams = { "email": this.email, "password": this.password, "firstname": fullName.givenName ? fullName.givenName : null, "lastname": fullName.familyName ? fullName.familyName : null, "appleId": appleId };

        await window.cordova.plugin.http.post(this.baseUrl + "/api/authentication/apple", httpParams, httpHeader, (response) => {
          console.log(response);
          this.authenticate(response.data);
        }, (response) => {
          this.loading = false;
          console.log(response.error);
          window.plugins.toast.show(response.error, 'long', 'top');
        });
      }, function(error){
        console.log(error);
        window.plugins.toast.show(error, 'long', 'top');
      });
    },
    resetPassword() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.errorEmailRecovery = false;

      // envoyer mail pour reinitialiser mdp
      if (!this.forgotEmail) {
        this.errorEmailRecovery = true;
      }

      if (!this.errorEmailRecovery && !this.isReset) {
        this.isReset = true;
      }
    },
    open() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }

      window.StatusBar.overlaysWebView(false);  
      window.StatusBar.styleDefault();
      window.StatusBar.backgroundColorByHexString("#ffffff");
      
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popupUserRegistration = false;
      this.popupPassword = false;
      this.popupLogin = false;
      this.popup = true;
    },
    forgotPassword() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popupUserRegistration = false;
      this.popup = false;
      this.popupLogin = false;
      this.popupPassword = true;
    },
    userRegistration() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popup = false;
      this.popupPassword = false;
      this.popupLogin = false;
      this.popupUserRegistration = true;
    },
    userLogin() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.errorLoginEmail = false;
      this.errorLoginPassword = false;
      this.errorEmailRecovery = false;
      this.popup = false;
      this.popupPassword = false;
      this.popupUserRegistration = false;
      this.popupLogin = true;
    },
    openUrl(url) {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      window.SafariViewController.isAvailable((available) => {
        if (available) {
          window.SafariViewController.show({ url: url }, (result) => {
            console.log(result);
          }, (error) => {
            console.log("KO: " + error);
          })
        } else {
          window.cordova.InAppBrowser.open(url, '_system', 'location=no');
        }
      });
    },
    async register() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.errorFirstname = false;
      this.errorLastname = false;
      this.errorEmail = false;
      this.errorPassword = false;

      if (!this.email) {
        this.errorEmail = true;
      } else {
        if (!this.checkEmail(this.email)) {
          this.errorEmail = true;
        }
      }

      if (!this.password) {
        this.errorPassword = true;
      }

      if (!this.firstname) {
        this.errorFirstname = true;
      }

      if (!this.lastname) {
        this.errorLastname = true;
      }

      if (!this.errorEmail && !this.errorPassword && !this.errorFirstname && !this.errorLastname && !this.loading) {
        this.loading = true;
        window.cordova.plugin.http.setDataSerializer('json');
        var httpParams = { "email": this.email.toLowerCase(), "password": this.password, "firstname": this.firstname, "lastname": this.lastname, "picture": this.picture, "wifiIPAddress": this.wifiIPAddress, "carrierIPAddress": this.carrierIPAddress, "connection": this.connection, "device": this.device, "timezone": this.timezone, "locale": this.locale };
        var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };

        await window.cordova.plugin.http.post(this.baseUrl + "/api/user/register", httpParams, httpHeader, (response) => {
          console.log(response);
          this.$store.commit('setUser', JSON.parse(response.data));
          this.authenticate(true);
        }, (response) => {
          this.loading = false;
          console.log(response.error);
          window.plugins.toast.show(response.error, 'long', 'top');
        });
      }
    },
    checkEmail(email) {
      var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },
    async authenticate(newUser) {
      var httpParams = { "username": this.email, "password": this.password };
      var httpHeader = { 'Content-Type':  'application/json; charset=UTF-8' };

      console.log(this.password);
      console.log(this.email);

      await window.cordova.plugin.http.post(this.baseUrl + "/user/api/login_check", httpParams, httpHeader, (response) => {
        var result = JSON.parse(response.data);
        window.localStorage.setItem("token", result.token);

        if (newUser == true) {
          this.$router.push({ name: 'Onboarding' });
        } else {
          window.cordova.plugin.http.get(this.baseUrl + "/user/api/profile", {}, { Authorization: "Bearer " + result.token }, (response) => {
            console.log(JSON.parse(response.data));
            this.$store.commit('setUser', JSON.parse(response.data));
            this.$router.push({ name: 'Feed' });
          }, (error) => {
            console.log(error);
          });
        }
      }, (response) => {
        this.loading = false;
        console.log(response.error);
        window.plugins.toast.show(response.error, 'long', 'top');
      });
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    uploadSheet() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      var options = {
        title: 'Ajouter une photo',
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
    uploadImage(options) {
      navigator.camera.getPicture((imageUri) => {
        console.log(imageUri);
        this.loadingImg = true;

        window.cordova.plugin.http.setDataSerializer('json');
        if (window.cordova.platformId === "android" || window.cordova.platformId === "ios") {
          window.cordova.plugin.http.uploadFile(this.baseUrl + "/api/registration/picture", {}, { Authorization: "Bearer " }, imageUri, 'picture', (response) => {
            console.log(JSON.parse(response.data));
            this.picture = JSON.parse(response.data);
            this.loadingImg = false;
          }, function(response) {
            console.log(response.error);
          });
        } else {
          var imgData = "data:image/jpeg;base64," + imageUri;
          window.cordova.plugin.http.post(this.baseUrl + "/api/registration/picture", { "picture" : imgData }, { Authorization: "Bearer " }, (response) => {
            console.log(JSON.parse(response.data));
            this.picture = JSON.parse(response.data);
            this.loadingImg = false;
          }, function(response) {
            console.log(response.error);
          });
        }
      }, (error) => {
        console.log("Impossible de récupérer l'image : " + error);
      }, options);
    },
  }
};

</script>
