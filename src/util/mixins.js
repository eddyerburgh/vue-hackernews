function getTitle (vm) {
  const { title } = vm.$options // #A
  if (title) {
    return typeof title === 'function' // #B
      ? title.call(vm)
      : title
  }
}

export const titleMixin = { // #A
  mounted () { // #B
    const title = getTitle(this)
    if (title) {
      document.title = `Vue HN | ${title}` // #D
    }
  }
}
