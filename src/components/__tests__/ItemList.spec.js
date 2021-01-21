import { mount } from '@vue/test-utils'
import Item from '../Item.vue'
import ItemList from '../../views/ItemList.vue'

describe('ItemList.vue', () => {
    test('renders all item component', () => {
        const wrapper = mount(ItemList)
    })
})