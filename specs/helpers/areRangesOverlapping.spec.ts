import subject from '../../src/helpers/areRangesOverlapping'

describe('areRangesOverlapping()', () => {
  test('validates ranges', () => {
    expect(() => subject(1, 5, 10, 6)).toThrow(RangeError)
    expect(() => subject(5, 1, 10, 20)).toThrow(RangeError)
  })

  describe('for non-overlapping ranges', () => {
    test('not touching', () => expect(subject(1, 5, 6, 10)).toBe(false))
    test('touching in its boundaries', () =>
      expect(subject(1, 5, 5, 10)).toBe(false))
  })

  describe('for overlapping ranges', () => {
    test('ending of the first with beginning of the second', () =>
      expect(subject(1, 5, 4, 8)).toBe(true))

    test('beggining of the first with ending of the second', () =>
      expect(subject(10, 15, 5, 12)).toBe(true))

    test('first containing second', () =>
      expect(subject(1, 10, 3, 7)).toBe(true))

    test('first inside second', () => expect(subject(5, 15, 1, 20)).toBe(true))

    test('first equal to second', () => expect(subject(1, 5, 1, 5)).toBe(true))
  })
})
