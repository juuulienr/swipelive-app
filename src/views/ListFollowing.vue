<template>
  <main class="products" style="padding: 0px 15px">
    <div class="checkout__header">
      <div class="checkout__close-btn" @click="goBack()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div v-if="user.vendor" class="checkout__title">Communauté</div>
      <div v-else class="checkout__title">Abonnements</div>
    </div>

    <div class="checkout__body">
      <div v-if="user.vendor">
        <div class="profile--follow" style="border: 1px solid #ddd !important; margin: 15px 5px 25px; padding: 12px 0px;">
          <div style="border-right: 1px solid #eff1f6;">
            <h4 v-if="followers.length">{{ followers.length }}</h4>
            <h4 v-else>0</h4>
            <p v-if="followers.length > 1">Abonnés</p>
            <p v-else>Abonné</p>
          </div>
          <div>
            <h4 v-if="following.length">{{ following.length }}</h4>
            <h4 v-else>0</h4>
            <p>Suivis</p>
          </div>
        </div>

        <div class="images_filter" style="margin: 15px 0px;">
          <ul>
            <li v-bind:class="{active: tabFollowers}" :style="[tabFollowers ? {'color': '#ff2f80'} : {'color': '#525c66'}]"  @click="showFollowers()">Abonnés </li>
            <li v-bind:class="{active: tabFollowing}" :style="[tabFollowing ? {'color': '#ff2f80'} : {'color': '#525c66'}]"  @click="showFollowing()">Suivis </li>
          </ul>
        </div>

        <div v-if="tabFollowers" class="top-author">
          <div v-if="followers.length" class="top-author--container">
            <div v-for="(user, index) in followers" class="top-author--item">
              <img v-if="user.picture" class="user" :src="$cloudinary256x256 + user.picture">
              <img v-else class="user" src="/img/anonyme.jpg">
              <div>
                <span v-if="user.vendor">{{ user.vendor.pseudo }}</span>
                <span v-else>{{ user.firstname }} {{ user.lastname }}</span>
              </div>
              <div @click="actionSheet(user, index)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 20px; height: 20px; fill: #999; border-radius: 30px;">
                  <path d="M400 256c0 26.5 21.5 48 48 48s48-21.5 48-48S474.5 208 448 208S400 229.5 400 256zM112 256c0-26.5-21.5-48-48-48S16 229.5 16 256S37.5 304 64 304S112 282.5 112 256zM304 256c0-26.5-21.5-48-48-48S208 229.5 208 256S229.5 304 256 304S304 282.5 304 256z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div v-else-if="loadingFollowers">
            <div class="loader2">
              <span></span>
            </div>
          </div>
          <div v-else>
            <div class="container" style="margin: 120px auto 0px; text-align: center;">
              <div style="margin: 0px auto;">
                <!-- <Vue3Lottie :animationData="LottieJSON" :width="200"/> -->
              </div>
            </div>
            <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun abonné</h5>
            <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos abonnés apparaîtront ici.</div>
          </div>
        </div>

        <div v-if="tabFollowing" class="top-author">
          <div v-if="following.length" class="top-author--container">
            <div v-for="(user, index) in following" class="top-author--item">
              <img v-if="user.picture"class="user" :src="$cloudinary256x256 + user.picture">
              <img v-else class="user" src="/img/anonyme.jpg">
              <div>
                <span>{{ user.vendor.pseudo }}</span>
                <div>
                  <span v-if="user.followers.length > 1">{{user.followers.length }} abonnés</span>
                  <span v-else>{{user.followers.length }} abonné</span>
                </div>
              </div>
              <div class="btn-follow" style="color: #ff2f80; border: 1px solid #ff2f80; background: white;" @click="unfollow(user, index)">Se désabonner</div>
            </div>
          </div>
          <div v-else-if="loadingFollowing">
            <div class="loader2">
              <span></span>
            </div>
          </div>
          <div v-else>
            <div class="container" style="margin: 120px auto 0px; text-align: center;">
              <div style="margin: 0px auto;">
                <!-- <Vue3Lottie :animationData="LottieJSON" :width="200"/> -->
              </div>
            </div>
            <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun abonnement</h5>
            <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos abonnements apparaîtront ici.</div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="top-author" style="margin-top: 15px;">
          <div v-if="following.length" class="top-author--container">
            <div v-for="(user, index) in following" class="top-author--item">
              <img v-if="user.picture"class="user" :src="$cloudinary256x256 + user.picture">
              <img v-else class="user" src="/img/anonyme.jpg">
              <div>
                <span>{{ user.vendor.pseudo }}</span>
                <div>
                  <span v-if="user.followers.length > 1">{{user.followers.length }} abonnés</span>
                  <span v-else>{{user.followers.length }} abonné</span>
                </div>
              </div>
              <div class="btn-follow" @click="unfollow(user, index)">Se désabonner</div>
            </div>
          </div>
          <div v-else-if="loadingFollowing">
            <div class="loader2">
              <span></span>
            </div>
          </div>
          <div v-else>
            <div class="container" style="margin: 120px auto 0px; text-align: center;">
              <div style="margin: 0px auto;">
                <Vue3Lottie :animationData="LottieJSON" :width="200"/>
              </div>
            </div>
            <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun abonnement</h5>
            <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos abonnements apparaîtront ici.</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import { useMainStore } from '../stores/useMainStore.js';
import Product from '../components/Product.vue';
import LottieJSON from '../assets/lottie/followers.json';

export default {
  name: 'ListFollowing',
  components: {
    Product,
  },
  data() {
    const mainStore = useMainStore();

    return {
      user: mainStore.getUser,
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      LottieJSON: LottieJSON,
      followers: [],
      following: [],
      loadingFollowers: true,
      loadingFollowing: true,
      tabFollowers: true,
      tabFollowing: false,
    };
  },
  created() {
    this.loadFollowers();
    this.loadFollowing();
  },
  methods: {
    async loadFollowers() {
      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/followers`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.followers = response.data;
        this.loadingFollowers = false;
      } catch (error) {
        console.error(error);
      }
    },
    async loadFollowing() {
      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/following`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.following = response.data;
        this.loadingFollowing = false;
      } catch (error) {
        console.error(error);
      }
    },
    async unfollow(follow, index) {
      const mainStore = useMainStore();
      this.$Haptics.impact({ style: 'medium' });
      this.following.splice(index, 1);

      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/follow/${follow.id}`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        const updatedUser = response.data;
        mainStore.setUser(updatedUser);
        this.user = updatedUser;
      } catch (error) {
        console.error(error);
      }
    },
    async removeFollower(user, index) {
      const mainStore = useMainStore();
      this.$Haptics.impact({ style: 'medium' });
      this.followers.splice(index, 1);

      try {
        const response = await this.$CapacitorHttp.request({
          method: 'GET',
          url: `${this.baseUrl}/user/api/followers/remove/${user.id}`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        const updatedUser = response.data;
        mainStore.setUser(updatedUser);
        this.user = updatedUser;
      } catch (error) {
        console.error(error);
      }
    },
    showFollowers() {
      this.$Haptics.impact({ style: 'medium' });
      this.tabFollowers = true;
      this.tabFollowing = false;
    },
    showFollowing() {
      this.$Haptics.impact({ style: 'medium' });
      this.tabFollowers = false;
      this.tabFollowing = true;
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
    async actionSheet(user, index) {
      try {
        const result = await this.$ActionSheet.showActions({
          title: 'Options pour le follower',
          options: [
            { title: 'Supprimer ce follower', style: 'destructive' },
            { title: 'Annuler', style: 'cancel' },
          ],
        });

        if (result.index === 0) {
          this.removeFollower(user, index);
        }
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>

<style scoped src="../assets/css/listfollowing.css"></style>
