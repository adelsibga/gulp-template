class TopMobileMenu {
    constructor() {
        this._openedMenuClass = 'opened'
        this._closedMenuClass = 'closed'
        this._mainMenuButton = document.querySelector('#mainMenuCollapseButton')
        this._serviceMenuButton = document.querySelector('#serviceMenuButton')
        this._grayLayer = document.querySelector('#grayLayerMain')
        this._mainMenu = document.querySelector('#mainMenu')
        this._serviceMenu = document.querySelector('#serviceMenu')
        // eslint-disable-next-line func-call-spacing
        this._links = this._mainMenu.querySelectorAll('a[href*="#"]:not([href="#"])')
        this._menu = this._addEvents()
    }

    _hideMenu() {
        this._mainMenuButton.classList.contains(this._openedMenuClass) && this._mainMenuButton.click()
        this._serviceMenuButton.classList.contains(this._openedMenuClass) && this._serviceMenuButton.click()
        this._removeEvents()
        this._links.forEach(function (e) {
            e.removeEventListener('click', e => this._menu._hideMenu(e))
        })
    }

    _changeMainMenuState() {
        this._serviceMenuButton.classList.contains(this._openedMenuClass) && this._changeServiceMenuState()
        this._mainMenuButton.classList.toggle(this._closedMenuClass)
        this._mainMenuButton.classList.toggle(this._openedMenuClass)
        this._mainMenu.classList.toggle('in')
        this._mainMenu.classList.toggle('b-animate_slide-up')
        this._mainMenu.classList.toggle('b-animate_slide-down')
        this._grayLayer.classList.toggle('b-graylayer_active')
        this._mainMenuButton.removeEventListener('click', e => this._changeMainMenuState(e))
    }

    _changeServiceMenuState() {
        this._mainMenuButton.classList.contains(this._openedMenuClass) && this._changeMainMenuState()
        this._serviceMenuButton.classList.toggle(this._closedMenuClass)
        this._serviceMenuButton.classList.toggle(this._openedMenuClass)
        this._serviceMenu.classList.toggle('in')
        this._serviceMenu.classList.toggle('b-animate_slide-up')
        this._serviceMenu.classList.toggle('b-animate_slide-down')
        this._grayLayer.classList.toggle('b-graylayer_active_service_menu')
        this._serviceMenuButton.removeEventListener('click', e => this._changeServiceMenuState(e))
    }

    _addEvents() {
        this._mainMenuButton.classList.add(this._closedMenuClass)
        this._serviceMenuButton.classList.add(this._closedMenuClass)
        this._mainMenuButton.addEventListener('click', e => this._changeMainMenuState(e))
        this._serviceMenuButton.addEventListener('click', e => this._changeServiceMenuState(e))
        this._grayLayer.addEventListener('click', e => this._hideMenu(e))
        this._grayLayer.addEventListener('scroll', e => this._hideMenu(e))
        this._grayLayer.addEventListener('touchstart', e => this._hideMenu(e), {
            passive: !0
        })
        this._grayLayer.addEventListener('touchmove', e => this._hideMenu(e), {
            passive: !0
        })
        this._grayLayer.addEventListener('wheel', e => this._hideMenu(e), {
            passive: !0
        })
        this._links.forEach(function (e) {
            e.addEventListener('click', e => this._menu._hideMenu(e))
        })
    }

    _removeEvents() {
        this._grayLayer.removeEventListener('click', e => this._hideMenu(e))
        this._grayLayer.removeEventListener('scroll', e => this._hideMenu(e))
        this._grayLayer.removeEventListener('touchstart', e => this._hideMenu(e))
        this._grayLayer.removeEventListener('touchmove', e => this._hideMenu(e))
        this._grayLayer.removeEventListener('wheel', e => this._hideMenu(e))
    }
}

export {
    TopMobileMenu
}
