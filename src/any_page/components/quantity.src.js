const quantitySrc = document.querySelectorAll('.qtyInput')
const plus = document.querySelectorAll('.quantity__button_plus')
const minus = document.querySelectorAll('.quantity__button_minus')

function decrement(i) {
    if (quantitySrc[i].value <= 1) {
        quantitySrc[i].value = 1
    } else {
        quantitySrc[i].value = parseInt(quantitySrc[i].value) - 1
    }
}

function increment(i) {
    if (quantitySrc[i].value >= 1000) {
        quantitySrc[i].value = 1000
    } else {
        quantitySrc[i].value = parseInt(quantitySrc[i].value) + 1
    }
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
