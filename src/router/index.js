import Vue from 'vue'
import Router from 'vue-router'

import Welcome from '@/views/Welcome'
import AllowNotif from '@/views/AllowNotif'
import Onboarding from '@/views/Onboarding'
import VendorRegistrationStep1 from '@/views/VendorRegistrationStep1'
import VendorRegistrationStep2 from '@/views/VendorRegistrationStep2'
import InfluencerRegistration from '@/views/InfluencerRegistration'

import Feed from '@/views/Feed'
import Home from '@/views/Home'
import About from '@/views/About'
import Product from '@/views/Product'
import Profile from '@/views/Profile'
import Checkout from '@/views/Checkout'
import GridProducts from '@/views/GridProducts'
import ListOrders from '@/views/ListOrders'
import ListMessages from '@/views/ListMessages'
import Message from '@/views/Message'
import Order from '@/views/Order'
import Account from '@/views/Account'
import EditUser from '@/views/EditUser'

import ListFollowing from '@/views/ListFollowing'
import ShopVendor from '@/views/vendor/ShopVendor'
import AddProduct from '@/views/vendor/AddProduct'
import EditProduct from '@/views/vendor/EditProduct'
import ClipsVendor from '@/views/vendor/ClipsVendor'
import PreLive from '@/views/vendor/PreLive'
import PreLive2 from '@/views/vendor/PreLive2'
import Live from '@/views/vendor/Live'
import PostLive from '@/views/vendor/PostLive'
import ListClips from '@/views/ListClips'
import Wallet from '@/views/vendor/Wallet'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    }, {
      path: '/following',
      name: 'ListFollowing',
      component: ListFollowing
    }, {
      path: '/registration/influencer',
      name: 'InfluencerRegistration',
      component: InfluencerRegistration
    }, {
      path: '/registration/step1',
      name: 'VendorRegistrationStep1',
      component: VendorRegistrationStep1
    }, {
      path: '/registration/step2/:businessType',
      name: 'VendorRegistrationStep2',
      component: VendorRegistrationStep2
    }, {
      path: '/allow/notif',
      name: 'AllowNotif',
      component: AllowNotif
    }, {
      path: '/onboarding',
      name: 'Onboarding',
      component: Onboarding
    }, {
      path: '/feed',
      name: 'Feed',
      component: Feed
    }, {
      path: '/category/:id/:name?',
      name: 'GridProducts',
      component: GridProducts
    }, {
      path: '/products/add',
      name: 'AddProduct',
      component: AddProduct
    }, {
      path: '/products/edit/:id',
      name: 'EditProduct',
      component: EditProduct
    }, {
      path: '/product/:id?',
      name: 'Product',
      component: Product
    }, {
      path: '/checkout/:quantity/:product/:variant?',
      name: 'Checkout',
      component: Checkout
    }, {
      path: '/prelive/step1',
      name: 'PreLive',
      component: PreLive
    }, {
      path: '/prelive/step2/:id',
      name: 'PreLive2',
      component: PreLive2
    }, {
      path: '/live/:id',
      name: 'Live',
      component: Live
    }, {
      path: '/postlive/:id',
      name: 'PostLive',
      component: PostLive
    }, {
      path: '/clips',
      name: 'ClipsVendor',
      component: ClipsVendor
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
      path: '/vendor/shop',
      name: 'ShopVendor',
      component: ShopVendor
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