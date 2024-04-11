const scrollers = document.querySelectorAll('.scroller')

function scrollerItemAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute('data-animated', true)

    const scrollerInner = scroller.querySelector('.scroller__inner')
    const scrollerContent = Array.from(scrollerInner.children)

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      duplicatedItem.setAttribute('aria-hidden', true)
      scrollerInner.appendChild(duplicatedItem)
    })
  })
}

export {
  scrollerItemAnimation
}
