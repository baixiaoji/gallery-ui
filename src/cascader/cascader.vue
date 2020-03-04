<template>
  <div class='cascader' v-click-out-side='close'>
    <div class='trigger' @click='togglePopoverVisible'>
      {{result || '&nbsp;'}}
    </div>
    <div class='popover-wrapper' v-if='popoverVisible'>
      <cascader-items class='popover' :items='source'
                      :loadData='loadData' :loading-item='loadingItem'
                      height='popoverHeight' :selected='selected'
                      @update:selected="onUpdateSelected"
      />
    </div>
  </div>
</template>

<script>
  import CascaderItems from './cascader-items.vue';
  import clickOutSide from './click-outside';

  export default {
    name: 'GUI-Cascader',
    components: {
      'cascader-items': CascaderItems,
    },
    directives: {
      clickOutSide,
    },
    data() {
      return {
        popoverVisible: false,
        loadingItem: {},
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
      loadData: {
        type: Function,
      },
    },
    computed: {
      result() {
        return this.selected.map((item) => item.name).join('/');
      },
    },
    methods: {
      open() {
        this.popoverVisible = true;
      },
      close() {
        this.popoverVisible = false;
      },
      togglePopoverVisible() {
        if (this.popoverVisible === true) {
          this.close()
        }else {
          this.open();
        }
      },
      onUpdateSelected(newSelected) {
        this.$emit('update:selected', newSelected);
        const lastItem = newSelected[newSelected.length - 1];
        let simplest = (children, id) => {
          return children.filter(item => item.id === id)[0];
        };
        let complex = (children, id) => {
          let noChildren = [];
          let hasChildren = [];
          children.forEach(item => {
            if (item.children) {
              hasChildren.push(item);
            } else {
              noChildren.push(item);
            }
          });
          let found = simplest(noChildren, id);
          if (found) {
            return found;
          } else {
            found = simplest(hasChildren, id);
            if (found) {
              return found;
            } else {
              for (let i = 0; i < hasChildren.length; i++) {
                found = complex(hasChildren[i].children, id);
                if (found) {
                  return found;
                }
              }
              return undefined;
            }
          }
        };

        let updateSource = (result) => {
          this.loadingItem = {};
          let copy = JSON.parse(JSON.stringify(this.source));
          let toUpdate = complex(copy, lastItem.id);
          toUpdate.children = result;
          this.$emit('update:source', copy);
        };
        if (!lastItem.isLeaf && this.loadData) {
          this.loadData(lastItem, updateSource);
          this.loadingItem = lastItem;
        }
      },
    },
  };
</script>

<style scoped lang='scss'>
  @import "../var";
  
  .cascader {
    display: inline-block;
    position: relative;
    
    .trigger {
      border: 1px solid red;
      height: $input-height;
      width: 100px;
      display: inline-flex;
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
