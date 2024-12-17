document.addEventListener('DOMContentLoaded', () => lazyLoadBackground())

const lazyLoadBackground = () => {
  const lazyBackgroundClass = 'js-lazy-background'
  const options = {
    rootMargin: '100px 0px',
    threshold: 0
  }
  const elements = document.querySelectorAll(`.${lazyBackgroundClass}`)

  if ('IntersectionObserver' in window) {
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(lazyBackgroundClass)
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    }, options)

    elements.forEach(element => observer.observe(element))
  } else {
    elements.forEach(e => {
      e.classList.remove(lazyBackgroundClass)
      e.classList.add('active')
    })
  }
}
