import {
  shallowMount,
  createLocalVue,
  RouterLinkStub
} from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import merge from 'lodash.merge'
import ItemView from '../ItemView.vue'
import Spinner from '../../components/Spinner.vue'
import Comment from '../../components/Comment.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

function createStore (overrides) {
  const defaultStoreConfig = {
    actions: {
      fetchComments: jest.fn(() => Promise.resolve()),
      fetchItem: jest.fn(() => Promise.resolve())
    },
    state: {
      comments: {},
      item: {}
    }
  }
  return new Vuex.Store(
    merge(defaultStoreConfig, overrides)
  )
}

function createWrapper (overrides) {
  const defaultMountingOptions = {
    mocks: {
      $route: {
        params: {}
      }
    },
    stubs: {
      RouterLink: RouterLinkStub
    },
    localVue,
    store: createStore()
  }
  return shallowMount(ItemView, merge(defaultMountingOptions, overrides))
}

describe('ItemView.vue', () => {
  test('dispatches fetchItem with id', () => {
    const store = createStore()
    jest.spyOn(store, 'dispatch')
    const mocks = {
      $route: { params: { id: 'abc' } }
    }
    createWrapper({ store, mocks })
    expect(store.dispatch).toHaveBeenCalledWith('fetchItem', {
      id: 'abc'
    })
  })

  test('renders a comment for each comment', async () => {
    expect.assertions(1)
    const store = createStore()
    const wrapper = createWrapper({ store })
    store.state.item = {
      kids: ['a1', 'a2']
    }
    await flushPromises()
    expect(wrapper.findAll(Comment)).toHaveLength(2)
  })

  test('renders spinner if item has comments', () => {
    const store = createStore({
      state: {
        item: {
          kids: ['a1']
        }
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.find(Spinner).exists()).toBe(true)
  })

  test('hides spinner when comments are loaded', async () => {
    expect.assertions(2)
    const store = createStore({
      state: {
        item: {
          kids: ['a1']
        }
      }
    })
    const wrapper = createWrapper({ store })
    expect(wrapper.find(Spinner).exists()).toBe(true)
    store.state.item = {}
    await flushPromises()
    expect(wrapper.find(Spinner).exists()).toBe(false)
  })
})
