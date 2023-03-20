<template>
  <main class="products" style="padding: 0px 15px 15px;">
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
        <div v-if="user.vendor">
          <div class="chat--left--head--input">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="css-1q8h0dm iconify iconify--eva">
              <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
            </svg>
            <input ref="search" type="text" v-model="searchTerm" placeholder="Rechercher" style="height: 1.75em"/>
          </div>
        </div>

        <div v-if="user.vendor" class="images_sec" style="padding: 20px 5px 15px; display: flex; flex-wrap: nowrap; overflow-x: auto; width: auto; padding: 15px 0;">
          <div class="images_filter" style="width: calc(100vw - 30px)">
            <ul>
              <li @click="showNumber1()" v-bind:class="{active: show1}" :style="[show1 ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]" style="font-weight: 600;">Nouvelle</li>
              <li @click="showNumber2()" v-bind:class="{active: show2}" :style="[show2 ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">En cours</li>
              <li @click="showNumber3()" v-bind:class="{active: show3}" :style="[show3 ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">Litige</li>
              <li @click="showNumber4()" v-bind:class="{active: show4}"  :style="[show4 ? {'color': '#ff2a80', 'font-weight': '600'} : {'color': '#aaaaaa', 'font-weight': '500'}]">Terminée</li>
            </ul>
          </div>
        </div>


        <div class="top-author">
        	<div v-if="show1">
            <div v-if="sales && sales.length > 0" class="top-author--container">
          		<div v-for="order in filteredSales" @click="showOrder(order, 'sale')" class="top-author--item" style="position: relative">
          			<img v-if="order.lineItems[0].product && order.lineItems[0].product.uploads.length" :src="cloudinary256x256 + order.lineItems[0].product.uploads[0].filename" style=" background: #eeeeee"/>
                <img v-else :src="require(`@/assets/img/no-preview.png`)"/>
                <span class="counter-badge" style="top: 4px;left: 62px;">{{ nbProducts(order.lineItems) }}</span>
          			<div>
          				<div><span>#{{ order.number }}</span></div>
          				<span>{{ order.buyer.firstname }} {{ order.buyer.lastname }}</span>
                  <div><span style="font-size: 11px; color: #999;">{{ order.createdAt | formatDate }}</span></div>
          			</div>
                <span class="css-4ioo3c">{{ order.subTotal | formatPrice }}€</span>
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
                  <Lottie :options="defaultOptions" :width="200"/>
                </div>
              </div>
              <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucune commande</h5>
              <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos commandes apparaîtront ici.</div>
            </div>
          </div>
          
          <div v-if="show2">
            <div>
              <div class="container" style="margin: 120px auto 0px; text-align: center;">
                <div style="margin: 0px auto;">
                  <Lottie :options="defaultOptions" :width="200"/>
                </div>
              </div>
              <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucune commande en cours</h5>
              <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos commandes apparaîtront ici.</div>
            </div>
          </div>
          <div v-if="show3">
            <div>
              <div class="container" style="margin: 120px auto 0px; text-align: center;">
                <div style="margin: 0px auto;">
                  <Lottie :options="defaultOptions" :width="200"/>
                </div>
              </div>
              <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun litige</h5>
              <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos commandes apparaîtront ici.</div>
            </div>
          </div>
          <div v-if="show4">
            <div>
              <div class="container" style="margin: 120px auto 0px; text-align: center;">
                <div style="margin: 0px auto;">
                  <Lottie :options="defaultOptions" :width="200"/>
                </div>
              </div>
              <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucune commande terminée</h5>
              <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos commandes apparaîtront ici.</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="top-author">
          <div>
            <div v-if="purchases && purchases.length > 0" class="top-author--container">
              <div v-for="order in purchases" @click="showOrder(order, 'purchase')" class="top-author--item" style="position: relative">
                <img v-if="order.lineItems[0].product && order.lineItems[0].product.uploads.length" :src="cloudinary256x256 + order.lineItems[0].product.uploads[0].filename" style=" background: #eeeeee"/>
                <img v-else :src="require(`@/assets/img/no-preview.png`)"/>
                <span class="counter-badge" style="top: 4px;left: 62px;">{{ nbProducts(order.lineItems) }}</span>
                <div>
                  <div><span>#{{ order.number }}</span></div>
                  <span>{{ order.vendor.businessName }}</span>
                  <div><span style="font-size: 11px; color: #999;">{{ order.createdAt | formatDate }}</span></div>
                </div>
                <span class="css-4ioo3c" style="color: #272c30;background-color: transparent;font-weight: 400;">{{ order.total | formatPrice }}€</span>
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
                  <Lottie :options="defaultOptions" :width="200"/>
                </div>
              </div>
              <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun achat</h5>
              <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos achats apparaîtront ici.</div>
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
        <div v-if="type == 'sale' && order.shippingStatus == 'ready-to-send'" style="margin-top: 10px;">
          <div v-if="order.pdf && order.trackingNumber" @click="showLabel()" class="btn-swipe" style="color: white; text-align: center; width: 100%; background: rgb(255, 39, 115); margin-left: 12px; padding: 13px 24px; border: 1px solid rgb(255, 39, 115); border-radius: 8px; font-size: 16px; font-weight: 500; height: 52px; margin: 0px auto 20px;"> 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: white; margin-right: 7px; margin-bottom: 2px;">
              <path d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z"/>
            </svg> Imprimer le bon de livraison
          </div>
          <div v-else @click="generateLabel()" class="btn-swipe" style="color: white; text-align: center; width: 100%; background: rgb(255, 39, 115); margin-left: 12px; padding: 13px 24px; border: 1px solid rgb(255, 39, 115); border-radius: 8px; font-size: 16px; font-weight: 500; height: 52px; margin: 0px auto 20px;"> 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: white; margin-right: 7px; margin-bottom: 2px;">
              <path d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z"/>
            </svg> Générer le bon de livraison
          </div>
        </div>

        <div class="css-13dslnb" style="box-shadow: 0 0 5px rgb(0 0 0 / 20%); margin: 5px; padding: 10px; border-radius: 15px; margin-bottom: 20px;">
          <div class="top-author--container">
            <div v-if="type == 'sale'" class="top-author--item" style="padding: 0px; box-shadow: none;">
              <img v-if="order.buyer.picture" :src="cloudinary256x256 + order.buyer.picture" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;"/>
              <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;"/>
              <div>
                <span>{{ order.buyer.firstname }} {{ order.buyer.lastname }}</span>
                <div><span>{{ order.createdAt | formatDate }}</span></div>
              </div>
              <div @click="goToMessage(order.buyer)" style="width: 28px; height: 28px;">
                <img :src="require(`@/assets/img/comment-dots.svg`)"/>
              </div>
            </div>
            <div v-else class="top-author--item" style="padding: 0px; box-shadow: none;">
              <img v-if="order.vendor.user.picture" :src="cloudinary256x256 + order.vendor.user.picture" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;"/>
              <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;"/>
              <div>
                <span>{{ order.vendor.businessName }}</span>
                <div><span>{{ order.createdAt | formatDate }}</span></div>
              </div>
              <div @click="goToMessage(order.vendor.user)" style="width: 28px; height: 28px;">
                <img :src="require(`@/assets/img/comment-dots.svg`)"/>
              </div>
            </div>
          </div>

          <hr style="margin-top: 5px;">
          <div v-for="lineItem in order.lineItems" class="checkout__row checkout__product-info-row" style="display: initial; position: relative; padding: 0px;">
            <div class="checkout__product-info" style="padding: 7px 0px;">
              <div style="display: flex; padding-right: 0px; align-items: center;">
                <img v-if="lineItem.product && lineItem.product.uploads.length" :src="cloudinary256x256 + lineItem.product.uploads[0].filename" class="checkout__image" style="border-radius: 10px; margin-right: 0px;"/>
                <img v-else :src="require(`@/assets/img/no-preview.png`)" class="checkout__image" style="border-radius: 10px; margin-right: 0px;"/>
                <span class="counter-badge" style="top: 3px;left: 54px;">{{ lineItem.quantity }}</span>
                <div style="margin-left: 15px;">
                  <h5 class="checkout__name" style="font-weight: 500; font-size: 14px; margin: 0px;"> {{ lineItem.title }} </h5>
                  <div v-if="lineItem.variant" class="checkout__attr" style="font-weight: 500; font-size: 13px;color: #525c66;">{{ lineItem.variant.title }}</div>
                </div>
              </div>
              <div>
                <span class="css-4ioo3c" style="color: #272c30;background-color: transparent;font-weight: 400; padding: 5px;">{{ lineItem.total | formatPrice }}€</span>
              </div>
            </div>
          </div>

          <hr class="css-ss6lby" style="margin-bottom: 5px; margin-top: 5px;"/>

          <div class=" css-18mhetb">
            <div class="css-ikzlcq" style="gap: 8px;">
              <div class="css-9jay18">
                <p v-if="type == 'sale'" class="css-11r9ii4" style="color: black; font-weight: 600; font-size: 14px;">Revenu brut</p>
                <p v-else class="css-11r9ii4" style="color: black; font-weight: 600; font-size: 14px;">Sous-total</p>
                <h6 class="css-yemnbq" style="color: black; font-size: 14px;">{{ order.subTotal | formatPrice }}€</h6>
              </div>
              <div v-if="type == 'sale'" class="css-9jay18">
                <p class="css-11r9ii4" style="font-weight: 400; color: #999;">Commission SwipeLive</p>
                <h6 class="css-yemnbq" style="color: #999; font-weight: 400">-{{ order.fees | formatPrice }}€</h6>
              </div>
              <div v-else class="css-9jay18">
                <p class="css-11r9ii4" style="font-weight: 400; color: #999;">Livraison</p>
                <h6 class="css-yemnbq" style="color: #999; font-weight: 400">+{{ order.shippingPrice | formatPrice }}€</h6>
              </div>
              <hr class="css-ss6lby" style="margin-bottom: 5px; margin-top: 5px; border-style: dashed;"/>
              <div class="css-9jay18">
                <h6 v-if="type == 'sale'" class="css-k9tjo5" style="color: rgb(34, 154, 22); font-weight: 600; margin-bottom: 0px; font-size: 14px;">Revenu net</h6>
                <h6 v-else class="css-k9tjo5" style="color: black; font-weight: 600; margin-bottom: 0px; font-size: 14px;">Total</h6>
                <div class="css-s2uf1z" style="margin-bottom: 0px;">
                  <h6 v-if="type == 'sale'" class="css-kdhaao" style="font-weight: 600; color: rgb(34, 154, 22); font-size: 14px;">{{ remaining | formatPrice }}€</h6>
                  <h6 v-else class="css-kdhaao" style="font-weight: 600; color: black; font-size: 14px;">{{ order.total | formatPrice }}€</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr v-if="type == 'sale' && order.shippingStatus != 'ready-to-send'">

        <div class="css-1h7d8f3" style="margin-top: 15px;border-radius: 15px;margin-bottom: 20px;margin: 5px;">
          <div v-if="type == 'sale' && order.shippingStatus != 'ready-to-send'" class="css-6f545k" style="margin: 10px auto 10px;text-align: center;color: #ff2a80;font-weight: 600;font-size: 17px;">
            <img :src="require(`@/assets/img/location.svg`)" style="width: 20px; height: 20px; margin-right: 4px;"/> Livraison prévu : 
            <span v-if="order.expectedDelivery && order.status == 'open'">{{ order.expectedDelivery }}</span>
            <span v-else>-</span>
          </div>
          <div v-if="type == 'sale' && order.shippingStatus != 'ready-to-send'" class="css-6f545k" style="margin: 20px auto; font-size: 15px; line-height: 28px; font-weight: 500;">
            <img :src="require(`@/assets/img/truck.svg`)" style="width: 20px; height: 20px; margin-right: 4px;"/> Transporteur : {{ order.shippingCarrier }} <br> 
            <img :src="require(`@/assets/img/map-marker.svg`)" style="width: 20px; height: 20px; margin-right: 4px;"/> Numéro de suivi : 
            <span v-if="order.trackingNumber" @click="openUrl(order.trackingUrl)" style="color: #007bff; text-decoration: underline;">{{ order.trackingNumber }}</span>
            <span v-else>-</span>
          </div>
          <hr v-if="type == 'sale' && order.shippingStatus == 'ready-to-send'">
          <div class="css-18mhetb">
            <ul class="css-1oa1nt">
              <li class="css-1rcbby2">
                <div class="css-11tgw8h">
                  <span class="css-1f06y3u"></span>
                  <span class="css-fz3k0c" style="background-color: #18cea0;"></span>
                </div>
                <div class="css-hg5jyh">
                  <h6 class="css-yemnbq" style="font-weight: 500; font-size: 15px;">En préparation</h6>
                  <span class="css-6f545k">{{ order.createdAt | formatDate }}</span>
                </div>
              </li>
              <li v-for="status in order.orderStatuses" class="css-1rcbby2" v-show="status.status != 'no-label' && status.status != 'announcing' && status.status != 'ready-to-send' && status.status != 'announced' && status.status != 'cancelling-upstream'">
                <div class="css-11tgw8h">
                  <span class="css-1f06y3u"></span>
                  <span v-if="status.status != 'delivered' && status.status != 'cancelled'" class="css-fz3k0c" style="background-color: #18cea0;"></span>
                </div>
                <div class="css-hg5jyh">
                  <h6 v-if="status.status == 'delivered'" class="css-yemnbq" style="font-weight: 500; font-size: 15px;">Livré</h6>
                  <h6 v-else-if="status.status == 'cancelled'" class="css-yemnbq" style="font-weight: 500; font-size: 15px;">Annulé</h6>
                  <h6 v-else class="css-yemnbq">{{ status.message }}</h6>
                  <span class="css-6f545k">{{ status.updateAt }}</span>
                </div>
              </li>
              <li v-if="filteredStatus('')" class="css-1rcbby2">
                <div class="css-11tgw8h">
                  <span class="css-1f06y3u" style="background: rgba(145,158,171,.24);"></span>
                  <span class="css-fz3k0c"></span>
                </div>
                <div class="css-hg5jyh">
                  <h6 class="css-yemnbq" style="font-weight: 500; font-size: 15px;">Pris en charge par <span style="text-transform: capitalize;">{{ order.shippingCarrier }}</span></h6>
                </div>
              </li>
              <li v-if="filteredStatus('')" class="css-1rcbby2">
                <div class="css-11tgw8h">
                  <span class="css-1f06y3u" style="background: rgba(145,158,171,.24);"></span>
                  <span class="css-fz3k0c"></span>
                </div>
                <div class="css-hg5jyh">
                  <h6 class="css-yemnbq" style="font-weight: 500; font-size: 15px;">En cours de livraison</h6>
                </div>
              </li>
              <li v-if="filteredStatus('') && order.servicePointId" class="css-1rcbby2">
                <div class="css-11tgw8h">
                  <span class="css-1f06y3u" style="background: rgba(145,158,171,.24);"></span>
                  <span class="css-fz3k0c"></span>
                </div>
                <div class="css-hg5jyh">
                  <h6 class="css-yemnbq" style="font-weight: 500; font-size: 15px;">Disponible au point relais</h6>
                </div>
              </li>
              <li v-if="filteredStatus('delivered')" class="css-1rcbby2">
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
    <div v-if="popupConfirmation" class="store-products-item__login-popup store-products-item__login-popup--active" style="overflow-y: scroll; height: 100%; top: 62%; width: 100vw; box-shadow: 0 0 5px rgb(0 0 0 / 20%); padding: 0px 15px 15px; left: 0px; border-top-left-radius: 20px; border-top-right-radius: 20px;">
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
            <div @click="closeOrder()" class="btn-swipe"style="color: white;text-align: center;background: rgb(255, 39, 115);padding: 12px 24px;border: 1px solid rgb(255, 39, 115);border-radius: 8px;font-size: 14px;font-weight: 500;margin-top: 10px;height: 48px;justify-content: center;">Tout est correct</div>
            <div @click="goToMessage()" class="btn-swipe" style="color: rgb(82, 92, 102);text-align: center;width: 100%;background: white;padding: 10px 24px;border-radius: 8px;font-size: 14px;font-weight: 500;margin-top: 5px;height: 44px;margin-bottom: 18px;justify-content: center;">Signaler un problème
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped src="../assets/css/listorders.css"></style>

<script>

import Lottie from 'vue-lottie';
import * as animationData from '../assets/lottie/order.json';

export default {
  name: 'ListOrders',
  components: {
    Lottie
  },
  data() {
    return {
      isOrder: this.$route.params.isOrder,
      user: this.$store.getters.getUser,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      defaultOptions: {animationData: animationData},
      popupConfirmation: false,
      popupOrder: false, 
      loadingPurchases: true, 
      loadingOrders: true, 
      popupOrder: false, 
      sales: [],
      purchases: [],
      searchTerm: "",
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      order: null,
      type: null,
      remaining: null,
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");

    this.loadOrders();
    this.loadPurchases();
  },
  filters: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleDateString(navigator.language) + " " + date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    }
  },
  computed: {
    filteredSales() {
      return this.sales.filter(sale => {
        const search = this.searchTerm.toLowerCase();
        return (sale.buyer.firstname.toLowerCase().includes(search) || sale.buyer.lastname.toLowerCase().includes(search) || sale.number.toString().toLowerCase().includes(search));
      });
    },
  },
  methods: {
    nbProducts(lineItems) {
      var count = 0;
      if (lineItems.length) {
        lineItems.map(lineItem => {
          count = count + lineItem.quantity;
        });
      }
      return count;
    },
    loadOrders() {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/orders", {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.sales = JSON.parse(response.data);
        this.loadingOrders = false;
      }, (response) => {
        console.log(response.error);
      });
    },
    loadPurchases() {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/purchases", {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.purchases = JSON.parse(response.data);
        this.loadingPurchases = false;
      }, (response) => {
        console.log(response.error);
      });
    },
    showOrder(order, type) {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.popupOrder = true;
      this.order = order;
      this.remaining = parseFloat(this.order.subTotal) - parseFloat(this.order.fees);
      this.remaining = this.remaining.toFixed(2);
      this.type = type;
    },
    hideOrder() {
      this.popupOrder = false;
      this.order = null;
      this.remaining = null;
      this.type = null;
    },
    goBack() {
      const options = {
        direction: 'right',
        duration: 300,
        iosdelay: 0,
        androiddelay: 0,
        winphonedelay: 0,
      };
      window.plugins.nativepagetransitions.slide(options);
      this.$router.push({ name: 'Account' });
    }, 
    showLabel() {
      var url = this.baseUrl + /uploads/ + this.order.pdf;
      window.SafariViewController.isAvailable((available) => {
        if (available) {
          window.SafariViewController.show({ url: url }, (result) => {
            console.log(result);
          }, (error) => {
            console.log("KO: " + error);
          })
        } else {
          window.cordova.InAppBrowser.open(url, '_system', 'location=no');
        }
      });
    },
    generateLabel() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/shipping/create/" + this.order.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.order = JSON.parse(response.data);
      }, (response) => {
        console.log(response.error);
      });
    },
    filteredStatus(status) {
      var isEqual = true;
      this.order.orderStatuses.filter((orderStatus) => { 
        console.log(status == orderStatus.status);
        if (status == orderStatus.status || "cancelling-upstream" == orderStatus.status || "cancelled" == orderStatus.status) {
          isEqual = false;
        }
      });
      return isEqual;
    },
    openUrl(url) {
      window.SafariViewController.isAvailable((available) => {
        if (available) {
          window.SafariViewController.show({ url: url }, (result) => {
            console.log(result);
          }, (error) => {
            console.log("KO: " + error);
          })
        } else {
          window.cordova.InAppBrowser.open(url, '_system', 'location=no');
        }
      });
    },
    closeOrder() {
      this.popupConfirmation = false;
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/order/" + this.order.id + "/closed", {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.hideOrder();
      }, (response) => {
        console.log(response.error);
      });
    },
    showPopupConfirmation() {
      this.popupConfirmation = true;
    },
    goToMessage(user) {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      if (user.vendor) {
        this.$router.push({ name: 'ListMessages', params: { userId: user.id, picture: user.picture, businessName: user.vendor.businessName } });
      } else {
        this.$router.push({ name: 'ListMessages' });
      } 
    },
    cancelOrder() {
      // window.cordova.plugin.http.get(this.baseUrl + "/user/api/order/" + this.order.id + "/cancel", {}, { Authorization: "Bearer " + this.token }, (response) => {
      //   this.hideOrder();
      // }, (response) => {
      //   console.log(response.error);
      // });
    },
    actionSheet() {
      // afficher annuler la commande que si commande n'est pas envoyé
      var options = {
        buttonLabels: ['Signaler un problème'],
        addCancelButtonWithLabel: 'Retour',
        addDestructiveButtonWithLabel : 'Annuler la commande',
        destructiveButtonLast: true,
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };

      window.plugins.actionsheet.show(options, (index) => {
        console.log(index);
        if (index == 1) {
          window.plugins.toast.show("La commande a été signalé !", 'long', 'top');
        } else if (index == 2) {
          this.cancelOrder();
        }
      }, (error) => {
        console.log(error);
      });
    },
    showNumber1() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.show1 = true;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
    }, 
    showNumber2() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.show1 = false;
      this.show2 = true;
      this.show3 = false;
      this.show4 = false;
    }, 
    showNumber3() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.show1 = false;
      this.show2 = false;
      this.show3 = true;
      this.show4 = false;
    }, 
    showNumber4() {
      if (window.TapticEngine) {
        TapticEngine.impact({ style: 'medium' });
      }
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = true;
    }, 
  }
};

</script>

