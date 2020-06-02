import isNil from '../../src/helpers/isNil'

describe('isNil()', () => {
  test('return true if the value is null or undefined', () => {
    expect(isNil()).toBe(true)
    expect(isNil(undefined)).toBe(true)
    expect(isNil(null)).toBe(true)
  })

  test('return false for falsy values', () => {
    expect(isNil(0)).toBe(false)
    expect(isNil(false)).toBe(false)
    expect(isNil('')).toBe(false)
  })

  test('return false for anything else', () => {
    expect(isNil('strings')).toBe(false)
    expect(isNil(10)).toBe(false)
    expect(isNil([])).toBe(false)
    expect(isNil({})).toBe(false)
    expect(isNil(NaN)).toBe(false)
  })
})
