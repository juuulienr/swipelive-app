<template>
  <router-view />
  <NavBar :lineItems="lineItems" v-if="showNavbar" />
</template>

<style>
@import './assets/css/bootstrap.css';
@import './assets/css/main.css';
</style>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore } from '@/stores/useMainStore';
import NavBar from '@/components/NavBar.vue';

// Variables locales
const baseUrl = window.localStorage.getItem("baseUrl");
const token = ref(window.localStorage.getItem("token"));
const showNavbar = ref(false);
const pingInterval = ref(null);

// Utilisation du store Pinia
const mainStore = useMainStore();
const user = computed(() => mainStore.getUser);
const lineItems = computed(() => mainStore.getLineItems);
const categories = computed(() => mainStore.getCategories);

// Logique de changement de route
const route = useRoute();
watch(
  () => route.name,
  (newRouteName) => {
    showNavbar.value = ["Home", "Search", "Account", "Category", "Cart"].includes(newRouteName);
  }
);

// Fonction de ping
function ping() {
  if (user.value && token.value) {
    window.cordova.plugin.http.get(
      `${baseUrl}/user/api/ping`,
      {},
      { Authorization: `Bearer ${token.value}` },
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

// Chargement des catégories
function loadCategories() {
  if (categories.value.length === 0) {
    window.cordova.plugin.http.get(
      `${baseUrl}/api/categories`,
      {},
      { 'Content-Type': 'application/json; charset=UTF-8' },
      (response) => {
        mainStore.setCategories(JSON.parse(response.data));
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

// Initialisation des valeurs lors du montage du composant
onMounted(() => {
  showNavbar.value = ["Home", "Search", "Account", "Category", "Cart"].includes(route.name);
  loadCategories();

  // Lancement du ping à intervalles réguliers
  ping();
  pingInterval.value = setInterval(() => {
    token.value = window.localStorage.getItem("token");
    ping();
  }, 240000); // 4 min
});

// Nettoyage avant la destruction du composant
onBeforeUnmount(() => {
  clearInterval(pingInterval.value);
});
</script>
