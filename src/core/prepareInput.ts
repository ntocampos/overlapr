import { getConfig } from '@/config'
import type { Input, Config, OverlapData } from '@/types'

const prepareInput = (inputs: Input[], userConfig: object): OverlapData => {
  const config = getConfig(userConfig)

  const items: OverlapData = inputs.reduce((acc: OverlapData, item: Input) => {
    const id = config.getId(item)

    acc[id] = {
      _original: item,
      id: config.getId(item),
      start: config.getStart(item),
      end: config.getEnd(item),
    }

    return acc
  }, {})

  const ordered = Object.values(items).sort(
    (a: any, b: any) => a.start - b.start
  )

  const result = Object.assign(items, {
    _ordered: ordered,
  })

  return result
}

export default prepareInput
