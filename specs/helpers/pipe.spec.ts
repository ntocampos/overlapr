import pipe from '@/helpers/pipe'

describe('pipe()', () => {
  test('returns a function', () => expect(pipe()).toBeInstanceOf(Function))

  test('accepts empty arguments', () => {
    const piped = pipe()
    expect(piped('some value')).toEqual('some value')
  })

  describe('piped function', () => {
    const toUpperCase = jest.fn((str) => str.toUpperCase())
    const toArray = jest.fn((str) => str.split(''))
    const reverse = jest.fn((arr) => arr.reverse())
    const join = jest.fn((arr) => arr.join(''))

    test('does not call functions when generating piped one', () => {
      const piped = pipe(toUpperCase, toArray, reverse, join)

      expect(toUpperCase.mock.calls.length).toEqual(0)
      expect(toArray.mock.calls.length).toEqual(0)
      expect(reverse.mock.calls.length).toEqual(0)
      expect(join.mock.calls.length).toEqual(0)
    })

    test('applies each function when calling piped one', () => {
      const piped = pipe(toUpperCase, toArray, reverse, join)

      expect(piped('hello')).toEqual('OLLEH')
      expect(toUpperCase.mock.calls.length).toEqual(1)
      expect(toArray.mock.calls.length).toEqual(1)
      expect(reverse.mock.calls.length).toEqual(1)
      expect(join.mock.calls.length).toEqual(1)
    })
  })
})
