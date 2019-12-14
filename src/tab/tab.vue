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
      this.eventBus.$emit('update:selected', this.selected);
    }
  };
</script>

<style scoped>
  .tab {
  
  }
</style>
