import Vue from 'vue'
import VueMaterial from 'vue-material'


Vue.config.productionTip = false
Vue.config.devtools = false

Vue.use(VueMaterial)


describe('Vue Material locales (Browser)', async () => {

    before(async () => {
        // Make Vue visible in the browser context
        window.Vue = Vue
        return await import('@/../dist/index.min')
    })

    it('is registered as Vue mixin', () => {
        expect(Vue.material.selectLocale).to.be.a('function')
    })

    it('does not initially contain any locales', () => {
        expect(Object.keys(Vue.material.locales).length).to.be.equal(0)
    })

    it('registers imported locales', async () => {
        await import('@/../dist/locale/de/index')
        await import('@/../dist/locale/en-US/index')

        expect(Object.keys(Vue.material.locales).length).to.be.equal(2)
        expect(Vue.material.locales.de).to.be.an('object')
        expect(Vue.material.locales['en-US']).to.be.an('object')
        return Promise.resolve()
    })

    it('can register all available locales', async () => {
        await import('@/../dist/locale/index')

        expect(Object.keys(Vue.material.locales).length).to.be.greaterThan(70)
        return Promise.resolve()
    })
})
