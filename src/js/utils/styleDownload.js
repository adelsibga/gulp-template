import { isMobile } from './deviceUtils.js'

document.addEventListener('DOMContentLoaded', () => {
  const mobileMaxWidth = 768
  if (isMobile() && window.innerWidth >= mobileMaxWidth) {
    downloadDesktopStyle()
  } else {
    bindResize()
  }
})

function bindResize() {
  window.addEventListener('resize', initDownloadDesktopStyle)
}

function removeEventListenersFromResize() {
  window.removeEventListener('resize', initDownloadDesktopStyle)
}

function initDownloadDesktopStyle() {
  const mobileMaxWidth = 768
  if (!isMobile() || window.innerWidth >= mobileMaxWidth) {
    downloadDesktopStyle()
    removeEventListenersFromResize()
  }
}

function downloadDesktopStyle() {
  const desktopStylePath = '/public/css/'
  const styleNamesArray = [
    'main'
  ]

  for (let i = 0; i <= styleNamesArray.length - 1; i++) {
    const link = document.createElement('link')
    link.href = desktopStylePath + styleNamesArray + '.css'
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.media = 'all'
    document.head.appendChild(link)
  }
}
