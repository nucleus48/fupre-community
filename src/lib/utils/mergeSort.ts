import { Timestamp } from "firebase/firestore"

type ListValue = {
  lastMessage?: {
    createdAt: Timestamp
  },
  createdAt: Timestamp
}

export default function mergeSort<
  T extends ListValue[],
>(list: T, asc = false): T {
  if (list.length <= 1) return list

  const middle = Math.floor(list.length / 2)
  const left = list.slice(0, middle)
  const right = list.slice(middle)

  return merge(left, right, asc) as T
}

function merge<
  T extends ListValue[],
>(left: T, right: T, asc: boolean): T {
  const [leftValue, ...leftRest] = left
  const [rightValue, ...rightRest] = right

  if (!leftValue) return right
  if (!rightValue) return left

  if (asc) {
    if (getCreatedAt(leftValue) <
      getCreatedAt(rightValue)) {
      return [
        leftValue,
        ...merge(leftRest, right, asc)
      ] as T
    }

    return [
      rightValue,
      ...merge(left, rightRest, asc)
    ] as T
  }

  if (getCreatedAt(leftValue) >
    getCreatedAt(rightValue)) {
    return [
      leftValue,
      ...merge(leftRest, right, asc)
    ] as T
  }

  return [rightValue, ...merge(left, rightRest, asc)] as T
}

function getCreatedAt(value: ListValue) {
  if (!value.lastMessage) return value.createdAt
  return value.lastMessage.createdAt
}
