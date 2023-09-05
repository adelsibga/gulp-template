import { path, srcPath } from '../config/path.js'
import { isDev } from '../config/env.js'
import { logger } from '../config/logger.js'
import {
    src,
    dest,
    browserSync,
    ifPlugin,
    sourcemaps,
    rename,
    rigger,
    uglify
} from '../config/plugins.js'

function scripts() {
    // TODO: add alias for js
    return src(path.src.js, { base: `${srcPath}js/` })
        .pipe(logger.handleError('JS'))
        .pipe(ifPlugin(isDev, sourcemaps.init()))
        .pipe(rigger())
        .pipe(ifPlugin(isDev, sourcemaps.write()))
        .pipe(dest(path.build.js))
        .pipe(ifPlugin(isDev, sourcemaps.init()))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min',
            extname: '.js'
        }))
        .pipe(ifPlugin(isDev, sourcemaps.write()))
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream())
}

export {
    scripts
}
