import {path} from '../config/path.js'
import {del} from '../config/plugins.js'

function clean() {
    return del(path.clean)
}

export {
    clean
}