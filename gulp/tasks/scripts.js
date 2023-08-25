import { path, srcPath } from '../config/path.js'
import { isDev } from '../config/env.js'
import {
    src,
    dest,
    plumber,
    notify,
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
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: 'JS',
                    subtitle: 'Error',
                    message: 'Error: <%= error.message %>',
                    sound: 'Beep'
                })(err)
                this.emit('end')
            }
        }))
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
