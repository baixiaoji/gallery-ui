<template>
  <div class='popover' @click.stop='onClickHandler'>
    <div class="content-wrapper" v-if='visible' @click.stop>
      <slot name='content'></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Popover',
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      onClickHandler() {
        this.visible = !this.visible;
        if (this.visible) {
          const documentListener = () => {
            this.visible = false;
            document.removeEventListener('click', documentListener);
          };
          setTimeout(() => {
            document.addEventListener('click', documentListener);
          });
        }
      },
    },
  };
</script>

<style scoped lang='scss'>
  .popover {
    position: relative;
    
    .content-wrapper {
      position: absolute;
      top: -100%;
      left: 0;
      border: 1px solid red;
    }
  }
</style>
