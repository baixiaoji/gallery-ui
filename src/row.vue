<template>
  <div class="row" :class='rowClasses' :style="rowStyle">
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
      align: {
        type: String,
        validator(val) {
          return ['left', 'center', 'right'].includes(val);
        }
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
      rowClasses() {
        const {align} = this;
        return [
          align && `row-align-${align}`,
        ];
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

<style scoped lang='scss'>
  .row {
    display: flex;
    flex-wrap: wrap;
    &-align-right {
      justify-content: flex-end;
    }
    &-align-left {
      justify-content: flex-start;
    }
    &-align-center {
      justify-content: center;
    }
  }
</style>
