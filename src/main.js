import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueMaterialLocales from '@/..'
import locales from '@/../dist/locale'
import Demo from '@/components/Demo.vue'
import '@/main.css'


Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueMaterialLocales, locales)

Vue.material.selectLocale(navigator.language, 'en-US')


new Vue({
    el: "#app",
    render: h => h(Demo),
})
