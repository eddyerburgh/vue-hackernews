<template>
  <div>
    <ul>
      <li>Author:{{ item.by }}</li>
      <li>URL:</li> <a :href=item.url>{{item.title}}</a>
      <li>Score:{{ item.score }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      default: () => ({}),
      description: 'info for each hacker news'
    }
  },
  data () {
    return {
      itemInfo: this.info
    }
  }
}
</script>

<style lang="scss" scoped></style>
