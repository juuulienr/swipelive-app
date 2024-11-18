<template>
  <div>
    <div class="chat--head">
      <svg @click="hideDiscussion()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
      </svg>
      <div v-if="discussion.user.id == user.id" class="chat--head--profil">
        <div class="chat--head--profil--img">
          <img v-if="discussion.vendor.picture" :src="$cloudinary256x256 + discussion.vendor.picture">
          <img v-else src="/img/anonyme.jpg">
        </div>
        <div class="chat--head--profil--name">
          <p>{{ discussion.vendor.vendor.pseudo }}</p>
          <div v-if="isUserOnline(discussion)" class="chat--head--status">En ligne</div>
          <div v-else-if="discussion.vendor.securityUsers" class="chat--head--status">{{ $formatDateDiff(discussion.vendor.securityUsers[0].connectedAt) }}</div>
        </div>
      </div>
      <div v-else class="chat--head--profil">
        <div class="chat--head--profil--img">
          <img v-if="discussion.user.picture" :src="$cloudinary256x256 + discussion.user.picture">
          <img v-else src="/img/anonyme.jpg">
        </div>
        <div class="chat--head--profil--name">
          <p>{{ discussion.user.firstname }} {{ discussion.user.lastname }}</p>
          <div v-if="isUserOnline(discussion)" class="chat--head--status">En ligne</div>
          <div v-else-if="discussion.user.securityUsers" class="chat--head--status">{{ $formatDateDiff(discussion.user.securityUsers[0].connectedAt) }}</div>
        </div>
      </div>
    </div>

    <div class="chat--right">
      <div>
        <div class="container--chat--input">
          <div ref="messagesContainer" class="chat--messages" :style="{ 'height': chatHeight }">
            <div v-for="(message, index) in discussion.messages" :key="message.id">
              <div v-if="shouldDisplayDate(message, index)" class="chat--messages-time">{{ $formatDate(message.createdAt) }}</div>
              <div :class="[message.fromUser == user.id ? 'chat--messages--send' : 'chat--messages--receive']">
                <div class="chat--message--item">
                  <div v-if="message.loading && !message.pictureType" class="chat--message--item--text" style="padding: 0px; background-color: white;">
                    <img ref="image" :src="message.picture" style="border-radius: 18px;" @load="getImageSize(message)">
                  </div>
                  <div v-else-if="message.loading" class="chat--message--item--text" style="padding: 0px; background-color: white;">
                    <img :src="message.picture" style="border-radius: 18px;" @load="getImageSize(message)" :style="{'width': message.pictureType == 'landscape' ? '250px' : message.pictureType == 'rounded' ? '200px': '180px', 'height': message.pictureType == 'landscape' ? '180px' : message.pictureType == 'rounded' ? '200px': '300px' }">
                  </div>
                  <div v-else-if="message.picture" class="chat--message--item--text" style="padding: 0px; background-color: white;">
                    <img :src="$cloudinary + message.picture" style="border-radius: 18px;" :style="{'width': message.pictureType == 'landscape' ? '250px' : message.pictureType == 'rounded' ? '200px': '180px', 'height': message.pictureType == 'landscape' ? '180px' : message.pictureType == 'rounded' ? '200px': '300px' }">
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
    <div class="chat--foot" :style="{ 'bottom': writeInput }">    
      <button id="btnPicture" @click="uploadPicture()" style="margin: 0px 5px; padding: 5px;">
        <img src="/img/plus-square.svg" style="height: 34px; width: 34px;"/>
      </button>
      <div class="divInput">
        <input type="text" v-click-away="away" v-model="inputMessage" @keyup.enter="sendMessage()" @input="onInput" placeholder="Écrivez ici...">
      </div>
      <button id="btnSend" @click="sendMessage()" style="margin: 0px 5px; padding: 5px;">
        <img src="/img/send.svg" style="height: 36px; width: 36px;"/>
      </button>
    </div>
  </div>
</template>

<style scoped src="../assets/css/message.css"></style>

<script>
import { useMainStore } from '../stores/useMainStore.js';

export default {
  name: 'Message',
  props: ['discussion'],
  data() {
    const mainStore = useMainStore();

    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: mainStore.getUser,
      inputMessage: '',
      writing: false,
      imageWidth: '0px',
      chatHeight: 'calc(100vh - 55px)',
      writeInput: "0px",
      newMessage: [],
    };
  },
  created() {
    if (this.$Capacitor.getPlatform() === "ios") {
      this.chatHeight = 'calc(100vh - 95px)';
      this.writeInput = 'calc(env(safe-area-inset-bottom) + 0px)';
    }
    this.seenDiscussion();
  },
  mounted() {
    window.addEventListener('keyboardWillShow', this.keyboardWillShow);
    this.scrollToBottom();
  },
  beforeDestroy() {
    window.removeEventListener('keyboardWillShow', this.keyboardWillShow);
  },
  methods: {
    isUserOnline(discussion) {
      const currentUser = discussion.user.id === this.user.id ? discussion.vendor : discussion.user;
      if (!currentUser.securityUsers) return false;

      const lastConnectedAt = new Date(currentUser.securityUsers[0].connectedAt);
      const cutoffTime = new Date(Date.now() - 5 * 60 * 1000);

      return lastConnectedAt > cutoffTime;
    },
    async sendMessage() {
      if (this.inputMessage && this.inputMessage !== '') {
        this.writing = false;
        this.writeInput = 'calc(env(safe-area-inset-bottom) + 0px)';
        const preview = this.inputMessage;
        const newMessage = { fromUser: this.user.id, picture: null, text: preview, createdAt: new Date() };
        this.discussion.messages.push(newMessage);
        this.inputMessage = '';
        this.scrollToBottom();

        let url, httpParams;
        if (this.discussion.id) {
          url = `${this.baseUrl}/user/api/discussions/${this.discussion.id}/message`;
          httpParams = newMessage;
        } else {
          url = `${this.baseUrl}/user/api/discussions/add`;
          httpParams = { 
            preview,
            unseenVendor: true,
            unseen: false,
            user: this.discussion.user.id,
            vendor: this.discussion.vendor.id,
            purchase: null,
            messages: this.discussion.messages,
          };
        }

        try {
          const response = await this.$CapacitorHttp.request({
            method: 'POST',
            url: url,
            headers: { Authorization: `Bearer ${this.token}` },
            data: httpParams,
          });

          const updatedDiscussion = response.data;
          this.$emit('updateDiscussions', updatedDiscussion);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async seenDiscussion() {
      if (this.discussion.id) {
        const unseen = this.user.id === this.discussion.user.id ? this.discussion.unseen : this.discussion.unseenVendor;
        if (unseen) {
          try {
            const response = await this.$CapacitorHttp.request({
              method: 'GET',
              url: `${this.baseUrl}/user/api/discussions/${this.discussion.id}/seen`,
              headers: { Authorization: `Bearer ${this.token}` },
            });

            const updatedDiscussion = response.data;
            this.$emit('updateDiscussions', updatedDiscussion);
          } catch (error) {
            console.log(error);
          }
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
      const width = this.$refs.image[0].naturalWidth;
      const height = this.$refs.image[0].naturalHeight;

      if (width > height) message.pictureType = "landscape";
      else if (width === height) message.pictureType = "rounded";
      else message.pictureType = "portrait";
    },
    shouldDisplayDate(message, index) {
      if (index === 0) return true;

      const previousMessage = this.discussion.messages[index - 1];
      const timeDifference = new Date(message.createdAt) - new Date(previousMessage.createdAt);

      return timeDifference > 20 * 60 * 1000;
    },
    async uploadImage(options) {
      navigator.camera.getPicture(
        async (imageUri) => {
          console.log(imageUri);

          const httpParams = {
            fromUser: this.user.id,
            picture: imageUri,
            pictureType: null,
            loading: true,
            text: null,
          };
          this.discussion.messages.push(httpParams);
          this.scrollToBottomWithTimeout();

          try {
            if (this.$Capacitor.getPlatform() === "android" || this.$Capacitor.getPlatform() === "ios") {
              const formData = new FormData();
              formData.append("picture", imageUri);

              const response = await this.$CapacitorHttp.request({
                method: 'POST',
                url: `${this.baseUrl}/user/api/discussions/${this.discussion.id}/picture`,
                headers: { Authorization: `Bearer ${this.token}` },
                body: formData,
              });

              const updatedDiscussion = response.data;
              this.$emit('updateDiscussions', updatedDiscussion);
            } else {
              const imgData = `data:image/jpeg;base64,${imageUri}`;
              const response = await this.$CapacitorHttp.request({
                method: 'POST',
                url: `${this.baseUrl}/user/api/discussions/${this.discussion.id}/picture`,
                headers: { Authorization: `Bearer ${this.token}` },
                data: { picture: imgData },
              });

              const updatedDiscussion = response.data;
              this.$emit('updateDiscussions', updatedDiscussion);
            }
          } catch (error) {
            console.log(error);
          }
        },
        (error) => {
          console.log("Impossible de récupérer l'image : " + error);
        },
        options
      );
    },
    async stopWriting() {
      if (this.writing) {
        this.writing = false;

        try {
          await this.$CapacitorHttp.request({
            method: 'GET',
            url: `${this.baseUrl}/user/api/discussions/${this.discussion.id}/writing/stop`,
            headers: { Authorization: `Bearer ${this.token}` },
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async startWriting() {
      this.writing = true;

      try {
        await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/discussions/${this.discussion.id}/writing`,
          headers: { Authorization: `Bearer ${this.token}` },
        });
      } catch (error) {
        console.log(error);
      }
    },
    onInput() {
      if (this.discussion.id) {
        if (this.inputMessage === '') this.stopWriting();
        else if (!this.writing) this.startWriting();
      }
    },
    hideDiscussion() {
      this.stopWriting();
      this.$emit('hideDiscussion');
    },
    keyboardWillShow(event) {
      const height = `${event.keyboardHeight}px`;
      setTimeout(() => {
        this.writeInput = height;
      }, 200);
    },
    away(event) {
      if (!["btnSend", "btnPicture"].includes(event.target.id)) {
        this.writeInput = 'calc(env(safe-area-inset-bottom) + 0px)';
      }
    },
    async uploadPicture() {
      const result = await this.$ActionSheet.showActions({
        title: 'Envoyer une photo',
        options: [
          { title: 'À Partir de la bibliothèque', icon: 'folder', style: 'default' },
          { title: 'Prendre une photo', icon: 'camera', style: 'default' },
          { title: 'Annuler', icon: 'close', style: 'cancel' },
        ],
      });

      switch (result.index) {
        case 0:
          this.openFilePicker();
          break;
        case 1:
          this.openCamera();
          break;
        default:
          console.log('Action annulée');
      }
    },
    openFilePicker() {
      const options = {
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetHeight: 720,
        targetWidth: 10000,
        allowEdit: false,
        correctOrientation: true,
      };
      this.uploadImage(options);
    },
    openCamera() {
      const options = {
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetHeight: 720,
        targetWidth: 10000,
        allowEdit: false,
        correctOrientation: true,
      };
      this.uploadImage(options);
    },
  },
};
</script>
