<template>
  <div class="toast" ref='toastWrapper'>
    <slot></slot>
    <template v-if='closeButton && closeButton.text'>
      <span class="line" ref='line'></span>
      <span class='close' @click='onClickClose'>
      {{ closeButton.text }}
    </span>
    </template>
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
      this.initLineStyle();
    },
    methods: {
      initLineStyle() {
        if (typeof this.$refs.line === 'undefined') {
          return;
        }
        this.$nextTick(() => {
          this.$refs.line.style.height = `${this.$refs.toastWrapper.getBoundingClientRect().height}px`
        })
      },
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
      padding-left: 16px;
      cursor: pointer;
      flex-shrink: 0;
    }
    .line {
      height: 100%;
      border-left: 1px solid #666;
      margin-left: 16px;
    }
  }
</style>
