<template>
  <div class='cascader'>
    <div class='trigger' @click='popoverVisible = !popoverVisible'></div>
    <div class='popover-wrapper' v-if='popoverVisible'>
      <cascader-items class='popover' :items='source' :height='popoverHeight'/>
    </div>
  </div>
</template>

<script>
  import CascaderItems from './cascader-items.vue';

  export default {
    name: 'GUI-Cascader',
    components: {
      'cascader-items': CascaderItems,
    },
    data() {
      return {
        popoverVisible: false,
      };
    },
    props: {
      source: {
        type: Array,
      },
      popoverHeight: {
        type: String,
      },
    },
  };
</script>

<style scoped lang='scss'>
  @import "src/var";
  
  .cascader {
    position: relative;
    
    .trigger {
      border: 1px solid red;
      height: 32px;
      width: 100px;
    }
    
    .popover-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      display: flex;
      @extend .box-shadow;
    }
  }
</style>
