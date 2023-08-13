function _mainMenuHandler(e, o) {
    e.forEach(function (n) {
        n.onmouseover = function () {
            this.classList.contains('open') ? hideMenu(o, e) : (this.classList.add('open'))
            showMenu(o)
            const n = document.querySelectorAll('.b-main-menu__submenu-item-link')
            n.forEach(n => {
                n.classList.add('active')
            }
            )
            _showMenuOnMouseOver(o, e)
        }

        n.onclick = function () {
            this.classList.contains('open') ? hideMenu(o, e) : (this.classList.add('open'))
            showMenu(o
            )
        }

        n.onmouseleave = function () {
            hideMenu(o, e)
        }
    })
}

function _showMenuOnMouseOver(n, e) {
    showMenu(n)
    n.onclick = function () {
        hideMenu(n, e)
    }
}

function selectInitNavigationMenu(e, o, s) {
    const n = document.querySelectorAll('.js-with-submenu')
    n.forEach(function (n) {
        // eslint-disable-next-line no-unused-expressions
        n.onmouseover = function () {
            n.classList.contains(e) || _showMenuOnMouseOver(o, s)
        }
        // eslint-disable-next-line no-unused-expressions
        n.onclick = function () {
            // eslint-disable-next-line no-unused-expressions
            n.classList.contains(e) || (this.classList.contains('open')
                ? (this.classList.remove('open'),
                hideMenu(o, s))
                : (n.classList.add('open'),
                showMenu(o)))
        }
        n.onmouseout = function () {
            hideMenu(o, s)
        }
    })
}

function hideMenu(n, e) {
    // eslint-disable-next-line no-unused-expressions
    n.classList.remove('visible')
    e.forEach(function (n) {
        n.classList.remove('open')
    })
}

function showMenu(n) {
    n.classList.add('visible')
}

function ShowSearchField() {
    const n = document.querySelector('.main_container, .main-container')
    const e = document.querySelector('.js-search-collapse .js-search-icon')
    const o = e.parentElement
    e.onclick = function () {
        o.classList.add('open')
    }

    n.onclick = function (n) {
        if (n.target.classList.contains('js-search-icon') || n.target.classList.contains('b-main-menu__search-input')) {
            return !1
        }
        o.classList.remove('open')
    }
}

export {
    _mainMenuHandler,
    selectInitNavigationMenu,
    ShowSearchField
}
