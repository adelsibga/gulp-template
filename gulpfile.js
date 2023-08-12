/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const {src, dest} = require('gulp')
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cssbeautify = require('gulp-cssbeautify')
const removeComments = require('gulp-strip-css-comments')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const sass = require('gulp-sass')(require('sass'))
const less = require('gulp-less')
const cssnano = require('gulp-cssnano')
const gcmq = require('gulp-group-css-media-queries')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const plumber = require('gulp-plumber')
const twig = require('gulp-twig')
const htmlMin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const avif = require('gulp-avif')
const webp = require('gulp-webp')
const newer = require('gulp-newer')
const ttf2woff2 = require('gulp-ttf2woff2')
const del = require('del')
const ifPlugin = require('gulp-if')
const notify = require('gulp-notify')
const rigger = require('gulp-rigger')
const browserSync = require('browser-sync').create()

const preprocessor = 'scss'
const isProd = process.argv.includes('--prod')
const isDev = !isProd

const srcPath = 'src/'
const buildPath = 'build/'

const path = {
    build: {
        twig: `${buildPath}`,
        css: `${buildPath}css/`,
        js: `${buildPath}js/`,
        images: `${buildPath}images/`,
        fonts: `${buildPath}fonts/`,
        assets: `${buildPath}assets/`
    },
    src: {
        twig: `${srcPath}*.twig`,
        css: `${srcPath + preprocessor}/*.${preprocessor}`,
        js: `${srcPath}js/**/*.js`,
        images: `${srcPath}images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}`,
        fonts: `${srcPath}fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}`,
        assets: `${srcPath}assets/**/*.*`
    },
    watch: {
        twig: `${srcPath}**/*.twig`,
        css: `${srcPath + preprocessor}/**/*.${preprocessor}`,
        js: `${srcPath}js/**/*.js`,
        images: `${srcPath}images/**/*.{jpg,png,svg,gif,ico,webp,avif,webmanifest,xml,json}`,
        fonts: `${srcPath}fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}`,
        assets: `${srcPath}assets/**/*.*`
    },
    clean: `./${buildPath}`
}

function serve() {
    browserSync.init({
        server: {
            baseDir: `./${buildPath}`,
            open: false
        }
    })
}

function twig2Html() {
    // TODO: configure htmlMin https://github.com/kangax/html-minifier
    return src(path.src.twig, { base: srcPath })
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: 'Twig',
                    subtitle: 'Error',
                    message: 'Error: <%= error.message %>',
                    sound: 'Beep'
                })(err)
                this.emit('end')
            }
        }))
        .pipe(twig({
            errorLogToConsole: true
        }))
        .pipe(replace(/@img\//g, './images/'))
        .pipe(replace(/@fonts\//g, './fonts/'))
        .pipe(ifPlugin(isProd, htmlMin({
            removeComments: true,
            collapseWhitespace: true
        })))
        .pipe(dest(path.build.twig))
        .pipe(browserSync.stream())
}

function styles() {
    // TODO: check PostCSS
    return src(path.src.css, { base: `${srcPath + preprocessor}/` })
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: `${preprocessor}`.toUpperCase(),
                    subtitle: 'Error',
                    message: 'Error: <%= error.message %>',
                    sound: 'Beep'
                })(err)
                this.emit('end')
            }
        }))
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

function images() {
    return src(`${srcPath}images/**/*.{jpg,png}`, { base: `${srcPath}images/` })
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: 'Images',
                    subtitle: 'Error',
                    message: 'Error: <%= error.message %>',
                    sound: 'Beep'
                })(err)
                this.emit('end')
            }
        }))
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

function fonts() {
    return src(`${srcPath}fonts/**/*.ttf`, { base: `${srcPath}fonts/` })
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

function assets() {
    return src(path.src.assets, { base: `${srcPath}assets/` })
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

function clean() {
    return del(path.clean)
}

function watchFiles() {
    gulp.watch([path.watch.twig], twig2Html)
    gulp.watch([path.watch.css], styles)
    gulp.watch([path.watch.js], scripts)
    gulp.watch([path.watch.images], images)
    gulp.watch([path.watch.fonts], fonts)
    gulp.watch([path.watch.assets], assets)
}

const build = gulp.series(clean, gulp.parallel(twig2Html, styles, scripts, images, fonts, assets))
const watch = gulp.parallel(build, watchFiles, serve)

exports.twig2Html = twig2Html
exports.styles = styles
exports.scripts = scripts
exports.images = images
exports.fonts = fonts
exports.assets = assets
exports.clean = clean
exports.build = build
exports.watch = watch
exports.default = watch
