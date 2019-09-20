import layoutLeft from './home/layout-left'
import layoutHeader from './home/layout-header'

export default {
  install: function (Vue) {
    Vue.component('layout-left', layoutLeft)
    Vue.component('layout-header', layoutHeader)
  }
}
