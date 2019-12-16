<template>
  <div class="tab-head">
    <slot></slot>
    <div class="line" ref='line'></div>
    <div v-if='$slots.action' class='action-wrapper'>
      <slot name='action'></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Head',
    inject: ['eventBus'],
    mounted() {
      this.eventBus.$on('update:selected', (name, vm) => {
        const {width, left} = vm.$el.getBoundingClientRect();
        this.$refs.line.style.width = `${width}px`;
        this.$refs.line.style.left = `${left}px`;
      })
    }
  };
</script>

<style scoped lang='scss'>
  $border-color: #ddd;
  $active-color: blue;
  .tab-head {
    $tab-head-height: 40px;
    display: flex;
    min-height: $tab-head-height;
    border-bottom: 1px solid $border-color;
    position: relative;
    > .action-wrapper {
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 1em;
    }
    > .line {
      position: absolute;
      width: 40px;
      border-bottom: 1px solid $active-color;
      bottom: 0;
      transition: all 250ms;
    }
  }
</style>
