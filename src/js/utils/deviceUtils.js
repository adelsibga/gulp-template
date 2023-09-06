function isIPad() {
    const userAgent = navigator.userAgent.toLowerCase()
    const isIpad = userAgent.indexOf('ipad')
    return (isIpad !== -1)
}

function isIPhone() {
    const userAgent = navigator.userAgent.toLowerCase()
    const isIphone = userAgent.indexOf('iphone')
    return (isIphone !== -1)
}

function isAndroid() {
    const browser = navigator.userAgent.toLowerCase()
    const platform = navigator.platform.toLowerCase()

    const androidIndex = browser.indexOf('android')
    const androidPlatformIndex = platform.indexOf('android')

    const isAndroid = ((androidIndex > -1) || (androidPlatformIndex > -1))

    const isOpera = (browser.indexOf('opera') > -1)
    const isFF = (browser.indexOf('firefox') > -1)

    if (isAndroid && (isOpera || isFF)) {
        return true
    }

    const androidVStart = androidIndex + 8
    const androidVEnd = androidVStart + 1
    const browserV = browser.substring(androidVStart, androidVEnd)

    return isAndroid && (browserV === '3' || browserV === '4')
}

function isMobileOrTablet() {
    return isMobile() || isTablet()
}

function isMobile() {
    return (/iphone|ipod|android|blackberry|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase()))
}

function isTablet() {
    return (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()))
}

export {
    isIPad,
    isIPhone,
    isAndroid,
    isMobileOrTablet,
    isMobile,
    isTablet
}
