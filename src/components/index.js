import layoutLeft from './home/layout-left'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
import coverImage from './publishs/cover-image'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  install: function (Vue) {
    Vue.component('layout-left', layoutLeft) // 全局注册左侧导航组件
    Vue.component('layout-header', layoutHeader)// 全局注册头部组件
    Vue.component('bread-crumb', breadCrumb) // 注册面包屑组件
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑
    Vue.component('cover-image', coverImage) // 封面内容组件
  }
}
