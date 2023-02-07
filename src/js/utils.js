/**
 * Decodes string from get method.
 */
function decodeStringFromGet(string) {
    return string.replace(/\+/g, ' ')
}

/**
 * Returns parameter value by its name.
 */
function getParamValue(paramName) {
    var loc = location.search.substring(1, location.search.length)
    var paramValue = false

    var params = loc.split('&')
    for (var i = 0; i < params.length; i++) {
        var name = params[i].substring(0, params[i].indexOf('='))
        if (name == paramName) {
            paramValue = params[i].substring(params[i].indexOf('=') + 1)
        }
    }
    if (paramValue) {
        return decodeStringFromGet(paramValue)
    }
    else {
        return false
    }
}

function parseUrlParams(url) {
    var urlParts = String(url).split('?')

    return urlParts.length > 1 ? parseQueryString(urlParts[1]) : {}
}

/**
 * Returns parameters and their values from query string.
 */
function parseQueryString(queryString) {
    var pairs = {}

    var params = queryString.split('&')
    for (var i = 0; i < params.length; i++) {
        var name = params[i].substring(0, params[i].indexOf('='))
        pairs[name] = decodeStringFromGet(params[i].substring(params[i].indexOf('=') + 1))
    }

    return pairs
}

/**
 * Returns parameter value by its name from query string
 */
function getQueryParamValue(queryString, paramName) {
    var pairs = parseQueryString(queryString)

    if (pairs[paramName] != undefined) {
        return pairs[paramName]
    }
    else {
        return false
    }
}

/**
 * Returns page name.
 */
function getPageName() {
    var path = window.location.pathname
    var pageName = path.substring(path.lastIndexOf('/') + 1)
    pageName = pageName.toLowerCase()

    return pageName
}

/**
 * Returns domain name.
 */
function getDomain() {
    return window.location.hostname
}

/**
 * Returns path part of URL with query string
 */
function getUrlPath(url) {
    if (window.location.protocol == 'https:' || String(url).indexOf('https://') != -1) {
        return String(url).replace(/^https?:\/\/[^\/]*/i, '')
    }
    else if (String(url).indexOf('http://') == -1) {
        return String(url).replace(/^\/\/[^\/]*/i, '')
    }

    return String(url).replace(/^http?:\/\/[^\/]*/i, '')
}

function getWindowWidth() {
    var windowWidth
    if (self.innerHeight) { // all except Explorer
        windowWidth = self.innerWidth
    }
    else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth
    }
    else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth
    }

    return windowWidth
}

function getWindowHeight() {
    var windowHeight
    if (self.innerHeight) { // all except Explorer
        windowHeight = self.innerHeight
    }
    else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowHeight = document.documentElement.clientHeight
    }
    else if (document.body) { // other Explorers
        windowHeight = document.body.clientHeight
    }

    return windowHeight
}

function openPopupWindow(url, width, height, scrollbar) {
    var width = width || 700
    var height = height || 580
    var top = Math.ceil((screen.height - height) / 2)
    var left = Math.ceil((screen.width - width) / 2)

    var winOptions = 'width=' + width
        + ',height=' + height
        + ',left=' + left
        + ',top=' + top
    if (scrollbar == 'yes') {
        winOptions += ',scrollbars=yes'
    }
    else {
        winOptions += ',scrollbars=no'
    }

    winOptions +=
        ',toolbar=no'
        + ',location=no'
        + ',directories=no'
        + ',menubar=no'
        + ',status=no'

    return window.open(url, '_blank', winOptions)
}

/**
 * Trims value of input object
 */
function TrimInputVal(inputId) {
    var input = $('#' + inputId)
    var value = $.trim(input.val())

    input.val(value)
}

/**
 * Clicks element by it's id.
 */
function clickElementById(elementId) {
    $('#' + elementId).click()
}

/**
 * Preloades images.
 */
function preloadImages(images, start, end) {
    var img = new Image()
    for (var slideIndex = start; slideIndex <= end; slideIndex++) {
        img.src = images[slideIndex]
    }
}

/**
 * Checks if google search results are empty.
 */
function checkEmptyGoogleSearchResults(resContainer, key) {
    var isChecked = false
    $('#' + resContainer).find(' .gsc-results.gsc-webResult').each(function () {
        if (($.trim($(this).html()) == '') && !isChecked) {
            var emptySearchMessage = Messages.KnowledgeBase.EmptySearchResults.replace('%REQUEST_TEXT%', key)
            $('#' + resContainer).html(emptySearchMessage)
        }
        isChecked = true
    })
}

/**
 * Prepares google search results.
 */
function prepareGoogleSearchResults(resContainer, searchText) {
    $('#' + resContainer + ' div.gs-snippet b').each(function () {
        if ($(this).text().toLowerCase() == searchText.toLowerCase()) {
            $(this).addClass('searched_text')
        }
    })
}

/**
 * Returns google search results count.
 */
function getGoogleSearchResultCount(resContainer) {
    var resultsCount = getElementsCount(resContainer, '.gsc-results .gsc-cursor-box .gsc-cursor-page')

    if (resultsCount > 1) {
        return resultsCount * 10
    }

    resultsCount = getElementsCount(resContainer, '.gsc-results .gsc-webResult')

    return resultsCount
}

/**
 * Returns count of elements in container
 */
function getElementsCount(containerId, elemtens) {
    var count = 0
    $('#' + containerId).find(elemtens).each(function () {
        ++count
    })

    return count
}

// Finds position of first occurrence of a string within another
//
// version: 1004.2314
// discuss at: http://phpjs.org/functions/strpos
// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// +   improved by: Onno Marsman
// +   bugfixed by: Daniel Esteban
// +   improved by: Brett Zamir (http://brett-zamir.me)
// *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
// *     returns 1: 14
function strpos(haystack, needle, offset) {
    var i = (haystack + '').indexOf(needle, (offset || 0))

    return i === -1 ? false : i
}

/**
 * Returns url page name.
 */
function getUrlPageName(url) {
    var splitedUrl = url.split('/').pop().split('#')
    if (splitedUrl.length == 0) {
        return ''
    }

    return splitedUrl[0]
}

/**
 * Returns url anchor.
 */
function getURLAnchor(url) {
    return url.split('#').pop()
}

/**
 * Returns URL without anchors.
 */
function clearURLAnchor(url) {
    var splitedUrl = url.split('#')
    if (splitedUrl.length == 0) {
        return ''
    }

    return splitedUrl[0]
}

/**
 *  Returns URL without params
 */
function stripUrlParams(url) {
    var parts = url.split('?')
    if (parts.length == 0) {
        return url
    }

    return parts[0]
}

/**
 * Initializes input clear button.
 */
function initInputClearButton(input, clearButton, clearButtonClickHandler, checkSearchInput) {
    input.keyup(function () {
        checkSearchInput()
    })
    input.focus(function () {
        checkSearchInput()
    })
    input.blur(function () {
        checkSearchInput()
    })

    clearButton.unbind()
    clearButton.click(function () {
        clearButtonClickHandler()
    })
}

/**
 * Checks top menu search input
 */
function checkSearchInput(searchInput, clearSearchButton, basicVal) {
    var inputVal = $.trim(searchInput.val())
    if ((inputVal == '') || (inputVal == basicVal)) {
        clearSearchButton.fadeOut('slow')
        return
    }
    clearSearchButton.fadeIn('slow')
}

/* Utility functions for auto resize iframes */
function ResetIFrames() {
    iFrames = document.getElementsByTagName('iframe')
    for (frameIndex = 0; frameIndex < iFrames.length; frameIndex++) {
        updateFrameHeight(iFrames[frameIndex])
        addVambEve(iFrames[frameIndex], 'load', ResetIFrames)
    }
}

function resetFrameHeight(frameName) {
    var frame = $('[name="' + frameName + '"]')
    updateFrameHeight(frame)
}

function updateFrameHeight(iFrame) {
    var contens = $(iFrame).contents()
    var height = 0
    try {
        height = contens.height()
    }
    catch (Exception) {
        //IE bug with $.height call.
    }
    $(iFrame).css('height', height)
}

function addVambEve(obj, evType, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evType, fn, false)
        return true
    }
    else if (obj.attachEvent) {
        var r = obj.attachEvent('on' + evType, fn)
        return r
    }
    else {
        return false
    }
}

/**
 * Returns file extension.
 */
function getFileExtension(file) {
    var splittedByHash = file.split('#')
    var fileData = splittedByHash[0].split('.')
    if (fileData.length == 0)
        return ''

    return fileData[fileData.length - 1]
}

function getURLHash(url) {
    var hashPos = strpos(url, '#')
    if (strpos === false) {
        return ''
    }
    return url.substr(hashPos + 1, url.length)
}

/**
 * Appends parameters to URL
 * @param url
 * @param params An object of parameters, where keys are param names.
 */
function addUrlParams(url, params) {
    if (!url || !params) {
        return url
    }

    var url = String(url)
    var urlParts = url.split('?')
    var newUrl = urlParts[0]

    var paramStr = ''
    for (var name in params) {
        paramStr += '&' + name + '=' + params[name]
    }

    if (urlParts.length > 1 && urlParts[1] != '') {
        paramStr += '&' + urlParts[1]
    }

    if (paramStr != '') {
        newUrl += '?' + paramStr.substr(1)
    }

    return newUrl
}

function GetHttpQueryString(params) {
    var result
    for (param in params) {
        result += '&' + param + '=' + encodeURI(params[param])
    }

    return result.substr(1)
}

/**
 * adds advertisment parameter from page url to any link
 */
function addAdParam(link_id) {
    var adValue = getParamValue('ad')
    if (adValue != false) {
        var params = {'ad': adValue}

        var downloadLink = $(link_id)
        var downloadLinkURL = downloadLink.attr('href')
        downloadLink.attr('href', addUrlParams(downloadLinkURL, params))
    }
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ))

    return matches ? decodeURIComponent(matches[1]) : undefined
}

function isEmptyObject(obj) {
    if (obj) {
        for (field in obj) {
            return false
        }
    }
    return true
}

function getFormFieldsNames(form) {
    var fields = form.find(':input:not(:button)')
    var names = new Array()
    for (var i = 0; i < fields.length; i++) {
        if (names.toString().indexOf($(fields[i]).attr('name')) == -1) {
            names[i] = $(fields[i]).attr('name')
        }
    }
    return names
}

function isIe() {
    var ua = window.navigator.userAgent

    var msie = ua.indexOf('MSIE ')
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
    }

    var trident = ua.indexOf('Trident/')
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:')
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
    }

    var edge = ua.indexOf('Edge/')
    if (edge > 0) {
        // IE 12 (aka Edge) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
    }

    return false
}

function isIe11() {
    return (Object.hasOwnProperty.call(window, 'ActiveXObject') && !window.ActiveXObject)
}

function isEdge() {
    var ua = window.navigator.userAgent
    var edge = ua.indexOf('Edge/')

    if (edge > 0) {
        // IE 12 (aka Edge) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
    }

    return false
}

function isChrome() {
    return $.browser.webkit && !!window.chrome
}

function isSafari() {
    return ($.browser.webkit && !window.chrome)
}

function isSafariMac() {
    var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
    var isSafari = $.browser.webkit && !window.chrome
    return (isMac && isSafari)
}

function getBrowser() {
    return (isChrome()) ? 'chrome' :
        ((isIe8()) ? 'ie8' :
            ((isIe10()) ? 'ie10' :
                ((isIe9()) ? 'ie9' :
                    ((isIe11()) ? 'ie11' :
                        ((isIeLt7()) ? 'ie7' :
                            ((isFF()) ? 'firefox' :
                                ((isSafariMac()) ? 'safari_on_mac' :
                                    ((isSafari()) ? 'safari' :
                                        (((isOpera)) ? 'opera' : 'no_detect')))))))))
}

function isSafariChromeHtml5() {
    var userAgent = navigator.userAgent.toLowerCase()
    var isChrome = $.browser.webkit && !!window.chrome
    var isSafari = $.browser.webkit && !window.chrome
    var isHtml5Supported = false

    if (isChrome) {
        userAgent = userAgent.substring(userAgent.indexOf('chrome/') + 7)
        var version = userAgent.substring(0, userAgent.indexOf('.'))
        if (version >= 17) {
            isHtml5Supported = true
        }
    }
    else if (isSafari) {
        userAgent = userAgent.substring(userAgent.indexOf('safari/') + 7)
        var version = userAgent.substring(0, userAgent.indexOf('.'))
        if (version >= 533) {
            isHtml5Supported = true
        }
    }

    return isHtml5Supported
}

function isIPad() {
    var userAgent = navigator.userAgent.toLowerCase()
    var isIpad = userAgent.indexOf('ipad')
    return (isIpad != -1)
}

function isIPhone() {
    var userAgent = navigator.userAgent.toLowerCase()
    var isIphone = userAgent.indexOf('iphone')
    return (isIphone != -1)
}

function isCheckBoxChecked(element) {
    if (isIeLt8()) {
        return element.is('input:checkbox:not(:checked)')
    }

    return element.is('input:checkbox:checked')
}

function isCheckBoxNotChecked(element) {

    if (isIeLt8()) {
        return element.is('input:checkbox:checked')
    }

    return element.is('input:checkbox:not(:checked)')
}

function isHtml5supported() {
    return isIelg9() || isFFlg11() || isOperalg11() || isSafariChromeHtml5() || isIPad() || isAndroid()
}

function isAndroid() {
    var browser = navigator.userAgent.toLowerCase()
    var platform = navigator.platform.toLowerCase()

    var androidIndex = browser.indexOf('android')
    var androidPlatformIndex = platform.indexOf('android')

    var isAndroid = ((androidIndex > -1) || (androidPlatformIndex > -1)) ? true : false

    var isOpera = (browser.indexOf('opera') > -1) ? true : false
    var isFF = (browser.indexOf('firefox') > -1) ? true : false

    if (isAndroid && (isOpera || isFF)) {
        return true
    }

    var androidVStart = androidIndex + 8
    var androidVEnd = androidVStart + 1
    var browserV = browser.substring(androidVStart, androidVEnd)

    if (isAndroid && (browserV == '3' || browserV == '4')) {
        return true
    }

    return false

}

function isWin64bit() {
    if (navigator.userAgent.indexOf('WOW64') != -1 ||
        navigator.userAgent.indexOf('Win64') != -1) {
        return true
    }

    return false
}

function preparePriceString(price) {
    var thousands = Math.floor(price / 1000)
    var beforeThousand = price % 1000

    if (thousands > 0) {
        var digitsCount = beforeThousand.toString().length
        var addition = ''
        switch (digitsCount) {
            case 1:
                addition = '00'
                break
            case 2:
                addition = '0'
                break
        }
        beforeThousand = addition + beforeThousand
    }
    var priceString = (thousands > 0) ? (thousands + ',' + beforeThousand) : beforeThousand

    return priceString
}

function supports_history_api() {
    return !!(window.history && history.pushState)
}

/**
 * Slowly scroll to JQuery element, if pageUrl contains 'system-requirements' substring
 * @param pageUrl String
 * @param element JQuery
 */
function scrollToElementIfSystemRequirementPage(pageUrl, element) {
    if (pageUrl.indexOf('system-requirements.html') > 0) {
        $.scrollTo(element, 800)
    }
}

/**
 *
 * @param message String error message
 * @return {String} of dom element
 */
function prepareLoginFormErrorTooltip(message) {
    var error = '<span class="error">' + message + '</span>'
    return error
}

/**
 * fix IE8 bug with background position on :active event
 * @warning function enlarges button width. Call this function only once.
 * @param button
 */
function fixButtonActiveState(button) {
    button = $(button)
    button.css({width: '+=1'})
    button.css({height: '+=1'})

    button.mousedown(function () {
        increaseBackgroundPosition(this, 1, 1)

        $(document).mouseup(function () {
            $(document).unbind('mouseup', arguments.callee)
            increaseBackgroundPosition(this, -1, -1)
        })
    })
}

/**
 *
 * @param {Object} element DOM element
 * @param {Number} dx
 * @param {Number} dy
 */
function increaseBackgroundPosition(element, dx, dy) {
    element = $(element)

    var startParams = element.css('backgroundPosition')
    if (!startParams || startParams == undefined) {
        startParams = '0px 0px'
    }

    var backgroundPos = startParams.split(' ')
    var xPosStr = backgroundPos[0].replace('px', '')
    var yPosStr = backgroundPos[1].replace('px', '')

    var xPos = Number(xPosStr) + dx
    var yPos = Number(yPosStr) + dy

    var result = String(xPos) + 'px ' + String(yPos) + 'px'

    element.css({
        backgroundPosition: result
    })
}

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus()
        input.setSelectionRange(selectionStart, selectionEnd)
    }
    else if (input.createTextRange) {
        var range = input.createTextRange()
        range.collapse(true)
        range.moveEnd('character', selectionEnd)
        range.moveStart('character', selectionStart)
        range.select()
    }
}

function setCaretToPos(input, pos) {
    setSelectionRange(input, pos, pos)
}

function formatNumber(number, precision) {
    if (isNaN(number)) {
        number = 0
    }
    else if (number === '') {
        number = 0
    }

    number = Number(number).toFixed(precision) + ''

    var parts = number.split('.')
    var intNum = parts[0]
    var chunkLen = intNum.length % 3 || 3
    var numberArr = []

    // break the number into chunks of 3 digits; first chunk may be less than 3
    for (var i = 0; i < intNum.length; i += chunkLen) {
        if (i != 0) {
            chunkLen = 3
        }
        numberArr[numberArr.length] = intNum.substr(i, chunkLen)
    }

    intNum = numberArr.join(',')
    return intNum + (parts.length > 1 ? '.'.parts[1] : '')
}

function isApple() {
    return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
}

function isTabletWindowSize() {
    var width = $(window).width()
    return ((width < 768) && (width > 345))
}

function isMinTablet() {
    var width = $(window).width()
    var height = $(window).height()
    return ((width <= 1024 || height <= 800) || (width <= 800 || height <= 1024))
}

function isOnScreen(element) {
    var scrolledTop = $(window).scrollTop()
    var scrolledBottom = scrolledTop + $(window).height()
    var elementOffsetTop = element.offset().top
    var elementOffsetBottom = elementOffsetTop + element.height()

    return ((elementOffsetTop <= scrolledBottom) && (elementOffsetBottom >= scrolledTop))
}

function inIframe() {
    try {
        return window.self !== window.top
    }
    catch (e) {
        return true
    }
}

function loadImages(container, imageClass) {
    var imgs = container.find('img')

    imgs.each(function () {
        if ($(this).attr('data-srcset') && $(this).hasClass(imageClass)) {
            $(this).attr('srcset', $(this).attr('data-srcset'))
            $(this).parent('.lazy_container').css('height', 'auto')
            $(this).removeAttr('data-srcset')
        }
    })
}

function transliterateRuText(ruText) {
    var transl = []
    transl['А'] = 'A'
    transl['а'] = 'a'
    transl['Б'] = 'B'
    transl['б'] = 'b'
    transl['В'] = 'V'
    transl['в'] = 'v'
    transl['Г'] = 'G'
    transl['г'] = 'g'
    transl['Д'] = 'D'
    transl['д'] = 'd'
    transl['Е'] = 'E'
    transl['е'] = 'e'
    transl['Ё'] = 'Yo'
    transl['ё'] = 'yo'
    transl['Ж'] = 'Zh'
    transl['ж'] = 'zh'
    transl['З'] = 'Z'
    transl['з'] = 'z'
    transl['И'] = 'I'
    transl['и'] = 'i'
    transl['Й'] = 'J'
    transl['й'] = 'j'
    transl['К'] = 'K'
    transl['к'] = 'k'
    transl['Л'] = 'L'
    transl['л'] = 'l'
    transl['М'] = 'M'
    transl['м'] = 'm'
    transl['Н'] = 'N'
    transl['н'] = 'n'
    transl['О'] = 'O'
    transl['о'] = 'o'
    transl['П'] = 'P'
    transl['п'] = 'p'
    transl['Р'] = 'R'
    transl['р'] = 'r'
    transl['С'] = 'S'
    transl['с'] = 's'
    transl['Т'] = 'T'
    transl['т'] = 't'
    transl['У'] = 'U'
    transl['у'] = 'u'
    transl['Ф'] = 'F'
    transl['ф'] = 'f'
    transl['Х'] = 'X'
    transl['х'] = 'x'
    transl['Ц'] = 'C'
    transl['ц'] = 'c'
    transl['Ч'] = 'Ch'
    transl['ч'] = 'ch'
    transl['Ш'] = 'Sh'
    transl['ш'] = 'sh'
    transl['Щ'] = 'Shh'
    transl['щ'] = 'shh'
    transl['Ъ'] = '"'
    transl['ъ'] = '"'
    transl['Ы'] = 'Y\''
    transl['ы'] = 'y\''
    transl['Ь'] = '\''
    transl['ь'] = '\''
    transl['Э'] = 'E\''
    transl['э'] = 'e\''
    transl['Ю'] = 'Yu'
    transl['ю'] = 'yu'
    transl['Я'] = 'Ya'
    transl['я'] = 'ya'

    var result = ''
    for (var i = 0; i < ruText.length; i++) {
        if (transl[ruText[i]] !== undefined) {
            result += transl[ruText[i]]
        }
        else {
            result += ruText[i]
        }
    }

    return result
}

function isMobile() {
    return (/iphone|ipod|android|blackberry|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase()))
}

function isTablet() {
    return (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()))
}

function isMobileOrTablet() {
    return isMobile() || isTablet()
}

const groupArrayElements = (inputArray, numGroups = 1) => {
    if (!Array.isArray(inputArray)) {
        return
    }

    if (!Number.isInteger(numGroups)) {
        return
    }

    const groupedArray = []

    for (let i = numGroups; i > 0; i--) {
        const numElementsToPush = Math.ceil(inputArray.length / i)
        groupedArray.push(inputArray.splice(0, numElementsToPush))
    }

    return groupedArray
}