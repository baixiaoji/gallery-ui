<template>
  <div class="tab-head">
    <slot></slot>
    <div v-if='$slots.action' class='action-wrapper'>
      <slot name='action'></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Head',
  };
</script>

<style scoped lang='scss'>
  .tab-head {
    $tab-head-height: 40px;
    display: flex;
    min-height: $tab-head-height;
    > .action-wrapper {
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 1em;
    }
  }
</style>
