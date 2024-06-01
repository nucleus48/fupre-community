export default function joinList<
  TOne extends Record<string, unknown>[],
  TTwo extends Record<string, unknown>[]
>(list1: TOne, list2: TTwo, key: [keyof TOne[number], keyof TTwo[number]]) {
  const result = list1.reduce((prev, curr) => {
    const list2Value = list2.find(value => {
      return value[key[1] as string] == curr[key[0] as string]
    })

    if (list2Value) {
      return [...prev, { ...curr, ...list2Value }]
    }
    return prev
  }, [] as unknown[])

  return result as (TOne[number] & TTwo[number])[]
}
