import gulp from 'gulp'
import { path } from '../config/path.js'
import { twig2Html } from './twig2Html.js'
import { styles, singleStyles } from './styles.js'
import { scripts } from './scripts.js'
import { images } from './images.js'
import { fonts } from './fonts.js'
import { assets } from './assets.js'

function watchFiles() {
    gulp.watch([path.watch.twig], twig2Html)
    gulp.watch([path.watch.css], styles)
    gulp.watch([path.watch.css], singleStyles)
    gulp.watch([path.watch.js], scripts)
    gulp.watch([path.watch.images], images)
    gulp.watch([path.watch.fonts], fonts)
    gulp.watch([path.watch.assets], assets)
}

export {
    watchFiles
}
