import prepareInput from '../../src/core/prepareInput'
import assignConflicts from '../../src/core/assignConflicts'

describe('assignConflicts', () => {
  let items

  /* Scenario 1: non-overlapping ranges
      -----
     |  a  |
      -----
      -----
     |  b  |
      -----
      -----
     |  c  |
      -----
  */
  describe('non-overlapping ranges', () => {
    beforeEach(
      () =>
        (items = prepareInput([
          { id: 'a', start: 0, end: 5 },
          { id: 'b', start: 5, end: 10 },
          { id: 'c', start: 10, end: 15 },
        ]))
    )

    test('assigns empty arrays to all ranges', () => {
      const results = assignConflicts(items)

      expect(results['a'].conflicts).toEqual([])
      expect(results['b'].conflicts).toEqual([])
      expect(results['c'].conflicts).toEqual([])
    })
  })

  /* Scenario 2: all ranges overlapping
      -----  -----  -----
     |  a  ||  b  ||  c  |
      -----  -----  -----
  */
  describe('all ranges overlapping', () => {
    beforeEach(
      () =>
        (items = prepareInput([
          { id: 'a', start: 0, end: 5 },
          { id: 'b', start: 0, end: 5 },
          { id: 'c', start: 0, end: 5 },
        ]))
    )

    test('assigns conflicts correctly', () => {
      const results = assignConflicts(items)

      expect(results['a'].conflicts).toEqual(expect.arrayContaining(['b', 'c']))
      expect(results['b'].conflicts).toEqual(expect.arrayContaining(['a', 'c']))
      expect(results['c'].conflicts).toEqual(expect.arrayContaining(['a', 'b']))
    })
  })

  /* Scenario 3: two independent ranges overlapped by a third
      -----
     |  a  | -----
      ----- |  c  |
      ----- |     |
     |  b  | -----
      -----
  */
  describe('two independent ranges overlapped by a third', () => {
    beforeEach(
      () =>
        (items = prepareInput([
          { id: 'a', start: 0, end: 5 },
          { id: 'b', start: 5, end: 10 },
          { id: 'c', start: 3, end: 8 },
        ]))
    )

    test('assigns conflicts correctly', () => {
      const results = assignConflicts(items)

      expect(results['a'].conflicts).toEqual(expect.arrayContaining(['c']))
      expect(results['b'].conflicts).toEqual(expect.arrayContaining(['c']))
      expect(results['c'].conflicts).toEqual(expect.arrayContaining(['a', 'b']))
    })
  })
})
