function getUrlPath(url) {
    return window.location.protocol === 'https:' || String(url).indexOf('https://') !== -1
        ? String(url).replace(/^https?:\/\/[^/]*/i, '')
        : String(url).indexOf('http://') === -1
            ? String(url).replace(/^\/\/[^/]*/i, '')
            : String(url).replace(/^http?:\/\/[^/]*/i, '')
}

function stripUrlParams(e) {
    const t = e.split('?')
    return t.length === 0 ? e : t[0]
}

export {
    getUrlPath,
    stripUrlParams
}
