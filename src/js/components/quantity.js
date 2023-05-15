let quantity = document.querySelectorAll('.qtyInput')
const plus = document.querySelectorAll('.quantity__button_plus')
const minus = document.querySelectorAll('.quantity__button_minus')

function decrement(i) {
    if (quantity[i].value <= 1) {
        quantity[i].value = 1
    }
    else {
        quantity[i].value = parseInt(quantity[i].value) - 1
    }
}

function increment(i) {
    quantity[i].value = parseInt(quantity[i].value) + 1
}

minus.forEach((e, i) => {
    e.onclick = () => {
        decrement(i)
    }
})

plus.forEach((e, i) => {
    e.onclick = () => {
        increment(i)
    }
})