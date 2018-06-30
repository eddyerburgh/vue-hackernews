export default {
  displayItems (state) {
    return state.items.slice(0, 20)
  },
  maxPage (state) {
    return Math.ceil(state.items.length / 20)
  }

}
