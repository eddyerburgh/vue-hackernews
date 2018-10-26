/**
 * @jest-environment node
 */

import { renderToString, render } from '@vue/server-test-utils'
import NotFound from '../NotFound.vue'

describe('NotFound', () => {
  test('renders correctly on server ', () => {
    const str = renderToString(NotFound)
    expect(str).toMatchSnapshot()
  })
  test('renders 404 inside <h1> tag', () => {
    const wrapper = render(NotFound)
    expect(wrapper.find('h1').text()).toBe('404')
  })
})
