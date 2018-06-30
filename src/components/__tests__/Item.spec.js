import {
  shallowMount,
  RouterLinkStub
} from '@vue/test-utils'
import Item from '../Item.vue'
import merge from 'lodash.merge'

function createWrapper (overrides) {
  const defaultMountingOptions = {
    stubs: {
      RouterLink: RouterLinkStub
    },
    propsData: {
      item: {}
    }
  }
  return shallowMount(Item, merge(defaultMountingOptions, overrides))
}

describe('Item.vue', () => {
  test('renders the hostname', () => {
    const item = {
      url: 'https://some-url.com/with-paths'
    }

    const wrapper = createWrapper({
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain('(some-url.com)')
  })

  test('renders item.score', () => {
    const item = {
      score: 10
    }
    const wrapper = createWrapper({
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain(item.score)
  })

  test('renders item.by', () => {
    const item = {
      by: 'some author'
    }
    const wrapper = createWrapper({
      propsData: {
        item
      }
    })
    expect(wrapper.text()).toContain(item.by)
  })

  test('renders a link to the item.url with item.title as text', () => {
    const item = {
      url: 'http://some-url.com',
      title: 'some-title'
    }
    const wrapper = createWrapper({
      propsData: {
        item
      }
    })
    const a = wrapper.find('a')
    expect(a.text()).toBe(item.title)
    expect(a.attributes().href).toBe(item.url)
  })

  test('renders the time since the last post', () => {
    const dateNow = jest.spyOn(Date, 'now')
    const dateNowTime = new Date('2018')

    dateNow.mockImplementation(() => dateNowTime)

    const item = {
      time: (dateNowTime / 1000) - 600
    }
    const wrapper = createWrapper({
      propsData: {
        item
      }
    })
    dateNow.mockRestore()
    expect(wrapper.text()).toContain('10 minutes ago')
  })

  test('renders correctly', () => {
    const dateNow = jest.spyOn(Date, 'now')
    const dateNowTime = new Date('2018')

    dateNow.mockImplementation(() => dateNowTime) // #A

    const item = { // #B
      by: 'eddyerburgh',
      id: 11122233,
      score: 10,
      time: (dateNowTime / 1000) - 600,
      title: 'vue-test-utils is released',
      type: 'story',
      url: 'https://vue-test-utils.vuejs.org/'
    }
    const wrapper = createWrapper({ // #C
      propsData: {
        item
      }
    })
    dateNow.mockRestore()
    expect(wrapper.element).toMatchSnapshot() // #D
  })

  test('renders correctly when item has no url', () => {
    const dateNow = jest.spyOn(Date, 'now')
    const dateNowTime = new Date('2018')

    dateNow.mockImplementation(() => dateNowTime)

    const item = { // #A
      by: 'eddyerburgh',
      id: 11122233,
      score: 10,
      time: (dateNowTime / 1000) - 600,
      title: 'vue-test-utils is released'
    }
    const wrapper = createWrapper({
      propsData: {
        item
      }
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
