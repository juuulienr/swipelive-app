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

        <div v-if="sales" class="tags" style="display: flex; margin: 20px 0px 5px; align-items: center; overflow-x: scroll;">
          <div style="display: flex; flex-wrap: initial;">
            <div style="background-color: white; color: rgb(254, 44, 85); padding: 5px 20px; border-radius: 30px; font-size: 14px; border: 1px solid rgb(254, 44, 85); margin-right: 10px; width: 70px; margin-left: 15px;">Tout</div>
            <div style="background-color: rgb(238, 238, 238); color: rgb(102, 102, 102); text-align: center; padding: 5px 20px; border-radius: 30px; width: 115px; margin-right: 10px; font-size: 14px;">À imprimer</div>
            <div style="background-color: rgb(238, 238, 238); color: rgb(102, 102, 102); text-align: center; padding: 5px 20px; border-radius: 30px; font-size: 14px; margin-right: 10px; width: 100px;">En cours</div>
            <div style="background-color: rgb(238, 238, 238); color: rgb(102, 102, 102); text-align: center; padding: 5px 20px; border-radius: 30px; font-size: 14px; width: 95px; margin-right: 15px;">Terminé</div>
          </div>
        </div>

        <div class="top-author">
        	<div class="top-author--container">
        		<div v-if="sales && sales.length" @click="goOrder(sale.id)" v-for="sale in sales" class="top-author--item" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 10px; border-radius: 13px;">
        			<img v-if="sale.lineItems[0].product.uploads" :src="baseUrl + '/uploads/' + sale.lineItems[0].product.uploads[0].filename" style="border: 1px solid rgba(22, 24, 35, 0.12);" />
        			<div>
        				<div><span>{{ sale.createdAt }}</span></div>
        				<span>{{ sale.buyer.firstname }} {{ sale.buyer.lastname }}</span>
        			</div>
        			<span class="css-4ioo3c" style="color: #1ED7A6; background-color: #e6fff7;">{{ sale.total | formatPrice }}€</span>
        		</div>
        		<div v-if="purchases && purchases.length" @click="goOrder(purchase.id)" v-for="purchase in purchases" class="top-author--item" style="border: 1px solid rgba(22, 24, 35, 0.12); padding: 10px; border-radius: 13px;">
        			<img v-if="purchase.lineItems[0].product.uploads" :src="baseUrl + '/uploads/' + purchase.lineItems[0].product.uploads[0].filename" style="border: 1px solid rgba(22, 24, 35, 0.12);" />
        			<div>
        				<div><span>{{ purchase.createdAt }}</span></div>
        				<span>{{ purchase.vendor.businessName }}</span>
        			</div>
        			<span class="css-4ioo3c" style="color: rgb(223, 104, 104); background-color: #fbefef;">{{ purchase.total | formatPrice }}€</span>
        		</div>
        		<div v-if="!purchases && !sales && !loading" style="text-align: center; margin-top: 30px;">
        			Aucune transaction
        		</div>
        	</div>
        </div>
      </div>
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
      sales: null,
      purchases: null,
      loading: true
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
      var result = JSON.parse(response.data);
      console.log(result);

      this.sales = result.sales;
      this.purchases = result.purchases;
      this.loading = false;
    }, (response) => {
      console.log(response.error);
    });
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

