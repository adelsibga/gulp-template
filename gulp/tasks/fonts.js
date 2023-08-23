import {path, srcPath} from '../config/path.js'
import {
    src,
    dest,
    plumber,
    notify,
    browserSync,
    ttf2woff2
} from '../config/plugins.js'

function fonts() {
    return src(`${srcPath}fonts/**/*.ttf`, {base: `${srcPath}fonts/`})
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: 'Fonts',
                    subtitle: 'Error',
                    message: 'Error: <%= error.message %>',
                    sound: 'Beep'
                })(err)
                this.emit('end')
            }
        }))
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
        .pipe(src(`${srcPath}/fonts/**/*.woff2`))
        .pipe(dest(path.build.fonts))
        .pipe(browserSync.stream())
}

export {
    fonts
}
