<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Toast',
    props: {},
  };
</script>

<style scoped lang='scss'>
  $Toast-min-height: 40px;
  $Toast-bg: rgba(0,0,0,0.75);
  .toast {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    color: white;
    font-size: 14px;
    min-height: $Toast-min-height;
    padding: 0 16px;
    background: $Toast-bg;
    box-shadow: 0 0 3px 0 rgba(0,0,0,0.50);
  }
</style>
