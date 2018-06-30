import {
  shallowMount,
  createLocalVue,
  RouterLinkStub
} from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import merge from 'lodash.merge'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ItemList.vue', () => {
  function createStore (overrides) {
    const defaultStoreConfig = {
      getters: {
        displayItems: jest.fn()
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve())
      }
    }
    return new Vuex.Store(
      merge(defaultStoreConfig, overrides)
    )
  }

  function createWrapper (overrides) {
    const defaultMountingOptions = {
      mocks: {
        $bar: {
          start: jest.fn(),
          finish: jest.fn(),
          fail: jest.fn()
        },
        $route: {
          params: { type: 'top' }
        }
      },
      stubs: {
        RouterLink: RouterLinkStub
      },
      localVue,
      store: createStore()
    }
    return shallowMount(ItemList, merge(defaultMountingOptions, overrides))
  }

  test('renders an Item with data for each item in displayItems', () => {
    const items = [{}, {}, {}]
    const store = createStore({
      getters: {
        displayItems: () => items
      }
    })

    const wrapper = createWrapper({ store })
    const Items = wrapper.findAll(Item)
    expect(Items).toHaveLength(items.length)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  test('calls $bar start on load', () => {
    const mocks = {
      $bar: {
        start: jest.fn()
      }
    }
    createWrapper({ mocks })
    expect(mocks.$bar.start).toHaveBeenCalled()
  })

  test('calls $bar finish when load successful', async () => {
    expect.assertions(1)
    const mocks = {
      $bar: {
        finish: jest.fn()
      }
    }
    createWrapper({ mocks })
    await flushPromises()
    expect(mocks.$bar.finish).toHaveBeenCalled()
  })

  test('dispatches fetchListData with $route.params.type', async () => {
    expect.assertions(1)
    const store = createStore()
    store.dispatch = jest.fn(() => Promise.resolve())
    const type = 'a type'
    const mocks = {
      $route: {
        params: {
          type
        }
      }
    }
    createWrapper({ store, mocks })
    await flushPromises()
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', { type })
  })

  test('calls $bar fail when fetchListData throws', async () => {
    const store = createStore({
      actions: { fetchListData: jest.fn(() => Promise.reject()) }
    })
    const mocks = {
      $bar: {
        fail: jest.fn()
      }
    }
    createWrapper({ mocks, store })
    await flushPromises()
    expect(mocks.$bar.fail).toHaveBeenCalled()
  })

  test('renders 1/5 when on page 1 of 5', () => {
    const store = createStore({
      getters: {
        maxPage: () => 5
      }
    })
    const wrapper = createWrapper({store})
    expect(wrapper.text()).toContain('1/5')
  })

  test('renders 2/5 when on page 2 of 5', () => {
    const store = createStore({
      getters: {
        maxPage: () => 5
      }
    })
    const mocks = {
      $route: {
        params: {
          page: '2'
        }
      }
    }
    const wrapper = createWrapper({ mocks, store })
    expect(wrapper.text()).toContain('2/5')
  })

  test('calls $router.replace when the page parameter is greater than the max page count', async () => {
    expect.assertions(1)
    const store = createStore({
      getters: {
        maxPage: () => 5
      }
    })
    const mocks = {
      $route: {
        params: {
          page: '1000'
        }
      },
      $router: {
        replace: jest.fn()
      }
    }
    createWrapper({ mocks, store })
    await flushPromises()
    expect(mocks.$router.replace).toHaveBeenCalledWith('/top/1')
  })

  test('calls $router.replace when the page parameter is 0', async () => {
    expect.assertions(1)
    const mocks = {
      $route: {
        params: {
          page: '0'
        }
      },
      $router: {
        replace: jest.fn()
      }
    }
    createWrapper({ mocks })
    await flushPromises()
    expect(mocks.$router.replace).toHaveBeenCalledWith('/top/1')
  })

  test('calls $router.replace when the page parameter is not a number', async () => {
    expect.assertions(1)
    const mocks = {
      $route: {
        params: {
          page: 'abc'
        }
      },
      $router: {
        replace: jest.fn()
      }
    }
    createWrapper({ mocks })
    await flushPromises()
    expect(mocks.$router.replace).toHaveBeenCalledWith('/top/1')
  })

  test('renders a RouterLink with the previous page if one exists', () => {
    const mocks = {
      $route: {
        params: { page: '2' }
      }
    }
    const wrapper = createWrapper({ mocks })

    expect(wrapper.find(RouterLinkStub).props().to).toBe('/top/1')
    expect(wrapper.find(RouterLinkStub).text()).toBe('< prev')
  })

  test('renders a RouterLink with the next page if one exists', () => {
    const store = createStore({
      getters: {
        maxPage: () => 3
      }
    })
    const mocks = {
      $route: {
        params: { page: '1' }
      }
    }
    const wrapper = createWrapper({ store, mocks })
    expect(wrapper.find(RouterLinkStub).props().to).toBe('/top/2')
    expect(wrapper.find(RouterLinkStub).text()).toBe('more >')
  })

  test('renders a RouterLink with the next page when no page param exists', () => {
    const store = createStore({
      getters: {
        maxPage: () => 3
      }
    })
    const wrapper = createWrapper({ store
    })
    expect(wrapper.find(RouterLinkStub).props().to).toBe('/top/2')
    expect(wrapper.find(RouterLinkStub).text()).toBe('more >')
  })

  test('renders an <a> element without an href if there are no previous pages', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('a').attributes().href).toBe(undefined)
    expect(wrapper.find('a').text()).toBe('< prev')
  })

  test('renders an <a> element without an href if there are no next pages', () => {
    const store = createStore({
      getters: {
        maxPage: () => 1
      }
    })
    const wrapper = createWrapper({ store })

    expect(wrapper.findAll('a').at(1).attributes().href).toBe(undefined)
    expect(wrapper.findAll('a').at(1).text()).toBe('more >')
  })
})
