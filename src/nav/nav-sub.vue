<template>
  <div class="g-nav-sub">
    <span>
      <slot name='title'/>
    </span>
    <div class='g-nav-sub-popover'>
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Gui-NavSub',
    props: {},
  };
</script>

<style scoped lang='scss'>
  .g-nav-sub {
    position: relative;
    padding: 10px 20px;
    &-popover {
      position: absolute;
      top:100%;
      left:0;
      border: 1px solid red;
      white-space: nowrap;
    }
  }
</style>
