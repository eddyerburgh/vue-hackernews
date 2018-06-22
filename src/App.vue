<template>
  <div id="app">
    <header class="header" />
    <div class="view">
      <item-list />
  </div>
  </div>
</template>

<script>
import ItemList from './views/ItemList.vue'

export default {
  components: {
    ItemList
  }
}
</script>

<style>
body {
  font-family: -apple-system,"Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 15px;
  background-color: #f2f3f5;
  margin: 0;
  padding-top: 55px;
  color: #34495e;
  overflow-y: scroll;
}
a {
  color: #34495e;
  text-decoration: none;
}
li {
  list-style: none
}
.header {
  background-color: #f60;
  position: fixed;
  z-index: 999;
  height: 55px;
  top: 0;
  left: 0;
  right: 0;
}
.header .inner {
  max-width: 800px;
  box-sizing: border-box;
  margin: 0px auto;
  padding: 15px 5px;
}
.header a {
  color: rgba(255,255,255,0.8);
  line-height: 24px;
  transition: color 0.15s ease;
  display: inline-block;
  vertical-align: middle;
  font-weight: 300;
  letter-spacing: 0.075em;
  margin-right: 1.8em;
}
.header a:hover {
  color: #fff;
}
.header a.router-link-active {
  color: #fff;
  font-weight: 400;
}
.header a:nth-child(6) {
  margin-right: 0;
}
.logo {
  width: 24px;
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
}
.view {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
@media (max-width: 860px) {
  .header .inner {
    padding: 15px 30px;
  }
}
@media (max-width: 600px) {
  .header .inner {
    padding: 15px;
  }
  .header a {
    margin-right: 1em;
  }
}
</style>
