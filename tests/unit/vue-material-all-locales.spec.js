import Vue from 'vue'
import VueMaterial from 'vue-material'

import VueMaterialLocales from '@/..'
import locales from '@/../dist/locale'


Vue.config.productionTip = false
Vue.config.devtools = false

Vue.use(VueMaterial)
Vue.use(VueMaterialLocales, locales)


describe('All Vue Material locales', () => {

    it('can register all available locales', () => {
        expect(Object.keys(Vue.material.locales).length).to.be.greaterThan(70)
    })
})
