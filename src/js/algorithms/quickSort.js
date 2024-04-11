const QuickSort = (List) => {
  if (List.length <= 1) {
    return List
  }

  const pivot = List[List.length - 1]
  const leftList = []
  const rightList = []

  for (let i = 0; i < List.length - 1; i++) {
    if (List[i] < pivot) {
      leftList.push(List[i])
    } else {
      rightList.push(List[i])
    }
  }

  return [...QuickSort(leftList), pivot, ...QuickSort(rightList)]
}

export {
  QuickSort
}
