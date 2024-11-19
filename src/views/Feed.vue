<template>
  <div ref="feed" id="feed" class="feed">
    <template v-if="data.length > 0">
      <div v-for="(feed, index) in data" :key="index" class="feed-scroll">
        <div v-if="feed.value">

          <!-- background bottom -->
          <div v-if="!loading[index].value && !finished[index].value" class="filter-bottom"></div>
          

          <!-- loader -->
          <div v-if="loading[index].value || finished[index].value" class="filter-blur"></div>
          <img v-if="(loading[index].value || finished[index].value) && feed.value.vendor && feed.value.vendor.user.picture" :src="$cloudinary256x256 + feed.value.vendor.user.picture" class="filter-img">
          <img v-else-if="loading[index].value" src="/img/anonyme.jpg" class="filter-img">


          <!-- video -->
          <div v-if="!finished[index].value && feed.type == 'live'" :ref="'live' + index" :id="'live' + index" class="swipe-livestream" style="width: 100%; height: 100vh;"></div>
          <div v-if="videos[index].value && !finished[index].value && feed.type !== 'live'" :ref="'player' + index" :id="'player' + index" class="swipe-player" :style="{'visibility': loading[index].value ? 'hidden': 'visible'}" style="width: 100%; height: 100vh;">
            <video :ref="'videoPlayer' + index" class="video-js vjs-default-skin" preload="auto"></video>
          </div>

          
          <!-- visible -->
          <div class="visible" v-observe-visibility="{ callback: (isVisible, entry) => visibilityChanged(isVisible, entry, index),intersection: { threshold: 1 }, throttle: throttle}"></div>


          <!-- viewers -->
          <div v-if="feed.type == 'live' && !finished[index].value" :style="{'top': safeareaTop2 }" class="bp9cbjyn jk6sbkaj kdgqqoy6 ihh4hy1g qttc61fc rq0escxv pq6dq46d datstx6m jb3vyjys p8fzw8mz qt6c0cv9 pcp91wgn afxn4irw m8weaby5 ee40wjg4 badge-viewers">
            <Vue3Lottie :animationData="LottieJSON" :width="15"/>
            <span class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa ht8s03o8 a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb mdeji52x j5wam9gi lrazzd5p ljqsnud1" style="margin-top: 4px;">
              <span style="padding-left: 5px; font-weight: bold;">{{ viewers }}</span>
            </span>
          </div>


          <!-- end live -->
          <div v-if="finished[index].value" class="finished">
            <h4>Le LIVE est terminé</h4>
            <div class="video-page__influencer-badge6">
              <div class="video-page__influencer-img">
                <img v-if="feed.value.vendor.user.picture" :src="$cloudinary256x256 + feed.value.vendor.user.picture"/>
                <img v-else src="/img/anonyme.jpg"/>
              </div>
              <!-- <div v-if="following[index].value == false && feed.value.vendor.user.id != user.id" @click="follow(feed.value.vendor.user.id)" class="follow">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 32px; height: 32px; border: 1px solid white; border-radius: 100px;">
                  <path d="M352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z" style="fill: white;"></path>
                  <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256C397.4 512 512 397.4 512 256S397.4 0 256 0zM352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z" style="fill: #ff2f80;"></path>
                </svg>
              </div> -->
            </div>
            <div class="video-page__influencer-username6" style="font-weight: 600">{{ feed.value.vendor.pseudo }}</div>
          </div>
          <div v-if="finished[index].value" class="finished-swipe">
            <Vue3Lottie :animationData="LottieJSON2" :width="40" style="transform: rotate(180deg);"/>
            <h4>Swipe vers le haut pour passer au prochain</h4>
          </div>


          <!-- purchase -->
          <div v-if="purchase" style="position: absolute; z-index: 100000000; justify-content: center; text-align: center; margin: 0px auto; align-items: center; height: 100vh; width: 100vw;">
            <div class="video-page__influencer-badge7" style="background: none; left: initial; position: relative; margin: 0px auto; text-align: center; justify-content: center;    height: 100vh; width: 100vw;">
              <img v-if="user.picture" :src="$cloudinary256x256 + user.picture" class="bounce-in" style="border-radius: 50%; width: 85px; height: 85px; object-fit: cover; position: absolute; z-index: 100000000; border: 4px solid white; margin-bottom: 150px;" />
              <img v-else src="/img/anonyme.jpg" class="bounce-in" style="border-radius: 50%; width: 85px; height: 85px; object-fit: cover; position: absolute; z-index: 100000000; border: 4px solid white; margin-bottom: 150px;" />
              <div class="bounce-in" style="text-shadow: rgba(0,0,0,.5) 0 0 2px; font-weight: 600; font-size: 20px; color: white;">Merci {{ user.firstname }} !</div>
            </div>
          </div>



          <!-- profil -->
          <div v-if="feed.value.vendor && !finished[index].value" :style="{'top': safeareaTop }" style="z-index: 15; position: absolute; padding: 0px; background: rgba(0, 0, 0, 0.25); padding: 4px 3px 0px 4px; width: 234px; border-radius: 30px; left: calc(50vw - 117px);" class="checkout__header">
            <div style="display: flex;">
              <div @click="goToProfile(feed.value.vendor)">
                <img v-if="feed.value.vendor.user.picture" :src="$cloudinary256x256 + feed.value.vendor.user.picture" style="width: 41px; height: 41px; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10000; margin-right: 5px;"/>
                <img v-else src="/img/anonyme.jpg" style="width: 41px; height: 41px; border-radius: 30px; left: 12px; top: 12px; object-fit: cover; z-index: 10000; margin-right: 5px;"/>
              </div>
              <div @click="goToProfile(feed.value.vendor)" class="checkout__title" style="margin-bottom: 0px; color: white; font-size: 16px; line-height: 26px; text-transform: capitalize; font-weight: 500; text-align: left; margin-left: 5px; width: 100px;">
                <div style="font-size: 13px;line-height: 22px;width: 100px;text-overflow: ellipsis;overflow: hidden;">
                  {{ feed.value.vendor.pseudo }}
                </div>
                <div style="text-align: left; font-size: 12px; margin-top: -3px; display: flex;">
                  <div style="padding-right: 5px;">
                    <img src="/img/heart-red.svg" style="width: 14px; height: 14px; margin-bottom: 3px;" />
                  </div>
                  <div>{{ $formatLikes(totalLikes[index].value) }}</div>
                </div>
              </div>
              <div v-if="feed.value.vendor.user.id != user.id" style="margin-top: 4px;">
                <div v-if="following[index].value == false" @click="follow(feed.value.vendor.user.id)" class="btn-swipe" style="padding: 6px 16px; color: white; font-size: 13px; text-align: center; width: 69px; border-radius: 30px;">Suivre</div>
                <div v-else class="btn-swipe" style="padding: 6px 16px; color: white; font-size: 13px; text-align: center; width: 69px; border-radius: 30px;">
                   <img src="/img/check-white.svg" style="width: 18px; height: 18px; transform: none; margin-right: 0px;" />
                </div>
              </div>
            </div>
          </div>



          <!-- close feed -->
          <div v-if="!finished[index].value" @click="goHome()" :style="{'top': safeareaTop3 }" class="video-page__influencer-badge3" style="flex-direction: column;">
            <div class="video-page__influencer-username-holder">
              <span class="video-page__influencer-video-count">
                <img src="/img/times.svg" style="width: 35px; height: 35px; padding: 5px; fill: white;"/>
              </span>
            </div>
          </div>

          

          <!-- comments -->
          <div v-if="comments[index].value.length && !finished[index].value" class="scrollToMe" ref="scrollToMe" :style="[comments[index].value.length > 3 ? {'-webkit-mask-image': '-webkit-gradient(linear, 0% 0%, 0% 20%, from(rgba(0, 0, 0, 0)), to(#272c30))', 'bottom': safeareaBottom3 } : { 'bottom': safeareaBottom3 } ]" style="margin-right: 50px;">
            <div v-for="comment in comments[index].value" style="display: flex;">
              <div style="padding-right: 6px;">
                <img v-if="comment.user.picture" :src="$cloudinary256x256 + comment.user.picture" class="video-page__influencer-img">
                <img v-else src="/img/anonyme.jpg" class="video-page__influencer-img">
              </div>
              <div class="video-page__influencer-badge">
                <div class="video-page__influencer-username-holder">
                  <div class="video-page__influencer-username"> 
                    <div v-if="comment.user.vendor" class="video-page__influencer-title">{{ comment.user.vendor.pseudo }}</div>
                    <div v-else class="video-page__influencer-title">{{ comment.user.firstname }} {{ comment.user.lastname }}</div>
                    <div class="video-page__influencer-content">{{ comment.content }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          
          <!-- product -->
          <div v-if="feed.type == 'live' && feed.value.liveProducts.length > 0 && !finished[index].value" @click="showProduct(feed.value.liveProducts[display - 1].product)" class="video-page__product-box" :style="{'bottom': safeareaBottom2 }">
            <div class="video-page__product-top">
              <div class="video-page__image">
                <img v-if="feed.value.liveProducts[display - 1].product.uploads.length" :src="$cloudinary256x256 + feed.value.liveProducts[display - 1].product.uploads[0].filename">
                <img v-else src="/img/no-preview.png">
              </div>
              <div class="video-page__info">
                <div>
                  <h5 class="video-page__name"> {{ feed.value.liveProducts[display - 1].product.title }}</h5>
                </div>
                <div class="video-page__price-row">
                  <div class="video-page__price">
                    <div class="video-page__price-line">
                      <div class="video-page__price" :style="[feed.value.liveProducts[display - 1].product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]">
                        {{ $formatPrice(feed.value.liveProducts[display - 1].product.price) }}€ 
                        <span v-if="feed.value.liveProducts[display - 1].product.compareAtPrice" class="disc">
                          {{ $formatPrice(feed.value.liveProducts[display - 1].product.compareAtPrice) }}€ 
                          <img v-if="feed.value.vendor.promotions.length && feed.value.vendor.promotions.find(promo => promo.isActive === true)" src="/img/discount.svg" style="width: 22px; height: 22px; transform: rotate(-30deg); margin-bottom: 5px; margin-left: 9px;"/>
                        </span> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="feed.type == 'clip' && feed.value.product && !finished[index].value" @click="showProduct(feed.value.product)" class="video-page__product-box" :style="{'bottom': safeareaBottom2 }">
            <div class="video-page__product-top">
              <div class="video-page__image">
                <img v-if="feed.value.product.uploads.length" :src="$cloudinary256x256 + feed.value.product.uploads[0].filename">
                <img v-else src="/img/no-preview.png">
              </div>
              <div class="video-page__info">
                <div>
                  <h5 class="video-page__name"> {{ feed.value.product.title }}</h5>
                </div>
                <div class="video-page__price-row">
                  <div class="video-page__price">
                    <div class="video-page__price-line">
                      <div class="video-page__price" :style="[feed.value.product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]">
                        {{ $formatPrice(feed.value.product.price) }}€ 
                        <span v-if="feed.value.product.compareAtPrice" class="disc">
                          {{ $formatPrice(feed.value.product.compareAtPrice) }}€ 
                          <img v-if="feed.value.vendor.promotions.length && feed.value.vendor.promotions.find(promo => promo.isActive === true)" src="/img/discount.svg" style="width: 22px; height: 22px; transform: rotate(-30deg); margin-bottom: 5px; margin-left: 9px;"/>
                        </span> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          

          <!-- send comment -->
          <div v-if="!finished[index].value" @click="openPopup()" class="video-page__influencer-badge-send" :style="{'bottom': safeareaBottom }" style="left: 15px; right: 215px;">
            <div class="video-page__influencer-username-holder">
              <div class="video-page__influencer-username"> Commenter...</div>
              <span class="video-page__influencer-video-count">
                <span class="icon icon--watched-video"></span>
              </span>
            </div>
          </div>

          <div v-if="!finished[index].value" :style="{'bottom': safeareaBottom }" style="position: absolute; background-color: rgba(0, 0, 0, 0.25); right: 15px; display: flex; position: absolute; z-index: 20; border-radius: 25px; align-items: center;">
            <!-- cart -->
            <div @click="showCart()" class="video-page__influencer-username-holder" style="padding-left: 10px;">
              <span class="video-page__influencer-video-count">
                <img src="/img/bag.svg" style="width: 23px; padding: 0px; height: 23px; width: 40px; height: 40px; padding: 8px;" />
              </span>
              <span v-if="updateCart > 0" class="counter-badge" :style="{'bottom': safeareaBottom4 }" style="right: 141px; height: 14px; width: 14px; font-size: 10px; font-weight: 600">
                {{ updateCart }}
              </span>
            </div>

            <!-- likes -->
            <div @click="addAnimation()" class="video-page__influencer-username-holder">
              <span class="video-page__influencer-video-count">
                <img src="/img/heart-feed.svg" style="width: 40px; height: 40px; padding: 8px; margin: 0px 4px;" />
              </span>
            </div>

            <!-- share -->
            <div @click="share()" class="video-page__influencer-username-holder">
              <span class="video-page__influencer-video-count">
                <img src="/img/share.svg" style="width: 23px; padding: 0px; height: 23px; width: 40px; height: 40px; padding: 8px;" />
              </span>
            </div>

            <!-- shop -->
            <div @click="showShop(feed.value.vendor)" class="video-page__influencer-username-holder" style="padding-right: 10px;">
              <span class="video-page__influencer-video-count">
                <img src="/img/all-products.svg" style="width: 23px; padding: 0px; height: 23px; width: 40px; height: 40px; padding: 6px;" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        <img src="/img/loading-feed.png" style="width: 100%; height: 100vh; object-fit: cover;">
      </div>
    </template>

    <!-- input comment -->
    <div v-if="popup" class="css-1dko8fk" :style="{'bottom': writeInput }" style="height: 55px; border-radius: 0px;">
      <div class="css-miqn2j">
        <input v-focus v-click-away="away" placeholder="Écrivez ici..." type="text" class="css-9gu6qp" v-model="content" style="border: 2px solid #ff2f80; background: white"/>
      </div>
      <button id="btnSend" class="css-il3d4y" style="padding: 0px;">
        <img id="imgSend" src="/img/send.svg" style="height: 36px; height: 36px;"/>
      </button>
    </div>
    

    <!-- product popup -->
    <div v-if="popupProduct" class="store-products-item__login-popup store-products-item__login-popup--active product-popup">
      <div @click="hideProduct()" style="display: flex;">
        <div class="scroll-indicator" style="margin: 15px auto 0px;"></div>
      </div>
      <img v-if="user.favoris.find(favoris => favoris.product.id === product.id)" @click="favoris(product)" src="/img/circle-heart-full.svg" style="width: 35px; height: 35px; position: absolute; top: 42px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222); pointer-events: auto;"/>
      <img v-else @click="favoris(product)" src="/img/circle-heart.svg" style="width: 35px; height: 35px; position: absolute; top: 42px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222); pointer-events: auto;"/>
      <Product :product="product" @selectVariant="selectVariantChild"></Product>
    </div>
    <div v-if="popupProduct" class="product-popup-btn">
      <div v-if="product.quantity > 0" class="groups">
        <div @click="addToCart()" class="btn-swipe btn-addtoCart">Ajouter</div>
        <div @click="goCheckout()" class="btn-swipe btn-checkout">
          <span v-if="loadingShipping">
            <svg viewBox="25 25 50 50" class="loading">
              <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
            </svg>
          </span>
          <span v-else>Acheter</span>
        </div>
      </div>
      <div v-else class="groups">
        <div class="btn-swipe btn-checkout" style="color: rgb(170, 170, 170); background: #eff1f6; width: 100%">Épuisé</div>
      </div>
    </div>


    <!-- follow popup -->
    <div v-if="popupFollow" class="store-products-item__login-popup store-products-item__login-popup--active follow-popup">
      <img v-if="data[visible].value.vendor.user.picture" :src="$cloudinary256x256 + data[visible].value.vendor.user.picture">
      <img v-else src="/img/anonyme.jpg">
      <div style="margin-bottom: 5px; font-size: 16Px;">{{ data[visible].value.vendor.pseudo }}</div>
      <p class="follow-text">Abonne-toi au vendeur pour être prévenu quand il passera en LIVE.</p>
      <div @click="follow(data[visible].value.vendor.user.id)" class="btn-swipe" style="color: white; text-align: center; margin: 10px 0px 25px;">Suivre</div>
    </div>


    <!-- cart popup -->
    <div v-if="popupCart" class="store-products-item__login-popup store-products-item__login-popup--active cart-popup">
      <div @click="hideCart()" style="display: flex;">
        <div class="scroll-indicator"></div>
      </div>
      <div style="margin: 0px;">
        <Cart :type="'popup'" @updateCart="updateCartChild" @showCheckout="showCheckoutChild"></Cart>
      </div>
    </div>



    <!-- checkout popup -->
    <div v-if="popupCheckout" class="store-products-item__login-popup store-products-item__login-popup--active checkout-popup">
      <Checkout @paymentSuccess="paymentSuccessChild" @hideCheckout="hideCheckoutChild"></Checkout>
    </div>



    <!-- shop popup -->
    <div v-if="popupShop" class="store-products-item__login-popup store-products-item__login-popup--active shop-popup" style="padding-bottom: 0px;">
      <div @click="hideShop()" style="display: flex;">
        <div class="scroll-indicator"></div>
      </div>
      <div class="checkout__header" style="padding-right: 20px; padding-left: 20px; padding-bottom: 15px;">
        <div class="checkout__title">Boutique</div>
      </div>
      <div v-if="shop.length" class="checkout__body items">
        <div class="lasted--product">
          <div v-for="product in shop" @click="showProduct(product)" class="product--item">
            <img v-if="product.uploads.length" :src="$cloudinary256x256 + product.uploads[0].filename" style="width: 90px; height: 90px;">
            <img v-else src="/img/no-preview.png" style="width: 90px; height: 90px;">
            <div class="details">
              <div class="title">{{ product.title }}</div>
              <div class="price" style="margin-top: 8px; font-weight: 500" :style="[product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]">
                {{ $formatPrice(product.price) }}€ 
                <span v-if="product.compareAtPrice" class="disc" style="font-size: 12px; text-decoration: line-through; color: #999; padding-left: 5px; font-weight: 500;">
                  {{ $formatPrice(product.compareAtPrice) }}€ 
                </span> 
              </div>
            </div>
            <div v-if="data[visible].value.vendor.promotions.length && data[visible].value.vendor.promotions.find(promo => promo.isActive === true)" style="margin-right: 10px;">
              <img src="/img/discount.svg" style="width: 25px; height: 25px; transform: rotate(-30deg); margin-bottom: 5px; margin-left: 9px;"/>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="loadingShop">
        <div class="loader2">
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.feed iframe {
  height: 100vh !important;
}
.checkout__element iframe {
  height: 20px !important;
}

</style>

<style scoped src="../assets/css/feed.css"></style>

<script>
import { useMainStore } from '../stores/useMainStore';
import { useRoute } from 'vue-router';
import fcm from '../utils/fcm.js';
import Pusher from 'pusher-js';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Checkout from '../components/Checkout.vue';
import Product from '../components/Product.vue';
import Cart from '../components/Cart.vue';
import LottieJSON from '../assets/lottie/live.json';
import LottieJSON2 from '../assets/lottie/arrow.json';


export default {
  name: 'Feed',
  components: {
    Product,
    Cart,
    Checkout,
  },
  data() {
    const route = useRoute();
    const mainStore = useMainStore();
    
    return {
      mainStore,
      anchor: route.params.index,
      type: route.params.type,
      profileId: route.params.profileId,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      banned: window.localStorage.getItem("banned") ? JSON.parse(window.localStorage.getItem("banned")) : [],
      pusher: new Pusher('55da4c74c2db8041edd6', { cluster: 'eu' }),
      LottieJSON,
      LottieJSON2,
      players: [], 
      data: [],
      videos: [],
      animationSpeed: 1,
      animationSpeed2: 2,
      following: [],
      followers: [],
      totalLikes: [],
      comments: [],
      finished: [],
      product: null,
      variant: null,
      shop: [],
      viewers: 0,
      display: 1,
      visible: 0,
      loading: [],
      popup: false,
      cart: true,
      safeareaBottom: '25px',
      safeareaBottom2: '82px',
      safeareaBottom3: '210px',
      safeareaBottom4: '32px',
      safeareaTop: '25px',
      safeareaTop2: '37px',
      safeareaTop3: '32px',
      writeInput: '0px',
      content: "",
      loadingShop: true,
      loadingShipping: false,
      popupProduct: false,
      popupCart: false,
      popupShop: false,
      popupCheckout: false,
      popupFollow: false,
      purchase: false,
      throttle: 1000,
      myPlayer: null,
      http: null,
      client: null,
      remoteTracks: {},
      agoraAppId: '0c6b099813dc4470a5b91979edb55af0',
      agoraChannel: null,
      agoraToken: null,
    }
  },
  async created() {
    if (this.$Capacitor.isNativePlatform()) {
      await this.$StatusBar.setStyle({ style: this.$Style.Dark });
      await this.$StatusBar.setOverlaysWebView({ overlay: true });
      await this.$StatusBar.setBackgroundColor({ color: '#ffffffff' });
    }

    if (!this.token) {
      this.$router.push({ name: 'Welcome' });
    }

    this.fetchSafeAreaInsets();
    //   fcm.onDeviceReady();

    // Récupération du profil utilisateur
    if (this.mainStore.user.length === 0) {
      this.$CapacitorHttp.get({
        url: `${this.baseUrl}/user/api/profile`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        const userData = response.data;
        console.log(userData);
        this.mainStore.setUser(userData);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du profil utilisateur :', error);
      });
    }

    // Gestion des types de requêtes
    if (this.type === 'profile') {
      this.$CapacitorHttp.get({
        url: `${this.baseUrl}/api/profile/${this.profileId}/clips`,
      })
      .then((response) => {
        this.refresh(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des clips du profil :', error);
      });
    } else if (this.type === 'trending') {
      this.$CapacitorHttp.get({
        url: `${this.baseUrl}/user/api/clips/trending`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.mainStore.setClipsTrending(response.data);
        this.refresh(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des clips tendance :', error);
      });
    } else {
      this.$CapacitorHttp.get({
        url: `${this.baseUrl}/user/api/feed`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.refresh(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération du feed :', error);
      });
    }

    if (this.mainStore.following.length === 0) {
      this.loadFollowing();
    }
  },
  async beforeDestroy() {
    this.leaveChannel();

    this.players.forEach((player, index) => {
      this.destroyPlayer(index);
    });
  },
  computed: {
    user() {
      return this.mainStore.getUser;
    },
    lineItems() {
      return this.mainStore.getLineItems;
    },
    updateCart() {
      let count = 0;
      if (this.lineItems.length) {
        this.lineItems.map(lineItem => {
          count += lineItem.quantity;
        });
      }
      return count;
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    async fetchSafeAreaInsets() {
      const deviceInfo = await this.$Device.getInfo();
      if (deviceInfo.platform === 'ios') {
        this.safeareaBottom = 'calc(env(safe-area-inset-bottom) + 0px)';
        this.safeareaBottom2 = 'calc(env(safe-area-inset-bottom) + 57px)';
        this.safeareaBottom3 = 'calc(env(safe-area-inset-bottom) + 185px)';
        this.safeareaBottom4 = 'calc(env(safe-area-inset-bottom) + 7px)';
        this.safeareaTop = 'calc(env(safe-area-inset-top) + 0px)';
        this.safeareaTop2 = 'calc(env(safe-area-inset-top) + 12px)';
        this.safeareaTop3 = 'calc(env(safe-area-inset-top) + 7px)';
        this.throttle = 500;
      }
    },
    async initializeAgora(id, index) {
      console.log(id);
      console.log("client initialized");
      this.client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });
      this.agoraChannel = "Live" + id;
      await this.getAgoraToken(id, index);
    },
    async getAgoraToken(id, index) {
      try {
        const response = await this.$CapacitorHttp.get({
          url: `${this.baseUrl}/user/api/agora/token/audience/${id}`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        const result = JSON.parse(response.data);
        console.log(result);

        this.agoraToken = result.token;
        this.joinChannel(index);
      } catch (error) {
        console.error("Error getting Agora token:", error);
      }
    },
    async joinChannel(index) {
      try {
        console.log("Joining channel...");
        console.log(index);

        // Lorsque l'hôte arrête de publier un flux
        this.client.on("user-unpublished", (user, mediaType) => {
          console.log(`L'utilisateur ${user.uid} a arrêté de publier ${mediaType}`);

          if (mediaType === 'video') {
          // Gestion spécifique à l'arrêt de la vidéo
            console.log('video');
          }
          if (mediaType === 'audio') {
          // Gestion spécifique à l'arrêt de l'audio
            console.log('audio');
          }

          this.handleUserUnpublished(user);
        });

        // Lorsque l'utilisateur devient hors ligne (quitte le canal ou déconnexion)
        this.client.on("user-offline", (user, reason) => {
          console.log(`Utilisateur ${user.uid} est hors ligne. Raison: ${reason}`);

          if (user.uid === this.data[index].value.vendor.user.id) {
           if (this.data[index].type == "live") {
              this.finished[index].value = true;
              this.leaveChannel();
            }
          } else {
            console.log("A spectator has left the channel");
          }

        });

        // Suivre les changements d'état de la connexion
        this.client.on("connection-state-changed", (curState, prevState, reason) => {
          console.log(`État de la connexion changé de ${prevState} à ${curState}. Raison: ${reason}`);
          if (curState === "DISCONNECTED") {
            console.log("La connexion a été perdue");
            // Affiche un message d'erreur et tente de reconnecter
          }
        });

        // En cas de perte de connexion
        this.client.on("connection-lost", () => {
          console.log("Connexion perdue avec le canal");
          // Peut-être essayer une reconnexion ou afficher une notification
        });

        // Gestion des erreurs générales
        this.client.on("error", (err) => {
          console.log("Erreur RTC: ", err);
        });


        // Optionnel: Suivi de l'état vidéo du vendeur
        this.client.on("remote-video-state-changed", (uid, state, reason) => {
          console.log(`État de la vidéo de l'utilisateur ${uid} a changé. État: ${state}, Raison: ${reason}`);
        });

        this.client.on("user-left", (user) => {
          console.log("User left:", user.uid);

          // Vérifier si c'est l'hôte qui a quitté
          if (user.uid === this.data[index].value.vendor.user.id) {
             console.log("The host has left the channel");

             if (this.data[index].type == "live") {
              this.finished[index].value = true;
              this.leaveChannel();
            }
            // } else {
              // if (!this.popupShop && !this.popupCart && !this.popupProduct && !this.popupCheckout) {
              //   var el = document.getElementById('feed');
              //   if (el) {
              //     el.scrollTop += window.innerHeight;
              //   }
              // }
          } else {
            console.log("A spectator has left the channel");
          }
        });

        this.client.on("user-published", async (user, mediaType) => {
          console.log("New user published", user);

          // S'abonner à l'utilisateur qui vient de publier un flux
          await this.client.subscribe(user, mediaType);
          console.log("Subscribed to new user", user);

          if (mediaType === 'video') {
            const remoteVideoTrack = user.videoTrack;
            this.remoteTracks[user.uid] = {
              ...this.remoteTracks[user.uid],
              videoTrack: remoteVideoTrack
            };

            this.$nextTick(() => {
              const videoElement = this.$refs['live' + index];
              console.log(videoElement);
              
              if (videoElement && videoElement[0]) {
                remoteVideoTrack.play(videoElement[0]);
              } else {
                console.log('Video element not found');
              }
            });
          }

          if (mediaType === 'audio') {
            const remoteAudioTrack = user.audioTrack;
            this.remoteTracks[user.uid] = {
              ...this.remoteTracks[user.uid],
              audioTrack: remoteAudioTrack
            };
            remoteAudioTrack.play();
          }
        });

        // Rejoindre le canal
        await this.client.join(this.agoraAppId, this.agoraChannel, this.agoraToken, this.user.id);
        await this.client.setClientRole('audience');
        this.loading[index].value = false;

        console.log("Successfully joined channel");

        // Vérifier si des utilisateurs sont déjà dans le canal et ont publié des flux
        const remoteUsers = this.client.remoteUsers;

        console.log("remote users");
        console.log(remoteUsers);
        if (remoteUsers.length > 0) {
          console.log("Existing remote users found:", remoteUsers);
          for (let user of remoteUsers) {
            if (user.videoTrack) {
              console.log("Subscribing to existing user's video");
              
              await this.client.subscribe(user, 'video');
              const videoElement = this.$refs['live' + index];
              console.log(videoElement);
              
              if (videoElement) {
                console.log('Playing video on element:', videoElement[0]);
                user.videoTrack.play(videoElement[0]);
              } else {
                console.log('Video element not found');
              }
            }

            if (user.audioTrack) {
              console.log("Subscribing to existing user's audio");
              await this.client.subscribe(user, 'audio');
              user.audioTrack.play();
            }
          }
        }
      } catch (err) {
        console.log("Failed to join channel and subscribe to streams", err);
      }
    },
    async leaveChannel() {
      if (this.client) {
        for (let uid in this.remoteTracks) {
          const { videoTrack, audioTrack } = this.remoteTracks[uid];
          if (videoTrack) {
            videoTrack.stop();
            videoTrack.close();
          }
          if (audioTrack) {
            audioTrack.stop();
            audioTrack.close();
          }
          delete this.remoteTracks[uid];
        }

        try {
          await this.client.leave();
          console.log("Left the channel successfully");
        } catch (err) {
          console.log("Failed to leave the channel", err);
        }
      }
    },
    handleUserUnpublished(user) {
      console.log("User unpublished:", user);
      if (this.remoteTracks[user.uid]) {
        if (this.remoteTracks[user.uid].videoTrack) {
          this.remoteTracks[user.uid].videoTrack.stop();
        }
        if (this.remoteTracks[user.uid].audioTrack) {
          this.remoteTracks[user.uid].audioTrack.stop();
        }
        delete this.remoteTracks[user.uid];
      } else {
        console.log('Le flux pour cet utilisateur n\'existe pas.');
      }
    },
    visibilityChanged(isVisible, entry, index) {
      if (isVisible) {
        if (index != this.visible) {
          console.log(index, this.visible);
          this.popup = false;
          this.popupProduct = false;
          this.popupCart = false;
          this.popupShop = false;
          this.display = 1;
          this.viewers = 0;
          this.product = null;
          this.variant = null;

          if (this.data[this.visible].type == "live") {
            this.stopLive();
          } else {
            this.destroyPlayer(this.visible);
          }

          var iframes = document.getElementsByTagName("iframe");
          console.log(iframes);

          if (iframes.length) {
            for (let i = 0; i < iframes.length; i++) {
              iframes[i].remove();
            }
          }

          this.videos[this.visible].value = "";
          this.comments[this.visible].value = [];
          this.loading[this.visible].value = true;
          this.loading[index].value = true;
          this.visible = index;

          var value = this.data[index].value;
          this.videos[index].value = value.fileList;
          this.comments[index].value = value.comments;

          if (this.data[index].type == "live") {
            this.display = value.display;
            this.startLive(value);

            setTimeout(() => {
              if (this.following[index].value == false && value.vendor.user.id != this.user.id) {
                this.popupFollow = true;
                setTimeout(() => {
                  this.popupFollow = false;
                }, 30000); // 30 secondes
              }
            }, Math.floor(Math.random() * (300000 - 180000) + 180000)); // entre 3 et 5 minutes
          }

          if (this.comments[index].value.length > 0) {
            this.scrollToElement();
          }

          this.launchPlayer(value, index);
        }
      }
    },
    initializePlayer(index) {
      this.$nextTick(() => {
        const videoElement = this.$refs[`videoPlayer${index}`][0];

        if (videoElement) {
          var videoSrc = this.$amazonS3 + this.videos[index].value;
          const player = videojs(videoElement, {
            controls: false,
            autoplay: true,
            playsinline: true,
            preload: 'auto',
            fluid: true,
            sources: [
              {
                src: videoSrc,
                type: 'application/x-mpegURL' // For HLS (.m3u8)
              }
            ]
          });
          this.players[index] = player;
          this.loading[index].value = false;
        } else {
          console.log('Video element not found');
        }
      });
    },
    destroyPlayer(index) {
      if (this.players[index]) {
        this.players[index].dispose();
        this.players.splice(index, 1);
      }
    },
    launchPlayer(value, index) {
      console.log(value, index);
      if (this.data[index].type == "live") {
        console.log(value);
        this.initializeAgora(value.id, index);
      } else {
        this.initializePlayer(index);
      }
    },
    async loadFollowing() {
      try {
        const response = await this.$CapacitorHttp.get({
          url: `${this.baseUrl}/user/api/following`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        console.log(response.data);
        this.mainStore.setFollowing(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs suivis :", error);
      }
    },
    showProduct(product) {
      this.$Haptics.impact({ style: 'medium' });
      this.product = product;
      this.variant = null;
      this.popupShop = false;
      this.popupCart = false;
      this.popupProduct = true;
    },
    hideProduct() {
      this.popupProduct = false;
      this.product = null;
      this.variant = null;
    },
    async goCheckout() {
      // if (this.data[this.visible].type == "live") {
      //   this.myPlayer.muted = true;
      // } else {
      //   this.myPlayer.pause();
      // }

      this.$Haptics.impact({ style: 'medium' });

      this.loadingShipping = true;
      await this.addToCart();
      this.getShippingPrice();
    },
    async getShippingPrice() {
      if (this.user.shippingAddresses.length) {
        this.mainStore.setShippingProducts([]);

        try {
          const response = await this.$CapacitorHttp.request({
            method: 'POST',
            url: `${this.baseUrl}/user/api/shipping/price`,
            headers: { Authorization: `Bearer ${this.token}` },
            data: { lineItems: this.lineItems },
          });

          this.mainStore.setShippingProducts(response.data);
          this.popupProduct = false;
          this.popupCheckout = true;
          this.loadingShipping = false;
        } catch (error) {
          console.log(error);
          this.popupProduct = false;
          this.popupCheckout = true;
          this.loadingShipping = false;
        }
      } else {
        this.popupProduct = false;
        this.popupCheckout = true;
        this.loadingShipping = false;
      }
    },
    addToCart() {
      this.popupCheckout = false;
      if (!this.loadingShipping) {
        this.popupProduct = false;
      }
      this.popupCart = false;
      this.popupShop = false;

      if (typeof this.product.vendor === "object") {
        var vendor = this.product.vendor.id;
      } else {
        var vendor = this.product.vendor;
      } 

      if (this.lineItems.length) {
        let exist = false;
        let newVendor = false;

        this.lineItems.map(lineItem => {
          if (lineItem.vendor !== vendor) {
            newVendor = true;
          }
        });

        if (!newVendor) {
          this.lineItems.map(lineItem => {
            if (lineItem.variant && this.variant && lineItem.variant.id === this.variant.id) {
              exist = true;
              lineItem.quantity += 1;
            } else if (lineItem.product.id === this.product.id) {
              if (!this.variant) {
                exist = true;
                lineItem.quantity += 1;
              }
            }
          });
        } else {
          exist = true;
          this.confirmReplaceCart(vendor);
        }

        if (!exist) {
          this.lineItems.push({ product: this.product, variant: this.variant, quantity: 1, vendor });
          this.mainStore.setLineItems(this.lineItems);
        }
      } else {
        this.lineItems.push({ product: this.product, variant: this.variant, quantity: 1, vendor });
        this.mainStore.setLineItems(this.lineItems);
      }
    },
    async confirmReplaceCart(vendor) {
      try {
        const { value } = await this.$Dialog.confirm({
          title: 'Nouveau panier ?',
          message: 'Cet article va remplacer votre ancien panier.',
          okButtonTitle: 'Nouveau',
          cancelButtonTitle: 'Conserver',
        });

        if (value) {
          this.lineItems = [];
          this.lineItems.push({
            product: this.product,
            variant: this.variant,
            quantity: 1,
            vendor,
          });
          this.mainStore.setLineItems(this.lineItems);
        } else {
          console.log('L\'utilisateur a choisi de conserver le panier existant.');
        }
      } catch (error) {
        console.error('Erreur lors de la confirmation de remplacement du panier :', error);
      }
    },
    showCart() {
      this.$Haptics.impact({ style: 'medium' });
      this.popupCart = true;
      this.popupProduct = false;
      this.popupShop = false;
    },
    hideCart() {
      this.popupCart = false;
      this.popupShop = false;
      this.popupProduct = false;
    },
    showShop(vendor) {
      this.$Haptics.impact({ style: 'medium' });
      this.popupShop = true;
      this.popupCart = false;
      this.popupProduct = false;
      this.loadShopVendor(vendor.id);
    },
    async loadShopVendor(id) {
      this.loadingShop = true;

      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/shop/${id}`,
          headers: { Authorization: `Bearer ${this.token}` },
        });

        this.shop = response.data;
        this.loadingShop = false;
      } catch (error) {
        console.log(error);
        this.loadingShop = false;
      }
    },
    hideShop() {    
      this.popupShop = false;
      this.popupCart = false;
      this.popupProduct = false;
      this.shop = [];
    },
    async goToProfile(vendor) {
      this.$Haptics.impact({ style: 'medium' });
      await this.stopLive();
      this.$router.push({ name: 'Profile', params: { id: vendor.user.id } });
    },
    openPopup() {
      this.popup = true;
    },
    away(event) {
      if (window.Keyboard && typeof window.Keyboard.hide === 'function') {
        window.Keyboard.hide();
      }
      
      if (event.target.id == "btnSend" || event.target.id == "imgSend") {
        if (this.content && this.content.length > 0) {
          this.send();
        } else {
          this.popup = false;
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

      if (this.user.vendor && this.user.vendor.pseudo) {
        var vendor = { "pseudo": this.user.vendor.pseudo };
      } else {
        var vendor = null;
      }

      this.comments[this.visible].value.push({ "content": content, "user": { "vendor": vendor, "firstname": this.user.firstname, "lastname": this.user.lastname, "picture": this.user.picture } });
      this.scrollToElement();
      
      this.http.post(this.baseUrl + "/user/api/" + this.data[this.visible].type + "/" + this.data[this.visible].value.id + "/comment/add", { "content": content }, { Authorization: "Bearer " + this.token }, (response) => {
      }, (response) => {
        console.log(response.error);
      });
    },
    scrollToElement() {
      setTimeout(() => {
        var el = this.$refs.scrollToMe;

        if (el && el.length > 0) {
          el[0].scrollTop = el[0].scrollHeight;
        }
      }, 200);
    },
    refresh(result) {
      this.popup = false;
      this.popupProduct = false;

      if (result.length) {
        this.data = [];
        this.videos = [];
        this.comments = [];
        this.totalLikes = [];
        this.following = [];
        this.followers = [];
        this.loading = [];
        this.display = 1;
        this.viewers = 0;
        this.visible = 0;

        result.map((element, index) => {
          console.log(element);
          if ("value" in element) {
            var value = JSON.parse(element.value);
            var type = element.type;
          } else {
            var value = element;
            var type = "clip";
          }

          var showElement = true;

          if (this.banned.length > 0) {
            this.banned.map((ban, index) => {
              if (ban.id == value.id) {
                showElement = false;
              }
            });
          }

          if (showElement) {
            this.data.push({ "type": type, "value": value });
            var followers = value.vendor.user.followers;
            var isFollower = false;

            if (followers.length && this.user.following.length) {
              followers.map((follower, index) => {
                this.user.following.map((following, index) => {
                  if (follower.id == following.id) {
                    isFollower = true;
                  }
                });
              });
            }

            this.followers.push({ "value": value.vendor.user.followers.length });
            this.following.push({ "value": isFollower });
            this.totalLikes.push({ "value": value.totalLikes });
            this.loading.push({ "value": true });
            this.finished.push({ "value": false });

            if (this.anchor) {
              if (this.anchor == index) {
                this.videos.push({ "value": value.fileList });
                this.comments.push({ "value": value.comments });

                if (index > 0) {
                  setTimeout(() => {
                    var el = document.getElementById('feed');
                    if (el) {
                      el.scrollTop += window.innerHeight * index;
                    }
                  });
                }

                // si c'est un live
                if (type == "live") {
                  this.display = value.display;
                  this.startLive(value);

                  setTimeout(() => {
                    if (this.following[index].value == false && value.vendor.user.id != this.user.id) {
                      this.popupFollow = true;
                      setTimeout(() => {
                        this.popupFollow = false;
                      }, 30000); // 30 secondes
                    }
                  }, Math.floor(Math.random() * (300000 - 180000) + 180000)); // entre 3 et 5 minutes
                }

                if (this.comments[index].value.length > 0) {
                  this.scrollToElement();
                }

                this.launchPlayer(value, index);
              } else {
                this.videos.push({ "value": "" });
                this.comments.push({ "value": [] });
              }
            } else if (index == 0) {
              this.videos.push({ "value": value.fileList });
              this.comments.push({ "value": value.comments });

              // si c'est un live
              if (type == "live") {
                this.display = value.display;
                this.startLive(value);

                setTimeout(() => {
                  if (this.following[index].value == false && value.vendor.user.id != this.user.id) {
                    this.popupFollow = true;
                    setTimeout(() => {
                      this.popupFollow = false;
                    }, 30000); // 30 secondes
                  }
                }, Math.floor(Math.random() * (300000 - 180000) + 180000)); // entre 3 et 5 minutes
              }

              if (this.comments[index].value.length > 0) {
                this.scrollToElement();
              }

              this.launchPlayer(value, index);
            } else {
              this.videos.push({ "value": "" });
              this.comments.push({ "value": [] });
            }
          }
        });
      } else {
        this.$router.push({ name: 'Account' });
      }
    },
    async goHome() {
      await this.stopLive();
      this.$router.push({ name: 'Home' });
    },
    async stopLive() {
      if (this.data[this.visible].type === "live") {
        this.pusher.unsubscribe(this.data[this.visible].value.channel);
        this.leaveChannel();

        try {
          await this.$CapacitorHttp.request({
            method: 'PUT',
            url: `${this.baseUrl}/user/api/live/${this.data[this.visible].value.id}/update/viewers`,
            headers: { Authorization: `Bearer ${this.token}` },
          });
        } catch (error) {
          console.log("Stop live update views: " + error);
        }
      }
    },
    startLive(value) {
      const channel = this.pusher.subscribe(value.channel);

      channel.bind("pusher:subscription_succeeded", async () => {
        try {
          await this.$CapacitorHttp.request({
            method: 'PUT',
            url: `${this.baseUrl}/user/api/live/${value.id}/update/viewers`,
            headers: { Authorization: `Bearer ${this.token}` },
          });
        } catch (error) {
          console.log("Start live update views: " + error);
        }
      });

      channel.bind("pusher:subscription_error", (response) => {
        console.log("Subscription error: " + response);
      });

      channel.bind(value.event, (data) => {
        console.log(data);

        if ('comment' in data) {
          if (data.comment.user.firstname !== this.user.firstname && data.comment.user.lastname !== this.user.lastname) {
            this.comments[this.visible].value.push(data.comment);
            this.scrollToElement();
          }
        }

        if ('viewers' in data) {
          this.viewers = data.viewers.count;
        }

        if ('banned' in data) {
          this.banned.push({ id: this.data[this.visible].value.id });
          window.localStorage.setItem("banned", JSON.stringify(this.banned));

          this.stopLive();

          this.loading = true;
          this.data.splice(this.visible, 1);
          this.videos.splice(this.visible, 1);
          this.comments.splice(this.visible, 1);
          this.followers.splice(this.visible, 1);
          this.following.splice(this.visible, 1);
          this.finished.splice(this.visible, 1);

          const value = this.data[this.visible].value;
          this.videos[this.visible].value = value.fileList;
          this.comments[this.visible].value = value.comments;

          if (this.data[this.visible].type === "live") {
            this.display = value.display;
            this.startLive(value);
          }

          if (this.comments[this.visible].value.length > 0) {
            this.scrollToElement();
          }

          this.launchPlayer(value, this.visible);
        }

        if ('display' in data) {
          this.display = data.display;
        }

        if ('likes' in data) {
          if (data.likes !== this.user.id) {
            this.totalLikes[this.visible].value += 1;
          }
        }

        if ('order' in data) {
          setTimeout(() => {
            this.purchase = true;
            this.$Haptics.impact({ style: 'heavy' });
            setTimeout(() => {
              this.purchase = false;
            }, 3000);
          }, 1000);
        }
      });
    },
    async follow(id) {
      this.data.map((element, index) => {
        if (element.value.vendor.user.id === id) {
          this.following[index].value = true;
          this.followers[index].value += 1;
          this.popupFollow = false;
        }
      });

      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/follow/${id}`,
          headers: { Authorization: `Bearer ${this.token}` },
        });

        this.mainStore.setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async favoris(product) {
      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/favoris/${product.id}`,
          headers: { Authorization: `Bearer ${this.token}` },
        });

        this.mainStore.setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async share() {
      try {
        this.$Haptics.impact({ style: 'medium' });

        await this.$Share.share({
          title: '#1 Application de Live Shopping',
          text: '#1 Application de Live Shopping',
          url: 'https://swipelive.app',
          dialogTitle: 'Partager Swipe Live',
        });
      } catch (error) {
        console.log('Erreur lors du partage :', error);
      }
    },
    selectVariantChild(variant) {
      console.log(variant);
      this.variant = variant;
    },
    updateCartChild(lineItems) {
      console.log(lineItems);
      this.lineItems = lineItems;
    },
    showCheckoutChild(lineItems) {
      this.lineItems = lineItems;
      this.popupCart = false;
      this.popupProduct = false;
      this.popupShop = false;
      this.popupCheckout = true;

      // if (this.data[this.visible].type == "live") {
      //   this.myPlayer.muted = true;
      // } else {
      //   this.myPlayer.pause();
      // }

      this.$Haptics.impact({ style: 'medium' });
    },
    paymentSuccessChild(order) {
      console.log(order);
      console.log(order.id);
      this.popupCart = false;
      this.popupProduct = false;
      this.popupShop = false;
      this.popupCheckout = false;
      this.lineItems = [];

      if (this.data[this.visible].type == "live") {
        // this.myPlayer.muted = false;
        this.http.get(this.baseUrl + "/user/api/live/" + this.data[this.visible].value.id + "/update/orders/" + order.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
          console.log(response);
        }, (response) => { 
          console.log(response.error); 
        });
      } else {
        // this.myPlayer.play();
        setTimeout(() => {
          this.purchase = true;
          setTimeout(() => {
            this.purchase = false;
          }, 3000);
        }, 1000);
      }
    },
    hideCheckoutChild() {
      this.popupCart = false;
      this.popupProduct = false;
      this.popupShop = false;
      this.popupCheckout = false;
      
      // if (this.data[this.visible].type == "live") {
      //   this.myPlayer.muted = false;
      // } else {
      //   this.myPlayer.play();
      // }
    },
    async addAnimation() {
      this.$Haptics.impact({ style: 'medium' });
      this.totalLikes[this.visible].value = this.totalLikes[this.visible].value + 1;

      const url =
        this.data[this.visible].type === "live"
          ? `${this.baseUrl}/user/api/live/${this.data[this.visible].value.id}/update/likes`
          : `${this.baseUrl}/user/api/clips/${this.data[this.visible].value.id}/update/likes`;

      try {
        await this.$CapacitorHttp.request({
          method: 'PUT',
          url: url,
          headers: { Authorization: `Bearer ${this.token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },
    showAnimation() {
      // ajouter animation
    }
  }
};
</script>

