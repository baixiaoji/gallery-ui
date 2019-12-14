<template>
<div class="tab">
  <slot></slot>
</div>
</template>

<script>
  export default {
    name: 'GUI-Tab',
    props: {
      selected: {
        type: [String, Number],
        require: true,
      },
    },
  };
</script>

<style scoped>
  .tab {
  
  }
</style>
