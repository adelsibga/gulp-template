class ArrowNavigationMenuNew {
    constructor() {
        this.MENU_ITEM_HEIGHT = 27
        this.EVENTS_LIST = ['scroll', 'touchstart', 'touchmove', 'wheel']
        this._arrowButton = document.querySelector('.js-product-mobile-menu-arrow')
        this._grayLayer = document.getElementById('grayLayerSub')
        this._menu = document.getElementById('responsiveTopMenuContent')
        this._menuWrapper = document.getElementById('responsiveTopMenuWrapper')
        this._mainMenuButton = document.getElementById('mainMenuCollapseButton')
        this._cartMenuButton = document.getElementById('serviceMenuButton')
        this._menuList = document.getElementById('responsiveProductMenu')
        this._tabLinks = document.querySelectorAll('.js-link')
        this._tabLinks.forEach(t => {
            t.addEventListener('click', () => this._hideMenu())
        })

        this._menuWrapper && (this._scrollingContent(window.pageYOffset))
        this._scrolling()
        this._arrowButton && (this._arrowButton.addEventListener('click', () => this._changeMenuState()))
        this._arrowButton.addEventListener('dblclick', () => this._changeMenuState())
        this._addMultipleEventListener(this._grayLayer, this.EVENTS_LIST, () => this._hideMenu())
        this._grayLayer.addEventListener('click', () => this._hideMenu())
        this._mainMenuButton && this._mainMenuButton.addEventListener('click', () => this._hideMenu())
        this._cartMenuButton && this._cartMenuButton.addEventListener('click', () => this._hideMenu())
        this._addMultipleEventListener(window, this.EVENTS_LIST, () => this._scrolling())
        window.addEventListener('resize', () => this._changeVisibleMenu())
    }

    _scrolling() {
        const t = window.pageYOffset
        this._scrollingContent(t)
    }

    _scrollingContent(t) {
        this._menuWrapper.offsetTop - t < 0 ? this._menu.classList.add('start_scroll') : this._menu.classList.remove('start_scroll')
        this._changeVisibleMenu()
    }

    _hideMenu() {
        this._arrowButton.classList.contains('up') && this._arrowButton.click()
    }

    _changeMenuState() {
        this._arrowButton.classList.toggle('down')
        this._arrowButton.classList.toggle('up')
        this._menuList.classList.toggle('b-animate_slide-up')
        this._menuList.classList.toggle('b-animate_slide-down')
        this._grayLayer.classList.toggle('display')
        this._arrowButton.classList.contains('down') && this._menuList.removeAttribute('style')
    }

    _changeVisibleMenu() {
        if (this._arrowButton.classList.contains('up')) {
            let t = Math.floor((window.innerHeight - this._menu.offsetHeight) / this.MENU_ITEM_HEIGHT)
            t = this._menu.classList.contains('start_scroll') ? t : t - 2
            this._menuList.style.maxHeight = this.MENU_ITEM_HEIGHT * t + 'px'
            this._menuList.style.overflowY = 'auto'
        } else {
            this._menuList.removeAttribute('style')
        }
    }

    _addMultipleEventListener(e, t, s) {
        t.forEach(t => e.addEventListener(t, s, {
            passive: !0
        }))
    }
}

export {
    ArrowNavigationMenuNew
}
