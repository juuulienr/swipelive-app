<template>
  <main>
    <div style="position: absolute; background: white; padding: 15px; width: 100%; z-index: 1000000000; text-align: center;">
      <svg @click="goBack()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823; float: left;">
        <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
      </svg>
      <h5 style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Inscription Influenceur</h5>
    </div>
    <div style="padding: 15px; margin-top: 50px; margin-bottom: 30px;">
      <p style="color: #999;text-align: center;font-size: 14px; margin-bottom: 30px;">Faites la promotion de produits disponible sur Swipe Live et gagnez de l'argent en les partageant avec vos abonnés.</p>

      <div class="form--input" style="margin-top: 15px;">
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

      <div class="form--input--item" :class="{'form--input--item--error': errorEmail }">
        <fieldset>
          <legend>Email</legend>
          <input type="text" v-model="email">
        </fieldset>
      </div>

      <div class="form--input--item" :class="{'form--input--item--error': errorPhone }">
        <fieldset>
          <legend>Téléphone</legend>
          <input type="text" v-model="phone" placeholder="+33">
        </fieldset>
      </div>
        
      <div class="form--input--item" :class="{'form--input--item--error': errorPassword }">
        <fieldset>
          <legend>Mot de passe</legend>
          <input type="password" v-model="password">
        </fieldset>
      </div>
             
      <div class="form--input"> 
      	<div class="form--input--item">
      		<fieldset>
      			<legend>Facebook</legend>
      			<input type="text" v-model="facebook" placeholder="@pseudo">
      		</fieldset>
      	</div>
      	<div class="form--input--item">
      		<fieldset>
      			<legend>Instagram</legend>
      			<input type="text" v-model="instagram" placeholder="@pseudo">
      		</fieldset>
      	</div>
      </div>
            
      <div class="form--input"> 
	      <div class="form--input--item">
	        <fieldset>
	          <legend>Snapchat</legend>
	          <input type="text" v-model="snapchat" placeholder="@pseudo">
	        </fieldset>
	      </div>
	      <div class="form--input--item">
	        <fieldset>
	          <legend>Youtube</legend>
	          <input type="text" v-model="youtube" placeholder="@pseudo">
	        </fieldset>
	      </div>
      </div>
      
      <div class="form--input"> 
      	<div class="form--input--item">
      		<fieldset>
      			<legend>Tiktok</legend>
      			<input type="text" v-model="tiktok" placeholder="@pseudo">
      		</fieldset>
      	</div>
	      <div class="form--input--item">
	        <fieldset>
	          <legend>Pinterest</legend>
	          <input type="text" v-model="pinterest" placeholder="@pseudo">
	        </fieldset>
	      </div>
      </div>
      
      <div @click="submit()" class="btn-swipe" style="color: white; text-align: center;">Inscription</div>
    </div>
  </main>
</template>

<style scoped>
.rolldate-container header {
  font-size: 16px  !important;
}

.rolldate-btn {
  font-size: 15px !important;
}

.general--profile {
  padding: 20px 20px 30px;
}

.general--profile > span {
  width: 144px;
  height: 144px;
  margin: auto;
  border-radius: 50%;
  display: block;
  padding: 8px;
  border: 1px dashed rgba(145, 158, 171, 0.32);
  position: relative;
}

.general--profile > span > span {
  z-index: 0;
  width: 100%;
  height: 100%;
  outline: none;
  display: flex;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  align-items: center;
  justify-content: center;
}

.general--profile > span > span > span {
  line-height: 0;
  display: block;
  overflow: hidden;
  z-index: 8;
  width: 100%;
  height: 100%;
  background-size: cover !important;
}

.general--profile > span > span > span img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.general--profile > span div {
  display: flex;
  position: absolute;
  top: 8px;
  left: 8px;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  align-items: center;
  flex-direction: column;
  justify-content: center;
  transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: rgb(255, 255, 255);
  background-color: #666;
  border-radius: 50%;
  cursor: pointer;
}

.general--profile > span div span {
  line-height: 1.5;
  font-size: 0.75rem;
}

.general--profile > span div svg {
  width: 24px;
  height: 24px;
  margin-bottom: 8px;
}

.cards-main li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  padding: 2vh 5vw;
  border-bottom: 1px solid #eee;
  font-size: 1.1em;
}

.cards-main li img {
  width: 11px;
}

</style>


<script>

import AuthAPI from "../services/authAPI.js";
import Rolldate from 'rolldate';

export default {
  name: 'InfluencerRegistration',
  data() {
    return {
      email: null,
      firstname: null,
      lastname: null,
      baseUrl: window.localStorage.getItem("baseUrl"),
      stripe_pk: window.localStorage.getItem("stripe_pk"),
      errorFirstname: false,
      errorLastname: false,
      errorEmail: false,
      errorPhone: false,
      errorPassword: false,
    }
  },
  created() {
    var isAuthenticated = AuthAPI.isAuthenticated();
    if (isAuthenticated) {
      this.$router.push({ name: 'Feed' });
    }
    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'Welcome' });
    },
  }  
};
</script>