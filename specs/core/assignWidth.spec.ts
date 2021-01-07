import prepareInput from '../../src/core/prepareInput'
import assignDepth from '../../src/core/assignDepth'
import assignConflicts from '../../src/core/assignConflicts'
import assignContext from '../../src/core/assignContext'
import assignWidth from '../../src/core/assignWidth'

describe('assignWidth', () => {
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
    beforeEach(() => {
      items = prepareInput([
        { id: 'a', start: 0, end: 5 },
        { id: 'b', start: 5, end: 10 },
        { id: 'c', start: 10, end: 15 },
      ])

      assignDepth(items)
      assignConflicts(items)
      assignContext(items)
    })

    test('assigns empty arrays to all ranges', () => {
      const results = assignWidth(items)

      expect(results['a'].width).toEqual(1)
      expect(results['b'].width).toEqual(1)
      expect(results['c'].width).toEqual(1)
    })
  })

  /* Scenario 2: all ranges overlapping
      -----  -----  -----
     |  a  ||  b  ||  c  |
      -----  -----  -----
  */
  describe('all ranges overlapping', () => {
    beforeEach(() => {
      items = prepareInput([
        { id: 'a', start: 0, end: 5 },
        { id: 'b', start: 0, end: 5 },
        { id: 'c', start: 0, end: 5 },
      ])

      assignDepth(items)
      assignConflicts(items)
      assignContext(items)
    })

    test('assigns context correctly', () => {
      const results = assignWidth(items)

      expect(results['a'].width).toEqual(1 / 3)
      expect(results['b'].width).toEqual(1 / 3)
      expect(results['c'].width).toEqual(1 / 3)
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
    beforeEach(() => {
      items = prepareInput([
        { id: 'a', start: 0, end: 5 },
        { id: 'b', start: 5, end: 10 },
        { id: 'c', start: 3, end: 8 },
      ])

      assignDepth(items)
      assignConflicts(items)
      assignContext(items)
    })

    test('assigns context correctly', () => {
      const results = assignWidth(items)

      expect(results['a'].width).toEqual(1 / 2)
      expect(results['b'].width).toEqual(1 / 2)
      expect(results['c'].width).toEqual(1 / 2)
    })
  })

  /* Scenario 4: two independent clusters
      -----
     |  a  | -----
      ----- |  c  |
      ----- |     |
     |  b  | -----
      -----
      ------------
     |      d      |
      ------------
  */
  describe('two independent clusters', () => {
    beforeEach(() => {
      items = prepareInput([
        { id: 'a', start: 0, end: 5 },
        { id: 'b', start: 5, end: 10 },
        { id: 'c', start: 3, end: 8 },
        { id: 'd', start: 10, end: 15 },
      ])

      assignDepth(items)
      assignConflicts(items)
      assignContext(items)
    })

    test('assigns context correctly', () => {
      const results = assignWidth(items)

      expect(results['a'].width).toEqual(1 / 2)
      expect(results['b'].width).toEqual(1 / 2)
      expect(results['c'].width).toEqual(1 / 2)
      expect(results['d'].width).toEqual(1)
    })
  })

  /* Scenario 5: convoluted cluster
      -----
     |  a  | -----
      ----- |  c  | -----
      ----- |     ||  d  |
     |  b  | -----  -----
      -----  ------------
            |      e      |
             ------------
  */
  describe('one convoluted cluster', () => {
    beforeEach(() => {
      items = prepareInput([
        { id: 'a', start: 0, end: 5 },
        { id: 'b', start: 5, end: 10 },
        { id: 'c', start: 3, end: 8 },
        { id: 'd', start: 5, end: 8 },
        { id: 'e', start: 9, end: 15 },
      ])

      assignDepth(items)
      assignConflicts(items)
      assignContext(items)
    })

    test('assigns context correctly', () => {
      const results = assignWidth(items)

      expect(results['a'].width).toEqual(1 / 3)
      expect(results['b'].width).toEqual(1 / 3)
      expect(results['c'].width).toEqual(1 / 3)
      expect(results['d'].width).toEqual(1 / 3)
      expect(results['e'].width).toEqual(2 / 3)
    })
  })
})
