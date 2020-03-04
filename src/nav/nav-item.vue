<template>
  <div class="g-nav-item" :class='{active: selected}' @click='onClick'>
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'Gui-NavItem',
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
