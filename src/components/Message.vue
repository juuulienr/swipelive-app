<template>
  <main class="products" style="padding: 0px;">
    <div class="checkout">
      <div class="checkout__body">
        <div class="chat--head">
          <svg @click="hideDiscussion()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
          <div v-if="discussion.user.id == user.id" class="chat--head--profil">
            <div class="chat--head--profil--img">
              <img v-if="discussion.vendor.picture" :src="cloudinary256x256 + discussion.vendor.picture">
              <img v-else :src="require(`@/assets/img/no-preview.jpg`)">
            </div>
            <div class="chat--head--profil--name">
              <p>{{ discussion.vendor.vendor.businessName }}</p>
            </div>
          </div>
          <div v-else class="chat--head--profil">
            <div class="chat--head--profil--img">
              <img v-if="discussion.user.picture" :src="cloudinary256x256 + discussion.user.picture">
              <img v-else :src="require(`@/assets/img/no-preview.jpg`)">
            </div>
            <div class="chat--head--profil--name">
              <p>{{ discussion.user.firstname }} {{ discussion.user.lastname }}</p>
            </div>
          </div>
        </div>


        <div class="chat--right">
          <div>
            <div class="container--chat--input">
              <div ref="messagesContainer" class="chat--messages">
                <div v-for="message in discussion.messages" :key="message.id" :class="[message.fromUser == user.id ? 'chat--messages--send' : 'chat--messages--receive']">
                  <div v-if="message.fromUser != user.id" class="chat--message--profil">
                    <img v-if="discussion.user.id == user.id && discussion.vendor.picture" :src="cloudinary256x256 + discussion.vendor.picture">
                    <img v-else-if="discussion.user.id != user.id && discussion.user.picture" :src="cloudinary256x256 + discussion.user.picture">
                    <img v-else :src="require(`@/assets/img/no-preview.jpg`)">
                  </div>
                  <div class="chat--message--item">
                    <div v-if="message.picture" class="chat--message--item--text" style="padding: 0px;">
                      <img :src="cloudinary256x256 + message.picture" style="border-radius: 18px;">
                    </div>
                    <div v-else class="chat--message--item--text">
                      {{ message.text }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="chat--foot">    
                <button @click="uploadPicture()">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 24px; height: 24px; fill: #3982f6;">
                    <path d="M152 120c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48S178.5 120 152 120zM447.1 32h-384C28.65 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM463.1 409.3l-136.8-185.9C323.8 218.8 318.1 216 312 216c-6.113 0-11.82 2.768-15.21 7.379l-106.6 144.1l-37.09-46.1c-3.441-4.279-8.934-6.809-14.77-6.809c-5.842 0-11.33 2.529-14.78 6.809l-75.52 93.81c0-.0293 0 .0293 0 0L47.99 96c0-8.822 7.178-16 16-16h384c8.822 0 16 7.178 16 16V409.3z"/>
                  </svg>
                </button>
                <div>
                  <input type="text" v-model="inputMessage" @keyup.enter="sendMessage()" placeholder="Votre message">
                </div>
                <button @click="sendMessage()">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" sx="[object Object]" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="css-1ktnz7v iconify iconify--ic">
                    <path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12L2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" fill="currentColor"></path>
                  </svg>
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
  props: ['discussion'],
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      inputMessage: '',
      newMessage: []
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();

    if (this.discussion.id) {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/discussions/" + this.discussion.id + "/seen", {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.discussions = JSON.parse(response.data);
      }, (response) => {
        console.log(response.error);
      });
    }
  },
  mouted() {
    this.scrollToBottom();
  },
  methods: {
    async sendMessage() {
      if (this.inputMessage && this.inputMessage !== '') {
        var text = this.inputMessage;
        var httpParams = { "fromUser": this.user.id, "picture": null, "text": text };
        this.discussion.messages.push(httpParams);
        this.inputMessage = '';
        this.scrollToBottom();

        if (this.discussion.id) {
          await window.cordova.plugin.http.post(this.baseUrl + "/user/api/discussions/" + this.discussion.id + "/message", httpParams, { Authorization: "Bearer " + this.token }, (response) => {
            this.discussions = JSON.parse(response.data);
            this.discussions.map((item, index) => {
              if (item.id == this.discussion.id) {
                this.discussion = item;
              }
            });
            this.$emit('updateDiscussions', this.discussions);
          }, (response) => {
            console.log(JSON.parse(response.error));
          });
        } else {
          var httpParams2 = { "preview": text, "unseenVendor": true, "unseen": false, "user": this.discussion.user.id, "vendor": this.discussion.vendor.id, "purchase": null, "messages": this.discussion.messages };

          await window.cordova.plugin.http.post(this.baseUrl + "/user/api/discussions/add", httpParams2, { Authorization: "Bearer " + this.token }, (response) => {
            this.discussions = JSON.parse(response.data);
            console.log(this.discussions);
            this.discussions.map((item, index) => {
              if (item.vendor.id == this.discussion.vendor.id) {
                this.discussion = item;
              }
            });
            this.$emit('updateDiscussions', this.discussions);
          }, (response) => {
            console.log(JSON.parse(response.error));
          });
        }
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
      });
    },
    uploadPicture() {
      console.log("upload picture");
    },
    hideDiscussion() {
      this.$emit('hideDiscussion');
    }
  }
};

</script>

