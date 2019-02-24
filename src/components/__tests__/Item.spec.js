import { shallowMount } from '@vue/test-utils'
import Item from '../Item.vue'

describe('Item.vue', () => {
  test('sanity test', () => {
    const wrapper = shallowMount(Item)
    expect(wrapper.text()).toContain('item')
  })
})
