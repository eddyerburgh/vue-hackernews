export default {
  displayItems (state) {
    const page = Number(state.route.params.page) || 1
    const start = (page - 1) * 20
    const end = page * 20
    return state.items.slice(start, end)
  },
  maxPage (state) {
    return Math.ceil(state.items.length / 20)
  }

}
