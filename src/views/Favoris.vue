<template>
  <main class="products shop_3" style="padding: 0px 10px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Mes Favoris</div>
    </div>


    <!-- <div class="checkout__body items" style="overflow: scroll; padding-bottom: 50px;"> -->
<!--       <div class="shop--part" style="margin: 5px;">
        <div class="shop--item">
          <div>
            <div>
              <img src="https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/0f10abdbabaa38860c01df33d9f86c0c_ymqhco.jpeg">
              <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" focusable="false" style="width: 25px;height: 25px;fill: white;border-radius: 30px;position: absolute;top: 10px;right: 10px;z-index: 100000000;">
                <g transform="matrix( 1 0 0 1 1 2 )">
                  <path d="M15 3C17.5 3 19 4.90001 19 7.20001C19 8.40001 18.4 9.49999 17.7 10.3C16.5 11.5 11 16 11 16C11 16 5.50005 11.5 4.30005 10.3C3.50005 9.49999 3 8.40001 3 7.20001C3 4.90001 4.5 3 7 3C8.7 3 10.3 4.6 11 6C11.7 4.6 13.3 3 15 3ZM15 0C13.5 0 12.1 0.599994 11 1.39999C9.9 0.499994 8.5 0 7 0C3 0 0 3.10001 0 7.20001C0 9.10001 0.799951 10.9 2.19995 12.4C3.59995 13.9 11 19.9 11 19.9C11 19.9 18.4 13.9 19.8 12.4C21.2 10.9 22 9.10001 22 7.20001C22 3.10001 19 0 15 0Z" fill="#FFFFFF" style="
                  fill: white;"></path>
                </g>
              </svg>
            </div>
          </div>
          <div class="shop--item--details">
            <div class="shop--item--name">Detox Aloe Vera</div>
            <div class="shop--item--price">
              <div class="price" style="color: #000"> 45,50€
              </div>
            </div>
          </div>
        </div>
        <div class="shop--item">
          <div>
            <div>
              <img src="https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/0f10abdbabaa38860c01df33d9f86c0c_ymqhco.jpeg">
              <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" focusable="false" style="width: 25px;height: 25px;fill: white;border-radius: 30px;position: absolute;top: 10px;right: 10px;z-index: 100000000;">
                <g transform="matrix( 1 0 0 1 1 2 )">
                  <path d="M15 3C17.5 3 19 4.90001 19 7.20001C19 8.40001 18.4 9.49999 17.7 10.3C16.5 11.5 11 16 11 16C11 16 5.50005 11.5 4.30005 10.3C3.50005 9.49999 3 8.40001 3 7.20001C3 4.90001 4.5 3 7 3C8.7 3 10.3 4.6 11 6C11.7 4.6 13.3 3 15 3ZM15 0C13.5 0 12.1 0.599994 11 1.39999C9.9 0.499994 8.5 0 7 0C3 0 0 3.10001 0 7.20001C0 9.10001 0.799951 10.9 2.19995 12.4C3.59995 13.9 11 19.9 11 19.9C11 19.9 18.4 13.9 19.8 12.4C21.2 10.9 22 9.10001 22 7.20001C22 3.10001 19 0 15 0Z" fill="#FFFFFF" style="
                  fill: white;"></path>
                </g>
              </svg>
            </div>
          </div>
          <div class="shop--item--details">
            <div class="shop--item--name">Detox Aloe Vera</div>
            <div class="shop--item--price">
              <div class="price" style="color: #000"> 45,50€
              </div>
            </div>
          </div>
        </div>
        <div class="shop--item">
          <div>
            <div>
              <img src="https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/0f10abdbabaa38860c01df33d9f86c0c_ymqhco.jpeg">
              <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" focusable="false" style="width: 25px;height: 25px;fill: white;border-radius: 30px;position: absolute;top: 10px;right: 10px;z-index: 100000000;">
                <g transform="matrix( 1 0 0 1 1 2 )">
                  <path d="M15 3C17.5 3 19 4.90001 19 7.20001C19 8.40001 18.4 9.49999 17.7 10.3C16.5 11.5 11 16 11 16C11 16 5.50005 11.5 4.30005 10.3C3.50005 9.49999 3 8.40001 3 7.20001C3 4.90001 4.5 3 7 3C8.7 3 10.3 4.6 11 6C11.7 4.6 13.3 3 15 3ZM15 0C13.5 0 12.1 0.599994 11 1.39999C9.9 0.499994 8.5 0 7 0C3 0 0 3.10001 0 7.20001C0 9.10001 0.799951 10.9 2.19995 12.4C3.59995 13.9 11 19.9 11 19.9C11 19.9 18.4 13.9 19.8 12.4C21.2 10.9 22 9.10001 22 7.20001C22 3.10001 19 0 15 0Z" fill="#FFFFFF" style="
                  fill: white;"></path>
                </g>
              </svg>
            </div>
          </div>
          <div class="shop--item--details">
            <div class="shop--item--name">Detox Aloe Vera</div>
            <div class="shop--item--price">
              <div class="price" style="color: #000"> 45,50€
              </div>
            </div>
          </div>
        </div>
        <div class="shop--item">
          <div>
            <div>
              <img src="https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/0f10abdbabaa38860c01df33d9f86c0c_ymqhco.jpeg">
              <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" focusable="false" style="width: 25px;height: 25px;fill: white;border-radius: 30px;position: absolute;top: 10px;right: 10px;z-index: 100000000;">
                <g transform="matrix( 1 0 0 1 1 2 )">
                  <path d="M15 3C17.5 3 19 4.90001 19 7.20001C19 8.40001 18.4 9.49999 17.7 10.3C16.5 11.5 11 16 11 16C11 16 5.50005 11.5 4.30005 10.3C3.50005 9.49999 3 8.40001 3 7.20001C3 4.90001 4.5 3 7 3C8.7 3 10.3 4.6 11 6C11.7 4.6 13.3 3 15 3ZM15 0C13.5 0 12.1 0.599994 11 1.39999C9.9 0.499994 8.5 0 7 0C3 0 0 3.10001 0 7.20001C0 9.10001 0.799951 10.9 2.19995 12.4C3.59995 13.9 11 19.9 11 19.9C11 19.9 18.4 13.9 19.8 12.4C21.2 10.9 22 9.10001 22 7.20001C22 3.10001 19 0 15 0Z" fill="#FFFFFF" style="
                  fill: white;"></path>
                </g>
              </svg>
            </div>
          </div>
          <div class="shop--item--details">
            <div class="shop--item--name">Detox Aloe Vera</div>
            <div class="shop--item--price">
              <div class="price" style="color: #000"> 45,50€
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    -->
    <div>
      <div class="container" style="margin: 100px auto 0px; text-align: center;">
        <video style="height: 220px; width: 220px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/like.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
      </div>
      <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 30px;">Aucun favoris</h5>
      <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos articles favoris apparaîtront ici.</div>
    </div>
     

  </main>
</template>


<script>

import Product from '../components/Product';

export default {
  name: 'Favoris',
  components: {
    Product,
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      user: JSON.parse(window.localStorage.getItem("user")),
      // lineItems: window.localStorage.getItem("lineItems") ? JSON.parse(window.localStorage.getItem("lineItems")) : [],
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      // id: this.$route.params.id,
      // name: this.$route.params.name,
      // category: null,
      // popupProduct: false,
      // product: [],
      // variant: [],
    }
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();

    // window.cordova.plugin.http.get(this.baseUrl + "/api/categories/" + this.id, {}, { 'Content-Type':  'application/json; charset=UTF-8' }, (response) => {
    //   this.category = JSON.parse(response.data);
    //   console.log(this.category);
    // }, (response) => {
    //   console.log(response.error);
    // });
  },
  methods: {
    // showProduct(product) {
    //   this.product = product;
    //   this.popupProduct = true;
    // },
    // hideProduct() {
    //   this.popupProduct = false;
    //   this.product = [];
    // },
    // onClickChild (variant) {
    //   this.variant = variant;
    // },
    // goCheckout() {
    //   this.lineItems = [];
    //   this.lineItems.push({ "product": this.product, "variant": this.variant, "quantity": 1 });
    //   window.localStorage.setItem("lineItems", JSON.stringify(this.lineItems));
    //   this.$router.push({ name: 'Checkout' });
    // },
    goBack() {
      this.$router.back();
    },
  }
};

</script>

