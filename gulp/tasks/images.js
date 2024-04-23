import { path, srcPath } from '../config/path.js'
import { logger } from '../config/logger.js'
import {
    src,
    dest,
    browserSync,
    avif,
    webp,
    imagemin,
    newer
} from '../config/plugins.js'

// TODO: Добавить для isProd конвертацию изображений и сжатие
function images() {
    return src(`${srcPath}images/**/*.{jpg,png}`, { base: `${srcPath}images/` })
        .pipe(logger.handleError('Images'))
        .pipe(newer(path.build.images))
        .pipe(avif({
            quality: 50
        }))
        .pipe(src(`${srcPath}images/**/*.{jpg,png}`))
        .pipe(newer(path.build.images))
        .pipe(webp())
        .pipe(src(path.src.images))
        .pipe(newer(path.build.images))
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({
                quality: 80,
                progressive: true
            }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ], {
            verbose: false
        }))
        .pipe(dest(path.build.images))
        .pipe(browserSync.stream())
}

export {
    images
}
