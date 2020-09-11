const props = [
    'tag',
    'startYear', 'endYear',
    'dateFormat',
    'days', 'shortDays', 'shorterDays',
    'months', 'shortMonths', 'shorterMonths',
    'firstDayOfAWeek',
    'cancel', 'confirm'
]

function expand(array) {
    const locale = {}
    props.forEach((p, index) => locale[p] = array[index])
    return locale
}

const VueMaterialLocales = {
    install(Vue, locales = []) {
        const tagIndex = props.indexOf('tag')

        Vue.material.locales = {}

        Vue.material.addLocale = function(locale) {
            Vue.material.locales[locale[tagIndex]] = expand(locale)
        }

        Vue.material.addLocales = function(locales) {
            locales.forEach(locale => Vue.material.addLocale(locale))
        }

        Vue.material.selectLocale = function(...tags) {
            for (let normalizedTag = tags.shift().toLowerCase().replace(/_/g, '-'), locale; ;) {
                if (
                    // Exact match?
                    Object.values(Vue.material.locales).some(loc => (locale = loc).tag.toLowerCase()  === normalizedTag) ||

                    // Some locale that is more specific than the requested one?
                    Object.values(Vue.material.locales).some(loc => (locale = loc).tag.toLowerCase().startsWith(normalizedTag))
                ) {
                    Vue.material.locale = locale
                    return locale.tag
                }

                if (tags.length) {
                    // Try the next tag
                    return Vue.material.selectLocale.apply(this, tags)

                } else {
                    // Search for a less specific locale if possible
                    let subtags = normalizedTag.match(/^(.+)-(.+)$/)
                    if (subtags) {
                        normalizedTag = subtags[1]

                    } else {
                        return
                    }
                }
            }
        }

        Vue.material.addLocales(locales)
    },
}


exports.props = props
exports.VueMaterialLocales = VueMaterialLocales
exports.default = VueMaterialLocales

module.exports = exports
