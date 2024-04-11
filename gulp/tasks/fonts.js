import { path, srcPath } from '../config/path.js'
import { logger } from '../config/logger.js'
import {
    src,
    dest,
    browserSync,
    ttf2woff2
} from '../config/plugins.js'

function fonts() {
    return src(`${srcPath}fonts/**/*.ttf`, { base: `${srcPath}fonts/` })
        .pipe(logger.handleError('Fonts'))
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
        .pipe(src(`${srcPath}/fonts/**/*.woff2`))
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.stream())
}

export {
    fonts
}
