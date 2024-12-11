<template>
  <main class="products" style="padding: 0px 15px">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div v-if="isOrder" class="checkout__title">Commandes</div>
      <div v-else class="checkout__title">Achats</div>
    </div>

    <div class="checkout__body">
      <div v-if="isOrder">
        <div v-if="user.vendor" class="images_sec" style="padding: 20px 5px 15px; display: flex; flex-wrap: nowrap; overflow-x: auto; width: auto; padding: 15px 0;">
          <div class="images_filter" style="width: calc(100vw - 30px)">
            <ul>
              <li @click="showNumber1()" v-bind:class="{active: show1}" :style="[show1 ? {'color': '#ff2f80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]" style="font-weight: 600;">Nouvelle</li>
              <li @click="showNumber2()" v-bind:class="{active: show2}" :style="[show2 ? {'color': '#ff2f80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">En cours</li>
              <li @click="showNumber3()" v-bind:class="{active: show3}" :style="[show3 ? {'color': '#ff2f80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">Litige</li>
              <li @click="showNumber4()" v-bind:class="{active: show4}"  :style="[show4 ? {'color': '#ff2f80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">Terminée</li>
            </ul>
          </div>
        </div>

        <div class="top-author">
          <div v-if="show1">
            <div v-if="filteredSales.length" class="top-author--container">
              <div v-for="order in filteredSales" @click="showOrder(order, 'sale')" class="top-author--item" style="position: relative">
                <img v-if="order.lineItems[0].product && order.lineItems[0].product.uploads.length" :src="$cloudinary256x256 + order.lineItems[0].product.uploads[0].filename" style="background: #eeeeee"/>
                <img v-else src="/img/no-preview.png"/>
                <span class="counter-badge" style="top: 4px; left: 62px;">{{ nbProducts(order.lineItems) }}</span>
                <div>
                  <div><span>#{{ order.number }}</span></div>
                  <span>{{ order.buyer.firstname }} {{ order.buyer.lastname }}</span>
                  <div><span style="font-size: 11px; color: #999;">{{ $formatDate3(order.createdAt) }}</span></div>
                </div>
                <span class="css-4ioo3c">{{ $formatPrice(order.subTotal - order.promotionAmount) }}€</span>
              </div>
            </div>
            <div v-else-if="loadingOrders">
              <div class="loader2">
                <span></span>
              </div>
            </div>
            <div v-else>
              <div class="container" style="margin: 120px auto 0px; text-align: center;">
                <div style="margin: 0px auto;">
                  <Vue3Lottie :animationData="LottieJSON" :width="200"/>
                </div>
              </div>
              <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucune commande</h5>
              <div style="font-weight: 400; font-size: 15px; text-align: center;">Vos commandes apparaîtront ici.</div>
            </div>
          </div>
          
          <div v-if="show2">
            <div v-if="filteredSales.length" class="top-author--container">
              <div v-for="order in filteredSales" @click="showOrder(order, 'sale')" class="top-author--item" style="position: relative">
                <img v-if="order.lineItems[0].product && order.lineItems[0].product.uploads.length" :src="$cloudinary256x256 + order.lineItems[0].product.uploads[0].filename" style="background: #eeeeee"/>
                <img v-else src="/img/no-preview.png"/>
                <span class="counter-badge" style="top: 4px; left: 62px;">{{ nbProducts(order.lineItems) }}</span>
                <div>
                  <div><span>#{{ order.number }}</span></div>
                  <span>{{ order.buyer.firstname }} {{ order.buyer.lastname }}</span>
                  <div><span style="font-size: 11px; color: #999;">{{ $formatDate3(order.createdAt) }}</span></div>
                </div>
                <span class="css-4ioo3c">{{ $formatPrice(order.subTotal - order.promotionAmount) }}€</span>
              </div>
            </div>
            <div v-else-if="loadingOrders">
              <div class="loader2">
                <span></span>
              </div>
            </div>
            <div v-else>
              <div class="container" style="margin: 120px auto 0px; text-align: center;">
                <div style="margin: 0px auto;">
                  <Vue3Lottie :animationData="LottieJSON" :width="200"/>
                </div>
              </div>
              <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucune commande en cours</h5>
              <div style="font-weight: 400; font-size: 15px; text-align: center;">Vos commandes apparaîtront ici.</div>
            </div>
          </div>
          
          <div v-if="show3">
            <div v-if="filteredSales.length" class="top-author--container">
              <div v-for="order in filteredSales" @click="showOrder(order, 'sale')" class="top-author--item" style="position: relative">
                <img v-if="order.lineItems[0].product && order.lineItems[0].product.uploads.length" :src="$cloudinary256x256 + order.lineItems[0].product.uploads[0].filename" style="background: #eeeeee"/>
                <img v-else src="/img/no-preview.png"/>
                <span class="counter-badge" style="top: 4px; left: 62px;">{{ nbProducts(order.lineItems) }}</span>
                <div>
                  <div><span>#{{ order.number }}</span></div>
                  <span>{{ order.buyer.firstname }} {{ order.buyer.lastname }}</span>
                  <div><span style="font-size: 11px; color: #999;">{{ $formatDate3(order.createdAt) }}</span></div>
                </div>
                <span class="css-4ioo3c">{{ $formatPrice(order.subTotal - order.promotionAmount) }}€</span>
              </div>
            </div>
            <div v-else-if="loadingOrders">
              <div class="loader2">
                <span></span>
              </div>
            </div>
            <div v-else>
              <div class="container" style="margin: 120px auto 0px; text-align: center;">
                <div style="margin: 0px auto;">
                  <Vue3Lottie :animationData="LottieJSON" :width="200"/>
                </div>
              </div>
              <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun litige</h5>
              <div style="font-weight: 400; font-size: 15px; text-align: center;">Vos commandes apparaîtront ici.</div>
            </div>
          </div>
          
          <div v-if="show4">
            <div v-if="filteredSales.length" class="top-author--container">
              <div v-for="order in filteredSales" @click="showOrder(order, 'sale')" class="top-author--item" style="position: relative">
                <img v-if="order.lineItems[0].product && order.lineItems[0].product.uploads.length" :src="$cloudinary256x256 + order.lineItems[0].product.uploads[0].filename" style="background: #eeeeee"/>
                <img v-else src="/img/no-preview.png"/>
                <span class="counter-badge" style="top: 4px; left: 62px;">{{ nbProducts(order.lineItems) }}</span>
                <div>
                  <div><span>#{{ order.number }}</span></div>
                  <span>{{ order.buyer.firstname }} {{ order.buyer.lastname }}</span>
                  <div><span style="font-size: 11px; color: #999;">{{ $formatDate3(order.createdAt) }}</span></div>
                </div>
                <span v-if="order.status != 'cancelled'" class="css-4ioo3c">{{ $formatPrice(order.subTotal - order.promotionAmount) }}€</span>
                <span v-else class="css-4ioo3c" style="color: #999; background-color: #f1f1f1;">0,00€</span>
              </div>
            </div>
            <div v-else-if="loadingOrders">
              <div class="loader2">
                <span></span>
              </div>
            </div>
            <div v-else>
              <div class="container" style="margin: 120px auto 0px; text-align: center;">
                <div style="margin: 0px auto;">
                  <Vue3Lottie :animationData="LottieJSON" :width="200"/>
                </div>
              </div>
              <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucune commande terminée</h5>
              <div style="font-weight: 400; font-size: 15px; text-align: center;">Vos commandes apparaîtront ici.</div>
            </div>
          </div>
        </div>

      </div>
      <div v-else>
        <div class="top-author">
          <div>
            <div v-if="purchases && purchases.length > 0" class="top-author--container">
              <div v-for="order in purchases" @click="showOrder(order, 'purchase')" class="top-author--item" style="position: relative">
                <img v-if="order.lineItems[0].product && order.lineItems[0].product.uploads.length" :src="$cloudinary256x256 + order.lineItems[0].product.uploads[0].filename" style="background: #eeeeee"/>
                <img v-else src="/img/no-preview.png"/>
                <span class="counter-badge" style="top: 4px; left: 62px;">{{ nbProducts(order.lineItems) }}</span>
                <div>
                  <div><span>#{{ order.number }}</span></div>
                  <span>{{ order.vendor.pseudo }}</span>
                  <div><span style="font-size: 11px; color: #999;">{{ $formatDate3(order.createdAt) }}</span></div>
                </div>
                <span class="css-4ioo3c" style="color: #272c30; background-color: transparent; font-weight: 400;">{{ $formatPrice(order.total) }}€</span>
              </div>
            </div>
            <div v-else-if="loadingPurchases">
              <div class="loader2">
                <span></span>
              </div>
            </div>
            <div v-else>
              <div class="container" style="margin: 180px auto 0px; text-align: center;">
                <div style="margin: 0px auto;">
                  <Vue3Lottie :animationData="LottieJSON" :width="200"/>
                </div>
              </div>
              <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun achat</h5>
              <div style="font-weight: 400; font-size: 15px; text-align: center;">Vos achats apparaîtront ici.</div>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- order popup -->
    <div v-if="popupOrder" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; width: calc(100vw - 30px);    overflow: scroll; padding-bottom: 80px;">
      <div class="checkout__header" style="padding: 5px 5px 15px; z-index: 10000000; background: white; width: 100%;">
        <div @click="hideOrder()" class="checkout__close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
        </div>
        <div class="checkout__title">Commande #{{ order.number }}</div>
        <div @click="actionSheet()" class="checkout__right-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z"></path>
          </svg>
        </div>
      </div>
      <div>
        <div class="css-13dslnb" style="border: 1px solid #ddd !important; margin: 5px; padding: 10px; border-radius: 15px; margin-bottom: 20px;">
          <div class="top-author--container">
            <div v-if="type == 'sale'" class="top-author--item" style="padding: 0px; border: none !important;">
              <img v-if="order.buyer.picture" :src="$cloudinary256x256 + order.buyer.picture" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;"/>
              <img v-else src="/img/anonyme.jpg" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;"/>
              <div>
                <span>{{ order.buyer.firstname }} {{ order.buyer.lastname }}</span>
                <div><span>{{ $formatDate3(order.createdAt) }}</span></div>
              </div>
              <div @click="sendMessageToBuyer(order.buyer)" style="width: 28px; height: 28px;">
                <img src="/img/comment-dots.svg"/>
              </div>
            </div>
            <div v-else class="top-author--item" style="padding: 0px; border: none !important;">
              <img v-if="order.vendor.user.picture" :src="$cloudinary256x256 + order.vendor.user.picture" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;"/>
              <img v-else src="/img/anonyme.jpg" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;"/>
              <div>
                <span>{{ order.vendor.pseudo }}</span>
                <div><span>{{ $formatDate3(order.createdAt) }}</span></div>
              </div>
              <div @click="sendMessageToVendor(order.vendor)" style="width: 28px; height: 28px;">
                <img src="/img/comment-dots.svg"/>
              </div>
            </div>
          </div>


          <hr style="margin-top: 5px;">
          <div v-for="lineItem in order.lineItems" class="checkout__row checkout__product-info-row" style="display: initial; position: relative; padding: 0px;">
            <div class="checkout__product-info" style="padding: 7px 0px;">
              <div style="display: flex; padding-right: 0px; align-items: center;">
                <img v-if="lineItem.product && lineItem.product.uploads.length" :src="$cloudinary256x256 + lineItem.product.uploads[0].filename" class="checkout__image" style="border-radius: 10px; margin-right: 0px;"/>
                <img v-else src="/img/no-preview.png" class="checkout__image" style="border-radius: 10px; margin-right: 0px;"/>
                <span class="counter-badge" style="top: 3px;left: 54px;">{{ lineItem.quantity }}</span>
                <div style="margin-left: 15px;">
                  <h5 class="checkout__name" style="font-weight: 500; font-size: 14px; margin: 0px;"> {{ lineItem.title }} </h5>
                  <div v-if="lineItem.variant" class="checkout__attr" style="font-weight: 500; font-size: 13px;color: #525c66;">{{ lineItem.variant.title }}</div>
                </div>
              </div>
              <div>
                <span class="css-4ioo3c" style="color: #272c30; background-color: transparent; font-weight: 400; padding: 5px;">
                  {{ $formatPrice(lineItem.total) }}€
                </span>
              </div>
            </div>
          </div>

          <hr class="css-ss6lby" style="margin-bottom: 5px; margin-top: 5px;"/>

          <div class="css-18mhetb">
            <div class="css-ikzlcq" style="gap: 8px;">
              <div class="css-9jay18">
                <p v-if="type == 'sale'" class="css-11r9ii4" style="color: black; font-weight: 600; font-size: 14px;">Revenu brut</p>
                <p v-else class="css-11r9ii4" style="color: black; font-weight: 600; font-size: 14px;">Sous-total</p>
                <h6 class="css-yemnbq" style="color: black; font-size: 14px;">{{ $formatPrice(order.subTotal) }}€</h6>
              </div>
              <div v-if="order.promotionAmount" class="css-9jay18">
                <p class="css-11r9ii4" style="font-weight: 400; color: #18cea0;">Code promo</p>
                <h6 class="css-yemnbq" style="color: #18cea0; font-weight: 400">-{{ $formatPrice(order.promotionAmount) }}€</h6>
              </div>
              <div v-if="type == 'sale'" class="css-9jay18">
                <p class="css-11r9ii4" style="font-weight: 400; color: #999;">Commission SwipeLive</p>
                <h6 class="css-yemnbq" style="color: #999; font-weight: 400">-{{ $formatPrice(order.fees) }}€</h6>
              </div>
              <div v-else class="css-9jay18">
                <p class="css-11r9ii4" style="font-weight: 400; color: #999;">Livraison</p>
                <h6 class="css-yemnbq" style="color: #999; font-weight: 400">+{{ $formatPrice(order.shippingPrice) }}€</h6>
              </div>
              <hr class="css-ss6lby" style="margin-bottom: 5px; margin-top: 5px; border-style: dashed;" />
              <div class="css-9jay18">
                <h6 v-if="type == 'sale'" class="css-k9tjo5" style="color: #18cea0; font-weight: 600; margin-bottom: 0px; font-size: 14px;">Revenu net</h6>
                <h6 v-else class="css-k9tjo5" style="color: black; font-weight: 600; margin-bottom: 0px; font-size: 14px;">Total</h6>
                <div class="css-s2uf1z" style="margin-bottom: 0px;">
                  <h6 v-if="type == 'sale'" class="css-kdhaao" style="font-weight: 600; color: #18cea0; font-size: 14px;">{{ $formatPrice(remaining) }}€</h6>
                  <h6 v-else class="css-kdhaao" style="font-weight: 600; color: black; font-size: 14px;">{{ $formatPrice(order.total) }}€</h6>
                </div>
              </div>
            </div>
          </div>


          <div v-if="type == 'sale'" style="margin-top: 10px;">
            <div v-if="order.pdf && order.trackingNumber && order.shippingStatus == 'open'" @click="showLabel()" class="btn-swipe" style="color: white; text-align: center; width: 100%; background: #ff2f80; margin-left: 12px; padding: 13px 24px; border: 1px solid #ff2f80; border-radius: 8px; font-size: 16px; font-weight: 500; height: 52px; margin: 0px auto 20px;"> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: white; margin-right: 7px; margin-bottom: 2px;">
                <path d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z"/>
              </svg> Imprimer le bon de livraison
            </div>
            <div v-else-if="loadingPdf" class="btn-swipe" style="color: white; text-align: center; width: 100%; background: #ff2f80; margin-left: 12px; padding: 13px 24px; border: 1px solid #ff2f80; border-radius: 8px; font-size: 16px; font-weight: 500; height: 52px; margin: 0px auto 20px;"> 
              <span>
                <svg viewBox="25 25 50 50" class="loading">
                  <circle style="stroke: white;" cx="50" cy="50" r="20"></circle>
                </svg>
              </span>
            </div>
            <div v-else-if="order.shippingStatus == 'ready-to-send'" @click="generateLabel()" class="btn-swipe" style="color: white; text-align: center; width: 100%; background: #ff2f80; margin-left: 12px; padding: 13px 24px; border: 1px solid #ff2f80; border-radius: 8px; font-size: 16px; font-weight: 500; height: 52px; margin: 0px auto 20px;"> 
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: white; margin-right: 7px; margin-bottom: 2px;">
                <path d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z"/>
              </svg> Générer le bon de livraison
            </div>
          </div>
          
        </div>

        <hr v-if="type == 'sale' && order.shippingStatus != 'ready-to-send'">

        <div class="css-1h7d8f3" style="margin-top: 15px;border-radius: 15px;margin-bottom: 20px;margin: 5px;">
          <div v-if="type == 'sale' && order.shippingStatus == 'open'" class="css-6f545k" style="margin: 10px auto 10px;text-align: center;color: #ff2f80;font-weight: 600;font-size: 17px;">
            <img src="/img/location.svg" style="width: 20px; height: 20px; margin-right: 4px;"/> Livraison estimée : 
            <span v-if="order.expectedDelivery">{{ $formatDate3(order.expectedDelivery) }}</span>
            <span v-else>-</span>
          </div>
          <div v-if="type == 'sale' && order.shippingStatus != 'ready-to-send'" class="css-6f545k" style="margin: 20px auto; font-size: 15px; line-height: 28px; font-weight: 500;">
            <img src="/img/truck.svg" style="width: 20px; height: 20px; margin-right: 4px;"/> Transporteur : {{ order.shippingServiceName }} <br> 
            <img v-if="order.trackingNumber" src="/img/map-marker.svg" style="width: 20px; height: 20px; margin-right: 4px;"/> Numéro de suivi : 
            <span v-if="order.trackingNumber" @click="showTrackingWebsite()" style="color: #007bff; text-decoration: underline;">{{ order.trackingNumber }}</span>
            <span v-else>-</span>
          </div>

          <hr v-if="type == 'sale' && order.shippingStatus != 'ready-to-send'">
          
          <div class="css-18mhetb">
            <ul v-if="order.orderStatuses.length" class="css-1oa1nt">
              <li v-for="status in order.orderStatuses" class="css-1rcbby2">
                <div class="css-11tgw8h">
                  <span class="css-1f06y3u"></span>
                  <span class="css-fz3k0c" style="background-color: #18cea0;"></span>
                </div>
                <div class="css-hg5jyh">
                  <h6 class="css-yemnbq">{{ status.description }}</h6>
                  <span class="css-6f545k">{{ status.date }}</span>
                </div>
              </li>
            </ul>
            <ul v-else class="css-1oa1nt">
              <li class="css-1rcbby2">
                <div class="css-11tgw8h">
                  <span class="css-1f06y3u"></span>
                  <span class="css-fz3k0c" style="background-color: #18cea0;"></span>
                </div>
                <div class="css-hg5jyh">
                  <h6 class="css-yemnbq" style="font-weight: 500; font-size: 15px;">En préparation</h6>
                  <span class="css-6f545k">{{ $formatDate3(order.createdAt) }}</span>
                </div>
              </li>
              <li class="css-1rcbby2">
                <div class="css-11tgw8h">
                  <span class="css-1f06y3u" style="background: rgba(145,158,171,.24);"></span>
                  <span class="css-fz3k0c"></span>
                </div>
                <div class="css-hg5jyh">
                  <h6 class="css-yemnbq" style="font-weight: 500; font-size: 15px;">Pris en charge par <span style="text-transform: capitalize;">{{ order.shippingServiceName }}</span></h6>
                </div>
              </li>
              <li class="css-1rcbby2">
                <div class="css-11tgw8h">
                  <span class="css-1f06y3u" style="background: rgba(145,158,171,.24);"></span>
                  <span class="css-fz3k0c"></span>
                </div>
                <div class="css-hg5jyh">
                  <h6 class="css-yemnbq" style="font-weight: 500; font-size: 15px;">En cours de livraison</h6>
                </div>
              </li>
              <li v-if="order.dropoffName" class="css-1rcbby2">
                <div class="css-11tgw8h">
                  <span class="css-1f06y3u" style="background: rgba(145,158,171,.24);"></span>
                  <span class="css-fz3k0c"></span>
                </div>
                <div class="css-hg5jyh">
                  <h6 class="css-yemnbq" style="font-weight: 500; font-size: 15px;">Disponible au point relais</h6>
                </div>
              </li>
              <li class="css-1rcbby2">
                <div class="css-11tgw8h">
                  <span class="css-1f06y3u" style="background: rgba(145,158,171,.24);"></span>
                </div>
                <div class="css-hg5jyh">
                  <h6 class="css-yemnbq" style="font-weight: 500; font-size: 15px;">Livré</h6>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>


    <!-- confirmation order popup -->
    <div v-if="popupConfirmation" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 100%; top: 62%; width: 100vw; border: 1px solid #ddd !important; padding: 0px 15px 15px; left: 0px; border-top-left-radius: 20px; border-top-right-radius: 20px;">
      <div style="display: flex;">
        <div id="scroll-indicator" style="height: 5px;width: 60px;background: rgba(0,0,0,0.2);border-radius: 4.5px;margin: 15px auto;">
        </div>
      </div>

      <div style="margin-top: 10px;">
        <div>
          <div style="margin: 0px;">
            <div style="text-align: center; margin-bottom: 30px; font-weight: 600; color: rgb(51, 51, 51);">
              <span style="text-align: center; font-size: 17px; padding-bottom: 5px; margin: 0px auto; color: rgb(51, 51, 51);">Es-tu satisfait(e) de ta commande ?</span>
            </div>
            <div style="font-weight: 400; margin-bottom: 30px; font-size: 14px; padding: 0px 10px;">
              Si ta commande correspond à la description, clique sur le bouton "Tout est correct" ou cette commande sera cloturé automatiquement dans 48 heures.
            </div>
            <div @click="closeOrder()" class="btn-swipe"style="color: white; text-align: center; background: #ff2f80; padding: 12px 24px; border: 1px solid #ff2f80; border-radius: 8px;font-size: 14px;font-weight: 500;margin-top: 10px;height: 48px;justify-content: center;">Tout est correct</div>
            <div class="btn-swipe" style="color: rgb(82, 92, 102);text-align: center;width: 100%;background: white;padding: 10px 24px;border-radius: 8px;font-size: 14px;font-weight: 500;margin-top: 5px;height: 44px;margin-bottom: 18px;justify-content: center;">Signaler un problème
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped src="../assets/css/listorders.css"></style>

<script>
import { useMainStore } from '../stores/useMainStore.js';
import LottieJSON from '../assets/lottie/order.json';

export default {
  name: 'ListOrders',
  data() {
    const mainStore = useMainStore();

    return {
      orderId: this.$route.params.orderId,
      user: mainStore.getUser,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      cloudinary: 'https://res.cloudinary.com/dxlsenc2r/image/upload/',
      LottieJSON: LottieJSON,
      popupConfirmation: false,
      popupOrder: false,
      loadingPurchases: true,
      loadingOrders: true,
      sales: [],
      purchases: [],
      searchTerm: "",
      shippingStatus: "ready-to-send",
      isOrder: false,
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      loadingPdf: false,
      order: null,
      type: null,
      remaining: null,
    };
  },
  created() {
    const isOrderParam = this.$route.params.isOrder;
    this.isOrder = isOrderParam === 'true';
    
    if (this.isOrder) {
      this.loadOrders();
    } else {
      this.loadPurchases();
    }
  },
  computed: {
    filteredSales() {
      const search = this.searchTerm.toLowerCase();
      return this.sales.filter((sale) => {
        const matchesSearch = sale.buyer.firstname.toLowerCase().includes(search) || sale.buyer.lastname.toLowerCase().includes(search) || sale.number.toString().includes(search);
        const matchesStatus = sale.shippingStatus === this.shippingStatus;
        return this.searchTerm ? matchesSearch : matchesStatus;
      });
    },
  },
  methods: {
    nbProducts(lineItems) {
      return lineItems.reduce((count, lineItem) => count + lineItem.quantity, 0);
    },
    async loadOrders() {
      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/orders`,
          headers: { Authorization: `Bearer ${this.token}` },
        });

        this.sales = response.data;
        this.loadingOrders = false;

        if (this.orderId && this.sales.length > 0) {
          this.sales.forEach((order) => {
            if (this.orderId == order.id) {
              this.showOrder(order, 'sale');
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async loadPurchases() {
      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/purchases`,
          headers: { Authorization: `Bearer ${this.token}` },
        });

        this.purchases = response.data;
        this.loadingPurchases = false;
      } catch (error) {
        console.log(error);
      }
    },
    async generateLabel() {
      this.$Haptics.impact({ style: 'medium' });
      this.loadingPdf = true;

      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/shipping/create/${this.order.id}`,
          headers: { Authorization: `Bearer ${this.token}` },
        });

        this.order = response.data;
        this.loadingPdf = false;
      } catch (error) {
        console.log(error);
        this.loadingPdf = false;
      }
    },
    async closeOrder() {
      this.popupConfirmation = false;

      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/orders/${this.order.id}/closed`,
          headers: { Authorization: `Bearer ${this.token}` },
        });

        this.order = response.data;
        this.hideOrder();
      } catch (error) {
        console.log(error);
      }
    },
    showOrder(order, type) {
      this.$Haptics.impact({ style: 'medium' });
      this.popupOrder = true;
      this.order = order;
      this.type = type;
      this.remaining = (parseFloat(this.order.subTotal) - parseFloat(this.order.promotionAmount || 0) - parseFloat(this.order.fees)).toFixed(2);
    },
    hideOrder() {
      this.popupOrder = false;
      this.order = null;
      this.remaining = null;
      this.type = null;
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
    showLabel() {
      const url = `${this.cloudinary}${this.order.pdf}`;
      this.openUrl(url);
    },
    showTrackingWebsite() {
      let url;
      if (this.order.trackingNumber) {
        if (this.order.shippingCarrierId === "32b1463a-a275-46d3-b9fd-ee17a1e8ab33") {
          url = `http://www.colissimo.fr/portail_colissimo/suivre.do?colispart=${this.order.trackingNumber}`;
        } else if (this.order.shippingCarrierId === "b139ac1f-bbb9-4235-b87e-aedcb3c32132") {
          url = `http://www.mondialrelay.com/public/permanent/tracking.aspx?ens=MRUPELAM74&exp=${this.order.trackingNumber}83514155&language=FR`;
        }
        this.openUrl(url);
      }
    },
    async openUrl(url) {
      try {
        this.$Haptics.impact({ style: 'medium' });
        await this.$Browser.open({ url });
      } catch (error) {
        console.error('Erreur lors de l\'ouverture de l\'URL :', error);
      }
    },
    showPopupConfirmation() {
      this.popupConfirmation = true;
    },
    sendMessageToBuyer(buyer) {
      this.$Haptics.impact({ style: 'medium' });
      this.$router.push({ name: 'ListMessages', params: { userId: buyer.id, picture: buyer.picture, firstname: buyer.firstname, lastname: buyer.lastname } });
    },
    sendMessageToVendor(vendor) {
      this.$Haptics.impact({ style: 'medium' });
      this.$router.push({ name: 'ListMessages', params: { userId: vendor.user.id, picture: vendor.user.picture, pseudo: vendor.pseudo } });
    },
    async cancelOrder() {
      const orderId = this.order.id;

      this.sales = this.sales.map((sale) =>
        sale.id === orderId ? { ...sale, shippingStatus: "cancelled" } : sale
      );
      this.purchases = this.purchases.map((purchase) =>
        purchase.id === orderId ? { ...purchase, shippingStatus: "cancelled" } : purchase
      );

      this.hideOrder();

      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/orders/${orderId}/cancel`,
          headers: { Authorization: `Bearer ${this.token}` },
        });

        await this.$Toast.show({
          text: "La commande a été annulée",
          duration: 'long',
          position: 'top',
        });
      } catch (error) {
        await this.$Toast.show({
          text: error.message || "Une erreur est survenue",
          duration: 'long',
          position: 'top',
        });
      }
    },
    async actionSheet() {
      const options = this.order.shippingStatus === 'ready-to-send'
        ? [
            { title: 'Signaler un problème', style: 'default' },
            { title: 'Annuler la commande', style: 'destructive' },
            { title: 'Retour', style: 'cancel' },
          ]
        : [
            { title: 'Signaler un problème', style: 'default' },
            { title: 'Retour', style: 'cancel' },
          ];

      try {
        const result = await this.$ActionSheet.showActions({
          title: 'Options de commande',
          options,
        });

        if (result.index === 0) {
          await this.$Toast.show({
            text: "La commande a été signalée !",
            duration: 'long',
            position: 'top',
          });
        } else if (result.index === 1 && this.order.shippingStatus === 'ready-to-send') {
          this.cancelOrder();
        }
      } catch (error) {
        console.log(error);
      }
    },
    showNumber1() {
      this.$Haptics.impact({ style: 'medium' });
      this.shippingStatus = "ready-to-send";
      this.show1 = true;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
    },
    showNumber2() {
      this.$Haptics.impact({ style: 'medium' });
      this.shippingStatus = "open";
      this.show1 = false;
      this.show2 = true;
      this.show3 = false;
      this.show4 = false;
    },
    showNumber3() {
      this.$Haptics.impact({ style: 'medium' });
      this.shippingStatus = "litige";
      this.show1 = false;
      this.show2 = false;
      this.show3 = true;
      this.show4 = false;
    }, 
    showNumber4() {
      this.$Haptics.impact({ style: 'medium' });
      this.shippingStatus = "cancelled";
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = true;
    }, 
  }
};

</script>

