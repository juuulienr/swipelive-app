<template>
  <main class="products">
    <div class="checkout">
      <div class="checkout__body">
        <div class="chat--head" style="border-bottom: 1px solid rgba(145, 158, 171, 0.24); display: flex; -webkit-box-align: center; align-items: center;">
          <svg @click="goBack()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px;height: 20px; fill: #161823; margin-right: 12px;"><path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path></svg>
          <div class="chat--head--profil">
            <div class="chat--head--profil--img">
              <img src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg" alt="Avatar"/>
            </div>
            <div class="chat--head--profil--name">
              <p>Lucian Obrien</p>
            </div>
          </div>
        </div>
        <div class="chat--right">
          <div>
            <div class="container--chat--input">
              <div class="chat--messages">
                <div class="chat--messages--receive">
                  <div class="chat--message--profil">
                    <img src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg" alt="Avatar">
                  </div>
                  <div class="chat--message--item" style="margin-right: 20%;">
                    <div class="chat--message--item--text" style="border-bottom-left-radius: 4px;">
                      Quis veniam aut saepe aliquid nulla.
                    </div>
                  </div>
                </div>
                <div class="chat--messages--send">
                  <div class="chat--message--item" style="margin-left: 20%;">
                    <div class="chat--message--item--text" style="border-bottom-right-radius: 4px;">
                      Reprehenderit ut voluptas sapiente ratione nostrum est.
                    </div>
                  </div>
                </div>
                <div class="chat--messages--receive">
                  <div class="chat--message--profil">
                    <img src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg" alt="Avatar">
                  </div>
                  <div class="chat--message--item" style="margin-right: 20%;">
                    <div class="chat--message--item--text" style="border-bottom-left-radius: 4px;">
                      Error ut sit vel molestias velit
                    </div>
                  </div>
                </div>
                <div class="chat--messages--receive">
                  <div class="chat--message--profil">
                    <img src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg" alt="Avatar">
                  </div>
                  <div class="chat--message--item" style="margin-right: 20%;">
                    <div class="chat--message--item--text" style="padding: 0px;">
                      <img src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg" alt="Feed">
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <div class="chat--foot">
                <div>
                  <input type="text" placeholder="Votre message">
                  <div class="chat--foot--btn">
                    <button>
                      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="css-1ktnz7v iconify iconify--ic" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M21.02 5H19V2.98c0-.54-.44-.98-.98-.98h-.03c-.55 0-.99.44-.99.98V5h-2.01c-.54 0-.98.44-.99.98v.03c0 .55.44.99.99.99H17v2.01c0 .54.44.99.99.98h.03c.54 0 .98-.44.98-.98V7h2.02c.54 0 .98-.44.98-.98v-.04c0-.54-.44-.98-.98-.98zM16 9.01V8h-1.01c-.53 0-1.03-.21-1.41-.58c-.37-.38-.58-.88-.58-1.44c0-.36.1-.69.27-.98H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8.28c-.3.17-.64.28-1.02.28A2 2 0 0 1 16 9.01zM15.96 19H6a.5.5 0 0 1-.4-.8l1.98-2.63c.21-.28.62-.26.82.02L10 18l2.61-3.48c.2-.26.59-.27.79-.01l2.95 3.68c.26.33.03.81-.39.81z" fill="currentColor"></path></svg>
                    </button>
                  </div>
                </div>
                <hr>   
                <button class=""> <!-- add btn--inactive -->
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="css-1ktnz7v iconify iconify--ic" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12L2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" fill="currentColor"></path></svg>
                </button>
              </div>
            </div>    
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="../assets/css/message.css"></style>

<script>

  export default {
    name: 'Message',
    data() {
      return {
        baseUrl: window.localStorage.getItem("baseUrl"),
        token: window.localStorage.getItem("token"),
      }
    },
    created() {    
      window.StatusBar.overlaysWebView(false);
      window.StatusBar.styleDefault();
    },
    methods: {
      goBack() {
        this.$router.push({ name: 'ListMessages' });
      }
    }
  };

</script>

