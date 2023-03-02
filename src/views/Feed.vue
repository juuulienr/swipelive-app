<template>
  <div ref="feed" id="feed" class="feed">
    <div v-if="data.length" v-for="(feed, index) in data" class="feed-scroll">
      <div v-if="feed.value" v-touch:swipe="swipeHandler">

        <!-- background top/bottom -->
        <div v-if="!loading" class="filter-top"></div>
        <div v-if="!loading" class="filter-bottom"></div>
        

        <!-- loader -->
        <div v-if="loading || finished[index].value" class="filter-blur"></div>
        <img v-if="loading && feed.value.vendor && feed.value.vendor.user.picture" :src="cloudinary256x256 + feed.value.vendor.user.picture" class="filter-img">
        <img v-else-if="loading" :src="require(`@/assets/img/anonyme.jpg`)" class="filter-img">


        <!-- viewers -->
        <div v-if="feed.type == 'live' && !finished[index].value" :style="{'top': safeareaTop2 }" class="bp9cbjyn jk6sbkaj kdgqqoy6 ihh4hy1g qttc61fc rq0escxv pq6dq46d datstx6m jb3vyjys p8fzw8mz qt6c0cv9 pcp91wgn afxn4irw m8weaby5 ee40wjg4 badge-viewers">
          <Lottie :options="defaultOptions" :width="20" v-on:animCreated="handleAnimation"/>
          <span class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa ht8s03o8 a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb mdeji52x j5wam9gi lrazzd5p ljqsnud1" style="margin-top: 4px;">
            <span style="padding-left: 5px; font-weight: bold;">{{ viewers }}</span>
          </span>
        </div>


        <!-- end live -->
        <div v-if="finished[index].value" class="finished">
          <h4>Le LIVE est terminé</h4>
          <div class="video-page__influencer-badge6">
            <div class="video-page__influencer-img">
              <img v-if="feed.value.vendor.user.picture" :src="cloudinary256x256 + feed.value.vendor.user.picture"/>
              <img v-else :src="require(`@/assets/img/anonyme.jpg`)"/>
            </div>
            <div v-if="following[index].value == false && feed.value.vendor.user.id != user.id" @click="follow(feed.value.vendor.user.id)" class="follow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 32px; height: 32px; border: 1px solid white; border-radius: 100px;">
                <path d="M352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z" style="fill: white;"></path>
                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256C397.4 512 512 397.4 512 256S397.4 0 256 0zM352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z" style="fill: rgb(255, 39, 115);"></path>
              </svg>
            </div>
          </div>
          <div class="video-page__influencer-username6">{{ feed.value.vendor.businessName }}</div>
        </div>
        <div v-if="finished[index].value" class="finished-swipe">
          <Lottie :options="defaultOptions2" :width="40" v-on:animCreated="handleAnimation" style="transform: rotate(180deg);"/>
          <h4>Swipe vers le haut pour passer au prochain</h4>
        </div>


        <!-- purchase -->
        <div v-if="purchase" style="position: absolute; z-index: 100000000; justify-content: center; text-align: center; margin: 0px auto; align-items: center; height: 100vh; width: 100vw;">
          <div class="video-page__influencer-badge7" style="background: none; left: initial; position: relative; margin: 0px auto; text-align: center; justify-content: center;    height: 100vh; width: 100vw;">
            <img v-if="purchasePicture" class="zoom" :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%; width: 85px; height: 85px; object-fit: cover; position: absolute; z-index: 100000000; border: 4px solid white; margin-bottom: 90px;" />
            <Lottie :options="defaultOptions3" v-on:animCreated="handleAnimation2" style="position: absolute; width: 100vh; height: 100vh"/>
          </div>
        </div>


        <!-- heart animation -->
        <div v-if="videos[index].value && !finished[index].value" class="n7fi1qx3 ni8dbmo4 stjgntxs hzruof5a pmk7jnqg kr520xx4 etr7akla bt9ki6u7 bipmatt0" style="z-index: 100000000">
          <div v-if="anim1" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_6">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim2" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_8">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim3" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_9">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim4" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_10">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim5" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">    
            <div class="_g19 KeyframeAnimation-js_11"> 
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim6" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_12">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim7" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_13">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim8" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_14">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim9" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_15">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim10" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_16">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim11" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_17">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim12" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_18">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim13" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_19">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim14" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_20">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim15" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_21">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim16" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_22">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim17" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_23">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim18" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_24">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim19" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_25">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim20" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_26">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim21" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_27">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim22" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_28">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim23" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_29">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
          <div v-if="anim24" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 22px;">
            <div class="_g19 KeyframeAnimation-js_30">
              <div class="_g19 KeyframeAnimation-js_7">
                <img :src="require(`@/assets/img/love.png`)"/>
              </div>
            </div>
          </div>
        </div>


        <!-- profil -->
        <div v-if="feed.value.vendor && !finished[index].value" class="checkout__header" style="z-index: 15;width: 100%;position: absolute;padding: 0px;" :style="{'top': safeareaTop }">
          <div class="checkout__title" style="margin-bottom: 0px;color: white;font-size: 16px;line-height: 26px;text-transform: capitalize;font-weight: 500;">
            <span>
              <span style="position: absolute; top: 24px; padding: 0px 10px 5px;;">
                <img v-if="following[index].value == false && feed.value.vendor.user.id != user.id" @click="follow(feed.value.vendor.user.id)"  :src="require(`@/assets/img/plus-circle.svg`)" style="width: 21px;height: 21px;background-color: white;border-radius: 100px;">
                <img v-if="clickFollow" :src="require(`@/assets/img/check-circle-white.svg`)" style="width: 21px;height: 21px;background-color: white;border-radius: 100px;">
              </span>
            </span>
            <img v-if="feed.value.vendor.user.picture" @click="goToProfile(feed.value.vendor.user.id)" :src="cloudinary256x256 + feed.value.vendor.user.picture" style="width: 40px;height: 40px;border: 2px solid white;border-radius: 30px;left: 12px;top: 12px;object-fit: cover;z-index: 10000;margin-right: 7px;">
            <img v-else @click="goToProfile(feed.value.vendor.user.id)" :src="require(`@/assets/img/anonyme.jpg`)" style="width: 40px;height: 40px;border: 2px solid white;border-radius: 30px;left: 12px;top: 12px;object-fit: cover;z-index: 10000;margin-right: 3px;"> 
            <span @click="goToProfile(feed.value.vendor.user.id)">{{ feed.value.vendor.businessName }} </span>
            <img v-if="feed.value.vendor.businessType == 'company'" @click="goToProfile(feed.value.vendor.user.id)" :src="require(`@/assets/img/verified-white.svg`)" style="width: 14px; height: 14px; margin-bottom: 3px;"/>
          </div>
        </div>




        <!-- cart + close -->
        <div v-if="!finished[index].value" :style="{'top': safeareaTop }" class="video-page__influencer-badge3" style="background-color: transparent;flex-direction: column;">
          <div @click="goBack()" class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count">
              <img :src="require(`@/assets/img/times.svg`)" style="width: 38px; height: 38px; padding: 5px; fill: white;"/>
            </span>
          </div>
        </div>

        

        <!-- comments -->
        <div v-if="comments[index].value.length && !finished[index].value" class="scrollToMe" ref="scrollToMe" :style="{'bottom': safeareaBottom3 }" style="margin-right: 50px;">
          <div v-for="comment in comments[index].value" style="display: flex;">
            <div style="padding-right: 6px;">
              <img v-if="comment.user.picture" :src="cloudinary256x256 + comment.user.picture" class="video-page__influencer-img">
              <img v-else :src="require(`@/assets/img/anonyme.jpg`)" class="video-page__influencer-img">
            </div>
            <div class="video-page__influencer-badge">
              <div class="video-page__influencer-username-holder">
                <div class="video-page__influencer-username"> 
                  <div v-if="comment.user.vendor" class="video-page__influencer-title">{{ comment.user.vendor.businessName }}</div>
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
              <img v-if="feed.value.liveProducts[display - 1].product.uploads.length" :src="cloudinary256x256 + feed.value.liveProducts[display - 1].product.uploads[0].filename">
              <img v-else :src="require(`@/assets/img/no-preview.png`)">
            </div>
            <div class="video-page__info">
              <div>
                <h5 class="video-page__name"> {{ feed.value.liveProducts[display - 1].product.title }}</h5>
              </div>
              <div class="video-page__price-row">
                <div class="video-page__price">
                  <div class="video-page__price-line">
                    <div class="video-page__price" :style="[feed.value.liveProducts[display - 1].product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]"> {{ feed.value.liveProducts[display - 1].product.price| formatPrice }}€ 
                      <span v-if="feed.value.liveProducts[display - 1].product.compareAtPrice" class="disc">{{ feed.value.liveProducts[display - 1].product.compareAtPrice| formatPrice }}€ <img v-if="feed.value.vendor.promotions.find(promo => promo.isActive === true)" :src="require(`@/assets/img/discount.svg`)" style="width: 22px; height: 22px; transform: rotate(-30deg); margin-bottom: 5px; margin-left: 9px;"/></span> 
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
              <img v-if="feed.value.product.uploads.length" :src="cloudinary256x256 + feed.value.product.uploads[0].filename">
              <img v-else :src="require(`@/assets/img/no-preview.png`)">
            </div>
            <div class="video-page__info">
              <div>
                <h5 class="video-page__name"> {{ feed.value.product.title }}</h5>
              </div>
              <div class="video-page__price-row">
                <div class="video-page__price">
                  <div class="video-page__price-line">
                    <div class="video-page__price" :style="[feed.value.product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]"> {{ feed.value.product.price | formatPrice }}€ 
                      <span v-if="feed.value.product.compareAtPrice" class="disc">{{ feed.value.product.compareAtPrice | formatPrice }}€ 
                        <img v-if="feed.value.vendor.promotions.find(promo => promo.isActive === true)" :src="require(`@/assets/img/discount.svg`)" style="width: 22px; height: 22px; transform: rotate(-30deg); margin-bottom: 5px; margin-left: 9px;"/></span> 
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

        <div v-if="!finished[index].value" :style="{'bottom': safeareaBottom }" style="position: absolute; background-color: hsla(0,0%,100%,.15); right: 15px; display: flex; position: absolute; z-index: 20; border-radius: 25px; align-items: center;">

          <!-- cart -->
          <div @click="showCart()" class="video-page__influencer-username-holder" style="padding-left: 10px;">
            <span class="video-page__influencer-video-count">
              <img :src="require(`@/assets/img/bag.svg`)" style="width: 23px; padding: 0px; height: 23px; width: 40px; height: 40px; padding: 8px;" />
            </span>
            <span v-if="updateCart > 0" class="counter-badge" :style="{'bottom': safeareaBottom4 }" style="right: 141px; height: 14px; width: 14px; font-size: 10px; font-weight: 600">{{ updateCart }}</span>
          </div>

          <!-- likes -->
          <div @click="addAnimation()" class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count">
              <img :src="require(`@/assets/img/heart-feed.svg`)" style="width: 40px; height: 40px; padding: 8px; margin: 0px 4px;" />
            </span>
          </div>

          <!-- share -->
          <div @click="share" class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count">
              <img :src="require(`@/assets/img/share.svg`)" style="width: 23px; padding: 0px; height: 23px; width: 40px; height: 40px; padding: 8px;" />
            </span>
          </div>

          <!-- shop -->
          <div @click="showShop(feed.value.vendor)" class="video-page__influencer-username-holder" style="padding-right: 10px;">
            <span class="video-page__influencer-video-count">
              <img :src="require(`@/assets/img/all-products.svg`)" style="width: 23px; padding: 0px; height: 23px; width: 40px; height: 40px; padding: 6px;" />
            </span>
          </div>
        </div>

        <!-- video -->
        <div v-if="videos[index].value && !finished[index].value" :ref="'player' + index" :id="'player' + index" :style="{'visibility': loading ? 'hidden': 'visible'}"></div>
        
        <!-- visible -->
        <div class="visible" v-observe-visibility="{ callback: (isVisible, entry) => visibilityChanged(isVisible, entry, index),intersection: { threshold: 1 }, throttle: throttle}"></div>
      </div>
    </div>

    <!-- input comment -->
    <div v-if="popup" class="css-1dko8fk" :style="{'bottom': writeInput }" style="height: 55px; border-radius: 0px;">
      <div class="css-miqn2j">
        <input v-focus v-on-clickaway="away" placeholder="Écrivez ici..." type="text" class="css-9gu6qp" v-model="content" style="border: 2px solid #ff2a80; background: white"/>
      </div>
      <button id="buttonSend" class="css-il3d4y" style="padding: 0px;">
        <img id="imgSend" :src="require(`@/assets/img/send.svg`)" style="height: 36px; height: 36px;"/>
      </button>
    </div>
    

    <!-- product popup -->
    <div v-if="popupProduct" class="store-products-item__login-popup store-products-item__login-popup--active product-popup">
      <div @click="hideProduct()" style="display: flex;">
        <div class="scroll-indicator" style="margin: 15px auto 0px;"></div>
      </div>
      <img v-if="user.favoris.find(favoris => favoris.product.id === product.id)" @click="favoris(product)" :src="require(`@/assets/img/circle-heart-full.svg`)" style="width: 35px; height: 35px; position: absolute; top: 42px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222);"/>
      <img v-else @click="favoris(product)" :src="require(`@/assets/img/circle-heart.svg`)" style="width: 35px; height: 35px; position: absolute; top: 42px; right: 22px; z-index: 10000;filter: drop-shadow(0px 0px 1px #222);"/>
      <Product :product="product" @selectVariant="selectVariantChild"></Product>
    </div>
    <div v-if="popupProduct" class="product-popup-btn">
      <div v-if="product.quantity > 0" class="groups">
        <div @click="addToCart()" class="btn-swipe btn-addtoCart">Ajouter</div>
        <div @click="goCheckout()" class="btn-swipe btn-checkout">Acheter</div>
      </div>
      <div v-else class="groups">
        <div class="btn-swipe btn-checkout" style="color: rgb(170, 170, 170); background: #eff1f6; width: 100%">Épuisé</div>
      </div>
    </div>


    <!-- follow popup -->
    <div v-if="popupFollow" class="store-products-item__login-popup store-products-item__login-popup--active follow-popup">
      <img v-if="data[visible].value.vendor.user.picture" :src="cloudinary256x256 + data[visible].value.vendor.user.picture">
      <img v-else :src="require(`@/assets/img/anonyme.jpg`)">
      <div style="margin-bottom: 5px;">{{ data[visible].value.vendor.businessName }}</div>
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
      <div v-if="shop" class="checkout__body items">
        <div class="lasted--product" style="margin-top: 15px;">
          <div v-for="product in shop.products" @click="showProduct(product)" class="product--item">
            <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="width: 90px; height: 90px;">
            <img v-else :src="require(`@/assets/img/no-preview.png`)" style="width: 90px; height: 90px;">
            <div class="details">
              <div class="title">{{ product.title }}</div>
              <div class="price" style="margin-top: 8px; font-weight: 500" :style="[product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#272c30'}]">{{ product.price | formatPrice }}€ 
                <span v-if="product.compareAtPrice" class="disc" style="font-size: 12px; text-decoration: line-through; color: #999; padding-left: 5px; font-weight: 500;">{{ product.compareAtPrice | formatPrice }}€ 
                </span> 
              </div>
            </div>
            <div v-if="shop.promotions.find(promo => promo.isActive === true)" style="margin-right: 10px;">
              <img :src="require(`@/assets/img/discount.svg`)" style="width: 25px; height: 25px; transform: rotate(-30deg); margin-bottom: 5px; margin-left: 9px;"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.feed iframe {
  height: 100vh !important;
}
</style>

<style scoped src="../assets/css/feed.css"></style>

<script>

import Lottie from 'vue-lottie';
import Pusher from 'pusher-js';
import { mixin as clickaway } from 'vue-clickaway';
import * as Sentry from "@sentry/vue";

import Checkout from '../components/Checkout';
import Product from '../components/Product';
import Cart from '../components/Cart';

import * as animationData from '../assets/lottie/live.json';
import * as animationData2 from '../assets/lottie/arrow.json';
import * as animationData3 from '../assets/lottie/purchase.json';

export default {
  name: 'Feed',
  components: {
    Product,
    Cart,
    Checkout,
    Lottie
  },
  mixins: [ clickaway ],
  data() {
    return {
      anchor: this.$route.params.index,
      type: this.$route.params.type,
      profileId: this.$route.params.profileId,
      user: this.$store.getters.getUser,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      banned: window.localStorage.getItem("banned") ? JSON.parse(window.localStorage.getItem("banned")) : [],
      pusher: new Pusher('55da4c74c2db8041edd6', { cluster: 'eu' }),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      defaultOptions: {animationData: animationData},
      defaultOptions2: {animationData: animationData2},
      defaultOptions3: {animationData: animationData3},
      lineItems: this.$store.getters.getLineItems,
      data: [],
      videos: [],
      animationSpeed: 1,
      animationSpeed2: 2,
      following: [],
      comments: [],
      finished: [],
      product: null,
      variant: null,
      shop: [],
      viewers: 0,
      display: 1,
      visible: 0,
      loading: true,
      popup: false,
      cart: true,
      safeareaBottom: '25px',
      safeareaBottom2: '82px',
      safeareaBottom3: '210px',
      safeareaBottom4: '32px',
      safeareaTop: '25px',
      safeareaTop2: '30px',
      writeInput: '0px',
      content: "",
      popupProduct: false,
      popupCart: false,
      popupShop: false,
      popupCheckout: false,
      popupFollow: false,
      purchase: false,
      purchasePicture: false,
      clickFollow: false,
      throttle: 1000,
      myPlayer: null,
      http: null,
      anim1: false,
      anim2: false,
      anim3: false,
      anim4: false,
      anim5: false,
      anim6: false,
      anim7: false,
      anim8: false,
      anim9: false,
      anim10: false,
      anim11: false,
      anim12: false,
      anim13: false,
      anim14: false,
      anim15: false,
      anim16: false,
      anim17: false,
      anim18: false,
      anim19: false,
      anim20: false,
      anim21: false,
      anim22: false,
      anim23: false,
      anim24: false,
      num: 0,
    }
  },
  created() {
    window.StatusBar.styleLightContent();
    window.StatusBar.overlaysWebView(true);

    if (window.cordova && window.cordova.platformId !== "android") {
      this.safeareaBottom = 'calc(env(safe-area-inset-bottom) + 0px)';
      this.safeareaBottom2 = 'calc(env(safe-area-inset-bottom) + 57px)';
      this.safeareaBottom3 = 'calc(env(safe-area-inset-bottom) + 185px)';
      this.safeareaBottom4 = 'calc(env(safe-area-inset-bottom) + 7px)';
      this.safeareaTop = 'calc(env(safe-area-inset-top) + 0px)';
      this.safeareaTop2 = 'calc(env(safe-area-inset-top) + 5px)';
      this.throttle = 500;
    }

    if (window.cordova.plugin && window.cordova.plugin.http) {
      this.http = window.cordova.plugin.http;
      this.http.setDataSerializer('json');
    }

    if (this.token) {
      this.http.get(this.baseUrl + "/user/api/profile", {}, { Authorization: "Bearer " + this.token }, (response) => {
      	console.log(JSON.parse(response.data));
        this.user = JSON.parse(response.data);
        this.$store.commit('setUser', JSON.parse(response.data));
        
        if (window.cordova && window.cordova.platformId == "android" || window.cordova.platformId == "ios") {
          Sentry.setUser({ email: this.user.email });
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.$router.push({ name: 'Welcome' });
    }
  },
  mounted() {
    this.refresh();
    document.addEventListener("pause", this.pause);
    document.addEventListener("resume", this.resume);

    window.cordova.plugin.http.get(this.baseUrl + "/user/api/home", {}, { Authorization: "Bearer " + this.token }, (response) => {
      var result = JSON.parse(response.data);
      this.$store.commit('setCategories', JSON.parse(result.categories));
      this.$store.commit('setClipsTrending', JSON.parse(result.trendingClips));
      this.$store.commit('setClipsLatest', JSON.parse(result.latestClips));
      this.$store.commit('setAllProducts', JSON.parse(result.allProducts));
      this.$store.commit('setProductsTrending', JSON.parse(result.trendingProducts));
    }, (response) => {
      console.log(response.error);
    });
  },
  beforeDestroy() {
    document.removeEventListener('pause', this.pause);
    document.removeEventListener('resume', this.resume);
  },
  computed: {
    updateCart() {
      var count = 0;
      if (this.lineItems.length) {
        this.lineItems.map(lineItem => {
          count = count + lineItem.quantity;
        });
      }
      return count;
    }
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
    handleAnimation(anim) {
      this.anim = anim;
    },
    handleAnimation2(anim) {
      this.anim = anim;
      this.anim.setSpeed(2);
    },
    visibilityChanged(isVisible, entry, index) {
      if (isVisible) {
        if (index != this.visible) {
          console.log(index, this.visible);
          this.loading = true;
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
          }

          this.videos[this.visible].value = "";
          this.comments[this.visible].value = [];
          this.visible = index;

          var value = this.data[index].value;
          this.videos[index].value = value.resourceUri;
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
    launchPlayer(value, index) {
      console.log(typeof value.resourceUri);
      if (typeof value.resourceUri === 'string') {
        setTimeout(() => {
          console.log(value.resourceUri);
          this.myPlayer = window.BambuserPlayer.create(document.getElementById('player'+index), value.resourceUri);
          console.log(this.myPlayer);

          // Listen to player events
          this.myPlayer.addEventListener('ended', () => {
            console.log('player ended');
            if (this.data[index].type == "live") {
              this.finished[index].value = true;
            } else {
              if (!this.popupShop && !this.popupCart && !this.popupProduct && !this.popupShop && !this.popupCheckout) {
                var el = document.getElementById('feed');
                if (el) {
                  el.scrollTop += window.innerHeight;
                }
              }
            }
          });

          this.myPlayer.addEventListener('canplay', () => {
            this.loading = false;
          });

          this.myPlayer.scaleMode = "aspectFill";
          this.myPlayer.play();
        }, 500);
      }
    },
    showProduct(product) {
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
      await this.addToCart();
      this.popupCheckout = true;
      this.myPlayer.muted = true;
    },
    addToCart() {
      this.popupCheckout = false;
      this.popupProduct = false;
      this.popupCart = false;
      this.popupShop = false;

      if (typeof this.product.vendor == "object") {
        var vendor = this.product.vendor.id;
      } else {
        var vendor = this.product.vendor;
      } 

      if (this.lineItems.length) {
        var exist = false;
        var newVendor = false;

        this.lineItems.map(lineItem => {
          if (lineItem.vendor != vendor) {
            newVendor = true;
          }
        });

        if (newVendor == false) {
          this.lineItems.map(lineItem => {
            if (lineItem.variant && this.variant && (lineItem.variant.id == this.variant.id)) {
              exist = true;
              lineItem.quantity += 1;
            } else if (lineItem.product.id == this.product.id) {
              if (!this.variant) {
                exist = true;
                lineItem.quantity += 1;
              }
            }
          });
        } else {
          exist = true;
          navigator.notification.confirm(
            'Ce article va remplacer votre ancien panier',
            (buttonIndex) => {
              if (window.cordova.platformId == "browser") {
                var id = 1;
              } else {
                var id = 2;
              }
              if (buttonIndex == id) {
                this.lineItems = [];
                this.lineItems.push({ "product": this.product, "variant": this.variant, "quantity": 1, "vendor": vendor });
                this.$store.commit('setLineItems', this.lineItems);
                this.$root.$children[0].updateLineItems();
              }
            },   
            'Nouveau panier ?', 
            ['Conserver','Nouveau'] 
          );
        }

        if (!exist) {
          this.lineItems.push({ "product": this.product, "variant": this.variant, "quantity": 1, "vendor": vendor  });
          this.$store.commit('setLineItems', this.lineItems);
        }
      } else {
        this.lineItems.push({ "product": this.product, "variant": this.variant, "quantity": 1, "vendor": vendor  });
        this.$store.commit('setLineItems', this.lineItems);
      }
    },
    showCart() {
      this.popupCart = true;
      this.popupProduct = false;
      this.popupShop = false;
    },
    hideCart() {
      this.popupCart = false;
      this.popupShop = false;
      this.popupProduct = false;
    },
    showShop(shop) {
      this.shop = shop;
      this.popupShop = true;
      this.popupCart = false;
      this.popupProduct = false;
    },
    hideShop() {    
      this.popupShop = false;
      this.popupCart = false;
      this.popupProduct = false;
      this.shop = [];
    },
    goToProfile(profile) {
      this.stopLive();
      this.$store.commit('setProfile', []);
      this.$router.push({ name: 'Profile', params: { id: profile.id } });
    },
    goToAccount() {
      this.stopLive();
      this.$router.push({ name: 'Account' });
    },
    openPopup() {
      this.popup = true;
    },
    away(event) {
      if (event.target.id == "buttonSend" || event.target.id == "imgSend") {
        if (this.content && this.content.length > 0) {
          this.send();
        }
      } else if (event.target.className !== "css-1dko8fk" && event.target.className !== "css-miqn2j") {
        this.popup = false;
        this.content = "";
      }
    },
    send() {
      this.popup = false;

      if (this.user.vendor && this.user.vendor.businessName) {
        var vendor = { "businessName": this.user.vendor.businessName };
      } else {
        var vendor = null;
      }

      this.comments[this.visible].value.push({ "content": this.content, "user": { "vendor": vendor, "firstname": this.user.firstname, "lastname": this.user.lastname, "picture": this.user.picture } });
      this.scrollToElement();
      
      this.http.post(this.baseUrl + "/user/api/" + this.data[this.visible].type + "/" + this.data[this.visible].value.id + "/comment/add", { "content": this.content }, { Authorization: "Bearer " + this.token }, (response) => {
        this.content = "";
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
    onVideoLoaded(e) {
      this.loading = false;
    },
    refresh() {
      this.popup = false;
      this.popupProduct = false;
      this.loading = true;

      if (this.type == "profile") {
        var url = this.baseUrl + "/api/profile/" + this.profileId + "/clips";
        var auth = null;
      } else if (this.type == "trending") {
        var url = this.baseUrl + "/user/api/clips/trending/feed";
        var auth = { Authorization: "Bearer " + this.token };
      } else if (this.type == "latest") {
        var url = this.baseUrl + "/user/api/clips/latest/feed";
        var auth = { Authorization: "Bearer " + this.token };
      } else {
        var url = this.baseUrl + "/user/api/feed";
        var auth = { Authorization: "Bearer " + this.token };
      }

      this.http.get(url, {}, auth, (response) => {
        var result = JSON.parse(response.data);
        console.log(result);

        if (result.length) {
          this.data = [];
          this.videos = [];
          this.comments = [];
          this.following = [];
          this.display = 1;
          this.viewers = 0;
          this.visible = 0;

          result.map((element, index) => {
            var showElement = true;
            var value = JSON.parse(element.value);
            console.log(value);

            if (this.banned.length > 0) {
              this.banned.map((ban, index) => {
                if (ban.id == value.id) {
                  showElement = false;
                }
              });
            }

            if (showElement) {
              this.data.push({ "type": element.type, "value": value });
              var followers = value.vendor.user.followers;
              var isFollower = false;

              if (followers.length) {
                followers.map((element, index) => {
                  console.log(element);
                  if (element.follower.id == this.user.id) {
                    isFollower = true;
                  }
                });
              }

              this.following.push({ "value": isFollower });
              this.finished.push({ "value": false });

              if (this.anchor) {
                if (this.anchor == index) {
                  this.videos.push({ "value": value.resourceUri });
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
                  if (element.type == "live") {
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
                this.videos.push({ "value": value.resourceUri });
                this.comments.push({ "value": value.comments });

                // si c'est un live
                if (element.type == "live") {
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
      }, (response) => {
        console.log(response.error);
      });
    },
    goBack() {
      if (this.type == "profile" && this.profileId) {
        // this.$router.push({ name: 'Profile', params: { id: this.profileId } });
        this.$router.back();
      } else {
        this.$router.push({ name: 'Home' });
      }
    },
    stopLive() {
      if (this.data[this.visible].type == "live") {
        this.pusher.unsubscribe(this.data[this.visible].value.channel);

        this.http.put(this.baseUrl + "/user/api/live/" + this.data[this.visible].value.id + "/update/viewers", {}, { Authorization: "Bearer " + this.token }, (response) => {
          console.log(response);
        }, (response) => { 
          console.log(response.error); 
        });
      }
    },
    startLive(value) {
      var channel = this.pusher.subscribe(value.channel);
      channel.bind("pusher:subscription_succeeded", (response) => {
        this.http.put(this.baseUrl + "/user/api/live/" + value.id + "/update/viewers", {}, { Authorization: "Bearer " + this.token }, (response) => {}, (response) => { 
          console.log(response.error); 
        });
      });

      channel.bind("pusher:subscription_error", (response) => {
        console.log("subscription_error : " + response);
      });

      channel.bind(value.event, (data) => {
        console.log(data);

        if ('comment' in data) {
          if (data.comment.user.firstname != this.user.firstname && data.comment.user.lastname != this.user.lastname) {
            this.comments[this.visible].value.push(data.comment);
            this.scrollToElement();
          }
        }

        if ('viewers' in data) {
          this.viewers = data.viewers.count;
        }

        if ('banned' in data) {
          this.banned.push({ "id": this.data[this.visible].value.id });
          window.localStorage.setItem("banned", JSON.stringify(this.banned));

          this.stopLive();

          this.loading = true;
          this.data.splice(this.visible, 1);
          this.videos.splice(this.visible, 1);
          this.comments.splice(this.visible, 1);
          this.following.splice(this.visible, 1);
          this.finished.splice(this.visible, 1);

          var value = this.data[this.visible].value;
          this.videos[this.visible].value = value.resourceUri;
          this.comments[this.visible].value = value.comments;

          if (this.data[this.visible].type == "live") {
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
          if (data.likes != this.user.id) {
            this.showAnimation();
          }
        }

        if ('order' in data) {
          console.log(data.order);

          setTimeout(() => {
            this.purchase = true;
              this.purchasePicture = true;
            setTimeout(() => {
              this.purchasePicture = false;
            }, 1700);
            setTimeout(() => {
              this.purchase = false;
            }, 3000);
          }, 1000);
        }
      });
    },
    pause() {
      console.log("User is out of feed");
      navigator.splashscreen.show();
    },
    resume() {
      console.log("User is using the feed");
      navigator.splashscreen.hide();
    },
    follow(id) { 
      this.data.map((element, index) => {
        if (element.value.vendor.user.id == id) {
          this.following[index].value = true;
          this.clickFollow = true;
          this.popupFollow = false;

          setTimeout(() => {
            this.clickFollow = false;
          }, 2000);

          window.cordova.plugin.http.get(this.baseUrl + "/user/api/follow/" + id, {}, { Authorization: "Bearer " + this.token }, (response) => {
            this.$store.commit('setUser', JSON.parse(response.data));
          }, (response) => {
            console.log(response.error);
          });
        }
      });
    },
    favoris(product) { 
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/favoris/" + product.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.user = JSON.parse(response.data);
        this.$store.commit('setUser', JSON.parse(response.data));
      }, (response) => {
        console.log(response.error);
      });
    },
    share() {
      window.plugins.socialsharing.share('#1 Application de Live Shopping', null, null, 'https://swipelive.fr');
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
      this.myPlayer.muted = true;
    },
    paymentSuccessChild(order) {
      console.log(order);
      this.popupCart = false;
      this.popupProduct = false;
      this.popupShop = false;
      this.popupCheckout = false;
      this.myPlayer.muted = false;
      this.lineItems = [];


      if (this.data[this.visible].type == "live") {
        this.http.get(this.baseUrl + "/user/api/live/" + this.data[this.visible].value.id + "/update/orders/" + order.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
          console.log(response);
        }, (response) => { 
          console.log(response.error); 
        });
      } else {
        setTimeout(() => {
          this.purchase = true;
            this.purchasePicture = true;
          setTimeout(() => {
            this.purchasePicture = false;
          }, 1700);
          setTimeout(() => {
            this.purchase = false;
          }, 3000);
        }, 1000);
      }

      window.StatusBar.styleLightContent();
      window.StatusBar.overlaysWebView(true);
    },
    hideCheckoutChild() {
      this.popupCart = false;
      this.popupProduct = false;
      this.popupShop = false;
      this.popupCheckout = false;
      this.myPlayer.muted = false;

      window.StatusBar.styleLightContent();
      window.StatusBar.overlaysWebView(true);
    },
    addAnimation() {
      this.showAnimation();

      if (this.data[this.visible].type == "live") {
        this.http.put(this.baseUrl + "/user/api/live/" + this.data[this.visible].value.id + "/update/likes", {}, { Authorization: "Bearer " + this.token }, (response) => {
          console.log(response);
        }, (response) => { 
          console.log(response.error); 
        });
      }
    },
    showAnimation() {
      if (this.num == 0 && !this.anim1) {
        this.anim1 = true;

        setTimeout(() => {
          this.anim1 = false;
        }, 2500);
      }

      if (this.num == 1 && !this.anim2) {
        this.anim2 = true;

        setTimeout(() => {
          this.anim2 = false;
        }, 2500);
      }

      if (this.num == 2 && !this.anim3) {
        this.anim3 = true;

        setTimeout(() => {
          this.anim3 = false;
        }, 2500);
      }

      if (this.num == 3 && !this.anim4) {
        this.anim4 = true;

        setTimeout(() => {
          this.anim4 = false;
        }, 2500);
      }
      
      if (this.num == 4 && !this.anim5) {
        this.anim5 = true;

        setTimeout(() => {
          this.anim5 = false;
        }, 2500);
      }

      if (this.num == 5 && !this.anim6) {
        this.anim6 = true;

        setTimeout(() => {
          this.anim6 = false;
        }, 2500);
      }

      if (this.num == 6 && !this.anim7) {
        this.anim7 = true;

        setTimeout(() => {
          this.anim7 = false;
        }, 2500);
      }

      if (this.num == 7 && !this.anim8) {
        this.anim8 = true;

        setTimeout(() => {
          this.anim8 = false;
        }, 2500);
      }

      if (this.num == 8 && !this.anim9) {
        this.anim9 = true;

        setTimeout(() => {
          this.anim9 = false;
        }, 2500);
      }

      if (this.num == 9 && !this.anim10) {
        this.anim10 = true;

        setTimeout(() => {
          this.anim10 = false;
        }, 2500);
      }

      if (this.num == 10 && !this.anim11) {
        this.anim11 = true;

        setTimeout(() => {
          this.anim11 = false;
        }, 2500);
      }

      if (this.num == 11 && !this.anim12) {
        this.anim12 = true;

        setTimeout(() => {
          this.anim12 = false;
        }, 2500);
      }

      if (this.num == 12 && !this.anim13) {
        this.anim13 = true;

        setTimeout(() => {
          this.anim13 = false;
        }, 2500);
      }

      if (this.num == 13 && !this.anim14) {
        this.anim14 = true;

        setTimeout(() => {
          this.anim14 = false;
        }, 2500);
      }

      if (this.num == 14 && !this.anim15) {
        this.anim15 = true;

        setTimeout(() => {
          this.anim15 = false;
        }, 2500);
      }

      if (this.num == 15 && !this.anim16) {
        this.anim16 = true;

        setTimeout(() => {
          this.anim16 = false;
        }, 2500);
      }

      if (this.num == 16 && !this.anim17) {
        this.anim17 = true;

        setTimeout(() => {
          this.anim17 = false;
        }, 2500);
      }

      if (this.num == 17 && !this.anim18) {
        this.anim18 = true;

        setTimeout(() => {
          this.anim18 = false;
        }, 2500);
      }

      if (this.num == 18 && !this.anim19) {
        this.anim19 = true;

        setTimeout(() => {
          this.anim19 = false;
        }, 2500);
      }

      if (this.num == 19 && !this.anim20) {
        this.anim20 = true;

        setTimeout(() => {
          this.anim20 = false;
        }, 2500);
      }

      if (this.num == 20 && !this.anim21) {
        this.anim21 = true;

        setTimeout(() => {
          this.anim21 = false;
        }, 2500);
      }

      if (this.num == 21 && !this.anim22) {
        this.anim22 = true;

        setTimeout(() => {
          this.anim22 = false;
        }, 2500);
      }

      if (this.num == 22 && !this.anim23) {
        this.anim23 = true;

        setTimeout(() => {
          this.anim23 = false;
        }, 2500);
      }

      if (this.num == 23 && !this.anim24) {
        this.anim24 = true;

        setTimeout(() => {
          this.anim24 = false;
        }, 2500);
      }

      if (this.num == 23) {
        this.num = 0;
      } else {
        this.num = this.num + 1;
      }
    },
  }
};
</script>

