import prepareInput from '../../src/core/prepareInput'

const expectedObj = {
  id0: { id: 'id0', start: 1, end: 2 },
  id1: { id: 'id1', start: 3, end: 4 },
  id2: { id: 'id2', start: 5, end: 6 },
}

describe('prepareInput', () => {
  describe('not using config object', () => {
    const inputs = [
      { id: 'id0', start: 1, end: 2 },
      { id: 'id1', start: 3, end: 4 },
      { id: 'id2', start: 5, end: 6 },
    ]

    test('returns indexed object', () => {
      const result = prepareInput(inputs, {})

      expect(result).toHaveProperty('id0')
      expect(result).toHaveProperty('id1')
      expect(result).toHaveProperty('id2')

      expect(result).toMatchObject(expectedObj)
    })
  })

  describe('using config object', () => {
    const inputs = [
      { customId: 'id0', customStart: 1, customEnd: 2 },
      { customId: 'id1', customStart: 3, customEnd: 4 },
      { customId: 'id2', customStart: 5, customEnd: 6 },
    ]

    const config = {
      getId: ({ customId }) => customId,
      getStart: ({ customStart }) => customStart,
      getEnd: ({ customEnd }) => customEnd,
    }

    test('returns indexed object', () => {
      const result = prepareInput(inputs, config)

      expect(result).toHaveProperty('id0')
      expect(result).toHaveProperty('id1')
      expect(result).toHaveProperty('id2')

      expect(result).toMatchObject(expectedObj)
    })
  })
})
