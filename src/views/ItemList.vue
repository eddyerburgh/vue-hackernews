<template>
  <div>
    {{itemList.lenght}}
    <ol >
      <li v-for="item in itemList" :key="item.id">
        <Item :item="item" />
      </li>
    </ol>
  </div>
</template>

<script>
import { fetchListData } from './../api/api.js'
import Item from './../components/Item.vue'
export default {
  name: 'ItemList',
  data () {
    return {
      itemList: []
    }
  },
  components: {
    Item
  },
  created () {
    this.fetchItemList()
  },
  methods: {
    async fetchItemList () {
      this.itemList = await fetchListData('top')
    }
  }
}
</script>

<style lang="scss" scoped></style>
