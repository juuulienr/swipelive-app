<template>
  <main class="my_profile1" style="padding: 0px 15px 15px;">
    <div class="checkout__header" style="padding: 5px 5px 15px 5px; z-index: 10000000;">
      <div @click="goBack()" class="checkout__close-btn" style="position: absolute; left: initial; top: 0px; padding: 6px 0px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="width: 20px; height: 20px; fill: #000;">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title" style="font-weight: 500; margin-bottom: 0px; color: rgb(0, 0, 0); font-size: 18px;">Profil</div>
    </div>

    <div class="checkout__body" style="overflow: scroll; padding-bottom: 50px;">
      <div v-if="user" class="top-author--container" style="padding: 0px;">
        <div class="top-author--item">
          <img @click="goEditProfile()" v-if="user.picture" :src="cloudinary256x256 + user.picture" class="user" style="margin: 5px; width: 80px; height: 80px;">
          <img @click="goEditProfile()" v-else class="user" :src="require(`@/assets/img/anonyme.jpg`)" style="margin: 5px; width: 80px; height: 80px;">
          <div>
            <span v-if="user.vendor" style="font-size: 16px; font-weight: 500;">{{ user.vendor.businessName }}
              <svg viewBox="0 0 24 24" aria-label="Compte certifié" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr" style="width: 19px;height: 19Px;margin-bottom: 3px;fill: #ff2773;"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>
            </span>
            <span v-else style="font-size: 16px; font-weight: 500;">{{ user.firstname }} {{ user.lastname }}
              <svg viewBox="0 0 24 24" aria-label="Compte certifié" role="img" class="r-13v1u17 r-4qtqp9 r-yyyyoo r-1xvli5t r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr" style="width: 19px;height: 19Px;margin-bottom: 3px;fill: #ff2773;"><g><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path></g></svg>
            </span>
            <div>
              <span v-if="user.vendor && user.followers.length">{{user.followers.length }} abonnés</span>
              <span v-else-if="user.vendor">0 abonné</span>
              <span v-else>{{user.following.length }} abonnement</span>
            </div>
          </div>
          <div @click="goEditProfile()" style="background-color: #eee; color: #666; text-align: center;width: fit-content;margin: 0px auto;padding: 5px 12px;border-radius: 30px;font-size: 13px;">Modifier</div>
        </div>
      </div>

      <p v-if="user.vendor" class="desc" style="margin: 10px 30px 20px; font-weight: 400; font-size: 14px; color: #1F1D2B; text-align: center;">{{ user.vendor.summary }}</p>

      <div v-if="user" class="info_profile">
        <div v-if="user.vendor" @click="goPrelive()" class="btn-follow">
          <div class="btn-swipe" style="color: white; text-align: center; width: fit-content; background: #ff2773; margin: 0px auto; padding: 14px 48px; border-radius: 11px; margin-bottom: 25px; font-weight: 500">Lancer un direct</div>
        </div>
        <div v-else class="btn-follow" style="display: flex; margin-top: 20px;">
          <div @click="goToVendorRegistration()" class="btn-swipe" style="color: white; text-align: center; width: fit-content; background: rgb(255, 39, 115); padding: 10px 20px; border-radius: 10px; font-weight: 500; font-size: 14px; margin: 0px; width: calc(50vw - 25px); margin-right: 20px;">Devenir vendeur</div>
          <div class="btn-swipe" disabled style="color: white; text-align: center; width: fit-content; background: rgb(0, 132, 255); padding: 10px 20px; border-radius: 16px; font-weight: 500; font-size: 14px; border-radius: 10px; margin: 0px; width: calc(50vw - 25px);">Devenir influenceur</div>
        </div>

        <div v-if="user.vendor" class="profile--follow" style="box-shadow: 0 0 5px rgb(0 0 0 / 20%); margin: 5px; padding: 12px 0px;">
          <div>
            <h4 v-if="nbProducts">{{ nbProducts }}</h4>
            <h4 v-else>-</h4>
            <p v-if="nbProducts > 1">Articles</p>
            <p v-else>Article</p>
          </div>
          <hr>
          <div>
            <h4 v-if="user.vendor.lives.length">{{ user.vendor.lives.length }}</h4>
            <h4 v-else>-</h4>
            <p v-if="user.vendor.lives.length > 1">Lives</p>
            <p v-else>Live</p>
          </div>
          <hr>
          <div>
            <h4 v-if="user.vendor.sales.length">{{ user.vendor.sales.length }}</h4>
            <h4 v-else>-</h4>
            <p v-if="user.vendor.sales.length > 1">Commandes</p>
            <p v-else>Commande</p>
          </div>
        </div>
        <div v-else class="profile--follow" style="box-shadow: 0 0 5px rgb(0 0 0 / 20%); margin: 5px; padding: 12px 0px; margin-top: 25px;">
          <div>
            <h4>-</h4>
            <p>Favoris</p>
          </div>
          <hr>
          <div>
            <h4 v-if="user.following.length">{{ user.following.length }}</h4>
            <h4 v-else>-</h4>
            <p>Abonnement</p>
          </div>
        </div>
      </div>

      <ul class="listbrands mb-3" style="margin-top: 30px;">
        <li v-if="user.vendor" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 16px; margin: 12px auto;">
          <router-link :to="{ name: 'Shop' }">
            <span style="font-size: 16px; color: #333;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512" style="width: 28px; height: 28px; margin-right: 12px;">
                <path d="M547.69,286.8a102.1,102.1,0,0,0,16.4-3.6V480a32,32,0,0,1-32,32H84a32,32,0,0,1-32-32V283.2a125.89,125.89,0,0,0,16.4,3.6,135.49,135.49,0,0,0,18,1.2,132.81,132.81,0,0,0,29.51-3.8V384H500V284.2a127.12,127.12,0,0,0,29.51,3.8A138.38,138.38,0,0,0,547.69,286.8Z" class="fa-secondary"></path><path d="M602,118.6c33.6,53.6,3.8,128-59,136.4a102.9,102.9,0,0,1-13.7.9,99.08,99.08,0,0,1-73.81-33.1A98.83,98.83,0,0,1,316,230.88a96.26,96.26,0,0,1-8.08-8.08,98.9,98.9,0,0,1-139.62,8,97.4,97.4,0,0,1-8-8,98.75,98.75,0,0,1-73.81,33.1,104.6,104.6,0,0,1-13.7-.9C10.12,246.5-19.58,172.1,14,118.6L78.83,15A32,32,0,0,1,106,0H510a32,32,0,0,1,27.07,15Z" class="fa-primary"></path>
              </svg>
            </span>
            <span style="font-weight: 500; color: rgb(99, 115, 129);"> Ma Boutique</span>
            <span style="float: right;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 16px; height: 16px; margin-top: 1px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </span>
          </router-link>
        </li>
        <li style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 16px; margin: 12px auto;">
          <router-link :to="{ name: 'ListOrders' }">
            <span style="font-size: 16px; color: #333;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512" style="width: 28px; height: 28px; margin-right: 12px;"><path d="M242.82 38.12a32 32 0 0 0-44.7 7.06L91.34 192h79.14l79.4-109.18a32 32 0 0 0-7.06-44.7zm135.06 7.06a32 32 0 1 0-51.76 37.64L405.52 192h79.14z" class="fa-secondary"/><path d="M552 192H24a24 24 0 0 0-24 24v16a24 24 0 0 0 24 24h8l26.11 182.79A48 48 0 0 0 105.63 480h364.74a48 48 0 0 0 47.52-41.21L544 256h8a24 24 0 0 0 24-24v-16a24 24 0 0 0-24-24zM200 392a24 24 0 0 1-48 0V280a24 24 0 0 1 48 0zm112 0a24 24 0 0 1-48 0V280a24 24 0 0 1 48 0zm112 0a24 24 0 0 1-48 0V280a24 24 0 0 1 48 0z" class="fa-primary"/></svg>
            </span>
            <span v-if="user.vendor" style="font-weight: 500; color: rgb(99, 115, 129);"> Mes Commandes</span>
            <span v-else style="font-weight: 500; color: rgb(99, 115, 129);"> Mes Achats</span>
            <span style="float: right;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 16px; height: 16px; margin-top: 1px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </span>
          </router-link>
        </li>
        <li v-if="user.vendor" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 16px; margin: 12px auto;">
          <router-link :to="{ name: 'Wallet' }">
            <span style="font-size: 16px; color: #333;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512" style="width: 28px; height: 28px; margin-right: 12px;"><path d="M416 272a32 32 0 1 0 32 32 32 32 0 0 0-32-32zm16-240H64A64 64 0 0 0 0 96a32 32 0 0 0 32 32h48a16 16 0 0 1 0-32h384a16 16 0 0 0 16-16 48 48 0 0 0-48-48z" class="fa-secondary"/><path d="M461.2 128H32A32 32 0 0 1 0 96v320a64 64 0 0 0 64 64h397.2c28 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336a32 32 0 1 1 32-32 32 32 0 0 1-32 32z" class="fa-primary"/></svg>
            </span>
            <span style="font-weight: 500; color: rgb(99, 115, 129);"> Mes Gains</span>
            <span style="float: right;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 16px; height: 16px; margin-top: 1px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </span>
          </router-link>
        </li>
        <li v-if="user.vendor" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 16px; margin: 12px auto;">
          <router-link :to="{ name: 'Partner' }">
            <span style="font-size: 16px; color: #333;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512" style="width: 28px; height: 28px; margin-right: 12px;"></defs><path d="M0 384h64a32 32 0 0 0 32-32V128.2H0zm48-63.9a16 16 0 1 1-16 16 16 16 0 0 1 16-16zM457.3 73.4a31.77 31.77 0 0 0-22.6-9.4h-85.9a32 32 0 0 0-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4a39.78 39.78 0 0 0-2.1 56c12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2a16 16 0 0 1 21.6 23.6l-26.1 23.9L504 313.8a72 72 0 0 1 7.9 7.7V128z" class="fa-secondary"/><path d="M544 128.2v223.9a32 32 0 0 0 32 32h64V128.2zm48 223.9a16 16 0 1 1 16-16 16 16 0 0 1-16 16zm-108.1-13.4L334.6 217.5l-30 27.5a72 72 0 0 1-97.3-106.1L289.1 64h-83.8a31.94 31.94 0 0 0-22.6 9.4L128 128v223.9h18.3l90.5 81.9a64 64 0 0 0 90-9.3l.2-.2 17.9 15.5a37.16 37.16 0 0 0 52.3-5.4l31.4-38.6 5.4 4.4a32 32 0 0 0 45-4.7l9.5-11.7a32.06 32.06 0 0 0-4.6-45.1z" class="fa-primary"/></svg>
            </span>
            <span style="font-weight: 500; color: rgb(99, 115, 129);"> Mes Partenariats</span>
            <span style="float: right;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 16px; height: 16px; margin-top: 1px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </span>
          </router-link>
        </li>
        <li style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 16px; margin: 12px auto;">
          <router-link :to="{ name: 'ListFollowing' }">
            <span style="font-size: 16px; color: #333;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512" style="width: 28px; height: 28px; margin-right: 12px;"></defs><path d="M96 224a64 64 0 1 0-64-64 64.06 64.06 0 0 0 64 64zm480 32h-64a63.81 63.81 0 0 0-45.1 18.6A146.27 146.27 0 0 1 542 384h66a32 32 0 0 0 32-32v-32a64.06 64.06 0 0 0-64-64zm-512 0a64.06 64.06 0 0 0-64 64v32a32 32 0 0 0 32 32h65.9a146.64 146.64 0 0 1 75.2-109.4A63.81 63.81 0 0 0 128 256zm480-32a64 64 0 1 0-64-64 64.06 64.06 0 0 0 64 64z" class="fa-secondary"/><path d="M396.8 288h-8.3a157.53 157.53 0 0 1-68.5 16c-24.6 0-47.6-6-68.5-16h-8.3A115.23 115.23 0 0 0 128 403.2V432a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48v-28.8A115.23 115.23 0 0 0 396.8 288zM320 256a112 112 0 1 0-112-112 111.94 111.94 0 0 0 112 112z" class="fa-primary"/></svg>
            </span>
            <span v-if="user.vendor" style="font-weight: 500; color: rgb(99, 115, 129);"> Mes Abonnés</span>
            <span v-else style="font-weight: 500; color: rgb(99, 115, 129);"> Mes Abonnements</span>
            <span style="float: right;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 16px; height: 16px; margin-top: 1px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </span>
          </router-link>
        </li>
        <li v-if="user.vendor" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 16px; margin: 12px auto;">
          <router-link :to="{ name: 'ClipsVendor' }">
            <span style="font-size: 16px; color: #333;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512" style="width: 28px; height: 28px; margin-right: 12px;"><path d="M525.6 410.2L416 334.7V177.3l109.6-75.6c21.3-14.6 50.4.4 50.4 25.8v256.9c0 25.5-29.2 40.4-50.4 25.8z" class="fa-secondary"/><path d="M0 400.2V111.8A47.8 47.8 0 0 1 47.8 64h288.4a47.8 47.8 0 0 1 47.8 47.8v288.4a47.8 47.8 0 0 1-47.8 47.8H47.8A47.8 47.8 0 0 1 0 400.2z" class="fa-primary"/></svg>
            </span>
            <span style="font-weight: 500; color: rgb(99, 115, 129);"> Mes Clips</span>
            <span style="float: right;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 16px; height: 16px; margin-top: 1px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </span>
          </router-link>
        </li>
        <li style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 16px; margin: 12px auto;">
          <router-link :to="{ name: 'ListMessages' }">
            <span style="font-size: 16px; color: #333;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512" style="width: 28px; height: 28px; margin-right: 12px;"><path d="M208 352c-41 0-79.1-9.3-111.3-25-21.8 12.7-52.1 25-88.7 25a7.83 7.83 0 0 1-7.3-4.8 8 8 0 0 1 1.5-8.7c.3-.3 22.4-24.3 35.8-54.5-23.9-26.1-38-57.7-38-92C0 103.6 93.1 32 208 32s208 71.6 208 160-93.1 160-208 160z" class="fa-secondary" style="fill: #c4cacf;"/><path d="M576 320c0 34.3-14.1 66-38 92 13.4 30.3 35.5 54.2 35.8 54.5a8 8 0 0 1 1.5 8.7 7.88 7.88 0 0 1-7.3 4.8c-36.6 0-66.9-12.3-88.7-25-32.2 15.8-70.3 25-111.3 25-86.2 0-160.2-40.4-191.7-97.9A299.82 299.82 0 0 0 208 384c132.3 0 240-86.1 240-192a148.61 148.61 0 0 0-1.3-20.1C522.5 195.8 576 253.1 576 320z" class="fa-primary" style="fill: #637381;"/></svg>
            </span>
            <span style="font-weight: 500; color: rgb(99, 115, 129);"> Ma Messagerie</span>
            <span style="float: right;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 16px; height: 16px; margin-top: 1px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </span>
          </router-link>
        </li>
        <li v-if="user.vendor" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 16px; margin: 12px auto 30px;">
          <router-link :to="{ name: 'Discount' }">
            <span style="font-size: 16px; color: #333;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512" style="width: 28px; height: 28px; margin-right: 12px;"><path d="M512 256a88 88 0 0 0-57.1-82.4A88 88 0 0 0 338.4 57.1a88 88 0 0 0-164.8 0A88 88 0 0 0 57.1 173.6a88 88 0 0 0 0 164.8 88 88 0 0 0 116.5 116.5 88 88 0 0 0 164.8 0 88 88 0 0 0 116.5-116.5A88 88 0 0 0 512 256zm-320-96a32 32 0 1 1-32 32 32 32 0 0 1 32-32zm12.28 181.65a16 16 0 0 1-22.63 0l-11.31-11.31a16 16 0 0 1 0-22.63l137.37-137.37a16 16 0 0 1 22.63 0l11.31 11.31a16 16 0 0 1 0 22.63zM320 352a32 32 0 1 1 32-32 32 32 0 0 1-32 32z" class="fa-secondary" style="fill: #c4cacf;"/><path d="M192 160a32 32 0 1 1-32 32 32 32 0 0 1 32-32zm12.28 181.65a16 16 0 0 1-22.63 0l-11.31-11.31a16 16 0 0 1 0-22.63l137.37-137.37a16 16 0 0 1 22.63 0l11.31 11.31a16 16 0 0 1 0 22.63zM320 352a32 32 0 1 1 32-32 32 32 0 0 1-32 32z" class="fa-primary" style="fill: #637381;"/></svg>
            </span>
            <span style="font-weight: 500; color: rgb(99, 115, 129);"> Mes Promotions</span>
            <span style="float: right;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 16px; height: 16px; margin-top: 1px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </span>
          </router-link>
        </li>
        <li v-if="!user.vendor" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 16px; margin: 12px auto 30px;">
          <router-link :to="{ name: 'ListMessages' }">
            <span style="font-size: 16px; color: #333;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512" style="width: 28px; height: 28px; margin-right: 12px;"><path d="M462.32 62.63C407.5 15.94 326 24.33 275.69 76.23L256 96.53l-19.69-20.3c-50.21-51.9-131.8-60.29-186.61-13.6-62.78 53.6-66.09 149.81-9.88 207.9l193.5 199.79a31.31 31.31 0 0 0 45.28 0l193.5-199.79c56.31-58.09 53-154.3-9.78-207.9zm-52.8 185l-143.1 143.85a15.29 15.29 0 0 1-21.7 0l-140-140.78c-28.37-28.52-33.78-75-8.37-106.23a76.44 76.44 0 0 1 113.77-5.88l45.49 45.7 42.37-42.58c28.38-28.52 74.65-34 105.71-8.45a77.35 77.35 0 0 1 5.83 114.36z" class="fa-secondary" style="fill: #c4cacf;"/><path d="M244.72 391.48l-140-140.78c-28.37-28.52-33.78-75-8.36-106.23a76.43 76.43 0 0 1 113.76-5.88l45.49 45.7 42.37-42.58c28.38-28.51 74.65-34 105.71-8.45a77.35 77.35 0 0 1 5.87 114.36L266.41 391.48a15.28 15.28 0 0 1-21.69 0z" class="fa-primary" style="fill: #c4cacf;"/></svg>
            </span>
            <span style="font-weight: 500; color: rgb(99, 115, 129);"> Mes Favoris</span>
            <span style="float: right;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 16px; height: 16px; margin-top: 1px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </span>
          </router-link>
        </li>
        <li v-if="!user.vendor" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 16px; margin: 12px auto 30px;">
          <router-link :to="{ name: 'ListMessages' }">
            <span style="font-size: 16px; color: #333;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512" style="width: 28px; height: 28px; margin-right: 12px;"><path d="M231.1 187.3l-9.4 54.6a12 12 0 0 0 17.4 12.6l49-25.8 49 25.8a12 12 0 0 0 17.4-12.6l-9.4-54.6 39.6-38.6c7.1-6.9 3.2-19-6.4-20.5l-54.8-8L299 70.6a12 12 0 0 0-21.5 0L253 120.2l-54.8 8a12 12 0 0 0-6.7 20.5zM384 432H192c-35.3 0-64 20.7-64 56v12a12 12 0 0 0 12 12h296a12 12 0 0 0 12-12v-12c0-35.3-28.7-56-64-56z" class="fa-secondary"/><path d="M552.12 64H448V24a23.94 23.94 0 0 0-23.88-24H152a23.94 23.94 0 0 0-24 23.88V64H24A23.94 23.94 0 0 0 0 87.88V144c0 66.5 77.9 131.7 171.9 142.4C203.3 338.5 240 360 240 360v72h96v-72s36.7-21.5 68.1-73.6C498.4 275.6 576 210.3 576 144V88a23.94 23.94 0 0 0-23.88-24zM64 144v-16h64.2a359 359 0 0 0 12.8 86.2c-47.5-16.4-77-49.9-77-70.2zm320.7 4.7l-39.6 38.6 9.4 54.6a12 12 0 0 1-17.4 12.6l-49-25.8-49 25.8a12 12 0 0 1-17.4-12.6l9.4-54.6-39.6-38.6a12 12 0 0 1 6.7-20.5l54.8-8 24.5-49.6a12 12 0 0 1 21.5 0l24.5 49.6 54.8 8c9.6 1.5 13.5 13.6 6.4 20.5zM512 144c0 20.2-29.4 53.8-77 70.2a359 359 0 0 0 12.8-86.2H512z" class="fa-primary" style="fill: #c4cacf;"/></svg>
            </span>
            <span style="font-weight: 500; color: rgb(99, 115, 129);"> Swipe Roulette</span>
            <span style="float: right;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 16px; height: 16px; margin-top: 1px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </span>
          </router-link>
        </li>
        <li style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 16px; margin: 12px auto;">
          <router-link :to="{ name: 'About' }">
            <span style="font-size: 16px; color: #333;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512" style="width: 28px; height: 28px; margin-right: 12px;"><path d="M448 0H64A64.06 64.06 0 0 0 0 64v288a64.06 64.06 0 0 0 64 64h96v84a12 12 0 0 0 19.1 9.7L304 416h144a64.06 64.06 0 0 0 64-64V64a64.06 64.06 0 0 0-64-64zM320 133.2a26.8 26.8 0 1 1-26.8 26.8 26.8 26.8 0 0 1 26.8-26.8zm-128 0a26.8 26.8 0 1 1-26.8 26.8 26.8 26.8 0 0 1 26.8-26.8zm164.2 140.9a132.32 132.32 0 0 1-200.4 0 16 16 0 0 1 24.3-20.7 100.23 100.23 0 0 0 151.6-.1 16.07 16.07 0 0 1 24.5 20.8z" class="fa-secondary" style="fill: #c4cacf;"/><path d="M320 186.8a26.8 26.8 0 1 0-26.8-26.8 26.8 26.8 0 0 0 26.8 26.8zm-128 0a26.8 26.8 0 1 0-26.8-26.8 26.8 26.8 0 0 0 26.8 26.8zm162.3 64.7a16.11 16.11 0 0 0-22.6 1.8 100.23 100.23 0 0 1-151.6.1 16 16 0 0 0-24.3 20.7 132.32 132.32 0 0 0 200.4 0 16 16 0 0 0-1.9-22.6z" class="fa-primary" style="fill: #637381;"/></svg>
            </span>
            <span style="font-weight: 500; color: rgb(99, 115, 129);"> Support</span>
            <span style="float: right;">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 16px; height: 16px; margin-top: 1px; margin-left: 3px;">
                <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
              </svg>
            </span>
          </router-link>
        </li>
        <li @click="logout()" style="border: 1px solid rgba(22, 24, 35, 0.12); border-radius: 16px; margin: 12px auto;">
          <span style="font-size: 16px; color: #333;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 512" style="width: 28px; height: 28px; margin-right: 12px;"><path d="M272 0a23.94 23.94 0 0 1 24 24v240a23.94 23.94 0 0 1-24 24h-32a23.94 23.94 0 0 1-24-24V24a23.94 23.94 0 0 1 24-24z" class="fa-secondary" style="fill: rgba(255, 0, 0, 50%);"/><path d="M504 256c0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4A248 248 0 0 1 111.8 54.2a24.07 24.07 0 0 1 35 7.7L162.6 90a24 24 0 0 1-6.6 31 168 168 0 0 0 100 303c91.6 0 168.6-74.2 168-169.1a168.07 168.07 0 0 0-68.1-134 23.86 23.86 0 0 1-6.5-30.9l15.8-28.1a24 24 0 0 1 34.8-7.8A247.51 247.51 0 0 1 504 256z" class="fa-primary" style="fill: rgba(255, 0, 0, 50%);"/></svg>
          </span>
          <span style="font-weight: 500; color: rgb(99, 115, 129); width: 100%;"> Déconnexion</span>
          <span style="float: right;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style="fill: rgb(176, 181, 187); width: 16px; height: 16px; margin-top: 1px; margin-left: 3px;">
              <path d="M113.3 47.41l183.1 191.1c4.469 4.625 6.688 10.62 6.688 16.59s-2.219 11.97-6.688 16.59l-183.1 191.1c-9.152 9.594-24.34 9.906-33.9 .7187c-9.625-9.125-9.938-24.38-.7187-33.91l168-175.4L78.71 80.6c-9.219-9.5-8.906-24.78 .7187-33.91C88.99 37.5 104.2 37.82 113.3 47.41z"></path>
            </svg>
          </span>
        </li>
      </ul>
    </div>
  </main>
</template>


<style scoped src="../assets/css/account.css"></style>


<script>

import AuthAPI from "../services/authAPI.js";

export default {
  name: 'Account',
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      user: JSON.parse(window.localStorage.getItem("user")),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      nbProducts: 0
    }
  },
  created() {
    window.StatusBar.overlaysWebView(false);  
    window.StatusBar.styleDefault();

    var isAuthenticated = AuthAPI.isAuthenticated();
    if (!isAuthenticated) {
      this.$router.push({ name: 'Welcome' });
    }

    if (this.user && this.token) {
      window.cordova.plugin.http.get(this.baseUrl + "/user/api/live/remove/waiting", {}, { Authorization: "Bearer " + this.token }, (response) => {
        this.user = JSON.parse(response.data);
        window.localStorage.setItem("user", response.data);

        if (this.user.vendor) {
          if (this.user.vendor.products.length) {
            this.user.vendor.products.map(product => {
              if (product.archived == false) {
                this.nbProducts += 1;
              }
            });
          }
        }
      }, (error) => {
        console.log(error);
      });
    }
  },
  methods: {
    logout() {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('lineItems');
      window.localStorage.removeItem('trend');
      window.localStorage.removeItem('categories');
      this.$router.push({ name: 'Welcome' });
    },
    goBack() {
      this.$router.push({ name: 'Feed' });
    },
    goPrelive() {
      this.$router.push({ name: 'PreLive' });
    },
    goEditProfile() {
      this.$router.push({ name: 'EditUser' });
    },
    goToVendorRegistration() {
      this.$router.push({ name: 'VendorRegistrationStep1' });
    }
  }
};

</script>

