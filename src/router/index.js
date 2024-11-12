import { createRouter, createWebHashHistory } from 'vue-router';

import Welcome from '@/views/Welcome.vue';
import Onboarding from '@/views/Onboarding.vue';
import VendorRegistration from '@/views/VendorRegistration.vue';

import Feed from '@/views/Feed.vue';
import Home from '@/views/Home.vue';
import Search from '@/views/Search.vue';
import About from '@/views/About.vue';
import SwipeWheel from '@/views/SwipeWheel.vue';
import Favoris from '@/views/Favoris.vue';
import Profile from '@/views/Profile.vue';
import Category from '@/views/Category.vue';
import ListOrders from '@/views/ListOrders.vue';
import ListMessages from '@/views/ListMessages.vue';
import ListFollowing from '@/views/ListFollowing.vue';
import EditUser from '@/views/EditUser.vue';
import Account from '@/views/Account.vue';
import Cart from '@/components/Cart.vue';
import Checkout from '@/components/Checkout.vue';

import Shop from '@/views/vendor/Shop.vue';
import AddEditProduct from '@/views/vendor/AddEditProduct.vue';
import ListPartners from '@/views/vendor/ListPartners.vue';
import ListPromotions from '@/views/vendor/ListPromotions.vue';
import ListClips from '@/views/vendor/ListClips.vue';
import Wallet from '@/views/vendor/Wallet.vue';
import PreLive from '@/views/vendor/PreLive.vue';
import Live from '@/views/vendor/Live.vue';

const routes = [
  { path: '/', name: 'Welcome', component: Welcome },
  { path: '/onboarding', name: 'Onboarding', component: Onboarding },
  { path: '/vendor/registration', name: 'VendorRegistration', component: VendorRegistration },
  { path: '/feed/:type?/:index?/:profileId?', name: 'Feed', component: Feed },
  { path: '/home', name: 'Home', component: Home },
  { path: '/search', name: 'Search', component: Search },
  { path: '/cart/:fullscreen?', name: 'Cart', component: Cart },
  { path: '/checkout/:fullscreen?', name: 'Checkout', component: Checkout },
  { path: '/profile/:id/:overlaysWebView?', name: 'Profile', component: Profile },
  { path: '/account', name: 'Account', component: Account },
  { path: '/category/:id', name: 'Category', component: Category },
  { path: '/following', name: 'ListFollowing', component: ListFollowing },
  { path: '/favoris', name: 'Favoris', component: Favoris },
  { path: '/wheel', name: 'SwipeWheel', component: SwipeWheel },
  { path: '/vendor/products/:productId?', name: 'AddEditProduct', component: AddEditProduct },
  { path: '/vendor/prelive', name: 'PreLive', component: PreLive },
  { path: '/vendor/live/:id/:token', name: 'Live', component: Live },
  { path: '/vendor/clips', name: 'ListClips', component: ListClips },
  { path: '/vendor/shop', name: 'Shop', component: Shop },
  { path: '/vendor/promotions', name: 'ListPromotions', component: ListPromotions },
  { path: '/vendor/partner', name: 'ListPartners', component: ListPartners },
  { path: '/user/edit', name: 'EditUser', component: EditUser },
  { path: '/vendor/orders/:isOrder/:orderId?', name: 'ListOrders', component: ListOrders },
  { path: '/discussions/:discussionId?/:userId?/:picture?/:pseudo?/:firstname?/:lastname?', name: 'ListMessages', component: ListMessages },
  { path: '/wallet', name: 'Wallet', component: Wallet },
  { path: '/about', name: 'About', component: About }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
});

export default router;
