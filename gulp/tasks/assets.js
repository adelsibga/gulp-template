import {path, srcPath} from '../config/path.js'
import {
    src,
    dest,
    plumber,
    notify,
    browserSync,
    replace
} from '../config/plugins.js'

function assets() {
    return src(path.src.assets, {base: `${srcPath}assets/`})
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: 'Assets',
                    subtitle: 'Error',
                    message: 'Error: <%= error.message %>',
                    sound: 'Beep'
                })(err)
                this.emit('end')
            }
        }))
        .pipe(replace(/@img\//g, '../images/'))
        .pipe(dest(path.build.assets))
        .pipe(browserSync.stream())
}

export {
    assets
}
