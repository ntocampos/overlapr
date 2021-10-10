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

import { Config } from './types'

export const processData = (userInput: object[], config?: Config | object) => {
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
