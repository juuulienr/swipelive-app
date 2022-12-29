import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '@/views/Welcome'
import Onboarding from '@/views/Onboarding'
import VendorRegistration from '@/views/VendorRegistration'
import InfluencerRegistration from '@/views/InfluencerRegistration'

import Feed from '@/views/Feed'
import Home from '@/views/Home'
import About from '@/views/About'
import SwipeRoulette from '@/views/SwipeRoulette'
import Favoris from '@/views/Favoris'
import Profile from '@/views/Profile'
import Checkout from '@/views/Checkout'
import Category from '@/views/Category'
import ListOrders from '@/views/ListOrders'
import ListMessages from '@/views/ListMessages'
import Message from '@/views/Message'
import Order from '@/views/Order'
import Account from '@/views/Account'
import EditUser from '@/views/EditUser'
import ListClips from '@/views/ListClips'


import Shop from '@/views/vendor/Shop'
import Partner from '@/views/vendor/Partner'
import Promotion from '@/views/vendor/Promotion'
import ListFollowing from '@/views/ListFollowing'
import AddEditProduct from '@/views/vendor/AddEditProduct'
import ClipsVendor from '@/views/vendor/ClipsVendor'
import PreLive from '@/views/vendor/PreLive'
import Live from '@/views/vendor/Live'
import Wallet from '@/views/vendor/Wallet'

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
      path: '/influencer/registration',
      name: 'InfluencerRegistration',
      component: InfluencerRegistration
    }, {
      path: '/vendor/registration',
      name: 'VendorRegistration',
      component: VendorRegistration
    }, {
      path: '/feed',
      name: 'Feed',
      component: Feed
    }, {
      path: '/home',
      name: 'Home',
      component: Home
    }, {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile
    }, {
      path: '/account',
      name: 'Account',
      component: Account
    }, {
      path: '/category/:id/:name?',
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
      path: '/roulette',
      name: 'SwipeRoulette',
      component: SwipeRoulette
    }, {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
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
      name: 'ClipsVendor',
      component: ClipsVendor
    }, {
      path: '/vendor/shop',
      name: 'Shop',
      component: Shop
    }, {
      path: '/vendor/promotions',
      name: 'Promotion',
      component: Promotion
    }, {
      path: '/vendor/partner',
      name: 'Partner',
      component: Partner
    }, {
      path: '/user/edit',
      name: 'EditUser',
      component: EditUser
    }, {
      path: '/vendor/orders',
      name: 'ListOrders',
      component: ListOrders
    }, {
      path: '/messages',
      name: 'ListMessages',
      component: ListMessages
    }, {
      path: '/messages/user/:id?',
      name: 'Message',
      component: Message
    }, {
      path: '/clips/:type/:index/:profileId',
      name: 'ListClips',
      component: ListClips
    }, {
      path: '/order/:id',
      name: 'Order',
      component: Order
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