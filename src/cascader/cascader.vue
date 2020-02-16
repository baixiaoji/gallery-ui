<template>
  <div class='cascader'>
    <div class='trigger' @click='popoverVisible = !popoverVisible'>
      {{result || '&nbsp;'}}
    </div>
    <div class='popover-wrapper' v-if='popoverVisible'>
      <cascader-items class='popover' :items='source'
                      height='popoverHeight' :selected='selected'
                      @update:selected="onUpdateSelected"
      />
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
      selected: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      result() {
        return this.selected.map((item) => item.name).join('/');
      },
    },
    methods: {
      onUpdateSelected(newSelected) {
        this.$emit('update:selected', newSelected);
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
      align-items: center;
      padding: 0 1em;
      min-width: 10em;
      border: 1px solid $border-color;
      border-radius: $border-radius;
    }
    
    .popover-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      background: white;
      display: flex;
      margin-top: 4px;
      @extend .box-shadow;
    }
  }
</style>
