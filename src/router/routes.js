import ItemList from '../views/ItemList.vue'

export default [
  { path: '/:type(top|new|show|ask|job)/:page?', component: ItemList },
  { path: '/', redirect: '/top' }
]
