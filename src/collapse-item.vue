<template>
  <div class="collapse-item">
    <div class="title">
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
