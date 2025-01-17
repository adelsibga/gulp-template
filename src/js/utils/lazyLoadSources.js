/**
 * @type {Map<string, {
 *   element: (HTMLLinkElement|HTMLScriptElement),
 *   isLoading?: boolean,
 * }>}
 */
const documentSources = new Map()

document.addEventListener('DOMContentLoaded', () => {
  const getRelativePath = path => path.split('?')[0].replace(window.location.origin, '')

  const styles = document.querySelectorAll('link[rel="stylesheet"]')
  styles.forEach(item => documentSources.set(getRelativePath(item.href), {
    element: item
  }))

  const scripts = document.querySelectorAll('script[src]')
  scripts.forEach(item => documentSources.set(getRelativePath(item.src), {
    element: item
  }))
})

export const lazyLoadSources = params => {
  const {
    selector,
    styles = [],
    scripts = [],
    callback
  } = params

  const options = {
    rootMargin: '200px 0px',
    threshold: 0
  }

  const elements = document.querySelectorAll(selector)

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          Promise.all([
            loadSources(scripts, loadScript),
            loadSources(styles, loadStyle)
          ])
            .then(() => callback && callback(entry.target))
            .catch(() => {})
            .finally(() => observer.unobserve(entry.target))
        }
      })
    }, options)

    elements.forEach(element => observer.observe(element))
  } else {
    elements.forEach(async element => {
      Promise.all([
        loadSources(scripts, loadScript),
        loadSources(styles, loadStyle)
      ])
        .then(() => callback && callback(entry.target))
        .catch(() => {})
    })
  }
}

/**
 * @param element
 * @return {Promise<void>}
 */
function waitLoadEnd(element) {
  return new Promise((resolve, reject) => {
    const onLoadEnd = event => {
      if (event.type === 'load')
        resolve()
      else
        reject()
      element.removeEventListener('load', onLoadEnd)
      element.removeEventListener('error', onLoadEnd)
    }
    element.addEventListener('load', onLoadEnd)
    element.addEventListener('error', onLoadEnd)
  })
}

const loadSources = (sources, loadFn) => {
  const promises = []
  const sortedSources = dfsSortSources(sources)
  sortedSources.forEach(src => {
    if (!documentSources.has(src) && !hasInDelayedLoading(src)) {
      promises.push(loadFn(src))
    } else if (!hasInDelayedLoading(src) && documentSources.get(src).isLoading) {
      promises.push(waitLoadEnd(documentSources.get(src).element))
    }
  })
  return Promise.all(promises)
}

const loadStyle = source => new Promise((resolve, reject) => {
  const style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = source
  waitLoadEnd(style)
    .then(() => resolve())
    .catch(() => reject())
    .finally(() => {
      documentSources.get(source).isLoading = false
    })
  documentSources.set(source, {
    element: style,
    isLoading: true
  })
  insertElement('link', style)
})

const loadScript = (source, id, async) => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  script.src = source
  if (id !== null) {
    script.id = id
  }
  if (async !== null) {
    script.async = async
  }
  waitLoadEnd(script)
    .then(() => resolve())
    .catch(() => reject())
    .finally(() => {
      documentSources.get(source).isLoading = false
    })
  documentSources.set(source, {
    element: script,
    isLoading: true
  })
  insertElement('script', script)
})

const insertElement = (type, element) => {
  const firstElement = document.getElementsByTagName(type)[0]
  firstElement.insertAdjacentElement('beforebegin', element)
}

const dfsSortSources = sources => {
  const sortedKeys = []
  const visited = new Set()

  const recursiveSort = (source, visited, sortedKeys) => {
    visited.add(source)
    const {deps} = sources[source]
    if (deps) {
      deps.forEach(key => {
        if (!visited.has(key)) {
          recursiveSort(key, visited, sortedKeys)
        }
      })
    }
    sortedKeys.push(source)
  }

  Object.keys(sources).forEach(source => {
    if (!visited.has(source)) {
      recursiveSort(source, visited, sortedKeys)
    }
  })

  return sortedKeys.map(key => getSourcePath(sources[key]))
}

const getSourcePath = data => {
  if (typeof data === 'string') {
    return data
  } else if (typeof data === 'object') {
    return data.src
  } else {
    console.warn(`Unexpected type of script data: ${typeof data}`)
  }
}

const hasInDelayedLoading = src => {
  const srcParts = src.split('/')
  const fileName = srcParts[srcParts.length - 1]
  const fileNameParts = fileName.split('.')
  const isClass = (fileNameParts[1] === 'class')
  const className = fileNameParts[0]

  if (!isClass) return false
  return !!existClass(className)
}

const existClass = function (className) {
  return new Function('return typeof ' + className + ' == "function"')()
}
