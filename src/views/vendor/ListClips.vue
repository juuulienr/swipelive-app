<template>
  <main class="products">
    <div class="checkout__header" style="padding: 5px 10px 15px 10px;">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Replays</div>
    </div>

    <div class="checkout__body">
      <div class="images">
        <div v-if="clips.length" class="row" style="margin: 0px;">
          <div v-for="(clip, index) in clips" class="col-6 col-img" style="padding: 5px;">
            <div v-if="clip.status == 'available'">
              <img :src="clip.preview" style="border-radius: 10px; width: 100%; height: 300px; object-fit: cover; background: #eeeeee;">
              <div @click="actionSheet(clip.id, index)" class="photo-box__delete-button" style="z-index: 20;right: 15px;top: 15px;">
                <img :src="require(`@/assets/img/ellipsis-h-white.svg`)" style="width: 30px; height: 30px; margin-top: -5px; filter: drop-shadow(rgb(34, 34, 34) 0px 0px 1px);"/>
              </div>
              <div style="background-image: linear-gradient(180deg, transparent 80%, rgba(0, 0, 0, 0.25)); border-radius: 10px; height: 300px; position: absolute; z-index: 10; width: calc(100% - 10px); bottom: 5px;"></div>
              <div class="product--item" style="flex-direction: row;position: absolute;bottom: 15px;z-index: 10000000;left: calc(25vw - 27.5px);">
                <img v-if="clip.product.uploads.length" :src="cloudinary256x256 + clip.product.uploads[0].filename" style="line-height: 0;display: block;border-radius: 10px;width: 48px;height: 48px;border: 1px solid #ddd !important; background: #eeeeee;">
                <img v-else :src="require(`@/assets/img/no-preview.png`)" style="line-height: 0;display: block;border-radius: 10px;width: 48px;height: 48px;border: 1px solid #ddd !important; background: #eeeeee;">
              </div>
            </div>
            <div v-else style="border-radius: 10px; width: calc(50vw - 25px); margin: 0 auto;">
              <img :src="require(`@/assets/img/waiting-clip.jpg`)" style="border-radius: 10px; width: 100%; height: 300px; object-fit: cover; background: #eeeeee;">
              <p style="top: 150px; color: white; text-align: center; left: 30Px; position: absolute; text-align: center; font-size: 15px; margin-bottom: 0px;">Replay en création</p>
            </div>
          </div>
        </div>
        <div v-else-if="loading">
          <div class="loader2">
            <span></span>
          </div>
        </div>
        <div v-else>
          <div class="container" style="margin: 120px auto 0px; text-align: center;">
            <div style="margin: 0px auto;">
              <Lottie :options="defaultOptions" :width="200"/>
            </div>
          </div>
          <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun replay</h5>
          <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos replays apparaîtront ici.</div>
        </div>
      </div>
    </div>
  </main>
</template>



<script>
import Lottie from 'vue-lottie';
import * as animationData from '../../assets/lottie/replay.json';

export default {
  name: 'ListClips',
  components: {
    Lottie
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: this.$store.getters.getUser,
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      defaultOptions: {animationData: animationData},
      clips: [],
      loading: true,
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);  
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");
    
    this.loadClips();
  },
  methods: {
    loadClips() {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/clips", {}, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(response);
        this.clips = JSON.parse(response.data);
        this.loading = false;
      }, (response) => {
        console.log(response.error);
      });
    },
    actionSheet(id, clipIndex) {
      var options = {
        buttonLabels: ['Partager'],
        addCancelButtonWithLabel: 'Annuler',
        addDestructiveButtonWithLabel : 'Supprimer',
        destructiveButtonLast: true,
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };


      window.plugins.actionsheet.show(options, (index) => {
        if (index == 1) {
    			window.plugins.socialsharing.share('#1 Application de Live Shopping', null, null, 'https://swipelive.app');
        } else if (index == 2) {
          this.clips.splice(clipIndex, 1);
			    window.cordova.plugin.http.get(this.baseUrl + "/user/api/clips/" + id + "/delete", {}, { Authorization: "Bearer " + this.token }, (response) => {
            console.log(response);
			    }, (response) => {
			      console.log(response.error);
			    });
        }
      }, (error) => {
        console.log(error);
      });
    },
    goBack() {
      window.plugins.nativepagetransitions.slide({
        direction: 'right',
        duration: 400,
        iosdelay: 0,
        androiddelay: 0,
        winphonedelay: 0,
        slowdownfactor: 1,
      });
      this.$router.push({ name: 'Account' });
    },
  }
};

</script>

