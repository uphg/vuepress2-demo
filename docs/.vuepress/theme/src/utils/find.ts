export const find = <T>(
  array: Array<T>,
  testFun: (item: T, index?: number, array?: T[]) => boolean
) => {
  for (let i = 0; i < array.length; i++) {
    if(testFun(array[i], i, array)) {
      return array[i]
    }
  }
  return false
}