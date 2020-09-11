import Vue from 'vue'
import VueMaterial from 'vue-material'

import VueMaterialLocales from '@/..'
import de from '@/../dist/locale/de'
import pt from '@/../dist/locale/pt'


Vue.config.productionTip = false
Vue.config.devtools = false

Vue.use(VueMaterial)
Vue.use(VueMaterialLocales, [ de, pt ])


describe('Vue Material locales', () => {

    function verifyLocale(tag, expectedTag = tag, ...fallbackTags) {
        const selectedTag = Vue.material.selectLocale(tag, ...fallbackTags)
        expect(Vue.material.locale.tag).to.be.equal(expectedTag)
        expect(selectedTag).to.be.equal(expectedTag)
    }


    it('is registered as Vue mixin', () => {
        expect(Vue.material.selectLocale).to.be.a('function')
    })

    it('initially contains the installed locales', () => {
        expect(Object.keys(Vue.material.locales).length).to.be.equal(2)
        expect(Vue.material.locales.de).to.be.an('object')
        expect(Vue.material.locales.pt).to.be.an('object')
    })

    it('registers additional locales', async () => {
        const en = await import('@/../dist/locale/en-US/index')
        const fr = await import('@/../dist/locale/fr/index')
        Vue.material.addLocale(en)
        Vue.material.addLocale(fr)

        expect(Object.keys(Vue.material.locales).length).to.be.equal(4)
    })

    it('selects a registered locale', () => {
        verifyLocale('fr')
    })

    it('tolerates inexact locale names', () => {
        verifyLocale('En_uS', 'en-US')
    })

    it('falls back to a more general locale', () => {
        verifyLocale('pt-BR', 'pt')
    })

    it('falls back to a more specific locale', () => {
        verifyLocale('en', 'en-US')
        verifyLocale('en-AU', 'en-US')
    })

    it('selects a suitable fallback locale', () => {
        verifyLocale('it', 'pt', 'pt')
        verifyLocale('it', 'pt', 'es', 'pt-BR')
        verifyLocale('it', 'de', 'pt-BR', 'de-AT')
        verifyLocale('it', 'en-US', 'en', 'de')
    })

    it('does not change the current locale if an unregistered locale is requested', () => {
        const
            registered = 'de',
            unregistered = 'it'

        Vue.material.selectLocale(registered)
        expect(Vue.material.locale.tag).to.be.equal(registered)

        expect(Vue.material.selectLocale(unregistered)).to.be.undefined
        expect(Vue.material.locale.tag).to.be.equal(registered)

        expect(Vue.material.selectLocale('abc', unregistered)).to.be.undefined
        expect(Vue.material.locale.tag).to.be.equal(registered)
    })
})
