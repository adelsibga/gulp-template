import { path, srcPath, preprocessor } from '../config/path.js'
import { isDev } from '../config/env.js'
import { logger } from "../config/Logger.js";
import {
    src,
    dest,
    browserSync,
    ifPlugin,
    sourcemaps,
    removeComments,
    rename,
    replace,
    sass,
    gcmq,
    autoprefixer,
    cssbeautify,
    cssnano
} from '../config/plugins.js'

function styles() {
    // TODO: check PostCSS and less after uninstall less packages
    return src(path.src.css, { base: `${srcPath + preprocessor}/` })
        .pipe(logger.handleError(`${preprocessor}`.toUpperCase()))
        .pipe(ifPlugin(isDev, sourcemaps.init()))
        .pipe(sass())
        .pipe(gcmq())
        .pipe(autoprefixer())
        .pipe(cssbeautify())
        .pipe(ifPlugin(isDev, sourcemaps.write()))
        .pipe(replace(/@img\//g, '../images/'))
        .pipe(replace(/@fonts\//g, '../fonts/'))
        .pipe(dest(path.build.css))
        .pipe(ifPlugin(isDev, sourcemaps.init()))
        .pipe(cssnano({
            zIndex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(removeComments())
        .pipe(rename({
            suffix: '.min',
            extname: '.css'
        }))
        .pipe(ifPlugin(isDev, sourcemaps.write()))
        .pipe(replace(/@img\//g, '../images/'))
        .pipe(replace(/@fonts\//g, '../fonts/'))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}

export {
    styles
}
