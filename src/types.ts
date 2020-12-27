export type SimpleRange = [number, number]

export type Config = {
  getId: (item: object) => string
  getStart: (item: object) => number
  getEnd: (item: object) => number
}

export type Input = {
  id?: string
  start?: number
  end?: number
}
