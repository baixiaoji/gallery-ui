<template>
  <div class='cascaderItem' :style='{height}'>
    <div class='left'>
      <div class='label' v-for='item in items' :key='item.name' @click='onClickLabel(item)'>
        {{ item.name }}
        <icon class="icon" v-if="item.children" name="right"/>
      </div>
    </div>
    <div class='right' v-if='rightItems'>
      <GUI-Cascader-Items :items='rightItems' :level='level+1'
                          :height='height' :selected="selected"
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
    },
    computed: {
      rightItems () {
        let currentSelected = this.selected[this.level];
        if (currentSelected && currentSelected.children) {
          return currentSelected.children
        } else {
          return null
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
    .left {
      padding: .3em 0;
    }
    .right {
      border-left: 1px solid $border-color-light;
    }
    .label {
      padding: .3em 1em;
      display: flex;
      align-items: center;
      .icon {
        margin-left: 1em;
        transform: scale(0.5);
      }
    }
  }
</style>
