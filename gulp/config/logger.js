import { plumber, notify } from '../config/plugins.js'

class Logger {
    handleError(title) {
        return plumber({
            errorHandler(err) {
                notify.onError({
                    title,
                    subtle: 'Error',
                    message: 'Error: <%= error.message %>',
                    sound: 'Beep'
                })(err)
                this.emit('end')
            }
        })
    }
}

export const logger = new Logger()
