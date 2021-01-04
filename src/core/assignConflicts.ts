import hasOverlap from '../helpers/hasOverlap'
import { OverlapData, OverlapItem } from '../types'

const findConflicts = (
  item: OverlapItem,
  items: OverlapItem[],
  startingIndex: number
) =>
  items
    .slice(startingIndex)
    .filter((_item) =>
      hasOverlap([item.start, item.end], [_item.start, _item.end])
    )
    .map(({ id }) => id)

const assignConflicts = (data: OverlapData) => {
  const items = data._ordered

  items.forEach((item, index) => {
    item.conflicts = item.conflicts || []
    item.conflicts.push(...findConflicts(item, items, index + 1))
    item.conflicts.forEach((id) => {
      data[id].conflicts = data[id].conflicts || []
      if (!data[id].conflicts.includes(item.id)) {
        data[id].conflicts.push(item.id)
      }
    })
  })

  return data
}

export default assignConflicts
