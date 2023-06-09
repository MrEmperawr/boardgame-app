import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HomeViewVue from '@/views/HomeView.vue'

describe('Home', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeViewVue)
    expect(wrapper).toBeTruthy()
  })
})
