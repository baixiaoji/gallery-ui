<template>
  <div class='layout' :class='layoutClasses'>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Layout',
    data() {
      return {
        layoutClasses: {
          hasAside: false,
        },
      };
    },
    mounted(){
      this.$children.forEach(vm => {
        if (vm.$options.name === 'GUI-Aside') {
          this.layoutClasses.hasAside = true;
        }
      })
    },
    methods: {},
  };
</script>

<style lang='scss'>
  .layout {
    
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    
    &.hasAside {
      flex-direction: row;
    }
  }
</style>
