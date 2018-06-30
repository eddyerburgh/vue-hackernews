import { fetchListData } from '../api/api'

export default {
  fetchListData: ({ commit }, { type }) => {
    return fetchListData(type)
      .then(items => commit('setItems', { items }))
  }
}
