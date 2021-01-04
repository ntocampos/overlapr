import prepareInput from '../../src/core/prepareInput'
import assignDepth from '../../src/core/assignDepth'

describe('assignDepth', () => {
  let items

  /*
      -----  -----  -----
     |  a  ||  b  ||  c  |
      -----  -----  -----
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

    test('assigns same depth to all ranges', () => {
      const results = assignDepth(items)

      expect(results['a'].depth).toEqual(0)
      expect(results['b'].depth).toEqual(0)
      expect(results['c'].depth).toEqual(0)
    })
  })

  /*
    Scenario 2: two independent events being overlapped by a third
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
  describe('all ranges overlapping', () => {
    beforeEach(
      () =>
        (items = prepareInput([
          { id: 'a', start: 0, end: 5 },
          { id: 'b', start: 0, end: 5 },
          { id: 'c', start: 0, end: 5 },
        ]))
    )

    test('assigns different depths to each', () => {
      const results = assignDepth(items)

      expect(results['a'].depth).toEqual(0)
      expect(results['b'].depth).toEqual(1)
      expect(results['c'].depth).toEqual(2)
    })
  })

  /*
    Scenario 3: two independent events being overlapped by a third
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

    test('assigns same depth to independent ones', () => {
      const results = assignDepth(items)

      expect(results['a'].depth).toEqual(0)
      expect(results['b'].depth).toEqual(0)
      expect(results['c'].depth).toEqual(1)
    })
  })
})
