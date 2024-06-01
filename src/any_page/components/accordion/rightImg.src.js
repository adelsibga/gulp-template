const connectProAccordion = () => {
  const accordions = document.querySelectorAll('.js-connect-pro-accordion-button')
  const accordionContents = document.querySelectorAll('.js-connect-pro-accordion-content')
  let accordionImg = document.querySelector('.js-connect-pro-accordion-image')

  const OPEN_CLASS = 'is-open'
  const ACCORDION_IMG_DIR_PATH = './images/tmp/accordion/rightImg/accordion-img-desktop/'
  const START_ACCORDION_IMG_SRC = `${ACCORDION_IMG_DIR_PATH}start-x2.png`
  const FIRST_ACCORDION_IMG_SRC = `${ACCORDION_IMG_DIR_PATH}first-x2.png`
  const SECOND_ACCORDION_IMG_SRC = `${ACCORDION_IMG_DIR_PATH}second-x2.png`

  const paddingTop = '40'
  const paddingBottom = '30'

  accordions.forEach((itemAcc) => {
    itemAcc.addEventListener('click', (event) => {
      event.preventDefault()
      const context = itemAcc.nextElementSibling

      if (context.style.maxHeight) {
        context.style.maxHeight = null
        context.style.borderBottom = null
        context.style.paddingTop = null
        context.style.paddingBottom = null
        itemAcc.classList.remove(OPEN_CLASS)
      } else {
        context.style.maxHeight = context.scrollHeight + paddingTop + paddingBottom + 'px'
        context.style.borderBottom = '1px solid #bbb'
        context.style.paddingTop = paddingTop + 'px'
        context.style.paddingBottom = paddingBottom + 'px'
        itemAcc.classList.add(OPEN_CLASS)
      }

      accordionContents.forEach((itemCon) => {
        if (itemCon !== context) {
          itemCon.style.borderBottom = null
          itemCon.style.paddingTop = null
          itemCon.style.paddingBottom = null
          itemCon.style.maxHeight = null
        }
      })

      accordions.forEach((item) => {
        if (item !== itemAcc) {
          item.style.borderBottom = null
          item.style.paddingTop = null
          item.style.paddingBottom = null
          item.classList.remove(OPEN_CLASS)
        }
      })

      if (itemAcc.classList.contains('js-accordion-button-first') && itemAcc.classList.contains(OPEN_CLASS)) {
        accordionImg.setAttribute('src', FIRST_ACCORDION_IMG_SRC)
      } else if (itemAcc.classList.contains('js-accordion-button-second') && itemAcc.classList.contains(OPEN_CLASS)) {
        accordionImg.setAttribute('src', SECOND_ACCORDION_IMG_SRC)
      } else {
        accordionImg.setAttribute('src', START_ACCORDION_IMG_SRC)
      }
    })
  })
}

export {
  connectProAccordion
}
