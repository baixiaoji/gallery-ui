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
      this.root && this.root.addItem(this)
    },
    methods: {
      onClick() {
        this.$emit('add:selected', this.name);
      },
    },
  };
</script>

<style scoped lang='scss'>
  .g-nav-item {
    padding: 10px 20px;
    
    &.active {
      background: red;
      color: white;
    }
  }
</style>
