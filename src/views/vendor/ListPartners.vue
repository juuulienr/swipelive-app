<template>
  <main class="products" style="padding: 0px 15px">
    <div class="checkout__header">
      <div @click="goBack()" class="checkout__close-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path d="M206.7 464.6l-183.1-191.1C18.22 267.1 16 261.1 16 256s2.219-11.97 6.688-16.59l183.1-191.1c9.152-9.594 24.34-9.906 33.9-.7187c9.625 9.125 9.938 24.37 .7187 33.91L73.24 256l168 175.4c9.219 9.5 8.906 24.78-.7187 33.91C231 474.5 215.8 474.2 206.7 464.6z"></path>
        </svg>
      </div>
      <div class="checkout__title">Partenariats</div>
    </div>

    <div class="checkout__body">
      <div>
        <div class="container" style="margin: 120px auto 0px; text-align: center;">
          <div style="margin: 0px auto;">
            <Lottie :options="defaultOptions" :width="200"/>
          </div>
        </div>
        <h5 style="font-weight: 500; font-size: 20px; text-align: center; margin-bottom: 8px; margin-top: 10px;">Bientôt disponible</h5>
        <div style="font-weight: 400;font-size: 15px;text-align: center;">Augmentez vos ventes avec l'aide des influenceurs.</div>
      </div>
    </div>
  </main>

  <f7-page @page:beforeremove="onPageBeforeRemove" @page:beforeout="onPageBeforeOut">
    <f7-navbar title="Toast"></f7-navbar>
    <f7-block strong-ios outline-ios>
      <p>Toasts provide brief feedback about an operation through a message on the screen.</p>
      <p>
        <f7-button fill @click="showToastBottom">Toast on Bottom</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastTop">Toast on Top</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastCenter">Toast on Center</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastIcon">Toast with icon</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastLargeMessage">Toast with large message</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastWithButton">Toast with close button</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastWithCustomButton">Toast with custom button</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastWithCallback">Toast with callback on close</f7-button>
      </p>
    </f7-block>
  </f7-page>

      <f7-block-title>Floating Labels</f7-block-title>
    <f7-list strong-ios dividers-ios inset-ios>
      <f7-list-input label="Name" floating-label type="text" placeholder="Your name" clear-button>
        <template #media>
          <f7-icon icon="demo-list-icon" />
        </template>
      </f7-list-input>

      <f7-list-input
        label="Password"
        floating-label
        type="password"
        placeholder="Your password"
        clear-button
      >
        <template #media>
          <f7-icon icon="demo-list-icon" />
        </template>
      </f7-list-input>

      <f7-list-input
        label="E-mail"
        floating-label
        type="email"
        placeholder="Your e-mail"
        clear-button
      >
        <template #media>
          <f7-icon icon="demo-list-icon" />
        </template>
      </f7-list-input>

      <f7-list-input label="URL" floating-label type="url" placeholder="URL" clear-button>
        <template #media>
          <f7-icon icon="demo-list-icon" />
        </template>
      </f7-list-input>

      <f7-list-input
        label="Phone"
        floating-label
        type="tel"
        placeholder="Your phone number"
        clear-button
      >
        <template #media>
          <f7-icon icon="demo-list-icon" />
        </template>
      </f7-list-input>

      <f7-list-input label="Resizable" floating-label type="textarea" resizable placeholder="Bio">
        <template #media>
          <f7-icon icon="demo-list-icon" />
        </template>
      </f7-list-input>
    </f7-list>



</template>


<script>
import Lottie from 'vue-lottie';
import * as animationData from '../../assets/lottie/partner.json';
// import { f7Navbar, f7Page, f7Block, f7Button, f7, theme } from 'framework7-vue';

export default {
  name: 'ListPartners',
  components: {
    Lottie,
  },
  data() {
    return {
      baseUrl: window.localStorage.getItem("baseUrl"),
      token: window.localStorage.getItem("token"),
      cloudinary256x256: 'https://res.cloudinary.com/dxlsenc2r/image/upload/c_thumb,h_256,w_256/',
      defaultOptions: {animationData: animationData},
      user: this.$store.getters.getUser,
    }
  },
  created() {    
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.styleDefault();
    window.StatusBar.backgroundColorByHexString("#ffffff");
  },
  methods: {
    goBack() {
      window.plugins.nativepagetransitions.slide({
        direction: 'right',
        duration: 400,
        iosdelay: 0,
        androiddelay: 0,
        winphonedelay: 0,
        slowdownfactor: 1,
      });
      this.$router.push({ name: 'Account' });
    },
      showToastBottom() {
      const self = this;
      // Create toast
      if (!self.toastBottom) {
        self.toastBottom = f7.toast.create({
          text: 'This is default bottom positioned toast',
          closeTimeout: 2000,
        });
      }
      // Open it
      self.toastBottom.open();
    },
    showToastTop() {
      const self = this;
      // Create toast
      if (!self.toastTop) {
        self.toastTop = f7.toast.create({
          text: 'Top positioned toast',
          position: 'top',
          closeTimeout: 2000,
        });
      }
      // Open it
      self.toastTop.open();
    },
    showToastCenter() {
      const self = this;
      // Create toast
      if (!self.toastCenter) {
        self.toastCenter = f7.toast.create({
          text: "I'm on center",
          position: 'center',
          closeTimeout: 2000,
        });
      }
      // Open it
      self.toastCenter.open();
    },
    showToastIcon() {
      const self = this;
      // Create toast
      if (!self.toastIcon) {
        self.toastIcon = f7.toast.create({
          icon: theme.ios
            ? '<i class="f7-icons">star_fill</i>'
            : '<i class="material-icons">star</i>',
          text: "I'm on center",
          position: 'center',
          closeTimeout: 2000,
        });
      }
      // Open it
      self.toastIcon.open();
    },
    showToastLargeMessage() {
      const self = this;
      // Create toast
      if (!self.toastLargeMessage) {
        self.toastLargeMessage = f7.toast.create({
          text: 'This toast contains a lot of text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quae, ab. Delectus amet optio facere autem sapiente quisquam beatae culpa dolore.',
          closeTimeout: 2000,
        });
      }
      // Open it
      self.toastLargeMessage.open();
    },
    showToastWithButton() {
      const self = this;
      // Create toast
      if (!self.toastWithButton) {
        self.toastWithButton = f7.toast.create({
          text: 'Toast with additional close button',
          closeButton: true,
        });
      }
      // Open it
      self.toastWithButton.open();
    },
    showToastWithCustomButton() {
      const self = this;
      // Create toast
      if (!self.toastWithCustomButton) {
        self.toastWithCustomButton = f7.toast.create({
          text: 'Custom close button',
          closeButton: true,
          closeButtonText: 'Close Me',
          closeButtonColor: 'red',
        });
      }
      // Open it
      self.toastWithCustomButton.open();
    },
    showToastWithCallback() {
      const self = this;
      // Create toast
      if (!self.toastWithCallback) {
        self.toastWithCallback = f7.toast.create({
          text: 'Callback on close',
          closeButton: true,
          on: {
            close() {
              f7.dialog.alert('Toast closed');
            },
          },
        });
      }
      // Open it
      self.toastWithCallback.open();
    },
    onPageBeforeOut() {
      f7.toast.close();
    },
    onPageBeforeRemove() {
      const self = this;
      // Destroy toasts when page removed
      if (self.toastBottom) self.toastBottom.destroy();
      if (self.toastTop) self.toastTop.destroy();
      if (self.toastCenter) self.toastCenter.destroy();
      if (self.toastIcon) self.toastIcon.destroy();
      if (self.toastLargeMessage) self.toastLargeMessage.destroy();
      if (self.toastWithButton) self.toastWithButton.destroy();
      if (self.toastWithCustomButton) self.toastWithCustomButton.destroy();
      if (self.toastWithCallback) self.toastWithCallback.destroy();
    },
  }
};

</script>

