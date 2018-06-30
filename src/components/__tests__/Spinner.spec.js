import { shallowMount } from '@vue/test-utils'
import Spinner from '../Spinner.vue'

describe('Spinner.vue', () => {
  test('renders correctly', () => {
    expect(shallowMount(Spinner).element).toMatchSnapshot() // #A
  })
})
