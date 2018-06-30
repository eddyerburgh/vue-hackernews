import getters from '../getters'

describe('getters', () => {
  test('displayItems returns the first 20 items from state.items', () => {
    const items = Array(21).fill().map((v, i) => i)
    const state = {
      items,
      route: {
        params: {}
      }
    }
    const result = getters.displayItems(state)
    const expectedResult = items.slice(0, 20)
    expect(result).toEqual(expectedResult)
  })

  test('displayItems returns items 20-40 if page is 2', () => {
    const items = Array(40).fill().map((v, i) => i)
    const result = getters.displayItems({
      items,
      route: {
        params: {
          page: '2'
        }
      }
    })
    const expectedResult = items.slice(20, 40)
    expect(result).toEqual(expectedResult)
  })

  test('displayItems returns remaining items if there are not enough remaining items', () => {
    const numberArray = Array(21).fill().map((v, i) => i)
    const store = {
      items: numberArray,
      route: {
        params: {
          page: '2'
        }
      }
    }
    const result = getters.displayItems(store)
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(numberArray[20])
  })

  test('maxPage returns a rounded number using the current items', () => {
    const items = Array(49).fill().map((v, i) => i)
    const result = getters.maxPage({
      items
    })
    expect(result).toBe(3)
  })
})
