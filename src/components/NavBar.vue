<template>
  <nav class="_1m294zs" aria-hidden="false">
    <div class="_h0klba">
      <div :class="active_el == 0 ? '_1e1aumhl' : '_45o9ez'" @click="menuActive(0)">
        <router-link class="_469le2" :to="{ name: 'Home' }">
          <div class="_jro6t0">
            <div :class="active_el == 0 ? '_jgit7bg' : '_tbbnrnx'">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                <path d="M6.64373233,18.7821107 L6.64373233,15.7152449 C6.64371685,14.9380902 7.27567036,14.3067075 8.05843544,14.3018198 L10.9326107,14.3018198 C11.7188748,14.3018198 12.3562677,14.9346318 12.3562677,15.7152449 L12.3562677,15.7152449 L12.3562677,18.7732212 C12.3562498,19.4472781 12.9040221,19.995083 13.5829406,20 L15.5438266,20 C16.4596364,20.0023291 17.3387522,19.6427941 17.9871692,19.0007051 C18.6355861,18.3586161 19,17.4867541 19,16.5775231 L19,7.86584638 C19,7.13138763 18.6720694,6.43471253 18.1046183,5.96350064 L11.4429783,0.674268354 C10.2785132,-0.250877524 8.61537279,-0.22099178 7.48539114,0.745384082 C7.48539114,0.745384082 0.967012253,5.96350064 0.967012253,5.96350064 C0.37274068,6.42082162 0.0175522924,7.11956262 0,7.86584638 L0,16.5686336 C0,18.463707 1.54738155,20 3.45617342,20 L5.37229029,20 C5.69917279,20.0023364 6.01348703,19.8750734 6.24547302,19.6464237 C6.477459,19.417774 6.60792577,19.1066525 6.60791706,18.7821107 L6.64373233,18.7821107 Z" transform="translate(2.5 2)"/>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
      <div :class="active_el == 1 ? '_1e1aumhl' : '_45o9ez'" @click="menuActive(1)">
        <router-link class="_469le2" :to="{ name: 'Search' }">
          <div class="_jro6t0" style="top: 2px;">
            <div :class="active_el == 1 ? '_jgit7bg' : '_tbbnrnx'">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="transform: scale(1.1); margin-bottom: 4px;">
                <path d="M15.6207067,15.6542822 C16.0072308,15.270377 16.6268293,15.270377 17.0133534,15.6542822 L17.0133534,15.6542822 L19.5680176,17.7164156 L19.6123694,17.7164156 C20.1292102,18.2388171 20.1292102,19.0857973 19.6123694,19.6081989 C19.0955285,20.1306004 18.2575639,20.1306004 17.7407231,19.6081989 L17.7407231,19.6081989 L15.6207067,17.1784678 L15.5402577,17.0876967 C15.390397,16.8980019 15.3076306,16.6615115 15.3076306,16.416375 C15.3076306,16.1303824 15.4202849,15.8561581 15.6207067,15.6542822 Z M8.57763961,-7.10542736e-15 C10.8525711,-7.10542736e-15 13.0343273,0.913436016 14.6429467,2.53936255 C16.2515662,4.16528909 17.1552792,6.37051871 17.1552792,8.66992606 C17.1552792,13.458194 13.3149392,17.3398521 8.57763961,17.3398521 C3.84034006,17.3398521 2.13162821e-14,13.458194 2.13162821e-14,8.66992606 C2.13162821e-14,3.88165812 3.84034006,-7.10542736e-15 8.57763961,-7.10542736e-15 Z" transform="translate(2 2)"></path>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
      <div :class="active_el == 2 ? '_1e1aumhl' : '_45o9ez'" @click="menuActive(2)">
        <router-link class="_469le2" :to="{ name: 'Feed' }">
          <div class="_jro6t0" style="top: 2px;">
            <div class="_jgit7bg" :class="active_el == 2 ? '_jgit7bg' : '_tbbnrnx'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="288" height="288" style="transform: scale(1.75);">
                <path fill="#ff6699" d="M12 22a10 10 0 1 1 10-10 10.012 10.012 0 0 1-10 10Z" class="colorb2b1ff svgShape"></path>
                <path fill="#ffffff" d="M10 16.89a2.008 2.008 0 0 1-2-2.002V9.112a2 2 0 0 1 3-1.732l5 2.888a2 2 0 0 1 0 3.464l-5 2.888a1.996 1.996 0 0 1-1 .27Z" class="color6563ff svgShape"></path>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
      <div :class="active_el == 3 ? '_1e1aumhl' : '_45o9ez'" @click="menuActive(3)">
        <router-link class="_469le2" :to="{ name: 'Cart', params: { fullscreen: true }}">
          <div class="_jro6t0">
            <div :class="active_el == 3 ? '_jgit7bg' : '_tbbnrnx'">
              <span v-if="updateCart > 0" class="skodxk4">{{ updateCart }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                <path d="M6.4229,0.7125 C8.0229,-0.2375 10.0229,-0.2375 11.6229,0.7125 C13.2229,1.6625 14.1629,3.4125 14.0929,5.2625 L14.0929,5.2625 L14.0929,5.4925 C15.3529,5.4925 16.6829,6.3725 17.1429,8.5125 L17.1429,8.5125 L17.9129,14.5025 C18.4839,18.4125 16.2129,20.0025 13.1629,20.0025 L13.1629,20.0025 L4.8729,20.0025 C1.8139,20.0025 -0.5271,18.9025 0.1029,14.5025 L0.1029,14.5025 L0.8829,8.5125 C1.0029,7.6225 1.4329,6.7925 2.1029,6.1825 C2.6139,5.7335 3.2729,5.4925 3.9529,5.4925 L3.9529,5.4925 L3.9529,5.2625 C3.8729,3.4125 4.8239,1.6625 6.4229,0.7125 Z M11.8929,8.7125 C11.4039,8.7125 11.0029,9.1025 11.0029,9.5925 C11.0029,10.0725 11.4039,10.4725 11.8929,10.4725 C12.1229,10.4725 12.3529,10.3825 12.5129,10.2125 C12.6829,10.0525 12.7729,9.8225 12.7729,9.5925 C12.7729,9.1025 12.3729,8.7125 11.8929,8.7125 Z M6.0929,8.7125 C5.6029,8.7125 5.2029,9.1025 5.2029,9.5925 C5.2029,10.0725 5.6029,10.4725 6.0929,10.4725 C6.5829,10.4725 6.9729,10.0725 6.9729,9.5925 C6.9729,9.1025 6.5829,8.7125 6.0929,8.7125 Z M9.0029,1.7425 C7.0529,1.7425 5.4729,3.3225 5.4729,5.2625 L5.4729,5.2625 L5.4729,5.4835 L12.5429,5.4835 L12.5429,5.2625 C12.5429,3.3225 10.9629,1.7425 9.0029,1.7425 Z" transform="translate(3 2)"/>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
      <div :class="active_el == 4 ? '_1e1aumhl' : '_45o9ez'" @click="menuActive(4)">
        <router-link class="_469le2" :to="{ name: 'Account' }">
          <div class="_jro6t0">
            <div :class="active_el == 4 ? '_jgit7bg' : '_tbbnrnx'">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                <path d="M5.84846399,13.5498221 C7.28813318,13.433801 8.73442297,13.433801 10.1740922,13.5498221 C10.9580697,13.5955225 11.7383286,13.6935941 12.5099314,13.8434164 C14.1796238,14.1814947 15.2696821,14.7330961 15.73685,15.6227758 C16.0877167,16.317132 16.0877167,17.1437221 15.73685,17.8380783 C15.2696821,18.727758 14.2228801,19.3149466 12.4926289,19.6174377 C11.7216312,19.7729078 10.9411975,19.873974 10.1567896,19.9199288 C9.43008411,20 8.70337858,20 7.96802179,20 L6.64437958,20 C6.36753937,19.9644128 6.09935043,19.9466192 5.83981274,19.9466192 C5.05537891,19.9062698 4.27476595,19.8081536 3.50397353,19.6530249 C1.83428106,19.3327402 0.744222763,18.7633452 0.277054922,17.8736655 C0.0967111971,17.5290284 0.00163408158,17.144037 0.000104217816,16.752669 C-0.00354430942,16.3589158 0.0886574605,15.9704652 0.268403665,15.6227758 C0.72692025,14.7330961 1.81697855,14.1548043 3.50397353,13.8434164 C4.27816255,13.6914539 5.06143714,13.5933665 5.84846399,13.5498221 Z M8.00262682,-1.16351373e-13 C10.9028467,-1.16351373e-13 13.2539394,2.41782168 13.2539394,5.40035587 C13.2539394,8.38289006 10.9028467,10.8007117 8.00262682,10.8007117 C5.10240696,10.8007117 2.75131423,8.38289006 2.75131423,5.40035587 C2.75131423,2.41782168 5.10240696,-1.16351373e-13 8.00262682,-1.16351373e-13 Z" transform="translate(4 2)"/>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </nav>
</template>



<script>
export default {
  name: "NavBar",
  props: ["lineItems"],
  data() {
    return {
      active_el: 0,
    };
  },
  computed: {
    updateCart() {
      return this.lineItems.reduce((count, item) => count + item.quantity, 0);
    }
  },
  watch: {
    $route(to) {
      if (to.name === "Home" || to.name === "Category") {
        this.active_el = 0;
      } else if (to.name === "Search") {
        this.active_el = 1;
      } else if (to.name === "Cart") {
        this.active_el = 3;
      } else {
        this.active_el = 4;
      }
    }
  },
  methods: {
    menuActive(el) {
      this.active_el = el;
    },
  },
};
</script>
<style type="text/css">

._jro6t0 svg {
  transform: scale(1.3);
  fill: #a3a8ab;
  height: 28px;
  width: 28px;
}

._1m294zs {
  display: flex!important;
  align-items: center!important;
  border-top: 1px solid #EBEBEB!important;
  position: fixed!important;
  bottom: 16px!important;
  left: 0!important;
  right: 0!important;
  padding-bottom: 10px!important;
  padding-top: 15px!important;
  background: #fff!important;
  transition: transform .2s cubic-bezier(.455,.03,.515,.955),visibility .2s!important;
  z-index: 1000!important;
}

._1m294zs {
  padding-bottom: env(safe-area-inset-bottom)!important;
  padding-left: env(safe-area-inset-left)!important;
  padding-right: env(safe-area-inset-right)!important;
  margin-bottom: env(safe-area-inset-bottom)!important;
}

._tbbnrnx {
  width: 30px !important;
  height: 30px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  margin-bottom: 2px !important;
  color: #B0B0B0 !important;
  position: relative !important;
}


._h0klba {
  flex: 1 0 auto !important;
  align-items: flex-start !important;
  display: flex !important;
  justify-content: center !important;
  margin: 0 auto !important;
}

._45o9ez {
  display: flex !important;
  flex: 1 1 0 !important;
  flex-direction: column !important;
  align-items: center !important;
  cursor: pointer !important;
  background-color: transparent !important;
  text-align: center !important;
  text-decoration: none !important;
  border: 0px !important;
  max-width: 20% !important;
  min-width: 0px !important;
  overflow-wrap: break-word !important;
  hyphens: auto !important;
  padding: 0 2px !important;
}

._1e1aumhl {
  display: flex !important;
  flex: 1 1 0 !important;
  flex-direction: column !important;
  align-items: center !important;
  cursor: pointer !important;
  background-color: transparent !important;
  text-align: center !important;
  text-decoration: none !important;
  border: 0px !important;
  max-width: 20% !important;
  min-width: 0px !important;
  overflow-wrap: break-word !important;
  hyphens: auto !important;
  padding: 0 2px !important;
}

._jro6t0 {
  display: flex !important;
  justify-content: center;
}

._no3jwgi {
  overflow: clip !important;
}

._no3jwgi {
  font-size: 10px !important;
  line-height: 12px !important;
  max-height: 24px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  font-weight: 600 !important;
  overflow-wrap: break-word !important;
  color: #222222 !important;
}

._jgit7bg {
  width: 30px !important;
  height: 30px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  margin-bottom: 2px !important;
  position: relative !important;
}

._jgit7bg svg {
  fill: #ff2f80 !important;
}

._1bntpbx {
  overflow: clip !important;
}
._1bntpbx {
  font-size: 10px !important;
  line-height: 12px !important;
  max-height: 24px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: -webkit-box !important;
  font-weight: 600 !important;
  overflow-wrap: break-word !important;
  color: #717171 !important;
}

._no3jwgi {
  font-size: 10px !important;
  line-height: 12px !important;
  max-height: 24px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  font-weight: 600 !important;
  overflow-wrap: break-word !important;
  color: #222222 !important;
}

._469le2 {
  height:  100%;
  width:  100%;
}

.bgh3vnd {
  background-color: #ff2f80;
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  width: 10px;
  position: absolute;
  top: -2px;
  left: 22px;
  vertical-align: top;
}

.skodxk4 {
  font-size: 10px;
  background-color: #ff2f80;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  position: absolute;
  top: -2px;
  left: 16px;
  color: white;
  z-index: 10;
}

</style>

