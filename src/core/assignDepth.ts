import hasOverlap from '../helpers/hasOverlap'
import type { OverlapItem, OverlapData } from '../types'

const assignDepth = (data: OverlapData) => {
  const items = data._ordered
  const groups: OverlapItem[][] = []

  items.forEach((item) => {
    for (const [index, group] of groups.entries()) {
      const hasConflict = group.some((groupItem) => {
        return hasOverlap(
          [item.start, item.end],
          [groupItem.start, groupItem.end]
        )
      })

      if (!hasConflict) {
        item.depth = index
        group.push(item)
        break
      }
    }

    if (isNil(item.depth)) {
      groups.push([item])
      item.depth = groups.length - 1
    }
  })

  return data
}

const isNil = (value: any) => value === undefined || value === null

export default assignDepth
