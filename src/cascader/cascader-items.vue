<template>
  <div class='cascaderItem' :style='{height}'>
    <div class='left'>
      <div class='label' v-for='item in items' :key='item.name' @click='onClickLabel(item)'>
        <span class='name'>{{ item.name }}</span>
        <span class='icons'>
          <template v-if='item.name === loadingItem.name'>
            <icon class='loading' name="loading"/>
          </template>
          <template v-else>
            <icon class='next' v-if="leftArrowVisible(item)" name="right"/>
          </template>
        </span>
      </div>
    </div>
    <div class='right' v-if='rightItems'>
      <GUI-Cascader-Items :items='rightItems' :level='level+1'
                          :height='height' :selected="selected"
                          :load-data='loadData' :loading-item='loadingItem'
                          @update:selected="onUpdateSelected"
      />
    </div>
  </div>
</template>

<script>
  import Icon from '../icon.vue';

  export default {
    name: 'GUI-Cascader-Items',
    components: {
      icon: Icon,
    },
    data() {
      return {
        leftSelected: null,
      };
    },
    props: {
      items: {
        type: Array,
      },
      selected: {
        type: Array,
        default: () => [],
      },
      loadingItem: {
        type: Object,
        default: () => ({}),
      },
      level: {
        type: Number,
        default: 0,
      },
      height: {
        type: String,
      },
      loadData: {
        type: Function,
      },
    },
    computed: {
      rightItems() {
        if (this.selected[this.level]) {
          const current = this.items.filter(item => item.name === this.selected[this.level].name)[0];
          if (current && current.children && current.children.length > 0) {
            return current.children;
          }
        }
      },
    },
    methods: {
      onClickLabel(item) {
        let copy = JSON.parse(JSON.stringify(this.selected));
        copy[this.level] = item;
        copy.splice(this.level + 1);
        this.$emit('update:selected', copy);
      },
      onUpdateSelected(newSelected) {
        this.$emit('update:selected', newSelected);
      },
      leftArrowVisible(item) {
        return this.loadData ? !item.isLeaf : item.children;
      },
    },
  };
</script>

<style scoped lang='scss'>
  @import "../var";
  
  .cascaderItem {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100px;
    overflow: hidden;
    
    .left {
      height: 100%;
      padding: .3em 0;
      overflow: auto;
    }
    
    .right {
      height: 100%;
      border-left: 1px solid $border-color-light;
    }
    
    .label {
      padding: .3em 1em;
      display: flex;
      align-items: center;
      justify-content: space-between;
      white-space: nowrap;
      
      &:hover {
        background: $grey;
      }
      
      > .name {
        padding: .3em;
      }
      .icons {
        margin-left: 1em;
        .next {
          transform: scale(0.5);
        }
        .loading {
          animation: spin 2s infinite linear;
        }
      }
    }
  }
</style>
