const
    fs = require('fs'),
    path = require('path'),
    dateFnsLocales = require('date-fns/locale/index.js'),
    translations = require(path.join(__dirname, 'translations.json'))

const
    cwd = path.resolve(process.cwd()),
    localeDir = path.join(cwd, 'dist', 'locale'),
    indexPath = path.join(localeDir, 'index.js'),
    baseDir = path.join(cwd, 'src', 'vue-material-locales'),
    props = require(path.join(baseDir, 'vue-material-locales.js')).props,
    indices = {}


props.forEach((prop, index) => indices[prop] = index)

fs.rmdirSync(localeDir, { recursive: true })
fs.mkdirSync(localeDir)

const indexFile = fs.openSync(indexPath, 'w')
fs.writeSync(indexFile, 'exports.default=module.exports=[')

Object.keys(dateFnsLocales).forEach((key, index) => {
    const
        dateFnsLocale = dateFnsLocales[key],
        locale = new Array(props.length)

    function localize(type, length, width) {
        const fn = dateFnsLocale.localize[type]
        return [...Array(length).keys()].map(i => fn(i, {width}))
    }

    locale[indices.tag] = dateFnsLocale.code
    locale[indices.startYear] = 1900
    locale[indices.endYear] = 2099
    locale[indices.dateFormat] = dateFnsLocale.formatLong.date({width: 'short'})
    locale[indices.days] = localize('day', 7, 'wide')
    locale[indices.shortDays] = localize('day', 7, 'abbreviated')
    locale[indices.shorterDays] = localize('day', 7, 'short')
    locale[indices.months] = localize('month', 12, 'wide')
    locale[indices.shortMonths] = localize('month', 12, 'abbreviated')
    locale[indices.shorterMonths] = localize('month', 12, 'narrow')
    locale[indices.firstDayOfAWeek] = dateFnsLocale.options.weekStartsOn
    locale[indices.cancel] = translations[dateFnsLocale.code].cancel
    locale[indices.confirm] = translations[dateFnsLocale.code].confirm

    const
        localeSrc = JSON.stringify(locale).replace(/"(\\w+?)":/g, '$1:'),
        srcCode = `exports.default=module.exports=${localeSrc};if(typeof Vue!=='undefined')Vue.material.addLocale(exports.default)\n`,
        srcDir = `${localeDir}/${dateFnsLocale.code}`

    fs.mkdirSync(srcDir)
    fs.writeFileSync(path.join(srcDir, 'index.js'), srcCode)

    fs.writeSync(indexFile, `${localeSrc},`)
})

fs.writeSync(indexFile, '];if(typeof Vue!==\'undefined\')Vue.material.addLocales(exports.default)\n');

fs.close(indexFile, (err) => {
    if (err)
        console.error(`Failed to close ${indexPath}`, err)
    }
)
