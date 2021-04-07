import { shallowMount } from '@vue/test-utils'
import ProgessBar from '../ProgressBar.vue'

describe("ProgressBar.vue", () => {
    test('is hidden on initial render', () => {
        const wrapper = shallowMount(ProgessBar)
        expect(wrapper.classes()).toContain('hidden')
    })

    test('initialies with 0% width', () => {
        const wrapper = shallowMount(ProgessBar)
        expect(wrapper.element.style.width).toBe('0%')
    })
})