<template>
  <main class="products" style="padding: 0px">
    <div v-if="!selectedDiscussion" class="checkout__header" style="padding-right: 20px; padding-left: 20px;">
      <div class="checkout__title">Messagerie</div>
    </div>

    <div v-if="!selectedDiscussion" class="checkout__body" style="padding: 0px 15px 15px;">
      <div>
        <div>
          <div class="chat--left--head--input">
            <svg viewBox="0 0 24 24" class="css-1q8h0dm iconify iconify--eva">
              <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
            </svg>
            <input type="text" v-model="searchTerm" placeholder="Rechercher"/>
          </div>
        </div>


        <div v-if="discussions.length" class="chat--left" style="overflow: hidden;">
          <div v-for="(discussion, index) in filteredDiscussions" class="chat--left--messages">
            <div @click="showDiscussion(discussion)" class="chat--left--message message--open">
              <div class="chat--left--head--profil">
                <span v-if="discussion.user.id == user.id">
                  <img v-if="discussion.vendor.picture" :src="cloudinary256x256 + discussion.vendor.picture">
                  <img v-else :src="require(`@/assets/img/anonyme.jpg`)">
                </span>
                <span v-else>
                  <img v-if="discussion.user.picture" :src="cloudinary256x256 + discussion.user.picture">
                  <img v-else :src="require(`@/assets/img/anonyme.jpg`)">
                </span>
                <span v-if="isUserOnline(discussion)" class="online"></span>
              </div>
              <div class="chat--left--message--detail">
                <div class="chat--left--message--top">
                  <h6 v-if="discussion.user.id == user.id">{{ discussion.vendor.vendor.businessName }}</h6>
                  <h6 v-else>{{ discussion.user.firstname }} {{ discussion.user.lastname }}</h6>
                  <span v-if="discussion.user.id == user.id && discussion.unseen" class="not--read"></span>
                  <span v-if="discussion.vendor.id == user.id && discussion.unseenVendor" class="not--read"></span>
                </div>
                <p>{{ discussion.preview | truncate(35) }} · {{ discussion.updatedAt | formatDate }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="loadingDiscussions">
          <div class="loader2">
            <span></span>
          </div>
        </div>
        <div v-else>
          <div class="container" style="margin: 180px auto 0px; text-align: center;">
            <div style="margin: 0px auto;">
              <Lottie :options="defaultOptions" :width="200"/>
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

import Lottie from 'vue-lottie';
import * as animationData from '../assets/lottie/message.json';

import Message from '../components/Message';

export default {
  name: 'ListMessages',
  components: {
    Lottie,
    Message
  },
  data() {
    return {
      discussionId: this.$route.params.discussionId,
      userId: this.$route.params.userId,
      picture: this.$route.params.picture,
      businessName: this.$route.params.businessName,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: this.$store.getters.getUser,
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      defaultOptions: {animationData: animationData},
      discussions: [],
      selectedDiscussion: null,
      loadingDiscussions: true,
      searchTerm: "",
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");
  },
  mounted() {
    this.loadDiscussions();

    this.pusher = new Pusher('55da4c74c2db8041edd6', { cluster: 'eu' });
    var channel = this.pusher.subscribe("discussion_channel");

    channel.bind("new_message", (data) => {
      console.log(data.message.fromUser != this.user.id);
      console.log(this.selectedDiscussion);

      if (data.message.fromUser != this.user.id && this.selectedDiscussion) {
        if (data.discussionId == this.selectedDiscussion.id) {
          this.selectedDiscussion.messages.map((message, index) => {
            if (message.writing) {
              this.selectedDiscussion.messages.splice(index, 1);
            }
          });

          if (!("stopWriting" in data.message)) {
            this.selectedDiscussion.messages.push(data.message);
            this.$refs.message.scrollToBottomWithTimeout();
            this.$refs.message.seenDiscussion();
          }
        }
      }

      window.cordova.plugin.http.get(this.baseUrl + "/user/api/discussions", {}, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(response);
        this.discussions = JSON.parse(response.data);
      }, (response) => {
        console.log(response.error);
      });
    });
  },
  beforeDestroy() {
    this.pusher.unsubscribe("discussion_channel");
  },
  filters: {
    truncate(text, length) {
      if (text.length > length) {
        let truncatedText = text.substring(0, length);
        const lastSpaceIndex = truncatedText.lastIndexOf(' ');
        if (lastSpaceIndex !== -1) {
          truncatedText = truncatedText.substring(0, lastSpaceIndex);
        }
        return truncatedText + '...'
      }
      return text
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
  computed: {
    filteredDiscussions() {
      return this.discussions.filter(discussion => {
        const search = this.searchTerm.toLowerCase();

        if (discussion.user.id == this.user.id) {
          return discussion.vendor.vendor.businessName.toLowerCase().includes(search);
        } else {
          return (discussion.user.firstname.toLowerCase().includes(search) || discussion.user.lastname.toLowerCase().includes(search));
        }
      });
    },
  },
  methods: {
    loadDiscussions() {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/discussions", {}, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(response);
        this.discussions = JSON.parse(response.data);
        this.loadingDiscussions = false;

        if (this.userId && this.discussions.length > 0) {
          this.discussions.map((discussion, index) => {
            if (this.userId == discussion.user.id || this.userId == discussion.vendor.id) {
              this.selectedDiscussion = discussion;
            }
          });

          if (!this.selectedDiscussion) {
            this.selectedDiscussion = { "id": null, "user": { "id": this.user.id }, "vendor": {"id": this.userId, "picture": this.picture, "vendor": { "businessName": this.businessName }}, "messages": [] };
          }
        }
      }, (response) => {
        console.log(response.error);
      });
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
    isUserOnline(discussion) {
      if (discussion.user.id == this.user.id) {
        var datetime = discussion.vendor.securityUsers[0].connectedAt;
      } else {
        var datetime = discussion.user.securityUsers[0].connectedAt;
      }

      var date = new Date(datetime);
      var date2 = new Date(Date.now() - 5 * 60 * 1000);

      return date > date2;
    },
    showDiscussion(discussion) {
      this.selectedDiscussion = discussion;
    },
    hideDiscussionChild() {
      this.selectedDiscussion = null;
    },
    updateDiscussionsChild(discussions) {
      this.discussions = discussions;
    },
  }
};

</script>

