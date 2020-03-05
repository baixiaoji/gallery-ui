<template>
  <div class="g-nav-sub">
    <span @click='onClick'>
      <slot name='title'/>
    </span>
    <div class='g-nav-sub-popover' v-show='open'>
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Gui-NavSub',
    props: {},
    data() {
      return {
        open: false,
      };
    },
    methods: {
      onClick() {
        this.open = !this.open;
      },
    },
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
  .g-nav-sub-popover > .g-nav-sub > .g-nav-sub-popover {
    top:0;
    left: 100%;
  }
</style>
