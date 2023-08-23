import { checkAccount } from './ispringUI/components/headers/top_menu_common.js'
import { TopMobileMenu } from './ispringUI/components/headers/TopMobileMenu.js'
import { ArrowNavigationMenuNew } from './ispringUI/components/headers/product/mobile.js'

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
    // eslint-disable-next-line no-new
    new TopMobileMenu()
    // eslint-disable-next-line no-new
    new ArrowNavigationMenuNew()
    setVisibleDropDown()
    scrollingMenu()
})
