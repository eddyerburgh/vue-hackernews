import { shallowMount } from '@vue/test-utils'
import Item from '../Item.vue'

describe('Item.vue', () => {
  test.skip('render item.url', () => {
    const item = {
      url: 10
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
     expect(wrapper.text()).toContain(item.url)
  })

  test('render item.score', () => {
    const item = {
      score: 10
    }
    const wrapper = shallowMount(Item, {
      propsData: { item }
    })
    expect(wrapper.text()).toContain(item.score)
  })

  test('render item.by', () => {
    const item = {
      by: 'Some Author'
    }

    const wrapper = shallowMount(Item, {
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain(item.by)
  })

  test('item.url with item.title', () => {

    const item = {
      url: 'http://some-url.com',
      title: 'Some Title'
    }

    const wrapper = shallowMount(Item, {
      propsData: {item}
    })

    expect(wrapper.find('a').text()).toBe(item.title)
    expect(wrapper.find('a').attributes().href).toBe(item.url)
    expect(wrapper.find('a').attributes().href === item.url).toBe(true)
  })


})
