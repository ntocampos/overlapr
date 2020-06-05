type Range = [number, number]

const areRangesOverlapping = ([start1, end1]: Range, [start2, end2]: Range) => {
  if (!(start1 <= end1 && start2 <= end2)) {
    throw new RangeError('Interval ends must be before its start')
  }

  return start1 < end2 && start2 < end1
}

export default areRangesOverlapping
