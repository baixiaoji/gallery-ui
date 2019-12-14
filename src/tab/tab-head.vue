<template>
  <div class="tab-head">
    <slot></slot>
    <div class='action-wrapper'>
      <slot name='action'></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Head',
    props: {},
  };
</script>

<style scoped lang='scss'>
  .tab-head {
    $tab-head-height: 40px;
    display: flex;
    min-height: $tab-head-height;
    > .action-wrapper {
      margin-left: auto;
    }
  }
</style>
