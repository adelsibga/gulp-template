function outsideClickDropDown(t, n) {
    window.addEventListener('click', e => {
        const o = e.target
        o.closest('.js-dropdown-trigger') || t.classList.remove(n)
    })
}

function setVisibleDropDown() {
    const e = 'visible'

    const o = document.querySelector('.js-product-menu-dropdown')
    const t = document.querySelector('.js-dropdown-trigger')
    t != null && (t.addEventListener('click', () => {
        o.classList.toggle(e)
    }))
    window.addEventListener('scroll', () => {
        o.classList.remove(e)
    })
    outsideClickDropDown(o, e)
}

function scrollingMenu() {
    const o = document.querySelector('.js-product-menu')
    let t = o.offsetHeight
    let n = o.offsetTop
    window.addEventListener('resize', () => {
        t = o.offsetHeight
        n = o.offsetTop
    })

    window.addEventListener('scroll', () => {
        const e = window.pageYOffset
        e > n && o.classList.add('product-menu_scrolling')
        e <= n + t && o.classList.remove('product-menu_scrolling')
    })
}

export {
    setVisibleDropDown,
    scrollingMenu
}
