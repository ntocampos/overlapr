import type { SimpleRange } from '@/types'

const hasOverlap = (
  [start1, end1]: SimpleRange,
  [start2, end2]: SimpleRange
) => {
  if (!(start1 <= end1 && start2 <= end2)) {
    throw new RangeError(
      `Interval ends must be before its start: [${start1}, ${end1}], [${start2}, ${end2}]`
    )
  }

  return start1 < end2 && start2 < end1
}

export default hasOverlap
