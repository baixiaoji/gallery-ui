<template>
  <div class="tab-pane">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Pane',
    props: {
      name: {
        type: [String, Number],
        required: true,
      },
    },
  };
</script>

<style scoped>
  .tab-pane {
  
  }
</style>
