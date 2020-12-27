import type { Config } from '@/types'

export const defaultConfig: Config = {
  getId: ({ id }) => id,
  getStart: ({ start }) => start,
  getEnd: ({ end }) => end,
}

export const getConfig = (config: any) => {
  return {
    getId: config.getId || defaultConfig.getId,
    getStart: config.getStart || defaultConfig.getStart,
    getEnd: config.getEnd || defaultConfig.getEnd,
  }
}
