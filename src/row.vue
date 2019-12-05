<template>
  <div class="row" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Row',
    props: {
      gutter: {
        type: [String, Number],
      },
    },
    computed: {
      rowStyle() {
        const { gutter } = this;
        return {
          marginLeft: `-${gutter/2}px`,
          marginRight: `-${gutter/2}px`
        };
      },
    },
    mounted(){
      if(this.gutter) {
        this.$children.forEach(vm => {
          vm.gutter = this.gutter;
        })
      }
    }
  };
</script>

<style scoped>
  .row {
    display: flex;
    flex-wrap: wrap;
  }
</style>
