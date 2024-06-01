import { path, srcPath, preprocessor } from '../config/path.js'
import { isDev } from '../config/env.js'
import { logger } from '../config/logger.js'
import { stringReplacement } from '../config/replace.js'
import {
    src,
    dest,
    browserSync,
    ifPlugin,
    sourcemaps,
    removeComments,
    rename,
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
        .pipe(stringReplacement(/@img\//g, '../images/'))
        .pipe(stringReplacement(/@fonts\//g, '../fonts/'))
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
        .pipe(stringReplacement(/@img\//g, '../images/'))
        .pipe(stringReplacement(/@fonts\//g, '../fonts/'))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}

function singleStyles() {
  return src([path.src.singleCss])
    .pipe(logger.handleError('singleStyles'))
    .pipe(ifPlugin(isDev, sourcemaps.init()))
    .pipe(sass())
    .pipe(gcmq())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(ifPlugin(isDev, sourcemaps.write()))
    .pipe(stringReplacement(/@img\//g, '../images/'))
    .pipe(stringReplacement(/@fonts\//g, '../fonts/'))
    .pipe(dest(file => file.base))
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
    .pipe(stringReplacement(/@img\//g, '../images/'))
    .pipe(stringReplacement(/@fonts\//g, '../fonts/'))
    .pipe(dest(path.build.singleCss))
    .pipe(browserSync.stream())
}

export {
    styles,
    singleStyles
}
