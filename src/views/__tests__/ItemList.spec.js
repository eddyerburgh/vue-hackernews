import { mount, shallowMount } from '@vue/test-utils'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'

describe('ItemList vue', () => {

  test('renders an Item for each item in window.items', () => {

    window.items = [{}, {}, {}, {}]
    const wrapper = mount(ItemList)
    console.log(wrapper.findAllComponents(Item).length)

    expect(wrapper.findAllComponents(Item)).toHaveLength(window.items.length)
  })

  test('Item.vue recieve right props data', () => {
    window.items = [{}, {}, {}, {}]
    const wrapper = shallowMount(ItemList)
    const items = wrapper.findAllComponents(Item)
    expect(items).toHaveLength(window.items.length)

    items.wrappers.forEach((wrapper, i) => {
      console.log(wrapper.props().item)
      expect(wrapper.props().item).toBe(window.items[i])
    })
  })
})