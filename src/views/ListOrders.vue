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
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="css-1q8h0dm iconify iconify--eva">
              <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
            </svg>
            <input ref="search" type="text" placeholder="Rechercher" style="height: 1.75em"/>
          </div>
        </div>
        <div v-if="user.vendor" class="tags" style="display: flex; margin: 20px 0px 5px; align-items: center; overflow-x: scroll;">
          <div style="display: flex; flex-wrap: initial;">
            <div class="tag-tab" style="background-color: white; color: rgb(254, 44, 85);border: 1px solid rgb(254, 44, 85); margin-left: 10px;">Tout</div>
            <div class="tag-tab">À imprimer</div>
            <div class="tag-tab">En cours</div>
            <div class="tag-tab">Terminé</div>
          </div>
        </div>
        <div v-if="orders && orders.length" class="top-author">
        	<div class="top-author--container">
        		<div v-for="order in orders" @click="goToOrder(order.id)" class="top-author--item" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 10px; border-radius: 13px;">
        			<img v-if="order.lineItems[0].product.uploads" :src="baseUrl + '/uploads/' + order.lineItems[0].product.uploads[0].filename" style="border: 1px solid rgba(22, 24, 35, 0.12);" />
        			<div>
        				<div><span>{{ order.createdAt }}</span></div>
        				<span v-if="user.email == order.buyer.email">{{ order.vendor.businessName }} (Achat)</span>
                <span v-else>{{ order.buyer.firstname }} {{ order.buyer.lastname }} (Vente)</span>
        			</div>
              <span v-if="user.email == order.buyer.email" class="css-4ioo3c" style="color: rgb(223, 104, 104); background-color: #fbefef;">{{ order.total | formatPrice }}€</span>
              <span v-else class="css-4ioo3c" style="color: #1ED7A6; background-color: #e6fff7;">{{ order.total | formatPrice }}€</span>
        		</div>
          </div>
        </div>
      </div>
    <!--   <div v-else class="checkout__body">
        <div style="text-align: center; margin-top: 100px;">
          Aucune transaction
        </div>
      </div> -->
    </div>
  </main>
</template>


<style scoped src="../assets/css/listorders.css"></style>

<script>

export default {
  name: 'ListOrders',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
      orders: null,
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

    window.cordova.plugin.http.get(this.baseUrl + "/user/api/orders", {}, { Authorization: "Bearer " + this.token }, (response) => {
      this.orders = JSON.parse(response.data);
    }, (response) => {
      console.log(response.error);
    });
  },
  methods: {
    goToOrder(id) {
      this.$router.push({ name: 'Order', params: { id: id } });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    }
  }
};

</script>

