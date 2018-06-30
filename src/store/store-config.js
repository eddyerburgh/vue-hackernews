import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  item: null,
  items: [],
  comments: {},
  user: null
}

export default {
  state,
  getters,
  actions,
  mutations
}
