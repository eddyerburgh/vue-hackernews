import mutations from '../mutations'

describe('mutations', () => {
  test('setItems sets state.items to items', () => {
    const items = [{ id: 1 }, { id: 2 }] //
    const state = {
      items: []
    }
    mutations.setItems(state, { items })
    expect(state.items).toBe(items)
  })
})
