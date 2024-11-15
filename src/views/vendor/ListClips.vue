<template>
  <main class="products">
    <div class="checkout__header" style="padding: 5px 10px 15px 10px;">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Replays</div>
    </div>

    <div class="checkout__body">
      <div class="images">
        <div v-if="clips.length" class="row" style="margin: 0px;">
          <div v-for="(clip, index) in clips" class="col-6 col-img" style="padding: 5px;">
            <div v-if="clip.status == 'available'">
              <img v-if="clip.preview" :src="$amazonS3 + clip.preview" style="border-radius: 10px; width: 100%; height: 300px; object-fit: cover; background: #eeeeee;">
              <div v-else style="border-radius: 10px; width: 100%; height: 300px; object-fit: cover; background: #eeeeee;"></div>
              <div @click="actionSheet(clip.id, index)" class="photo-box__delete-button" style="z-index: 20;right: 15px;top: 15px;">
                <img src="/img/ellipsis-h-white.svg" style="width: 30px; height: 30px; margin-top: -5px; filter: drop-shadow(rgb(34, 34, 34) 0px 0px 1px);"/>
              </div>
              <div style="background-image: linear-gradient(180deg, transparent 80%, rgba(0, 0, 0, 0.25)); border-radius: 10px; height: 300px; position: absolute; z-index: 10; width: calc(100% - 10px); bottom: 5px;"></div>
              <div class="product--item" style="flex-direction: row;position: absolute;bottom: 15px;z-index: 10000000;left: calc(25vw - 27.5px);">
                <img v-if="clip.product.uploads.length" :src="$cloudinary256x256 + clip.product.uploads[0].filename" style="line-height: 0;display: block;border-radius: 10px;width: 48px;height: 48px;border: 1px solid #ddd !important; background: #eeeeee;">
                <img v-else src="/img/no-preview.png" style="line-height: 0;display: block;border-radius: 10px;width: 48px;height: 48px;border: 1px solid #ddd !important; background: #eeeeee;">
              </div>
            </div>
            <div v-else style="border-radius: 10px; width: calc(50vw - 25px); margin: 0 auto;">
              <img src="/img/waiting-clip.jpg" style="border-radius: 10px; width: 100%; height: 300px; object-fit: cover; background: #eeeeee;">
              <p style="top: 150px; color: white; text-align: center; left: 30Px; position: absolute; text-align: center; font-size: 15px; margin-bottom: 0px;">Replay en création</p>
            </div>
          </div>
        </div>
        <div v-else-if="loading">
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
          <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Aucun replay</h5>
          <div style="font-weight: 400;font-size: 15px;text-align: center;">Vos replays apparaîtront ici.</div>
        </div>
      </div>
    </div>
  </main>
</template>



<script>
import { useMainStore } from '../../stores/useMainStore.js';
import LottieJSON from '../../assets/lottie/replay.json';

export default {
  name: 'ListClips',
  data() {
    const mainStore = useMainStore();

    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: mainStore.getUser,
      LottieJSON: LottieJSON,
      clips: [],
      loading: true,
    };
  },
  created() {    
    this.loadClips();
  },
  methods: {
    async loadClips() {
      try {
        const response = await this.$CapacitorHttp.get({
          url: `${this.baseUrl}/user/api/clips`,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.clips = response.data;
        this.loading = false;
      } catch (error) {
        console.error('Erreur lors du chargement des clips :', error);
      }
    },
    async actionSheet(id, clipIndex) {
      try {
        // Affiche le menu d'action
        const result = await this.$ActionSheet.showActions({
          title: 'Que souhaitez-vous faire ?',
          options: [
            { title: 'Partager', icon: 'share-outline' },
            { title: 'Supprimer', style: 'destructive' },
            { title: 'Annuler', style: 'cancel' },
          ],
        });

        if (result.index === 0) {
          // Partage via Capacitor Share
          await this.$Share.share({
            title: '#1 Application de Live Shopping',
            text: 'Découvrez Swipe Live !',
            url: 'https://swipelive.app',
            dialogTitle: 'Partager',
          });
        } else if (result.index === 1) {
          // Supprime l'élément du tableau
          this.clips.splice(clipIndex, 1);

          // Requête HTTP pour supprimer le clip
          try {
            const response = await this.$CapacitorHttp.get({
              url: `${this.baseUrl}/user/api/clips/${id}/delete`,
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            });
            console.log('Clip supprimé avec succès :', response);
          } catch (error) {
            console.error('Erreur lors de la suppression du clip :', error);
          }
        }
      } catch (error) {
        console.error('Erreur lors de l\'action sheet :', error);
      }
    },
    goBack() {
      this.$router.push({ name: 'Account' });
    },
  }
};
</script>