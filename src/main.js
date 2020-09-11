import Vue from 'vue'
import VueMaterial from 'vue-material'
// import VueMaterialLocales from '@/../dist/index.esm'
import VueMaterialLocales from './vue-material-locales'
// import locales from '@/../dist/locale'
import de from '@/../dist/locale/de'
import en from '@/../dist/locale/en-US'
import pt from '@/../dist/locale/pt-BR'
import zh from '@/../dist/locale/zh-CN'
import Test from '@/components/Test.vue'
import '@/main.css'


Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueMaterialLocales, { de, en, pt, zh })
// Vue.use(VueMaterialLocales, locales)

Vue.material.selectLocale(navigator.language, 'en')


new Vue({
    el: "#app",
    render: h => h(Test),
})
