import { OverlapData } from '../types'

const assignWidth = (data: OverlapData) => {
  const items = data._ordered

  items.forEach((item) => {
    const nextConflictingDepths = item.conflicts
      .filter((id) => data[id].depth > item.depth)
      .map((id) => data[id].depth)

    const startingDepth = item.depth
    const endingDepth = nextConflictingDepths.length
      ? Math.min(...nextConflictingDepths)
      : item.context

    item.width = (endingDepth - startingDepth) / item.context
  })

  return data
}

export default assignWidth
