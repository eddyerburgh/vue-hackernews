import Vue from 'vue'

export default {
  setItem: (state, { item }) => {
    state.item = item
  },
  setItems: (state, { items }) => {
    state.items = items
  },
  setComments: (state, { comments }) => {
    comments.forEach(comment => {
      console.log(comment, 'comment')
      if (comment) {
        Vue.set(state.comments, comment.id, comment)
      }
    })
  },
  setUser: (state, { user }) => {
    state.user = user
  }
}
