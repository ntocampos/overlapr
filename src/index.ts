import pipe from './helpers/pipe'
import {
  assignDepth,
  assignConflicts,
  assignContext,
  assignOffset,
  assignWidth,
  assignHeight,
} from './core'
import prepareInput from './core/prepareInput'

import { Config, OverlapItem } from './types'

export const processData = (
  userInput: object[],
  config?: Config | object
): Record<string, OverlapItem> => {
  const data = prepareInput(userInput, config)

  return pipe(
    assignDepth,
    assignConflicts,
    assignContext,
    assignOffset,
    assignWidth,
    assignHeight
  )(data)
}

export default { processData }
