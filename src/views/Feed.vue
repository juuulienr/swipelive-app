<template>
  <div ref="feed" id="feed" class="feed refresh" style="overflow-y: scroll; height: 100vh; scroll-snap-type: y mandatory;">
    <div v-if="data.length" v-for="(feed, index) in data" style="position: relative; height: 100vh; scroll-snap-align: start; scroll-snap-stop: always; z-index: 10000000;">
        

      <!-- live -->
      <div v-if="feed.type == 'live' && feed.value" class="live" v-touch:swipe="swipeHandler">

        <!-- loader -->
<!--         <div v-if="loading" class="css-vhzttx" style="backdrop-filter: saturate(180%) blur(45px); background-color: rgba(25, 25, 25, 0.8);top: 0px;z-index: 10; width: 100%;height: 100%;position: absolute;"></div>
        <img v-if="loading && feed.value.vendor && feed.value.vendor.user.picture" :src="cloudinary256x256 + feed.value.vendor.user.picture" style="object-fit: cover; z-index: 1;position: absolute;width: 100%;height: 100vh; top: 0px;">
        <img v-else-if="loading && !feed.value.vendor.user.picture" :src="require(`@/assets/img/anonyme.jpg`)" style="object-fit: cover; z-index: 1;position: absolute;width: 100%;height: 100vh; top: 0px;">
 -->

        <!-- love -->
       <!--  <div v-if="feed.value" class="n7fi1qx3 ni8dbmo4 stjgntxs hzruof5a pmk7jnqg kr520xx4 etr7akla bt9ki6u7 bipmatt0" style="z-index: 100000000">
          <div v-if="anim1" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 1px;">
            <div class="_g19 KeyframeAnimation-js_6">
              <div class="_g19 KeyframeAnimation-js_7"><img  :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim2" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 11px;">
            <div class="_g19 KeyframeAnimation-js_8">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim3" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 9px;">
            <div class="_g19 KeyframeAnimation-js_9">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim4" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 13px;">
            <div class="_g19 KeyframeAnimation-js_10">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim5" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">    
            <div class="_g19 KeyframeAnimation-js_11">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim6" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 15px;">
            <div class="_g19 KeyframeAnimation-js_12">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim7" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 1px;">
            <div class="_g19 KeyframeAnimation-js_13">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim8" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_14">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim9" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_15">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim10" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_16">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim11" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_17">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim12" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_18">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim13" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_19">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim14" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_20">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim15" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_21">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim16" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_22">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim17" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_23">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim18" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_24">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim19" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_25">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim20" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_26">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim21" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_27">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim22" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_28">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim23" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_29">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim24" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_30">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
        </div> -->


        <!-- profil -->
      <!--   <div v-if="feed.value.vendor" class="video-page__influencer-badge2" :style="{'top': safeareaTop }" style="padding-right: 9px;">
          <div @click="goProfile(feed.value.vendor.user.id)" class="video-page__influencer-img2">
            <img v-if="feed.value.vendor.user.picture" :src="cloudinary256x256 + feed.value.vendor.user.picture" style="border-radius: 50%; width: 38px; height: 38px; border: 1px solid #fff; object-fit: cover;">
            <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%; width: 38px; height: 38px; border: 1px solid #fff; object-fit: cover;">
          </div>
          <div @click="goProfile(feed.value.vendor.user.id)" class="video-page__influencer-username-holder2" style="padding-right: 12px;">
            <div class="video-page__influencer-username2">{{ feed.value.vendor.businessName }}</div>
            <span class="video-page__influencer-video-count2" style="line-height: 15px;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="width: 14px; height: 14px; fill: white; vertical-align: middle; padding-bottom: 2px;"><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3c-95.73 0-173.3 77.6-173.3 173.3C0 496.5 15.52 512 34.66 512H413.3C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM479.1 320h-73.85C451.2 357.7 480 414.1 480 477.3C480 490.1 476.2 501.9 470 512h138C625.7 512 640 497.6 640 479.1C640 391.6 568.4 320 479.1 320zM432 256C493.9 256 544 205.9 544 144S493.9 32 432 32c-25.11 0-48.04 8.555-66.72 22.51C376.8 76.63 384 101.4 384 128c0 35.52-11.93 68.14-31.59 94.71C372.7 243.2 400.8 256 432 256z"></path></svg>
              <span style="font-weight: 600;padding-left: 5px;">{{ feed.value.vendor.user.followers.length }}</span>
            </span>
          </div>
          <div v-if="feed.value.vendor.user.id != user.id">
	          <svg v-if="following[index].value" @click="unFollow(feed.value.vendor.user.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 28px; height: 28px;"><defs></defs>
	            <path style="fill: white;" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"/>
	            <path style="fill: #ff2773;" d="M371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"/>
	          </svg>
	          <svg v-else @click="follow(feed.value.vendor.user.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 28px; height: 28px;"><defs></defs>
	            <path style="fill: #ff2773;" d="M352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"/>
	            <path style="fill: white;" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256C397.4 512 512 397.4 512 256S397.4 0 256 0zM352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"/>
	          </svg>
          </div>
        </div> -->
        

        <!-- account -->
      <!--   <div @click="goToAccount()" class="video-page__influencer-badge2" :style="{'top': safeareaTop5 }" style="width: 40px;right: 15px; left: initial;border-radius: 50%;padding: 0px;font-size: 14px; background: transparent;">
          <div class="video-page__influencer-img2" style="color: white;font-weight: 500;padding: 0px;text-align: center;line-height: 25px;">
            <img v-if="user.picture" :src="cloudinary256x256 + user.picture" style="border-radius: 50%; width: 38px; height: 38px; object-fit: cover;">
            <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%; width: 38px; height: 38px; object-fit: cover;">
          </div>
        </div> -->

<!-- 
        <div :style="{'top': safeareaTop5 }" class="video-page__influencer-badge4" style="position: absolute; right: 15px; background: rgba(255, 255, 255, 0.15);">
          <div @click="goToAccount()" class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 50px; height: 50px; padding: 12px; fill: white;">
                <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM384 256c0 8.8-7.2 16-16 16H291.3c-6.2 0-11.3-5.1-11.3-11.3c0-3 1.2-5.9 3.3-8L307 229c-13.6-13.4-31.9-21-51-21c-19.2 0-37.7 7.6-51.3 21.3L185 249c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l19.7-19.7C193.4 172.7 224 160 256 160c31.8 0 62.4 12.6 85 35l23.7-23.7c2.1-2.1 5-3.3 8-3.3c6.2 0 11.3 5.1 11.3 11.3V256zM128 320c0-8.8 7.2-16 16-16h76.7c6.2 0 11.3 5.1 11.3 11.3c0 3-1.2 5.9-3.3 8L205 347c13.6 13.4 31.9 21 51 21c19.2 0 37.7-7.6 51.3-21.3L327 327c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-19.7 19.7C318.6 403.3 288 416 256 416c-31.8 0-62.4-12.6-85-35l-23.7 23.7c-2.1 2.1-5 3.3-8 3.3c-6.2 0-11.3-5.1-11.3-11.3V320z"/>
              </svg>
            </span>
          </div>
          <div @click="showPromo()" class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 50px; height: 50px; padding: 12px; fill: white;">
                <path d="M536.5 170.7l-135.7-131.9c-9.453-9.219-24.67-9-33.94 .5c-9.234 9.5-9.016 24.69 .5 33.94l135.5 131.7C519 221.1 528 242.8 528 265.8s-8.969 44.63-25.3 60.95l-111.7 112.4c-9.344 9.406-9.312 24.59 .0938 33.94C395.8 477.7 401.9 480 408 480c6.172 0 12.33-2.359 17.02-7.078l111.7-112.3C562 335.3 576 301.6 576 265.8S562 196.2 536.5 170.7zM463.6 225.6L286.4 48.4C277.4 39.38 259.6 32 246.8 32H60C44.54 32 32 44.54 32 60v186.8c0 12.76 7.381 30.58 16.4 39.6l177.2 177.2c21.87 21.87 57.32 21.87 79.2 .002l158.8-158.8C485.5 282.9 485.5 247.5 463.6 225.6zM144 176c-17.67 0-32-14.32-32-32c0-17.68 14.33-32 32-32s32 14.32 32 32C176 161.7 161.7 176 144 176z"></path>
              </svg>
            </span>
          </div>
          <div @click="showMultistream()" class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 50px; height: 50px; padding: 12px; fill: #ff2773;"><defs></defs>
                <path class="fa-primary" d="M288 200C257.1 200 232 225.1 232 256S257.1 312 288 312S344 286.9 344 256S318.9 200 288 200z"/><path class="fa-secondary" d="M64 256c0-51.5 16.98-99.91 49.13-139.1c11.05-13.78 8.844-33.94-4.953-45c-13.75-10.97-33.89-8.812-44.98 4.938C22.44 126.8 0 190.7 0 256c0 65.28 22.44 129.2 63.19 180C69.52 443.9 78.8 448 88.17 448c7.031 0 14.09-2.312 20-7.031c13.8-11.06 16-31.22 4.953-45C80.98 355.9 64 307.5 64 256zM512.8 75.96c-11.09-13.78-31.23-15.97-44.98-4.938c-13.8 11.06-16 31.22-4.953 45C495 156.1 512 204.5 512 256c0 51.5-16.98 99.91-49.13 139.1c-11.05 13.78-8.844 33.94 4.953 45C473.7 445.7 480.8 448 487.8 448c9.375 0 18.66-4.094 24.98-11.97C553.6 385.2 576 321.3 576 256C576 190.7 553.6 126.8 512.8 75.96zM392.3 149.1c-9.962 8.75-10.95 23.91-2.19 33.87c34.97 39.78 34.97 104.5 0 144.3c-8.758 9.969-7.772 25.12 2.19 33.87c4.567 3.1 10.21 5.969 15.84 5.969c6.678 0 13.32-2.75 18.06-8.156c50.33-57.25 50.33-150.4 0-207.7C417.4 142.2 402.3 141.2 392.3 149.1zM183.7 149.1C173.8 141.2 158.6 142.2 149.8 152.2c-50.33 57.25-50.33 150.4 0 207.7c4.739 5.406 11.39 8.156 18.06 8.156c5.614 0 11.28-1.969 15.84-5.969c9.962-8.75 10.95-23.91 2.19-33.87c-34.97-39.78-34.97-104.5 0-144.3C194.7 173.9 193.7 158.7 183.7 149.1z" style="fill: white;"/>
              </svg>
            </span>
          </div>
        </div>
 -->

        <!-- live -->
     <!--    <div class="bp9cbjyn jk6sbkaj kdgqqoy6 ihh4hy1g qttc61fc rq0escxv pq6dq46d datstx6m jb3vyjys p8fzw8mz qt6c0cv9 pcp91wgn afxn4irw m8weaby5 ee40wjg4 q1gqmpn5 jbu8tgem l44iypv3" :style="{ 'top': safeareaTop2 }" style="position: absolute; height: 21px; left: 15px; padding: 5px;">
          <span class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa ht8s03o8 a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb mdeji52x e9vueds3 j5wam9gi lrazzd5p ljqsnud1">EN DIRECT</span>
        </div>
        <div class="bp9cbjyn jk6sbkaj kdgqqoy6 ihh4hy1g qttc61fc rq0escxv pq6dq46d datstx6m jb3vyjys p8fzw8mz qt6c0cv9 pcp91wgn afxn4irw m8weaby5 ee40wjg4" :style="{'top': safeareaTop2 }" style="position: absolute; height: 21px; width: fit-content; left: 95px; background-color: rgba(0, 0, 0, 0.3);">
          <span class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa ht8s03o8 a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb mdeji52x e9vueds3 j5wam9gi lrazzd5p ljqsnud1" dir="auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="fill: white; width: 12px; margin-bottom: 2px; height: 12px;"><path d="M572.5 238.1C518.3 115.5 410.9 32 288 32S57.69 115.6 3.469 238.1C1.563 243.4 0 251 0 256c0 4.977 1.562 12.6 3.469 17.03C57.72 396.5 165.1 480 288 480s230.3-83.58 284.5-206.1C574.4 268.6 576 260.1 576 256C576 251 574.4 243.4 572.5 238.1zM432 256c0 79.45-64.47 144-143.9 144C208.6 400 144 335.5 144 256S208.5 112 288 112S432 176.5 432 256zM288 160C285.7 160 282.4 160.4 279.5 160.8C284.8 170 288 180.6 288 192c0 35.35-28.65 64-64 64C212.6 256 201.1 252.7 192.7 247.5C192.4 250.5 192 253.6 192 256c0 52.1 43 96 96 96s96-42.99 96-95.99S340.1 160 288 160z"></path></svg>
            <span style="padding-left: 5px; color: white; font-weight: 600;">{{ viewers }}</span>
          </span>
        </div> -->


        <!-- cart -->
      <!--   <div @click="showCart()" :style="{'top': safeareaTop4 }" class="video-page__influencer-badge6" style="position: absolute; width: 40px; height: 40px; right: 15px; z-index: 1000; border-radius: 8px;">
          <div class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 40px; height: 40px; padding: 9px; fill: white;"><path d="M416 160h-72V120C344 53.83 290.2 0 224 0S104 53.83 104 120V160H32C14.33 160 0 174.3 0 192v240C0 476.2 35.82 512 80 512h288c44.18 0 80-35.82 80-80V192C448 174.3 433.7 160 416 160zM152 120C152 80.3 184.3 48 224 48s72 32.3 72 72V160h-144V120zM128 248C114.8 248 104 237.3 104 224S114.8 200 128 200S152 210.8 152 224S141.3 248 128 248zM320 248c-13.25 0-24-10.75-24-24S306.8 200 320 200S344 210.8 344 224S333.3 248 320 248z"/></svg>
            </span>
          </div>
        </div>
 -->

        <!-- comments -->
     <!--    <div v-if="comments[index].value.length" class="scrollToMe" ref="scrollToMe" :style="{'bottom': safeareaBottom3 }" style="max-height: 200px; display: -ms-flexbox; position: absolute; left: 15px; z-index: 2; overflow-y: scroll;">
          <div v-for="comment in comments[index].value" class="video-page__influencer-badge" style="padding: 4px 15px 5px 7px; width: fit-content;">
            <div class="video-page__influencer-img" style="padding-right: 7px;">
              <img v-if="comment.user.picture" :src="cloudinary256x256 + comment.user.picture" style="border-radius: 50%;width: 20px;height: 20px; object-fit: cover">
              <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%;width: 20px;height: 20px; object-fit: cover">
            </div>
            <div class="video-page__influencer-username-holder">
              <div class="video-page__influencer-username"> 
                <span v-if="comment.user.vendor" style="font-size: 13px;margin-right: 3px;"> {{ feed.value.vendor.businessName }} : </span>
                <span v-else style="font-size: 13px;margin-right: 3px;"> {{ comment.user.firstname }} : </span>
                <span style="font-weight: 500;">{{ comment.content }}</span>
              </div>
            </div>
          </div>
        </div> -->

        <!-- product -->
     <!--    <div v-if="feed.value.liveProducts.length > 0" @click="showProduct(feed.value.liveProducts[display - 1].product)" class="video-page__product-box" :style="{'bottom': safeareaBottom2 }">
          <div class="video-page__product-top">
            <div class="video-page__image">
              <img v-if="feed.value.liveProducts[display - 1].product.uploads" :src="cloudinary256x256 + feed.value.liveProducts[display - 1].product.uploads[0].filename">
            </div>
            <div class="video-page__info">
              <div style="height: 38px;">
                <h5 class="video-page__name"> {{ feed.value.liveProducts[display - 1].product.title }}</h5>
              </div>
              <div class="video-page__price-row">
                <div class="video-page__price">
                  <div class="video-page__price-line">
                    <div class="video-page__price"> {{ feed.value.liveProducts[display - 1].product.price| formatPrice }}€ 
                      <span v-if="feed.value.liveProducts[display - 1].product.compareAtPrice" style="font-size: 14px; text-decoration: line-through; color: rgb(153, 153, 153); padding-left: 5px; font-weight: 500;" class="disc">{{ feed.value.liveProducts[display - 1].product.compareAtPrice| formatPrice }}€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        

        <!-- list of products -->
       <!--  <div v-if="feed.value.vendor" :style="{'bottom': safeareaBottom }" @click="showShop(feed.value.vendor)" class="video-page__influencer-badge5" style="position: absolute; width: 40px; height: 40px; left: 15px; z-index: 1000; border-radius: 8px;">
          <div class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 40px;height: 40px;padding: 8px 5px 8px 10px;fill: white;"><path d="M144 32h-96C21.49 32 0 53.49 0 80v96C0 202.5 21.49 224 48 224h96C170.5 224 192 202.5 192 176v-96C192 53.49 170.5 32 144 32zM400 288h-96C277.5 288 256 309.5 256 336v96c0 26.51 21.49 48 48 48h96c26.51 0 48-21.49 48-48v-96C448 309.5 426.5 288 400 288zM400 32h-96C277.5 32 256 53.49 256 80v96C256 202.5 277.5 224 304 224h96C426.5 224 448 202.5 448 176v-96C448 53.49 426.5 32 400 32zM144 288h-96C21.49 288 0 309.5 0 336v96C0 458.5 21.49 480 48 480h96C170.5 480 192 458.5 192 432v-96C192 309.5 170.5 288 144 288z"></path></svg>
            </span>
          </div>
        </div> -->


        <!-- send comment -->
      <!--   <div @click="openPopup()" class="video-page__influencer-badge-send" style="padding: 0.5rem 1.5rem 0.5rem; left: 65px; right: 125px;" :style="{'bottom': safeareaBottom }">
          <div class="video-page__influencer-username-holder">
            <div class="video-page__influencer-username"> Commenter...</div>
            <span class="video-page__influencer-video-count">
              <span class="icon icon--watched-video"></span>
            </span>
          </div>
        </div>
 -->
        
        <!-- share -->
    <!--     <div @click="share" :style="{'bottom': safeareaBottom }" class="video-page__influencer-badge4" style="position: absolute; width: 40px; height: 40px; right: 70px; z-index: 1000;">
          <div class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 40px; height: 40px; padding: 8px; fill: white;"><path d="M503.7 226.2l-176 151.1c-15.38 13.3-39.69 2.545-39.69-18.16V272.1C132.9 274.3 66.06 312.8 111.4 457.8c5.031 16.09-14.41 28.56-28.06 18.62C39.59 444.6 0 383.8 0 322.3c0-152.2 127.4-184.4 288-186.3V56.02c0-20.67 24.28-31.46 39.69-18.16l176 151.1C514.8 199.4 514.8 216.6 503.7 226.2z"/></svg>
            </span>
          </div>
        </div>
         -->

        <!-- like -->
        <!-- <img @click="animate()" :src="require(`@/assets/img/heart.svg`)" :style="{'bottom': safeareaBottom }" style="position: absolute; width: 40px; height: 40px; right: 15px; z-index: 1000"> -->


        <!-- visible -->
        <!-- <div class="visible" v-observe-visibility="{ callback: (isVisible, entry) => visibilityChanged(isVisible, entry, index),intersection: { threshold: 1 }, throttle: throttle}" style="position: absolute; z-index: 1000000; width: 50px; height: 50px; left: calc(50% - 25px); top: calc(50% - 25px);"></div> -->
      </div> 

      <!-- clip -->
      <div v-else-if="feed.type == 'clip' && feed.value" class="clip" v-touch:swipe="swipeHandler">
        <!-- top -->
        <div v-if="!loading" style="background-image: linear-gradient(0deg, transparent 84%, rgba(0, 0, 0, 0.4)); height: 100%; position: absolute; z-index: 10; width: 100%; top: 0px;"></div>
        
        <!-- bottom -->
        <div v-if="!loading" style="background-image: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.4)); height: 100%; position: absolute; z-index: 10; width: 100%; bottom: 0px;"></div>
        
        <!-- loader -->
        <div v-if="loading" class="css-vhzttx" style="backdrop-filter: saturate(180%) blur(55px); background-color: rgba(25, 25, 25, 0.8);top: 0px;z-index: 10; width: 100%;height: 100%;position: absolute;"></div>
        <div v-if="loading" :src="require(`@/assets/img/anonyme.jpg`)" style="object-fit: cover; z-index: 2;position: absolute;width: 100%;height: 100vh; top: 0px;"></div>
        <img v-if="loading && feed.value.vendor && feed.value.vendor.user.picture" :src="cloudinary256x256 + feed.value.vendor.user.picture" style="object-fit: cover; z-index: 1;position: absolute;width: 100%;height: 100vh; top: 0px;">
        <img v-else-if="loading && feed.value.vendor && !feed.value.vendor.user.picture" :src="require(`@/assets/img/anonyme.jpg`)" style="object-fit: cover; z-index: 1;position: absolute;width: 100%;height: 100vh; top: 0px;">



        <!-- end live -->
      <!--   <div style="left: calc(50vw - 112px); top: calc(40vh - 114px); position: absolute; z-index: 10000; justify-content: center; text-align: center; margin: 0 auto; align-items: center; justify-content: center;">
          <h4 style="color: white; margin-bottom: 50px; font-size: 25px;">Le LIVE est terminé</h4>
          <div class="video-page__influencer-badge2" style="background: none; left: initial; position: relative; margin: 0 auto; text-align: center; justify-content: center;">
            <div class="video-page__influencer-img2" style="padding-right: 0px;">
              <img :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%; width: 120px; height: 120px; object-fit: cover;" />
            </div>
            <div  style="position: absolute; top: 88px; left: 130px; border-radius: 50px;">
              <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 32px; height: 32px; border: 1px solid white; border-radius: 100px;">
                <defs></defs>
                <path d="M352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z" style="fill: white;"></path>
                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256C397.4 512 512 397.4 512 256S397.4 0 256 0zM352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z" style="fill: rgb(255, 39, 115);"></path>
              </svg>
            </div>
          </div>
          <div  class="video-page__influencer-username2" style="font-size: 18px; margin-top: 15px; color: white; font-weight: 400;">Youarda.C</div>
        </div>
        <div style="left: calc(50vw - 150px); bottom: 40px; position: absolute; z-index: 10000; justify-content: center; text-align: center; margin: 0 auto; align-items: center; justify-content: center;">
          <lottie :options="defaultOptions2" :width="40" v-on:animCreated="handleAnimation" style="transform: rotate(180deg);"/>
          <h4 style="color: white; font-size: 16px; font-weight: 400;">Swipe vers le haut pour passer au prochain</h4>
        </div>
 -->


        <!-- purchase -->
     <!--    <div style="position: absolute; z-index: 10000; justify-content: center; text-align: center; margin: 0px auto; align-items: center; height: 100vh; width: 100vw;">
          <div class="video-page__influencer-badge2" style="background: none; left: initial; position: relative; margin: 0px auto; text-align: center; justify-content: center;    height: 100vh; width: 100vw;">
            <div class="video-page__influencer-img2" style="padding-right: 0px;">
              <img class="zoom" :src="require(`@/assets/img/badge-vente.png`)" style="border-radius: 50%; width: 175px; height: 175px; object-fit: cover;"/>
            </div>
            <img class="zoom" :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%; width: 70px; height: 70px; object-fit: cover; position: absolute;" />
            <lottie :options="defaultOptions3" v-on:animCreated="handleAnimation" style="position: absolute; width: 100vh; height: 100vh"/>
          </div>
        </div>
 -->

        <!-- love -->
        <div v-if="videos[index].value" class="n7fi1qx3 ni8dbmo4 stjgntxs hzruof5a pmk7jnqg kr520xx4 etr7akla bt9ki6u7 bipmatt0" style="z-index: 100000000">
          <div v-if="anim1" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 1px;">
            <div class="_g19 KeyframeAnimation-js_6">
              <div class="_g19 KeyframeAnimation-js_7"><img  :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim2" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 11px;">
            <div class="_g19 KeyframeAnimation-js_8">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim3" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 9px;">
            <div class="_g19 KeyframeAnimation-js_9">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim4" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 13px;">
            <div class="_g19 KeyframeAnimation-js_10">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim5" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">    
            <div class="_g19 KeyframeAnimation-js_11"> 
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim6" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 15px;">
            <div class="_g19 KeyframeAnimation-js_12">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim7" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 1px;">
            <div class="_g19 KeyframeAnimation-js_13">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim8" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_14">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim9" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_15">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim10" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_16">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim11" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_17">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim12" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_18">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim13" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_19">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim14" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_20">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim15" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_21">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim16" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_22">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim17" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_23">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim18" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_24">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim19" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_25">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim20" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_26">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim21" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_27">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim22" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_28">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim23" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_29">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
          <div v-if="anim24" class="_g19 KeyframeAnimation-js_5" :style="{'bottom': safeareaBottom }" style="right: 10px;">
            <div class="_g19 KeyframeAnimation-js_30">
              <div class="_g19 KeyframeAnimation-js_7"><img :src="require(`@/assets/img/love.png`)"/></div>
            </div>
          </div>
        </div>


        <!-- viewers -->
    <!--     <div :style="{'top': safeareaTop3 }" class="bp9cbjyn jk6sbkaj kdgqqoy6 ihh4hy1g qttc61fc rq0escxv pq6dq46d datstx6m jb3vyjys p8fzw8mz qt6c0cv9 pcp91wgn afxn4irw m8weaby5 ee40wjg4" style="position: absolute;height: 22px;width: fit-content;left: 15px; background: rgba(255, 255, 255, 0.25); padding: 0px 10px;border-radius: 50px; z-index: 20;">
          <lottie :options="defaultOptions" :width="15" v-on:animCreated="handleAnimation"/>
          <span dir="auto" class="d2edcug0 hpfvmrgz qv66sw1b c1et5uql oi732d6d ik7dh3pa ht8s03o8 a8c37x1j keod5gw0 nxhoafnm aigsh9s9 d9wwppkn fe6kdd0r mau55g9w c8b282yb mdeji52x j5wam9gi lrazzd5p ljqsnud1">
            <span style="padding-left: 5px; font-weight: bold;">{{ viewers }}</span>
          </span>
        </div> -->




        <!-- profil -->
        <div v-if="feed.value.vendor" class="video-page__influencer-badge2" :style="{'top': safeareaTop }" style="padding-right: 9px; left: 15px; background: none;">
          <div @click="goProfile(feed.value.vendor.user.id)" class="video-page__influencer-img2" style="padding-right: 7px;">
            <img v-if="feed.value.vendor.user.picture" :src="cloudinary256x256 + feed.value.vendor.user.picture" style="border-radius: 50%; width: 44px; height: 44px; object-fit: cover;">
            <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%; width: 44px; height: 44px; object-fit: cover;">
          </div>
          <div @click="goProfile(feed.value.vendor.user.id)" class="video-page__influencer-username-holder2">
            <div class="video-page__influencer-username2" style="font-size: 15px;">{{ feed.value.vendor.businessName }}</div>
          </div>
          <div v-if="following[index].value == false && feed.value.vendor.user.id != user.id" @click="follow(feed.value.vendor.user.id)" style="position: absolute; top: 24px; left: 18px; border-radius: 50px; padding: 5px;">
	          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px; height: 20px; border: 1px solid white; border-radius: 100px;"><defs></defs>
              <path style="fill: white;" d="M352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"/>
              <path style="fill: #ff2773;" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256C397.4 512 512 397.4 512 256S397.4 0 256 0zM352 280H280V352c0 13.2-10.8 24-23.1 24C242.8 376 232 365.2 232 352V280H160C146.8 280 136 269.2 136 256c0-13.2 10.8-24 24-24H232V160c0-13.2 10.8-24 24-24C269.2 136 280 146.8 280 160v72h72C365.2 232 376 242.8 376 256C376 269.2 365.2 280 352 280z"/>
	          </svg>
          </div>
        </div>



        <!-- cart + account + promo -->
        <div :style="{'top': safeareaTop }" class="video-page__influencer-badge4" style="position: absolute; right: 15px; background: rgba(255, 255, 255, 0.15); z-index: 20;">
          <div @click="showPromo()" class="video-page__influencer-username-holder" style="padding-left: 5px;">
            <span class="video-page__influencer-video-count">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 45px; height: 40px; padding: 10px; fill: white;">
                <path d="M536.5 170.7l-135.7-131.9c-9.453-9.219-24.67-9-33.94 .5c-9.234 9.5-9.016 24.69 .5 33.94l135.5 131.7C519 221.1 528 242.8 528 265.8s-8.969 44.63-25.3 60.95l-111.7 112.4c-9.344 9.406-9.312 24.59 .0938 33.94C395.8 477.7 401.9 480 408 480c6.172 0 12.33-2.359 17.02-7.078l111.7-112.3C562 335.3 576 301.6 576 265.8S562 196.2 536.5 170.7zM463.6 225.6L286.4 48.4C277.4 39.38 259.6 32 246.8 32H60C44.54 32 32 44.54 32 60v186.8c0 12.76 7.381 30.58 16.4 39.6l177.2 177.2c21.87 21.87 57.32 21.87 79.2 .002l158.8-158.8C485.5 282.9 485.5 247.5 463.6 225.6zM144 176c-17.67 0-32-14.32-32-32c0-17.68 14.33-32 32-32s32 14.32 32 32C176 161.7 161.7 176 144 176z"></path>
              </svg>
            </span>
          </div>
          <div @click="showCart()" class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 40px; height: 40px; padding: 10px; fill: white;">
                <path d="M416 160h-72V120C344 53.83 290.2 0 224 0S104 53.83 104 120V160H32C14.33 160 0 174.3 0 192v240C0 476.2 35.82 512 80 512h288c44.18 0 80-35.82 80-80V192C448 174.3 433.7 160 416 160zM152 120C152 80.3 184.3 48 224 48s72 32.3 72 72V160h-144V120zM128 248C114.8 248 104 237.3 104 224S114.8 200 128 200S152 210.8 152 224S141.3 248 128 248zM320 248c-13.25 0-24-10.75-24-24S306.8 200 320 200S344 210.8 344 224S333.3 248 320 248z"/>
              </svg>
            </span>
          </div>
          <div @click="goToAccount()" class="video-page__influencer-username-holder" style="padding-right: 5px;">
            <span class="video-page__influencer-video-count">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 40px; height: 40px; padding: 10px; fill: white;">
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
              </svg>
            </span>
          </div>
        </div>

        

        <!-- comments -->
        <div v-if="comments[index].value.length" class="scrollToMe" ref="scrollToMe" :style="{'bottom': safeareaBottom3 }" style="margin-right: 50px;">
          <div v-for="comment in comments[index].value" style="display: flex;">
            <div class="video-page__influencer-img" style="padding-right: 6px;">
              <img v-if="comment.user.picture" :src="cloudinary256x256 + comment.user.picture" style="border-radius: 50%;width: 28px;height: 28px; object-fit: cover; margin-top: 2px;">
              <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border-radius: 50%;width: 20px;height: 20px; object-fit: cover">
            </div>
            <div class="video-page__influencer-badge" style="padding: 4px 10px 5px 10px; margin-top: 0px; border-radius: 11px; background-color: rgba(255, 255, 255, 0.075); letter-spacing: 0.05px; margin-right: 0px">
              <div class="video-page__influencer-username-holder">
                <div class="video-page__influencer-username" style="line-height: 18px;"> 
                  <div v-if="comment.isVendor" style="font-size: 13px; font-weight: 600; text-shadow: rgb(0 0 0 / 60%) 0px 1px 4px;">{{ user.vendor.businessName }}</div>
                  <div v-else style="font-size: 13px;margin-right: 3px;font-weight: 600;text-shadow: rgb(0 0 0 / 60%) 0px 1px 4px;">{{ comment.user.firstname }} {{ comment.user.lastname }}</div>
                  <div style="font-weight: 400; font-size: 14px; text-shadow: rgb(0 0 0 / 60%) 0px 1px 4px;">{{ comment.content }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>


        
        <!-- product -->
        <div v-if="feed.value.product" @click="showProduct(feed.value.product)" class="video-page__product-box" :style="{'bottom': safeareaBottom2 }">
          <div class="video-page__product-top">
            <div class="video-page__image">
              <img v-if="feed.value.product.uploads" :src="cloudinary256x256 + feed.value.product.uploads[0].filename">
              <img v-else :src="require(`@/assets/img/no-preview.jpg`)">
            </div>
            <div class="video-page__info">
              <div>
                <h5 class="video-page__name"> {{ feed.value.product.title }}</h5>
              </div>
              <div class="video-page__price-row">
                <div class="video-page__price">
                  <div class="video-page__price-line">
                    <div class="video-page__price"> {{ feed.value.product.price| formatPrice }}€ 
                      <span style="font-size: 14px; text-decoration: line-through; color: rgb(153, 153, 153); padding-left: 5px; font-weight: 500;" v-if="feed.value.product.compareAtPrice" class="disc">{{ feed.value.product.compareAtPrice| formatPrice }}€</span> 
                      <span style="font-size: 12px;color: white;background: rgba(255, 39, 115, 0.75);padding: 4px 8px;border-radius: 50px;font-weight: 400; margin-left: 10px;">-20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- list of products -->
        <div v-if="feed.value.vendor" :style="{'bottom': safeareaBottom }" @click="showShop(feed.value.vendor)" class="video-page__influencer-badge5" style="position: absolute; width: 40px; height: 40px; left: 15px; z-index: 1000; border-radius: 50px;">
          <div class="video-page__influencer-username-holder">
            <span class="video-page__influencer-video-count">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 46px;height: 40px;padding: 10px;fill: white;"><path d="M144 32h-96C21.49 32 0 53.49 0 80v96C0 202.5 21.49 224 48 224h96C170.5 224 192 202.5 192 176v-96C192 53.49 170.5 32 144 32zM400 288h-96C277.5 288 256 309.5 256 336v96c0 26.51 21.49 48 48 48h96c26.51 0 48-21.49 48-48v-96C448 309.5 426.5 288 400 288zM400 32h-96C277.5 32 256 53.49 256 80v96C256 202.5 277.5 224 304 224h96C426.5 224 448 202.5 448 176v-96C448 53.49 426.5 32 400 32zM144 288h-96C21.49 288 0 309.5 0 336v96C0 458.5 21.49 480 48 480h96C170.5 480 192 458.5 192 432v-96C192 309.5 170.5 288 144 288z"></path></svg>
            </span>
          </div>
        </div>

        <!-- send comment -->
        <div @click="openPopup()" class="video-page__influencer-badge-send" style="left: 70px; right: 125px; z-index: 10000000" :style="{'bottom': safeareaBottom }">
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 42px; height: 40px; padding: 10px; fill: white;"><path d="M503.7 226.2l-176 151.1c-15.38 13.3-39.69 2.545-39.69-18.16V272.1C132.9 274.3 66.06 312.8 111.4 457.8c5.031 16.09-14.41 28.56-28.06 18.62C39.59 444.6 0 383.8 0 322.3c0-152.2 127.4-184.4 288-186.3V56.02c0-20.67 24.28-31.46 39.69-18.16l176 151.1C514.8 199.4 514.8 216.6 503.7 226.2z"/></svg>
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
    <div v-if="popup" class="css-1dko8fk" :style="{'bottom': writeInput }" style="height: 55px; border-radius: 0px;">
      <div class="css-miqn2j">
        <input v-focus v-on-clickaway="away" placeholder="Aa" type="text" class="css-9gu6qp" v-model="content" style="padding: 10px 0px 10px 15px; font-size: 14px; background: rgb(244, 244, 244); border-radius: 30px; font-weight: 400;"/>
      </div>
      <button id="buttonSend" :class="{'Mui-disabled': content.length == 0 }" class="css-il3d4y">
        <svg id="svgSend" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path id="pathSend" d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12L2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" fill="currentColor"></path>
        </svg>
      </button>
    </div>

    <!-- promo popup -->
    <div v-if="popupPromo" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 40%; width: 100vw; box-shadow: 0 0 5px rgb(0 0 0 / 20%); padding: 0px 15px 15px; left: 0px; border-top-left-radius: 20px; border-top-right-radius: 20px;">
      <div @click="hidePromo()" style="display: flex;">
        <div id="scroll-indicator" style="height: 5px;width: 60px;background: rgba(0,0,0,0.2);border-radius: 4.5px;margin: 15px auto;">
        </div>
      </div>

      <div style="margin: 0px;">
        <div style="text-align: center; margin-bottom: 20px; font-weight: 600; color: rgb(51, 51, 51);">
          <span style="text-align: center; font-size: 17px; margin: 0px auto; color: #000">Promotion</span>
        </div>

        <p style="text-align: left; font-size: 12px; line-height: 1.57143; font-size: 13px; font-weight: 400; margin: 0; margin-top: 15px; padding: 10px;">Cette promotion sera appliqué automatiquement lors du passage en caisse.</p>

        <div style="box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;margin: 5px;padding: 8px 0px;margin-top: 10px;border-radius: 10px; margin-bottom: 15px;">
          <div class="profile--follow">
            <div style="width: 40%; margin-top: 5px;">
              <img src="https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/1ad36aab1eb15a377d8393144b34dd93.jpeg" class="user" style="margin: 7px 25px;width: 64px;height: 64px;border-radius: 100%;">
            </div>
            <hr style="margin: 0px;border-width: 0 2px 0 0;border-style: dashed;border-color: rgba(145,158,171,.24);">
            <div>
              <h4 style="font-size: 30px; font-weight: 600; margin-top: 3px; margin-bottom: 0px;">-50%</h4>
              <p>Valable sur toute la boutique </p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- product popup -->
    <div v-if="popupProduct" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 95%; padding-bottom: 120px;">
      <svg @click="hideProduct()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 30px; height: 30px; fill: rgb(153, 153, 153); padding: 5px; background: white; border-radius: 30px; opacity: 0.5; position: absolute; top: 15px; left: 15px; z-index: 100000000;"><path d="M432.6 209.3l-191.1 183.1C235.1 397.8 229.1 400 224 400s-11.97-2.219-16.59-6.688L15.41 209.3C5.814 200.2 5.502 184.1 14.69 175.4c9.125-9.625 24.38-9.938 33.91-.7187L224 342.8l175.4-168c9.5-9.219 24.78-8.906 33.91 .7187C442.5 184.1 442.2 200.2 432.6 209.3z"/></svg>
      <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="presentation" aria-hidden="true" focusable="false" style="width: 30px;height: 30px;fill: white;border-radius: 30px;position: absolute;top: 20px;right: 20px;z-index: 100000000;">
        <g transform="matrix( 1 0 0 1 1 2 )">
          <path d="M15 3C17.5 3 19 4.90001 19 7.20001C19 8.40001 18.4 9.49999 17.7 10.3C16.5 11.5 11 16 11 16C11 16 5.50005 11.5 4.30005 10.3C3.50005 9.49999 3 8.40001 3 7.20001C3 4.90001 4.5 3 7 3C8.7 3 10.3 4.6 11 6C11.7 4.6 13.3 3 15 3ZM15 0C13.5 0 12.1 0.599994 11 1.39999C9.9 0.499994 8.5 0 7 0C3 0 0 3.10001 0 7.20001C0 9.10001 0.799951 10.9 2.19995 12.4C3.59995 13.9 11 19.9 11 19.9C11 19.9 18.4 13.9 19.8 12.4C21.2 10.9 22 9.10001 22 7.20001C22 3.10001 19 0 15 0Z" fill="#FFFFFF" style="
          fill: white;">
          </path>
        </g>
      </svg>
      <Product :product="product" @clicked="onClickChild"/>
    </div>
    <div v-if="popupProduct" style="background-color: white;bottom: calc(env(safe-area-inset-bottom) + 0px); position: fixed; z-index: 1000000001;">
      <div style="padding: 15px 20px 25px;background-color: white;width: 100vw;display: flex;justify-content: center;align-items: center;">
        <div @click="addToCart()" class="btn-swipe" style="color: rgb(24, 206, 160);text-align: center;width: calc(50vw - 25px);background: white;padding: 13px 20px;border-radius: 10px;font-weight: 500;font-size: 15px;margin: 0px 20px 0px 0px;height: 50px;border: 2px solid rgb(24, 206, 160);">Ajouter</div>
        <div @click="goCheckout()" class="btn-swipe" style="text-align: center;width: calc(50vw - 25px);padding: 14px 20px;border-radius: 10px;font-weight: 500;font-size: 15px;margin: 0px;background: rgb(24, 206, 160);color: rgb(255, 255, 255) !important;height: 50px;">Acheter</div>
      </div>
    </div>



    <!-- cart popup -->
    <div v-if="popupCart" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 95%; width: 100vw; box-shadow: 0 0 5px rgb(0 0 0 / 20%); padding: 0px 15px 15px; left: 0px; border-top-left-radius: 20px; border-top-right-radius: 20px;">
      <div @click="hideCart()" style="display: flex;">
        <div id="scroll-indicator" style="height: 5px;width: 60px;background: rgba(0,0,0,0.2);border-radius: 4.5px;margin: 15px auto;">
        </div>
      </div>

      <div style="margin: 0px;">
        <div style="text-align: center; margin-bottom: 20px; font-weight: 600; color: rgb(51, 51, 51);">
          <span style="text-align: center; font-size: 17px; margin: 0px auto; color: #000">Panier</span>
        </div>
        <Cart/>
      </div>
    </div>



    <!-- shop popup -->
    <div v-if="popupShop" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 95%; width: 100vw; box-shadow: 0 0 5px rgb(0 0 0 / 20%); padding: 0px 10px 15px; left: 0px; border-top-left-radius: 20px; border-top-right-radius: 20px;">
      <div @click="hideShop()" style="display: flex;">
        <div id="scroll-indicator" style="height: 5px;width: 60px;background: rgba(0,0,0,0.2);border-radius: 4.5px;margin: 15px auto;">
        </div>
      </div>

      <div style="margin: 0px;">
        <div style="text-align: center; margin-bottom: 20px; font-weight: 600; color: rgb(51, 51, 51);">
          <span style="text-align: center; font-size: 17px; margin: 0px auto; color: #000">Boutique de {{ shop.businessName }}</span>
        </div>
      </div>

      <div v-if="shop" class="checkout__body items" style="overflow: scroll; padding-bottom: 50px;">
        <div class="shop--part" style="margin: 0px; padding: 0px 5px;">
          <div v-if="product.archived == false" v-for="product in shop.products" class="shop--item">
            <div>
              <div>
                <img v-if="product.uploads.length" :src="cloudinary256x256 + product.uploads[0].filename" style="width: 100%;">
                <img v-else :src="require(`@/assets/img/no-preview.jpg`)" style="width: 100%;">
              </div>
            </div>
            <div class="shop--item--details">
              <div class="shop--item--name">{{ product.title }}</div>
              <div class="shop--item--price">
                <div class="price" :style="[product.compareAtPrice ? {'color': '#18cea0'} : {'color': '#000'}]"> {{ product.price | formatPrice }}€ 
                  <span v-if="product.compareAtPrice" class="last-price">{{ product.compareAtPrice | formatPrice }}€ </span>
                </div>
              </div>
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

import Pusher from 'pusher-js';
import Product from './Product';
import Cart from './Cart';
import { mixin as clickaway } from 'vue-clickaway';
import Lottie from 'vue-lottie';
import * as animationData from '../assets/img/live.json';
import * as animationData2 from '../assets/img/arrow.json';
import * as animationData3 from '../assets/img/confetti.json';

export default {
  name: 'Feed',
  components: {
    Product,
    Cart,
    'lottie': Lottie
  },
  mixins: [ clickaway ],
  data() {
    return {
      data: [],
      videos: [],
      user: JSON.parse(window.localStorage.getItem("user")),
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      bambuserId: window.localStorage.getItem("bambuserId"),
      pusher: new Pusher('55da4c74c2db8041edd6', { cluster: 'eu' }),
      lineItems: window.localStorage.getItem("lineItems") ? JSON.parse(window.localStorage.getItem("lineItems")) : [],
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      defaultOptions: {animationData: animationData},
      defaultOptions2: {animationData: animationData2},
      defaultOptions3: {animationData: animationData3},
      animationSpeed: 1,
      following: [],
      comments: [],
      purchases: [],
      product: null,
      variant: null,
      shop: [],
      viewers: 0,
      display: 1,
      visible: 0,
      loading: true,
      popup: false,
      promo: true,
      cart: true,
      safeareaBottom: '0px',
      safeareaBottom2: '57px',
      safeareaBottom3: '185px',
      safeareaTop: '0px',
      safeareaTop2: '62px',
      safeareaTop4: '100px',
      safeareaTop5: '13px',
      safeareaTop3: '60px',
      writeInput: '0px',
      content: "",
      popupPromo: false,
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

    if (window.cordova && window.cordova.platformId === "ios") {
      this.safeareaBottom = 'calc(env(safe-area-inset-bottom) + 0px)';
      this.safeareaBottom2 = 'calc(env(safe-area-inset-bottom) + 57px)';
      this.safeareaBottom3 = 'calc(env(safe-area-inset-bottom) + 185px)';
      this.safeareaTop = 'calc(env(safe-area-inset-top) + 0px)';
      this.safeareaTop2 = 'calc(env(safe-area-inset-top) + 62px)';
      this.safeareaTop3 = 'calc(env(safe-area-inset-top) + 60px)';
      this.safeareaTop4 = 'calc(env(safe-area-inset-top) + 100px)';
      this.safeareaTop5 = 'calc(env(safe-area-inset-top) + 13px)';
      this.throttle = 500;

      if (!this.bambuserId) {
        window.localStorage.setItem("bambuserId", "Eqza0IhJO8JKQTs37D0VKQ");
      }
    }

    if (window.cordova && window.cordova.platformId === "android") {
      this.safeareaBottom = "25px";
      this.safeareaBottom2 = "82px";
      this.safeareaBottom3 = "210px";
      this.safeareaTop = '25px';
      this.safeareaTop2 = '87px';
      this.safeareaTop3 = '85px';
      this.safeareaTop4 = '125px';
      this.safeareaTop5 = '38px';
      this.throttle = 1000;

      if (!this.bambuserId) {
        window.localStorage.setItem("bambuserId", "7a1Fm1qdrF4bYhnTfZosPA");
      }
    }

    if (window.bambuser && window.bambuser.player && (window.cordova.platformId === "ios" || window.cordova.platformId === "android")) {
      this.player = window.bambuser.player;
      this.player.setApplicationId(this.bambuserId);
    } else {
      console.log("Bambuser is not available");
    }

    if (window.cordova.plugin && window.cordova.plugin.http) {
      this.http = window.cordova.plugin.http;
      this.http.setDataSerializer('json');
    }

    this.http.get(this.baseUrl + "/user/api/profile", {}, { Authorization: "Bearer " + this.token }, (response) => {
    	console.log(JSON.parse(response.data));
      this.user = JSON.parse(response.data);
      window.localStorage.setItem("user", response.data);
    }, (error) => {
      console.log(error);
    });
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
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    visibilityChanged(isVisible, entry, index) {
      if (isVisible) {
        if (index != this.visible) {
          console.log(index, this.visible);
          this.popup = false;
          this.popupProduct = false;
          this.popupCart = false;
          this.popupShop = false;
          this.loading = true;

          var value = this.data[index].value;
          this.videos[this.visible].value = "";
          this.comments[this.visible].value = [];
          this.display = 1;
          this.viewers = 0;
          this.product = null;
          this.variant = null;
          this.stopLive();
          this.visible = index;

          if (this.data[index].type == "live") {
            this.videos[index].value = "";
            this.display = value.display;

            if (value.comments.length > 0) {
              this.comments[index].value = value.comments;
              this.scrollToElement();
            } else {
              this.comments[index].value = [];
            }

            this.startLive(value);

          } else if (this.data[index].type == "clip") {
            this.videos[index].value = value.resourceUri;
            this.comments[index].value = value.comments;

            setTimeout(() => {
              console.log(value.resourceUri);
              var player2 = window.BambuserPlayer.create(document.getElementById('player'+index), value.resourceUri);
              console.log(player2);

              // Listen to player events
              player2.addEventListener('ended', () => {
                console.log('player ended');
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
    addToCart() {
      this.popupProduct = false;
      this.popupCart = false;
      this.popupShop = false;

      this.lineItems = window.localStorage.getItem("lineItems") ? JSON.parse(window.localStorage.getItem("lineItems")) : [];
      console.log(JSON.parse(window.localStorage.getItem("lineItems")));

      if (this.lineItems.length) {
        var exist = false;
        var newVendor = false;
        var nameVendor = null;
        
        this.lineItems.map(lineItem => {
          if (lineItem.product.vendor.id != this.product.vendor.id) {
            newVendor = true;
            nameVendor = lineItem.product.vendor.businessName;
          }
        });

        if (!newVendor) {
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
              console.log('You selected button ' + buttonIndex);
              if (window.cordova.platformId == "browser") {
                var id = 1;
              } else {
                var id = 2;
              }
              if (buttonIndex == id) {
                this.lineItems = [];
                this.lineItems.push({ "product": this.product, "variant": this.variant, "quantity": 1 });
                window.localStorage.setItem("lineItems", JSON.stringify(this.lineItems));
              }
            },   
            'Nouveau panier ?', 
            ['Conserver','Nouveau'] 
          );
        }

        if (!exist) {
          this.lineItems.push({ "product": this.product, "variant": this.variant, "quantity": 1 });
        }
      } else {
        this.lineItems.push({ "product": this.product, "variant": this.variant, "quantity": 1 });
      }

      window.localStorage.setItem("lineItems", JSON.stringify(this.lineItems));
      console.log(JSON.parse(window.localStorage.getItem("lineItems")));
    },
    showPromo() {
      console.log("show promo");
      this.popupPromo = true;
      this.popupProduct = false;
      this.popupShop = false;
      this.popupCart = false;
    },
    hidePromo() {
      console.log('hide promo');
      this.popupPromo = false;
      this.popupCart = false;
      this.popupShop = false;
      this.popupProduct = false;
    },
    showCart() {
      this.popupCart = true;
      this.popupPromo = false;
      this.popupProduct = false;
      this.popupShop = false;
    },
    hideCart() {
      this.popupCart = false;
      this.popupPromo = false;
      this.popupShop = false;
      this.popupProduct = false;
    },
    showShop(shop) {
      this.shop = shop;
      this.popupShop = true;
      this.popupPromo = false;
      this.popupCart = false;
      this.popupProduct = false;
    },
    hideShop() {    
      this.popupShop = false;
      this.popupCart = false;
      this.popupPromo = false;
      this.popupProduct = false;
      this.shop = [];
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
      this.$router.push({ name: 'Account' });
    },
    swipeHandler(direction) {
      if (direction == "right") {
        this.stopLive();
        this.$router.push({ name: 'Home' });
      }

      if (direction == "left") {
        this.stopLive();
        if (this.data[this.visible].value.vendor.user.id == this.user.id) {
          this.$router.push({ name: 'Account' });
        } else {
          this.$router.push({ name: 'Profile', params: { id: this.data[this.visible].value.vendor.user.id } });
        }
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

      if (this.user.vendor && this.user.vendor.businessName == this.data[this.visible].value.vendor.businessName) {
        var isVendor = true;
      }
      
      this.http.post(this.baseUrl + "/user/api/" + this.data[this.visible].type + "/" + this.data[this.visible].value.id + "/comment/add", { "content": this.content }, { Authorization: "Bearer " + this.token }, (response) => {
        var result = JSON.parse(response.data);
        this.content = "";
        this.comments[this.visible].value = result.comments;
        this.data[this.visible].value = result;
        this.scrollToElement();
      }, (response) => {
        console.log(response.error);
      });
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
    refresh() {
      this.popup = false;
      this.popupProduct = false;
      this.loading = true;

      // mettre à jour les informations de l'ancien live
      if (this.data && this.data.length > 0) {
        this.stopLive();
      }

      this.http.get(this.baseUrl + "/user/api/feed", {}, { Authorization: "Bearer " + this.token }, (response) => {
        var result = JSON.parse(response.data);
        console.log(result.length);

        if (result.length) {
          this.data = [];
          this.videos = [];
          this.comments = [];
          this.following = [];
          this.display = 1;
          this.viewers = 0;
          this.visible = 0;


          result.map((element, index) => {
            var value = JSON.parse(element.value);
            console.log(value);

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
            console.log(this.following);

            if (index == 0) {
              // si c'est un live
              if (element.type == "live") {
                this.videos.push({ "value": "" });
                this.display = value.display;

                if (value.comments.length > 0) {
                  this.comments.push({ "value": value.comments });
                } else {
                  this.comments.push({ "value": [] });
                }

                this.scrollToElement();
                this.startLive(value);

              } else if (element.type == "clip") {
                console.log(value.resourceUri);
                // si c'est un clip
                this.videos.push({ "value": value.resourceUri });
                this.comments.push({ "value": value.comments });
                this.scrollToElement();


                setTimeout(() => {
                  console.log(value.resourceUri);
                  var player2 = window.BambuserPlayer.create(document.getElementById('player'+index), value.resourceUri);

                  // Listen to player events
                  player2.addEventListener('ended', () => {
                    console.log('player ended');
                  });

                  player2.addEventListener('canplay', () => {
                    this.loading = false;
                  });

                  player2.scaleMode = "aspectFill";
                  player2.play();
                }, 500);
              }
            } else {
              this.videos.push({ "value": "" });
              this.comments.push({ "value": [] });
            }
          });
        } else {
          this.$router.push({ name: 'Account' });
        }
      }, (response) => {
        console.log(response.error);
      });
    },
    stopLive() {
      if (this.player) {
        document.getElementsByTagName('body')[0].classList.remove("show-viewfinder");
        document.getElementsByTagName('body')[0].classList.add("dark-mode");
        this.player.hidePlayer();
        this.player.close();
      }

      if (this.data[this.visible].type == "live") {
        this.pusher.unsubscribe(this.data[this.visible].value.channel);

        this.http.put(this.baseUrl + "/user/api/live/" + this.data[this.visible].value.id + "/update/viewers", {}, { Authorization: "Bearer " + this.token }, (response) => {}, 
            (response) => { console.log(response.error); });
      }
    },
    startLive(value) {
      var channel = this.pusher.subscribe(value.channel);
      channel.bind("pusher:subscription_succeeded", (response) => {
        console.log("subscription_succeeded : " + response);

        this.http.put(this.baseUrl + "/user/api/live/" + value.id + "/update/viewers", {}, { Authorization: "Bearer " + this.token }, (response) => {}, (response) => { 
          console.log(response.error); 
        });
      });

      channel.bind("pusher:subscription_error", (response) => {
        console.log("subscription_error : " + response);
      });

      channel.bind(value.event, (data) => {
        console.log(data);

        if (data.comment) {
          if (data.comment.user.firstname != this.user.firstname && data.comment.user.lastname != this.user.lastname) {
            this.comments[this.visible].value.push(data.comment);
            this.scrollToElement();
          }
        }

        if (data.viewers) {
          this.viewers = data.viewers;
        }

        if (data.display) {
          this.display = data.display;
        }
      });

      if (this.player) {
        document.getElementsByTagName('body')[0].classList.add("show-viewfinder");
        document.getElementsByTagName('body')[0].classList.remove("dark-mode");

        try {
          this.player.showPlayerBehindWebView();
          this.player.loadBroadcast(value.resourceUri);
          this.listenForBroadcastLoaded();
          this.listenForStateChange();
        } catch (e) {
          console.log('Failed to load broadcast', e);
        }
      }
    },
    listenForStateChange() {
      if (!this.stateListener) {
        this.stateListener = this.player.addEventListener('stateChange', status => {
           console.log("Event : " + status);

          if (status == "playing") {
            this.loading = false;
          }

          if (status == "error") {
            console.log("Une erreur est suvenue lors du chargement du live");
          }

          if (status == "completed") {
            console.log("Le live est fini");

            // stoper le live
            this.stopLive();

            this.data.splice(this.visible, 1);
            this.videos.splice(this.visible, 1);
            this.comments.splice(this.visible, 1);

            var value = this.data[this.visible].value;
            this.popup = false;
            this.loading = true;
            this.display = 1;
            this.viewers = 0;

            if (this.data.length > 0) {
              if (this.data[this.visible].type == "live") {
                this.videos[this.visible].value = "";
                this.display = value.display;

                if (value.comments.length > 0) {
                  this.comments[this.visible].value = value.comments;
                  this.scrollToElement();
                } else {
                  this.comments[this.visible].value = [];
                }

                this.startLive(value);

              } else if (this.data[this.visible].type == "clip") {
                this.videos[this.visible].value = value.resourceUri;
                this.comments[this.visible].value = value.comments;

                if (this.comments[this.visible].value.length > 0) {
                  this.scrollToElement();
                }

                setTimeout(() => {
                  var player2 = window.BambuserPlayer.create(document.getElementById('player'+this.visible), value.resourceUri);

                  // Listen to player events
                  player2.addEventListener('ended', () => {
                    console.log('player ended');
                  });

                  player2.addEventListener('canplay', () => {
                    this.loading = false;
                  });

                  player2.scaleMode = "aspectFill";
                  player2.play();
                }, 500);
              }
            }
          }
        });
      }
    },
    listenForBroadcastLoaded() {
      if (!this.broadcastLoadedListener) {
        this.broadcastLoadedListener = this.player.addEventListener('broadcastLoaded', status => {
           console.log("Event : " + status);

          if (status == "playing") {
            this.loading = false;
          }

          if (status == "error") {
            console.log("Une erreur est suvenue lors du chargement du live");
          }

          if (status == "completed") {
            console.log("Le live est fini");

            // stoper le live
            this.stopLive();

            this.data.splice(this.visible, 1);
            this.videos.splice(this.visible, 1);
            this.comments.splice(this.visible, 1);

            var value = this.data[this.visible].value;
            this.popup = false;
            this.loading = true;
            this.display = 1;
            this.viewers = 0;

            if (this.data.length > 0) {
              if (this.data[this.visible].type == "live") {
                this.videos[this.visible].value = "";
                this.display = value.display;

                if (value.comments.length > 0) {
                  this.comments[this.visible].value = value.comments;
                  this.scrollToElement();
                } else {
                  this.comments[this.visible].value = [];
                }

                this.startLive(value);

              } else if (this.data[this.visible].type == "clip") {
                this.videos[this.visible].value = value.resourceUri;
                this.comments[this.visible].value = value.comments;

                if (this.comments[this.visible].value.length > 0) {
                  this.scrollToElement();
                }

                setTimeout(() => {
                  var player2 = window.BambuserPlayer.create(document.getElementById('player'+this.visible), value.resourceUri);

                  // Listen to player events
                  player2.addEventListener('ended', () => {
                    console.log('player ended');
                  });

                  player2.addEventListener('canplay', () => {
                    this.loading = false;
                  });

                  player2.scaleMode = "aspectFill";
                  player2.play();
                }, 500);
              }
            }
          }
        });
      }
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
      console.log(this.following);

      this.data.map((element, index) => {
        console.log(element.value);
        console.log(element.value.vendor.user.id);

        if (element.value.vendor.user.id == id) {
          this.following[index].value = true;
        }
        console.log(this.following);
      });

      window.cordova.plugin.http.get(this.baseUrl + "/user/api/follow/" + id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        window.localStorage.setItem("user", response.data);
      }, (response) => {
        console.log(response.error);
      });
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
    onClickChild(variant) {
      console.log(variant);
      this.variant = variant;
    },
    goCheckout() {
      this.lineItems = [];
      this.lineItems.push({ "product": this.product, "variant": this.variant, "quantity": 1 });
      window.localStorage.setItem("lineItems", JSON.stringify(this.lineItems));
      this.$router.push({ name: 'Checkout' });
    },
  }
};
</script>

