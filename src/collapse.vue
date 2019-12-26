<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Collapse',
    props: {
      selected: {
        type: Array,
      }
    },
  };
</script>

<style scoped lang='scss'>
  .collapse {
    border: 1px solid gray;
    border-radius: 4px;
    overflow: hidden;
  }
</style>
