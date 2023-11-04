import { checkAccount } from './ispringUI/components/headers/top_menu_common.js'
import { TopMobileMenu } from './ispringUI/components/headers/TopMobileMenu.js'
import { ArrowNavigationMenuNew } from './ispringUI/components/headers/product/mobile.js'
import { scrollerItemAnimation } from './components/scroller/scrollerItem.js'

import {
    _mainMenuHandler,
    selectInitNavigationMenu,
    ShowSearchField
} from './ispringUI/components/headers/top_menu_responsive.js'

import {
    scrollingMenu,
    setVisibleDropDown
} from './ispringUI/components/headers/product/desktop.js'

document.addEventListener('DOMContentLoaded', () => {
    checkAccount()
    const n = document.getElementById('grayLayerMain')
    const e = document.querySelectorAll('.js-main-menu-dropdown')
    _mainMenuHandler(e, n)
    selectInitNavigationMenu('js-not-logged', n, e)
    ShowSearchField()
    new TopMobileMenu()
    new ArrowNavigationMenuNew()
    setVisibleDropDown()
    scrollingMenu()
})

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  scrollerItemAnimation()
}

function ClientsCounter(e) {
  let t, n, r, o = parseInt(e.textContent.replace(/\D/g, ''))
  e.classList.contains('active') && (t = 0,
    n = Math.abs(Math.floor(o / 1e3)),
    r = setInterval(function () {
      t += n,
        e.innerHTML = Math.ceil(t).toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ','),
      t === o && (e.classList.remove('active'),
        clearInterval(r))
    }))
}

document.addEventListener('DOMContentLoaded', function () {
  let n = document.querySelector('.js-number-of-clients')
    , r = new IntersectionObserver(function (e, t) {
      e.forEach(function (e) {
        e.isIntersecting && (ClientsCounter(n),
          r.unobserve(e.target))
      })
    }
  )
  r.observe(n)
})
