<template>
  <main class="products">
    <div class="checkout">
      <div class="checkout__header" style="padding: 15px;">
        <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 8px; padding: 0.5rem 0px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: #161823;"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
        </div>
        <div class="checkout__title" style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Transactions</div>
      </div>

      <div class="checkout__body">
        <div style="width: calc(100vw - 30px);margin: 0px 15px 0px 15px;">
          <div class="chat--left--head--input" style="border-radius: 8px;">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="MuiBox-root css-1q8h0dm iconify iconify--eva">
              <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
            </svg>
            <input ref="search" type="text" placeholder="Rechercher" style="height: 1.75em"/>
          </div>
        </div>

        <div class="tags" style="display: flex; margin: 20px 0px 5px; align-items: center; overflow-x: scroll;">
          <div style="display: flex; flex-wrap: initial;">
            <div style="background-color: white; color: rgb(254, 44, 85); padding: 5px 20px; border-radius: 30px; font-size: 14px; border: 1px solid rgb(254, 44, 85); margin-right: 10px; width: 70px; margin-left: 15px;">Tout</div>
            <div style="background-color: rgb(238, 238, 238); color: rgb(102, 102, 102); text-align: center; padding: 5px 20px; border-radius: 30px; width: 115px; margin-right: 10px; font-size: 14px;">À imprimer</div>
            <div style="background-color: rgb(238, 238, 238); color: rgb(102, 102, 102); text-align: center; padding: 5px 20px; border-radius: 30px; font-size: 14px; margin-right: 10px; width: 100px;">En cours</div>
            <div style="background-color: rgb(238, 238, 238); color: rgb(102, 102, 102); text-align: center; padding: 5px 20px; border-radius: 30px; font-size: 14px; width: 95px; margin-right: 15px;">Terminé</div>
          </div>
        </div>

        <div class="top-author">
          <div v-if="user.purchases.length > 0" class="top-author--container">
            <div @click="goOrder(purchase.id)" v-for="purchase in user.purchases" v-if="purchase.status == 'succeeded'" class="top-author--item" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 10px; border-radius: 13px;">
              <img src="https://minimal-assets-api.vercel.app/assets/images/products/product_2.jpg" style="border: 1px solid rgba(22, 24, 35, 0.12);" />
              <div>
                <div><span>08 Nov 2021</span></div>
                <span>Julien REIGNIER</span>
              </div>
              <span class="css-4ioo3c">{{ purchase.total | formatPrice }}€</span>
            </div>
          </div>
          <div v-else style="text-align: center; margin-top: 30px;">
            Aucune transaction
          </div>
        </div>


          <!-- <div v-if="isSales"> -->
           <!--  <div v-if="sales">
              <div v-for="sale in sales" class="items">
                <div class="one_item">
                  <router-link :to="{ name: 'Order', params: { id: sale.id }}">
                    <div class="row align-items-center">
                      <div class="col-9">
                        <div class="info">
                          <div class="title">Commande N°{{ sale.id }}</div>
                          <p class="desc">{{ sale.buyer.businessName }}</p>
                          <div style="color: #1ED7A6">En attente de livraison</div>
                        </div>
                      </div>
                      <div class="col-3">
                        <div class="price">{{ sale.total | formatPrice }}€</div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <div v-else style="text-align: center; margin-top: 30px;">
              Vous n'avez pas de vente
            </div>
          </div> -->
        <!-- </div> -->
      </div>
    </div>
  </main>
</template>


<style scoped>

.products {
  height: 100vh;
  width: 100%;
}

.products header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: 6vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 5vw;
}

.products header .h-left .h-title {
  font-size: 0.9em;
  padding-left: 4vw;
  text-transform: uppercase;
  margin-bottom: 0;
}

.products header img {
  width: 20px;
}

.products header .h-right img {
  margin-left: 3vw;
}

img {
  width:100%
}


.checkout__header {
  position: relative;
  padding: .9rem 0;
}

.checkout__body {
  height: calc(100% - 70px);
  overflow: auto
}

.checkout__close-btn {
  position: absolute;
  left: 0;
  top: 8px;
  padding: .5rem
}

.checkout__title {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700
}


.products .list_options {
  padding: 2vh 5vw;
  background-color: #f9fbfe;
}

.products .list_options ul {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.products .list_options ul li .dropdown .btn {
  font-size: 0.9em;
  background-color: #fff !important;
  color: #222;
  border: none;
  -webkit-box-shadow: 0px 0px 8px 5px #eee;
  box-shadow: 0px 0px 8px 5px #eee;
  text-transform: uppercase;
  padding-left: 5vw;
  padding-right: 5vw;
  margin-right: 2vw;
}

.products .list_options ul li .dropdown-menu {
  margin-top: 2vh;
  margin-left: -25%;
  padding: 1vh 2vw;
  -webkit-box-shadow: 0px 0px 4px 4px #eee;
  box-shadow: 0px 0px 4px 4px #eee;
  position: relative;
  width: 70vw;
}

.products .list_options ul li .dropdown-menu ul {
  display: block;
}

.products .list_options ul li .dropdown-menu li:not(:last-child) {
  border-bottom: 1px solid #eee;
}

.products .list_options ul li .dropdown-menu .checked .option {
  color: #222;
}

.products .list_options ul li .dropdown-menu li {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 100%;
  padding: 1vh 0;
}

.products .list_options ul li .dropdown-menu li .option {
  font-size: 0.8em;
  margin-bottom: 0;
  color: #555;
}

.products .list_options ul li .dropdown-menu.first:before {
  left: 15%;
}

.products .list_options ul li .dropdown-menu.second:before {
  left: 42%;
}

.products .list_options ul li .dropdown-menu.last:before {
  right: 25%;
}

.products .list_options ul li .dropdown-menu:before {
  content: "";
  position: absolute;
  top: -5px;
  width: 14px;
  height: 14px;
  border: 6px solid;
  border-color: #fff #fff transparent transparent;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.products .list_options ul li .my_form_check {
  display: inline-block;
}

.products .list_options ul li .styled-checkbox {
  position: absolute;
  opacity: 0;
}

.products .list_options ul li .styled-checkbox + label {
  position: relative;
  cursor: pointer;
  padding: 0;
}

.products .list_options ul li .styled-checkbox + label:before {
  content: "";
  margin-right: 4vw;
  display: inline-block;
  vertical-align: text-top;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 3px;
  -webkit-box-shadow: 0 0 1px 1px #ccc;
  box-shadow: 0 0 1px 1px #ccc;
}

.products .list_options ul li .styled-checkbox:hover + label:before {
  background: #dadada;
}

.products .list_options ul li .styled-checkbox:focus + label:before {
  -webkit-box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
}

.products .list_options ul li .styled-checkbox:checked + label:before {
  background: #3b3b4d;
}

.products .list_options ul li .styled-checkbox:disabled + label {
  color: #b8b8b8;
  cursor: auto;
}

.products .list_options ul li .styled-checkbox:checked + label:after {
  content: "";
  position: absolute;
  left: 4px;
  top: 9px;
  background: white;
  width: 1.8px;
  height: 1.8px;
  -webkit-box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white,
  4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
  box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white,
  4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.products .list_options ul .sliders {
  position: relative;
}

.products .list_options ul .sliders img {
  width: 18px;
}

.products .list_options ul .sliders .number {
  position: absolute;
  color: #fff;
  top: -1vh;
  right: -4px;
  padding: 1px 3px;
  border-radius: 3px;
  background-color: #5882f2;
  font-size: 0.6em;
}

.products .items {
  padding: 0 5vw;
}

.products .items .col-img {
  padding-right: 0;
}

.products .items .one_item {
  padding: 2vh 0;
  border-bottom: 1px solid #eee;
}

.products .items .one_item .title {
  font-size: 0.9em;
  font-weight: 500;
  margin-bottom: 6px;
}

.products .items .one_item .desc {
  font-size: 0.7em;
  color: #6c7b8a;
  font-style: italic;
  margin-bottom: 4px;
}

.products .items .one_item .price {
  float: right;
  color: #333;
  position: relative;
  top: 1px;
}

.products .my_navbar {
  overflow: hidden;
  height: 6vh;
  width: 100vw;
}

.products .my_navbar .nav_content {
  position: fixed;
  bottom: 0vh;
  left: 0;
  width: 100%;
  height: 6vh;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 5vw;
}

.products .my_navbar .nav_content .icon_nav {
  text-align: center;
}

.products .my_navbar .nav_content .icon_nav img {
  width: 70%;
}

.products .my_navbar .nav_content .shopping {
  position: relative;
}

.products .my_navbar .nav_content .shopping .number {
  position: absolute;
  right: 0px;
  top: 0;
  background-color: #5882f2;
  color: #fff;
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 0.6em;
}
.icon, .icon svg {
    vertical-align: top;
}

.icon svg {
    height: 100%;
    width: 1.5em;
}
svg {
    overflow: hidden;
    vertical-align: middle;
}


.images_sec {
  padding: 30px 15px;
}

.images_sec .images_filter ul {
  background-color: #f4f6f9;
  border-radius: 12px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.images_sec .images_filter ul li {
  display: inline-block;
  text-align: center;
  width: 50%;
  margin: 2px 1%;
  padding: 1vh 0;
  color: #6c7b8a;
}

.images_sec .images_filter ul .active {
  background-color: #fff;
  color: #000;
  border-radius: 10px;
}

.images_sec .images {
  margin-top: 2vh;
}

.images_sec .images .row {
  margin: 0;
}

.col-img {
  padding: 2px 1vw;
}

.images_sec .images .image img {
  border-radius: 5px;
}

.chat--left--head--input {
  display: inline-flex;
  flex-direction: row;
  position: relative;
  min-width: 0px;
  padding: 0px;
  border: 0px;
  vertical-align: top;
  line-height: 1.4375em;
  font-size: 1rem;
  font-weight: 400;
  color: rgb(33, 43, 54);
  cursor: text;
  align-items: center;
  width: 100%;
  border-radius: 30px;
  padding-left: 14px;
  border: solid 1px rgba(145, 158, 171, 0.24);
}
.chat--left--head--input svg {
  display: flex;
  height: 0.01em;
  max-height: 2em;
  align-items: center;
  white-space: nowrap;
  margin-right: 8px;
  color: rgb(145, 158, 171);
  width: 20px;
  height: 20px;
}

.chat--left--head--input input {
  font: inherit;
  letter-spacing: inherit;
  color: currentcolor;
  border: 0;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  background: none;
  height: 1.4375em;
  margin: 0;
  -webkit-tap-highlight-color: transparent;
  display: block;
  min-width: 0;
  width: 100%;
  padding: 8.5px 14px 8.5px 0;
  outline: none;
  font-size: 14px;
}


.top-author--container {
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 10px;
}
.top-author--item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.top-author--item > img {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  font-size: 1.25rem;
  line-height: 1;
  border-radius: 8px;
  overflow: hidden;
  user-select: none;
  object-fit: cover;
}
.top-author--item > div:first-of-type {
  margin: 0px 0px 0px 12px;
  flex-grow: 1;
}
.top-author--item > div > span {
  font-weight: 600;
  line-height: 1.57143;
}

.top-author--item > div > div {
  line-height: 1.5;
  font-size: 0.75rem;
  font-weight: 400;
  color: rgb(99, 115, 129);
  display: flex;
  align-items: center;
}
.top-author--item > div > div > svg {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.css-4ioo3c {
  line-height: 0;
  border-radius: 6px;
  cursor: default;
  align-items: center;
  white-space: nowrap;
  display: inline-flex;
  justify-content: center;
  padding: 20px 20px;
  color: hsl(161deg 65% 64%);
  font-size: 14px;
  background-color: #e6fff7;
  font-weight: 700;
}

.tags::-webkit-scrollbar {
  display: none;
}
.tags {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<script>

export default {
  name: 'ListOrders',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
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

    // window.cordova.plugin.http.get(this.baseUrl + "/user/api/orders", {}, { Authorization: "Bearer " + this.token }, (response) => {
    //   var result = JSON.parse(response.data);
    //   console.log(result);

    //   if (result) {
    //     this.sales = result.sales;
    //     this.purchases = result.purchases;
    //   }
    // }, (response) => {
    //   console.log(response.error);
    // });
  },
  methods: {
    goOrder(id) {
      this.$router.push({ name: 'Order', params: { id: id } });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    }
  }
};

</script>

