import { OverlapData } from '../types'

const assignOffset = (data: OverlapData) => {
  const items = data._ordered
  items.forEach((item) => (item.offset = item.depth / item.context))

  return data
}

export default assignOffset
