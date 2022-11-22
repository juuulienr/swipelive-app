<template>
  <main class="products">
    <div class="checkout">
      <div class="checkout__header" style="padding: 15px;">
        <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 8px; padding: 0.5rem 0px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: #161823;">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
        </div>
        <div class="checkout__title" v-if="order" style="font-weight: 600; margin-bottom: 0px; color: #161823; font-size: 17px;">Commande N°{{ order.number }}</div>
        <div @click="actionSheet()" class="checkout__right-btn" style="position: absolute; right: 15px; top: 8px; padding: 0.5rem 0px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px;height: 20px;fill: #161823;border-radius: 30px;">
            <path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z"></path>
          </svg>
        </div>
      </div>

      <div v-if="order" class="checkout__body">
        <div class="top-author">
          <div class="top-author--container" style="margin-bottom: 15px;">
            <div v-if="user.id == order.buyer.id" class="top-author--item" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 10px; border-radius: 13px;">
              <img v-if="order.vendor.user.picture" :src="baseUrl + '/uploads/' + order.vendor.user.picture" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;" />
              <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;" />
              <div>
                <div><span>{{ order.createdAt }}</span></div>
                <span>{{ order.vendor.businessName }}</span>
              </div>
            </div>
            <div v-if="user.id == order.vendor.id" class="top-author--item" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 10px; border-radius: 13px;">
              <img v-if="order.buyer.picture" :src="baseUrl + '/uploads/' + order.buyer.picture" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;" />
              <img v-else :src="require(`@/assets/img/anonyme.jpg`)" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 30px;" />
              <div>
                <div><span>{{ order.createdAt }}</span></div>
                <span>{{ order.buyer.firstname }} {{ order.buyer.lastname }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="css-13dslnb" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 5px 10px; border-radius: 15px;">
          <div v-for="lineItem in order.lineItems" class="checkout__row checkout__product-info-row" style="align-items: center;">
            <div class="checkout__product-info" style="padding-right: 0px;">
              <img v-if="lineItem.product.uploads" :src="baseUrl + '/uploads/' + lineItem.product.uploads[0].filename" class="checkout__image" style="border-radius: 8px;" />
              <div style="padding-right: 30px;">
                <h5 class="checkout__name" style="margin-bottom: 5px; font-weight: 600; font-size: 14px; margin-right: 10px;"> {{ lineItem.product.title }} </h5>
                <div class="checkout__attr" v-if="lineItem.variant"><span> {{ lineItem.variant.title }} </span></div>
              </div>
            </div>
            <div class="product--quantity--detail">x{{ lineItem.quantity }}</div>
          </div>

          <hr class="css-ss6lby" style="margin-bottom: 5px; margin-top: 5px;" />

          <div class=" css-18mhetb">
            <div class="css-ikzlcq">
              <div class="css-9jay18">
                <p class="css-11r9ii4">Sous-total</p>
                <h6 class="css-yemnbq" style="color: #999;">{{ order.subTotal | formatPrice }}€</h6>
              </div>
              <div v-if="user.id == order.buyer.id" class="css-9jay18">
                <p class="css-11r9ii4">Livraison</p>
                <h6 class="css-yemnbq" style="color: #999; font-weight: 500">+{{ order.shippingPrice | formatPrice }}€</h6>
              </div>
              <div v-if="user.id == order.vendor.id" class="css-9jay18">
                <p class="css-11r9ii4">Commission SwipeLive</p>
                <h6 class="css-yemnbq" style="color: #999; font-weight: 500">-{{ order.fees | formatPrice }}€</h6>
              </div>
              <hr class="css-ss6lby" style="margin-bottom: 10px; margin-top: 5px; border-style: dashed;" />
              <div class="css-9jay18">
                <h6 class="css-k9tjo5" style="font-weight: 600; margin-bottom: 0px;">Total</h6>
                <div class="css-s2uf1z">
                	<h6 v-if="user.id == order.vendor.id" class="css-kdhaao" style="font-weight: 600;">{{ remaining | formatPrice }}€</h6>
                	<h6 v-if="user.id == order.buyer.id" class="css-kdhaao" style="font-weight: 600;">{{ order.total | formatPrice }}€</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="css-1h7d8f3" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 5px 10px; margin-top: 15px; border-radius: 15px;">
          <div class="css-15x3obx">
            <div class="css-11qjisw">
              <span class="css-jef1j">Suivre le colis</span>
              <span v-if="order.trackingNumber" class="css-jef1j" style="float: right;font-size: 13px;font-weight: 500;color: hsl(240deg 5% 72%);margin-top: 3px;">N°{{ order.trackingNumber }}</span>
            </div>
          </div>
          <div class="css-18mhetb">
            <ul v-if="order.orderStatuses" class="css-1oa1nt">
              <li class="css-1rcbby2">
                <div class="css-11tgw8h">
                	<span class="css-1f06y3u"></span>
                	<span class="css-fz3k0c" style="background-color: #18cea0;"></span>
                </div>
                <div class="css-hg5jyh">
                  <h6 class="css-yemnbq">Commande reçu</h6>
                  <span class="css-6f545k">{{ order.createdAt }}</span>
                </div>
              </li>
              <li class="css-1rcbby2">
                <div class="css-11tgw8h">
                	<span class="css-1f06y3u"></span>
                	<span class="css-fz3k0c" style="background-color: #18cea0;"></span>
                </div>
                <div v-if="order.pdf" @click="showLabel()" class="btn-swipe" style="color: white;text-align: center;width: fit-content;background: rgb(254, 44, 85);margin-left: 12px;padding: 10px 24px;border: 1px solid rgb(254, 44, 85);border-radius: 8px;font-size: 14px;font-weight: 600;height: 44px;"> 
                	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: white; margin-right: 7px; margin-bottom: 2px;">
                    <path d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z"/>
                  </svg> Imprimer le bon de livraison
                </div>
                <div v-else @click="generateLabel()" class="btn-swipe" style="color: white;text-align: center;width: fit-content;background: rgb(254, 44, 85);margin-left: 12px;padding: 10px 24px;border: 1px solid rgb(254, 44, 85);border-radius: 8px;font-size: 14px;font-weight: 600;height: 44px;"> 
                	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 16px; height: 16px; fill: white; margin-right: 7px; margin-bottom: 2px;">
                    <path d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z"/>
                  </svg> Générer le bon de livraison
                </div>
              </li>
              <li v-for="status in order.orderStatuses" class="css-1rcbby2">
                <div class="css-11tgw8h">
                  <span class="css-1f06y3u"></span>
                  <span class="css-fz3k0c" style="background-color: #18cea0;"></span>
                </div>
                <div class="css-hg5jyh">
                  <h6 class="css-yemnbq">{{ status.message }}</h6>
                  <span class="css-6f545k">{{ status.updateAt }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

     <!--   <div class="top-author" style="margin-top: 15px;">
          <div class="top-author--container">
            <div class="top-author--item" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 10px; border-radius: 13px;">
              <div style="margin: 0px;">
                <div style="text-align: center;margin-bottom: 5px;font-weight: 600; color: #333">
                  <span style="text-align: center;font-size: 16px;padding-bottom: 5px;margin: 0 auto; color: #333">Es-tu satisfait(e) de ta commande ? </span>
                </div>
                <div><span>Si ta commande correspond à la description, clique sur le bouton "Tout est correct" ou cette transaction sera cloturé automatiquement dans 48 heures.</span></div>
                <div class="btn-swipe" style="color: #999;text-align: center;width: 100%;background: white; padding: 10px 24px;border: 1px solid #999;border-radius: 8px;font-size: 14px;font-weight: 500;margin-top: 8px;height: 44px; justify-content: center;">Contester</div>
                <div class="btn-swipe" style="color: white;text-align: center; background: rgb(254, 44, 85); padding: 10px 24px;border: 1px solid rgb(254, 44, 85);border-radius: 8px;font-size: 14px;font-weight: 600;margin-top: 10px;height: 44px; justify-content: center;"> Tout est correct</div>
              </div>
            </div>
          </div>
        </div>  -->
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
      id: this.$route.params.id,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
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
      var options = {
        buttonLabels: ['Envoyer un message'],
        addCancelButtonWithLabel: 'Annuler',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };

      window.plugins.actionsheet.show(options, (index) => {
        console.log(index);
        if (index == 1) {
        	// send message
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
      // if (!this.order.tracking_number && (this.user == this.order.vendor.id)) {
      if (!this.order.trackingNumber) {
		    window.cordova.plugin.http.get(this.baseUrl + "/user/api/shipping/create/" + this.id, {}, { Authorization: "Bearer " + this.token }, (response) => {
      		var result = JSON.parse(response.data);
      		this.order.trackingNumber = result.tracking_number;
      		this.order.pdf = result.pdf;
		    }, (response) => {
		      console.log(response.error);
		    });
      }
    },
  }
};

</script>

