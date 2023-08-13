/* Global */
const {src, dest} = gulp
import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import browserSync from 'browser-sync'
import ifPlugin from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import removeComments from 'gulp-strip-css-comments' // TODO: add for js
import rename from 'gulp-rename'
import replace from 'gulp-replace'                   // for simple alias

/* Twig || HTML */
import twig from 'gulp-twig'
import htmlMin from 'gulp-htmlmin'

/* Styles */
const sass = gulpSass(dartSass)
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import gcmq from 'gulp-group-css-media-queries'
import autoprefixer from 'gulp-autoprefixer'
import cssbeautify from 'gulp-cssbeautify'
import cssnano from 'gulp-cssnano'

/* Scripts */
import rigger from 'gulp-rigger'
import uglify from 'gulp-uglify'

/* Images */
import avif from 'gulp-avif'
import webp from 'gulp-webp'
import imagemin from 'gulp-imagemin'
import newer from 'gulp-newer'

/* Fonts */
import ttf2woff2 from 'gulp-ttf2woff2'

/* Alias */
// TODO: check https://www.npmjs.com/package/@gulp-plugin/alias

/* Clean */
import del from 'del'

export {
    src,
    dest,
    plumber,
    notify,
    browserSync,
    ifPlugin,
    sourcemaps,
    removeComments,
    rename,
    replace,
    twig,
    htmlMin,
    sass,
    gcmq,
    autoprefixer,
    cssbeautify,
    cssnano,
    rigger,
    uglify,
    avif,
    webp,
    imagemin,
    newer,
    ttf2woff2,
    del
}