<template>
  <main class="products">
    <div class="checkout">
      <div class="checkout__header" style="padding: 15px; position: absolute; top: 0px; z-index: 10000000; background: white; width: 100%;">
        <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 8px; padding: 0.5rem 0px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: #161823;"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
        </div>
        <div class="checkout__title" style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Mes clips</div>
      </div>

      <div v-if="!loading" class="checkout__body" style="overflow: scroll; margin-top: 70px; margin-bottom: 100px;">
        <div class="images" style="margin-bottom: 50px;">
          <div v-if="clips && clips.length" class="row" style="margin: 0px;">
            <div v-for="clip in clips" class="col-6 col-img" style="padding: 5px;">
              <div v-if="clip.status == 'available'" style="height: 325px;">
                <img :src="clip.preview" style="border-radius: 12px; width: 100%; height: 325px;">
                <img :src="cloudinary256x256 + clip.product.uploads[0].filename" style="width: 48px; height: 48px; border: 2px solid white; border-radius: 30px; background: white; position: absolute; left: 39%; top: 81%; box-shadow: rgb(96 121 159 / 12%) 0px 7px 14px 0px, rgb(0 33 60 / 12%) 0px 3px 6px 0px; object-fit: cover;">
                <div @click="actionSheet(clip.id)" class="photo-box__delete-button">
                  <button class="remove-photo c-button c-button--filled c-button--small c-button--primary c-button--inline c-button--inverse c-button--truncatedc-button--icon-left c-button--without-text" type="button" style="border-radius: 8px;">
                    <span class="c-button__content">
                      <span class="c-button__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 23px;height: 42px;fill: rgb(153, 153, 153);padding: 10px 0px 10px 0px;border-radius: 30px;"><path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z"></path></svg>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
              <div v-else class="loading-silhouette silhouette light" style="border-radius: 12px; width: calc(50vw - 25px); height: 325px;">
                <p style="top: 135.5px; position: relative; text-align: center; font-size: 18px; font-weight: 500; margin-bottom: 0px;">Création <br> en cours</p>
              </div>
            </div>
          </div>
          <div v-else style="margin-top: 75px; text-align: center;">
          	Aucun clips
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>
header {
  display: grid;
  margin: 0px 20px;
  grid-auto-flow: column;
  justify-content: space-between;
  height: 50px;
  align-items: center;
}
header img {
  width: 24px;
  height: 24px;
}

.photo-box__delete-button {
  right: 15px;
  top: 15px;
}

.images {
  margin: 10px;
}
</style>

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
        buttonLabels: ['Partager', 'Supprimer'],
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

