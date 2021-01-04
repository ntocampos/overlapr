import { getConfig } from '../config'
import type { OverlapDataObj, OverlapData } from '../types'

const prepareInput = (
  inputs: object[],
  userConfig: object = {}
): OverlapData => {
  const config = getConfig(userConfig)

  const items: OverlapDataObj = inputs.reduce(
    (acc: OverlapDataObj, item: object) => {
      const id = config.getId(item)

      acc[id] = {
        _original: item,
        id: config.getId(item),
        start: config.getStart(item),
        end: config.getEnd(item),
      }

      return acc
    },
    {}
  )

  return {
    ...items,
    _ordered: Object.values(items).sort((a: any, b: any) => a.start - b.start),
  }
}

export default prepareInput
