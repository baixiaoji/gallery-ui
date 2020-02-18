<template>
  <div class='cascaderItem' :style='{height}'>
    <div class='left'>
      <div class='label' v-for='item in items' :key='item.name' @click='onClickLabel(item)'>
        <span class='name'>{{ item.name }}</span>
        <icon class="icon" v-if="leftArrowVisible(item)" name="right"/>
      </div>
    </div>
    <div class='right' v-if='rightItems'>
      <GUI-Cascader-Items :items='rightItems' :level='level+1'
                          :height='height' :selected="selected"
                          :load-data='loadData'
                          @update:selected="onUpdateSelected"
      />
    </div>
  </div>
</template>

<script>
  import Icon from '../icon.vue';
  
  export default {
    name: 'GUI-Cascader-Items',
    components:{
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
      level: {
        type: Number,
        default: 0,
      },
      height: {
        type: String,
      },
      loadData: {
        type: Function,
      }
    },
    computed: {
      rightItems () {
        if (this.selected[this.level]) {
          const current = this.items.filter(item => item.name === this.selected[this.level].name)[0];
          if (current && current.children && current.children.length > 0) {
            return current.children;
          }
        }
      }
    },
    methods: {
      onClickLabel(item) {
        let copy = JSON.parse(JSON.stringify(this.selected));
        copy[this.level] = item;
        copy.splice(this.level + 1);
        this.$emit('update:selected', copy)
      },
      onUpdateSelected(newSelected) {
        this.$emit('update:selected', newSelected)
      },
      leftArrowVisible(item) {
        return this.loadData ? !item.isLeaf : item.children;
      }
    },
  };
</script>

<style scoped lang='scss'>
  @import "src/var";
  
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
      &:hover {
        background: $grey;
      }
      > .name {
        padding: .3em;
      }
      .icon {
        margin-left: 1em;
        transform: scale(0.5);
      }
    }
  }
</style>
