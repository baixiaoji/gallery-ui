<template>
  <div class="g-nav-item" :class='{active: selected}' @click='onClick'>
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'Gui-NavItem',
    inject: ['root'],
    props: {
      name: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        selected: false,
      };
    },
    created() {
      this.root && this.root.addItem(this);
    },
    methods: {
      onClick() {
        this.$emit('add:selected', this.name);
      },
    },
  };
</script>

<style scoped lang='scss'>
  @import "../var";
  
  .g-nav-item {
    padding: 10px 20px;
    position: relative;
    
    &.active {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom: 2px solid $blue;
        width: 100%;
      }
    }
    .g-sub-nav .g-nav-item {
      &.active {
        color: $color;
        &::after {
          display: none;
        }
      }	    }
  }
</style>
