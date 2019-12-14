<template>
  <div class="tab-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Item',
    props: {
      name: {
        type: [String, Number],
        required: true,
      },
    },
  };
</script>

<style scoped>
  .tab-item {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2em;
  }
</style>
