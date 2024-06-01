const srcPath = 'src/'
const buildPath = 'build/'
const preprocessor = 'scss'

const path = {
    build: {
        twig: `${buildPath}`,
        css: `${buildPath}css/`,
        singleCss: file => file.base,
        js: `${buildPath}js/`,
        singleJs: file => file.base,
        images: `${buildPath}images/`,
        fonts: `${buildPath}fonts/`,
        assets: `${buildPath}assets/`
    },
    src: {
        twig: `${srcPath}*.twig`,
        css: `${srcPath + preprocessor}/*.${preprocessor}`,
        singleCss: `${srcPath}any_page/**/*.scss`,
        js: `${srcPath}js/**/*.js`,
        singleJs: `${srcPath}any_page/**/*.js`,
        images: `${srcPath}images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}`,
        fonts: `${srcPath}fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}`,
        assets: `${srcPath}assets/**/*.*`
    },
    watch: {
        twig: `${srcPath}**/*.twig`,
        css: `${srcPath + preprocessor}/**/*.${preprocessor}`,
        singleCss: `${srcPath}any_page/**/*.scss`,
        js: `${srcPath}js/**/*.js`,
        singleJs: `${srcPath}any_page/**/*.js`,
        images: `${srcPath}images/**/*.{jpg,png,svg,gif,ico,webp,avif,webmanifest,xml,json}`,
        fonts: `${srcPath}fonts/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}`,
        assets: `${srcPath}assets/**/*.*`
    },
    clean: `./${buildPath}`
}

export {
    path,
    srcPath,
    buildPath,
    preprocessor
}
