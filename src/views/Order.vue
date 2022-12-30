<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div v-if="order" class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Commande #{{ order.number }}</div>
      <div @click="actionSheet()" class="checkout__right-btn" style="right: 15px; position: absolute; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px;height: 20px;fill: #161823;border-radius: 30px;">
          <path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z"></path>
        </svg>
      </div>
    </div>

    <div v-if="order" class="checkout__body" style="margin-bottom: 40px;">
      <div v-if="user.id == order.vendor.user.id && order.shippingStatus == 'ready-to-send'">
      <div v-if="order.pdf && order.trackingNumber" @click="showLabel()" class="btn-swipe" style="color: white; text-align: center; width: 100%; background: rgb(255, 39, 115); margin-left: 12px; padding: 13px 24px; border: 1px solid rgb(255, 39, 115); border-radius: 8px; font-size: 16px; font-weight: 600; height: 43px; margin: 0px auto 15px;"> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: white; margin-right: 7px; margin-bottom: 2px;">
          <path d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z"/>
        </svg> Imprimer le bon de livraison
      </div>
      <div v-else @click="generateLabel()" class="btn-swipe" style="color: white; text-align: center; width: 100%; background: rgb(255, 39, 115); margin-left: 12px; padding: 13px 24px; border: 1px solid rgb(255, 39, 115); border-radius: 8px; font-size: 16px; font-weight: 600; height: 43px; margin: 0px auto 15px;"> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: white; margin-right: 7px; margin-bottom: 2px;">
          <path d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z"/>
        </svg> Générer le bon de livraison
      </div>
      </div>


      <div class="top-author">
        <div class="top-author--container" style="margin-bottom: 15px;">
          <div v-if="user.id == order.vendor.user.id" class="top-author--item">
            <img v-if="order.buyer.picture" :src="cloudinary256x256 + order.buyer.picture" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;"/>
            <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;"/>
            <div>
              <span>{{ order.buyer.firstname }} {{ order.buyer.lastname }}</span>
              <div><span>{{ order.createdAt }}</span></div>
            </div>
            <div @click="goToMessage()" style="color: rgb(0, 132, 255);background-color: rgba(45, 136, 255, 0.2);text-align: center;width: fit-content;margin: 0px auto;padding: 12px;border-radius: 40px;font-size: 13px;font-weight: 400;margin-right: 5px;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px;fill: rgb(0, 132, 255);height: 20px;">
                <path d="M128 216c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 384c-28.3 0-56.3-4.3-83.2-12.8l-15.2-4.8-13 9.2c-23 16.3-58.5 35.3-102.6 39.6 12-15.1 29.8-40.4 40.8-69.6l7.1-18.7-13.7-14.6C47.3 313.7 32 277.6 32 240c0-97 100.5-176 224-176s224 79 224 176-100.5 176-224 176z"></path>
              </svg>
            </div>
          </div>
          <div v-else class="top-author--item">
            <img v-if="order.vendor.user.picture" :src="cloudinary256x256 + order.vendor.user.picture" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;"/>
            <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;"/>
            <div>
              <span>{{ order.vendor.businessName }}</span>
              <div><span>{{ order.createdAt }}</span></div>
            </div>
            <div @click="goToMessage()" style="color: rgb(0, 132, 255);background-color: rgba(45, 136, 255, 0.2);text-align: center;width: fit-content;margin: 0px auto;padding: 12px;border-radius: 40px;font-size: 13px;font-weight: 400;margin-right: 5px;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px;fill: rgb(0, 132, 255);height: 20px;">
                <path d="M128 216c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 384c-28.3 0-56.3-4.3-83.2-12.8l-15.2-4.8-13 9.2c-23 16.3-58.5 35.3-102.6 39.6 12-15.1 29.8-40.4 40.8-69.6l7.1-18.7-13.7-14.6C47.3 313.7 32 277.6 32 240c0-97 100.5-176 224-176s224 79 224 176-100.5 176-224 176z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="css-13dslnb" style="box-shadow: 0 0 5px rgb(0 0 0 / 20%); margin: 5px; padding: 10px; border-radius: 15px; margin-bottom: 20px;">
        <div v-for="lineItem in order.lineItems" class="checkout__row checkout__product-info-row" style="align-items: center; padding: 0.5rem 0;">
          <div class="checkout__product-info" style="padding-right: 0px;">
            <img v-if="lineItem.product.uploads" :src="cloudinary256x256 + lineItem.product.uploads[0].filename" class="checkout__image" style="border-radius: 10px;"/>
            <img v-else :src="require(`@/assets/img/no-preview.jpg`)" class="checkout__image" style="border-radius: 10px;"/>
            <span class="counter-badge" style="top: 12px;left: 62px;">{{ lineItem.quantity }}</span>
            <div>
              <h5 class="checkout__name" style="font-weight: 500; font-size: 14px;"> {{ lineItem.product.title }} </h5>
              <div v-if="lineItem.variant" class="checkout__attr" style="font-weight: 500; font-size: 13px;color: #525c66;">{{ lineItem.variant.title }}</div>
            </div>
          </div>
        </div>

        <hr class="css-ss6lby" style="margin-bottom: 5px; margin-top: 5px;"/>

        <div class=" css-18mhetb">
          <div class="css-ikzlcq" style="gap: 8px;">
            <div class="css-9jay18">
              <p v-if="user.id == order.vendor.user.id" class="css-11r9ii4" style="color: black; font-weight: 600; font-size: 14px;">Revenu brut</p>
              <p v-else class="css-11r9ii4" style="color: black; font-weight: 600; font-size: 14px;">Sous-total</p>
              <h6 class="css-yemnbq" style="color: black; font-size: 14px;">{{ order.subTotal | formatPrice }}€</h6>
            </div>
            <div v-if="user.id == order.vendor.user.id" class="css-9jay18">
              <p class="css-11r9ii4" style="font-weight: 400; color: #999;">Commission SwipeLive</p>
              <h6 class="css-yemnbq" style="color: #999; font-weight: 400">-{{ order.fees | formatPrice }}€</h6>
            </div>
            <div v-else class="css-9jay18">
              <p class="css-11r9ii4" style="font-weight: 400; color: #999;">Livraison</p>
              <h6 class="css-yemnbq" style="color: #999; font-weight: 400">+{{ order.shippingPrice | formatPrice }}€</h6>
            </div>
            <hr class="css-ss6lby" style="margin-bottom: 5px; margin-top: 5px; border-style: dashed;"/>
            <div class="css-9jay18">
              <h6 v-if="user.id == order.vendor.user.id" class="css-k9tjo5" style="color: rgb(34, 154, 22); font-weight: 600; margin-bottom: 0px; font-size: 14px;">Revenu net</h6>
              <h6 v-else class="css-k9tjo5" style="color: black; font-weight: 600; margin-bottom: 0px; font-size: 14px;">Total</h6>
              <div class="css-s2uf1z" style="margin-bottom: 0px;">
              	<h6 v-if="user.id == order.vendor.user.id" class="css-kdhaao" style="font-weight: 600; color: rgb(34, 154, 22); font-size: 14px;">{{ remaining | formatPrice }}€</h6>
              	<h6 v-else class="css-kdhaao" style="font-weight: 600; color: black; font-size: 14px;">{{ order.total | formatPrice }}€</h6>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="css-1h7d8f3" style="box-shadow: rgb(0 0 0 / 20%) 0px 0px 5px;padding: 5px 10px;margin-top: 15px;border-radius: 15px;margin-bottom: 20px;margin: 5px;">
        <div class="css-6f545k" style="margin: 10px auto 10px;text-align: center;color: #ff2773;font-weight: 600;font-size: 16px;">Livraison prévu : 
          <span v-if="order.expectedDelivery && order.status == 'open'">{{ order.expectedDelivery }}</span>
          <span v-else>-</span>
        </div>
        <div class="css-6f545k" style="margin: 20px auto; text-align: center; font-weight: 400; font-size: 14px; ">
          Transporteur : {{ order.shippingCarrier }} <br> 
          Numéro de suivi : 
          <span v-if="order.trackingNumber" @click="openUrl(order.trackingUrl)" style="color: #007bff; text-decoration: underline;">{{ order.trackingNumber }}</span>
          <span v-else>-</span>
        </div>
        <hr>
        <div class="css-18mhetb">
          <ul class="css-1oa1nt">
            <li class="css-1rcbby2">
              <div class="css-11tgw8h">
                <span class="css-1f06y3u"></span>
                <span class="css-fz3k0c" style="background-color: #18cea0;"></span>
              </div>
              <div class="css-hg5jyh">
                <h6 class="css-yemnbq" style="font-weight: 500;">En préparation</h6>
                <span class="css-6f545k">{{ order.createdAt }}</span>
              </div>
            </li>
            <li v-for="status in order.orderStatuses" class="css-1rcbby2" v-show="status.status != 'no-label' && status.status != 'announcing' && status.status != 'ready-to-send' && status.status != 'announced' && status.status != 'cancelling-upstream'">
              <div class="css-11tgw8h">
                <span class="css-1f06y3u"></span>
                <span v-if="status.status != 'delivered' && status.status != 'cancelled'" class="css-fz3k0c" style="background-color: #18cea0;"></span>
              </div>
              <div class="css-hg5jyh">
                <h6 v-if="status.status == 'delivered'" class="css-yemnbq" style="font-weight: 500;">Livré</h6>
                <h6 v-else-if="status.status == 'cancelled'" class="css-yemnbq" style="font-weight: 500;">Annulé</h6>
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
                <h6 class="css-yemnbq" style="font-weight: 500;">Pris en charge par <span style="text-transform: capitalize;">{{ order.shippingCarrier }}</span></h6>
              </div>
            </li>
            <li v-if="filteredStatus('')" class="css-1rcbby2">
              <div class="css-11tgw8h">
                <span class="css-1f06y3u" style="background: rgba(145,158,171,.24);"></span>
                <span class="css-fz3k0c"></span>
              </div>
              <div class="css-hg5jyh">
                <h6 class="css-yemnbq" style="font-weight: 500;">En cours de livraison</h6>
              </div>
            </li>
            <li v-if="filteredStatus('') && order.servicePointId" class="css-1rcbby2">
              <div class="css-11tgw8h">
                <span class="css-1f06y3u" style="background: rgba(145,158,171,.24);"></span>
                <span class="css-fz3k0c"></span>
              </div>
              <div class="css-hg5jyh">
                <h6 class="css-yemnbq" style="font-weight: 500;">Disponible au point relais</h6>
              </div>
            </li>
            <li v-if="filteredStatus('delivered')" class="css-1rcbby2">
              <div class="css-11tgw8h">
                <span class="css-1f06y3u" style="background: rgba(145,158,171,.24);"></span>
              </div>
              <div class="css-hg5jyh">
                <h6 class="css-yemnbq" style="font-weight: 500;">Livré</h6>
              </div>
            </li>
          </ul>
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


<style scoped src="../assets/css/order.css"></style>

<script>

export default {
  name: 'Order',
  data() {
    return {
      order: null,
      remaining: null,
      popupConfirmation: false,
      id: this.$route.params.id,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
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

    // move to component

    window.cordova.plugin.http.get(this.baseUrl + "/user/api/orders/" + this.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
      this.order = JSON.parse(response.data);
      this.remaining = parseFloat(this.order.subTotal) - parseFloat(this.order.fees);
      this.remaining = this.remaining.toFixed(2);
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    actionSheet() {
      // mettre en rouge annuler la commande
      var options = {
        buttonLabels: ['Annuler la commande', 'Signaler un problème'],
        addCancelButtonWithLabel: 'Retour',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };

      window.plugins.actionsheet.show(options, (index) => {
        console.log(index);
        if (index == 1) {
        	// send message
          this.$router.push({ name: 'ListMessages' });
        } else if (index == 2) {
          this.$router.push({ name: 'ListMessages' });
        }
      }, (error) => {
        console.log(error);
      });
  	},
    goBack() {
      this.$router.push({ name: 'ListOrders' });
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
	    window.cordova.plugin.http.get(this.baseUrl + "/user/api/shipping/create/" + this.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.order = JSON.parse(response.data);
        this.remaining = parseFloat(this.order.subTotal) - parseFloat(this.order.fees);
        this.remaining = this.remaining.toFixed(2);
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
        this.order = JSON.parse(response.data);
      }, (response) => {
        console.log(response.error);
      });
    },
    showPopupConfirmation() {
      this.popupConfirmation = true;
    },
    goToMessage() {
      this.$router.push({ name: 'ListMessages' });
    },
  }
};

</script>

