import prepareInput from '../../src/core/prepareInput'
import assignHeight from '../../src/core/assignHeight'

describe('assignHeight', () => {
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
    })

    test('assigns empty arrays to all ranges', () => {
      const results = assignHeight(items)

      expect(results['a'].height).toEqual(5)
      expect(results['b'].height).toEqual(5)
      expect(results['c'].height).toEqual(5)
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
    })

    test('assigns context correctly', () => {
      const results = assignHeight(items)

      expect(results['a'].height).toEqual(5)
      expect(results['b'].height).toEqual(5)
      expect(results['c'].height).toEqual(5)
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
    })

    test('assigns context correctly', () => {
      const results = assignHeight(items)

      expect(results['a'].height).toEqual(5)
      expect(results['b'].height).toEqual(5)
      expect(results['c'].height).toEqual(5)
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
    })

    test('assigns context correctly', () => {
      const results = assignHeight(items)

      expect(results['a'].height).toEqual(5)
      expect(results['b'].height).toEqual(5)
      expect(results['c'].height).toEqual(5)
      expect(results['d'].height).toEqual(5)
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
    })

    test('assigns context correctly', () => {
      const results = assignHeight(items)

      expect(results['a'].height).toEqual(5)
      expect(results['b'].height).toEqual(5)
      expect(results['c'].height).toEqual(5)
      expect(results['d'].height).toEqual(3)
      expect(results['e'].height).toEqual(6)
    })
  })
})
