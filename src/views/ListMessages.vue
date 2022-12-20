<template>
  <main class="products" style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Messagerie</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 50px;">
      <div>
        <div class="chat--left--head--input" style="padding-left: 14px;">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="css-1q8h0dm iconify iconify--eva">
            <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
          </svg>
          <input ref="search" type="text" placeholder="Rechercher" style="height: 1.75em"/>
        </div>
      </div>

      <div class="chat--left" style="margin-top: 15px;">
        <div class="chat--left--messages">
          <div @click="goMessage()" class="chat--left--message  message--open">
            <div class="chat--left--head--profil">
              <img src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg" alt="Avatar">
              <span class="online"></span>
            </div>
            <div class="chat--left--message--detail">
              <div class="chat--left--message--top">
                <h6>Lucian Obrien</h6>
                <span class="not--read"></span>
              </div>
              <p>
                You: Voluptas sunt... 10:15
              </p>
            </div>
          </div>
          <div @click="goMessage()" class="chat--left--message">
            <div class="chat--left--head--profil">
              <img src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg" alt="Avatar">
            </div>
            <div class="chat--left--message--detail">
              <div class="chat--left--message--top">
                <h6>Lucian Obrien</h6>
              </div>
              <p>
                You: Voluptas sunt... 17/06
              </p>
            </div>
          </div>
          <div @click="goMessage()" class="chat--left--message">
            <div class="chat--left--head--profil">
              <img src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg" alt="Avatar">
              <span class="online"></span>
            </div>
            <div class="chat--left--message--detail">
              <div class="chat--left--message--top">
                <h6>Lucian Obrien</h6>
                <span class="not--read"></span>
              </div>
              <p>
                You: Voluptas sunt... 23/12
              </p>
            </div>
          </div>
          <div @click="goMessage()" class="chat--left--message">
            <div class="chat--left--head--profil">
              <img src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg" alt="Avatar">
            </div>
            <div class="chat--left--message--detail">
              <div class="chat--left--message--top">
                <h6>Lucian Obrien</h6>
              </div>
              <p>
                You: Voluptas sunt... 23/12
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="container" style="margin: 100px auto 0px; text-align: center;">
          <video style="height: 220px; width: 220px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/message.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
        </div>
        <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 30px;">Aucune discussion</h5>
        <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos discussions apparaîtront ici.</div>
      </div>
    </div>
  </main>
</template>

<style scoped src="../assets/css/listmessages.css"></style>


<script>

export default {
  name: 'ListMessages',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
  },
  methods: {
    goMessage() {
      this.$router.push({ name: 'Message', params: { id: 100 } });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    }
  }
};

</script>

