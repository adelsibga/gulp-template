if (!Number.EPSILON) {
    Number.EPSILON = Math.pow(2, -52)
}
if (!Number.isInteger) {
    Number.isInteger = function (num) {
        /* eslint-disable-next-line eqeqeq */
        return typeof num == 'number' && num % 1 === 0
    }
}

if (!Number.isSafeInteger) {
    Number.isSafeInteger = function (num) {
        return Number.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER
    }
}

Number.isSafeInteger = Number.isSafeInteger || function (num) {
    return Number.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER
}

if (!Number.isNaN) {
    Number.isNaN = function (num) {
        return (typeof num === 'number' && window.isNaN(num))
    }
}

if (!Number.isNaN) {
    Number.isNaN = function (num) {
        return num !== num
    }
}

if (!Object.is) {
    Object.is = function (v1, v2) {
        if (v1 === 0 && v2 === 0) {
            return 1 / v1 === 1 / v2
        }

        if (v1 !== v2) {
            return v2 !== v1
        }

        return v1 === v2
    }
}
