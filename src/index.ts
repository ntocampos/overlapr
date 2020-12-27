export const Greeter = (name: string) => `Hello ${name}`

/*
  const ranges = any[]
  const inputs = prepareInput(ranges)
  const mediator = pipe(
    assignDepth,
    assignOverlaps,
    assignContextualDepth,
  )(inputs)

  mediator.getAll()
  mediator.get(rangeId): Result[]
  mediator.getDepth(rangeId): Float (percentage)
  mediator.getWidth(rangeId): Integer (span)
  mediator.getHeight(rangeId): Integer (span)

  Result = {
    id: String,
    original: Object,
    depth: Float,
    width: Integer,
    height: Integer,
    overlaps: String[],
    context: Integer
  }

*/
