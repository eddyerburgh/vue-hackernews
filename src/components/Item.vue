<template>
  <div>
    Title: {{itemInfo.title}}
    <ul>
      Author:
      <li>{{ itemInfo.by }}</li>
      URL:
      <li>{{ itemInfo.url }}</li>
      Score:
      <li>{{ itemInfo.score }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    info: {
      type: Object,
      default: () => ({}),
      description: "info for each hacker news"
    }
  },
  data() {
    return {
      itemInfo: this.info
    };
  }
};
</script>

<style lang="scss" scoped></style>
