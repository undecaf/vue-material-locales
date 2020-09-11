import vue from 'rollup-plugin-vue'
import buble from '@rollup/plugin-buble'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import css from 'rollup-plugin-css-only'
import license from 'rollup-plugin-license'
import moment from 'moment'
import pkg from './package.json'


function kebabToPascal(text) {
    return text.replace(/(^\w|-\w)/g, t => t.replace(/-/, '').toUpperCase());
}

function unscoped(name) {
    return name.replace(/^(@.+?\/)?/, '')
}

const
    name = kebabToPascal(unscoped(pkg.name)),
    src = `src/${unscoped(pkg.name)}`


const prologue = [
    replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
    }),
]

const epilogue = [
    buble({
        objectAssign: 'Object.assign',
        transforms: {
            dangerousForOf: true,
        },
    }),
    resolve(),
    commonjs(),
    license({
        sourcemap: true,
        banner: {
            content: `${pkg.name} v${pkg.version}
                        ${pkg.description}
                        Built ${moment().format('YYYY-MM-DD HH:mm:ss')}
                        (c) 2020-present Ferdinand Kasper
                        Released under the MIT license`,
            commentStyle: 'ignored',
        },
        thirdParty: {
            allow: 'MIT',
        },
    }),
]


export default [
    {
        // ESM build to be used with webpack/rollup
        input: `${src}/index.js`,
        output: {
            exports: 'named',
            sourcemap: true,
            file: pkg.module,
            format: 'esm',
        },
        plugins: [
            ...prologue,
            vue({
                css: false,
            }),
            css({
                output: pkg.style,
            }),
            ...epilogue,
        ],
    },

    {
        // Browser build
        input: `${src}/wrapper.js`,
        output: {
            exports: 'named',
            sourcemap: true,
            name,
            file: pkg.unpkg,
            format: 'iife',
            compact: true,
        },
        plugins: [
            ...prologue,
            vue(),
            ...epilogue,
        ],
    },

    {
        // SSR build
        input: `${src}/index.js`,
        output: {
            exports: 'named',
            sourcemap: true,
            file: pkg.main,
            format: 'cjs',
            compact: true,
        },
        plugins: [
            ...prologue,
            css({
                output: pkg.style,
            }),
            vue({
                css: false,
                template: {
                    optimizeSSR: true,
                },
            }),
            ...epilogue,
        ],
    },
]
