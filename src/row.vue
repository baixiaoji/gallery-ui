<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Row',
    props: {},
  };
</script>

<style scoped>
  .row {
    display: flex;
  }
</style>
