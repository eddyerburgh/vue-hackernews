import { mount, shallowMount } from '@vue/test-utils'
import Item from '../Item.vue'

describe('Item.vue', () => {
  test('renders a link to the item.url with item.title as text', () => {
    const item = {
      title: 'some title'
    }
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })
    expect(wrapper.find('a').text()).toBe(item.title)
  })

  test('herf consist of right link', () => {
    const item = {
      title: 'some title',
      url: 'http://google.com'
    }
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })

    expect(wrapper.find('a').attributes().href).toBe('http://google.com')
  })
  test('renders item.score', () => {
    const item = {
      score: 20
    }
    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain(item.score)
  })
  test('renders 3 li', () => {
    const wrapper = mount(Item)
    expect(wrapper.findAll('li').length).toBe(3)
  })
})
