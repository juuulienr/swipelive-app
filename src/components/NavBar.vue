<template>
  <nav class="_1m294zs" aria-hidden="false">
    <div class="_h0klba">
      <div @click="menuActive(0)" :class="active_el == 0 ? '_1e1aumhl' : '_45o9ez'">
        <router-link class="_469le2" :to="{ name: 'Home' }">
          <div class="_jro6t0">
            <div :class="active_el == 0 ? '_jgit7bg' : '_tbbnrnx'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="height: 28px; width: 28px; fill: rgb(126, 133, 155); margin-bottom: 1px;">
                <path d="M352 128C352 57.421 294.579 0 224 0 153.42 0 96 57.421 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 32c52.935 0 96 43.065 96 96H128c0-52.935 43.065-96 96-96zm192 400c0 26.467-21.533 48-48 48H80c-26.467 0-48-21.533-48-48V160h64v48c0 8.837 7.164 16 16 16s16-7.163 16-16v-48h192v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48h64v272z"></path>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
      <div @click="menuActive(1)" :class="active_el == 1 ? '_1e1aumhl' : '_45o9ez'">
        <router-link class="_469le2" :to="{ name: 'ListMessages' }">
          <div class="_jro6t0" style="top: 2px;">
            <div class="_jgit7bg" :class="active_el == 1 ? '_jgit7bg' : '_tbbnrnx'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="height: 28px; width: 28px; fill: rgb(126, 133, 155); margin-bottom: 1px;">
                <path d="M352 128C352 57.421 294.579 0 224 0 153.42 0 96 57.421 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 32c52.935 0 96 43.065 96 96H128c0-52.935 43.065-96 96-96zm192 400c0 26.467-21.533 48-48 48H80c-26.467 0-48-21.533-48-48V160h64v48c0 8.837 7.164 16 16 16s16-7.163 16-16v-48h192v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48h64v272z"></path>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
      <div @click="menuActive(2)" :class="active_el == 2 ? '_1e1aumhl' : '_45o9ez'">
        <router-link class="_469le2" :to="{ name: 'Feed' }">
          <div class="_jro6t0" style="top: 2px;">
            <div class="_jgit7bg" :class="active_el == 2 ? '_jgit7bg' : '_tbbnrnx'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="height: 28px; width: 28px; fill: rgb(126, 133, 155); margin-bottom: 1px;">
                <path d="M352 128C352 57.421 294.579 0 224 0 153.42 0 96 57.421 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 32c52.935 0 96 43.065 96 96H128c0-52.935 43.065-96 96-96zm192 400c0 26.467-21.533 48-48 48H80c-26.467 0-48-21.533-48-48V160h64v48c0 8.837 7.164 16 16 16s16-7.163 16-16v-48h192v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48h64v272z"></path>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
      <div @click="menuActive(3)" :class="active_el == 3 ? '_1e1aumhl' : '_45o9ez'">
        <router-link class="_469le2" :to="{ name: 'Cart' }">
          <div class="_jro6t0">
            <div :class="active_el == 3 ? '_jgit7bg' : '_tbbnrnx'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="height: 28px; width: 28px; fill: rgb(126, 133, 155); margin-bottom: 1px;">
                <path d="M352 128C352 57.421 294.579 0 224 0 153.42 0 96 57.421 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 32c52.935 0 96 43.065 96 96H128c0-52.935 43.065-96 96-96zm192 400c0 26.467-21.533 48-48 48H80c-26.467 0-48-21.533-48-48V160h64v48c0 8.837 7.164 16 16 16s16-7.163 16-16v-48h192v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48h64v272z"></path>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
      <div @click="menuActive(4)" :class="active_el == 4 ? '_1e1aumhl' : '_45o9ez'">
        <router-link class="_469le2" :to="{ name: 'Account' }">
          <div class="_jro6t0">
            <div :class="active_el == 4 ? '_jgit7bg' : '_tbbnrnx'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="height: 28px; width: 28px; fill: rgb(126, 133, 155); margin-bottom: 1px;">
                <path d="M352 128C352 57.421 294.579 0 224 0 153.42 0 96 57.421 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 32c52.935 0 96 43.065 96 96H128c0-52.935 43.065-96 96-96zm192 400c0 26.467-21.533 48-48 48H80c-26.467 0-48-21.533-48-48V160h64v48c0 8.837 7.164 16 16 16s16-7.163 16-16v-48h192v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48h64v272z"></path>
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </nav>
</template>



<style type="text/css">

._tbbnrnx i {
  font-size: 22px; 
  color: #B0B0B0; 
  margin-bottom: 4px;
}

._jgit7bg i {
  font-size: 22px; 
  margin-bottom: 4px;
}

._1m294zs {
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-align-items: center !important;
  align-items: center !important;
  border-top: 1px solid #EBEBEB !important;
  position: fixed !important;
  bottom: -60px !important;
  height: 120px !important;
  left: 0px !important;
  right: 0px !important;
  padding-bottom: 60px !important;
  background: #ffffff !important;
  -webkit-transition: -webkit-transform .2s cubic-bezier(0.455, 0.030, 0.515, 0.955),transform .2s cubic-bezier(0.455, 0.030, 0.515, 0.955), visibility .2s !important;
  -moz-transition: transform .2s cubic-bezier(0.455, 0.030, 0.515, 0.955), visibility .2s !important;
  transition: -ms-transform .2s cubic-bezier(0.455, 0.030, 0.515, 0.955),-webkit-transform .2s cubic-bezier(0.455, 0.030, 0.515, 0.955),transform .2s cubic-bezier(0.455, 0.030, 0.515, 0.955), visibility .2s !important;
  z-index: 1000 !important;
}

._1m294zs {
  margin-bottom: env(safe-area-inset-bottom) !important;
  padding-left: env(safe-area-inset-left) !important;
  padding-right: env(safe-area-inset-right) !important;
}

._tbbnrnx {
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  -webkit-box-pack: center !important;
  -ms-flex-pack: center !important;
  width: 30px !important;
  height: 30px !important;
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-justify-content: center !important;
  justify-content: center !important;
  -webkit-align-items: center !important;
  align-items: center !important;
  margin-bottom: 2px !important;
  color: #B0B0B0 !important;
  position: relative !important;
}


._h0klba {
  -webkit-box-pack: center !important;
  -ms-flex-pack: center !important;
  -webkit-box-align: start !important;
  -ms-flex-align: start !important;
  -webkit-flex: 1 0 auto !important;
  -ms-flex: 1 0 auto !important;
  flex: 1 0 auto !important;
  -webkit-align-items: flex-start !important;
  align-items: flex-start !important;
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-justify-content: center !important;
  justify-content: center !important;
  margin: 0 auto !important;
}

._45o9ez {
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  -webkit-box-direction: normal !important;
  -webkit-box-orient: vertical !important;
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-flex: 1 1 0 !important;
  -ms-flex: 1 1 0 !important;
  flex: 1 1 0 !important;
  -webkit-flex-direction: column !important;
  -ms-flex-direction: column !important;
  flex-direction: column !important;
  -webkit-align-items: center !important;
  align-items: center !important;
  cursor: pointer !important;
  background-color: transparent !important;
  text-align: center !important;
  text-decoration: none !important;
  border: 0px !important;
  max-width: 20% !important;
  min-width: 0px !important;
  -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
  overflow-wrap: break-word !important;
  -webkit-hyphens: auto !important;
  -moz-hyphens: auto !important;
  -ms-hyphens: auto !important;
  hyphens: auto !important;
  padding: 0 2px !important;
}

._1e1aumhl {
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  -webkit-box-direction: normal !important;
  -webkit-box-orient: vertical !important;
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-flex: 1 1 0 !important;
  -ms-flex: 1 1 0 !important;
  flex: 1 1 0 !important;
  -webkit-flex-direction: column !important;
  -ms-flex-direction: column !important;
  flex-direction: column !important;
  -webkit-align-items: center !important;
  align-items: center !important;
  cursor: pointer !important;
  background-color: transparent !important;
  text-align: center !important;
  text-decoration: none !important;
  border: 0px !important;
  max-width: 20% !important;
  min-width: 0px !important;
  -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
  overflow-wrap: break-word !important;
  -webkit-hyphens: auto !important;
  -moz-hyphens: auto !important;
  -ms-hyphens: auto !important;
  hyphens: auto !important;
  padding: 0 2px !important;
  color: #FF385C !important;
}

._jro6t0 {
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
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
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  font-weight: 600 !important;
  overflow-wrap: break-word !important;
  color: #222222 !important;
}

._jgit7bg {
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  -webkit-box-pack: center !important;
  -ms-flex-pack: center !important;
  width: 30px !important;
  height: 30px !important;
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-justify-content: center !important;
  justify-content: center !important;
  -webkit-align-items: center !important;
  align-items: center !important;
  margin-bottom: 2px !important;
  position: relative !important;
  color: #e90062 !important;
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
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
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
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  font-weight: 600 !important;
  overflow-wrap: break-word !important;
  color: #222222 !important;
}

._469le2 {
  height:  100%;
  width:  100%;
}


</style>

<script>

  export default {
    name: "NavBar",
    data: function() {
      return {
        active_el: 0,
      }
    },
    methods: {
      menuActive(el) {
        this.active_el = el;   
      },
    }  
  };

</script>
