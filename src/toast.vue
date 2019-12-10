<template>
  <div class="toast">
    <slot></slot>
    <span class='close' v-if='closeButton && closeButton.text' @click='onClickClose'>
      {{ closeButton.text }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Toast',
    props: {
      autoClose: {
        type: Boolean,
        default: false,
      },
      closeButton: {
        type: Object,
      },
      delayCloseTime: {
        type: Number,
        default: 3000,
      },
    },
    mounted() {
      this.checkAutoClose();
    },
    methods: {
      checkAutoClose() {
        if (this.autoClose) {
          setTimeout(() => {
            this.close();
          }, this.delayCloseTime);
        }
      },
      close() {
        this.$el.remove();
        this.$destroy();
      },
      onClickClose() {
        this.close();
        if (this.closeButton && typeof this.closeButton.callback === 'function') {
          this.closeButton.callback();
        }
      },
    },
  };
</script>

<style scoped lang='scss'>
  $Toast-min-height: 40px;
  $Toast-bg: rgba(0, 0, 0, 0.75);
  .toast {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    color: white;
    font-size: 14px;
    min-height: $Toast-min-height;
    padding: 0 16px;
    background: $Toast-bg;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
    
    .close {
      margin-left: 13px;
      cursor: pointer;
      flex-shrink: 0;
    }
  }
</style>
