import { OverlapData } from '../types'

const assignHeight = (data: OverlapData) => {
  const items = data._ordered

  items.forEach((item) => (item.height = item.end - item.start))

  return data
}

export default assignHeight
