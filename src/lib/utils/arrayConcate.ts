export default function arrayConcate<
  T extends Record<string, unknown>
>(arrayOne: T[], arrayTwo: T[], key: keyof T) {
  if (arrayTwo.length <= 0) return arrayOne

  const [value, ...restValue] = arrayTwo

  if (arrayOne.some(v => v[key] == value[key])) {
    return arrayConcate(arrayOne, restValue, key)
  }

  return arrayConcate([...arrayOne, value], restValue, key)
}
