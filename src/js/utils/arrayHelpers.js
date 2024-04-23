const intersection = (arr1, arr2) => arr1.filter(x => arr2.includes(x))

const difference = (arr1, arr2) => arr1.filter(x => !arr2.includes(x))

const symDifference = (arr1, arr2) => arr1.filter(x => !arr2.includes(x))
  .concat(arr2.filter(x => !arr1.includes(x)))

const transpose = (arr) => arr[0].map((_, i) => arr.map(row => row[i]));

const groupArrayElements = (inputArray, numGroups = 1) => {
  if (!Array.isArray(inputArray)) return
  if (!Number.isInteger(numGroups)) return

  const groupedArray = []

  for (let i = numGroups; i > 0; i--) {
    const numElementsToPush = Math.ceil(inputArray.length / i)
    groupedArray.push(inputArray.splice(0, numElementsToPush))
  }

  return groupedArray
}

export {
  intersection,
  difference,
  symDifference,
  transpose,
  groupArrayElements
}
