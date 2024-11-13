<template>
  <main class="products" style="padding: 0px">
    <div v-if="!selectedDiscussion" class="checkout__header" style="padding-right: 20px; padding-left: 20px;">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Messagerie</div>
    </div>

    <div v-if="!selectedDiscussion" class="checkout__body" style="padding: 0px 15px 15px;">
      <div>
        <div v-if="discussions.length">
          <div class="chat--left--head--input">
            <svg viewBox="0 0 24 24" class="css-1q8h0dm iconify iconify--eva">
              <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
            </svg>
            <input type="text" v-model="searchTerm" placeholder="Rechercher"/>
          </div>
        </div>

        <div v-if="discussions.length" class="chat--left" style="overflow: hidden;">
          <div v-for="(discussion, index) in filteredDiscussions" :key="index" class="chat--left--messages">
            <div @click="showDiscussion(discussion)" class="chat--left--message message--open">
              <div class="chat--left--head--profil">
                <span v-if="discussion.user.id == user.id">
                  <img v-if="discussion.vendor.picture" :src="$cloudinary256x256 + discussion.vendor.picture">
                  <img v-else src="/img/anonyme.jpg">
                </span>
                <span v-else>
                  <img v-if="discussion.user.picture" :src="$cloudinary256x256 + discussion.user.picture">
                  <img v-else src="/img/anonyme.jpg">
                </span>
                <span v-if="isUserOnline(discussion)" class="online"></span>
              </div>
              <div class="chat--left--message--detail">
                <div class="chat--left--message--top">
                  <h6 v-if="discussion.user.id == user.id">{{ discussion.vendor.vendor.pseudo }}</h6>
                  <h6 v-else>{{ discussion.user.firstname }} {{ discussion.user.lastname }}</h6>
                  <span v-if="discussion.user.id == user.id && discussion.unseen" class="not--read"></span>
                  <span v-if="discussion.vendor.id == user.id && discussion.unseenVendor" class="not--read"></span>
                </div>
                <p>{{ $truncate(discussion.preview, 35) }} · {{ $formatDate(discussion.updatedAt) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="loading">
          <div class="loader2">
            <span></span>
          </div>
        </div>
        <div v-else>
          <div class="container" style="margin: 180px auto 0px; text-align: center;">
            <div style="margin: 0px auto;">
              <Vue3Lottie :animationData="LottieJSON" :width="200"/>
            </div>
          </div>
          <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucune discussion</h5>
          <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos discussions apparaîtront ici.</div>
        </div>
      </div>
    </div>

    <Message ref="message" v-if="selectedDiscussion" :discussion="selectedDiscussion" @hideDiscussion="hideDiscussionChild" @updateDiscussions="updateDiscussionsChild"></Message>
  </main>
</template>

<style scoped src="../assets/css/listmessages.css"></style>


<script>
import { useMainStore } from '../stores/useMainStore.js';
import LottieJSON from '../assets/lottie/message.json';
import Message from '../components/Message.vue';

export default {
  name: 'ListMessages',
  components: {
    Message
  },
  data() {
    const mainStore = useMainStore();

    return {
      discussionId: this.$route.params.discussionId,
      userId: this.$route.params.userId,
      picture: this.$route.params.picture,
      pseudo: this.$route.params.pseudo,
      firstname: this.$route.params.firstname,
      lastname: this.$route.params.lastname,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: mainStore.getUser,
      LottieJSON: LottieJSON,
      discussions: [],
      selectedDiscussion: null,
      loading: true,
      searchTerm: "",
    };
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");
    
    this.loadDiscussions();
  },
  mounted() {
    this.pusher = new Pusher('55da4c74c2db8041edd6', { cluster: 'eu' });
    const channel = this.pusher.subscribe("discussion_channel");

    channel.bind("new_message", (data) => {
      if (data.message.fromUser != this.user.id && this.selectedDiscussion) {
        if (data.discussionId === this.selectedDiscussion.id) {
          this.selectedDiscussion.messages = this.selectedDiscussion.messages.filter(message => !message.writing);

          if (!("stopWriting" in data.message)) {
            this.selectedDiscussion.messages.push(data.message);
            this.$refs.message.scrollToBottomWithTimeout();
            this.$refs.message.seenDiscussion();
          }
        }
        
        window.cordova.plugin.http.get(`${this.baseUrl}/user/api/discussions`, {}, { Authorization: `Bearer ${this.token}` }, (response) => {
          this.discussions = JSON.parse(response.data);
        }, (response) => {
          console.error(response.error);
        });
      }
    });
  },
  beforeDestroy() {
    this.pusher.unsubscribe("discussion_channel");
  },
  computed: {
    filteredDiscussions() {
      return this.discussions.filter(discussion => {
        const search = this.searchTerm.toLowerCase();

        if (discussion.user.id === this.user.id) {
          return discussion.vendor.vendor.pseudo.toLowerCase().includes(search);
        } else {
          return discussion.user.firstname.toLowerCase().includes(search) || discussion.user.lastname.toLowerCase().includes(search);
        }
      });
    },
  },
  methods: {
    loadDiscussions() {
      window.cordova.plugin.http.get(`${this.baseUrl}/user/api/discussions`, {}, { Authorization: `Bearer ${this.token}` }, (response) => {
        this.discussions = JSON.parse(response.data);
        this.loading = false;

        this.discussions.forEach(discussion => {
          if (this.userId && (this.userId === discussion.user.id || this.userId === discussion.vendor.id)) {
            this.selectedDiscussion = discussion;
          }
          if (this.discussionId && this.discussionId === discussion.id) {
            this.selectedDiscussion = discussion;
          }
        });

        if (this.userId && !this.selectedDiscussion) {
          this.selectedDiscussion = this.pseudo
            ? { id: null, user: { id: this.user.id }, vendor: { id: this.userId, picture: this.picture, vendor: { pseudo: this.pseudo }}, messages: [] }
            : { id: null, user: { id: this.userId, firstname: this.firstname, lastname: this.lastname, picture: this.picture }, vendor: { id: this.user.id }, messages: [] };
        }
      }, (response) => {
        console.error(response.error);
      });
    },
    goBack() {
      window.plugins.nativepagetransitions.slide({
        direction: 'right',
        duration: 400,
      });
      this.$router.push({ name: 'Account' });
    },
    isUserOnline(discussion) {
      const datetime = discussion.user.id === this.user.id
        ? discussion.vendor.securityUsers[0].connectedAt
        : discussion.user.securityUsers[0].connectedAt;

      return new Date(datetime) > new Date(Date.now() - 5 * 60 * 1000);
    },
    showDiscussion(discussion) {
      this.selectedDiscussion = discussion;
    },
    hideDiscussionChild() {
      this.selectedDiscussion = null;
    },
    updateDiscussionsChild(discussions) {
      this.discussions = discussions;
    }
  }
};
</script>
