<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Ordre de passage</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 75px;">
      <div class="items">
        <p style="padding-top: 20px; margin-bottom: 0px; text-align: center; font-weight: 400">Déplacer les articles par ordre de passage.</p>
        <div v-if="liveProducts.length" class="one_item">
          <draggable :list="liveProducts" :move="checkMove" @start="dragging = true" @end="dragging = false">
            <div v-for="(element, index) in liveProducts" :key="element.id" class="row align-items-center" style="margin: 15px 5px; box-shadow: 0 0 5px rgb(0 0 0 / 20%); padding: 10px; border-radius: 20px;">
              <div class="col-1">
                <div style="font-size: 18px; color: rgb(99, 115, 129);">{{ index + 1 }}</div>
              </div>
              <div class="col-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 20px; height: 20px; margin-left: -5px; fill: rgb(99, 115, 129);"><path d="M424 392H23.1C10.8 392 0 402.8 0 415.1C0 429.2 10.8 440 23.1 440H424c13.2 0 24-10.8 24-23.1C448 402.8 437.2 392 424 392zM424 72H23.1C10.8 72 0 82.8 0 95.1S10.8 120 23.1 120H424c13.2 0 24-10.8 24-23.1S437.2 72 424 72zM424 232H23.1C10.8 232 0 242.8 0 256c0 13.2 10.8 24 23.1 24H424C437.2 280 448 269.2 448 256S437.2 232 424 232z"/></svg>
              </div>
              <div class="col-3 col-img">
                <div class="img_item">
                  <img v-if="element.product.uploads.length" :src="cloudinary256x256 + element.product.uploads[0].filename" style="width: 52px; height: 52px; border-radius: 12px; object-fit: cover;">
                  <img v-else :src="require(`@/assets/img/no-preview.jpg`)" style="width: 52px; height: 52px; border-radius: 12px; object-fit: cover;">
                </div>
              </div>
              <div class="col-6" style="padding-left: 0px; padding-right: 0px;">
                <div class="info">
                  <div class="title" style="text-decoration: none; color: rgb(33, 43, 54); line-height: 1.57143; font-size: 15px;">{{ element.product.title }}</div>
                </div>
              </div>
            </div>
          </draggable>

          <div @click="submit()" class="btn-swipe" style="color: white; text-align: center; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); width: calc(100vw - 40px);">Continuer</div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>

.products {
  height: 100vh;
  width: 100%;
}

img {
  width:100%
}

.products .items .col-img {
  padding-right: 0;
}

.products .items .one_item {
  padding: 1vh 0;
}

.products .items .one_item .title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
}

.products .items .one_item .desc {
  font-size: 0.7em;
  color: #6c7b8a;
  margin-bottom: 4px;
}

.products .items .one_item .price {
  margin-right: 5vw;
  color: #5882f2;
  position: relative;
  top: 1px;
}

.my_form_check {
   display: inline-block;
}
</style>

<script>
  
import draggable from 'vuedraggable'

export default {
  name: 'PreLive2',
  components: {
    draggable
  },
  data() {
    return {
      id: this.$route.params.id,
      baseUrl: window.localStorage.getItem("baseUrl"),
      user: JSON.parse(window.localStorage.getItem("user")),
      token: window.localStorage.getItem("token"),
      bambuserId: window.localStorage.getItem("bambuserId"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      liveProducts: [],
      dragging: false,
      pending: false
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();

    window.cordova.plugin.http.get(this.baseUrl + "/user/api/live/" + this.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
      var result = JSON.parse(response.data);
      if (result) {
        this.liveProducts = result.liveProducts;
      }
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    checkMove(event) {
      console.log(event);
    },
    async submit() {
      if (!this.pending) {
        this.pending = true;
        this.liveProducts.map((element, key) => { 
          var priority = key + 1;
          
          window.cordova.plugin.http.setDataSerializer('json');
          window.cordova.plugin.http.put(this.baseUrl + "/user/api/liveproducts/edit/" + element.id, { "priority": priority }, { Authorization: "Bearer " + this.token }, (response) => {}, (response) => {
            this.pending = false;
            console.log(response.error);
          });
        });

        if (this.pending) {
          this.$router.push({ name: 'Live', params: { id: this.id } });
        }
      }
    },
    goBack() {
      this.$router.push({ name: 'PreLive' });
    }
  }
};

</script>

