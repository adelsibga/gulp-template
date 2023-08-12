function checkAccount() {
    if (document.querySelector('.js-main-menu-shopping-cart') != null) {
        const t = new XMLHttpRequest()
        t.onload = function () {
            this.status === 200 && refreshCartCount(this.response)
        }
        t.open('GET', '/cart/items/count', !0)
        t.send()
    }
}

function refreshCartCount(t) {
    t = JSON.parse(t)
    const n = parseInt(t.cart_items_count)
    if (n > 0) {
        const t = document.querySelectorAll('.js-cart-items-count')
        const e = document.getElementById('cartItemsCount')
        t.forEach(function (t) {
            t.style.display = 'block'
            t.innerHTML = n
        })
        e.style.display = 'inline-block'
        e.innerHTML = '(' + n + ')'
        document.getElementById('topShoppingCart').setAttribute('href', '/cart/view')
    }
}

export {
    checkAccount
}
