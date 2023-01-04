<template>
  <div ref="feed" id="feed" class="feed refresh" style="overflow-y: scroll; height: 100vh; scroll-snap-type: y mandatory;">
    <div v-if="clips.length" v-for="(clip, index) in clips" style="position: relative; height: 100vh; scroll-snap-align: start; scroll-snap-stop: always; z-index: 10000000;">
      <div class="clip">  
        
        <!-- loader -->
        <div v-if="loading" class="css-vhzttx" style="backdrop-filter: saturate(180%) blur(45px); background-color: rgba(25, 25, 25, 0.8);top: 0px;z-index: 10; width: 100%;height: 100%;position: absolute;"></div>
        <img v-if="loading && clip.vendor && clip.vendor.user.picture" :src="cloudinary256x256 + clip.vendor.user.picture" style="object-fit: cover; z-index: 1;position: absolute;width: 100%;height: 100vh; top: 0px;">
        <img v-else-if="loading && clip.vendor && !clip.vendor.user.picture" :src="require(`@/assets/img/anonyme.jpg`)" style="object-fit: cover; z-index: 1;position: absolute;width: 100%;height: 100vh; top: 0px;">


        <!-- love -->
        <div v-if="videos[index].value" class="n7fi1qx3 ni8dbmo4 stjgntxs hzruof5a pmk7jnqg kr520xx4 etr7akla bt9ki6u7 bipmatt0" style="z-index: 100000000">
          <div v-if="anim1" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 1px;">
            <div class="_g19 KeyframeAnimation-js_6">
              <div class="_g19 KeyframeAnimation-js_7"><img  :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim2" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 11px;">
            <div class="_g19 KeyframeAnimation-js_8">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim3" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 9px;">
            <div class="_g19 KeyframeAnimation-js_9">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim4" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 13px;">
            <div class="_g19 KeyframeAnimation-js_10">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim5" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">    
            <div class="_g19 KeyframeAnimation-js_11">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim6" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 15px;">
            <div class="_g19 KeyframeAnimation-js_12">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim7" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 1px;">
            <div class="_g19 KeyframeAnimation-js_13">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim8" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_14">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim9" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_15">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim10" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_16">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim11" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_17">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim12" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_18">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim13" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_19">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim14" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_20">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim15" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_21">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim16" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_22">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim17" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_23">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim18" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_24">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim19" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_25">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim20" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_26">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim21" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_27">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim22" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_28">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim23" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_29">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim24" class="_g19 KeyframeAnimation-js_5"  :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_30">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
        </div>

          <!-- go back -->
        <div v-if="clip.vendor" @click="goBack()" class="video-page__influencer-badge2" :style="{'top': safeareaTop5 }" style="padding: 5px 10px 5px 7px; top: 7px;">
          <span class="video-page__influencer-video-count2" style="line-height: 15px;">
            <span class="icon icon__watched">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 14px; height: 20px; fill: white;">
                <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
              </svg>
            </span>
          </span>
        </div>

        <!-- profil -->
        <div v-if="clip.vendor" class="video-page__influencer-badge2" :style="{'top': safeareaTop }" style="padding-right: 9px; left: 50px;">
          <div @click="goProfile(clip.vendor.user.id)" class="video-page__influencer-img2">
            <img v-if="clip.vendor.user.picture" :src="cloudinary256x256 + clip.vendor.user.picture" style="border-radius: 50%; width: 36px; height: 36px; object-fit: cover;">
            <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%; width: 36px; height: 36px; object-fit: cover;">
          </div>
          <div @click="goProfile(clip.vendor.user.id)" class="video-page__influencer-username-holder2" style="padding-right: 12px;">
            <div class="video-page__influencer-username2">{{ clip.vendor.businessName }}</div>
            <span class="video-page__influencer-video-count2" style="line-height: 15px;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="width: 14px; height: 14px; fill: white; vertical-align: middle; padding-bottom: 2px;">
                <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"></path>
              </svg>
              <span style="font-weight: 600;padding-left: 5px;">{{ clip.vendor.user.followers.length }}</span>
            </span>
          </div>
          <div>
	          <svg v-if="!following[index].value" @click="follow(clip.vendor.user.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 28px; height: 28px;">
	            <path style="fill: #ff2773;" d="M352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"/>
	            <path style="fill: white;" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256C397.4 512 512 397.4 512 256S397.4 0 256 0zM352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"/>
	          </svg>
          </div>
        </div>
        
        <!-- account -->
        <div @click="goToAccount()" class="video-page__influencer-badge2" :style="{'top': safeareaTop }" style="width: 40px;right: 15px; left: initial;border-radius: 50%;padding: 0px;font-size: 14px; background: transparent;">
          <div v-if="user" class="video-page__influencer-img2" style="color: white;font-weight: 500;padding: 0px;text-align: center;line-height: 25px;">
            <img v-if="user.picture" :src="cloudinary256x256 + user.picture" style="border-radius: 50%; width: 42px; height: 42px; border: 1px solid #fff; object-fit: cover;">
            <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%; width: 42px; height: 42px; border: 1px solid #fff; object-fit: cover;">
          </div>
          <div v-else class="video-page__influencer-img2" style="color: white;font-weight: 500;padding: 0px;text-align: center;line-height: 25px; object-fit: cover;">
            <img :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%; width: 42px; height: 42px; border: 1px solid #fff; object-fit: cover;">
          </div>
        </div>

        <!-- comments -->
        <div v-if="comments[index].value" class="scrollToMe" ref="scrollToMe" :style="{'bottom': safeareaBottom3 }" style="max-height: 148px; display: -ms-flexbox; position: absolute; left: 15px; z-index: 2; overflow-y: scroll; max-width: 300px;">
          <div v-for="comment in comments[index].value" class="video-page__influencer-badge" style="padding: 4px 15px 5px 7px; width: fit-content;">
            <div class="video-page__influencer-img" style="padding-right: 7px;">
              <img v-if="comment.user.picture" :src="cloudinary256x256 + comment.user.picture" style="border-radius: 50%;width: 20px;height: 20px; object-fit: cover">
              <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%;width: 20px;height: 20px; object-fit: cover">
            </div>
            <div class="video-page__influencer-username-holder">
              <div class="video-page__influencer-username"> 
                <span v-if="comment.isVendor" style="font-size: 13px;margin-right: 3px;"> {{ clip.vendor.businessName }} : </span>
                <span v-else style="font-size: 13px;margin-right: 3px;"> {{ comment.user.firstname }} : </span>
                <span style="font-weight: 500;">{{ comment.content }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- product -->
        <div v-if="clip.product" @click="showProduct(clip.product)" class="video-page__product-box" :style="{'bottom': safeareaBottom2 }">
          <div class="video-page__product-top">
            <div class="video-page__image">
              <img v-if="clip.product.uploads" :src="cloudinary256x256 + clip.product.uploads[0].filename">
              <img v-else :src="require(`@/assets/img/no-preview.jpg`)"/>
            </div>
            <div class="video-page__info">
              <div style="height: 38px;">
                <h5 class="video-page__name"> {{ clip.product.title }}</h5>
              </div>
              <div class="video-page__price-row">
                <div class="video-page__price">
                  <div class="video-page__price-line">
                    <div class="video-page__price"> {{ clip.product.price | formatPrice }}€ 
                      <span v-if="clip.product.compareAtPrice" style="font-size: 14px; text-decoration: line-through; color: rgb(153, 153, 153); padding-left: 5px; font-weight: 500;" class="disc">{{ clip.product.compareAtPrice | formatPrice }}€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- list of products -->
        <div v-if="clip.vendor" :style="{'bottom': safeareaBottom }" @click="showShop(clip.vendor)" class="video-page__influencer-badge5" style="position: absolute; width: 40px; height: 40px; left: 15px; z-index: 1000;">
          <div class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 40px;height: 40px;padding: 8px 5px 8px 10px;fill: white;">
                <path d="M144 32h-96C21.49 32 0 53.49 0 80v96C0 202.5 21.49 224 48 224h96C170.5 224 192 202.5 192 176v-96C192 53.49 170.5 32 144 32zM400 288h-96C277.5 288 256 309.5 256 336v96c0 26.51 21.49 48 48 48h96c26.51 0 48-21.49 48-48v-96C448 309.5 426.5 288 400 288zM400 32h-96C277.5 32 256 53.49 256 80v96C256 202.5 277.5 224 304 224h96C426.5 224 448 202.5 448 176v-96C448 53.49 426.5 32 400 32zM144 288h-96C21.49 288 0 309.5 0 336v96C0 458.5 21.49 480 48 480h96C170.5 480 192 458.5 192 432v-96C192 309.5 170.5 288 144 288z"></path>
              </svg>
            </span>
          </div>
        </div>

        <!-- send comment -->
        <div @click="openPopup()" class="video-page__influencer-badge-send" style="padding: 0.5rem 1.5rem 0.5rem; left: 65px; right: 125px;" :style="{'bottom': safeareaBottom }">
          <div class="video-page__influencer-username-holder">
            <div class="video-page__influencer-username"> Commenter...</div>
            <span class="video-page__influencer-video-count">
              <span class="icon icon--watched-video"></span>
            </span>
          </div>
        </div>
        
        <!-- share -->
        <div @click="share" :style="{'bottom': safeareaBottom }" class="video-page__influencer-badge4" style="position: absolute; width: 40px; height: 40px; right: 70px; z-index: 1000;">
          <div class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 40px; height: 40px; padding: 8px; fill: white;">
                <path d="M503.7 226.2l-176 151.1c-15.38 13.3-39.69 2.545-39.69-18.16V272.1C132.9 274.3 66.06 312.8 111.4 457.8c5.031 16.09-14.41 28.56-28.06 18.62C39.59 444.6 0 383.8 0 322.3c0-152.2 127.4-184.4 288-186.3V56.02c0-20.67 24.28-31.46 39.69-18.16l176 151.1C514.8 199.4 514.8 216.6 503.7 226.2z"/>
              </svg>
            </span>
          </div>
        </div>
        
        <!-- like -->
        <img @click="animate()" :src="require(`@/assets/img/heart.svg`)" :style="{'bottom': safeareaBottom }" style="position: absolute; width: 40px; height: 40px; right: 15px; z-index: 1000">
        
        <!-- video -->
        <div v-if="videos[index].value" :ref="'player' + index" :id="'player' + index" :style="{'visibility': loading ? 'hidden': 'visible'}"></div>
        
        <!-- visible -->
        <div class="visible" v-observe-visibility="{ callback: (isVisible, entry) => visibilityChanged(isVisible, entry, index),intersection: { threshold: 1 }, throttle: throttle}" style="position: absolute; z-index: 1000000; width: 50px; height: 50px; left: calc(50% - 25px); top: calc(50% - 25px);"></div>
      </div>
    </div>

    <!-- input comment -->
    <div v-if="popup" class="css-1dko8fk" :style="{'bottom': writeInput }">
      <div class="css-miqn2j">
        <input v-focus v-on-clickaway="away" placeholder="Votre commentaire..." type="text" class="css-9gu6qp" v-model="content"/>
      </div>
      <button id="buttonSend" :class="{'Mui-disabled': content.length == 0 }" class="css-il3d4y">
        <svg id="svgSend" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path id="pathSend" d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12L2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" fill="currentColor"></path>
        </svg>
      </button>
    </div>


    <!-- product popup -->
    <div v-if="popupProduct" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 95%; padding-bottom: 80px;">
      <svg @click="hideProduct()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 30px; height: 30px; fill: rgb(153, 153, 153); padding: 5px; background: white; border-radius: 30px; opacity: 0.5; position: absolute; top: 15px; left: 15px; z-index: 100000000;">
        <path d="M432.6 209.3l-191.1 183.1C235.1 397.8 229.1 400 224 400s-11.97-2.219-16.59-6.688L15.41 209.3C5.814 200.2 5.502 184.1 14.69 175.4c9.125-9.625 24.38-9.938 33.91-.7187L224 342.8l175.4-168c9.5-9.219 24.78-8.906 33.91 .7187C442.5 184.1 442.2 200.2 432.6 209.3z"/>
      </svg>
      <Product :product="product" @clicked="onClickChild"/>
    </div>
    <div v-if="popupProduct" style="background-color: white;bottom: 25px; position: fixed; z-index: 2147483647;">
      <div style="padding: 15px 15px 25px; background-color: white; width: 100vw; display: flex;">
        <div @click="showCart()" class="btn-swipe2" style="border-top-left-radius: 10px; border-bottom-left-radius: 10px; width: calc(50vw - 15px); background: linear-gradient(90deg,#ff9000,#ff5000);">
        	Ajouter
        </div>
        <div @click="goCheckout()" class="btn-swipe2" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px; width: calc(50vw - 15px);">
        	Acheter
        </div>
      </div>
    </div>

    <!-- cart popup -->
    <div v-if="popupCart" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 45%;">
      <div @click="hideCart()" style="position: absolute; background: white; padding: 15px; width: 100%; z-index: 1000000000; text-align: center; border-top-left-radius: 20px; border-top-right-radius: 20px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #161823; float: left;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
        <h5 style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Panier</h5>
      </div>
      <Cart :product="product" :variant="variant"/>
    </div>


    <!-- shop popup -->
    <div v-if="popupShop" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 100%; top: 30%; padding: 15px;">
      <div @click="hideShop()" style="float: right;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #525c66;"><path d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z"/></svg>
      </div>
      <div style="display: flex;">
        <img :src="cloudinary256x256 + shop.user.picture" style="border-radius: 50%; width: 32px; height: 32px; border: 2px solid rgb(255, 255, 255); object-fit: cover; margin-right: 6px;">
        <div class="video-page__influencer-username2" style="margin-top: 6px; font-size: 14px; font-weight: 500;">{{ shop.businessName }}</div>
      </div>
      <div v-if="shop" class="items" style="margin-top: 5px; margin-bottom: 20px;">
        <div class="shop--part" style="margin: 0px;">
          <div v-for="product in shop.products" v-if="product.archived == false" class="shop--item" style="margin-bottom: 10px;">
            <div @click="showProduct(product)">
              <div style="text-align:center;">
                <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="padding: 5px; width: calc(33vw - 15px); height: calc(33vw - 15px); object-fit: cover; border-radius: 8px;">
                <img v-else :src="require(`@/assets/img/no-preview.jpg`)" style="padding: 5px; width: calc(33vw - 15px); height: calc(33vw - 15px); object-fit: cover; border-radius: 8px;">
                <div style="position: absolute; top: 15px;">
                  <div class="btn-swipe" style="color: white; text-align: center; font-size: 12px; background: rgb(24, 206, 160); padding: 3px 10px; border-radius: 7px; font-weight: 600;"> {{ product.price | formatPrice }}€
                  </div>
                </div>
              </div>
            </div>
            <div @click="showProduct(product)" class="shop--item--details">
              <div class="shop--item--name" style="margin-top: 0px; height: 38px; font-weight: 500; line-height: 1.24; align-items: initial; text-align: center;">{{ product.title }}</div>
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

import Product from '../components/Product';
import Cart from '../components/Cart';
import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: 'ListClips',
  components: {
    Product,
    Cart,
  },
  mixins: [ clickaway ],
  data() {
    return {
      anchor: this.$route.params.index,
      type: this.$route.params.type,
      profileId: this.$route.params.profileId,
      following: [],
      clips: [],
      videos: [],
      user: JSON.parse(window.localStorage.getItem("user")),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      comments: [],
      purchases: [],
      product: [],
      variant: [],
      shop: [],
      visible: 0,
      loading: true,
      popup: false,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      bambuserId: window.localStorage.getItem("bambuserId"),
      safeareaBottom: '15px',
      safeareaBottom2: '70px',
      safeareaBottom3: '210px',
      safeareaBottom4: '320px',
      safeareaTop: '10px',
      safeareaTop2: '62px',
      safeareaTop3: '150px',
      safeareaTop4: '100px',
      safeareaTop5: '18px',
      writeInput: '0px',
      content: "",
      popupProduct: false,
      popupCart: false,
      popupShop: false,
      player: null,
      http: null,
      throttle: 1000,
      broadcastLoadedListener: false,
      stateListener: false,
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
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {
    window.StatusBar.styleLightContent();
    window.StatusBar.overlaysWebView(true);
    document.getElementsByTagName('body')[0].classList.add("dark-mode");

    if (window.cordova && window.cordova.platformId === "android") {
      this.safeareaBottom = "15px";
      this.safeareaBottom2 = "65px";
      this.safeareaBottom3 = "210px";
      this.safeareaBottom4 = "355px";
      this.safeareaTop = '35px';
      this.safeareaTop2 = '97px';
      this.safeareaTop3 = '125px';
      this.safeareaTop4 = '175px';
      this.safeareaTop5 = '43px';
      this.throttle = 1000;
    }

    if (window.cordova && window.cordova.platformId === "ios") {
      this.safeareaBottom = 'calc(env(safe-area-inset-bottom) + 15px)';
      this.safeareaBottom2 = 'calc(env(safe-area-inset-bottom) + 70px)';
      this.safeareaBottom3 = 'calc(env(safe-area-inset-bottom) + 210px)';
      this.safeareaBottom4 = 'calc(env(safe-area-inset-bottom) + 320px)';
      this.safeareaTop = 'calc(env(safe-area-inset-top) + 10px)';
      this.safeareaTop2 = 'calc(env(safe-area-inset-top) + 62px)';
      this.safeareaTop3 = 'calc(env(safe-area-inset-top) + 150px)';
      this.safeareaTop4 = 'calc(env(safe-area-inset-top) + 100px)';
      this.safeareaTop5 = 'calc(env(safe-area-inset-top) + 18px)';
      this.throttle = 500;
    }

    if (window.cordova.plugin && window.cordova.plugin.http) {
      this.http = window.cordova.plugin.http;
      this.http.setDataSerializer('json');
    }

    if (this.user && this.token) {
      this.http.get(this.baseUrl + "/user/api/profile", {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.user = JSON.parse(response.data);
        window.localStorage.setItem("user", response.data);
      }, (error) => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.refresh();
    document.addEventListener("pause", this.pause);
    document.addEventListener("resume", this.resume);
  },
  beforeDestroy() {
    document.getElementsByTagName('body')[0].classList.remove("dark-mode");
    document.removeEventListener('pause', this.pause);
    document.removeEventListener('resume', this.resume);
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    visibilityChanged(isVisible, entry, index) {
      if (isVisible) {
        if (index != this.visible) {
          console.log(index, this.visible);
          this.popup = false;
          this.popupProduct = false;
          this.popupCart = false;
          this.popupShop = false;
          this.loading = true;

          this.videos[this.visible].value = "";
          this.comments[this.visible].value = [];
          this.product = [];
          this.variant = [];
          this.visible = index;

          this.videos[index].value = this.clips[index].resourceUri;
          this.comments[index].value = this.clips[index].comments;

          setTimeout(() => {
            var player2 = window.BambuserPlayer.create(document.getElementById('player'+index), this.clips[index].resourceUri);
            console.log(player2);

            // Listen to player events
            player2.addEventListener('ended', () => {
              console.log('player ended');

              var el = document.getElementById('feed');
              console.log(el);

              if (el) {
                el.scrollTop += window.innerHeight;
              }
            });

            player2.addEventListener('canplay', () => {
              this.loading = false;
            });

            player2.scaleMode = "aspectFill";
            player2.play();

          }, 500);

          if (this.comments[index].value.length > 0) {
            this.scrollToElement();
          }
        }
      }
    },
    showProduct(product) {
      this.product = product;
      this.popupShop = false;
      this.popupCart = false;
      this.popupProduct = true;
    },
    hideProduct() {
      this.popupProduct = false;
      this.product = [];
    },
    showCart() {
      this.popupProduct = false;
      this.popupShop = false;
      this.popupCart = true;
    },
    hideCart() {
      this.popupCart = false;
      this.popupShop = false;
      this.popupProduct = true;
    },
    showShop(shop) {
      this.shop = shop;
      this.popupCart = false;
      this.popupProduct = false;
      this.popupShop = true;
    },
    hideShop() {    
      this.popupCart = false;
      this.popupProduct = false;
      this.popupShop = false;
      this.shop = [];
    },
    goBack() {
      this.$router.back();
    },
    goProfile(id) {
      this.stopLive();

      if (this.user) {
        if (this.user.id == id) {
          this.$router.push({ name: 'Account' });
        } else {
          this.$router.push({ name: 'Profile', params: { id: id } });
        }
      } else {
        this.$router.push({ name: 'Profile', params: { id: id } });
      }
    },
    goToAccount() {
      this.stopLive();

      if (this.user && this.token) {
        this.$router.push({ name: 'Account' });
      } else {
        this.$router.push({ name: 'Welcome' });
      }
    },
    openPopup() {
      this.popup = true;
    },
    away(event) {
      console.log(event);
      if (event.target.id == "buttonSend" || event.target.id == "svgSend" || event.target.id == "pathSend") {
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
      var isVendor = false;

      if (this.token) {
      	console.log(this.clips[this.visible]);
        if (this.user.vendor && this.user.vendor.businessName == this.clips[this.visible].vendor.businessName) {
          var isVendor = true;
        }
        
        this.http.post(this.baseUrl + "/user/api/clip/" + this.clips[this.visible].id + "/comment/add", { "content": this.content }, { Authorization: "Bearer " + this.token }, (response) => {
          var result = JSON.parse(response.data);
          this.comments[this.visible].value = result.comments;
          this.content = "";
          this.scrollToElement();
        }, (response) => {
          console.log(response.error);
        });
      } else {
        this.stopLive();
        this.$router.push({ name: 'Welcome' });
      }
    },
    scrollToElement() {
      setTimeout(() => {
        var el = this.$refs.scrollToMe;

        if (el && el.length > 0) {
          console.log(el);
          el[0].scrollTop = el[0].scrollHeight;
        }
      }, 500);
    },
    onVideoLoaded(e) {
      this.loading = false;
    },
    onVideoEnded(index) {
      var el = document.getElementById('feed');
      console.log(el);

      if (el) {
        el.scrollTop += window.innerHeight;
      }
    },
    pause() {
      console.log("User is out of list clips");
      navigator.splashscreen.show();
    },
    resume() {
      console.log("User is using list clips");
      navigator.splashscreen.hide();
      this.refresh();
    },   
    refresh() {
      this.popup = false;
      this.popupProduct = false;
      this.loading = true;

      if (this.type == "profile") {
        var url = this.baseUrl + "/api/profile/" + this.profileId + "/clips";
        var auth = null;
      } else {
        	var url = this.baseUrl + "/user/api/clips/" + this.type;
        	var auth = { Authorization: "Bearer " + this.token };
      }

      this.http.get(url, {}, auth, (response) => {
        var result = JSON.parse(response.data);
        console.log(result);

        if (result) {
          this.clips = result;
          this.videos = [];
          this.comments = [];
          this.following = [];
          this.visible = 0;

          result.map((element, index) => {
            var followers = element.vendor.user.followers;
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
            console.log(this.following);

            if (this.anchor == index) {
              console.log(this.anchor, index);
              console.log(element);

              this.videos.push({ "value": element.resourceUri });
              this.comments.push({ "value": element.comments });
              this.scrollToElement();

              if (index > 0) {
                setTimeout(() => {
                  var el = document.getElementById('feed');
                  if (el) {
                    el.scrollTop += window.innerHeight * index;
                  }
                });
              }

              setTimeout(() => {
                var player2 = window.BambuserPlayer.create(document.getElementById('player'+index), element.resourceUri);
                // Listen to player events
                player2.addEventListener('ended', () => {
                  console.log('player ended');
                  var el = document.getElementById('feed');
                  if (el) {
                    el.scrollTop += window.innerHeight;
                  }
                });
                player2.addEventListener('canplay', () => {
                  this.loading = false;
                });
                player2.scaleMode = "aspectFill";
                player2.play();
              }, 500);
            } else {
              this.videos.push({ "value": "" });
              this.comments.push({ "value": [] });
            }
          });
        }
      }, (response) => {
        console.log(response.error);
      });
    },
    follow(id) { 
    	if (this.user && this.token) {
	    	this.following[this.visible].value = true;
	      window.cordova.plugin.http.get(this.baseUrl + "/user/api/follow/" + id, {}, { Authorization: "Bearer " + this.token }, (response) => {
	        window.localStorage.setItem("user", response.data);
	      }, (response) => {
	        console.log(response.error);
	      });
    	} else {
        this.$router.push({ name: 'Welcome' });
    	}
    },
    unFollow(id) { 
    	if (this.user && this.token) {
	    	this.following[this.visible].value = false;
	      window.cordova.plugin.http.get(this.baseUrl + "/user/api/follow/" + id, {}, { Authorization: "Bearer " + this.token }, (response) => {
	        window.localStorage.setItem("user", response.data);
	      }, (response) => {
	        console.log(response.error);
	      });
    	} else {
        this.$router.push({ name: 'Welcome' });
    	}
    },
    stopLive() {
      if (this.player) {
        document.getElementsByTagName('body')[0].classList.remove("show-viewfinder");
        document.getElementsByTagName('body')[0].classList.add("dark-mode");
        this.player.hidePlayer();
        this.player.close();
      }
    },
    animate() {
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
    share() {
      window.plugins.socialsharing.share('#1 Application de Live Shopping', null, null, 'https://swipelive.fr');
    },
    onClickChild (variant) {
      this.variant = variant;
    },
    goCheckout() {
    	this.$router.push({ name: 'Checkout', params: { quantity: 1, product: this.product, variant: this.variant.length ? this.variant : null } });
    },
  }
};
</script>

