<template>
  <div class="tab-pane" v-if='active'>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Pane',
    props: {
      name: {
        type: [String, Number],
        required: true,
      },
    },
    inject: ['eventBus'],
    data() {
      return {
        active: false,
      }
    },
    mounted() {
      this.eventBus.$on('update:selected', (name) => {
        this.active = name === this.name;
      })
    }
  };
</script>

<style scoped>
  .tab-pane {
    padding: 1em;
  }
</style>
