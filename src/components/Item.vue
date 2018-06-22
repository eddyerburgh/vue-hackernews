<template>
  <li class="item">
    <span class="score">{{ item.score }}</span>
    <span class="title">
      <a :href="item.url" target="_blank" rel="noopener">{{ item.title }}</a>
      <span class="host"> ({{ item.url }})</span>
    </span>
    <br>
    <span class="meta">
      <span class="by">
        by {{ item.by }}
      </span>
    </span>
  </li>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style scoped>
.item {
  background-color: #fff;
  padding: 20px 30px 20px 80px;
  border-bottom: 1px solid #eee;
  position: relative;
  line-height: 20px;
}
.item .score {
  color: #f60;
  font-size: 1.1em;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 0;
  width: 80px;
  text-align: center;
  margin-top: -10px;
}
.item .meta,
.item .host {
  font-size: 0.85em;
  color: #828282;
}
.item .meta a,
.item .host a {
  color: #828282;
  text-decoration: underline;
}
.item .meta a:hover,
.item .host a:hover {
  color: #f60;
}
</style>
