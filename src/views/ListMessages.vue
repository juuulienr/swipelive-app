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
      <div v-if="discussions && discussions.length > 0">
        <div>
          <div class="chat--left--head--input">
            <svg viewBox="0 0 24 24" class="css-1q8h0dm iconify iconify--eva">
              <path fill="currentColor" d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6z"></path>
            </svg>
            <input type="text" v-model="searchTerm" placeholder="Rechercher"/>
          </div>
        </div>


        <div class="chat--left" style="overflow: hidden;">
          <div v-for="(discussion, index) in filteredDiscussions" @touchstart="startSwipe(discussion.id)" @touchmove="swipeMove" @touchend="endSwipe(index)" class="chat--left--messages">
            <div class="chat--left--message message--open">
              <div @click="showDiscussion(discussion)" class="chat--left--head--profil">
                <span v-if="discussion.user.id == user.id">
                  <img v-if="discussion.vendor.picture" :src="cloudinary256x256 + discussion.vendor.picture">
                  <img v-else :src="require(`@/assets/img/no-preview.jpg`)">
                </span>
                <span v-else>
                  <img v-if="discussion.user.picture" :src="cloudinary256x256 + discussion.user.picture">
                  <img v-else :src="require(`@/assets/img/no-preview.jpg`)">
                </span>
                <!-- <span class="online"></span> -->
              </div>
              <div @click="showDiscussion(discussion)" class="chat--left--message--detail">
                <div class="chat--left--message--top">
                  <h6 v-if="discussion.user.id == user.id">{{ discussion.vendor.vendor.businessName }}</h6>
                  <h6 v-else>{{ discussion.user.firstname }} {{ discussion.user.lastname }}</h6>
                  <span v-if="discussion.user.id == user.id && discussion.unseen" class="not--read"></span>
                  <span v-if="discussion.vendor.id == user.id && discussion.unseenVendor" class="not--read"></span>
                </div>
                <p v-if="discussion.updatedAt">{{ discussion.preview | truncate(35) }} · {{ discussion.updatedAt }}</p>
                <p v-else>{{ discussion.preview | truncate(35) }} · {{ discussion.createdAt }}</p>
              </div>
              <div v-if="swipeIndex === discussion.id && swipeStatus === 'left'" @click="deleteDiscussion(index)" class="delete-swipe" :style="{width: swipeDistance + 'px'}" style="height: 56px;background: #ff453b;">
                <div style="color: white;font-weight: 400;font-size: 13px;text-align: center; padding: 19px 10px 0px;">Supprimer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-else> -->
    <!--     <div class="container" style="margin: 100px auto 0px; text-align: center;">
          <video style="height: 220px; width: 220px; background: white;" webkit-playsinline="true" playsinline="playsinline" class="vjs-tech" loop="" muted="muted" autoplay="" :src="require(`@/assets/video/message.mp4`)" poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></video>
        </div>
        <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 30px;">Aucune discussion</h5>
        <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos discussions apparaîtront ici.</div>
      </div> -->
    </div>

    <Message ref="message" v-if="selectedDiscussion" :discussion="selectedDiscussion" @hideDiscussion="hideDiscussionChild" @updateDiscussions="updateDiscussionsChild"></Message>
  </main>
</template>

<style scoped src="../assets/css/listmessages.css"></style>


<script>

import Message from '../components/Message';

export default {
  name: 'ListMessages',
  components: {
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
      user: JSON.parse(window.localStorage.getItem("user")),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      discussions: [],
      selectedDiscussion: null,
      searchTerm: "",
      swipeStatus: '',
      swipeIndex: null,
      swipeStartX: 0,
      swipeEndX: 0,
      swipeDistance: 0
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();

    if (this.userId) {
      this.selectedDiscussion = { "id": null, "user": { "id": this.user.id }, "vendor": {"id": this.userId, "picture": this.picture, "vendor": { "businessName": this.businessName }}, "messages": [] };
    } else {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/discussions", {}, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(response);
        this.discussions = JSON.parse(response.data);
        this.discussions.map((discussion, index) => {
          if (this.discussionId && discussion.id == this.discussionId) {
            this.selectedDiscussion = discussion;
          }
        });
      }, (response) => {
        console.log(response.error);
      });
    }


    this.pusher = new Pusher('55da4c74c2db8041edd6', { cluster: 'eu' });
    var channel = this.pusher.subscribe("discussion_channel");

    channel.bind("new_message", (data) => {
      console.log(data);
      console.log(data.message);

      if (data.message.fromUser != this.user.id) {
        const conversation = this.discussions.find(d => d.id === data.discussionId);
        if (!conversation) return;

        if (conversation.id === this.selectedDiscussion.id) {
          conversation.messages.push(data.message);
          this.$refs.message.scrollToBottom();
        }
      }
    });

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
    }
  },
  computed: {
    filteredDiscussions() {
      return this.discussions.filter(discussion => {
        const search = this.searchTerm.toLowerCase();
        if (discussion.user.id == this.user.id) {
          return (discussion.vendor.vendor.businessName.toLowerCase().includes(search));
        } else {
          return (discussion.user.firstname.toLowerCase().includes(search) || discussion.user.lastname.toLowerCase().includes(search));
        }
      });
    }
  },
  methods: {
    startSwipe(id) {
      this.swipeIndex = id;
      this.swipeStartX = event.touches[0].clientX;
    },
    swipeMove(event) {
      this.swipeEndX = event.touches[0].clientX;
      this.swipeDistance = this.swipeStartX - this.swipeEndX;
      if (this.swipeDistance > 60) {
        this.swipeStatus = 'left';
        this.swipeDistance = 130;
      }
    },
    endSwipe(index) {
      if (this.swipeDistance > 250) {
        this.deleteDiscussion(index);
      } else if (this.swipeDistance < 60) {
        this.swipeStatus = '';
        this.swipeIndex = null;
        this.swipeStartX = 0;
        this.swipeEndX = 0;
        this.swipeDistance = 0;
      } else {
        this.swipeDistance = 130;
      }
    },
    deleteDiscussion(index) {
      var discussionId = this.discussions[index].id;
      this.discussions.splice(index, 1);

      window.cordova.plugin.http.delete(this.baseUrl + "/user/api/discussions/" + discussionId + "/delete", {}, { Authorization: "Bearer " + this.token }, (response) => {
        console.log(response);
      }, (response) => {
        console.log(response.error);
      });
    },
    showDiscussion(discussion) {
      this.selectedDiscussion = discussion;
    },
    goBack() {
      this.$router.push({ name: 'Account' });
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

