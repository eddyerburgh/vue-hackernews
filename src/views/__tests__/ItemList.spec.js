import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import ItemList from '../ItemList.vue'
import Item from '../../components/Item.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ItemList.vue', () => {
  let storeOptions
  let store

  beforeEach(() => {
    storeOptions = {
      getters: {
        displayItems: jest.fn()
      },
      actions: {
        fetchListData: jest.fn(() => Promise.resolve())
      }
    }
    store = new Vuex.Store(storeOptions)
  })

  test('renders an Item with data for each item in displayItems', () => {
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    const items = [{}, {}, {}]
    storeOptions.getters.displayItems.mockReturnValue(items)
    const wrapper = shallowMount(ItemList, {
      mocks: {$bar},
      localVue,
      store
    })
    const Items = wrapper.findAll(Item)
    expect(Items).toHaveLength(items.length)
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.vm.item).toBe(items[i])
    })
  })

  test('calls $bar start on load', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {}
    }
    shallowMount(ItemList, {mocks: {$bar}, localVue, store})
    expect($bar.start).toHaveBeenCalled()
  })

  test('calls $bar finish when load successful', async () => {
    expect.assertions(1)
    const $bar = {
      start: () => {},
      finish: jest.fn()
    }
    shallowMount(ItemList, {mocks: {$bar}, localVue, store})
    await flushPromises()
    expect($bar.finish).toHaveBeenCalled()
  })

  test('dispatches fetchListData with top', async () => {
    expect.assertions(1)
    const $bar = {
      start: () => {},
      finish: () => {}
    }
    store.dispatch = jest.fn(() => Promise.resolve())
    shallowMount(ItemList, {mocks: {$bar}, localVue, store})
    expect(store.dispatch).toHaveBeenCalledWith('fetchListData', {
      type: 'top'
    })
  })

  test('calls $bar fail when fetchListData throws', async () => {
    expect.assertions(1)
    const $bar = {
      start: jest.fn(),
      fail: jest.fn()
    }
    storeOptions.actions.fetchListData.mockRejectedValue()
    shallowMount(ItemList, {mocks: {$bar}, localVue, store})
    await flushPromises()
    expect($bar.fail).toHaveBeenCalled()
  })
})
