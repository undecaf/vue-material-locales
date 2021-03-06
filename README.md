# Locales for the Vue Material datepicker

![Minified size](https://badgen.net/bundlephobia/min/@undecaf/vue-material-locales)
![Open issues](https://badgen.net/github/open-issues/undecaf/vue-material-locales)
![Vulnerabilities](https://snyk.io/test/npm/@undecaf/vue-material-locales/badge.svg)
![Total downloads](https://badgen.net/npm/dt/@undecaf/vue-material-locales)
![License](https://badgen.net/github/license/undecaf/vue-material-locales)


This package provides ~75&nbsp;locales for the [Vue Material datepicker](https://vuematerial.io/components/datepicker),
i.e. day and month names, date formats and button text (all the properties that are required for
[`Vue.material.locale`](https://vuematerial.io/configuration)).

All locales combined comprise about 50&nbsp;kB, ~700&nbsp;bytes/locale. Locales can be
installed individually or all together.

A simple online example [is available here](https://undecaf.github.io/vue-material-locales/example/)
([example source code](https://github.com/undecaf/vue-material-locales/blob/master/src/components/Demo.vue)).


## Installation as ES6 modules

```shell script
$ npm install @undecaf/vue-material-locales
    or
$ yarn add @undecaf/vue-material-locales
```

Registering individual locales:

```javascript 1.8
import VueMaterialLocales from '@undecaf/vue-material-locales'
import en from '@undecaf/vue-material-locales/dist/locale/en-US'
import de from '@undecaf/vue-material-locales/dist/locale/de'
    ...
// This must come after Vue.use(VueMaterial):
Vue.use(VueMaterialLocales, [ en, de ])
```

Registering all available locales:

```javascript 1.8
import VueMaterialLocales from '@undecaf/vue-material-locales'
import locales from '@undecaf/vue-material-locales/dist/locale'
    ...
// This must come after Vue.use(VueMaterial):
Vue.use(VueMaterialLocales, locales)
```


## Installation as `<script>`

Registering individual locales:

```html
<!-- After the Vue and Vue Material scripts -->
<script src="https://cdn.jsdelivr.net/npm/@undecaf/vue-material-locales/dist/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@undecaf/vue-material-locales/dist/locale/en-US/index.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@undecaf/vue-material-locales/dist/locale/de/index.js"></script>
```

Registering all available locales:

```html
<!-- After the Vue and Vue Material scripts -->
<script src="https://cdn.jsdelivr.net/npm/@undecaf/vue-material-locales/dist/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@undecaf/vue-material-locales/dist/locale/index.js"></script>
```


## Selecting a locale

```javascript 1.8
// Assuming that 'en-US' and 'de' have been registered
vm.$material.selectLocale('de')
vm.$material.selectLocale('en-US')
```

`selectLocale()` returns the language tag that was actually selected, or `undefined` if no suitable
locale could be found.

Language tags are treated case-insensitively, and both `'-'` and `'_'` are valid subtag separators.

If the requested locale is not available, a more specific locale is considered first, 
and then a more general one. The search is carried out in registration order: 

```javascript 1.8
// Assuming that 'en-US' and 'de' have been registered
vm.$material.selectLocale('de-DE')  // -> 'de', locale set
vm.$material.selectLocale('en')     // -> 'en-US', locale set
vm.$material.selectLocale('en-AU')  // searches 'en-AU', then 'en' -> 'en-US', locale set
vm.$material.selectLocale('it')     // -> undefined, locale unchanged
```

Fallback locales can be given as additional arguments:

```javascript 1.8
// Assuming that 'en-US' and 'de' have been registered
vm.$material.selectLocale('de-AT', 'en')  // -> 'de', locale set
vm.$material.selectLocale('it', 'de-DE')  // -> 'de', locale set
vm.$material.selectLocale('it', 'en')     // -> 'en-US', locale set
vm.$material.selectLocale('jp', 'it')     // -> undefined, locale unchanged
```


## List of registered locales

Object `vm.$material.locales` contains registered locales by language tag:

```javascript 1.8
{
    de:      { tag: 'de',    /* ... Vue.material.locale properties for German     */ },
    'en-US': { tag: 'en-US', /* ... Vue.material.locale properties for US English */ },
    ...
}
```


## Credits

Date/time formats are based on the locales of the marvelous [date-fns](https://www.npmjs.com/package/date-fns)!


## License

Software: [MIT](http://opensource.org/licenses/MIT)

Documentation: [CC-BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
