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
  
  }
</style>
