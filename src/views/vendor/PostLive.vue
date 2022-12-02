<template>
  <main class="products">
    <div style="padding: 15px;">
      <h5 style="font-weight: 600;margin-bottom: 0px;color: #000;font-size: 17px;text-align: center;">Performance du live</h5>
      <svg @click="goBack()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px;float: right;fill: #000;position: absolute;right: 15px;top: 15px;"><path d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z"></path></svg>
    </div>
    <div class="checkout">
      <div class="cards-main">
        <p style="margin: 30px 15px;text-align: center;font-size: 16px;">
          <span style="font-weight: 600; font-size: 17px;">{{ user.vendor.businessName }}</span><br> Voici quelques statistiques du live. 
        </p>
        <div class="my_card card_1" style="background: rgb(208, 242, 255);border: 1px solid rgb(4, 41, 122);">
          <div class="card_balance">
            <h6 class="name" style="color: rgb(12, 83, 183);">Vues</h6>
            <h4 class="balance" style="margin-bottom: 0vh; font-weight: bold; color: rgb(12, 83, 183);">248</h4>
          </div>
        </div>
        <div class="my_card card_1" style="background-color: rgba(255, 72, 66, 0.16);border: 1px solid rgb(122, 12, 46);">
          <div class="card_balance">
            <h6 class="name" style="color: rgb(122, 12, 46);">Ventes</h6>
            <h4 class="balance" style="color: rgb(122, 12, 46); font-weight: bold; margin-bottom: 0vh;">4</h4>
          </div>
        </div>
        <div class="my_card card_1" style="background-color: rgb(200, 250, 205);border: 1px solid rgb(0, 82, 73);">
          <div class="card_balance">
            <h6 class="name" style="color: rgb(0, 82, 73);">Gains</h6>
            <h4 class="balance" style="margin-bottom: 0vh; font-weight: bold; color: rgb(0, 82, 73);">348,20€</h4>
          </div>
        </div>
        <div @click="goOrders()" class="btn-swipe" style="color: white; text-align: center; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); width: calc(100vw - 30px); margin: 0px 15px;">Voir les commandes</div>
      </div>
    </div>
  </main>
</template>


<style scoped>

.cards-main .card_1 {
  background: #ff2773;
}

.cards-main .my_card {
  position: relative;
  padding: 3.5vh 6vw 2.5vh;
  border-radius: 20px;
  margin: 15px;
  text-align: center;
}

.cards-main .my_card .settings_logo {
  position: absolute;
  right: 4vw;
  top: 2.5vh;
}

.cards-main .my_card .settings_logo img {
  width: 25px;
}

.cards-main .my_card .name {
  color: #fff;
  text-transform: uppercase;
  font-size: 1em;
  letter-spacing: 0.5px;
  font-weight: bold;
}

.cards-main .my_card .balance {
  color: #fff;
  font-size: 25px;
  margin: 0vh 0 3vh;
}

.cards-main .my_card .code_card span {
  display: inline-block;
  margin-right: 3vw;
  font-size: 1.3em;
  font-weight: 500;
}
.btn {
  background: #ff2773;
  -webkit-box-shadow: 0px 0px 9px -2px rgb(0 0 0 / 50%);
  box-shadow: 0px 0px 9px -2px rgb(0 0 0 / 50%);
  padding: 10px 42px;
  font-weight: bold;
  margin: 10px 0px;
  border-radius: 30px;
}

</style>

<script>

export default {
  name: 'PostLive',
  data() {
    return {
      id: this.$route.params.id,
      baseUrl: window.localStorage.getItem("baseUrl"),
      user: JSON.parse(window.localStorage.getItem("user")),
      token: window.localStorage.getItem("token"),
      bambuserId: window.localStorage.getItem("bambuserId"),
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
  },
  methods: {
    goOrders() {
      this.$router.push({ name: 'ListOrders' });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
  }
};

</script>

