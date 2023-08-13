import {path, srcPath} from '../config/path.js'
import {isProd} from '../config/env.js'
import {
    src,
    dest,
    plumber,
    notify,
    browserSync,
    ifPlugin,
    replace,
    twig,
    htmlMin
} from '../config/plugins.js'

function twig2Html() {
    // TODO: configure htmlMin https://github.com/kangax/html-minifier
    return src(path.src.twig, {base: srcPath})
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: 'Twig',
                    subtitle: 'Error',
                    message: 'Error: <%= error.message %>',
                    sound: 'Beep'
                })(err)
                this.emit('end')
            }
        }))
        .pipe(twig({
            errorLogToConsole: true
        }))
        .pipe(replace(/@img\//g, './images/'))
        .pipe(replace(/@fonts\//g, './fonts/'))
        .pipe(ifPlugin(isProd, htmlMin({
            removeComments: true,
            collapseWhitespace: true
        })))
        .pipe(dest(path.build.twig))
        .pipe(browserSync.stream())
}

export {
    twig2Html
}