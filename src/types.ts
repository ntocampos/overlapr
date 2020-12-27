export type SimpleRange = [number, number]

export type Config = {
  getId: (item: any) => string
  getStart: (item: any) => number
  getEnd: (item: any) => number
}

export type Input = {
  id?: string
  start?: number
  end?: number
}

export type OverlapItem = {
  _original: Input
  id: string
  start: number
  end: number
  depth?: number
  width?: number
  height?: number
  overlaps?: string[]
  context?: number
}

export type OverlapData = {
  [key: number]: OverlapItem
  _ordered?: OverlapItem[]
}
