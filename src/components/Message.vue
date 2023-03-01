<template>
  <div>
    <div class="chat--head">
      <svg @click="hideDiscussion()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
      </svg>
      <div v-if="discussion.user == user.id" class="chat--head--profil">
        <div class="chat--head--profil--img">
          <img v-if="discussion.vendor.picture" :src="cloudinary256x256 + discussion.vendor.picture">
          <img v-else :src="require(`@/assets/img/anonyme.jpg`)">
        </div>
        <div class="chat--head--profil--name">
          <p>{{ discussion.vendor.vendor.businessName }}</p>
          <div v-if="isUserOnline(discussion)" class="chat--head--status">En ligne</div>
          <div v-else-if="discussion.vendor.securityUsers" class="chat--head--status">{{ discussion.vendor.securityUsers[0].connectedAt | formatDateDiff }}</div>
        </div>
      </div>
      <div v-else class="chat--head--profil">
        <div class="chat--head--profil--img">
          <img v-if="discussion.user.picture" :src="cloudinary256x256 + discussion.user.picture">
          <img v-else :src="require(`@/assets/img/anonyme.jpg`)">
        </div>
        <div class="chat--head--profil--name">
          <p>{{ discussion.user.firstname }} {{ discussion.user.lastname }}</p>
          <div v-if="isUserOnline(discussion)" class="chat--head--status">En ligne</div>
          <div v-else-if="discussion.vendor.securityUsers" class="chat--head--status">{{ discussion.user.securityUsers[0].connectedAt | formatDateDiff }}</div>
        </div>
      </div>
    </div>


    <div class="chat--right">
      <div>
        <div class="container--chat--input">
          <div ref="messagesContainer" class="chat--messages" :style="{ 'height': chatHeight }">
            <div v-for="(message, index) in discussion.messages" :key="message.id">
              <div v-if="shouldDisplayDate(message, index)" class="chat--messages-time">{{ message.createdAt | formatDate }}</div>

              <div :class="[message.fromUser == user.id ? 'chat--messages--send' : 'chat--messages--receive']">
                <div class="chat--message--item">
                  <div v-if="message.loading && !message.pictureType" class="chat--message--item--text" style="padding: 0px; background-color: white;">
                    <img ref="image" :src="message.picture" style="border-radius: 18px;" @load="getImageSize(message)">
                  </div>
                  <div v-else-if="message.loading" class="chat--message--item--text" style="padding: 0px; background-color: white;">
                    <img :src="message.picture" style="border-radius: 18px;" @load="getImageSize(message)" :style="{'width': message.pictureType == 'landscape' ? '250px' : message.pictureType == 'rounded' ? '200px': '180px', 'height': message.pictureType == 'landscape' ? '180px' : message.pictureType == 'rounded' ? '200px': '300px' }">
                  </div>
                  <div v-else-if="message.picture" class="chat--message--item--text" style="padding: 0px; background-color: white;">
                    <img :src="cloudinary + message.picture" style="border-radius: 18px;" :style="{'width': message.pictureType == 'landscape' ? '250px' : message.pictureType == 'rounded' ? '200px': '180px', 'height': message.pictureType == 'landscape' ? '180px' : message.pictureType == 'rounded' ? '200px': '300px' }">
                  </div>
                  <div v-else-if="message.writing" class="chat--message--item--text">
                    <div class="_4b0g">
                      <div class="_5pd7"></div>
                      <div class="_5pd7"></div>
                      <div class="_5pd7"></div>
                    </div>
                  </div>
                  <div v-else class="chat--message--item--text">
                    {{ message.text }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat--foot">    
      <button @click="uploadPicture()" style="margin: 0px; padding: 5px;">
        <img :src="require(`@/assets/img/plus-square.svg`)" style="height: 34px; width: 34px;"/>
      </button>
      <div>
        <input type="text" v-model="inputMessage" @keyup.enter="sendMessage()" @input="onInput" placeholder="Écrivez ici...">
      </div>
      <button @click="sendMessage()" style="margin: 0px; padding: 5px;">
        <img :src="require(`@/assets/img/send.svg`)" style="height: 36px; width: 36px;"/>
      </button>
    </div>
  </div>
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
      user: this.$store.getters.getUser,
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      cloudinary: 'https://res.cloudinary.com/dxlsenc2r/image/upload/h_720/',
      inputMessage: '',
      writing: false,
      imageWidth: '0px',
      chatHeight: 'calc(100vh - 55px)',
      newMessage: []
    }
  },
  created() {
    if (window.cordova && (window.cordova.platformId === "ios")) {
      this.chatHeight = 'calc(100vh - 95px)';
    }
  },
  mounted() {
    this.scrollToBottom();
    this.seenDiscussion();
  },
  filters: {
    formatDateDiff(date) {
      const diffInMs = new Date() - new Date(date);
      const diffInMinutes = diffInMs / 1000 / 60;
      const diffInHours = diffInMinutes / 60;

      if (diffInMinutes < 60) {
        if (Math.floor(diffInMinutes) > 1) {
          return `En ligne il y a ${Math.floor(diffInMinutes)} minutes`;
        } else {
          return `En ligne il y a 1 minute`;
        }
      } else if (diffInHours < 24) {
        if (Math.floor(diffInHours) > 1) {
          return `En ligne il y a ${Math.floor(diffInHours)} heures`;
        } else {
          return `En ligne il y a 1 heure`;
        }
      }

      return "";
    },
    formatDate(datetime) {
      const today = new Date();
      const date = new Date(datetime);

      if (date.toDateString() === today.toDateString()) {
        return date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
      } else {
        return date.toLocaleDateString(navigator.language, { day: '2-digit', month: '2-digit' });
      }
    }
  },
  methods: {
    isUserOnline(discussion) {
      if (discussion.user == this.user.id) {
        if (discussion.vendor.securityUsers) {
          var datetime = discussion.vendor.securityUsers[0].connectedAt;
        } else {
          return false;
        }
      } else {
        if (discussion.user.securityUsers) {
          var datetime = discussion.user.securityUsers[0].connectedAt;
        } else {
          return false;
        }
      }

      var date = new Date(datetime);
      var date2 = new Date(Date.now() - 5 * 60 * 1000);

      return date > date2;
    },
    async sendMessage() {
      if (this.inputMessage && this.inputMessage !== '') {
        this.writing = false;
        var preview = this.inputMessage;
        var httpParams = { "fromUser": this.user.id, "picture": null, "text": preview, "createdAt": new Date() };
        this.discussion.messages.push(httpParams);
        this.inputMessage = '';
        this.scrollToBottom();

        if (this.discussion.id) {
          var url = this.baseUrl + "/user/api/discussions/" + this.discussion.id + "/message";
        } else {
          var url = this.baseUrl + "/user/api/discussions/add";
          httpParams = { "preview": preview, "unseenVendor": true, "unseen": false, "user": this.discussion.user, "vendor": this.discussion.vendor.id, "purchase": null, "messages": this.discussion.messages };
        }

        await window.cordova.plugin.http.post(url, httpParams, { Authorization: "Bearer " + this.token }, (response) => {
          this.user = JSON.parse(response.data);
          this.$store.commit('setUser', JSON.parse(response.data));
          this.$emit('updateDiscussions', this.user);
        }, (response) => {
          console.log(JSON.parse(response.error));
        });
      }
    },
    seenDiscussion() {
      if (this.discussion.id) {
        if (this.user.id == this.discussion.user) {
          var unseen = this.discussion.unseen;
        } else {
          var unseen = this.discussion.unseenVendor;
        }

        if (unseen) {
          window.cordova.plugin.http.get(this.baseUrl + "/user/api/discussions/" + this.discussion.id + "/seen", {}, { Authorization: "Bearer " + this.token }, (response) => {
            this.user = JSON.parse(response.data);
            this.$store.commit('setUser', JSON.parse(response.data));
            this.$emit('updateDiscussions', this.user);
          }, (response) => {
            console.log(response.error);
          });
        }
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
      });
    },
    scrollToBottomWithTimeout() {
      setTimeout(() => {
        this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
      }, 200);
    },
    getImageSize(message) {
      var width = this.$refs.image[0].naturalWidth;
      var height = this.$refs.image[0].naturalHeight;

      if (width > height) {
        message.pictureType = "landscape";
      } else if (width == height) {
        message.pictureType = "rounded";
      } else {
        message.pictureType = "portrait";
      }
    },
    shouldDisplayDate(message, index) {
      if (index === 0) return true;
      const previousMessage = this.discussion.messages[index - 1];

      const messageTime = new Date(message.createdAt);
      const previousMessageTime = new Date(previousMessage.createdAt);
      const timeDifference = messageTime - previousMessageTime;

      // check si précédent message existe depuis plus de 20 minutes
      return timeDifference > 20 * 60 * 1000;
    },
    uploadImage(options) {
      navigator.camera.getPicture((imageUri) => {
        console.log(imageUri);

        window.cordova.plugin.http.setDataSerializer('json');
        if (window.cordova.platformId === "android" || window.cordova.platformId === "ios") {
          var httpParams = { "fromUser": this.user.id, "picture": imageUri, "pictureType": null, "loading": true, "text": null };
          this.discussion.messages.push(httpParams);
          this.scrollToBottomWithTimeout();

          window.cordova.plugin.http.uploadFile(this.baseUrl + "/user/api/discussions/" + this.discussion.id + "/picture", {}, { Authorization: "Bearer " + this.token }, imageUri, 'picture', (response) => {
            this.user = JSON.parse(response.data);
            this.$store.commit('setUser', JSON.parse(response.data));
            this.$emit('updateDiscussions', this.user);
          }, function(response) {
            console.log(response.error);
          });
        } else {
          var imgData = "data:image/jpeg;base64," + imageUri;
          var httpParams = { "fromUser": this.user.id, "picture": imgData, "pictureType": null, "loading": true, "text": null };
          this.discussion.messages.push(httpParams);
          this.scrollToBottomWithTimeout();

          window.cordova.plugin.http.post(this.baseUrl + "/user/api/discussions/" + this.discussion.id + "/picture", { "picture" : imgData }, { Authorization: "Bearer " + this.token }, (response) => {
            this.user = JSON.parse(response.data);
            this.$store.commit('setUser', JSON.parse(response.data));
            this.$emit('updateDiscussions', this.user);
          }, function(response) {
            console.log(response.error);
          });
        }
      }, (error) => {
        console.log("Impossible de récupérer l'image : " + error);
      }, options);
    },
    onInput() {
      if (this.discussion.id) {
        if (this.inputMessage == '') {
          this.stopWriting();
        } else {
          if (!this.writing) {
            this.startWriting();
          }
        }
      }
    },
    hideDiscussion() {
      this.stopWriting();
      this.$emit('hideDiscussion');
    },
    stopWriting() {
      if (this.writing) {
        this.writing = false;
        window.cordova.plugin.http.get(this.baseUrl + "/user/api/discussions/" + this.discussion.id + "/writing/stop", {}, { Authorization: "Bearer " + this.token }, (response) => {
        }, (response) => {
          console.log(response.error);
        });
      }
    },
    startWriting() {
      this.writing = true;
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/discussions/" + this.discussion.id + "/writing", {}, { Authorization: "Bearer " + this.token }, (response) => {
      }, (response) => {
        console.log(response.error);
      });
    },
    uploadPicture() {
      var options = {
        title: 'Envoyer une photo',
        buttonLabels: ['À Partir de la bibliothèque', 'Prendre une photo'],
        addCancelButtonWithLabel: 'Annuler',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true
      };
      window.plugins.actionsheet.show(options, (index) => {
        console.log(index);
        if (index == 1) {
          this.openFilePicker();
        } else if (index == 2) {
          this.openCamera();
        }
      }, (error) => {
        console.log(error);
      });
    },
    openFilePicker() {
      var options = {
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetHeight: 720,
        targetWidth: 10000,
        allowEdit: false,
        correctOrientation: true
      }

      this.uploadImage(options);
    },
    openCamera() {
      var options = {
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetHeight: 720,
        targetWidth: 10000,
        allowEdit: false,
        correctOrientation: true,
      }

      this.uploadImage(options);
    },
  }
};

</script>

