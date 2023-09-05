import { path, srcPath } from '../config/path.js'
import { logger } from '../config/logger.js'
import {
    src,
    dest,
    browserSync,
    replace
} from '../config/plugins.js'

function assets() {
    return src(path.src.assets, { base: `${srcPath}assets/` })
        .pipe(logger.handleError('Assets'))
        .pipe(replace(/@img\//g, '../images/'))
        .pipe(dest(path.build.assets))
        .pipe(browserSync.stream())
}

export {
    assets
}
