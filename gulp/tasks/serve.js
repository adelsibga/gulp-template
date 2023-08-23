import {buildPath} from '../config/path.js'
import {browserSync} from '../config/plugins.js'

function serve() {
    browserSync.init({
        server: {
            baseDir: `./${buildPath}`,
            open: false
        }
    })
}

export {
    serve
}
