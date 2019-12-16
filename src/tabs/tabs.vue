<template>
<div class="tab">
  <slot></slot>
</div>
</template>

<script>
  import Vue from 'vue';
  
  export default {
    name: 'GUI-Tab',
    props: {
      selected: {
        type: [String, Number],
        require: true,
      },
    },
    data() {
      return {
        eventBus: new Vue(),
      }
    },
    provide() {
      return {
        eventBus: this.eventBus,
      }
    },
    mounted() {
      if (this.$children.length === 0) {
        console && console.warn &&
        console.warn('tabs的子组件应该是tabs-head和tabs-nav，但你没有写子组件')
      }
      this.$children.forEach(vm => {
        if (vm.$options.name === 'GUI-Head') {
          vm.$children.forEach(childVM => {
            if (childVM.name === this.selected) {
              this.eventBus.$emit('update:selected', this.selected, childVM);
            }
          })
        }
      })
    }
  };
</script>

<style scoped>
  .tab {
  
  }
</style>
