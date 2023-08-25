'use strict'
import gulp from 'gulp'
import { serve } from './gulp/tasks/serve.js'
import { twig2Html } from './gulp/tasks/twig2Html.js'
import { styles } from './gulp/tasks/styles.js'
import { scripts } from './gulp/tasks/scripts.js'
import { images } from './gulp/tasks/images.js'
import { fonts } from './gulp/tasks/fonts.js'
import { assets } from './gulp/tasks/assets.js'
import { clean } from './gulp/tasks/clean.js'
import { watchFiles } from './gulp/tasks/watchFiles.js'

const build = gulp.series(clean, gulp.parallel(twig2Html, styles, scripts, images, fonts, assets))
const watch = gulp.parallel(build, watchFiles, serve)

gulp.task('default', watch)

export {
    twig2Html,
    styles,
    scripts,
    images,
    fonts,
    assets,
    clean,
    build,
    watch
}
