import Vue from 'vue'

import index from './index.vue'
import store from './store'

import install from './lib/util'

import detectLayer from './lib/layer'
import initateLayer from './store/_initateLayer'
import dummy from './dummy-encounter.json'

install(Vue)

const layer = window.layer = Vue.prototype.$layer = new (detectLayer())

const vm = window.rootvm = new Vue({
  components: { index },
  el: '#vue-root',
  template: '<index />',
  store,
  watch: {
    ['$store.state.settings.ui_scale']() {
      this.$store.dispatch('settings/updateGlobalStyle')
    }
  },
  mounted() {
    this.$store.dispatch('settings/updateGlobalStyle')
    this.$store.commit('settings/migrate')
    initateLayer(layer)
  }
})


// if(process.env.NODE_ENV === 'development') {
//   window._dummy = () => layer.emit('data', dummy)
//   window._dummy()
// }
