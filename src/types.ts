export type SimpleRange = [number, number]

export type Config = {
  getId: (item: any) => string
  getStart: (item: any) => number
  getEnd: (item: any) => number
}

export type OverlapItem = {
  _original: object
  id: string
  start: number
  end: number
  depth: number
  conflicts: string[]
  context: number
  offset: number
  width: number
  height: number
}

export type OverlapData = {
  [key: number]: OverlapItem
  _ordered: OverlapItem[]
}
