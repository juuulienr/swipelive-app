<template>
  <main class="products shop_3" style="padding: 0px">
    <div class="checkout__header" style="padding: 5px 20px 15px;">
      <div class="checkout__close-btn" @click="goBack()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Swipe Roulette</div>
      <div class="checkout__right-btn" @click="showInfos()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 22px; height: 22px; fill: rgb(0, 132, 255);">
          <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm0-338c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/>
        </svg>
      </div>
    </div>


    <div v-if="winners && winners.length > 0" class="checkout__body items" style="padding-top: 0px">
      <img src="/img/swipe-wheel.png" style="width: 100%; height:300px;">
      <div style="position: absolute; width: 100%; z-index: 100000; background: white; top: 323px; border-radius: 30px;">
        <div class="top-author--container" style="border-radius: 10px; border: 2px solid #68dfb9; margin: 15px; background: #68dfb924; margin: 20px 15px 0px !important;">
          <div class="top-author--item">
            <img src="/img/anonyme.jpg"/>
            <div>
              <span style="font-weight: 500; font-size: 15px;">Julien REIGNIER</span>
            </div>
            <span class="css-4ioo3c" style="color: #68dfb9; background-color: #effbf7; font-weight: 600; font-size: 17px;">10,52€</span>
          </div>
        </div>

        <div class="top-author--container" style="margin: 0px 15px !important;">
          <div class="top-author--item">
            <img src="/img/anonyme.jpg"/>
            <div>
              <span style="font-weight: 500; font-size: 15px;">Julien REIGNIER</span>
            </div>
            <span class="css-4ioo3c" style="color: #272c30; font-weight: 500; font-size: 17px; background: white;">10,52€</span>
          </div>
        </div>
      </div>
    </div>   
    <div v-else>
      <div class="container" style="margin: 120px auto 0px; text-align: center;">
        <div style="margin: 0px auto;">
          <Vue3Lottie :animationData="LottieJSON" :width="200"/>
        </div>
        <h5 style="font-weight: 500; font-size: 20px;text-align: center; margin-bottom: 8px; margin-top: 30px;">Swipe Roulette</h5>
        <div style="font-weight: 400;font-size: 15px;text-align: center;">La Swipe Roulette sera bientôt disponible 😉</div>
      </div>
    </div>


    <!-- popup infos -->
    <div v-if="popupInfos" class="store-products-item__login-popup store-products-item__login-popup--active" style="height: 100%; border-radius: 0px; overflow: scroll;">
      <div class="checkout__header" style="padding: 5px 15px 15px; z-index: 10000000; background: white; width: 100%;">
        <div class="checkout__close-btn" @click="hideInfos()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
          </svg>
        </div>
        <div class="checkout__title">Règle du jeu</div>
      </div>
      <div class="checkout__body info-wheel" style="overflow: scroll; padding: 15px 20px 50px;">
        <div class="container" style="text-align: center;">
          <h4 style="margin-top: 0px; margin-bottom: 50px;">Et si acheter devient un jeu ?</h4>
        </div>
        
        <h4>Swipe Roulette</h4>

        <p>La Swipe Roulette est un jeu qui selectionne au hasard une commande réalisée dans l'application. Cette commande sera remboursée à l'utilisateur.</p>

        <h4>Principes et modalités du jeu 🎉</h4>

        <p>Tous les 500 commandes faites sur Swipe Live, la roulette tourne et rembourse une commande directement sur la carte bancaire utilisée lors de l'achat.</p>
        <p>- Les gagnants recevrons une notification directement sur l'application Swipe Live.</p>

        <h4>Quelles commandes peuvent être tirées au sort ? 🛍</h4>

        <p>Toutes les commandes effectués sur l'application Swipe Live sont éligibles. <br> Il n'y a aucune limite sur le nombre de fois qu'un utilisateur peut gagner. <br> Swipe Live se réserve toutefois le droit de procéder à toute vérification utile à l'application des règles du jeu, notamment afin de disqualifier les participants ayant procédé à une manoeuvre frauduleuse ou abusive.</p>

        <h4>Limite de remboursement 💳</h4>

        <p>Lorsqu'une commande est tirée au sort, alors son montant total est remboursé par Swipe Live dans la limite de 50€. <br> Ex: Si un utilisateur dépense par exemple 100€ et que sa commande est tiré au sort, il gagnera 50€.</p>

        <h4>Quelles commandes peuvent être tirées au sort ? 🛍</h4>

        <p>Toutes les commandes effectués sur l'application Swipe Live sont éligibles. <br> Il n'y a aucune limite sur le nombre de fois qu'un utilisateur peut gagner. <br> Swipe Live se réserve toutefois le droit de procéder à toute vérification utile à l'application des règles du jeu, notamment afin de disqualifier les participants ayant procédé à une manoeuvre frauduleuse ou abusive.</p>

        <h4>Limite de remboursement 💳</h4>

        <p>Lorsqu'une commande est tirée au sort, alors son montant total est remboursé par Swipe Live dans la limite de 50€. <br> Ex: Si un utilisateur dépense par exemple 100€ et que sa commande est tiré au sort, il gagnera 50€.</p>
      </div>
    </div>
  </main>
</template>


<script>
import LottieJSON from '../assets/lottie/gift.json';

export default {
  data() {
    return {
      baseUrl: localStorage.getItem("baseUrl"),
      winners: [],
      popupInfos: false,
      LottieData: LottieJSON
    };
  },
  methods: {
    showInfos() {
      this.$Haptics.impact({ style: 'medium' });
      this.popupInfos = true;
    },
    hideInfos() {
      this.popupInfos = false;
    },
    goBack() {
      this.$Haptics.impact({ style: 'medium' });
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.info-wheel p {
  font-size: 14px;
  font-weight: 400;
}

.info-wheel h4 {
  margin-top: 25px;
  font-size: 18px;
  margin-bottom: 15px;
}

.pane {
  display: none;
}
</style>