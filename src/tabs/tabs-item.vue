<template>
  <div class="tab-item" @click='onClick' :class='tabItemClasses'>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Item',
    props: {
      name: {
        type: [String, Number],
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    inject: ['eventBus'],
    data() {
      return {
        active: false,
      };
    },
    computed: {
      tabItemClasses() {
        return {
          active: this.active,
          disabled: this.disabled,
        }
      },
    },
    mounted() {
      this.eventBus.$on('update:selected', (name) => {
        this.active = name === this.name;
      })
    },
    methods: {
      onClick() {
        if (this.disabled) return;
        this.eventBus.$emit('update:selected', this.name, this);
      },
    },
  };
</script>

<style scoped lang='scss'>
  .tab-item {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2em;
    
    &.active {
    
    }
    
    &.disabled {
      cursor: not-allowed;
    }
  }
</style>
