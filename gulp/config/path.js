const srcPath = 'src/'
const buildPath = 'build/'
const preprocessor = 'scss'

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

export {
    path,
    srcPath,
    buildPath,
    preprocessor,
}
