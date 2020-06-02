const areRangesOverlapping = (
  start1: number,
  end1: number,
  start2: number,
  end2: number
) => {
  if (!(start1 <= end1 && start2 <= end2)) {
    throw new RangeError('Interval ends must be before its start')
  }

  return start1 < end2 && start2 < end1
}

export default areRangesOverlapping
