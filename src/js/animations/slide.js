const DEFAULT_DURATIONS = 500

const slideUp = (target, duration = DEFAULT_DURATIONS) => {
  target.style.transitionProperty = 'height, margin, padding'
  target.style.transitionDuration = duration + 'ms'
  target.style.boxSizing = 'border-box'
  target.style.height = target.offsetHeight + 'px'
  target.offsetHeight
  target.style.overflow = 'hidden'
  target.style.height = 0 + 'px'
  target.style.paddingTop = 0 + 'px'
  target.style.paddingBottom = 0 + 'px'
  target.style.marginTop = 0 + 'px'
  target.style.marginBottom = 0 + 'px'
  window.setTimeout(() => {
    target.style.display = 'none'
    target.style.removeProperty('height')
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    target.style.removeProperty('overflow')
    target.style.removeProperty('transition-duration')
    target.style.removeProperty('transition-property')
  }, duration)
}

const slideDown = (target, duration = DEFAULT_DURATIONS) => {
  target.style.removeProperty('display')
  let display = window.getComputedStyle(target).display
  if (display === 'none') display = 'block'
  target.style.display = display
  let height = target.offsetHeight
  target.style.overflow = 'hidden'
  target.style.height = 0 + 'px'
  target.style.paddingTop = 0 + 'px'
  target.style.paddingBottom = 0 + 'px'
  target.style.marginTop = 0 + 'px'
  target.style.marginBottom = 0 + 'px'
  target.offsetHeight
  target.style.boxSizing = 'border-box'
  target.style.transitionProperty = 'height, margin, padding'
  target.style.transitionDuration = duration + 'ms'
  target.style.height = height + 'px'
  target.style.removeProperty('padding-top')
  target.style.removeProperty('padding-bottom')
  target.style.removeProperty('margin-top')
  target.style.removeProperty('margin-bottom')
  window.setTimeout(() => {
    target.style.removeProperty('height')
    target.style.removeProperty('overflow')
    target.style.removeProperty('transition-duration')
    target.style.removeProperty('transition-property')
  }, duration)
}

const slideToggle = (target, duration = DEFAULT_DURATIONS) => {
  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration)
  } else {
    return slideUp(target, duration)
  }
}

export {
  slideUp,
  slideDown,
  slideToggle
}
