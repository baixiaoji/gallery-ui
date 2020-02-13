<template>
  <div class='cascaderItem' :style='{height}'>
    {{ level }}
    <div class='left'>
      <div class='label' v-for='item in items' :key='item.name' @click='leftSelected = item'>
        {{ item.name }}
        <icon class="icon" v-if="item.children" name="right"/>
      </div>
    </div>
    <div class='right' v-if='rightItems'>
      <GUI-Cascader-Items :items='rightItems' :level='level+1' :height='height'/>
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
        if (this.leftSelected && this.leftSelected.children) {
          return this.leftSelected.children
        } else {
          return null
        }
      }
    },
    methods: {},
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
