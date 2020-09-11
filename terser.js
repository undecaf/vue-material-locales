const fs = require('fs')
const path = require('path')
const { minify } = require('terser')

const encoding = "utf-8"


function readFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, encoding, (err, content) => {
            if (err) {
                reject(err)
            } else {
                resolve(content)
            }
        })
    })
}


function writeFile(file, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, content, encoding, err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}


function processFile(jsFile) {
    const mapFile = `${jsFile}.map`

    Promise.all([readFile(jsFile), readFile(mapFile)])
        .then(contents => {
            const basename = path.basename(jsFile)

            const options = {
                compress: true,
                mangle: true,
                module: Boolean(basename.match(/\.esm?\.js/)),
                sourceMap: {
                    content: contents[1],
                    filename: basename,
                    url: path.basename(mapFile),
                },
            }

            options.toplevel = options.module && (options.compress || options.mangle)

            return minify(contents[0], options)
        })

        .then(result => {
            return Promise.all([writeFile(jsFile, result.code), writeFile(mapFile, result.map)])
            console.log(result)

        })

        .then(() => {
            console.log(`Minified ${jsFile}, updated ${mapFile}`)
        })

        .catch(err => {
            throw `Error: ${err}`
        })
}


process.argv.slice(2).forEach(processFile)
