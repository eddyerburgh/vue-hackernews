import getters from '../getters'

describe('getters', () => {
  test('displayItems returns the first 20 items from state.items', () => {
    const items = Array(21).fill().map((v, i) => i)
    const state = {
      items
    }
    const result = getters.displayItems(state)
    const expectedResult = items.slice(0, 20)
    expect(result).toEqual(expectedResult)
  })

  test('maxPage returns a rounded number using the current items', () => {
    const items = Array(49).fill().map((v, i) => i)
    const result = getters.maxPage({
      items
    })
    expect(result).toBe(3)
  })
})
