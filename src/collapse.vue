<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 'GUI-Collapse',
    props: {
      selected: {
        type: Array,
      },
    },
    data() {
      return {
        eventBus: new Vue(),
      };
    },
    provide() {
      return {
        eventBus: this.eventBus,
      };
    },
    mounted() {
      this.eventBus.$emit('update:selected', this.selected);

      this.eventBus.$on('addItem', (name) => {
        const selectArray = JSON.parse(JSON.stringify(this.selected));
        selectArray.push(name);
        this.eventBus.$emit('update:selected', selectArray);
        this.$emit('update:selected', selectArray);
      });

      this.eventBus.$on('removeItem', (name) => {
        const selectArray = JSON.parse(JSON.stringify(this.selected));
        const index = selectArray.indexOf(name);
        selectArray.splice(index, 1);
        this.eventBus.$emit('update:selected', selectArray);
        this.$emit('update:selected', selectArray);
      });
    },
  };
</script>

<style scoped lang='scss'>
  .collapse {
    border: 1px solid gray;
    border-radius: 4px;
    overflow: hidden;
  }
</style>
