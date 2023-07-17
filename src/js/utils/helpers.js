// Checking numbers within floating point rounding
export function numbersCloseEnoughToEqual(n1, n2) {
    return Math.abs(n1 - n2) < Number.EPSILON
}

// Check for negative zero
export function isNegZero(num) {
    num = Number(num)
    return (num === 0) && (1 / num === -Infinity)
}

// Check is null
export function isNull(el) {
    return (!el && typeof el === 'object')
}
