import layoutLeft from './home/layout-left'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'

export default {
  install: function (Vue) {
    Vue.component('layout-left', layoutLeft)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
  }
}
