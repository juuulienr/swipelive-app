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
import Order from '@/views/Order'


import Shop from '@/views/vendor/Shop'
import Partner from '@/views/vendor/Partner'
import Promotion from '@/views/vendor/Promotion'
import AddEditProduct from '@/views/vendor/AddEditProduct'
import ListClips from '@/views/vendor/ListClips'
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
      path: '/discussions/:discussionId?/:userId?/:picture?/:businessName?',
      name: 'ListMessages',
      component: ListMessages
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