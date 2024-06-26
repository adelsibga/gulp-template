import { path, srcPath } from '../config/path.js'
import { isProd } from '../config/env.js'
import { logger } from '../config/logger.js'
import { stringReplacement } from '../config/replace.js'
import {
    src,
    dest,
    browserSync,
    ifPlugin,
    twig,
    htmlMin
} from '../config/plugins.js'

function twig2Html() {
    // TODO: configure htmlMin https://github.com/kangax/html-minifier
    return src(path.src.twig, { base: srcPath })
        .pipe(logger.handleError('Twig'))
        .pipe(twig({
            errorLogToConsole: true
        }))
        .pipe(stringReplacement(/@img\//g, './images/'))
        .pipe(stringReplacement(/@fonts\//g, './fonts/'))
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
