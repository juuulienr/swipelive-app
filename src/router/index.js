import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '@/views/Welcome'
import Onboarding from '@/views/Onboarding'
import VendorRegistration from '@/views/VendorRegistration'

import Feed from '@/views/Feed'
import Home from '@/views/Home'
import About from '@/views/About'
import SwipeWheel from '@/views/SwipeWheel'
import Favoris from '@/views/Favoris'
import Profile from '@/views/Profile'
import Category from '@/views/Category'
import ListOrders from '@/views/ListOrders'
import ListMessages from '@/views/ListMessages'
import ListFollowing from '@/views/ListFollowing'
import EditUser from '@/views/EditUser'
import Account from '@/views/Account'
import Cart from '@/components/Cart'
import Checkout from '@/components/Checkout'


import Shop from '@/views/vendor/Shop'
import AddEditProduct from '@/views/vendor/AddEditProduct'
import ListPartners from '@/views/vendor/ListPartners'
import ListPromotions from '@/views/vendor/ListPromotions'
import ListClips from '@/views/vendor/ListClips'
import Wallet from '@/views/vendor/Wallet'
import PreLive from '@/views/vendor/PreLive'
import Live from '@/views/vendor/Live'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    }, {
      path: '/onboarding',
      name: 'Onboarding',
      component: Onboarding
    }, {
      path: '/vendor/registration',
      name: 'VendorRegistration',
      component: VendorRegistration
    }, {
      path: '/feed/:type?/:index?/:profileId?',
      name: 'Feed',
      component: Feed
    }, {
      path: '/home',
      name: 'Home',
      component: Home
    }, {
      path: '/cart/:fullscreen?',
      name: 'Cart',
      component: Cart
    }, {
      path: '/checkout/:fullscreen?',
      name: 'Checkout',
      component: Checkout
    }, {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile
    }, {
      path: '/account',
      name: 'Account',
      component: Account
    }, {
      path: '/category/:id',
      name: 'Category',
      component: Category
    }, {
      path: '/following',
      name: 'ListFollowing',
      component: ListFollowing
    }, {
      path: '/favoris',
      name: 'Favoris',
      component: Favoris
    }, {
      path: '/wheel',
      name: 'SwipeWheel',
      component: SwipeWheel
    }, {
      path: '/vendor/products/:productId?',
      name: 'AddEditProduct',
      component: AddEditProduct
    }, {
      path: '/vendor/prelive',
      name: 'PreLive',
      component: PreLive
    }, {
      path: '/vendor/live/:id',
      name: 'Live',
      component: Live
    }, {
      path: '/vendor/clips',
      name: 'ListClips',
      component: ListClips
    }, {
      path: '/vendor/shop',
      name: 'Shop',
      component: Shop
    }, {
      path: '/vendor/promotions',
      name: 'ListPromotions',
      component: ListPromotions
    }, {
      path: '/vendor/partner',
      name: 'ListPartners',
      component: ListPartners
    }, {
      path: '/user/edit',
      name: 'EditUser',
      component: EditUser
    }, {
      path: '/vendor/orders/:isOrder',
      name: 'ListOrders',
      component: ListOrders
    }, {
      path: '/discussions/:discussionId?/:userId?/:picture?/:businessName?/:firstname?/:lastname?',
      name: 'ListMessages',
      component: ListMessages
    }, {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet
    }, {
      path: '/about',
      name: 'About',
      component: About
    }
  ],
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
})