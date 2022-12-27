<template>
  <main class="products" style="padding: 0px 10px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Clips</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 50px;">
      <div class="images">
        <div v-if="clips && clips.length" class="row" style="margin: 0px;">
          <div v-for="clip in clips" class="col-6 col-img" style="padding: 5px;">
            <div v-if="clip.status == 'available'">
              <img :src="clip.preview" style="border-radius: 10px; width: 100%; height: calc(100% - 10px)">
              <div @click="actionSheet(clip.id)" class="photo-box__delete-button" style="z-index: 20;right: 15px;top: 15px;">
                <button class="remove-photo c-button c-button--filled c-button--small c-button--primary c-button--inline c-button--inverse c-button--truncatedc-button--icon-left c-button--without-text" type="button" style="border-radius: 100%; height: 34px;">
                  <span class="c-button__content">
                    <span class="c-button__icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 18px;fill: rgb(153, 153, 153);padding: 10px 0px 10px 0px;border-radius: 30px;">
                        <path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z"></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
              <div style="background-image: linear-gradient(180deg, transparent 80%, rgba(0, 0, 0, 0.25)); border-radius: 10px; height: calc(100% - 10px); position: absolute; z-index: 10; width: calc(100% - 10px); bottom: 5px;"></div>
              <div class="product--item" style="flex-direction: row;position: absolute;bottom: 15px;z-index: 10000000;left: calc(25vw - 27.5px);">
                <img v-if="clip.product.uploads" :src="cloudinary256x256 + clip.product.uploads[0].filename" style="line-height: 0;display: block;border-radius: 10px;width: 48px;height: 48px;box-shadow: 0 0 5px rgb(0 0 0 / 20%);">
                <img v-else :src="require(`@/assets/img/no-preview.jpg`)" style="line-height: 0;display: block;border-radius: 10px;width: 48px;height: 48px;box-shadow: 0 0 5px rgb(0 0 0 / 20%);">
              </div>
            </div>
            <div v-else style="border-radius: 10px; width: calc(50vw - 25px); height: 320px; margin: 0 auto; border: 2px solid rgba(145, 158, 171, 0.24);">
              <div style="position: absolute; text-align: center; margin: 0 auto; left: 42%; top: 42%;">
                <span style="margin: 0 auto; text-align: center;">
                  <span>
                    <svg viewBox="25 25 50 50" class="loading" style="width: 24px; height: 24px; top: calc(50% - 13px); left: calc(50% - 13px);">
                      <circle cx="50" cy="50" r="20" style="stroke: rgb(255, 39, 115);"></circle>
                    </svg>
                  </span>
                </span>
              </div>
              <p style="top: 176.5px; position: relative; text-align: center; font-size: 15px; font-weight: 400; margin-bottom: 0px;">Clip en création</p>
            </div>
          </div>
        </div>
       <!--  <div v-else>
          <div class="container" style="margin: 100px auto 0px; text-align: center;">
            <video style="height: 220px; width: 220px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/clip.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
          </div>
          <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 30px;">Aucun clip</h5>
          <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos clips apparaîtront ici.</div>
        </div> -->
      </div>
    </div>
  </main>
</template>



<script>

export default {
  name: 'ClipsVendor',
  data() {
    return {
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      clips: [],
      loading: true,
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);  
    window.StatusBar.styleDefault();

    window.cordova.plugin.http.get(this.baseUrl + "/user/api/clips/all", {}, { Authorization: "Bearer " + this.token }, (response) => {
    	console.log(JSON.parse(response.data));
      this.clips = JSON.parse(response.data);
      this.loading = false;
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    actionSheet(id) {
      var options = {
        buttonLabels: ['Partager ce clip', 'Supprimer'],
        addCancelButtonWithLabel: 'Annuler',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };
      window.plugins.actionsheet.show(options, (index) => {
        console.log(index);
        if (index == 1) {
    			window.plugins.socialsharing.share('#1 Application de Live Shopping', null, null, 'https://swipelive.fr');
        } else if (index == 2) {
			    window.cordova.plugin.http.get(this.baseUrl + "/user/api/clips/" + id + "/delete", {}, { Authorization: "Bearer " + this.token }, (response) => {
			    	console.log(JSON.parse(response.data));
			      this.clips = JSON.parse(response.data);
			      this.loading = false;
			    }, (response) => {
			      console.log(response.error);
			    });
        }
      }, (error) => {
        console.log(error);
      });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
  }
};

</script>

