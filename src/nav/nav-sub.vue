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
  @import "../var";
  
  .g-nav-sub {
    position: relative;
    > span {
      display: block;
      padding: 10px 20px;
    }
    &-popover {
      background: white;
      position: absolute;
      top:100%;
      left:0;
      white-space: nowrap;
      box-shadow: 0 0 3px fade_out(black, 0.8);
      border-radius: $border-radius;
      font-size: $font-size;
      color: $light-color;
      min-width: 8em;
    }
  }
  .g-nav-sub-popover > .g-nav-sub > .g-nav-sub-popover {
    top:0;
    left: 100%;
  }
</style>
