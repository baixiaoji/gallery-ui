<template>
  <div class="collapse-item">
    <div class="title" @click='toggle'>
      {{ title }}
    </div>
    <div class="content" v-if='visible'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GUI-CollapseItem',
    inject: ['eventBus'],
    props: {
      title: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        visible: false,
      };
    },
    mounted() {
      this.eventBus.$on('update:selected', (selectedArray) => {
        this.visible = selectedArray.indexOf(this.name) >= 0;
      })
    },
    methods: {
      toggle() {
        if (this.visible) {
          this.eventBus.$emit('removeItem', this.name);
        } else {
          this.eventBus.$emit('addItem', this.name);
        }
      },
    },
  };
</script>

<style scoped lang='scss'>
  .collapse-item {
    > .title {
      padding: 0.5em 1em;
      border-bottom: 1px solid gray;
      cursor: pointer;
    }
    
    > .content {
      padding: 1.5em;
      border-bottom: 1px solid gray;
    }
  
    &:last-child {
      margin-bottom: -1px;
    }
  }
</style>
