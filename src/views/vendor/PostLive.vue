<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Performance</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 50px;">
      <div class="cards-main">
        <div class="container" style="text-align: center;">
          <video style="height: 175px; width: 175px; background: white; margin-top: 15px;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/trophy.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
        </div>
        <div style="font-weight: 500;font-size: 19px;text-align: center;margin-top: 15px;">Bravo {{ user.vendor.businessName }} !</div>
        <p style="margin: 15px;text-align: center;font-size: 16px; font-weight: 400;">
          Voici quelques statistiques du live. 
        </p>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding: 5px; margin-top: 30px;">
          <div style="width: 48%; text-align: center; padding: 15px; border-radius: 10px; box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="width: 33px; height: 33px; fill: rgb(104, 92, 240);">
              <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"></path>
            </svg>
            <h4 style="font-size: 24px; font-weight: 600; margin-top: 9px; margin-bottom: 5px;">258</h4>
            <div style="font-size: 15px; color: rgb(82, 92, 102); color: #78828a; font-weight: 400;">Vues</div>
          </div>
          <div style="width: 48%; text-align: center; padding: 15px; border-radius: 10px; box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 33px; height: 33px; fill: #ff2773;">
              <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
            </svg>
            <h4 style="font-size: 24px; font-weight: 600; margin-top: 9px; margin-bottom: 5px;">1458</h4>
            <div style="font-size: 15px; color: rgb(82, 92, 102); color: #78828a; font-weight: 400;">Likes</div>
          </div>
        </div>

        <div style="display: flex;justify-content: space-between;margin-bottom: 10px;padding: 5px;">
          <div style="width: 48%;text-align: center;padding: 15px;border-radius: 10px;box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 33px;height: 33px;fill: #FFB800;"><path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 96c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm200-24c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24z"></path></svg>
            <h4 style="font-size: 24px;font-weight: 600;margin-top: 9px;margin-bottom: 5px;">12</h4>
            <div style="font-size: 15px;color: rgb(82, 92, 102);color: #78828A;font-weight: 400;">Commandes</div>
          </div>
          <div style="width: 48%;text-align: center;padding: 15px;border-radius: 10px;box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 5px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 33px;height: 33px;fill: #73D751;">
              <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 336c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
            <h4 style="font-size: 24px;font-weight: 600;margin-top: 9px;margin-bottom: 5px;">250€</h4>
            <div style="font-size: 15px;color: rgb(82, 92, 102);color: #78828A;font-weight: 400;">Revenus</div>
          </div>
        </div>
        <div @click="goOrders()" class="btn-swipe" style="color: white; text-align: center; position: absolute; bottom: calc(env(safe-area-inset-bottom) + 25px); width: calc(100vw - 30px);">Voir les commandes</div>
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

