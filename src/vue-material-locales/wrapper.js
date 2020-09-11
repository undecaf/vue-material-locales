import * as artifacts from './index'

// Install function for GlobalVue.use() below
export default function install(Vue) {
    if (!install.installed) {
        // Install whatever is installable
        for (const name in artifacts) {
            const artifact = artifacts[name]
            if (typeof artifact.install === 'function') {
                try {
                    artifact.install(Vue)
                } catch(ex) {
                    console.error(`Could not install '${name}'`, ex)
                }
            }
        }

        install.installed = true
    }
}

// Auto-install if Vue was found (e.g. in browsers via <script> tag)
let GlobalVue

if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue
}

if (GlobalVue) {
    GlobalVue.use({ install })
}
